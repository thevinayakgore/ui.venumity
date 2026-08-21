// app/api/resources/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "registry");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get("path");

  if (!filePath) {
    return NextResponse.json({ error: "No path provided" }, { status: 400 });
  }

  try {
    // Ensure the path is scoped to the registry directory
    const fullPath = path.join(/* turbopackIgnore: true */ CONTENT_DIR, filePath);
    
    // Prevent path traversal
    if (!fullPath.startsWith(CONTENT_DIR)) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }
    
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
    const content = fs.readFileSync(fullPath, "utf-8");
    const stats = fs.statSync(fullPath);

    return NextResponse.json({
      content,
      lastModified: stats.mtime.toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error reading file: " + error },
      { status: 500 },
    );
  }
}