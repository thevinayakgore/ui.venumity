// components/site/sections/learning-materials.tsx
"use client";
import Link from "next/link";
import { ResourcePage } from "@/types";
import { Button } from "@/components/ui/button";
import { ResourceCard } from "@/app/resources/page.client";
import { getAllResources, getAllCategories } from "@/registry/resources";
import {
  ArrowDownLeft,
  ArrowDownRight,
  ArrowUpLeft,
  ArrowUpRight,
  GitPullRequestArrow,
} from "lucide-react";

export default function Articles() {
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
      (cat.pages || []).map((page) => ({ page, categorySlug: cat.slug })),
    );

  return (
    <section className="flex flex-col items-center justify-center m-auto px-3 py-5 sm:px-5 md:p-10 lg:py-20 gap-5 md:gap-10 lg:gap-20 border-y w-full">
      <header className="flex flex-col items-center gap-1 md:gap-5 w-fit">
        <p className="tracking-tight text-center text-3xl md:text-4xl lg:text-5xl">
          Reading
        </p>
        <p className="cinzel tracking-wide text-5xl md:text-7xl lg:text-9xl font-semibold text-transparent bg-clip-text bg-linear-to-br from-foreground/5 via-foreground/90 to-foreground/5 pb-2 w-fit">
          Space
        </p>
        <p className="text-center text-sm md:text-base lg:text-lg text-muted-foreground max-w-3xl">
          Explore helpful articles which will help you build better things with
          more confidence. Start reading now and share your own knowledge to
          help others grow in community.
        </p>
        <div className="group relative flex items-center justify-center mt-5 md:mt-10">
          {/* Top drawer */}
          <div className="pointer-events-none absolute right-0 top-0 flex min-h-10 items-start justify-center rounded-t-xl bg-emerald-500 text-white px-3 py-1 text-[0.8em] font-semibold opacity-0 transition-all duration-300 ease-out group-hover:-translate-y-7 group-hover:rotate-[-4deg] group-hover:opacity-100 group-hover:animate-hue group-active:translate-y-0 group-active:scale-50">
            📚 Guide
          </div>

          {/* Bottom drawer */}
          <div className="pointer-events-none absolute bottom-0 left-0 flex min-h-10 items-end justify-center rounded-b-xl bg-pink-500 text-white px-3 py-1 text-[0.8em] font-semibold opacity-0 transition-all duration-300 ease-out group-hover:translate-y-7 group-hover:rotate-[4deg] group-hover:opacity-100 group-hover:animate-hue group-active:translate-y-0 group-active:scale-50">
            ✍🏻 Contribute
          </div>

          <Link
            href="/resources"
            aria-label="Read Articles"
            className="relative flex px-8 py-3.5 items-center justify-center rounded-xl bg-blue-500 border border-foreground/15 shadow-lg/10 group-hover:shadow-none inset-shadow-sm inset-shadow-blue-300 transition-all duration-300 ease-[cubic-bezier(0,0,0,2.5)] group-hover:scale-105 group-active:scale-95"
          >
            <span className="inline-block bg-white bg-clip-text text-xl font-semibold text-transparent drop-shadow-[0_1px_0_#ffffff66] transition-all duration-300 ease-[cubic-bezier(0,0,0,2.5)] [-webkit-text-fill-color:transparent] group-hover:scale-105 group-hover:drop-shadow-[0_1px_0_#ffffff66,0_-1px_0_#00000099,0_6px_2px_#0000004d] group-active:scale-100 group-active:drop-shadow-[0_1px_0_#ffffff66,0_-1px_0_#00000099,0_6px_2px_#00000066]">
              Explore Articles
            </span>
          </Link>
        </div>
      </header>
      {allPages.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-400 w-full">
          {allPages.slice(0, 9).map(({ page, categorySlug }) => (
            <ResourceCard
              page={page}
              key={page.title}
              categorySlug={categorySlug}
              fallbackDescription={descriptionMap[categorySlug]}
            />
          ))}
        </div>
      )}
      <div className="flex flex-col items-center gap-4 sm:gap-5">
        <span className="text-xs sm:text-sm font-medium tracking-wide text-muted-foreground text-center">
          Wanted to Contribute resources ?
        </span>
        <Link href="/docs/add-resources" target="_blank">
          <Button className="relative p-5! sm:p-6! md:p-7! gap-2.5! group/btn bg-foreground! text-secondary! font-semibold text-sm sm:text-base md:text-lg tracking-wide border-0! shadow-none hover:shadow-xl shadow-green-500/30! transition-all duration-500 overflow-hidden">
            <GitPullRequestArrow className="size-4 sm:size-6" />
            Make Article PRs
            <ArrowUpRight className="absolute top-full right-full z-20 group-hover/btn:top-0 group-hover/btn:right-0 size-4 sm:size-5 opacity-0 group-hover/btn:opacity-100 text-green-500 transition-all duration-700" />
            <ArrowUpLeft className="absolute top-full left-full z-20 group-hover/btn:top-0 group-hover/btn:left-0 size-4 sm:size-5 opacity-0 group-hover/btn:opacity-100 text-green-500 transition-all duration-700" />
            <ArrowDownRight className="absolute bottom-full right-full z-20 group-hover/btn:bottom-0 group-hover/btn:right-0 size-4 sm:size-5 opacity-0 group-hover/btn:opacity-100 text-green-500 transition-all duration-700" />
            <ArrowDownLeft className="absolute bottom-full left-full z-20 group-hover/btn:bottom-0 group-hover/btn:left-0 size-4 sm:size-5 opacity-0 group-hover/btn:opacity-100 text-green-500 transition-all duration-700" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
