// templates/page.client.tsx
"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import * as LucideIcons from "lucide-react";
import { Folder, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RectangleGoggles, WandSparkles } from "lucide-react";
import CTASection from "@/components/site/sections/cta-section";
import BadgeTextAnimate from "@/components/ui/badge-text-animate";
import { TEMPLATES, type LucideIconName } from "@/registry/site/templates";
import { toKebabCase } from "@/utils/slug-kebab";
import { formatDate } from "@/utils/format-date";

type CategoryMeta = {
  name: string;
  icon?: LucideIconName;
};

const LEFT_WORDS = [
  "Flexing",
  "Ready",
  "Pretty",
  "Clean",
  "Useful",
  "Build",
  "Launch",
];

const RIGHT_WORDS = [
  "Stuffs",
  "Templates",
  "Layouts",
  "Designs",
  "Blocks",
  "Faster",
  "Smarter",
];

export default function PageClient() {
  const allTemplates = useMemo(
    () => TEMPLATES.filter((t) => t.isPublished),
    [],
  );
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showFreeTemplates, setShowFreeTemplates] = useState(true);

  const getCategoryIcon = useCallback(
    (iconName?: LucideIconName): LucideIcon => {
      if (!iconName) return Folder;
      const Icon = LucideIcons[iconName] as LucideIcon | undefined;
      return Icon ?? Folder;
    },
    [],
  );

  const availableCategories = useMemo((): CategoryMeta[] => {
    const map = new Map<string, CategoryMeta>();

    allTemplates.forEach((template) => {
      if (!map.has(template.category)) {
        map.set(template.category, {
          name: template.category,
          icon: template.categoryIcon,
        });
      }
    });

    return Array.from(map.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }, [allTemplates]);

  const filteredTemplates = useMemo(() => {
    return allTemplates.filter((template) => {
      const priceMatch = showFreeTemplates
        ? template.price === 0
        : template.price > 0;

      const categoryMatch = activeCategory
        ? template.category === activeCategory
        : true;

      return priceMatch && categoryMatch;
    });
  }, [allTemplates, showFreeTemplates, activeCategory]);

  const hasProTemplates = useMemo(
    () => allTemplates.some((template) => template.price > 0),
    [allTemplates],
  );

  return (
    <main className="flex flex-col items-center justify-between m-auto w-full max-w-360 px-4 sm:px-6 md:px-10 py-16 md:py-24 2xl:border-x-2 border-dashed border-foreground/10 overflow-x-hidden">
      <section className="flex flex-col items-start justify-start m-auto w-full h-full">
        {/* Header */}
        <header className="text-center border-b border-foreground/15 w-full pb-6">
          <Badge
            variant="secondary"
            className="flex items-center justify-center m-auto gap-2 h-8 px-2 text-sm! leading-none font-medium capitalize bg-foreground/5 border-foreground/10 shadow-xl/5! rounded w-fit"
          >
            <RectangleGoggles className="size-4!" />
            <BadgeTextAnimate
              leftWords={LEFT_WORDS}
              rightWords={RIGHT_WORDS}
              interval={4000}
            />
          </Badge>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] uppercase font-extrabold bg-clip-text text-transparent bg-linear-to-b from-foreground/15 via-foreground/5 to-background leading-none wrap-break-word">
            Templates
          </h1>
          <p className="mt-4 sm:mt-6 md:mt-8 mb-5 text-sm sm:text-base md:text-lg font-normal bg-clip-text text-transparent bg-linear-to-l from-foreground/15 via-foreground/70 to-foreground/15 max-w-5xl m-auto w-full px-2">
            Launch FASTER with beautifully designed web app templates and
            reusable UI systems for modern web projects. Built for performance,
            animations, and seamless customization.
          </p>

          {hasProTemplates && (
            <div className="my-5">
              <PriceToggle
                checked={!showFreeTemplates}
                onChange={(checked) => setShowFreeTemplates(!checked)}
              />
            </div>
          )}
        </header>

        {/* Category Tabs - Responsive Scroll */}
        <div className="relative flex items-center justify-start md:justify-center m-auto p-3 sm:p-5 mb-6 sm:mb-10 overflow-x-auto w-full h-full scrollbar-hide">
          <div className="absolute top-0 left-0 z-10 bg-linear-to-r from-background h-full w-8 sm:w-12 md:w-28 pointer-events-none" />

          <div className="flex items-center gap-2 sm:gap-3 font-semibold w-max md:w-full md:justify-center">
            {/* All Categories Button */}
            <Button
              size="lg"
              variant="secondary"
              className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-6! cursor-pointer uppercase rounded-sm leading-none whitespace-nowrap ${
                activeCategory === null
                  ? "bg-blue-500! text-white! border-blue-500 shadow-lg shadow-blue-500/40!"
                  : "bg-transparent hover:bg-blue-500 hover:text-white hover:border-blue-500 shadow-transparent hover:shadow-blue-500/40!"
              }`}
              onClick={() => setActiveCategory(null)}
            >
              <WandSparkles className="size-3 sm:size-4!" />
              <span className="text-xs sm:text-sm">All Category</span>
            </Button>

            {availableCategories.map(({ name, icon }) => {
              const Icon = getCategoryIcon(icon);

              return (
                <Button
                  key={name}
                  size="lg"
                  variant="secondary"
                  className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-6! cursor-pointer uppercase hover:shadow-lg rounded-sm leading-none whitespace-nowrap ${
                    activeCategory === name
                      ? "bg-blue-500! text-white! border-blue-500 shadow-lg shadow-blue-500/40"
                      : "bg-transparent hover:bg-blue-500 hover:text-white hover:border-blue-500 shadow-transparent hover:shadow-blue-500/40"
                  }`}
                  onClick={() =>
                    setActiveCategory(activeCategory === name ? null : name)
                  }
                >
                  <Icon className="size-3 sm:size-4!" />
                  <span className="text-xs sm:text-sm">{name}</span>
                </Button>
              );
            })}
          </div>

          <div className="absolute top-0 right-0 z-10 bg-linear-to-l from-background h-full w-8 sm:w-12 md:w-28 pointer-events-none" />
        </div>

        {/* Templates Grid - Fully Responsive */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 pb-24 w-full">
          {filteredTemplates.length > 0 &&
            filteredTemplates.map((template, index) => {
              const slug = toKebabCase(template.name);

              return (
                <div
                  key={index}
                  className={`relative group p-4 lg:p-6 pt-9 lg:pt-12 rounded-2xl sm:rounded-3xl overflow-hidden bg-muted/30 hover:shadow-lg border-2 sm:border-4 border-foreground/15 ${
                    template.price === 0
                      ? "hover:border-green-500/70"
                      : "hover:border-primary/60"
                  } transition-all duration-500`}
                >
                  {/* Card Image */}
                  <Link
                    href={`/templates/${slug}`}
                    className="relative group/img w-full h-full"
                  >
                    <div className="aspect-video border rounded-lg sm:rounded-xl overflow-hidden w-full">
                      <Image
                        src={template.preview}
                        alt={template.name}
                        width={5000}
                        height={5000}
                        priority
                        className="object-cover w-full h-full group-hover/img:scale-110 transition-all duration-700"
                      />
                    </div>
                  </Link>

                  {/* Card Content */}
                  <div className="relative mt-3 sm:mt-4 p-3 sm:p-5 bg-background border border-foreground/15 rounded-lg sm:rounded-xl">
                    <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 w-full">
                      <h2 className="text-lg sm:text-xl md:text-2xl truncate w-full">
                        {template.name}
                      </h2>
                      <Link
                        href={template.buyUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`hover:shadow-lg group/btn ${
                          template.price === 0
                            ? "shadow-green-500/30"
                            : "shadow-pink/30"
                        } rounded transition-all duration-500 shrink-0`}
                      >
                        <Button
                          size="sm"
                          variant="secondary"
                          className={`relative group flex items-center gap-1 p-3 sm:p-4.5! text-xs sm:text-sm cursor-pointer uppercase font-semibold border-white ${
                            template.price === 0
                              ? "group-hover/btn:bg-green-500! group-hover/btn:border-green-500!"
                              : "group-hover/btn:bg-pink-500! group-hover/btn:border-pink-500!"
                          } bg-foreground! text-secondary rounded-sm hover:text-white! shadow-none! overflow-hidden transition-all duration-500`}
                        >
                          <span className="vnm-shimmer-btn bg-linear-to-l from-transparent via-white/70! to-transparent absolute left-0 top-0 bottom-0 w-32 pointer-events-none opacity-0! group-hover/btn:opacity-50!" />
                          <span className="text-sm sm:text-base font-bold leading-none">
                            ${template.price}
                          </span>{" "}
                          <span className="text-xs sm:text-sm">Buy Now</span>
                        </Button>
                      </Link>
                    </div>

                    {/* Tech Stacks Used */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-2 pb-3">
                      {template.techs.map((tech, index) => (
                        <div
                          key={index}
                          className="size-6 sm:size-8 p-0.5 bg-muted/50 border rounded-[3px] overflow-hidden"
                        >
                          <Image
                            src={tech.icon}
                            alt={tech.icon.replace(/\.png$/i, "")}
                            width={200}
                            height={200}
                            className="object-contain rounded-[2px] w-full h-full"
                          />
                        </div>
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-foreground/60 line-clamp-3 sm:line-clamp-4 tracking-wide">
                      {template.desc}
                    </p>

                    <div
                      className={`absolute bottom-0 group-hover:top-0 left-1/2 -translate-x-1/2 group-hover:left-0 group-hover:translate-x-0 bg-linear-to-l from-transparent ${
                        template.price === 0 ? "via-green-500" : "via-primary"
                      } to-transparent h-px w-1/2 group-hover:w-full transition-all duration-500`}
                    />
                  </div>

                  <div className="absolute top-2.5 lg:top-4 left-0 px-5 lg:px-6 flex items-center justify-between gap-3 uppercase font-normal text-[10px] sm:text-xs w-full">
                    {/* Left Dot */}
                    <div className="flex items-center gap-2 font-mono w-full">
                      <div className="relative size-2 sm:size-3">
                        <span
                          className={`absolute inset-0 ${
                            template.price === 0 ? "bg-green-500" : "bg-primary"
                          } rounded-full animate-ping`}
                        />
                        <span
                          className={`absolute inset-0 ${
                            template.price === 0 ? "bg-green-500" : "bg-primary"
                          } rounded-full`}
                        />
                      </div>
                      <span className="truncate">{template.category}</span>
                    </div>

                    {/* Date */}
                    <span className="text-end font-mono tracking-normal opacity-40 w-full text-[10px] sm:text-xs">
                      {formatDate(template.createdAt)}
                    </span>
                  </div>
                </div>
              );
            })}
        </section>
      </section>

      <CTASection />
    </main>
  );
}

type PriceToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function PriceToggle({ checked, onChange }: PriceToggleProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="h-11 w-44 rounded-md bg-foreground/10 animate-pulse" />
    );
  }

  return (
    <label className="relative inline-flex items-center cursor-pointer uppercase">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />

      {/* Toggle Track */}
      <div className="w-40 sm:w-48 h-10 sm:h-12 bg-foreground/15 backdrop-blur-sm rounded-md relative transition-all duration-300">
        {/* Sliding Button */}
        <div
          className={`absolute top-1 left-1 h-8 sm:h-10 w-20 sm:w-26 rounded-sm bg-background flex items-center justify-center font-bold transition-all duration-500 text-base sm:text-xl text-foreground ${
            checked ? "translate-x-18 sm:translate-x-20" : ""
          }`}
        >
          {checked ? "🚀 Pro" : "🎁 Zero"}
        </div>
      </div>
    </label>
  );
}
