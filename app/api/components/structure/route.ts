import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface TreeNode {
  name: string;
  type: "file" | "folder";
  path: string;
  children?: TreeNode[];
}

function buildTree(dirPath: string, relativeTo: string): TreeNode | null {
  if (!fs.existsSync(dirPath)) return null;

  const stats = fs.statSync(dirPath);
  const node: TreeNode = {
    name: path.basename(dirPath),
    type: stats.isDirectory() ? "folder" : "file",
    path: path.relative(relativeTo, dirPath).replace(/\\/g, "/"),
  };

  if (stats.isDirectory()) {
    const children = fs.readdirSync(dirPath, { withFileTypes: true });
    node.children = [];
    for (const child of children) {
      const childPath = path.join(dirPath, child.name);
      const childNode = buildTree(childPath, relativeTo);
      if (childNode) node.children.push(childNode);
    }
  }

  return node;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const requestedPath = searchParams.get("path") || "";

  const base = path.join(process.cwd(), "components", "venumity");
  const fullPath = path.join(base, requestedPath);

  if (!fs.existsSync(fullPath)) {
    return NextResponse.json({ error: "Path not found" }, { status: 404 });
  }

  const tree = buildTree(fullPath, base);
  if (!tree) {
    return NextResponse.json({ error: "Could not read directory" }, { status: 500 });
  }

  return NextResponse.json(tree);
}