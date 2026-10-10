import { describe, it, expect } from "vitest";
import type { SeedGrammar } from "@/prisma/seed-data/grammar";

/**
 * BUG-02 regression: Verify that the SeedGrammar type is importable
 * and structurally matches the shape used by n3-data.ts / n4-data.ts.
 */
describe("SeedGrammar type (BUG-02 regression)", () => {
  it("accepts a well-formed grammar entry", () => {
    const entry: SeedGrammar = {
      title: "〜です (desu)",
      level: "N5",
      meaning: "Là...",
      structure: "[Danh từ] + です",
      commonMistakes: "Không dùng です sau động từ dạng ます",
      examples: [
        {
          japanese: "私は学生です。",
          romaji: "Watashi wa gakusei desu.",
          meaning: "Tôi là học sinh.",
        },
      ],
    };
    expect(entry.title).toBeDefined();
    expect(entry.examples).toHaveLength(1);
  });

  it("allows commonMistakes to be optional", () => {
    const entry: SeedGrammar = {
      title: "test",
      level: "N3",
      meaning: "test meaning",
      structure: "test structure",
      examples: [],
    };
    expect(entry.commonMistakes).toBeUndefined();
  });
});

