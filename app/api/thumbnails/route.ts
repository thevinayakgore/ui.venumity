// app/api/thumbnails/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const THUMBNAILS_DIR = path.join(process.cwd(), "public", "thumbnails");

function listAllThumbnails(): {
  name: string;
  mtimeMs: number;
  size: number;
}[] {
  if (!fs.existsSync(THUMBNAILS_DIR)) return [];

  const files = fs.readdirSync(THUMBNAILS_DIR, { withFileTypes: true });

  return files
    .filter(
      (entry) =>
        entry.isFile() &&
        entry.name.toLowerCase().endsWith(".webp") &&
        !entry.name.startsWith("."),
    )
    .map((entry) => {
      const full = path.join(THUMBNAILS_DIR, entry.name);
      const stat = fs.statSync(full);
      return {
        name: entry.name.replace(/\.webp$/i, ""),
        mtimeMs: stat.mtimeMs,
        size: stat.size,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  // ── Single image ─────────────────────────────────────────
  if (name) {
    const safeName = path.basename(name).replace(/\.webp$/i, "");
    const filePath = path.join(THUMBNAILS_DIR, `${safeName}.webp`);

    if (!filePath.startsWith(THUMBNAILS_DIR) || !fs.existsSync(filePath)) {
      return new NextResponse("Not found", { status: 404 });
    }

    const stat = fs.statSync(filePath);
    const file = fs.readFileSync(filePath);

    // Version the cache by mtime so an updated file gets a new ETag
    // even if it keeps the same filename. Short TTL means deletions
    // and replacements propagate within minutes, not a year.
    const etag = `"${stat.size}-${Math.floor(stat.mtimeMs)}"`;

    return new NextResponse(file, {
      status: 200,
      headers: {
        "Content-Type": "image/webp",
        ETag: etag,
        "Cache-Control":
          "public, max-age=60, s-maxage=300, stale-while-revalidate=600, must-revalidate",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  // ── List all ─────────────────────────────────────────────
  const entries = listAllThumbnails();
  const origin = new URL(request.url).origin;

  // Fingerprint changes whenever a file is added, removed, renamed,
  // or modified — clients use it to invalidate their local cache.
  const fingerprint = entries.reduce((max, e) => Math.max(max, e.mtimeMs), 0);

  const items = entries.map((e) => ({
    name: e.name,
    // Append v=mtime so the browser treats updated bytes as a new URL
    thumbnail: `${origin}/api/thumbnails?name=${encodeURIComponent(
      e.name,
    )}&v=${Math.floor(e.mtimeMs)}`,
  }));

  return NextResponse.json(
    {
      total: items.length,
      fingerprint,
      updatedAt: new Date().toISOString(),
      thumbnails: items.map((i) => i.thumbnail),
      items,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        // List must never be cached by the CDN or the browser — every
        // page load re-asks the function, which re-reads the deployed
        // filesystem. That's how production stays in sync with deploys.
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    },
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept",
    },
  });
}
