// components/site/sections/features.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useMemo } from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toKebabCase } from "@/utils/slug-kebab";
import { COMPONENTS } from "@/registry/components";
import { Camera } from "@/components/utility/camera";
import { FEATURED_COMPONENTS } from "@/app/api/featured-components/route";
import { InfiniteLogoMovingCards } from "@/components/ui/infinite-logo-moving-cards";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// ─── Type definitions ────────────────────────────────────────
type IconElement =
  | { type: "path"; d: string }
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
      rx?: number;
    };

type Feature = {
  icon: React.ReactNode;
  elements: IconElement[];
  title: string;
  description?: string;
  content?: React.ReactNode;
  iconColor: string;
  textColor: string;
  bg: string;
};

interface FeaturedItem {
  id: string;
  displayName: string;
  description: string;
  tags: string[];
  thumbnail: string;
  href: string;
}

// Build a lookup of every item across all categories/subcategories
function buildFeaturedItems(): FeaturedItem[] {
  // Normalize featured names to kebab-case for matching
  const featuredSet = new Set(FEATURED_COMPONENTS.map(toKebabCase));

  const items: FeaturedItem[] = [];

  COMPONENTS.forEach((category) => {
    const catSlug = toKebabCase(category.name);

    category.subcategories.forEach((subcategory) => {
      const subSlug = toKebabCase(subcategory.name);
      const subTags = subcategory.tags || [];

      subcategory.items.forEach((item) => {
        const itemSlug = toKebabCase(item.itemName);
        if (!featuredSet.has(itemSlug)) return;

        items.push({
          id: itemSlug,
          displayName: item.itemName,
          description: subcategory.description || `${item.itemName} component`,
          tags: item.tags?.length ? item.tags : subTags,
          thumbnail: `/thumbnails/${itemSlug}.webp`,
          href: `/components/${catSlug}/${subSlug}/${itemSlug}`,
        });
      });
    });
  });

  // Preserve original FEATURED_COMPONENTS order
  const orderMap = new Map(
    FEATURED_COMPONENTS.map((name, i) => [toKebabCase(name), i]),
  );
  items.sort(
    (a, b) => (orderMap.get(a.id) ?? 999) - (orderMap.get(b.id) ?? 999),
  );

  return items;
}

