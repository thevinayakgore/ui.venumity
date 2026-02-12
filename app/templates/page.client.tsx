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
    <main className="flex flex-col items-center justify-between m-auto max-w-360 px-10 py-24 2xl:border-x-2 border-dashed border-foreground/10 overflow-x-hidden w-full">
      <section className="flex flex-col items-start justify-start m-auto w-full h-full">
        {/* Header */}
        <header className="text-center border-b border-foreground/15 w-full">
          <Badge
            variant="secondary"
            className="flex items-center justify-center m-auto gap-2 h-8 px-2 text-sm! leading-none  font-medium capitalize bg-foreground/5 border-foreground/10 shadow-xl/5! rounded"
          >
            <RectangleGoggles className="size-4!" />
            <BadgeTextAnimate
              leftWords={LEFT_WORDS}
              rightWords={RIGHT_WORDS}
              interval={4000}
            />
          </Badge>

          <h1 className="text-3xl md:text-[14rem] uppercase font-extrabold bg-clip-text text-transparent bg-linear-to-b from-foreground/15 via-foreground/5 to-background leading-none">
            Templates
          </h1>
          <p className="-mt-15 mb-5 text-base md:text-lg  font-normal bg-clip-text text-transparent bg-linear-to-l from-foreground/15 via-foreground/70 to-foreground/15 max-w-5xl m-auto w-full">
            Launch FASTER with beautifully designed web app templates and
            reusable UI systems for modern web projects. Built for performance,
            animations, and seamless customization.
          </p>

          {hasProTemplates && (
            <div className="m-5">
              <PriceToggle
                checked={!showFreeTemplates}
                onChange={(checked) => setShowFreeTemplates(!checked)}
              />
            </div>
          )}
        </header>

        {/* Category Tabs */}
        <div className="relative flex items-center justify-center m-auto p-5 mb-10 overflow-hidden w-full h-full">
          <div className="absolute top-0 left-0 z-10 bg-linear-to-r from-background h-full w-28" />

          <div className="flex items-center justify-center m-auto  font-semibold! gap-2 w-full">
            {/* All Categories Button */}
            <Button
              size="lg"
              variant="secondary"
              className={`flex items-center gap-3 p-6! cursor-pointer uppercase rounded-sm leading-none ${
                activeCategory === null
                  ? "bg-blue-500! text-white! border-blue-500 shadow-lg shadow-blue-500/40!"
                  : "bg-transparent hover:bg-blue-500 hover:text-white hover:border-blue-500 shadow-transparent hover:shadow-blue-500/40!"
              }`}
              onClick={() => setActiveCategory(null)}
            >
              <WandSparkles className="size-4!" />
              <span>All Category</span>
            </Button>

            {availableCategories.map(({ name, icon }) => {
              const Icon = getCategoryIcon(icon);

              return (
                <Button
                  key={name}
                  size="lg"
                  variant="secondary"
                  className={`flex items-center gap-3 p-6! cursor-pointer uppercase hover:shadow-lg rounded-sm leading-none  ${
                    activeCategory === name
                      ? "bg-blue-500! text-white! border-blue-500 shadow-lg shadow-blue-500/40"
                      : "bg-transparent hover:bg-blue-500 hover:text-white hover:border-blue-500 shadow-transparent hover:shadow-blue-500/40"
                  }`}
                  onClick={() =>
                    setActiveCategory(activeCategory === name ? null : name)
                  }
                >
                  <Icon className="size-4!" />
                  <span>{name}</span>
                </Button>
              );
            })}
          </div>

          <div className="absolute top-0 right-0 z-10 bg-linear-to-l from-background h-full w-28" />
        </div>

        {/* Templates Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 pb-24 w-full h-screen max-h-screen">
          {filteredTemplates.length > 0 &&
            filteredTemplates.map((template, index) => {
              const slug = toKebabCase(template.name);

              return (
                <div
                  key={index}
                  className={`relative group p-4 pt-10 rounded-lg overflow-hidden bg-muted/30 hover:shadow-lg border border-foreground/15 max-h-fit ${template.price === 0 ? "hover:border-green-500/60" : "hover:border-primary/60"} hover:scale-105 transition-all duration-500`}
                >
                  {/* Card Image */}
                  <Link
                    href={`/templates/${slug}`}
                    className="relative group/img w-full h-full"
                  >
                    <div className="aspect-video border rounded-md overflow-hidden w-full">
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
                  <div className="relative mt-4 p-5 bg-background border border-foreground/15 rounded-sm">
                    <div className="flex items-center justify-between w-full">
                      <h2 className="text-2xl truncate">{template.name}</h2>
                      <Link
                        href={template.buyUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`hover:shadow-lg group/btn ${template.price === 0 ? "shadow-green-500/30" : "shadow-pink/30"} rounded transition-all duration-500`}
                      >
                        <Button
                          size="sm"
                          variant="secondary"
                          className={`relative group flex items-center gap-1 p-4.5! text-sm cursor-pointer uppercase font-semibold border-white ${template.price === 0 ? "group-hover/btn:bg-green-500! group-hover/btn:border-green-500!" : "group-hover/btn:bg-pink-500! group-hover/btn:border-pink-500!"} bg-foreground! text-secondary rounded-sm hover:text-white! shadow-none! overflow-hidden transition-all duration-500`}
                        >
                          <span className="vnm-shimmer-btn bg-linear-to-l from-transparent via-white/70! to-transparent absolute left-0 top-0 bottom-0 w-32 pointer-events-none opacity-0! group-hover/btn:opacity-50!" />
                          <span className="text-base font-bold leading-none">
                            ${template.price}
                          </span>{" "}
                          <span>Buy Now</span>
                        </Button>
                      </Link>
                    </div>

                    {/* Tech Stacks Used */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-2 pb-3">
                      {template.techs.map((tech, index) => (
                        <div
                          key={index}
                          className="size-8 p-0.5 bg-muted/50 border rounded-[3px] overflow-hidden"
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

                    <p className="text-sm text-foreground/60 line-clamp-4 tracking-wide">
                      {template.desc}
                    </p>

                    <div
                      className={`absolute bottom-0 group-hover:top-0 left-1/2 -translate-x-1/2 group-hover:left-0 group-hover:translate-x-0 bg-linear-to-l from-transparent ${template.price === 0 ? "via-green-500" : "via-primary"} to-transparent h-px w-1/2 group-hover:w-full transition-all duration-500`}
                    />
                  </div>

                  <div className="absolute top-3 left-0 pl-5 pr-4 flex items-center justify-between gap-3 uppercase font-normal text-xs w-full">
                    {/* Left Dot */}
                    <div className="flex items-center gap-2 font-mono w-full">
                      <div className="relative w-2 h-2">
                        <span
                          className={`absolute inset-0 ${template.price === 0 ? "bg-green-500" : "bg-primary"} rounded-full animate-ping`}
                        />
                        <span
                          className={`absolute inset-0 ${template.price === 0 ? "bg-green-500" : "bg-primary"} rounded-full`}
                        />
                      </div>
                      <span>{template.category}</span>
                    </div>

                    {/* Date */}
                    <span className="text-end font-mono tracking-normal opacity-40 w-full">
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
      <div className="w-48 h-12 bg-foreground/15 backdrop-blur-sm rounded-md relative transition-all duration-300">
        {/* Sliding Button */}
        <div
          className={`absolute top-1 left-1 h-10 w-26 rounded-sm bg-background flex items-center justify-center font-bold transition-all duration-500 text-xl text-foreground ${checked ? "translate-x-20" : ""}`}
        >
          {checked ? "🚀 Pro" : "🎁 Zero"}
        </div>
      </div>
    </label>
  );
}
