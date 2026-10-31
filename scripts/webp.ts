// scripts/webp.ts
import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";

const PUBLIC_DIR = path.join(process.cwd(), "public");

// Directories inside /public to scan
const TARGET_FOLDERS = ["thumbnails", "covers", "icons", "changelog"];

// Valid image extensions (Removed .ico because Sharp cannot parse true ICO files natively)
const VALID_EXTENSIONS = [".png", ".jpg", ".jpeg", ".tiff", ".bmp", ".gif"];

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
      VALID_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())
    ) {
      files.push(full);
    }
  }
  return files;
}

async function processFolder(folderName: string) {
  const targetDir = path.join(PUBLIC_DIR, folderName);

  if (!fs.existsSync(targetDir)) {
    console.log(`[${folderName}] Directory not found, skipping.`);
    return { converted: 0, failed: 0 };
  }

  const imageFiles = walk(targetDir);

  if (imageFiles.length === 0) {
    console.log(`[${folderName}] No convertible images found.`);
    return { converted: 0, failed: 0 };
  }

  console.log(
    `\n[${folderName}] Converting ${imageFiles.length} file(s) to WebP...`,
  );

  let converted = 0;
  let failed = 0;

  for (const filePath of imageFiles) {
    const ext = path.extname(filePath);
    const webpPath = filePath.slice(0, -ext.length) + ".webp";

    try {
      await sharp(filePath).webp({ quality: 90 }).toFile(webpPath);

      // Remove the original image after successful conversion
      fs.unlinkSync(filePath);

      converted++;
      console.log(
        `  ✓ ${path.relative(process.cwd(), filePath)} → ${path.relative(process.cwd(), webpPath)}`,
      );
    } catch (err) {
      failed++;
      // Gracefully handle unsupported formats (like corrupted files or leftover ICOs)
      console.warn(
        `  ⚠ Skipped: ${path.relative(process.cwd(), filePath)} (Unsupported or corrupt format)` +
          err,
      );
    }
  }

  return { converted, failed };
}

async function main() {
  let totalConverted = 0;
  let totalFailed = 0;

  for (const folder of TARGET_FOLDERS) {
    const { converted, failed } = await processFolder(folder);
    totalConverted += converted;
    totalFailed += failed;
  }

  console.log("\n----------------------------------------");
  console.log(
    `✅ All Done. Total Converted: ${totalConverted}, Total Skipped/Failed: ${totalFailed}`,
  );
}

main().catch((err) => {
  console.error("[webp] Fatal error:", err);
  process.exit(1);
});
