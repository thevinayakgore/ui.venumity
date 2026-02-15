// app/api/components/check-folder/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const componentPath = searchParams.get("path");

    if (!componentPath) {
      return NextResponse.json(
        { error: "Path parameter is required" },
        { status: 400 },
      );
    }

    const basePath = path.join(process.cwd(), "components", "venumity");
    const fullPath = path.join(basePath, componentPath);

    // Check if path exists
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ 
        isFolderBased: false,
        exists: false 
      });
    }

    // Check if it's a directory
    const stats = fs.statSync(fullPath);
    const isDirectory = stats.isDirectory();
    
    // If it's a directory, check for index.tsx or page.tsx
    let isFolderBased = false;
    let files: string[] = [];

    if (isDirectory) {
      const indexPath = path.join(fullPath, "index.tsx");
      const pagePath = path.join(fullPath, "page.tsx");
      isFolderBased = fs.existsSync(indexPath) || fs.existsSync(pagePath);
      
      // Get all files in the directory for structure display
      if (isFolderBased) {
        const items = fs.readdirSync(fullPath);
        files = items.filter(item => 
          item.endsWith('.tsx') || 
          item.endsWith('.ts') || 
          item.endsWith('.css') ||
          item.endsWith('.json')
        );
      }
    }

    return NextResponse.json({ 
      isFolderBased,
      isDirectory,
      exists: true,
      fileCount: files.length,
      files 
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to check folder structure" },
      { status: 500 },
    );
  }
}