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
import Image from "next/image";
import Link from "next/link";
import ShareComponent from "@/components/site/navigations/share-component";

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
  isInListView?: boolean;
  githubUsername?: string;
}

type TabType = "preview" | "code" | "video";

const PREVIEW_TAB: TabType = "preview";
const CODE_TAB: TabType = "code";
const VIDEO_TAB: TabType = "video";

export default function Overview({
  itemName,
  description,
  youtubeUrl,
  code,
  componentName,
  slugPath = "",
  subcategory,
  githubUsername,
}: ExtendedOverviewProps) {
  const [activeTab, setActiveTab] = useState<TabType>(PREVIEW_TAB);

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

  const resolvedSubcategory = useMemo(() => {
    if (subcategory) return subcategory;

    const parts = slugPath.split("/").filter(Boolean);
    if (parts.length >= 2) {
      return parts[1];
    }

    if (kebabItemName.includes("alert")) return "alert";
    if (kebabItemName.includes("button")) return "button";
    if (kebabItemName.includes("input")) return "input";
    if (kebabItemName.includes("card")) return "card";

    return null;
  }, [subcategory, slugPath, kebabItemName]);

  // IMPORTANT: Use the EXACT code from the API without any modifications
  const currentCode = useMemo(() => {
    // Return the raw code as received from the API
    // No import stripping, no modifications - keep the EXACT file content
    return code || "";
  }, [code]);

  const liveDemoUrl = useMemo(() => {
    const kebabCategory = toKebabCase(componentName);
    const baseUrl = `/preview/${kebabCategory}/${kebabItemName}`;

    const params = new URLSearchParams({
      ref: "overview",
      source: kebabCategory,
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
        <CodeBlock code={currentCode} language="tsx" aspectVideo />
      </div>
    );
  }, [
    activeTab,
    componentName,
    resolvedSubcategory,
    kebabItemName,
    youtubeEmbedUrl,
    currentCode,
  ]);

  return (
    <section className="w-full">
      <header className="relative flex flex-col items-start mb-8 w-full">
        <h1 className="text-2xl md:text-4xl leading-none font-semibold text-foreground/90 tracking-tight">
          {itemName}
        </h1>
        {description && (
          <p className="text-sm sm:text-base font-normal text-muted-foreground mt-4">
            {description}
          </p>
        )}
      </header>

      <div className="relative flex flex-col items-start p-1.5 md:p-3.5 bg-foreground/3 border border-foreground/5 rounded-[0.7rem] overflow-hidden w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 md:pt-0.5 pb-3 w-full">
          <div className="relative flex items-center gap-2 mb-1 md:mb-0 w-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`text-xs md:text-sm uppercase z-10 w-24 font-medium cursor-pointer transition-all duration-300 ${
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
                delay: 0.2,
              }}
              className="absolute -bottom-5 w-24 h-9 mb-3 border border-foreground/15 bg-background transform-gpu leading-none rounded-sm"
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
              className="hidden md:block absolute -bottom-5 z-500! w-24 h-1 bg-primary leading-none rounded-full"
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
              filePath={code ? `${componentName}/${kebabItemName}.tsx` : ""}
              currentCode={currentCode}
            />

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
            <ShareComponent itemName={itemName} />
          </div>
        </div>

        <div
          className={`flex flex-col items-center justify-center m-auto border border-foreground/7 rounded-lg ${activeTab === "preview" && "bg-background rounded-tl-none"} aspect-square md:aspect-video max-h-screen overflow-hidden! transition-all duration-700 w-full`}
        >
          <div className="relative flex flex-col overflow-hidden bg-background w-full h-full">
            {mainContent}
            {githubUsername && (
              <Link
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                className="absolute bottom-4 right-4 z-50 flex items-center gap-1 p-1 pr-3 leading-none bg-sky-500/10 backdrop-blur-md border border-sky-500/30 inset-shadow-sm inset-shadow-sky-500/40 text-xs font-medium rounded-full w-fit"
              >
                <Image
                  src={`https://github.com/${githubUsername}.png`}
                  alt={`${githubUsername} GitHub profile`}
                  width={500}
                  height={500}
                  className="size-4.5 rounded-full"
                />
                <span>{githubUsername}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
