import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { requestOtp, verifyAndConsumeOtp } from "@/lib/otp";
import { prisma } from "@/lib/prisma";

/**
 * OTP integration tests — these require a valid DATABASE_URL pointing at an
 * existing SQLite database with migrations applied.
 *
 * The `beforeAll` guard below verifies the VerificationToken table exists
 * before running any test.  When the database is misconfigured (wrong
 * provider, missing file, un-applied migrations) the suite fails with a
 * clear diagnostic instead of being skipped and producing a false-positive
 * green bar.
 */

beforeAll(async () => {
  try {
    // Lightweight probe — if this throws, the table does not exist or the
    // connection string is wrong.
    await prisma.verificationToken.findFirst();
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    throw new Error(
      "\n❌ OTP tests FAILED — database is unavailable or VerificationToken " +
        "table does not exist.\n" +
        "   Run `npx prisma migrate deploy` with a valid DATABASE_URL first.\n" +
        `   Original error: ${msg}\n`,
    );
  }
});

describe("OTP Service Unit Tests", () => {
  const testEmail = "test_otp_flow@nihonquest.local";

  beforeEach(async () => {
    await prisma.verificationToken.deleteMany({
      where: {
        identifier: {
          contains: testEmail,
        },
      },
    });
  });

  it("generates and verifies OTP code correctly", async () => {
    const res = await requestOtp(testEmail, "REGISTER");
    expect(res.success).toBe(true);
    expect(res.devCode).toBeDefined();

    const code = res.devCode!;
    expect(code).toHaveLength(6);

    // Verify invalid code
    const invalidRes = await verifyAndConsumeOtp(testEmail, "REGISTER", "000000");
    expect(invalidRes.valid).toBe(false);

    // Verify valid code
    const validRes = await verifyAndConsumeOtp(testEmail, "REGISTER", code);
    expect(validRes.valid).toBe(true);

    // Verify consumed code cannot be reused
    const reusedRes = await verifyAndConsumeOtp(testEmail, "REGISTER", code);
    expect(reusedRes.valid).toBe(false);
  });

  it("handles forgot-password OTP isolation", async () => {
    const res = await requestOtp(testEmail, "RESET_PASSWORD");
    expect(res.success).toBe(true);
    const code = res.devCode!;

    // Cannot verify with wrong type
    const wrongType = await verifyAndConsumeOtp(testEmail, "REGISTER", code);
    expect(wrongType.valid).toBe(false);

    // Can verify with right type
    const rightType = await verifyAndConsumeOtp(testEmail, "RESET_PASSWORD", code);
    expect(rightType.valid).toBe(true);
  });

  it("enforces rate limit on OTP verify attempts (MAX_VERIFY_ATTEMPTS = 5)", async () => {
    // Use a unique email to avoid interference from other tests' rate limit buckets
    const rateLimitEmail = `test_ratelimit_${Date.now()}@nihonquest.local`;
    const res = await requestOtp(rateLimitEmail, "REGISTER");
    expect(res.success).toBe(true);
    const code = res.devCode!;

    // First 5 attempts should be allowed (rate limit allows MAX_VERIFY_ATTEMPTS)
    for (let i = 0; i < 5; i++) {
      const attemptRes = await verifyAndConsumeOtp(rateLimitEmail, "REGISTER", "wrong" + i);
      expect(attemptRes.valid).toBe(false);
      // Should not be rate limited yet (attempts 1-5)
      expect(attemptRes.error).not.toContain("quá nhiều lần");
    }

    // 6th attempt should be rate limited
    const rateLimitedRes = await verifyAndConsumeOtp(rateLimitEmail, "REGISTER", "wrong5");
    expect(rateLimitedRes.valid).toBe(false);
    expect(rateLimitedRes.error).toContain("quá nhiều lần");
  });
});
