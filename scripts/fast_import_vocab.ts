import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CandidateWord {
  word: string;
  kana: string;
  kanji: string | null;
  romaji: string;
  meaning: string;
  partOfSpeech: string;
  jlptLevel: string;
  tags: string;
  exampleJapanese?: string | null;
  exampleRomaji?: string | null;
  exampleMeaning?: string | null;
}

async function main() {
  console.log("🌸 FAST BATCH VOCABULARY INGESTION 🌸");

  const raw = fs.readFileSync("scripts/data_openjlpt/enriched_vocab_to_import.json", "utf8");
  const candidates: CandidateWord[] = JSON.parse(raw);
  console.log(`Loaded ${candidates.length} candidate words.`);

  // 1. Fetch all existing vocabularies
  const existingList = await prisma.vocabulary.findMany({
    select: { word: true, jlptLevel: true },
  });
  const existingSet = new Set(existingList.map((e) => `${e.word}_${e.jlptLevel}`.toLowerCase()));
  console.log(`Current DB vocabulary count: ${existingList.length}`);

  const toInsertData: Array<{
    word: string;
    kana: string;
    kanji: string | null;
    romaji: string;
    meaning: string;
    partOfSpeech: string;
    jlptLevel: string;
    tags: string;
  }> = [];

  const seenBatch = new Set<string>();

  for (const c of candidates) {
    const key = `${c.word}_${c.jlptLevel}`.toLowerCase();
    if (existingSet.has(key) || seenBatch.has(key)) {
      continue;
    }
    seenBatch.add(key);
    toInsertData.push({
      word: c.word,
      kana: c.kana,
      kanji: c.kanji,
      romaji: c.romaji,
      meaning: c.meaning,
      partOfSpeech: c.partOfSpeech,
      jlptLevel: c.jlptLevel,
      tags: c.tags,
    });
  }

  console.log(`Ready to insert ${toInsertData.length} new words via createMany...`);

  // Insert in chunks of 500
  const CHUNK_SIZE = 500;
  let inserted = 0;

  for (let i = 0; i < toInsertData.length; i += CHUNK_SIZE) {
    const chunk = toInsertData.slice(i, i + CHUNK_SIZE);
    const result = await prisma.vocabulary.createMany({
      data: chunk,
      skipDuplicates: true,
    });
    inserted += result.count;
    console.log(`  Inserted batch: ${inserted}/${toInsertData.length}`);
  }

  const newTotal = await prisma.vocabulary.count();
  const byLevel = await prisma.vocabulary.groupBy({
    by: ["jlptLevel"],
    _count: { id: true },
  });

  console.log("\n=======================================================");
  console.log(`🎉 INGESTION COMPLETE!`);
  console.log(`New total vocabulary: ${newTotal} items`);
  console.log(`Distribution by level:`, byLevel);
  console.log("=======================================================\n");

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error("Error during ingestion:", err);
  process.exit(1);
});

