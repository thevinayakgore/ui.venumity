// app/api/thumbnails/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const THUMBNAILS_DIR = path.join(process.cwd(), "public", "thumbnails");

function listAllThumbnails(): { name: string; mtimeMs: number }[] {
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

    const file = fs.readFileSync(filePath);

    return new NextResponse(file, {
      status: 200,
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control":
          "public, max-age=31536000, s-maxage=31536000, immutable",
      },
    });
  }

  // ── List all ─────────────────────────────────────────────
  const entries = listAllThumbnails();
  const origin = new URL(request.url).origin;

  const fingerprint = entries.reduce(
    (max, e) => Math.max(max, e.mtimeMs),
    0,
  );

  const items = entries.map((e) => ({
    name: e.name,
    thumbnail: `${origin}/api/thumbnails?name=${encodeURIComponent(e.name)}`,
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
        "Cache-Control":
          "public, s-maxage=60, stale-while-revalidate=86400",
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
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}