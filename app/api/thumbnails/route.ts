// app/api/thumbnails/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const revalidate = 3600; // cache for 1 hour

const THUMBNAILS_DIR = path.join(process.cwd(), "public", "thumbnails");

// ─────────────────────────────────────────────────────────────
// List all thumbnails by scanning the filesystem
// ─────────────────────────────────────────────────────────────
function listAllThumbnails(): string[] {
  if (!fs.existsSync(THUMBNAILS_DIR)) return [];

  const files = fs.readdirSync(THUMBNAILS_DIR, { withFileTypes: true });

  return files
    .filter(
      (entry) =>
        entry.isFile() &&
        entry.name.toLowerCase().endsWith(".webp") &&
        !entry.name.startsWith("."),
    )
    .map((entry) => entry.name.replace(/\.webp$/i, ""))
    .sort();
}

// ─────────────────────────────────────────────────────────────
// GET handler
// ─────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  // ── Case 1: Serve a single image ─────────────────────────
  if (name) {
    // Sanitize to prevent directory traversal
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

  // ── Case 2: Return the list of all thumbnails ────────────
  const names = listAllThumbnails();
  const origin = new URL(request.url).origin;

  const items = names.map((name) => ({
    name,
    thumbnail: `${origin}/api/thumbnails?name=${encodeURIComponent(name)}`,
  }));

  return NextResponse.json(
    {
      total: items.length,
      updatedAt: new Date().toISOString(),
      thumbnails: items.map((i) => i.thumbnail),
      items,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control":
          "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}

// ─────────────────────────────────────────────────────────────
// CORS preflight
// ─────────────────────────────────────────────────────────────
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