// app/components/page.client.tsx
"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Flame, Loader2, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BadgeTextAnimate from "@/components/ui/badge-text-animate";
import { toKebabCase } from "@/utils/slug-kebab";
import { COMPONENTS } from "@/registry/components";
import {
  getSubcategoryTags,
  getSubcategoryTechs,
} from "@/registry/component-utils";
import { getCategoryCardThumbnailPath } from "@/registry/component-utils";
import Link from "next/link";

const LEFT_WORDS = [
  "Tech",
  "Dev",
  "Build",
  "Code",
  "Ship",
  "Design",
  "Scale",
  "Create",
];

const RIGHT_WORDS = [
  "Helpers",
  "Vibes",
  "Blocks",
  "Tools",
  "Faster",
  "Systems",
  "Products",
  "Interfaces",
];

const PAGE_SIZE = 30;

export interface CategoryCard {
  id: string;
  title: string;
  thumbnail?: string;
  description: string;
  type: "category" | "subcategory";
  parentCategory?: string;
  path: string;
  itemCount: number;
  tags: string[];
  techs?: string[];
}

export interface CategoryCardProps {
  card: CategoryCard;
  onClick: (path: string) => void;
}

// Build cards from registry (no cache)
export function getCategoryCards(): CategoryCard[] {
  const cards: CategoryCard[] = [];

  COMPONENTS.forEach((category) => {
    if (category.subcategories.length > 0) {
      category.subcategories.forEach((subcategory) => {
        const itemCount = subcategory.items?.length || 0;

        const path = `/${toKebabCase(category.name)}/${toKebabCase(subcategory.name)}`;

        const allTags =
          subcategory.tags ||
          getSubcategoryTags(
            toKebabCase(category.name),
            toKebabCase(subcategory.name),
          ) ||
          [];

        const allTechs =
          subcategory.techs ||
          getSubcategoryTechs(
            toKebabCase(category.name),
            toKebabCase(subcategory.name),
          ) ||
          [];

        const description =
          subcategory.description ||
          `${itemCount} component${itemCount !== 1 ? "s" : ""} for ${subcategory.name.toLowerCase()}`;

        const thumbnailPath = getCategoryCardThumbnailPath(subcategory);

        cards.push({
          id: `${category.name}-${subcategory.name}`,
          title: subcategory.name,
          description: description,
          type: "subcategory",
          parentCategory: category.name,
          path: path,
          itemCount: itemCount,
          tags: allTags,
          techs: allTechs,
          thumbnail: thumbnailPath,
        });
      });
    }
  });

  return [...cards].sort((a, b) =>
    a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
  );
}

