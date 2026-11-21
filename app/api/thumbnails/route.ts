// app/api/thumbnails/route.ts
import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = 3600; // Cache for 1 hour to save CPU

const THUMBNAILS_DIR = path.join(process.cwd(), "public", "thumbnails");

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  // ── Single image redirect ────────────────────────────────
  if (name) {
    const safeName = path.basename(name).replace(/\.webp$/i, "");
    const filePath = path.join(THUMBNAILS_DIR, `${safeName}.webp`);

    // Just check if it exists to avoid 404s
    if (!fs.existsSync(filePath)) {
      return new NextResponse("Not found", { status: 404 });
    }

    // Redirect to the static file in the public folder instead of reading it via Node.js
    return NextResponse.redirect(new URL(`/thumbnails/${safeName}.webp`, request.url));
  }

  // ── List all (static generation) ─────────────────────────
  // Only runs once per hour (or at build time)
  let names: string[] = [];
  try {
    if (fs.existsSync(THUMBNAILS_DIR)) {
      names = fs
        .readdirSync(THUMBNAILS_DIR)
        .filter((f) => f.endsWith(".webp") && !f.startsWith("."))
        .map((f) => f.replace(/\.webp$/i, ""));
    }
  } catch (e) {
    console.error("Failed to read thumbnails", e);
  }

  const origin = new URL(request.url).origin;
  
  // Return direct static URLs
  const thumbnails = names.map((n) => `${origin}/thumbnails/${n}.webp`);

  return NextResponse.json(
    {
      total: thumbnails.length,
      thumbnails,
      names, // Array of just the names for easy client-side checking
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}