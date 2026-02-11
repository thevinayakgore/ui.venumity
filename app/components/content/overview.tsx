// app/components/content/overview.tsx
"use client";
import { useMemo, useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Fullscreen } from "lucide-react";
import CodeBlock from "@/components/site/common/code-block";
import ComponentPreview from "./preview";
import { toKebabCase } from "@/utils/slug-kebab";
import { OpenTools } from "./open-tools";

interface ExtendedOverviewProps {
  itemName?: string;
  description?: string;
  tags?: string[];
  techs?: string[];
  youtubeUrl?: string;
  componentName: string;
  component: string;
  code?: string;
  slugPath?: string;
  subcategory?: string;
  isInListView?: boolean; // NEW: Optional prop to indicate list view
}

type TabType = "preview" | "code" | "video";

const PREVIEW_TAB: TabType = "preview";
const CODE_TAB: TabType = "code";
const VIDEO_TAB: TabType = "video";

// Simple TS → JS converter
const convertTsxToJsx = (tsxCode: string): string => {
  if (!tsxCode?.trim()) return "";

  let code = tsxCode;

  // Remove type imports
  code = code.replace(
    /import\s+type\s+{[^}]+}\s+from\s+['"][^'"]+['"];?\n?/g,
    "",
  );

  // Remove interfaces
  code = code.replace(/interface\s+\w+\s*{[\s\S]*?}\n?/g, "");

  // Remove type declarations
  code = code.replace(/type\s+\w+\s*=\s*[\s\S]*?;\n?/g, "");

  // Remove generic type parameters from function calls
  code = code.replace(/<\s*[A-Za-z0-9_,\s]+\s*>(?=\s*\()/g, "");

  // Remove React component types
  code = code.replace(
    /:\s*React\.(FC|FunctionComponent|ComponentType)<[^>]*>/g,
    "",
  );
  code = code.replace(/:\s*React\.(FC|FunctionComponent|ComponentType)/g, "");

  // Remove type annotations
  code = code.replace(/:\s*[A-Za-z0-9_<>\[\]|{},\s]+(?=\s*[=,)\]}])/g, "");

  // Remove type assertions
  code = code.replace(/\s+as\s+[A-Za-z0-9_<>\[\]|{},\s]+/g, "");

  // Remove non-null assertions
  code = code.replace(/!\./g, ".");
  code = code.replace(/!;/g, ";");

  // Clean up extra newlines
  code = code.replace(/\n{3,}/g, "\n\n");

  // Trim whitespace from each line
  code = code
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");

  return code.trim();
};