export function CategoryCard({ card, onClick }: CategoryCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <button
      onClick={() => onClick(card.path)}
      className="relative cursor-pointer text-start p-2 group bg-foreground/3 rounded-4xl overflow-hidden hover:shadow-xl/10 transition-all duration-500 w-full h-fit"
    >
      <div className="relative flex flex-col transition-all duration-500 w-full h-full">
        <div className="aspect-square relative shadow-xl/15 w-full max-h-70 overflow-hidden rounded-2xl transition-all duration-500">
          {!imageError && card.thumbnail ? (
            <Image
              src={card.thumbnail}
              alt={card.title}
              width={5000}
              height={5000}
              unoptimized
              loading="eager"
              onError={handleImageError}
              className="object-cover group-hover:scale-110 transition-all duration-500 w-full h-full"
            />
          ) : (
            <div className="bg-linear-to-br from-accent via-background to-background w-full h-full" />
          )}

          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
              imageError || !card.thumbnail ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative z-10 flex flex-col items-center justify-center">
              <span className="text-7xl font-bold drop-shadow-lg">
                {card.title.charAt(0)}
              </span>
              <span className="text-sm mt-2">{card.title}</span>
            </div>
          </div>
        </div>

        <div className="p-4 pt-5">
          <div className="flex items-start justify-between font-semibold">
            <h2 className="text-xl whitespace-nowrap truncate">{card.title}</h2>
            <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary/80">
              {card.itemCount > 0 && card.itemCount <= 9 && "0"}
              {card.itemCount}
            </span>
          </div>

          <p className="text-sm tracking-wide line-clamp-2 opacity-40 mt-2 mb-5">
            {card.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {card.tags && card.tags.length > 0 ? (
              <>
                {card.tags.slice(0, 2).map((item, index) => (
                  <Badge
                    key={`${item}-${index}`}
                    className="bg-foreground/5! txet-[0.7rem]! text-foreground/50! capitalize font-semibold tracking-wide px-2! h-6.5! leading-none rounded-sm border border-foreground/10 w-fit"
                  >
                    {item}
                  </Badge>
                ))}

                {card.tags.length > 2 && (
                  <Badge className="bg-foreground/5! txet-[0.7rem]! text-foreground/50! font-semibold tracking-wide px-2! h-6.5! leading-none rounded-sm border border-foreground/10 w-fit">
                    +{card.tags.length - 2}
                  </Badge>
                )}
              </>
            ) : (
              card.parentCategory && (
                <span className="text-[10px] px-1.5 py-1 leading-none rounded bg-foreground/5 border border-foreground/10 text-muted-foreground w-fit">
                  {card.parentCategory}
                </span>
              )
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 opacity-0 group-hover:opacity-50 bg-linear-to-l from-transparent via-primary to-transparent transition-all duration-500 h-px w-full" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 blur-sm opacity-0 group-hover:opacity-50 bg-linear-to-l from-transparent via-primary to-transparent rounded-full transition-all duration-500 h-1.5 w-2/3" />
    </button>
  );
}

// ====================
// MAIN COMPONENT
// ====================
export function Components() {
  const router = useRouter();
  const [allCards, setAllCards] = useState<CategoryCard[]>([]);
  const [displayedCards, setDisplayedCards] = useState<CategoryCard[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [downloads, setDownloads] = useState<number | null>(null);
  const [downloadsLoading, setDownloadsLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Fetch npm downloads
  useEffect(() => {
    async function fetchDownloads() {
      try {
        const res = await fetch(
          "https://api.npmjs.org/downloads/point/last-month/venumityui",
        );
        if (res.ok) {
          const data = await res.json();
          setDownloads(data.downloads || 0);
        }
      } catch (error) {
        console.error("Failed to fetch downloads:", error);
      } finally {
        setDownloadsLoading(false);
      }
    }
    fetchDownloads();
  }, []);

  // Build the full list once on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const cards = getCategoryCards();
        setAllCards(cards);
        // Load first batch immediately
        setDisplayedCards(cards.slice(0, PAGE_SIZE));
        setPage(1);
        setHasMore(cards.length > PAGE_SIZE);
      } catch (error) {
        console.error("Error loading components:", error);
      } finally {
        setInitialLoading(false);
      }
    }, 1200); // initial loader visible ~1.2s

    return () => clearTimeout(timer);
  }, []);

  // Intersection observer for infinite scroll
  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    // Small delay so the loader is visible briefly
    setTimeout(() => {
      const nextPage = page + 1;
      const start = page * PAGE_SIZE;
      const end = nextPage * PAGE_SIZE;
      const nextBatch = allCards.slice(start, end);

      if (nextBatch.length > 0) {
        setDisplayedCards((prev) => [...prev, ...nextBatch]);
        setPage(nextPage);
        setHasMore(end < allCards.length);
      } else {
        setHasMore(false);
      }

      setLoadingMore(false);
    }, 600);
  }, [page, hasMore, loadingMore, allCards]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "200px" },
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasMore, loadingMore, loadMore]);

  const handleCardClick = (path: string) => {
    router.push(`/components${path}`);
  };

  const formatDownloads = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <main className="w-full">
      <header className="mb-5 md:mb-10 w-full">
        <div className="hidden lg:flex items-center justify-between mb-5 w-full">
          <Badge
            variant="secondary"
            className="gap-1.5 h-8 pl-2 pr-3 font-semibold! tracking-wider! bg-foreground/5 border-foreground/10 shadow-xl/5! rounded-sm [&>svg]:size-4!"
          >
            <Flame />
            <BadgeTextAnimate
              leftWords={LEFT_WORDS}
              rightWords={RIGHT_WORDS}
              interval={4000}
            />
          </Badge>
          <div className="space-y-1">
            <Link
              href="https://www.npmjs.com/package/venumityui"
              target="_blank"
            >
              <Badge
                variant="secondary"
                className="group gap-1.5 h-8 pl-2 pr-3 font-bold! tracking-wider! bg-foreground/5 hover:bg-blue-500 hover:text-white border-foreground/10 shadow-xl/5! rounded-sm [&>svg]:size-4! transition-all duration-500"
              >
                <Terminal className="size-3.5" />
                <span>CLI -</span>
                {downloadsLoading ? (
                  <Loader2 className="size-3.5 animate-spin text-blue-500 group-hover:text-white transition-all duration-500" />
                ) : (
                  <span className="text-sm font-semibold text-blue-500 group-hover:text-white transition-all duration-500">
                    {formatDownloads(downloads || 0)}
                  </span>
                )}
              </Badge>
            </Link>
            <p className="text-[0.7rem] text-foreground/40 italic font-semibold tracking-wide">
              Weekly Downloads
            </p>
          </div>
        </div>

        <h1 className="satisfy text-5xl md:text-7xl py-3 tracking-tight text-transparent bg-clip-text bg-linear-to-b from-foreground/30 via-foreground/10">
          Components
        </h1>

        <p className="text-sm md:text-base tracking-wide opacity-40 max-w-lg w-full">
          A curated collection of reusable UI components designed to help you
          build faster and more consistently.
        </p>
      </header>

      {/* Initial loading skeleton */}
      {initialLoading && (
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4 w-full">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="p-3 bg-foreground/3 border border-foreground/5 rounded-[1.2rem] overflow-hidden w-full h-fit animate-pulse"
            >
              <div className="space-y-2 rounded-[1.2rem] w-full h-full">
                <div className="aspect-video w-full bg-foreground/5 rounded-xl"></div>
                <div className="px-3 py-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="h-5 w-1/2 bg-foreground/5 rounded"></div>
                    <div className="h-6 w-8 bg-foreground/5 rounded"></div>
                  </div>
                  <div className="h-4 w-full bg-foreground/5 rounded"></div>
                  <div className="h-4 w-3/4 bg-foreground/5 rounded"></div>
                  <div className="flex gap-1.5">
                    <div className="h-5 w-12 bg-foreground/5 rounded"></div>
                    <div className="h-5 w-10 bg-foreground/5 rounded"></div>
                    <div className="h-5 w-8 bg-foreground/5 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Cards grid */}
      {!initialLoading && displayedCards.length > 0 && (
        <>
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4 w-full">
            {displayedCards.map((card) => (
              <CategoryCard
                key={card.id}
                card={card}
                onClick={handleCardClick}
              />
            ))}
          </section>

          {/* Infinite scroll trigger / loader */}
          <div ref={loaderRef} className="w-full py-10 flex justify-center">
            {loadingMore && (
              <div className="flex items-center gap-3 text-primary">
                <Loader2 className="size-7 animate-spin" />
                <span className="text-sm font-semibold">
                  Loading more components...
                </span>
              </div>
            )}
            {!hasMore && displayedCards.length > 0 && (
              <p className="text-xs text-foreground/40 font-medium">
                You&apos;ve reached the end of the list.
              </p>
            )}
          </div>
        </>
      )}

      {/* Empty state */}
      {!initialLoading && displayedCards.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="size-20 rounded-full bg-foreground/5 flex items-center justify-center mb-4">
            <Flame className="size-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">No components found</h3>
          <p className="text-base text-muted-foreground max-w-md">
            Components will appear here once they are added to the registry.
            Check back soon!
          </p>
        </div>
      )}
    </main>
  );
}
