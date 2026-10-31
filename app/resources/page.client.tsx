// app/resources/page.client.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import { toKebabCase } from "@/utils/slug-kebab";
import { ScrollText, Loader2 } from "lucide-react";
import { getAllCategories } from "@/registry/resources";
import { ResourcePage, ResourceCategory } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import BadgeTextAnimate from "@/components/ui/badge-text-animate";

const LEFT_WORDS = [
  "Easy",
  "Simple",
  "Basic",
  "Clear",
  "Cheat",
  "Short",
  "Beginner",
];
const RIGHT_WORDS = [
  "Grasp",
  "Learn",
  "Guides",
  "Notes",
  "Sheets",
  "Tricks",
  "Help",
];

const PAGE_SIZE = 30;

export default function Resources({
  initialCategories,
}: {
  initialCategories: ResourceCategory[];
}) {
  const pathname = usePathname();
  const categoryDisplay = getAllCategories();
  const loaderRef = useRef<HTMLDivElement>(null);

  // Flatten all pages from ALL categories
  const allPages = initialCategories.flatMap((category) =>
    category.pages.map((page) => ({ page, categorySlug: category.slug })),
  );

  // Infinite scroll state
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(allPages.length > PAGE_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [displayedPages, setDisplayedPages] = useState<
    { page: ResourcePage; categorySlug: string }[]
  >([]);

  // Initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayedPages(allPages.slice(0, PAGE_SIZE));
      setPage(1);
      setHasMore(allPages.length > PAGE_SIZE);
      setInitialLoading(false);
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const start = page * PAGE_SIZE;
      const end = nextPage * PAGE_SIZE;
      const nextBatch = allPages.slice(start, end);
      if (nextBatch.length > 0) {
        setDisplayedPages((prev) => [...prev, ...nextBatch]);
        setPage(nextPage);
        setHasMore(end < allPages.length);
      } else {
        setHasMore(false);
      }
      setLoadingMore(false);
    }, 400);
  }, [page, hasMore, loadingMore, allPages]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "200px" },
    );
    const el = loaderRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasMore, loadingMore, loadMore]);

  const getCategoryDescription = (categorySlug: string) => {
    const category = categoryDisplay.find((cat) => cat.slug === categorySlug);
    return category?.description || "Resource guide and documentation.";
  };

  const isMainPage = pathname === "/resources";

  return (
    <section className="flex flex-col items-start justify-start m-auto w-full min-h-screen">
      {isMainPage && (
        <header className="relative mb-5 xl:mb-10 w-full">
          <div className="hidden lg:flex items-start justify-between w-full h-45 xl:h-55">
            <Badge
              variant="secondary"
              className="gap-1.5 h-8 pl-2 pr-3 font-semibold! tracking-wider! bg-foreground/5 border-foreground/10 shadow-xl/5! rounded-sm [&>svg]:size-4!"
            >
              <ScrollText />
              <BadgeTextAnimate
                leftWords={LEFT_WORDS}
                rightWords={RIGHT_WORDS}
                interval={4000}
              />
            </Badge>
          </div>

          <h1 className="lg:absolute bottom-0 left-0 -ml-1 lg:-ml-2 pr-5 tracking-tight font-bold text-5xl md:text-7xl lg:text-[12rem] xl:text-[15rem] text-transparent bg-clip-text bg-linear-to-br from-foreground/15 via-foreground/10 to-transparent">
            Articles
          </h1>
          <div className="hidden lg:block absolute bottom-0 left-0 bg-linear-to-t from-background via-background/30 to-transparent w-full h-full" />
          <p className="relative z-10 text-sm md:text-base text-muted-foreground max-w-2xl w-full">
            Curated guides, libraries, and references to help you build faster
            with modern tools. From frameworks and animations to patterns and
            cheatsheets, everything in one place.
          </p>
        </header>
      )}

      <div className="w-full">
        {initialLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="p-3 bg-foreground/3 border border-foreground/5 rounded-[1.2rem] w-full h-fit animate-pulse"
              >
                <div className="aspect-video w-full bg-foreground/5 rounded-xl mb-3" />
                <div className="h-5 w-1/2 bg-foreground/5 rounded mb-2" />
                <div className="h-4 w-full bg-foreground/5 rounded" />
              </div>
            ))}
          </div>
        )}

        {!initialLoading && displayedPages.length > 0 && (
          <>
            <div className="columns-1 md:columns-2 gap-3 w-full">
              {displayedPages.map(({ page: resPage, categorySlug }) => (
                <div
                  key={`${categorySlug}-${resPage.title}`}
                  className="mb-3 break-inside-avoid"
                >
                  <ResourceCard
                    page={resPage}
                    categorySlug={categorySlug}
                    fallbackDescription={getCategoryDescription(categorySlug)}
                  />
                </div>
              ))}
            </div>

            <div
              ref={loaderRef}
              className="flex justify-center py-5 md:py-10 lg:pt-15 w-full"
            >
              {loadingMore && (
                <div className="flex items-center gap-3 text-primary">
                  <Loader2 className="size-7 animate-spin" />
                  <span className="text-sm font-semibold">
                    Loading more resources...
                  </span>
                </div>
              )}
              {!hasMore && (
                <p className="text-xs md:text-sm tracking-wide text-muted-foreground">
                  You&apos;ve reached the end of the list.
                </p>
              )}
            </div>
          </>
        )}

        {!initialLoading && displayedPages.length === 0 && (
          <div className="col-span-full text-center py-16 h-fit">
            <p className="text-muted-foreground">No resources available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export interface ResourceCardProps {
  page: ResourcePage;
  categorySlug: string;
  fallbackDescription: string;
}

export function ResourceCard({
  page,
  categorySlug,
  fallbackDescription,
}: ResourceCardProps) {
  const description = page.description || fallbackDescription;
  const slug = toKebabCase(page.title);

  // ✅ Generate the cover image dynamically from the title
  const coverImage = `/covers/${slug}.webp`;

  return (
    <Link
      href={`/resources/${categorySlug}/${slug}`}
      className="group relative flex h-fit w-full cursor-pointer flex-col items-start overflow-hidden rounded-[2rem] border-2 p-1 transition-all hover:border-primary"
    >
      <div className="flex h-full w-full flex-col overflow-hidden rounded-4xl bg-accent p-1 transition-all duration-500 dark:bg-card">
        <div className="border rounded-3xl overflow-hidden h-full w-full">
          <Image
            src={coverImage}
            alt={page.title}
            width={2000}
            height={2000}
            loading="eager"
            className="object-cover group-hover:scale-110 transition-all duration-500 w-full h-full"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.src = "/brand-logo.png";
            }}
          />
        </div>

        <div className="flex w-full flex-col items-start gap-2 p-4 pt-5! text-start">
          <h3 className="text-lg md:text-xl font-semibold tracking-wide">
            {page.title}
          </h3>

          <p className="line-clamp-2 text-sm tracking-wide text-muted-foreground">
            {description}
          </p>

          <div className="mt-2 flex flex-wrap gap-1 font-semibold!">
            {(page.tags || []).slice(0, 2).map((tag: string) => (
              <span
                key={tag}
                className="flex h-6 items-center rounded-full border bg-foreground/5 px-2.5 text-xs capitalize text-foreground/70"
              >
                {tag}
              </span>
            ))}

            {page.tags && page.tags.length > 2 && (
              <span className="flex h-6 items-center rounded-full border bg-foreground/5 px-2 text-xs capitalize text-foreground/70">
                +{(page.tags || []).length - 2}
              </span>
            )}
          </div>

          {page.authorNames && page.authorNames.length > 0 && (
            <div className="mt-3 flex min-w-fit max-w-full items-center gap-3 overflow-auto rounded-full bg-foreground/5 p-1.5 backdrop-blur-sm">
              {page.authorNames.map((item, idx) => (
                <div
                  key={item ?? idx}
                  className="size-7 shrink-0 overflow-hidden rounded-full"
                >
                  <Image
                    src={`https://github.com/${item}.png`}
                    alt={item}
                    width={500}
                    height={500}
                    priority
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