export default function Overview({
  itemName,
  description,
  youtubeUrl,
  code,
  componentName,
  slugPath = "",
  subcategory,
}: ExtendedOverviewProps) {
  const [activeTab, setActiveTab] = useState<TabType>(PREVIEW_TAB);
  const [selectedLanguage, setSelectedLanguage] = useState<"ts" | "js">("ts");

  const tabs = useMemo<TabType[]>(() => {
    const base: TabType[] = [PREVIEW_TAB, CODE_TAB];
    return youtubeUrl ? [...base, VIDEO_TAB] : base;
  }, [youtubeUrl]);

  useEffect(() => {
    if (!tabs.includes(activeTab)) {
      const id = setTimeout(() => setActiveTab(PREVIEW_TAB), 0);
      return () => clearTimeout(id);
    }
  }, [tabs, activeTab]);

  const kebabItemName = useMemo(
    () => toKebabCase(itemName || componentName),
    [itemName, componentName],
  );

  // Automatically determine subcategory from slugPath if not provided
  const resolvedSubcategory = useMemo(() => {
    if (subcategory) return subcategory;

    // Extract from slug path: /feedbacks/alert/standard-alert -> "alert"
    const parts = slugPath.split("/").filter(Boolean);
    if (parts.length >= 2) {
      return parts[1];
    }

    // Fallback: try to guess from component name
    if (kebabItemName.includes("alert")) return "alert";
    if (kebabItemName.includes("button")) return "button";
    if (kebabItemName.includes("input")) return "input";
    if (kebabItemName.includes("card")) return "card";

    return null;
  }, [subcategory, slugPath, kebabItemName]);

  // Update the currentCode memo to clean imports for display
  const currentCode = useMemo(() => {
    const tsxCode = code || "";
    const codeToUse =
      selectedLanguage === "ts" ? tsxCode : convertTsxToJsx(tsxCode);

    // Clean imports for display in code block
    return codeToUse.replace(/import\s+.*?\s+from\s+['"].*?['"];?\n?/g, "");
  }, [code, selectedLanguage]);

  // Live demo URL
  const liveDemoUrl = useMemo(() => {
    // Convert category to kebab-case
    const kebabCategory = toKebabCase(componentName);
    const baseUrl = `/preview/${kebabCategory}/${kebabItemName}`;

    const params = new URLSearchParams({
      ref: "overview",
      source: kebabCategory, // Use kebab-case here too
    });

    return `${baseUrl}?${params.toString()}`;
  }, [componentName, kebabItemName]);

  const youtubeEmbedUrl = useMemo(() => {
    if (!youtubeUrl) return "";
    try {
      if (youtubeUrl.includes("youtu.be/")) {
        const id = youtubeUrl.split("youtu.be/")[1].split(/[?&]/)[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      if (youtubeUrl.includes("watch?v=")) {
        const id = new URL(youtubeUrl).searchParams.get("v");
        return id ? `https://www.youtube.com/embed/${id}` : "";
      }
      if (youtubeUrl.includes("/embed/")) return youtubeUrl;
      return "";
    } catch {
      return "";
    }
  }, [youtubeUrl]);

  const mainContent = useMemo(() => {
    if (activeTab === PREVIEW_TAB) {
      return (
        <ComponentPreview
          category={componentName}
          subcategory={resolvedSubcategory}
          componentName={kebabItemName}
        />
      );
    }

    if (activeTab === VIDEO_TAB && youtubeEmbedUrl) {
      return (
        <div className="w-full h-full rounded-md overflow-hidden">
          <iframe
            src={youtubeEmbedUrl}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      );
    }

    return (
      <div className="w-full">
        <CodeBlock
          code={currentCode}
          language={selectedLanguage === "ts" ? "typescript" : "javascript"}
          aspectVideo
          selectedLang={selectedLanguage === "ts" ? "typescript" : "javascript"}
          setSelectedLang={(value) =>
            setSelectedLanguage(value === "typescript" ? "ts" : "js")
          }
        />
      </div>
    );
  }, [
    activeTab,
    componentName,
    resolvedSubcategory,
    kebabItemName,
    youtubeEmbedUrl,
    currentCode,
    selectedLanguage,
  ]);

  return (
    <section className="w-full">
      {/* Header */}
      <header className="relative flex flex-col items-start mb-8 w-full">
        <h1 className="text-4xl leading-none font-semibold text-foreground/90 tracking-tight">
          {itemName}
        </h1>
        {description && (
          <p className="text-base  font-normal text-muted-foreground mt-4">
            {description}
          </p>
        )}
      </header>

      <div className="relative flex flex-col items-start p-3 bg-foreground/3 border border-foreground/5 rounded-lg overflow-hidden w-full">
        {/* Tabs + Actions */}
        <div className="flex items-center justify-between gap-3 pb-3 w-full flex-wrap">
          <div className="relative flex items-center gap-2 w-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={` text-sm uppercase z-10 w-24 font-medium cursor-pointer transition-all duration-300 ${
                  activeTab === tab
                    ? "text-foreground"
                    : "text-foreground/40 hover:text-foreground"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
            <motion.span
              layout
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
                delay: 0.15,
              }}
              className="absolute -bottom-5 w-24 h-9 mb-3 border border-foreground/20 bg-background transform-gpu leading-none rounded-sm"
              style={{
                left:
                  activeTab === PREVIEW_TAB
                    ? 0
                    : activeTab === CODE_TAB
                      ? 105
                      : 207,
              }}
            />
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute -bottom-5 z-10! w-24 h-1 bg-primary leading-none rounded-full"
              style={{
                left:
                  activeTab === PREVIEW_TAB
                    ? 0
                    : activeTab === CODE_TAB
                      ? 105
                      : 207,
              }}
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <OpenTools
              componentName={itemName || componentName}
              description={description || ""}
              filePath={
                code
                  ? `${componentName}/${kebabItemName}.${selectedLanguage === "ts" ? "tsx" : "jsx"}`
                  : ""
              }
              currentCode={currentCode}
            />

            {/* Live Demo */}
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                window.open(liveDemoUrl, "_blank", "noopener,noreferrer");
              }}
              disabled={!currentCode}
              className="relative group cursor-pointer flex items-center gap-2 uppercase bg-background! text-foreground/60 hover:text-foreground rounded-sm overflow-hidden"
            >
              <span
                aria-hidden
                className="vnm-shimmer-btn group bg-linear-to-l from-transparent via-zinc-300/70 to-transparent absolute left-0 top-0 bottom-0 w-20 pointer-events-none opacity-0! group-hover:opacity-50!"
              />
              <Fullscreen className="size-4 group-hover:animate-[wiggle_0.6s_ease-in-out]" />
              <span>Live</span>
            </Button>
          </div>
        </div>

        {/* Preview, Code, Video Area */}
        <div
          className={`flex flex-col items-center justify-center m-auto border border-foreground/5 rounded-md ${activeTab === "preview" && "bg-background rounded-tl-none"} aspect-video max-h-screen overflow-hidden transition-all duration-700 w-full`}
        >
          <div className="relative flex flex-col overflow-hidden bg-background w-full h-full">
            {mainContent}
          </div>
        </div>
      </div>
    </section>
  );
}
