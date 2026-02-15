// app/components/page.tsx
"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Flame, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BadgeTextAnimate from "@/components/ui/badge-text-animate";
import { toKebabCase } from "@/utils/slug-kebab";
import { toast } from "sonner";
import { COMPONENTS } from "@/registry/components";
import {
  getSubcategoryTags,
  getSubcategoryTechs,
} from "@/registry/component-utils";

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

// LocalStorage key for saving scroll state
const SCROLL_STATE_KEY = "components-scroll-state";

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

// In app/components/page.tsx, update the getCategoryCards function:
export function getCategoryCards(): CategoryCard[] {
  const cards: CategoryCard[] = [];

  console.log("COMPONENTS data:", JSON.stringify(COMPONENTS, null, 2)); // Better debug

  COMPONENTS.forEach((category) => {
    console.log(`Processing category: ${category.name}`);

    if (category.subcategories.length > 0) {
      category.subcategories.forEach((subcategory) => {
        // Log the raw subcategory data
        console.log(`  Subcategory: ${subcategory.name}`, {
          itemsLength: subcategory.items?.length,
          items: subcategory.items?.map((i) => i.itemName),
          rawItems: subcategory.items,
        });

        // Don't filter by items.length - show all subcategories that exist
        // Just use a fallback item count
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
          subcategory.items?.[0]?.description ||
          `${itemCount} component${itemCount !== 1 ? "s" : ""} for ${subcategory.name.toLowerCase()}`;

        console.log(
          `    Adding card for: ${subcategory.name} with ${itemCount} items`,
        );

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
          thumbnail: subcategory.thumbnail,
        });
      });
    }
  });

  console.log("Final cards count:", cards.length);
  return [...cards].sort((a, b) =>
    a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
  );
}

export interface CategoryCardProps {
  card: CategoryCard;
  onClick: (path: string) => void;
}

export function CategoryCard({ card, onClick }: CategoryCardProps) {
  const [imageError, setImageError] = useState(false);

  const thumbnailPath =
    card.thumbnail || `/thumbnails/${toKebabCase(card.title)}.png`;

  return (
    <button
      onClick={() => onClick(card.path)}
      className="relative cursor-pointer text-start p-3 group bg-foreground/3 border border-foreground/5 rounded-[1.2rem] overflow-hidden hover:shadow-xl/10 transition-all duration-500 w-full h-fit"
    >
      <div className="relative flex flex-col rounded-[1.2rem] transition-all duration-500 w-full h-full">
        <div className="aspect-video relative w-full overflow-hidden rounded-xl">
          {!imageError ? (
            <Image
              src={thumbnailPath}
              alt={card.title}
              width={500}
              height={280}
              onError={() => setImageError(true)}
              className="object-cover group-hover:scale-110 transition-all duration-500 w-full h-full"
              unoptimized
            />
          ) : (
            <div className="bg-linear-to-br from-accent via-background to-background w-full h-full" />
          )}

          {/* Fallback gradient with text - always render as base, but hide when image loads successfully */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
              imageError ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative z-10 flex flex-col items-center justify-center">
              <span className="text-7xl font-bold drop-shadow-lg">
                {card.title.charAt(0)}
              </span>
              <span className="text-sm font-medium mt-2">{card.title}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 pt-6">
          <div className="flex items-start justify-between">
            <h2 className="text-xl font-medium whitespace-nowrap truncate leading-none">
              {card.title}
            </h2>
            <span className="text-xs px-2 py-1 -mt-2 rounded bg-primary/10 text-primary/80">
              {card.itemCount > 0 && card.itemCount <= 9 && "0"}
              {card.itemCount}
            </span>
          </div>

          <p className="text-xs line-clamp-2 opacity-60 my-3">
            {card.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {card.tags && card.tags.length > 0 ? (
              <>
                {card.tags.slice(0, 3).map((item, index) => (
                  <span
                    key={`${item}-${index}`}
                    className="bg-foreground/5 text-muted-foreground text-[10px] px-1.5 py-1 capitalize leading-none rounded border border-foreground/10 w-fit"
                  >
                    {item}
                  </span>
                ))}

                {card.tags.length > 3 && (
                  <span className="text-[10px] px-1.5 py-1 leading-none rounded bg-foreground/5 border border-foreground/10 text-muted-foreground w-fit">
                    +{card.tags.length - 3}
                  </span>
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
// INFINITE SCROLL LOADER COMPONENT
// ====================
interface InfiniteScrollLoaderProps {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
}

function InfiniteScrollLoader({
  hasMore,
  loading,
  onLoadMore,
}: InfiniteScrollLoaderProps) {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore && !loading) {
          onLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: "200px" },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, onLoadMore]);

  return (
    <div
      ref={observerTarget}
      className="col-span-full w-full py-8 flex justify-center"
    >
      {loading && (
        <div className="flex items-center gap-2 text-primary">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-medium">
            Loading more components...
          </span>
        </div>
      )}
    </div>
  );
}

// ====================
// PAGINATION HOOK WITH LOCALSTORAGE
// ====================
function useInfinitePagination<T extends { id: string }>(
  items: T[],
  pageSize: number = 30,
) {
  const [displayedItems, setDisplayedItems] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved state from localStorage on mount
  useEffect(() => {
    if (items.length === 0) return;

    try {
      const savedState = localStorage.getItem(SCROLL_STATE_KEY);
      if (savedState) {
        const { savedPage, savedItemIds } = JSON.parse(savedState);

        // Verify that saved items still exist in the current items list
        const validSavedItems = items.filter((item) =>
          savedItemIds.includes(item.id),
        );

        if (validSavedItems.length > 0) {
          setDisplayedItems(validSavedItems);
          setCurrentPage(savedPage);
          setHasMore(items.length > validSavedItems.length);
        } else {
          // If no valid saved items, start fresh
          setDisplayedItems(items.slice(0, pageSize));
          setCurrentPage(1);
          setHasMore(items.length > pageSize);
        }
      } else {
        // No saved state, start fresh
        setDisplayedItems(items.slice(0, pageSize));
        setCurrentPage(1);
        setHasMore(items.length > pageSize);
      }
    } catch (error) {
      console.error("Error loading scroll state:", error);
      // Fallback to fresh start
      setDisplayedItems(items.slice(0, pageSize));
      setCurrentPage(1);
      setHasMore(items.length > pageSize);
    } finally {
      setIsInitialized(true);
    }
  }, [items, pageSize]);

  // Save state to localStorage whenever displayed items change
  useEffect(() => {
    if (isInitialized && displayedItems.length > 0) {
      try {
        localStorage.setItem(
          SCROLL_STATE_KEY,
          JSON.stringify({
            savedPage: currentPage,
            savedItemIds: displayedItems.map((item) => item.id),
            timestamp: Date.now(),
          }),
        );
      } catch (error) {
        console.error("Error saving scroll state:", error);
      }
    }
  }, [displayedItems, currentPage, isInitialized]);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingMore || !isInitialized) return;

    setIsLoadingMore(true);

    // Simulate network delay for smooth UX
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = currentPage * pageSize;
      const endIndex = startIndex + pageSize;
      const nextItems = items.slice(startIndex, endIndex);

      if (nextItems.length > 0) {
        setDisplayedItems((prev) => [...prev, ...nextItems]);
        setCurrentPage(nextPage);
        setHasMore(endIndex < items.length);
      } else {
        setHasMore(false);
      }

      setIsLoadingMore(false);
    }, 800);
  }, [currentPage, hasMore, isLoadingMore, items, pageSize, isInitialized]);

  // Clear localStorage when all items are displayed (optional)
  const resetPagination = useCallback(() => {
    localStorage.removeItem(SCROLL_STATE_KEY);
    setDisplayedItems(items.slice(0, pageSize));
    setCurrentPage(1);
    setHasMore(items.length > pageSize);
    setIsLoadingMore(false);
  }, [items, pageSize]);

  return {
    displayedItems,
    hasMore,
    isLoadingMore,
    loadMore,
    totalItems: items.length,
    currentPage,
    isInitialized,
    resetPagination,
  };
}

