import { describe, it, expect } from "vitest";
import { isImageAvatar } from "@/lib/avatar";

describe("isImageAvatar", () => {
  it("returns true for http URLs", () => {
    expect(isImageAvatar("http://example.com/avatar.png")).toBe(true);
  });

  it("returns true for https URLs", () => {
    expect(isImageAvatar("https://example.com/avatar.png")).toBe(true);
  });

  it("returns true for relative paths", () => {
    expect(isImageAvatar("/images/avatar.jpg")).toBe(true);
  });

  it("returns true for base64 data URIs (BUG-04 regression)", () => {
    expect(isImageAvatar("data:image/png;base64,iVBORw0KGgoAAAANS")).toBe(true);
    expect(isImageAvatar("data:image/jpeg;base64,/9j/4AAQSk")).toBe(true);
    expect(isImageAvatar("data:image/svg+xml;base64,PHN2Zz4=")).toBe(true);
  });

  it("returns false for emoji strings", () => {
    expect(isImageAvatar("🚅")).toBe(false);
    expect(isImageAvatar("🍜")).toBe(false);
  });

  it("returns false for single characters", () => {
    expect(isImageAvatar("N")).toBe(false);
    expect(isImageAvatar("A")).toBe(false);
  });

  it("returns false for null/undefined/empty", () => {
    expect(isImageAvatar(null)).toBe(false);
    expect(isImageAvatar(undefined)).toBe(false);
    expect(isImageAvatar("")).toBe(false);
  });

  it("returns false for whitespace-only strings", () => {
    expect(isImageAvatar("   ")).toBe(false);
  });
});

