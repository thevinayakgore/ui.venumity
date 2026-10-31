// app/api/components/route.ts
export const dynamic = "force-dynamic";
import fs from "fs";
import path from "path";
import { toKebabCase } from "@/utils/slug-kebab";
import { NextRequest, NextResponse } from "next/server";

const DEMO_BASE = path.join(process.cwd(), "components", "venumity");
const SOURCE_BASE = path.join(process.cwd(), "components", "ui");
const PRIMITIVE_BASE = path.join(
  process.cwd(),
  "components",
  "venumity",
  "primitives",
);
const COMPONENT_BASE = path.join(
  process.cwd(),
  "components",
  "venumity",
  "components",
);

// ── ETag / response helpers ──────────────────────────────
function mtimeOf(fileOrFolder: string): string {
  try {
    const stat = fs.statSync(/*turbopackIgnore: true*/ fileOrFolder);
    return `${stat.mtimeMs}`;
  } catch {
    return "0";
  }
}

function jsonWithETag(
  request: NextRequest,
  data: unknown,
  etag: string,
  status = 200,
) {
  const incoming = request.headers.get("if-none-match");
  if (incoming && incoming === etag) {
    return new NextResponse(null, {
      status: 304,
      headers: {
        ETag: etag,
        "Cache-Control": "private, no-cache, must-revalidate",
      },
    });
  }
  return NextResponse.json(data, {
    status,
    headers: {
      ETag: etag,
      "Cache-Control": "private, no-cache, must-revalidate",
    },
  });
}