// ====================
// MAIN COMPONENT
// ====================
export default function Components() {
  const router = useRouter();
  const [categoryCards, setCategoryCards] = useState<CategoryCard[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize infinite scroll with 30 cards per page
  const {
    displayedItems,
    hasMore,
    isLoadingMore,
    loadMore,
    totalItems,
    isInitialized,
  } = useInfinitePagination(categoryCards, 30);

  // Load all cards on mount
  // In the main Components function, update the useEffect :
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const cards = getCategoryCards();

        // TEMPORARY: Clear localStorage to reset pagination
        localStorage.removeItem(SCROLL_STATE_KEY);

        setCategoryCards(cards);
      } catch (error) {
        console.error("Error loading components:", error);
        toast.error("Error loading components");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleCardClick = (path: string) => {
    router.push(`/components${path}`);
  };

  // Calculate loading progress
  const progressPercentage =
    totalItems > 0
      ? Math.min(Math.round((displayedItems.length / totalItems) * 100), 100)
      : 0;

  return (
    <main className="w-full h-full">
      <header className="mb-8 pb-6 border-b w-full">
        <Badge
          variant="secondary"
          className="flex items-center mb-5.5 h-8 px-2 text-xs! leading-none font-medium uppercase bg-foreground/5 border-foreground/10 shadow-xl/5! rounded"
        >
          <Flame className="size-3.5! mr-0.5" />
          <BadgeTextAnimate
            leftWords={LEFT_WORDS}
            rightWords={RIGHT_WORDS}
            interval={4000}
          />
        </Badge>

        <h1 className="text-3xl md:text-6xl orbitron uppercase font-extrabold bg-clip-text text-transparent bg-linear-to-b from-foreground to-background opacity-30 leading-none">
          Components
        </h1>

        <p className="text-base md:text-lg font-normal bg-clip-text text-transparent bg-linear-to-l from-foreground/15 via-foreground/70 to-foreground/15 w-full mt-2">
          A curated collection of reusable UI components designed to help you
          build faster and more consistently. From core building blocks to
          advanced patterns, everything you need to craft modern interfaces in
          one place.
        </p>

        {/* Mobile progress indicator */}
        {!loading && categoryCards.length > 0 && (
          <div className="flex md:hidden items-center gap-2 mt-3">
            <div className="flex-1 h-1 bg-foreground/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {displayedItems.length}/{totalItems}
            </span>
          </div>
        )}
      </header>

      {/* Loading State - Initial Load */}
      {loading && (
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
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

      {/* Cards Grid - With Infinite Scroll */}
      {!loading && categoryCards.length > 0 && (
        <>
          <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-20 w-full">
            {displayedItems.map((card) => (
              <CategoryCard
                key={card.id}
                card={card}
                onClick={handleCardClick}
              />
            ))}
          </section>

          {/* Infinite Scroll Loader - Only show if initialized and has more */}
          {isInitialized && hasMore && (
            <InfiniteScrollLoader
              hasMore={hasMore}
              loading={isLoadingMore}
              onLoadMore={loadMore}
            />
          )}
        </>
      )}

      {/* Empty State */}
      {!loading && categoryCards.length === 0 && (
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
