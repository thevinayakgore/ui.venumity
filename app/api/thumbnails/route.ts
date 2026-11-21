// app/api/thumbnails/route.ts
import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Cache for 1 hour to save CPU

const THUMBNAILS_DIR = path.join(process.cwd(), "public", "thumbnails");
const CANONICAL_ORIGIN =
  process.env.NEXT_PUBLIC_UI_URL || "https://ui.venumity.com";

function sanitizeThumbnailName(rawName: string): string | null {
  const base = path.basename(rawName).replace(/\.webp$/i, "").trim();
  if (!base || base === "." || base === "..") return null;
  if (!/^[a-zA-Z0-9_-]+$/.test(base)) return null;
  return base;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const nameParam = searchParams.get("name");

  // ── Single image redirect ────────────────────────────────
  if (nameParam !== null) {
    const safeName = sanitizeThumbnailName(nameParam);
    if (!safeName) {
      return new NextResponse("Invalid thumbnail name", { status: 400 });
    }

    const filePath = path.join(THUMBNAILS_DIR, `${safeName}.webp`);
    if (!fs.existsSync(filePath)) {
      return new NextResponse("Not found", { status: 404 });
    }

    return NextResponse.redirect(
      new URL(`/thumbnails/${safeName}.webp`, CANONICAL_ORIGIN),
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  }

  // ── List all thumbnails ──────────────────────────────────
  let names: string[] = [];
  try {
    if (fs.existsSync(THUMBNAILS_DIR)) {
      names = fs
        .readdirSync(THUMBNAILS_DIR)
        .filter((f) => f.endsWith(".webp") && !f.startsWith("."))
        .map((f) => f.replace(/\.webp$/i, ""))
        .sort();
    }
  } catch (e) {
    console.error("Failed to read thumbnails", e);
  }

  const thumbnails = names.map(
    (n) => `${CANONICAL_ORIGIN}/thumbnails/${n}.webp`,
  );

  return NextResponse.json(
    {
      total: thumbnails.length,
      thumbnails,
      names,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}