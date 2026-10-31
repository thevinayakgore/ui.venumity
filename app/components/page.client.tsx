// app/components/page.client.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { COMPONENTS } from "@/registry/components";
import { formatCount } from "@/utils/format-count";
import { Flame, Loader2, Terminal } from "lucide-react";
import type { ComponentSubcategory } from "@/types/components";
import { useEffect, useState, useRef, useCallback } from "react";
import BadgeTextAnimate from "@/components/ui/badge-text-animate";
import { getThumbnailCandidates } from "@/registry/registry-utils";

const LEFT_WORDS = [
  "Tech", "Dev", "Build", "Code", "Ship", "Design", "Scale", "Create",
];

const RIGHT_WORDS = [
  "Helpers", "Vibes", "Blocks", "Tools", "Faster", "Systems", "Products", "Interfaces",
];

const PAGE_SIZE = 30;

export interface CategoryCard {
  id: string;
  path: string;
  title: string;
  tags: string[];
  itemCount: number;
  description: string;
  parentCategory?: string;
  thumbnailCandidates: string[];
  type: "category" | "subcategory";
}

export interface CategoryCardProps {
  card: CategoryCard;
  onClick: (path: string) => void;
}

export function getCategoryCards(): CategoryCard[] {
  const cards: CategoryCard[] = [];

  COMPONENTS.forEach((category) => {
    category.subcategories.forEach((subcategory: ComponentSubcategory) => {
      const itemCount = subcategory.items?.length || 0;
      if (itemCount === 0) return;

      const path = `/${category.slug}/${subcategory.slug}`;
      const description =
        subcategory.description ||
        `${itemCount} component${itemCount !== 1 ? "s" : ""} for ${subcategory.name.toLowerCase()}`;

      const thumbnailCandidates = getThumbnailCandidates(
        category.name,
        subcategory,
      );

      cards.push({
        id: `${category.slug}-${subcategory.slug}`,
        title: subcategory.name,
        path,
        itemCount,
        description,
        thumbnailCandidates,
        type: "subcategory",
        tags: subcategory.tags || [],
        parentCategory: category.name,
      });
    });
  });

  return [...cards].sort((a, b) =>
    a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
  );
}

