// app/api/components/file/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filePath = searchParams.get("path");

    if (!filePath) {
      return NextResponse.json(
        { error: "File path parameter is required" },
        { status: 400 },
      );
    }

    // Decode the path to handle special characters
    const decodedPath = decodeURIComponent(filePath);

    const basePath = path.join(process.cwd(), "components", "venumity");
    const fullPath = path.join(basePath, decodedPath);

    if (!fs.existsSync(fullPath)) {
      return NextResponse.json(
        { error: `File not found: ${decodedPath}` },
        { status: 404 },
      );
    }

    const stats = fs.statSync(fullPath);
    if (!stats.isFile()) {
      return NextResponse.json(
        { error: "Path is not a file" },
        { status: 400 },
      );
    }

    const content = fs.readFileSync(fullPath, "utf-8");

    return NextResponse.json({
      content,
      name: path.basename(fullPath),
      path: decodedPath,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch file content" },
      { status: 500 },
    );
  }
}
