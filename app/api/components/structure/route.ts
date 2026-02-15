// app/api/components/structure/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  path?: string;
}

function getFolderStructure(dirPath: string, relativePath: string = ""): FileNode | null {
  try {
    if (!fs.existsSync(dirPath)) {
      return null;
    }

    const stats = fs.statSync(dirPath);
    const name = path.basename(dirPath);

    if (stats.isFile()) {
      // Only include relevant file types
      const ext = path.extname(name);
      if (['.tsx', '.ts', '.jsx', '.js', '.css', '.json', '.md'].includes(ext)) {
        return {
          name,
          type: "file",
          path: relativePath
        };
      }
      return null;
    }

    if (stats.isDirectory()) {
      const items = fs.readdirSync(dirPath);
      const children: FileNode[] = [];

      // Sort items: folders first, then files
      const sortedItems = items.sort((a, b) => {
        const aPath = path.join(dirPath, a);
        const bPath = path.join(dirPath, b);
        const aIsDir = fs.statSync(aPath).isDirectory();
        const bIsDir = fs.statSync(bPath).isDirectory();
        
        if (aIsDir && !bIsDir) return -1;
        if (!aIsDir && bIsDir) return 1;
        return a.localeCompare(b);
      });

      for (const item of sortedItems) {
        // Skip node_modules, .next, and hidden directories
        if (item === "node_modules" || item === ".next" || item === "dist" || item.startsWith(".")) {
          continue;
        }

        const itemPath = path.join(dirPath, item);
        const itemRelativePath = relativePath ? `${relativePath}/${item}` : item;
        const childNode = getFolderStructure(itemPath, itemRelativePath);
        
        if (childNode) {
          children.push(childNode);
        }
      }

      return {
        name: path.basename(dirPath),
        type: "folder",
        children,
        path: relativePath
      };
    }

    return null;
  } catch (error) {
    console.error("Error reading folder structure:", error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const componentPath = searchParams.get("path");

    if (!componentPath) {
      return NextResponse.json(
        { error: "Path parameter is required" },
        { status: 400 }
      );
    }

    const basePath = path.join(process.cwd(), "components", "venumity");
    const fullPath = path.join(basePath, componentPath);

    if (!fs.existsSync(fullPath)) {
      return NextResponse.json(
        { error: "Path not found" },
        { status: 404 }
      );
    }

    const stats = fs.statSync(fullPath);
    
    // If it's a file, return just that file
    if (stats.isFile()) {
      return NextResponse.json({
        name: path.basename(fullPath),
        type: "file",
        path: componentPath,
        children: []
      });
    }

    // If it's a directory, get its structure
    const structure = getFolderStructure(fullPath, componentPath);

    if (!structure) {
      return NextResponse.json(
        { error: "Could not read folder structure" },
        { status: 404 }
      );
    }

    return NextResponse.json(structure);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch folder structure" },
      { status: 500 }
    );
  }
}