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
  console.log("🌸 STARTING COMPREHENSIVE VOCABULARY INGESTION 🌸");

  const raw = fs.readFileSync("scripts/data_openjlpt/enriched_vocab_to_import.json", "utf8");
  const candidates: CandidateWord[] = JSON.parse(raw);
  console.log(`Loaded ${candidates.length} candidate words.`);

  // 1. Fetch all existing vocabularies to avoid unnecessary DB queries
  const existingList = await prisma.vocabulary.findMany({
    select: { word: true, jlptLevel: true },
  });
  const existingSet = new Set(existingList.map((e) => `${e.word}_${e.jlptLevel}`.toLowerCase()));
  console.log(`Current DB vocabulary count: ${existingList.length}`);

  const toInsert: CandidateWord[] = [];
  const seenBatch = new Set<string>();

  for (const c of candidates) {
    const key = `${c.word}_${c.jlptLevel}`.toLowerCase();
    if (existingSet.has(key) || seenBatch.has(key)) {
      continue;
    }
    seenBatch.add(key);
    toInsert.push(c);
  }

  console.log(`Identified ${toInsert.length} brand new words to insert!`);

  // Batch insert in chunks of 100
  const CHUNK_SIZE = 100;
  let inserted = 0;

  for (let i = 0; i < toInsert.length; i += CHUNK_SIZE) {
    const chunk = toInsert.slice(i, i + CHUNK_SIZE);
    await prisma.$transaction(
      chunk.map((item) =>
        prisma.vocabulary.create({
          data: {
            word: item.word,
            kana: item.kana,
            kanji: item.kanji,
            romaji: item.romaji,
            meaning: item.meaning,
            partOfSpeech: item.partOfSpeech,
            jlptLevel: item.jlptLevel,
            tags: item.tags,
            examples: item.exampleJapanese
              ? {
                  create: [
                    {
                      japanese: item.exampleJapanese,
                      romaji: item.exampleRomaji || "",
                      meaning: item.exampleMeaning || "",
                    },
                  ],
                }
              : undefined,
          },
        })
      )
    );
    inserted += chunk.length;
    if (inserted % 500 === 0 || inserted === toInsert.length) {
      console.log(`  Progress: ${inserted}/${toInsert.length} words inserted...`);
    }
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

