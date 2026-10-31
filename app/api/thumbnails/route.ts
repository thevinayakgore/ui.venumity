// app/api/thumbnails/route.ts
import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

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
        // normalize to kebab-case so the client can match without guessing
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

    // Guard against traversal AND ensure the resolved path stays inside the dir
    const resolved = path.resolve(filePath);
    if (!resolved.startsWith(path.resolve(THUMBNAILS_DIR))) {
      return new NextResponse("Forbidden", { status: 403 });
    }
    if (!fs.existsSync(filePath)) {
      return new NextResponse("Not found", { status: 404 });
    }

    const stat = fs.statSync(filePath);
    const file = fs.readFileSync(filePath);
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

  const fingerprint = entries.reduce((max, e) => Math.max(max, e.mtimeMs), 0);

  const items = entries.map((e) => ({
    name: e.name,
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
      // Also expose a plain Set-friendly array of names for client-side
      // "does this file exist?" checks
      names: items.map((i) => i.name),
      items,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
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
