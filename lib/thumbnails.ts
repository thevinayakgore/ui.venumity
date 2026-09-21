// lib/thumbnails.ts
import "server-only";
import * as fs from "fs";
import * as path from "path";

const THUMBNAILS_DIR = path.join(process.cwd(), "public", "thumbnails");

/**
 * Returns every .webp file inside public/thumbnails (recursive),
 * as URLs relative to the site root (e.g. "/thumbnails/foo.webp").
 *
 * Sorted alphabetically for stable order.
 */
export function getAllThumbnails(): string[] {
  if (!fs.existsSync(THUMBNAILS_DIR)) return [];

  const results: string[] = [];

  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (
        entry.isFile() &&
        entry.name.toLowerCase().endsWith(".webp")
      ) {
        const rel = path
          .relative(path.join(process.cwd(), "public"), full)
          .replace(/\\/g, "/");
        results.push(`/${rel}`);
      }
    }
  }

  walk(THUMBNAILS_DIR);
  return results.sort();
}