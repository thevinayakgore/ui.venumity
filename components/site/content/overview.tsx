// components/site/content/overview.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import Actions from "./actions";
import { motion } from "motion/react";
import { OpenTools } from "./open-tools";
import ComponentPreview from "./preview";
import { Button } from "@/components/ui/button";
import { toKebabCase } from "@/utils/slug-kebab";
import Shimmer from "@/components/utility/shimmer";
import CodeBlock from "@/components/utility/code-block";
import { useEffect, useMemo, useRef, useState } from "react";
import { packageManagers, useGlobalPackageManager } from "@/utils/pm-config";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  rewriteComponentImports,
  rewriteVenumityImports,
} from "@/utils/import-rewrite";
import {
  Copy,
  Terminal,
  RotateCcw,
  CheckCheck,
  Fullscreen,
  ChevronDown,
  PictureInPicture2,
  Check,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface OverviewProps {
  code?: string;
  title?: string;
  tags?: string[];
  cliSlug?: string;
  itemName?: string;
  slugPath?: string;
  component: string;
  hideTitle?: boolean;
  description?: string;
  componentName: string;
  githubUsername?: string;
  subcategory?: string | null;
  previewComponentName?: string;
  source?: "primitives" | "components";
}

type TabValue = "Preview" | "Source";

function CliCopyInline({ slug }: { slug: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pm, setPm] = useGlobalPackageManager();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const current =
    packageManagers.find((o) => o.name === pm) ?? packageManagers[0];
  const command = current.command(slug);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div ref={dropdownRef} className="relative">
      <Button
        aria-expanded={open}
        aria-label="Select package manager or copy command"
        className="flex items-center gap-0.5 text-xs p-0.75! h-9.5! tracking-wide bg-foreground/10! overflow-hidden rounded-md"
      >
        {/* Main Copy Action (Left Side) */}
        <span
          onClick={(e) => {
            e.stopPropagation();
            handleCopy();
          }}
          className="group flex items-center gap-2 py-1.5 pl-2.5 pr-0.5 bg-background text-foreground shadow-lg/10 rounded-sm h-full hover:bg-background/80 transition-colors"
        >
          <span className="shrink-0 flex items-center">{current.logo}</span>
          <span
            className={`flex items-center justify-center w-7 h-6.5 group-hover:bg-blue-600 group-hover:text-white ${copied && "bg-blue-600 inset-shadow-sm text-white"} group-hover:inset-shadow-sm inset-shadow-white/50 transition-color duration-500 rounded-[5px]`}
          >
            {copied ? (
              <CheckCheck className="size-3.5 text-white" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </span>
        </span>

        {/* Dropdown Toggle (Right Side) */}
        <span
          onClick={() => setOpen((v) => !v)}
          className="flex items-center justify-center h-full"
        >
          <ChevronDown
            className={`p-1.5 size-7.25! text-foreground transition-all duration-500 rounded-sm ${
              open ? "rotate-x-180 rotate-y-180" : ""
            }`}
          />
        </span>
      </Button>

      {open && (
        <div className="absolute right-0 top-full z-100 mt-1.5 bg-popover border border-foreground/10 rounded-lg shadow-lg p-1 flex flex-col gap-0.5 min-w-25">
          {packageManagers.map((option) => {
            const isActive = option.name === pm;
            return (
              <button
                key={option.name}
                type="button"
                onClick={() => {
                  setPm(option.name);
                  setOpen(false);
                }}
                className={`flex items-center gap-2 px-2 py-1 text-left text-xs font-medium hover:bg-foreground/10 text-foreground transition-all duration-500 rounded-md w-full ${
                  isActive ? "bg-foreground/10" : ""
                }`}
              >
                <span className="shrink-0 flex items-center">
                  {option.logo}
                </span>
                <span className="flex-1">{option.label}</span>
                {isActive && (
                  <Check className="size-3.5 text-foreground shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Overview({
  tags,
  code,
  title,
  source,
  cliSlug,
  itemName,
  hideTitle,
  description,
  subcategory,
  componentName,
  slugPath = "",
  githubUsername,
  previewComponentName,
}: OverviewProps) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState<TabValue>("Preview");

  const resolvedPreviewName = useMemo(
    () => previewComponentName || toKebabCase(itemName || componentName),
    [previewComponentName, itemName, componentName],
  );

  const handleRefresh = () => setRefreshKey((p) => p + 1);

  const kebabItemName = useMemo(
    () => toKebabCase(itemName || componentName),
    [itemName, componentName],
  );

  const resolvedSubcategory = useMemo((): string | null => {
    if (subcategory) return subcategory;
    const parts = slugPath.split("/").filter(Boolean);
    if (parts.length >= 2) return parts[1] ?? null;
    return null;
  }, [subcategory, slugPath]);

  const resolvedCategory = useMemo(() => {
    const parts = slugPath.split("/").filter(Boolean);
    return parts[0] || toKebabCase(componentName);
  }, [slugPath, componentName]);

  const displayCode = useMemo(() => {
    if (!code) return "";

    // If the page is a component, we want the relative imports to flatten to the actual component's subcategory slug.
    // Using `resolvedSubcategory` is correct for the "self" imports.
    const targetSlug = resolvedSubcategory || kebabItemName || "";

    if (source === "primitives") {
      return rewriteVenumityImports(code, targetSlug);
    }

    return rewriteComponentImports(code, targetSlug);
  }, [code, source, resolvedSubcategory, kebabItemName]);

  const liveDemoUrl = useMemo(() => {
    return `/preview/${resolvedCategory}/${resolvedSubcategory}/${resolvedPreviewName}`;
  }, [resolvedCategory, resolvedSubcategory, resolvedPreviewName]);

  const layoutId = useMemo(
    () =>
      `overview-tab-pill-${resolvedCategory}-${resolvedSubcategory}-${resolvedPreviewName}`,
    [resolvedCategory, resolvedSubcategory, resolvedPreviewName],
  );

  const showHeader = !hideTitle && title === "Demo";
  const showCliCopy = source === "components" && !!cliSlug;

  return (
    <section className="w-full">
      {showHeader && (
        <header className="relative flex flex-col items-start mb-8 md:px-3 w-full">
          <h1 className="text-2xl md:text-4xl leading-none font-medium tracking-tight">
            {title ?? itemName}
          </h1>
          {description && (
            <p className="text-sm sm:text-base text-muted-foreground mt-4">
              {description}
            </p>
          )}
        </header>
      )}

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as TabValue)}
        className="w-full"
      >
        <div className="flex flex-col-reverse md:flex-row flex-wrap items-end justify-between gap-3 md:px-3 mb-1 w-full">
          <TabsList className="relative grid grid-cols-2 p-1 bg-foreground/10 rounded-lg w-full md:max-w-fit! h-11!">
            {(["Preview", "Source"] as TabValue[]).map((tab) => {
              const Icon = tab === "Preview" ? PictureInPicture2 : Terminal;
              const isActive = activeTab === tab;
              return (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="relative z-10 flex items-center gap-2 px-3! border-0! bg-transparent! data-active:bg-transparent! rounded-md"
                >
                  {isActive && (
                    <motion.span
                      layoutId={layoutId}
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 40,
                        mass: 1,
                      }}
                      className="absolute inset-0 bg-primary inset-shadow-sm inset-shadow-white/60 rounded-[7px] overflow-hidden"
                    >
                      <Shimmer className="via-white/40" />
                    </motion.span>
                  )}
                  <span
                    className={`relative z-10 flex items-center gap-2 font-semibold ${isActive && "text-white"}`}
                  >
                    <Icon className="size-4.5" />
                    {tab}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <div className="flex flex-wrap items-center justify-end gap-1.5 w-full md:w-fit">
            {showCliCopy && <CliCopyInline slug={cliSlug!} />}

            <OpenTools
              tags={tags}
              currentCode={code || ""}
              slug={resolvedPreviewName}
              category={resolvedCategory}
              description={description || ""}
              githubUsername={githubUsername}
              componentName={itemName || componentName}
              subcategory={resolvedSubcategory || undefined}
              filePath={code ? `${componentName}/${kebabItemName}.tsx` : ""}
            />

            <Actions
              itemName={itemName}
              registry={source || "primitives"}
              categorySlug={resolvedCategory}
              subcategorySlug={resolvedSubcategory || ""}
              itemSlug={resolvedPreviewName}
            />

            <Separator
              orientation="vertical"
              className="mx-1.5 bg-foreground/20 h-8 my-auto"
            />

            <Button
              size="icon"
              onClick={() =>
                window.open(liveDemoUrl, "_blank", "noopener,noreferrer")
              }
              className="relative size-9.5! group bg-primary! text-white! inset-shadow-sm inset-shadow-white/60! overflow-hidden"
            >
              <Fullscreen className="group-hover:animate-[wiggle_0.3s_ease-in-out]" />
              <Shimmer className="via-white/40" />
            </Button>
          </div>
        </div>

        <div className="relative p-1 md:p-2 bg-foreground/5 inset-shadow-sm inset-shadow-foreground/15 rounded-xl md:rounded-4xl overflow-hidden! transition-all duration-700 w-full">
          <TabsContent
            key={refreshKey}
            value="Preview"
            className="aspect-square md:aspect-auto flex flex-col items-center justify-center m-auto bg-background border shadow-lg/8 rounded-lg md:rounded-3xl overflow-auto w-full h-full sm:min-h-80 md:min-h-110 lg:min-h-150"
          >
            <ComponentPreview
              demoName={null}
              source={source}
              category={resolvedCategory}
              subcategory={resolvedSubcategory}
              componentName={resolvedPreviewName}
            />
          </TabsContent>

          <TabsContent
            value="Source"
            className="aspect-square md:aspect-video bg-background border shadow-lg/8 rounded-lg md:rounded-3xl overflow-auto w-full h-full"
          >
            <CodeBlock code={displayCode || ""} language="tsx" />
          </TabsContent>

          {activeTab === "Preview" && (
            <Button
              size="icon"
              variant="secondary"
              title="Refresh preview"
              onClick={handleRefresh}
              className="absolute top-4 right-4 z-50 transform-gpu bg-foreground/5 backdrop-blur-sm rounded-full"
            >
              <RotateCcw className="size-4" />
            </Button>
          )}

          {githubUsername && (
            <Link
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              className="absolute bottom-5 right-5 z-50 flex items-center gap-1.5 pr-2 leading-none bg-linear-to-br from-blue-600/30 to-background backdrop-blur-lg border border-l-0 border-blue-600/60 text-xs font-semibold rounded-full w-fit"
            >
              <Image
                src={`https://github.com/${githubUsername}.png`}
                alt={`${githubUsername} GitHub profile`}
                width={500}
                height={500}
                unoptimized
                className="size-6 border border-blue-600/60 rounded-full"
              />
              <span>{githubUsername}</span>
            </Link>
          )}
        </div>
      </Tabs>
    </section>
  );
}