function ComponentsShowcase() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Build once — synchronous, no fetch needed
  const featuredComponents = useMemo(
    () => buildFeaturedItems().slice(0, 15),
    [],
  );

  // Auto-advance every 5s — restarts whenever activeCardIndex changes
  // (whether from user click or from the interval itself)
  useEffect(() => {
    if (featuredComponents.length === 0) return;

    const interval = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % featuredComponents.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredComponents.length, activeCardIndex]);

  // Reset image error when card changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setImageError(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [activeCardIndex]);

  if (featuredComponents.length === 0) {
    return (
      <div className="relative mt-5 md:mt-10 p-10 md:p-15 text-sm text-foreground/50 w-full">
        No featured components available.
      </div>
    );
  }

  const current = featuredComponents[activeCardIndex];

  return (
    <div className="block md:hidden lg:block relative mt-5 w-full">
      <Link key={`${current.id}-${current.thumbnail}`} href={current.href}>
        <div className="relative cursor-pointer p-2 group bg-card shadow-2xl shadow-blue-500/30 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 w-full">
          <div className="aspect-square relative shadow-xl/15 max-h-40 sm:max-h-60 md:max-h-70 w-full overflow-hidden rounded-xl sm:rounded-2xl">
            {!imageError && current.thumbnail ? (
              <Image
                key={current.id}
                src={current.thumbnail}
                alt={current.displayName}
                width={5000}
                height={5000}
                priority
                unoptimized
                onError={() => setImageError(true)}
                className="object-cover group-hover:scale-110 transition-all duration-500 w-full h-full"
              />
            ) : (
              <div className="bg-linear-to-br from-blue-600/20 via-background to-background w-full h-full flex items-center justify-center">
                <span className="text-4xl sm:text-5xl md:text-7xl font-bold text-blue-600/30">
                  {current.displayName.charAt(0)}
                </span>
              </div>
            )}
          </div>

          <div className="p-3 sm:p-4 pt-4 sm:pt-5">
            <div className="flex items-start justify-between font-semibold gap-2">
              <h3 className="text-sm sm:text-base md:text-lg whitespace-nowrap truncate">
                {current.displayName}
              </h3>
            </div>

            <p className="text-xs sm:text-sm font-semibold tracking-wide line-clamp-2 opacity-40 mt-2 mb-3 sm:mb-4">
              {current.description}
            </p>

            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {current.tags.slice(0, 2).map((tag, idx) => (
                <span
                  key={`${tag}-${idx}`}
                  className="text-[10px] sm:text-xs px-2 sm:px-2.75 h-5 sm:h-6.5 flex items-center bg-foreground/5 border text-foreground/60 capitalize font-medium tracking-wide rounded-sm"
                >
                  {tag}
                </span>
              ))}
              {current.tags.length > 2 && (
                <span className="text-[10px] sm:text-xs px-2 sm:px-2.75 h-5 sm:h-6.5 flex items-center bg-foreground/5 border text-foreground/60 font-medium rounded-sm">
                  +{current.tags.length - 2}
                </span>
              )}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 opacity-0 group-hover:opacity-50 bg-linear-to-l from-transparent via-blue-600 to-transparent transition-all duration-500 h-px w-full" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 blur-sm opacity-0 group-hover:opacity-50 bg-linear-to-l from-transparent via-blue-600 to-transparent rounded-full transition-all duration-500 h-1.5 w-2/3" />
        </div>
      </Link>

      {/* Indicator dots */}
      <div className="flex items-center justify-center gap-1 sm:gap-1.5 mt-4 sm:mt-5 md:mt-10 flex-wrap">
        {featuredComponents.map((card, index) => (
          <button
            key={card.id}
            onClick={() => setActiveCardIndex(index)}
            className={`h-2 sm:h-3 rounded-full transition-all duration-500 ${
              index === activeCardIndex
                ? "w-6 sm:w-8 md:w-10 bg-blue-600"
                : "w-2 sm:w-3 bg-blue-600/40 backdrop-blur-md hover:bg-blue-600"
            }`}
            aria-label={`View ${card.displayName}`}
          />
        ))}
      </div>
    </div>
  );
}

function FreeOpenSourceDemo() {
  return (
    <div className="absolute -top-5 sm:-top-15 md:-top-20 -left-5 sm:-left-10 md:-left-15 black-ops-one z-0 text-[10rem] sm:text-[15rem] md:text-[20rem] lg:text-[30rem] tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-pink-500 via-pink-500/15 opacity-20 leading-none">
      MIT
    </div>
  );
}

function MobileFirstDesign() {
  return (
    <div className="hidden lg:flex absolute top-0 hover:-top-5 sm:hover:-top-10 group/dummyCard items-center gap-3 sm:gap-5 p-2 sm:p-3 bg-zinc-800 shadow-2xl shadow-yellow-400/50 rounded-t-[1.5rem] sm:rounded-t-[2.3rem] transition-all duration-500 w-full h-40 sm:h-60 md:h-80 lg:h-120">
      <div className="relative p-3 sm:p-5 bg-black rounded-t-2xl sm:rounded-t-4xl w-full h-full">
        <Camera className="-mt-1 sm:-mt-2" />
        <div className="flex flex-col items-start gap-1.5 sm:gap-2 z-50 transform-gpu group-hover/dummyCard:-translate-y-10 sm:group-hover/dummyCard:-translate-y-20 md:group-hover/dummyCard:-translate-y-30 transition-all duration-500 mt-2 sm:mt-4 p-2 sm:p-3 bg-white/10 backdrop-blur-lg text-white shadow-xl rounded-xl sm:rounded-2xl w-full">
          <Image
            src="/ui.venumity.png"
            alt="Banner Image"
            width={500}
            height={500}
            priority
            unoptimized
            className="aspect-video object-cover shadow-lg/20 rounded-lg sm:rounded-xl w-full"
          />
          <div className="space-y-1 sm:space-y-2 p-1 sm:p-2 w-full">
            <h3 className="text-xs sm:text-sm md:text-lg tracking-wide leading-none">
              Venumity UI Hero
            </h3>
            <p className="text-[8px] sm:text-[10px] md:text-xs font-semibold tracking-wide opacity-50">
              Lorem ipsum dolor sit amet consectetur adipisicing elit, rehend
              voluptas tempora inventore quaerat adipisicing.
            </p>
            <div className="flex items-center gap-2 sm:gap-3 tracking-normal mt-2 sm:mt-5">
              <Button
                size="sm"
                className="bg-white! text-black! border-0! px-2! sm:px-4! font-semibold rounded-sm text-[8px] sm:text-xs md:text-sm h-6 sm:h-8"
              >
                Button A
              </Button>
              <Button
                size="sm"
                className="bg-white/5! border border-white/10 text-white/40! px-2! sm:px-4! font-semibold rounded-sm text-[8px] sm:text-xs md:text-sm h-6 sm:h-8"
              >
                Button B
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 opacity-60 bg-linear-to-t from-transparent via-yellow-400 to-transparent rounded-full h-full w-px" />
        <div className="absolute top-0 right-0 opacity-60 bg-linear-to-t from-transparent via-yellow-400 to-transparent rounded-full h-full w-px" />
      </div>
    </div>
  );
}

