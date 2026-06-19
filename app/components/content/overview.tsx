// app/components/content/overview.tsx
"use client";
import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Fullscreen, Proportions, Terminal, Play } from "lucide-react";
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
    if (youtubeUrl) base.push(VIDEO_TAB);
    return base;
  }, [youtubeUrl]);

  useEffect(() => {
    if (!tabs.includes(activeTab)) {
      const id = window.setTimeout(() => setActiveTab(PREVIEW_TAB), 0);
      return () => window.clearTimeout(id);
    }
  }, [tabs, activeTab]);

  const kebabItemName = useMemo(
    () => toKebabCase(itemName || componentName),
    [itemName, componentName],
  );

  const resolvedSubcategory = useMemo(() => {
    if (subcategory) return subcategory;
    const parts = slugPath.split("/").filter(Boolean);
    if (parts.length >= 2) return parts[1];
    return null;
  }, [subcategory, slugPath]);

  const liveDemoUrl = useMemo(() => {
    const kebabCategory = toKebabCase(componentName);
    return `/preview/${kebabCategory}/${kebabItemName}?ref=overview&source=${kebabCategory}`;
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
    switch (activeTab) {
      case PREVIEW_TAB:
        return (
          <ComponentPreview
            category={componentName}
            subcategory={resolvedSubcategory}
            componentName={kebabItemName}
          />
        );
      case CODE_TAB:
        return (
          <div className="w-full h-full">
            <CodeBlock code={code || ""} language="tsx" />
          </div>
        );
      case VIDEO_TAB:
        return youtubeEmbedUrl ? (
          <div className="w-full h-full rounded-md overflow-hidden">
            <iframe
              src={youtubeEmbedUrl}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        ) : null;
      default:
        return null;
    }
  }, [
    activeTab,
    code,
    componentName,
    resolvedSubcategory,
    kebabItemName,
    youtubeEmbedUrl,
  ]);

  // Tab slider position
  const tabWidth = 120;
  const tabIndex = tabs.indexOf(activeTab);
  const sliderLeft = tabIndex * tabWidth;

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

      <div className="relative flex flex-col items-start p-2 bg-foreground/5 rounded-t-xl rounded-b-2xl overflow-hidden w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 md:pt-0.5 pb-3 w-full">
          <div className="relative flex items-center gap-2 w-auto">
            {tabs.map((tab) => {
              const icons = {
                preview: Proportions,
                code: Terminal,
                video: Play,
              };
              const Icon = icons[tab] || Proportions;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center justify-center m-auto gap-2 text-sm uppercase z-10 w-28 font-semibold tracking-wider cursor-pointer transition-all duration-300 ${
                    activeTab === tab
                      ? "text-foreground/80"
                      : "text-foreground/40 hover:text-foreground/80"
                  }`}
                >
                  <Icon className="size-4" />
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              );
            })}
            <motion.span
              layout
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
                delay: 0.2,
              }}
              className="absolute -bottom-5 w-28 h-9 mb-3 bg-card! dark:bg-muted! border transform-gpu leading-none rounded-md"
              style={{ left: sliderLeft }}
            />
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute -bottom-5.5 z-50! w-28 h-1 bg-primary leading-none rounded-full"
              style={{ left: sliderLeft }}
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <OpenTools
              componentName={itemName || componentName}
              description={description || ""}
              filePath={code ? `${componentName}/${kebabItemName}.tsx` : ""}
              currentCode={code || ""}
            />

            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                window.open(liveDemoUrl, "_blank", "noopener,noreferrer")
              }
              disabled={!code}
              className="relative group px-4! h-9! border-foreground/10! font-semibold tracking-wide cursor-pointer flex items-center gap-2 uppercase bg-background! text-foreground/50 hover:text-foreground overflow-hidden"
            >
              <span
                aria-hidden
                className="vnm-shimmer-btn group bg-linear-to-l from-transparent via-green-500/50 dark:via-blue-500/50 to-transparent absolute left-0 top-0 bottom-0 w-20 pointer-events-none opacity-0! group-hover:opacity-50!"
              />
              <Fullscreen className="size-4 group-hover:animate-[wiggle_0.6s_ease-in-out]" />
              <span>Live</span>
            </Button>
            <ShareComponent itemName={itemName} />
          </div>
        </div>

        <div
          className={`flex flex-col items-center justify-center m-auto border border-foreground/7 rounded-xl ${
            activeTab === "preview" && "bg-background rounded-tl-none"
          } aspect-square md:aspect-video max-h-screen overflow-hidden! transition-all duration-700 w-full`}
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
