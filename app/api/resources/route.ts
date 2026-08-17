import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get("path");

  if (!filePath) {
    return NextResponse.json({ error: "No path provided" }, { status: 400 });
  }

  try {
    const fullPath = path.join(process.cwd(), filePath);
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
