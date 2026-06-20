// app/components/content/manual.tsx
"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import CodeBlock from "@/components/site/common/code-block";
import { toKebabCase } from "@/utils/slug-kebab";
import {
  filterShadcnImports,
  extractDependencies,
} from "@/utils/code-extractor";

const BASE_DEPENDENCIES = ["lucide-react"];

interface ManualProps {
  componentName: string;
  componentPath: string;
  code?: string;
}

interface FileEntry {
  name: string;
  path: string;
}

interface TreeNode {
  name: string;
  type: "file" | "folder";
  path: string;
  children?: TreeNode[];
}

// StepItem component moved OUTSIDE of the main component
interface StepItemProps {
  multiPage?: boolean;
  number: number;
  title: string;
  children: React.ReactNode;
  fileName?: string;
  isLast?: boolean;
  showTitle?: boolean;
}

const StepItem = ({
  multiPage,
  number,
  title,
  children,
  fileName,
  isLast = false,
  showTitle,
}: StepItemProps) => (
  <div className="relative flex gap-4 pl-3.25">
    <div className="absolute top-0 left-0 size-7 rounded-full bg-foreground/5 backdrop-blur-lg border flex items-center justify-center">
      <span className="text-xs font-bold text-foreground/70">{number}</span>
    </div>
    <div
      className={`flex-1 space-y-3 pl-5 md:pl-10 ${isLast ? "pb-0" : "pb-5"} border-l w-full`}
    >
      <div>
        {showTitle && <h3 className="text-base font-semibold">{title}</h3>}
        <span
          className={`${multiPage ? "text-sm text-foreground/50" : "text-base font-semibold text-foreground"}`}
        >
          {multiPage ? `Add ${fileName}` : title}
        </span>
        {fileName && !multiPage && (
          <p className="text-sm text-foreground/50 font-mono mt-1">
            {fileName}
          </p>
        )}
      </div>
      <div className="p-1.5 bg-foreground/5 backdrop-blur-md rounded-xl w-full">
        <div className="border border-foreground/5 rounded-lg overflow-hidden w-full">
          {children}
        </div>
      </div>
    </div>
  </div>
);

