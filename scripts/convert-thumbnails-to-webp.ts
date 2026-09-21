// scripts/convert-thumbnails-to-webp.ts
import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";

const THUMBNAILS_DIR = path.join(process.cwd(), "public", "thumbnails");

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else if (
      entry.isFile() &&
      entry.name.toLowerCase().endsWith(".png")
    ) {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  if (!fs.existsSync(THUMBNAILS_DIR)) {
    console.error(`[thumbnails] Directory not found: ${THUMBNAILS_DIR}`);
    process.exit(1);
  }

  const pngFiles = walk(THUMBNAILS_DIR);

  if (pngFiles.length === 0) {
    console.log("[thumbnails] No .png files found.");
    return;
  }

  console.log(`[thumbnails] Converting ${pngFiles.length} PNG file(s) to WebP...`);

  let converted = 0;
  let failed = 0;

  for (const pngPath of pngFiles) {
    const webpPath = pngPath.replace(/\.png$/i, ".webp");
    try {
      await sharp(pngPath).webp({ quality: 90 }).toFile(webpPath);

      // Remove the original PNG after successful conversion
      fs.unlinkSync(pngPath);

      converted++;
      console.log(`  ✓ ${path.relative(process.cwd(), pngPath)} → ${path.relative(process.cwd(), webpPath)}`);
    } catch (err) {
      failed++;
      console.error(`  ✗ Failed: ${path.relative(process.cwd(), pngPath)}`, err);
    }
  }

  console.log("");
  console.log(`✅ Done. Converted: ${converted}, Failed: ${failed}`);
}

main().catch((err) => {
  console.error("[thumbnails] Fatal error:", err);
  process.exit(1);
});