function CommanLineInterface() {
  return (
    <div className="relative space-y-3 sm:space-y-5 p-3 sm:p-5 md:p-8 bg-foreground/3 backdrop-blur-lg rounded-xl sm:rounded-2xl w-full">
      {/* Core message */}
      <div className="space-y-2 sm:space-y-3">
        <p className="text-sm sm:text-base md:text-lg font-medium tracking-wide">
          <span className="text-rose-500 font-semibold">CLI Command</span> — no
          setup, no config.
        </p>
        <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed">
          The CLI auto-detects and installs every required dependency, shadcn/ui
          primitive, and helper file. Just run it and start building.
        </p>
      </div>

      {/* CLI Commands */}
      <div className="space-y-5 w-full">
        <p className="text-xs uppercase tracking-wider font-semibold">
          Quick Start
        </p>
        <div className="space-y-2 font-mono text-[0.7rem] sm:text-xs text-foreground/80">
          <div className="flex items-center gap-2 px-3 py-2 bg-background border border-dashed border-rose-500/60 rounded-md">
            <span className="text-lg md:text-xl font-light text-rose-500 select-none leading-none">
              $
            </span>
            <span className="leading-snug">
              npx venumityui@latest add chat-card-suggestion
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-background border border-dashed border-rose-500/60 rounded-md">
            <span className="text-lg md:text-xl font-light text-rose-500 select-none leading-none">
              $
            </span>
            <span className="leading-snug">
              npx venumityui@latest add --all
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SmoothAnimationDemo() {
  const ICONS = [
    { image: "/icons/nextjs.webp", alt: "Next.js" },
    { image: "/icons/react.webp", alt: "React" },
    { image: "/icons/tailwindcss.webp", alt: "Tailwind CSS" },
    { image: "/icons/typescript.webp", alt: "TypeScript" },
    { image: "/icons/motion.webp", alt: "Framer Motion" },
    { image: "/icons/shadcnui.webp", alt: "shadcn/ui" },
  ];

  return (
    <div className="absolute inset-0 top-0 left-0 sm:left-1/5 z-60 bg-background rounded-b-2xl sm:rounded-b-3xl overflow-hidden h-fit w-full sm:w-80 md:w-100 lg:w-120">
      <div className="absolute inset-0 bg-linear-to-r from-background z-50 rounded-bl-2xl sm:rounded-bl-3xl h-23 w-1/3" />
      <div className="absolute top-0 right-0 bg-linear-to-l from-background z-50 rounded-br-2xl sm:rounded-br-3xl h-23 w-1/3" />
      <InfiniteLogoMovingCards
        items={ICONS}
        speed="normal"
        pauseOnHover={true}
        className="z-30 w-full"
      />
      <div className="absolute top-0 left-0 z-40 opacity-60 bg-linear-to-l from-transparent via-indigo-500 to-transparent rounded-full h-px w-full" />
      <div className="absolute -top-3 sm:-top-5 left-0 z-40 opacity-40 bg-linear-to-l from-transparent via-indigo-500 to-transparent blur-xl rounded-full h-6 sm:h-10 w-full" />
      <div className="absolute bottom-0 left-0 z-40 opacity-60 bg-linear-to-l from-transparent via-indigo-500 to-transparent rounded-full h-px w-full" />
      <div className="absolute -bottom-3 sm:-bottom-5 left-0 z-40 opacity-40 bg-linear-to-l from-transparent via-indigo-500 to-transparent blur-xl rounded-full h-6 sm:h-10 w-full" />
    </div>
  );
}

export default function Features() {
  const features: Feature[] = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-blocks-icon lucide-blocks w-full h-full"
        >
          <path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2" />
          <rect x="14" y="2" width="8" height="8" rx="1" />
        </svg>
      ),
      elements: [
        {
          type: "path",
          d: "M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2",
        },
        { type: "rect", x: 14, y: 2, width: 8, height: 8, rx: 1 },
      ],
      title: "100+ Reusable Components",
      description:
        "Each component is self-contained, easy to copy, and works out of the box.",
      content: <ComponentsShowcase />,
      iconColor: "text-blue-600",
      textColor: "from-blue-600 via-blue-600/60",
      bg: "from-blue-600/15 to-background",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-gift-icon lucide-gift w-full h-full"
        >
          <path d="M12 7v14" />
          <path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
          <path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5" />
          <rect x="3" y="7" width="18" height="4" rx="1" />
        </svg>
      ),
      elements: [
        { type: "path", d: "M12 7v14" },
        { type: "path", d: "M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" },
        {
          type: "path",
          d: "M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5",
        },
        { type: "rect", x: 3, y: 7, width: 18, height: 4, rx: 1 },
      ],
      title: "Free & Open Source",
      description:
        "MIT licensed. Use in personal or commercial projects without restrictions.",
      content: <FreeOpenSourceDemo />,
      iconColor: "text-pink-500",
      textColor: "from-pink-500 via-pink-500/60",
      bg: "from-pink-500/15 to-background",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-rocket-icon lucide-rocket w-full h-full"
        >
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" />
          <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" />
        </svg>
      ),
      elements: [
        { type: "path", d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" },
        {
          type: "path",
          d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09",
        },
        {
          type: "path",
          d: "M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z",
        },
        { type: "path", d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" },
      ],
      title: "Mobile First Design",
      description:
        "Thoughtfully designed to feel native on every screen, from smartphones to ultrawide monitors.",
      content: <MobileFirstDesign />,
      iconColor: "text-yellow-400",
      textColor: "from-yellow-400 via-yellow-400/60",
      bg: "from-yellow-400/15 to-background",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-shield-check-icon lucide-shield-check w-full h-full"
        >
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
      elements: [
        {
          type: "path",
          d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        },
        { type: "path", d: "m9 12 2 2 4-4" },
      ],
      title: "Type Safety",
      description:
        "Full TypeScript support with strict types and IntelliSense.",
      iconColor: "text-green-500",
      textColor: "from-green-500 via-green-500/60",
      bg: "from-green-500/15 to-background",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-shield-check-icon lucide-shield-check w-full h-full"
        >
          <path d="M12 19h8" />
          <path d="m4 17 6-6-6-6" />
        </svg>
      ),
      elements: [
        {
          type: "path",
          d: "M12 19h8",
        },
        { type: "path", d: "m4 17 6-6-6-6" },
      ],
      title: "Use CLI Mode",
      content: <CommanLineInterface />,
      iconColor: "text-rose-500",
      textColor: "from-rose-500 via-rose-500/60",
      bg: "from-rose-500/15 to-background",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-feather-icon lucide-feather w-full h-full"
        >
          <path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z" />
          <path d="M16 8 2 22" />
          <path d="M17.5 15H9" />
        </svg>
      ),
      elements: [
        {
          type: "path",
          d: "M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z",
        },
        { type: "path", d: "M16 8 2 22" },
        { type: "path", d: "M17.5 15H9" },
      ],
      title: "Smooth Animations",
      description:
        "Framer Motion powers every interaction - micro-interactions to page transitions.",
      content: <SmoothAnimationDemo />,
      iconColor: "text-indigo-500",
      textColor: "from-indigo-500 via-indigo-500/60",
      bg: "from-indigo-500/15 to-background",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <section className="bg-foreground/5 backdrop-blur-sm w-full">
      <div className="flex flex-col gap-5 md:gap-10 lg:gap-20 p-3 sm:p-5 md:p-10 lg:py-20 m-auto max-w-400 w-full">
        <div className="flex flex-col items-center justify-center m-auto gap-5 w-fit">
          <p className="tracking-tight text-center text-3xl md:text-4xl lg:text-5xl">
            Features of
          </p>
          <p className="cinzel tracking-wide text-5xl md:text-7xl lg:text-9xl font-semibold text-transparent bg-clip-text bg-linear-to-br from-foreground/5 via-foreground/90 to-foreground/5 pb-2 w-fit">
            Library
          </p>
          <p className="text-center text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-3xl">
            Get beautifully designed, production-ready components and layouts so
            which reduces time for rebuilding the basics and more time creating
            your product in more better way.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 lg:grid-rows-3 gap-4 sm:gap-5 lg:gap-6 w-full"
        >
          {features.map((feature, index) => {
            const bentoStyles = [
              "lg:col-span-2 lg:row-span-3",
              "lg:col-span-4",
              "lg:col-span-2 lg:row-span-2",
              "lg:col-span-2",
              "lg:col-span-2 lg:row-span-2",
              "lg:col-span-4",
            ];

            return (
              <div
                key={feature.title}
                className={bentoStyles[index % bentoStyles.length]}
              >
                <Card
                  className={`relative p-4! sm:p-6! md:p-10! transition-all bg-linear-to-br! ${feature.bg} inset-shadow-sm inset-shadow-foreground/5 ring-0! shadow-none! rounded-xl sm:rounded-2xl overflow-hidden h-fit md:h-full`}
                >
                  {(feature.title === "Free & Open Source" ||
                    feature.title === "Smooth Animations") && (
                    <div className="w-full">{feature.content}</div>
                  )}
                  <CardHeader className="p-0! z-30!">
                    <span
                      className={`size-8 sm:size-10 md:size-12 lg:size-15 ${feature.iconColor} mb-3 sm:mb-5`}
                    >
                      {feature.icon}
                    </span>
                    <CardTitle
                      className={`mt-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.5rem] font-semibold tracking-tight text-transparent bg-clip-text bg-linear-to-br ${feature.textColor} pb-2 sm:pb-3 w-fit`}
                    >
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm md:text-base lg:text-lg text-foreground/50 tracking-wide leading-5 sm:leading-6 max-w-md">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>

                  {feature.title !== "Free & Open Source" &&
                    feature.title !== "Smooth Animations" && (
                      <CardContent className="p-0! z-50 transform-gpu text-sm sm:text-base text-foreground! leading-6 sm:leading-7 tracking-wide max-w-2xl">
                        {feature.content}
                      </CardContent>
                    )}

                  <motion.svg
                    width="100"
                    height="100"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`absolute -bottom-20 sm:-bottom-25 md:-bottom-35 -right-15 sm:-right-20 md:-right-25 -rotate-10 z-0 size-50 sm:size-70 md:size-100 ${feature.iconColor} opacity-20`}
                  >
                    {feature.elements.map(
                      (element: IconElement, elementIndex: number) => {
                        if (element.type === "path") {
                          return (
                            <motion.path
                              key={`${feature.title}-path-${elementIndex}`}
                              d={element.d}
                              initial={{ pathLength: 0 }}
                              whileInView={{ pathLength: 1 }}
                              transition={{
                                duration: 2,
                                delay: elementIndex * 0.15,
                              }}
                            />
                          );
                        }
                        return (
                          <motion.rect
                            key={`${feature.title}-rect-${elementIndex}`}
                            x={element.x}
                            y={element.y}
                            width={element.width}
                            height={element.height}
                            rx={element.rx}
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{
                              duration: 2,
                              delay: elementIndex * 0.15,
                            }}
                          />
                        );
                      },
                    )}
                  </motion.svg>
                </Card>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