function isMultiPage(code: string): boolean {
  return /from\s+["']\.\.?\//.test(code);
}

function collectTsxFiles(node: TreeNode, results: FileEntry[] = []) {
  if (node.type === "file" && node.name.endsWith(".tsx")) {
    results.push({ name: node.name, path: node.path });
  }
  if (node.children) {
    node.children.forEach((child) => collectTsxFiles(child, results));
  }
  return results;
}

export default function Manual({
  componentName,
  componentPath,
  code,
}: ManualProps) {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [fileContents, setFileContents] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [subFileContents, setSubFileContents] = useState<
    { name: string; code: string }[]
  >([]);
  const [subFilesLoading, setSubFilesLoading] = useState(false);

  const multiPage = code ? isMultiPage(code) : false;

  // ── Fetch folder tree for multi‑page components ────────
  useEffect(() => {
    if (!multiPage || !code) {
      // Wrap in setTimeout to avoid synchronous setState in effect
      setTimeout(() => {
        setLoading(false);
      }, 0);
      return;
    }

    let cancelled = false;
    async function fetchStructure() {
      try {
        const res = await fetch(
          `/api/components/structure?path=${encodeURIComponent(componentPath)}`,
        );
        if (!res.ok) throw new Error("Failed to fetch structure");
        const root: TreeNode = await res.json();

        const tsxFiles = collectTsxFiles(root);

        const entryFiles = ["index.tsx", "page.tsx"];
        tsxFiles.sort((a, b) => {
          const aIsEntry = entryFiles.includes(a.name);
          const bIsEntry = entryFiles.includes(b.name);
          if (aIsEntry && !bIsEntry) return -1;
          if (!aIsEntry && bIsEntry) return 1;
          return a.name.localeCompare(b.name);
        });

        if (!cancelled) {
          setFiles(tsxFiles);
          setError(null);
          if (tsxFiles.length === 0) {
            setTimeout(() => {
              setLoading(false);
            }, 0);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Could not load file list",
          );
          setFiles([]);
          setTimeout(() => {
            setLoading(false);
          }, 0);
        }
      }
    }
    fetchStructure();
    return () => {
      cancelled = true;
    };
  }, [componentPath, multiPage, code]);

  // ── Fetch content for each file in folder ──────────────
  useEffect(() => {
    if (!multiPage || files.length === 0) return;
    let cancelled = false;

    async function fetchAllFiles() {
      const contents: Record<string, string> = {};
      for (const file of files) {
        try {
          const res = await fetch(
            `/api/components/file?path=${encodeURIComponent(file.path)}`,
          );
          if (res.ok) {
            const data = await res.json();
            contents[file.path] = data.content || "";
          }
        } catch (e) {
          console.error(`Failed to fetch ${file.path}`, e);
        }
      }
      if (!cancelled) {
        setFileContents(contents);
        setTimeout(() => {
          setLoading(false);
        }, 0);
      }
    }
    fetchAllFiles();
    return () => {
      cancelled = true;
    };
  }, [files, multiPage]);

  // ── Single‑page sub‑import fetching ────────────────────
  useEffect(() => {
    if (multiPage || !code) {
      queueMicrotask(() => {
        setSubFileContents([]);
      });
      return;
    }

    const regex = /from\s+["'](\.\/[^"']+)["']/g;
    const paths: string[] = [];
    let match;
    while ((match = regex.exec(code)) !== null) {
      paths.push(match[1].replace(/^\.\//, ""));
    }
    const uniquePaths = [...new Set(paths)];
    if (uniquePaths.length === 0) {
      queueMicrotask(() => {
        setSubFileContents([]);
      });
      return;
    }

    const baseDir = componentPath;
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) setSubFilesLoading(true);
    });

    async function fetchSubFiles() {
      const results: { name: string; code: string }[] = [];
      for (const relPath of uniquePaths) {
        const filePath = `${baseDir}/${relPath}.tsx`;
        const indexPath = `${baseDir}/${relPath}/index.tsx`;

        try {
          let res = await fetch(
            `/api/components/file?path=${encodeURIComponent(filePath)}`,
          );
          if (res.ok) {
            const data = await res.json();
            results.push({ name: relPath + ".tsx", code: data.content || "" });
            continue;
          }

          res = await fetch(
            `/api/components/file?path=${encodeURIComponent(indexPath)}`,
          );
          if (res.ok) {
            const data = await res.json();
            results.push({
              name: relPath + "/index.tsx",
              code: data.content || "",
            });
          }
        } catch (e) {
          console.error(`Failed to fetch sub‑component ${relPath}`, e);
        }
      }
      if (!cancelled) {
        queueMicrotask(() => {
          if (!cancelled) {
            setSubFileContents(results);
            setSubFilesLoading(false);
          }
        });
      }
    }

    fetchSubFiles();
    return () => {
      cancelled = true;
    };
  }, [multiPage, code, componentPath]);

  // ── Combine all source for dependency detection ────────
  const allSource = useMemo(() => {
    const pieces: string[] = [];
    if (multiPage && files.length > 0) {
      pieces.push(...Object.values(fileContents));
    } else if (code) {
      pieces.push(code);
    }
    pieces.push(...subFileContents.map((f) => f.code));
    return pieces.join("\n");
  }, [multiPage, code, fileContents, files.length, subFileContents]);

  // Filter out nextjs and next-themes from dependencies
  const installDeps = useMemo(() => {
    const extracted = extractDependencies(allSource);
    const deps = new Set([...BASE_DEPENDENCIES, ...extracted]);
    // Remove nextjs and next-themes
    deps.delete("nextjs");
    deps.delete("next-themes");
    deps.delete("next");
    if (/from\s+["']@\/components\/ui\//.test(allSource)) {
      deps.add("shadcnui");
    }
    return Array.from(deps);
  }, [allSource]);

  const kebabName = toKebabCase(componentName);

  const utilsCode = `import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

  // Memoized render function to avoid creating components during render
  const renderStepItems = useCallback(() => {
    const items = [];

    // Step 1: Install Dependencies
    items.push(
      <StepItem key="step-1" number={1} title="Install Dependencies">
        <CodeBlock
          code={`npm install ${installDeps.join(" ")}`}
          language="bash"
        />
      </StepItem>,
    );

    // Step 2: Add util file
    items.push(
      <StepItem
        key="step-2"
        number={2}
        title="Add util file"
        fileName="lib/utils.ts"
      >
        <CodeBlock code={utilsCode} language="tsx" />
      </StepItem>,
    );

    // Step 3: Copy-Paste source code
    if (multiPage) {
      // Multi-page: Show each file as a separate StepItem
      files.forEach((file, idx) => {
        const content = fileContents[file.path];
        if (!content) return;
        const isLast = idx === files.length - 1;
        items.push(
          <StepItem
            key={file.path}
            number={3 + idx}
            multiPage={multiPage}
            showTitle={idx === 0}
            title="Copy-Paste the source code"
            fileName={file.name}
            isLast={isLast}
          >
            <div className="w-full">
              <CodeBlock
                code={filterShadcnImports(content)}
                language="tsx"
                aspectVideo
              />
            </div>
          </StepItem>,
        );
      });
    } else {
      // Single-page: Show one StepItem
      items.push(
        <StepItem
          key="step-3"
          number={3}
          title="Copy-Paste the source code"
          fileName={`components/ui/${kebabName}.tsx`}
          isLast={subFileContents.length === 0}
        >
          <div className="w-full">
            {code && <CodeBlock code={code} language="tsx" aspectVideo />}
          </div>
        </StepItem>,
      );
    }

    // Sub-components for single-page
    if (!multiPage && subFileContents.length > 0) {
      subFileContents.forEach((sub, idx) => {
        const isLast = idx === subFileContents.length - 1;
        items.push(
          <StepItem
            key={sub.name}
            number={4 + idx}
            title="Copy-Paste the source code"
            fileName={`components/ui/${sub.name}`}
            isLast={isLast}
          >
            <div className="w-full">
              <CodeBlock code={sub.code} language="tsx" aspectVideo />
            </div>
          </StepItem>,
        );
      });
    }

    return items;
  }, [
    installDeps,
    utilsCode,
    multiPage,
    files,
    fileContents,
    code,
    subFileContents,
    kebabName,
  ]);

  // Handle loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="size-8 animate-spin rounded-full border-3 border-primary border-t-transparent" />
          <p className="text-sm text-foreground/50 animate-pulse">
            Loading component source...
          </p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (multiPage && error && files.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-red-500 font-medium mb-2">
          Failed to load component files
        </p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  // Main render
  const stepItems = renderStepItems();

  return (
    <div className="w-full">
      <div className="w-full">{stepItems}</div>

      {subFilesLoading && (
        <div className="flex items-center justify-center py-4">
          <div className="size-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="ml-2 text-xs text-muted-foreground">
            Loading sub-components…
          </span>
        </div>
      )}

      {!code && files.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No source code available for this component.
        </div>
      )}
    </div>
  );
}
