import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("=== Fast Bulk Sync Jouyou Kanji to Database ===");
  const jsonPath = path.join(process.cwd(), "lib", "jouyou-kanji-data.json");
  const raw = fs.readFileSync(jsonPath, "utf-8");
  const jouyouList = JSON.parse(raw);
  console.log(`Loaded ${jouyouList.length} Jouyou Kanji from JSON.`);

  // 1. Fetch all existing kanji characters
  const existingKanji = await prisma.kanji.findMany({
    select: { id: true, character: true, meaning: true },
  });
  const existingCharMap = new Map<string, { id: string; meaning: string }>();
  for (const k of existingKanji) {
    existingCharMap.set(k.character, { id: k.id, meaning: k.meaning });
  }
  console.log(`Currently ${existingCharMap.size} kanji in DB.`);

  // 2. Identify missing kanji to insert
  const toCreate: Array<{
    character: string;
    meaning: string;
    strokeCount: number;
    jlptLevel: string;
    grade: number;
  }> = [];

  for (const item of jouyouList) {
    if (!existingCharMap.has(item.character)) {
      const gradeNum = typeof item.grade === "number" ? item.grade : 7;
      toCreate.push({
        character: item.character,
        meaning: item.meaningVi || item.meaningEn || item.hanViet,
        strokeCount: item.strokeCount || 1,
        jlptLevel: item.jlptLevel || "N1",
        grade: gradeNum,
      });
    }
  }

  if (toCreate.length > 0) {
    console.log(`Bulk creating ${toCreate.length} new kanji records...`);
    // Insert in chunks of 500
    for (let i = 0; i < toCreate.length; i += 500) {
      const chunk = toCreate.slice(i, i + 500);
      await prisma.kanji.createMany({
        data: chunk,
        skipDuplicates: true,
      });
    }
    console.log("Bulk creation done.");
  }

  // 3. Update meanings for existing kanji if meaningVi is richer
  const toUpdate: Array<{ id: string; meaning: string }> = [];
  for (const item of jouyouList) {
    const existing = existingCharMap.get(item.character);
    if (existing && item.meaningVi && existing.meaning !== item.meaningVi) {
      toUpdate.push({ id: existing.id, meaning: item.meaningVi });
    }
  }

  if (toUpdate.length > 0) {
    console.log(`Updating meanings for ${toUpdate.length} existing kanji...`);
    // Batch in groups of 50
    for (let i = 0; i < toUpdate.length; i += 50) {
      const chunk = toUpdate.slice(i, i + 50);
      await Promise.all(
        chunk.map((u) =>
          prisma.kanji.update({
            where: { id: u.id },
            data: { meaning: u.meaning },
          })
        )
      );
    }
    console.log("Meaning update done.");
  }

  // 4. Populate readings
  const allKanji = await prisma.kanji.findMany({
    select: { id: true, character: true },
  });
  const idByChar = new Map<string, string>();
  for (const k of allKanji) {
    idByChar.set(k.character, k.id);
  }

  const existingReadings = await prisma.kanjiReading.findMany({
    select: { kanjiId: true, reading: true, type: true },
  });
  const readingSet = new Set(
    existingReadings.map((r) => `${r.kanjiId}|${r.reading}|${r.type}`)
  );

  const readingsToCreate: Array<{
    kanjiId: string;
    reading: string;
    type: string;
  }> = [];

  for (const item of jouyouList) {
    const kanjiId = idByChar.get(item.character);
    if (!kanjiId) continue;

    for (const on of item.onyomi || []) {
      const key = `${kanjiId}|${on}|ONYOMI`;
      if (!readingSet.has(key)) {
        readingsToCreate.push({ kanjiId, reading: on, type: "ONYOMI" });
        readingSet.add(key);
      }
    }

    for (const kun of item.kunyomi || []) {
      const key = `${kanjiId}|${kun}|KUNYOMI`;
      if (!readingSet.has(key)) {
        readingsToCreate.push({ kanjiId, reading: kun, type: "KUNYOMI" });
        readingSet.add(key);
      }
    }
  }

  if (readingsToCreate.length > 0) {
    console.log(`Bulk inserting ${readingsToCreate.length} readings...`);
    for (let i = 0; i < readingsToCreate.length; i += 500) {
      const chunk = readingsToCreate.slice(i, i + 500);
      await prisma.kanjiReading.createMany({
        data: chunk,
        skipDuplicates: true,
      });
    }
    console.log("Readings bulk insert done.");
  }

  const finalCount = await prisma.kanji.count();
  const readingCount = await prisma.kanjiReading.count();
  console.log(`\n🎉 SUCCESS: Database now has ${finalCount} Kanji and ${readingCount} Kanji Readings!`);
}

main()
  .catch((e) => {
    console.error("Fast bulk error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

