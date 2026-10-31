// components/site/content/installation.tsx
"use client";
import { motion } from "framer-motion";
import { toKebabCase } from "@/utils/slug-kebab";
import Shimmer from "@/components/utility/shimmer";
import { useEffect, useMemo, useState } from "react";
import { PencilRuler, Terminal } from "lucide-react";
import CodeBlock from "@/components/utility/code-block";
import { rewriteVenumityImports } from "@/utils/import-rewrite";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  PackageManagerName,
  packageManagers,
  useGlobalPackageManager,
} from "@/utils/pm-config";

interface InstallationProps {
  subcategorySlug: string;
  filePath: string;
  registry?: "primitives" | "components";
  itemFiles?: { path: string; content: string }[];
}

// Self PANEL
function SelfPanel({
  filePath,
  packageManager,
  registry,
  itemFiles,
  subcategorySlug,
}: {
  filePath: string;
  packageManager: PackageManagerName;
  registry: "primitives" | "components";
  itemFiles?: { path: string; content: string }[];
  subcategorySlug: string;
}) {
  const providedFiles = itemFiles || [];
  const useProvided = providedFiles.length > 0;

  const [files, setFiles] = useState<{ path: string; content: string }[]>(
    useProvided ? providedFiles : [],
  );
  const [loading, setLoading] = useState(!useProvided);
  const [error, setError] = useState<string | null>(null);

  // Derive the item folder name from filePath
  // e.g. "dashboards/financial/personal-finance-dashboard/index.tsx"
  //   → segment before the last: "personal-finance-dashboard"
  const itemSlug = useMemo(() => {
    const parts = filePath.split("/").filter(Boolean);
    if (parts.length === 0) return "";
    if (parts[parts.length - 1].endsWith(".tsx")) {
      return parts.length >= 2 ? parts[parts.length - 2] : "";
    }
    return parts[parts.length - 1];
  }, [filePath]);

  // Multi = more than one file OR more than just index.tsx
  const isMulti = files.length > 1;

  // Rewrite `@/components/venumity/...` → `@/components/venumity/<subcategory-slug>`
  const displayFiles = useMemo(
    () =>
      files.map((f) => ({
        ...f,
        content: rewriteVenumityImports(f.content, subcategorySlug),
      })),
    [files, subcategorySlug],
  );

  const fileSteps = displayFiles.map((file, i) => {
    const isSingleFile = !isMulti;

    // For single-file: title = "Add this page", fileName = "<item-slug>.tsx"
    // For multi-file : title = "Copy-Paste : <file>", fileName = "<item-slug>/<file>"
    const stepTitle = isSingleFile
      ? "Add this page"
      : `Copy-Paste : ${file.path}`;

    const stepFileName = isSingleFile
      ? `${toKebabCase(itemSlug)}.tsx`
      : `${toKebabCase(itemSlug)}/${file.path}`;

    return (
      <StepItem
        key={file.path}
        number={3 + i}
        title={stepTitle}
        fileName={stepFileName}
        isLast={i === displayFiles.length - 1}
      >
        <CodeBlock code={file.content} language="tsx" aspectVideo />
      </StepItem>
    );
  });

  useEffect(() => {
    if (useProvided) return;

    let cancelled = false;
    const t = setTimeout(async () => {
      try {
        const dir = filePath.split("/").slice(0, -1).join("/");
        const indexPath = `${dir}/index.tsx`;
        const params = new URLSearchParams({
          action: "primitive-source",
          filePath: indexPath,
          registry,
        });
        const res = await fetch(`/api/components?${params}`);
        if (!res.ok) throw new Error("Failed to load source");
        const data = await res.json();
        if (!cancelled) {
          setFiles([{ path: "index.tsx", content: data.code || "" }]);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 0);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [filePath, registry, useProvided]);

  const installCmd =
    packageManager === "npm"
      ? `npm install lucide-react framer-motion clsx tailwind-merge`
      : packageManager === "pnpm"
        ? `pnpm add lucide-react framer-motion clsx tailwind-merge`
        : packageManager === "yarn"
          ? `yarn add lucide-react framer-motion clsx tailwind-merge`
          : `bun add lucide-react framer-motion clsx tailwind-merge`;

  const utilsCode = `import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-10 h-60">
        <div className="size-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error || files.length === 0) {
    return (
      <div className="text-center py-10 text-sm text-muted-foreground">
        Source not available.
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <StepItem number={1} title="Install dependencies">
        <CodeBlock code={installCmd} language="bash" />
      </StepItem>
      <StepItem number={2} title="Add util file" fileName="lib/utils.ts">
        <CodeBlock code={utilsCode} language="tsx" />
      </StepItem>
      {fileSteps}
    </div>
  );
}

function StepItem({
  number,
  title,
  children,
  fileName,
  isLast = false,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
  fileName?: string;
  isLast?: boolean;
}) {
  return (
    <div className="relative flex gap-4 pl-3.25">
      <div className="absolute top-0 left-0 size-7 rounded-full bg-foreground/5 backdrop-blur-lg border flex items-center justify-center">
        <span className="text-xs font-bold text-foreground/70">{number}</span>
      </div>
      <div
        className={`flex-1 space-y-3 pl-5 md:pl-10 ${isLast ? "pb-0" : "pb-5"} border-l w-full`}
      >
        <div>
          <span className="text-base font-medium text-foreground">
            {title}
          </span>
          {fileName && (
            <p className="text-sm text-foreground/50 font-mono mt-1">
              {fileName}
            </p>
          )}
        </div>
        <div className="p-0.75 md:p-1.5 bg-foreground/5 backdrop-blur-md inset-shadow-sm inset-shadow-foreground/15 rounded-lg md:rounded-xl w-full">
          <div className="border shadow-lg/8 rounded-md md:rounded-lg overflow-hidden w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// PUBLIC COMPONENT
type TabValue = "CLI" | "Self";
const TABS: TabValue[] = ["CLI", "Self"];

export default function Installation({
  subcategorySlug,
  filePath,
  registry = "primitives",
  itemFiles,
}: InstallationProps) {
  const [activeTab, setActiveTab] = useState<TabValue>("CLI");
  const [selectedPM, setSelectedPM] = useGlobalPackageManager();

  const currentCommand = useMemo(() => {
    const pm = packageManagers.find((p) => p.name === selectedPM);
    return (
      pm?.command(subcategorySlug) ??
      `npx venumityui@latest add ${subcategorySlug}`
    );
  }, [selectedPM, subcategorySlug]);

  const activeIndex = TABS.indexOf(activeTab);

  return (
    <section className="w-full">
      <header className="mb-4 md:px-3">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Installation
        </h2>
        <p className="text-sm md:text-base text-foreground/50 mt-1">
          Install via the CLI or copy the source Selfly.
        </p>
      </header>

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as TabValue)}
        className="w-full"
      >
        <div className="md:px-3 w-full">
          <TabsList className="relative grid grid-cols-2 p-1 mb-3 bg-foreground/10 border-0! rounded-lg max-w-fit! h-11!">
            <motion.span
              initial={false}
              animate={{ x: `${activeIndex * 100}%` }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 40,
                mass: 1,
              }}
              className="pointer-events-none absolute top-1.25 bottom-1.25 left-1.25 w-[calc(50%-0.3125rem)] bg-primary inset-shadow-sm inset-shadow-white/60 rounded-md overflow-hidden"
            >
              <Shimmer className="via-white/40" />
            </motion.span>

            {TABS.map((tab) => {
              const Icon = tab === "CLI" ? Terminal : PencilRuler;
              const isActive = activeTab === tab;
              return (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="relative flex items-center justify-center gap-2 px-3! border-0! bg-transparent! data-active:bg-transparent! rounded-md capitalize z-10 w-full"
                >
                  <span
                    className={`relative z-10 flex items-center gap-2 font-semibold ${
                      isActive && "text-white"
                    }`}
                  >
                    <Icon className="size-4.5" />
                    {tab}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        <TabsContent value="CLI">
          <div className="p-1 md:p-1.5 bg-foreground/10 backdrop-blur-md rounded-lg md:rounded-xl">
            <div className="flex items-center justify-between p-1 md:p-2 w-full">
              <div className="flex items-center gap-1 md:gap-1.5 md:pb-2 text-xs font-semibold text-muted-foreground overflow-auto">
                <Terminal className="shrink-0 size-5.5 p-0.75 mr-1 bg-foreground/70 text-background inset-shadow-sm inset-shadow-secondary/40 rounded-[3px]" />
                {packageManagers.map((pm) => (
                  <button
                    key={pm.name}
                    type="button"
                    onClick={() => setSelectedPM(pm.name)}
                    className={`flex items-center gap-2 px-2 py-0.75 border border-transparent rounded-sm transition-all duration-200 ${
                      selectedPM === pm.name &&
                      "bg-background dark:bg-foreground/15 text-foreground border-foreground/20! dark:border-background!"
                    }`}
                    aria-pressed={selectedPM === pm.name}
                  >
                    <span className="[&>svg]:size-4.5!">{pm.logo}</span>
                    <span>{pm.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="border border-foreground/10 rounded-md md:rounded-lg overflow-hidden">
              <CodeBlock code={currentCommand} language="text" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="Self" className="md:pl-3">
          <SelfPanel
            filePath={filePath}
            packageManager={selectedPM}
            registry={registry}
            itemFiles={itemFiles}
            subcategorySlug={subcategorySlug}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
}
