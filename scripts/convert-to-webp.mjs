/**
 * convert-to-webp.mjs
 * Converts heavy PNG/JPG images in /public to WebP format.
 * Keeps originals intact for fallback compatibility.
 * Run: node scripts/convert-to-webp.mjs
 */

import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { join, extname, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const WEBP_QUALITY = 82;
// Only convert files larger than 100KB to avoid diminishing returns
const MIN_SIZE_BYTES = 100 * 1024;

async function getAllImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getAllImages(fullPath)));
    } else if (/\.(png|jpg|jpeg)$/i.test(entry.name)) {
      const info = await stat(fullPath);
      if (info.size >= MIN_SIZE_BYTES) {
        files.push({ path: fullPath, size: info.size });
      }
    }
  }
  return files;
}

async function main() {
  console.log('🔍 Scanning public/ for heavy images...\n');
  const images = await getAllImages(publicDir);
  console.log(`Found ${images.length} images >= ${MIN_SIZE_BYTES / 1024}KB\n`);

  let totalOriginal = 0;
  let totalWebP = 0;
  let converted = 0;
  let skipped = 0;
  const results = [];

  for (const { path: imgPath, size: origSize } of images) {
    const ext = extname(imgPath);
    const webpPath = imgPath.slice(0, -ext.length) + '.webp';

    // Check if webp already exists and is newer
    try {
      const webpStat = await stat(webpPath);
      const origStat = await stat(imgPath);
      if (webpStat.mtimeMs >= origStat.mtimeMs) {
        const rel = imgPath.replace(publicDir, '').replace(/\\/g, '/');
        results.push({ file: rel, status: 'SKIPPED (already exists)', origMB: (origSize / 1e6).toFixed(2) });
        skipped++;
        continue;
      }
    } catch {
      // webp doesn't exist yet — proceed
    }

    try {
      await sharp(imgPath)
        .webp({ quality: WEBP_QUALITY, effort: 4 })
        .toFile(webpPath);

      const { size: webpSize } = await stat(webpPath);
      const rel = imgPath.replace(publicDir, '').replace(/\\/g, '/');
      const saving = ((1 - webpSize / origSize) * 100).toFixed(1);

      totalOriginal += origSize;
      totalWebP += webpSize;
      converted++;

      results.push({
        file: rel,
        status: '✅ converted',
        origMB: (origSize / 1e6).toFixed(2),
        webpMB: (webpSize / 1e6).toFixed(2),
        saving: `${saving}%`,
      });
      console.log(`✅ ${rel}`);
      console.log(`   ${(origSize / 1e6).toFixed(2)}MB → ${(webpSize / 1e6).toFixed(2)}MB  (-${saving}%)\n`);
    } catch (err) {
      const rel = imgPath.replace(publicDir, '').replace(/\\/g, '/');
      console.error(`❌ Failed: ${rel} — ${err.message}`);
      results.push({ file: rel, status: `❌ ERROR: ${err.message}` });
    }
  }

  console.log('\n═══════════════════════════════════════');
  console.log(`✅ Converted : ${converted}`);
  console.log(`⏭  Skipped   : ${skipped}`);
  if (converted > 0) {
    const savedMB = ((totalOriginal - totalWebP) / 1e6).toFixed(1);
    const pct = ((1 - totalWebP / totalOriginal) * 100).toFixed(1);
    console.log(`📦 Before    : ${(totalOriginal / 1e6).toFixed(1)} MB`);
    console.log(`📦 After     : ${(totalWebP / 1e6).toFixed(1)} MB`);
    console.log(`💾 Saved     : ${savedMB} MB (${pct}% reduction)`);
  }
  console.log('═══════════════════════════════════════\n');
  console.log('✨ Done! Original files kept intact for fallback.\n');
  console.log('💡 Next: Update image references in code to use .webp where possible,');
  console.log('   or use <picture> elements with .webp sources for maximum compatibility.\n');
}

main().catch(console.error);