function jsonError(message: string, status = 400) {
  return NextResponse.json(
    { error: message },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

// ── Helpers ───────────────────────────────────────────────
function readAllFiles(
  folderPath: string,
  basePath: string,
): Array<{ path: string; content: string }> {
  const files: Array<{ path: string; content: string }> = [];
  if (!fs.existsSync(/*turbopackIgnore: true*/ folderPath)) return files;

  for (const item of fs.readdirSync(/*turbopackIgnore: true*/ folderPath, {
    withFileTypes: true,
  })) {
    const fullPath = path.join(/*turbopackIgnore: true*/ folderPath, item.name);
    if (item.isDirectory()) {
      files.push(...readAllFiles(fullPath, basePath));
    } else if (
      item.isFile() &&
      (item.name.endsWith(".tsx") ||
        item.name.endsWith(".ts") ||
        item.name.endsWith(".css"))
    ) {
      files.push({
        path: path.relative(basePath, fullPath).replace(/\\/g, "/"),
        content: fs.readFileSync(/*turbopackIgnore: true*/ fullPath, "utf-8"),
      });
    }
  }
  return files;
}

// Find the subcategory folder across ALL possible bases
function findSubcategoryDir(
  category: string,
  subcategory: string,
): string | null {
  const candidatePaths = [
    path.join(DEMO_BASE, toKebabCase(category), toKebabCase(subcategory)),
    path.join(PRIMITIVE_BASE, toKebabCase(category), toKebabCase(subcategory)),
    path.join(COMPONENT_BASE, toKebabCase(category), toKebabCase(subcategory)),
  ];

  for (const p of candidatePaths) {
    if (
      fs.existsSync(/*turbopackIgnore: true*/ p) &&
      fs.statSync(/*turbopackIgnore: true*/ p).isDirectory()
    ) {
      return p;
    }
  }
  return null;
}

function findComponent(
  base: string,
  categoryOrItem: string,
  parts: string[],
): {
  code: string;
  isFolder: boolean;
  files: Array<{ path: string; content: string }>;
} | null {
  const baseDirEntries = fs.existsSync(/*turbopackIgnore: true*/ base)
    ? fs.readdirSync(/*turbopackIgnore: true*/ base, { withFileTypes: true })
    : [];
  const categoryDir = baseDirEntries.find(
    (e) =>
      e.isDirectory() && toKebabCase(e.name) === toKebabCase(categoryOrItem),
  );
  if (!categoryDir) return null;

  const baseDir = path.join(/*turbopackIgnore: true*/ base, categoryDir.name);
  const partsKebab = parts.map(toKebabCase);
  const singleFile =
    path.join(/*turbopackIgnore: true*/ baseDir, ...partsKebab) + ".tsx";
  if (
    fs.existsSync(/*turbopackIgnore: true*/ singleFile) &&
    fs.statSync(/*turbopackIgnore: true*/ singleFile).isFile()
  ) {
    return {
      code: fs.readFileSync(/*turbopackIgnore: true*/ singleFile, "utf-8"),
      isFolder: false,
      files: [],
    };
  }

  const folderPath = path.join(
    /*turbopackIgnore: true*/ baseDir,
    ...partsKebab,
  );
  const indexPath = path.join(
    /*turbopackIgnore: true*/ folderPath,
    "index.tsx",
  );
  if (
    fs.existsSync(/*turbopackIgnore: true*/ indexPath) &&
    fs.statSync(/*turbopackIgnore: true*/ indexPath).isFile()
  ) {
    return {
      code: fs.readFileSync(/*turbopackIgnore: true*/ indexPath, "utf-8"),
      isFolder: true,
      files: readAllFiles(folderPath, folderPath),
    };
  }

  const searchKebab = (dir: string, remaining: string[]): string | null => {
    if (remaining.length === 0) return null;
    const [head, ...rest] = remaining;
    const entries = fs.readdirSync(/*turbopackIgnore: true*/ dir, {
      withFileTypes: true,
    });

    for (const e of entries) {
      const eKebab = toKebabCase(e.name.replace(/\.tsx$/, ""));
      if (eKebab !== head) continue;

      if (e.isFile() && e.name.endsWith(".tsx")) {
        if (rest.length === 0)
          return path.join(/*turbopackIgnore: true*/ dir, e.name);
      } else if (e.isDirectory()) {
        if (rest.length === 0) {
          const idx = path.join(
            /*turbopackIgnore: true*/ dir,
            e.name,
            "index.tsx",
          );
          if (fs.existsSync(/*turbopackIgnore: true*/ idx)) return idx;
        } else {
          const found = searchKebab(
            path.join(/*turbopackIgnore: true*/ dir, e.name),
            rest,
          );
          if (found) return found;
        }
      }
    }
    return null;
  };

  const found = searchKebab(baseDir, partsKebab);
  if (found) {
    const isIdx = found.endsWith("index.tsx");
    const folderPath2 = path.dirname(/*turbopackIgnore: true*/ found);
    return {
      code: fs.readFileSync(/*turbopackIgnore: true*/ found, "utf-8"),
      isFolder: isIdx,
      files: isIdx
        ? readAllFiles(
            /*turbopackIgnore: true*/ folderPath2,
            /*turbopackIgnore: true*/ folderPath2,
          )
        : [],
    };
  }

  return null;
}

function findSourceWithFallback(
  item: string,
  category?: string,
  subcategory?: string,
): {
  code: string;
  isFolder: boolean;
  files: Array<{ path: string; content: string }>;
  sourceType: "ui" | "demo";
} | null {
  const itemKebab = toKebabCase(item);

  if (fs.existsSync(/*turbopackIgnore: true*/ SOURCE_BASE)) {
    const entries = fs.readdirSync(/*turbopackIgnore: true*/ SOURCE_BASE, {
      withFileTypes: true,
    });

    const flatFile = entries.find(
      (e) =>
        e.isFile() &&
        e.name.endsWith(".tsx") &&
        toKebabCase(e.name.replace(/\.tsx$/, "")) === itemKebab,
    );
    if (flatFile) {
      const filePath = path.join(
        /*turbopackIgnore: true*/ SOURCE_BASE,
        flatFile.name,
      );
      return {
        code: fs.readFileSync(/*turbopackIgnore: true*/ filePath, "utf-8"),
        isFolder: false,
        files: [],
        sourceType: "ui",
      };
    }

    const folder = entries.find(
      (e) => e.isDirectory() && toKebabCase(e.name) === itemKebab,
    );
    if (folder) {
      const folderPath = path.join(
        /*turbopackIgnore: true*/ SOURCE_BASE,
        folder.name,
      );
      const indexPath = path.join(
        /*turbopackIgnore: true*/ folderPath,
        "index.tsx",
      );
      if (fs.existsSync(/*turbopackIgnore: true*/ indexPath)) {
        return {
          code: fs.readFileSync(/*turbopackIgnore: true*/ indexPath, "utf-8"),
          isFolder: true,
          files: readAllFiles(folderPath, folderPath),
          sourceType: "ui",
        };
      }
    }
  }

  if (category && subcategory) {
    const demoParts = [toKebabCase(subcategory), toKebabCase(item)];
    const demo = findComponent(DEMO_BASE, category, demoParts);
    if (demo) {
      return { ...demo, sourceType: "demo" };
    }
  }

  return null;
}

// ── GET with ?action= ─────────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    const sp = request.nextUrl.searchParams;
    const action = sp.get("action");

    // ── action=cli-list (for CLI whole-subcategory install) ──
    if (action === "cli-list") {
      const category = sp.get("category") || "";
      const subcategory = sp.get("subcategory") || "";

      if (!category || !subcategory)
        return jsonError("category and subcategory required", 400);

      const subPath = findSubcategoryDir(category, subcategory);
      if (!subPath) return jsonError("Subcategory not found", 404);

      const out: Array<{
        name: string;
        code: string;
        isFolder: boolean;
        files?: Array<{ path: string; content: string }>;
      }> = [];

      for (const item of fs.readdirSync(/*turbopackIgnore: true*/ subPath, {
        withFileTypes: true,
      })) {
        if (item.isFile() && item.name.endsWith(".tsx")) {
          out.push({
            name: item.name.replace(/\.tsx$/, ""),
            code: fs.readFileSync(
              /*turbopackIgnore: true*/ path.join(
                /*turbopackIgnore: true*/ subPath,
                item.name,
              ),
              "utf-8",
            ),
            isFolder: false,
          });
        } else if (item.isDirectory()) {
          const indexPath = path.join(
            /*turbopackIgnore: true*/ subPath,
            item.name,
            "index.tsx",
          );
          if (fs.existsSync(/*turbopackIgnore: true*/ indexPath)) {
            out.push({
              name: item.name,
              code: fs.readFileSync(
                /*turbopackIgnore: true*/ indexPath,
                "utf-8",
              ),
              isFolder: true,
              files: readAllFiles(
                /*turbopackIgnore: true*/ path.join(
                  /*turbopackIgnore: true*/ subPath,
                  item.name,
                ),
                /*turbopackIgnore: true*/ path.join(
                  /*turbopackIgnore: true*/ subPath,
                  item.name,
                ),
              ),
            });
          } else {
            // Fallback: if folder has no index.tsx but has .tsx files
            const tsxFiles = fs
              .readdirSync(
                /*turbopackIgnore: true*/ path.join(
                  /*turbopackIgnore: true*/ subPath,
                  item.name,
                ),
                { withFileTypes: true },
              )
              .filter((f) => f.isFile() && f.name.endsWith(".tsx"));
            for (const tsxFile of tsxFiles) {
              out.push({
                name: tsxFile.name.replace(/\.tsx$/, ""),
                code: fs.readFileSync(
                  /*turbopackIgnore: true*/ path.join(
                    /*turbopackIgnore: true*/ subPath,
                    item.name,
                    tsxFile.name,
                  ),
                  "utf-8",
                ),
                isFolder: false,
              });
            }
          }
        }
      }

      return NextResponse.json(
        { components: out },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    // ── action=cli-source (for CLI single-file fetch) ──
    if (action === "cli-source") {
      const category = sp.get("category") || "";
      const subcategory = sp.get("subcategory") || "";
      const item = sp.get("item") || "";

      if (!category || !subcategory || !item)
        return jsonError("category, subcategory, item required", 400);

      const subPath = findSubcategoryDir(category, subcategory);
      if (!subPath) return jsonError("Subcategory not found", 404);

      const itemKebab = toKebabCase(item);
      const flat = path.join(
        /*turbopackIgnore: true*/ subPath,
        `${itemKebab}.tsx`,
      );
      const folder = path.join(/*turbopackIgnore: true*/ subPath, itemKebab);

      // Case 1: flat file
      if (
        fs.existsSync(/*turbopackIgnore: true*/ flat) &&
        fs.statSync(/*turbopackIgnore: true*/ flat).isFile()
      ) {
        return NextResponse.json(
          {
            kind: "single",
            entry: `${itemKebab}.tsx`,
            code: fs.readFileSync(/*turbopackIgnore: true*/ flat, "utf-8"),
            files: [],
          },
          { headers: { "Cache-Control": "no-store" } },
        );
      }

      // Case 2: folder with index.tsx or tsx files
      if (
        fs.existsSync(/*turbopackIgnore: true*/ folder) &&
        fs.statSync(/*turbopackIgnore: true*/ folder).isDirectory()
      ) {
        const files = readAllFiles(folder, folder);
        const entry = files.find(
          (f) => f.path === "index.tsx" || f.path.endsWith("/index.tsx"),
        );
        return NextResponse.json(
          {
            kind: "multi",
            entry: entry?.path || files[0]?.path || "index.tsx",
            code: entry?.content || files[0]?.content || "",
            files,
          },
          { headers: { "Cache-Control": "no-store" } },
        );
      }

      return jsonError("Item not found", 404);
    }

    // ── action=demo (legacy) ───────────────────────────────
    if (action === "demo") {
      const category = sp.get("category") || "";
      const subcategory = sp.get("subcategory") || "";
      const item = sp.get("item") || "";
      if (!category || !item)
        return jsonError("category and item required", 400);

      const parts = [subcategory, item].filter(Boolean);
      const demo = findComponent(DEMO_BASE, category, parts);
      if (!demo) return jsonError("Demo not found", 404);
      return jsonError("Use action=item-files instead", 400);
    }

    // ── action=source (legacy) ─────────────────────────────
    if (action === "source") {
      const item = sp.get("item") || "";
      const category = sp.get("category") || "";
      const subcategory = sp.get("subcategory") || "";
      if (!item) return jsonError("item required", 400);

      const source = findSourceWithFallback(item, category, subcategory);
      if (!source) return jsonError("Source not found", 404);
      return NextResponse.json(source, {
        headers: { "Cache-Control": "no-store" },
      });
    }

    // ── action=primitive-source ────────────────────────────
    if (action === "primitive-source") {
      const filePath = sp.get("filePath") || "";
      const registry = sp.get("registry") || "";

      if (!filePath) return jsonError("filePath required", 400);

      const roots: string[] = [];
      if (registry === "primitives") roots.push(PRIMITIVE_BASE);
      else if (registry === "components") roots.push(COMPONENT_BASE);
      else roots.push(PRIMITIVE_BASE, COMPONENT_BASE);

      let resolved: string | null = null;
      for (const root of roots) {
        const full = path.join(/*turbopackIgnore: true*/ root, filePath);

        if (
          fs.existsSync(/*turbopackIgnore: true*/ full) &&
          fs.statSync(/*turbopackIgnore: true*/ full).isFile()
        ) {
          resolved = full;
          break;
        }

        const dir = path.dirname(/*turbopackIgnore: true*/ full);
        const idx = path.join(/*turbopackIgnore: true*/ dir, "index.tsx");
        if (fs.existsSync(/*turbopackIgnore: true*/ idx)) {
          resolved = idx;
          break;
        }

        if (
          fs.existsSync(/*turbopackIgnore: true*/ dir) &&
          fs.statSync(/*turbopackIgnore: true*/ dir).isDirectory()
        ) {
          const files = fs.readdirSync(/*turbopackIgnore: true*/ dir, {
            withFileTypes: true,
          });
          const firstTsx = files.find(
            (f) => f.isFile() && f.name.endsWith(".tsx"),
          );
          if (firstTsx) {
            resolved = path.join(/*turbopackIgnore: true*/ dir, firstTsx.name);
            break;
          }
        }
      }

      if (!resolved) return jsonError("File not found", 404);

      const rawCode = fs.readFileSync(
        /*turbopackIgnore: true*/ resolved,
        "utf-8",
      );

      const etag = `"${mtimeOf(resolved)}-${path.basename(resolved)}-raw"`;

      return jsonWithETag(
        request,
        {
          code: rawCode,
          name: path.basename(resolved),
          path: filePath,
        },
        etag,
      );
    }

    // ── action=primitive-demo ──────────────────────────────
    if (action === "primitive-demo") {
      const category = sp.get("category") || "";
      const subcategory = sp.get("subcategory") || "";
      const demoName = sp.get("demo") || "demo";
      const registry = sp.get("registry") || "";

      if (!category || !subcategory)
        return jsonError("category and subcategory required", 400);

      const roots: string[] = [];
      if (registry === "primitives") roots.push(PRIMITIVE_BASE);
      else if (registry === "components") roots.push(COMPONENT_BASE);
      else roots.push(PRIMITIVE_BASE, COMPONENT_BASE);

      let resolved: string | null = null;
      for (const root of roots) {
        const baseDir = path.join(
          /*turbopackIgnore: true*/ root,
          toKebabCase(category),
          toKebabCase(subcategory),
        );
        const candidates = [
          path.join(
            /*turbopackIgnore: true*/ baseDir,
            `${toKebabCase(demoName)}.tsx`,
          ),
          path.join(/*turbopackIgnore: true*/ baseDir, "demo.tsx"),
          path.join(/*turbopackIgnore: true*/ baseDir, "default.tsx"),
        ];
        const found = candidates.find((c) =>
          fs.existsSync(/*turbopackIgnore: true*/ c),
        );
        if (found) {
          resolved = found;
          break;
        }
      }

      if (!resolved) return jsonError("Demo not found", 404);

      const rawCode = fs.readFileSync(
        /*turbopackIgnore: true*/ resolved,
        "utf-8",
      );

      const etag = `"${mtimeOf(resolved)}-${path.basename(resolved)}-raw"`;

      return jsonWithETag(request, { code: rawCode, isDemo: true }, etag);
    }

    // ── action=list (original, unchanged) ──────────────────
    if (action === "list") {
      const category = sp.get("category") || "";
      const subcategory = sp.get("subcategory") || "";
      if (!category || !subcategory)
        return jsonError("category and subcategory required", 400);

      const subPath = path.join(
        /*turbopackIgnore: true*/ DEMO_BASE,
        toKebabCase(category),
        toKebabCase(subcategory),
      );
      if (!fs.existsSync(/*turbopackIgnore: true*/ subPath)) {
        return NextResponse.json(
          { components: [] },
          { headers: { "Cache-Control": "no-store" } },
        );
      }

      const out: Array<{
        name: string;
        code: string;
        isFolder: boolean;
        files?: Array<{ path: string; content: string }>;
      }> = [];

      for (const item of fs.readdirSync(/*turbopackIgnore: true*/ subPath, {
        withFileTypes: true,
      })) {
        if (item.isFile() && item.name.endsWith(".tsx")) {
          out.push({
            name: item.name.replace(/\.tsx$/, ""),
            code: fs.readFileSync(
              /*turbopackIgnore: true*/ path.join(
                /*turbopackIgnore: true*/ subPath,
                item.name,
              ),
              "utf-8",
            ),
            isFolder: false,
          });
        } else if (item.isDirectory()) {
          const indexPath = path.join(
            /*turbopackIgnore: true*/ subPath,
            item.name,
            "index.tsx",
          );
          if (fs.existsSync(/*turbopackIgnore: true*/ indexPath)) {
            out.push({
              name: item.name,
              code: fs.readFileSync(
                /*turbopackIgnore: true*/ indexPath,
                "utf-8",
              ),
              isFolder: true,
              files: readAllFiles(
                /*turbopackIgnore: true*/ path.join(
                  /*turbopackIgnore: true*/ subPath,
                  item.name,
                ),
                /*turbopackIgnore: true*/ path.join(
                  /*turbopackIgnore: true*/ subPath,
                  item.name,
                ),
              ),
            });
          }
        }
      }

      return NextResponse.json(
        { components: out },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    // ── action=file (unchanged) ───────────────────────────
    if (action === "file") {
      const filePath = sp.get("path") || "";
      if (!filePath) return jsonError("path required", 400);
      const full = path.join(
        /*turbopackIgnore: true*/ SOURCE_BASE,
        decodeURIComponent(filePath),
      );
      if (
        !fs.existsSync(/*turbopackIgnore: true*/ full) ||
        !fs.statSync(/*turbopackIgnore: true*/ full).isFile()
      ) {
        return jsonError("File not found", 404);
      }

      const etag = `"${mtimeOf(full)}-${path.basename(full)}"`;
      const content = fs.readFileSync(/*turbopackIgnore: true*/ full, "utf-8");

      return jsonWithETag(
        request,
        { content, name: path.basename(full), path: filePath },
        etag,
      );
    }

    // ── action=structure (unchanged) ──────────────────────
    if (action === "structure") {
      const p = sp.get("path") || "";
      const full = path.join(/*turbopackIgnore: true*/ SOURCE_BASE, p);
      if (!fs.existsSync(/*turbopackIgnore: true*/ full)) {
        return jsonError("Path not found", 404);
      }

      const buildTree = (dir: string, rel: string): unknown => {
        const stats = fs.statSync(/*turbopackIgnore: true*/ dir);
        const node: Record<string, unknown> = {
          name: path.basename(dir),
          type: stats.isDirectory() ? "folder" : "file",
          path: path.relative(rel, dir).replace(/\\/g, "/"),
        };
        if (stats.isDirectory()) {
          node.children = fs
            .readdirSync(/*turbopackIgnore: true*/ dir, {
              withFileTypes: true,
            })
            .map((c) =>
              buildTree(path.join(/*turbopackIgnore: true*/ dir, c.name), rel),
            );
        }
        return node;
      };

      return NextResponse.json(buildTree(full, SOURCE_BASE), {
        headers: { "Cache-Control": "no-store" },
      });
    }

    // ── action=component-folder (unchanged) ───────────────
    if (action === "component-folder") {
      const registry = sp.get("registry") || "components";
      const filePath = sp.get("folderPath") || "";
      if (!filePath) return jsonError("folderPath required", 400);

      const root = registry === "primitives" ? PRIMITIVE_BASE : COMPONENT_BASE;
      const folder = path.join(/*turbopackIgnore: true*/ root, filePath);
      if (
        !fs.existsSync(/*turbopackIgnore: true*/ folder) ||
        !fs.statSync(/*turbopackIgnore: true*/ folder).isDirectory()
      ) {
        return jsonError("Folder not found", 404);
      }

      const files = readAllFiles(folder, folder);
      const etag = `"${mtimeOf(folder)}-${filePath}-raw"`;

      return jsonWithETag(request, { isFolder: true, files }, etag);
    }

    // ── action=item-files (unchanged) ─────────────────────
    if (action === "item-files") {
      const registry = sp.get("registry") || "components";
      const category = sp.get("category") || "";
      const subcategory = sp.get("subcategory") || "";
      const item = sp.get("item") || "";

      if (!category || !subcategory || !item)
        return jsonError("category, subcategory, item required", 400);

      const root = registry === "primitives" ? PRIMITIVE_BASE : COMPONENT_BASE;
      const baseDir = path.join(
        /*turbopackIgnore: true*/ root,
        toKebabCase(category),
        toKebabCase(subcategory),
      );

      const itemKebab = toKebabCase(item);
      const folderPath = path.join(
        /*turbopackIgnore: true*/ baseDir,
        itemKebab,
      );
      const flatFilePath = path.join(
        /*turbopackIgnore: true*/ baseDir,
        `${itemKebab}.tsx`,
      );

      if (
        fs.existsSync(/*turbopackIgnore: true*/ folderPath) &&
        fs.statSync(/*turbopackIgnore: true*/ folderPath).isDirectory()
      ) {
        const allFiles = readAllFiles(folderPath, folderPath);
        allFiles.sort((a, b) => {
          const aIsIndex =
            a.path === "index.tsx" || a.path.endsWith("/index.tsx");
          const bIsIndex =
            b.path === "index.tsx" || b.path.endsWith("/index.tsx");
          if (aIsIndex && !bIsIndex) return -1;
          if (!aIsIndex && bIsIndex) return 1;
          return a.path.localeCompare(b.path);
        });

        const entry = allFiles.find(
          (f) => f.path === "index.tsx" || f.path.endsWith("/index.tsx"),
        );

        const etag = `"${mtimeOf(folderPath)}-${itemKebab}-multi-raw"`;

        return jsonWithETag(
          request,
          {
            kind: "multi",
            entry: entry?.path || allFiles[0]?.path || "index.tsx",
            entryCode: entry?.content || allFiles[0]?.content || "",
            files: allFiles,
          },
          etag,
        );
      }

      if (
        fs.existsSync(/*turbopackIgnore: true*/ flatFilePath) &&
        fs.statSync(/*turbopackIgnore: true*/ flatFilePath).isFile()
      ) {
        const content = fs.readFileSync(
          /*turbopackIgnore: true*/ flatFilePath,
          "utf-8",
        );
        const etag = `"${mtimeOf(flatFilePath)}-${itemKebab}-single-raw"`;

        return jsonWithETag(
          request,
          {
            kind: "single",
            entry: `${itemKebab}.tsx`,
            entryCode: content,
            files: [{ path: `${itemKebab}.tsx`, content }],
          },
          etag,
        );
      }

      return jsonError("Item not found", 404);
    }

    // ── action=check (unchanged) ──────────────────────────
    if (action === "check") {
      const category = sp.get("category") || "";
      const subcategory = sp.get("subcategory") || "";
      const item = sp.get("item") || "";
      if (!item) return jsonError("item required", 400);

      const demoParts = [subcategory, item].filter(Boolean);
      const hasDemo =
        category.length > 0
          ? findComponent(DEMO_BASE, category, demoParts) !== null
          : false;
      const hasSource = findSourceWithFallback(item) !== null;

      return NextResponse.json(
        { hasDemo, hasSource },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    return jsonError("Unknown action", 400);
  } catch (error) {
    console.error("Components API error:", error);
    return jsonError("Failed", 500);
  }
}
