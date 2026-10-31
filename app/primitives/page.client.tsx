// app/primitives/page.client.tsx
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Boxes, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PRIMITIVES } from "@/registry/primitives";
import type { PrimitiveSubcategory } from "@/types/primitives";
import { useEffect, useState, useRef, useCallback } from "react";
import BadgeTextAnimate from "@/components/ui/badge-text-animate";
import { getThumbnailCandidates } from "@/registry/registry-utils";

const LEFT_WORDS = ["UI", "React", "Build", "Ship", "Design", "Code"];
const RIGHT_WORDS = ["Primitives", "Blocks", "Basics", "Atoms", "Bits"];

const PAGE_SIZE = 30;

// ─────────────────────────────────────────────────────────────
// Card data shape — mirrors CategoryCard on the components page
// ─────────────────────────────────────────────────────────────
export interface PrimitiveCard {
  id: string;
  path: string;
  title: string;
  tags: string[];
  itemCount: number;
  description: string;
  parentCategory?: string;
  thumbnailCandidates: string[];
  type: "subcategory";
}

// ─────────────────────────────────────────────────────────────
// Build the full card list — same shape as getCategoryCards()
// ─────────────────────────────────────────────────────────────
export function getPrimitiveCards(): PrimitiveCard[] {
  const cards: PrimitiveCard[] = [];

  PRIMITIVES.forEach((category) => {
    category.subcategories.forEach((subcategory: PrimitiveSubcategory) => {
      const itemCount = subcategory.items?.length || 0;
      if (itemCount === 0) return;

      const path = `/primitives/${category.slug}/${subcategory.slug}`;
      const description =
        subcategory.description ||
        `${itemCount} primitive${itemCount !== 1 ? "s" : ""} for ${subcategory.name.toLowerCase()}`;

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

// ─────────────────────────────────────────────────────────────
// Card
// ─────────────────────────────────────────────────────────────
function PrimitiveCardView({
  card,
  onClick,
}: {
  card: PrimitiveCard;
  onClick: (path: string) => void;
}) {
  const [candidateIndex, setCandidateIndex] = useState(0);

  const currentThumbnail = card.thumbnailCandidates[candidateIndex];
  const hasNoMoreImages = candidateIndex >= card.thumbnailCandidates.length;

  // Reset candidate index when the card changes
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
      className="relative cursor-pointer text-start p-0.5 group border-2 hover:border-primary rounded-4xl overflow-hidden transition-all w-full h-fit"
    >
      <div className="relative flex flex-col p-1 bg-accent dark:bg-card rounded-3xl overflow-hidden w-full h-full">
        <div className="aspect-square border relative w-full max-h-70 overflow-hidden rounded-[1.3rem] transition-all duration-500">
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
              className="object-cover group-hover:scale-110 transition-all duration-500 w-full h-full"
            />
          ) : (
            <div className="bg-background w-full h-full" />
          )}

          {/* Letter-avatar fallback overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center group-hover:scale-120 transition-all duration-500 ${
              showFallback ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="relative z-10 flex flex-col items-center justify-center">
              <span className="text-4xl md:text-6xl lg:text-8xl font-bold">
                {card.title.charAt(0)}
              </span>
              <span className="text-sm mt-2">{card.title}</span>
            </div>
          </div>
        </div>

        <div className="p-4 pt-5">
          <div className="flex items-start justify-between font-medium">
            <h2 className="text-xl whitespace-nowrap truncate">{card.title}</h2>
            <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary/80">
              {card.itemCount > 0 && card.itemCount <= 9 && "0"}
              {card.itemCount}
            </span>
          </div>

          <p className="text-sm tracking-wide line-clamp-2 text-muted-foreground mt-2 mb-5">
            {card.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {card.tags && card.tags.length > 0 ? (
              <>
                {card.tags.slice(0, 2).map((tag, i) => (
                  <Badge
                    key={`${tag}-${i}`}
                    className="bg-foreground/5! text-foreground/50! capitalize font-semibold tracking-wide px-2! h-6.5! leading-none rounded-sm border border-foreground/10 w-fit"
                  >
                    {tag}
                  </Badge>
                ))}

                {card.tags.length > 2 && (
                  <Badge className="bg-foreground/5! text-foreground/50! font-semibold tracking-wide px-2! h-6.5! leading-none rounded-sm border border-foreground/10 w-fit">
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
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────
export default function Primitives() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [allCards, setAllCards] = useState<PrimitiveCard[]>([]);
  const [displayedCards, setDisplayedCards] = useState<PrimitiveCard[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const cards = getPrimitiveCards();
        setAllCards(cards);
        setDisplayedCards(cards.slice(0, PAGE_SIZE));
        setPage(1);
        setHasMore(cards.length > PAGE_SIZE);
      } catch (e) {
        console.error("Error loading primitives:", e);
      } finally {
        setInitialLoading(false);
      }
    }, 800);
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
    }, 400);
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
    const el = loaderRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasMore, loadingMore, loadMore]);

  const handleCardClick = (path: string) => router.push(path);

  return (
    <section className="w-full">
      <header className="relative mb-5 xl:mb-10 w-full">
        <div className="hidden lg:flex items-start justify-between w-full h-45 xl:h-55">
          <Badge
            variant="secondary"
            className="gap-1.5 h-8 pl-2 pr-3 font-semibold! tracking-wider! bg-foreground/5 border-foreground/10 shadow-xl/5! rounded-sm [&>svg]:size-4!"
          >
            <Boxes />
            <BadgeTextAnimate
              leftWords={LEFT_WORDS}
              rightWords={RIGHT_WORDS}
              interval={4000}
            />
          </Badge>
        </div>

        <h1 className="lg:absolute bottom-0 left-0 -ml-1 lg:-ml-2 pr-5 tracking-tight font-bold text-5xl md:text-7xl lg:text-[12rem] xl:text-[15rem] text-transparent bg-clip-text bg-linear-to-br from-foreground/15 via-foreground/10 to-transparent">
          Miniers
        </h1>
        <div className="hidden lg:block absolute bottom-0 left-0 bg-linear-to-t from-background via-background/30 to-transparent w-full h-full" />
        <p className="relative z-10 text-sm md:text-base text-muted-foreground max-w-2xl w-full">
          Fundamental primitives like buttons, badges, inputs, and more. Copy
          and paste into your project. Explore and Do share your own blocks with
          the community.
        </p>
      </header>

      {initialLoading && (
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 w-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-3 bg-foreground/3 border border-foreground/5 rounded-[1.2rem] w-full h-fit animate-pulse"
            >
              <div className="aspect-square w-full bg-foreground/5 rounded-xl mb-3" />
              <div className="h-5 w-1/2 bg-foreground/5 rounded mb-2" />
              <div className="h-4 w-full bg-foreground/5 rounded" />
            </div>
          ))}
        </section>
      )}

      {!initialLoading && displayedCards.length > 0 && (
        <>
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 w-full">
            {displayedCards.map((card) => (
              <PrimitiveCardView
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
                <span className="text-sm font-semibold">Loading more...</span>
              </div>
            )}
            {!hasMore && (
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
            <Boxes className="size-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">No primitives found</h3>
          <p className="text-base text-muted-foreground max-w-md">
            Primitives will appear here once added.
          </p>
        </div>
      )}
    </section>
  );
}