export function CategoryCard({ card, onClick }: CategoryCardProps) {
  // Track which candidate image we are currently trying
  const [candidateIndex, setCandidateIndex] = useState(0);

  const currentThumbnail = card.thumbnailCandidates[candidateIndex];
  const hasNoMoreImages = candidateIndex >= card.thumbnailCandidates.length;

  // Reset candidate index if the card changes
  useEffect(() => {
    const timer = setTimeout(() => setCandidateIndex(0), 0);
    return () => clearTimeout(timer);
  }, [card.id]);

  const handleImageError = () => {
    setCandidateIndex((prev) => prev + 1);
  };

  const showFallback = hasNoMoreImages || !currentThumbnail;

  return (
    <button
      onClick={() => onClick(card.path)}
      className="relative w-full h-fit cursor-pointer overflow-hidden rounded-4xl border-2 text-start transition-all group p-0.5 hover:border-primary"
    >
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl bg-accent p-1 transition-all duration-500 dark:bg-card">
        <div
          className="relative aspect-square border max-h-70 w-full overflow-hidden rounded-[1.3rem] transition-all duration-500"
        >
          {!showFallback ? (
            <Image
              key={currentThumbnail}
              src={currentThumbnail}
              alt={card.title}
              width={5000}
              height={5000}
              priority
              unoptimized
              loading="eager"
              onError={handleImageError}
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full bg-background" />
          )}

          {/* Letter-avatar fallback overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:scale-120 ${
              showFallback ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div className="relative z-10 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold md:text-6xl lg:text-8xl">
                {card.title.charAt(0)}
              </span>
              <span className="mt-2 text-sm">{card.title}</span>
            </div>
          </div>
        </div>

        <div className="p-4 pt-5">
          <div className="flex items-start justify-between font-medium">
            <h2 className="truncate whitespace-nowrap text-xl">{card.title}</h2>
            <span className="rounded bg-primary/10 px-2 py-1 text-xs text-primary/80">
              {card.itemCount > 0 && card.itemCount <= 9 && "0"}
              {card.itemCount}
            </span>
          </div>

          <p className="mt-2 mb-5 line-clamp-2 text-sm text-muted-foreground tracking-wide">
            {card.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {card.tags && card.tags.length > 0 ? (
              <>
                {card.tags.slice(0, 2).map((tag, index) => (
                  <Badge
                    key={`${tag}-${index}`}
                    className="h-6.5! w-fit rounded-sm border border-foreground/10 bg-foreground/5! px-2! text-[0.7rem]! leading-none font-semibold tracking-wide text-foreground/50! capitalize"
                  >
                    {tag}
                  </Badge>
                ))}

                {card.tags.length > 2 && (
                  <Badge className="h-6.5! w-fit rounded-sm border border-foreground/10 bg-foreground/5! px-2! text-[0.7rem]! leading-none font-semibold tracking-wide text-foreground/50!">
                    +{card.tags.length - 2}
                  </Badge>
                )}
              </>
            ) : (
              card.parentCategory && (
                <span className="w-fit rounded border border-foreground/10 bg-foreground/5 px-1.5 py-1 text-[10px] leading-none text-muted-foreground">
                  {card.parentCategory}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

// ========================================================
// ==================== MAIN COMPONENT ====================
// ========================================================
export default function Components() {
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
        setDisplayedCards(cards.slice(0, PAGE_SIZE));
        setPage(1);
        setHasMore(cards.length > PAGE_SIZE);
      } catch (error) {
        console.error("Error loading components:", error);
      } finally {
        setInitialLoading(false);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);

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

  return (
    <section className="w-full">
      <header className="relative mb-5 xl:mb-10 w-full">
        <div className="hidden lg:flex items-start justify-between w-full h-45 xl:h-55">
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
          <div className="space-y-1 text-center z-30">
            <Link
              target="_blank"
              href="https://www.npmjs.com/package/venumityui"
            >
              <Badge
                variant="secondary"
                className="gap-1.5 h-8 px-2 font-bold! tracking-wider! bg-foreground/5 border-foreground/15 shadow-xl/5! rounded-sm [&>svg]:size-4! transition-all duration-500"
              >
                <Terminal className="size-3.5" />
                <span>CLI</span>
                {downloadsLoading ? (
                  <Loader2 className="size-3.5 animate-spin text-blue-500" />
                ) : (
                  <span className="text-sm font-semibold text-primary">
                    {formatCount(downloads || 0)}
                  </span>
                )}
              </Badge>
            </Link>
            <p className="text-[0.7rem] text-muted-foreground/70 font-semibold tracking-wide">
              Downloads
            </p>
          </div>
        </div>

        <h1 className="lg:absolute bottom-0 left-0 -ml-1 lg:-ml-2 pr-5 tracking-tight font-bold text-5xl md:text-7xl lg:text-[12rem] xl:text-[15rem] text-transparent bg-clip-text bg-linear-to-br from-foreground/15 via-foreground/10 to-transparent w-fit">
          Blocks
        </h1>
        <div className="hidden lg:block absolute bottom-0 left-0 bg-linear-to-t from-background via-background/30 to-transparent w-full h-full" />
        <p className="relative z-10 text-sm md:text-base text-muted-foreground max-w-2xl w-full">
          Curated collection of reusable UI components designed to help you
          build faster and more consistently. Explore and Do share your own
          blocks with the community.
        </p>
      </header>

      {initialLoading && (
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 w-full">
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
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {!initialLoading && displayedCards.length > 0 && (
        <>
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 w-full">
            {displayedCards.map((card) => (
              <CategoryCard
                key={card.id}
                card={card}
                onClick={handleCardClick}
              />
            ))}
          </section>

          <div
            ref={loaderRef}
            className="flex justify-center py-5 md:py-10 lg:pt-15 w-full"
          >
            {loadingMore && (
              <div className="flex items-center gap-3 text-primary">
                <Loader2 className="size-7 animate-spin" />
                <span className="text-sm font-semibold">
                  Loading more components...
                </span>
              </div>
            )}
            {!hasMore && displayedCards.length > 0 && (
              <p className="text-xs md:text-sm tracking-wide text-foreground/40">
                You&apos;ve reached the end of the list.
              </p>
            )}
          </div>
        </>
      )}

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
    </section>
  );
}