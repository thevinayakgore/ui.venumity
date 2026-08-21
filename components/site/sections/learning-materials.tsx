// components/site/sections/learning-materials.tsx
"use client";
import { getAllResources, getAllCategories } from "@/registry/resources";
import { ResourceCard } from "@/app/resources/page";
import type { ResourcePage } from "@/registry/resources";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export default function LearningMaterials() {
  const allCategories = getAllResources();
  const categoryDisplay = getAllCategories();

  // Build a map of category slug -> description for fallback descriptions
  const descriptionMap = categoryDisplay.reduce<Record<string, string>>(
    (acc, cat) => {
      acc[cat.slug] = cat.description ?? "";
      return acc;
    },
    {},
  );

  // Flatten all published pages across categories, remembering their category slug
  const allPages: { page: ResourcePage; categorySlug: string }[] =
    allCategories.flatMap((cat) =>
      (cat.pages || [])
        .filter((p) => p.published)
        .map((page) => ({ page, categorySlug: cat.slug })),
    );

  return (
    <div className="flex flex-col items-center justify-center m-auto p-3 sm:p-5 md:p-10 gap-5 md:gap-10 lg:gap-20 max-w-400 w-full">
      <div>
        <h2
          className={cn(
            "text-transparent bg-clip-text bg-linear-to-tl from-transparent via-foreground to-transparent font-semibold text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
          )}
        >
          <span className="tracking-tighter">Articles for</span>{" "}
          <span className="dancing ml-1 sm:ml-2 text-5xl sm:text-6xl md:text-7xl lg:text-9xl text-foreground opacity-15">
            Learning
          </span>
        </h2>
        <p className="text-center text-xs sm:text-sm md:text-base lg:text-lg text-foreground/40 px-2 sm:px-0">
          Learn from those who shared their knowledge, so it may help you to
          <br className="hidden sm:block" /> build better things. Start
          <Link
            href="/resources"
            className="mx-1 sm:mx-1.5 font-semibold text-primary underline underline-offset-2 decoration-1"
          >
            reading now
          </Link>
          and also do share your knowledge here.
        </p>
      </div>
      {allPages.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 w-full">
          {allPages.slice(0, 6).map(({ page, categorySlug }) => (
            <ResourceCard
              key={page.title}
              page={page}
              categorySlug={categorySlug}
              fallbackDescription={descriptionMap[categorySlug]}
            />
          ))}
        </div>
      )}
      <div className="flex flex-col items-center gap-4 sm:gap-5">
        <Link href="/resources" className="overflow-hidden">
          <Button className="relative p-4! sm:p-5! gap-2! hover:pr-8! sm:hover:pr-9! group/btn bg-foreground! text-secondary! font-bold border-0! shadow-none hover:shadow-lg shadow-foreground/30! transition-all duration-500 text-sm sm:text-base">
            Read More
            <ArrowUpRight className="absolute top-8 sm:top-10 right-12 sm:right-15 z-20 group-hover/btn:top-2 group-hover/btn:right-2 size-3.5 sm:size-4.5 opacity-0 group-hover/btn:opacity-100 text-primary transition-all duration-500" />
          </Button>
        </Link>
        <Link
          href="/docs/add-resources"
          className="text-xs sm:text-sm font-semibold tracking-wide text-foreground/40 hover:text-foreground transition-all duration-500 text-center px-3"
        >
          Wanted to Contribute resources ?
        </Link>
      </div>
    </div>
  );
}
