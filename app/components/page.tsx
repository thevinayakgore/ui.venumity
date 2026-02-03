"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BadgeTextAnimate from "@/components/ui/badge-text-animate";
import { toKebabCase } from "@/utils/slug-kebab";
import { toast } from "sonner";
import {
  COMPONENTS,
  getSubcategoryTags,
  getSubcategoryTechs,
} from "@/registry/components";

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

// Export the CategoryCard interface
export interface CategoryCard {
  id: string;
  title: string;
  description: string;
  type: "category" | "subcategory";
  parentCategory?: string;
  path: string;
  itemCount: number;
  tags: string[];
  techs?: string[];
}

// Export the card generator function
export function getCategoryCards(): CategoryCard[] {
  const cards: CategoryCard[] = [];

  COMPONENTS.forEach((category) => {
    if (category.subcategories.length > 0) {
      category.subcategories.forEach((subcategory) => {
        if (subcategory.items.length > 0) {
          const path = `/${toKebabCase(category.name)}/${toKebabCase(subcategory.name)}`;

          const allTags = getSubcategoryTags(
            toKebabCase(category.name),
            toKebabCase(subcategory.name),
          );

          const allTechs = getSubcategoryTechs(
            toKebabCase(category.name),
            toKebabCase(subcategory.name),
          );

          const description =
            subcategory.description ||
            subcategory.items[0]?.description ||
            `${subcategory.items.length} component${subcategory.items.length !== 1 ? "s" : ""} for ${subcategory.name.toLowerCase()}`;

          cards.push({
            id: `${category.name}-${subcategory.name}`,
            title: subcategory.name,
            description: description,
            type: "subcategory",
            parentCategory: category.name,
            path: path,
            itemCount: subcategory.items.length,
            tags: allTags,
            techs: allTechs,
          });
        }
      });
    }
  });

  return [...cards].sort((a, b) => a.title.localeCompare(b.title));
}

// Export CategoryCardProps interface
export interface CategoryCardProps {
  card: CategoryCard;
  onClick: (path: string) => void;
}

// Export the original CategoryCard component (EXACTLY AS IS)
export function CategoryCard({ card, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={() => onClick(card.path)}
      className="cursor-pointer transition-all duration-300 text-start group p-3 bg-foreground/3 border border-foreground/10 rounded-xl overflow-hidden w-full h-fit"
    >
      <div className="relative flex flex-col p-4 bg-background border rounded-md w-full h-full">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-normal whitespace-nowrap truncate leading-none">
            {card.title}
          </h2>
          <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
            {card.itemCount > 0 && card.itemCount <= 9 && "0"}
            {card.itemCount}
          </span>
        </div>

        <p className="text-xs line-clamp-2 opacity-60 mt-3">
          {card.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {/* Show tags and techs */}
          {[...(card.tags || [])].length > 0 ? (
            <>
              {/* Display first 4 items (tags + techs) */}
              {[...(card.tags || [])].slice(0, 3).map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="bg-foreground/5 text-muted-foreground text-[10px] px-1.5 py-1 capitalize leading-none rounded border border-foreground/10 w-fit"
                >
                  {item}
                </span>
              ))}

              {/* Show +X badge if there are more than 4 items */}
              {[...(card.tags || [])].length > 3 && (
                <span className="text-[10px] px-1.5 py-1 leading-none rounded bg-foreground/5 border border-foreground/10 text-muted-foreground w-fit">
                  +{[...(card.tags || [])].length - 3}
                </span>
              )}
            </>
          ) : (
            // Fallback if no tags/techs but has parent category
            card.parentCategory && (
              <span className="text-[10px] px-1.5 py-1 leading-none rounded bg-foreground/5 border border-foreground/10 text-muted-foreground w-fit">
                {card.parentCategory}
              </span>
            )
          )}
        </div>

        <div className="absolute bottom-0 left-0 opacity-0 group-hover:opacity-70 bg-linear-to-l from-transparent via-primary to-transparent transition-all duration-500 h-px w-full" />
        <div className="absolute -bottom-1 left-0 blur-sm opacity-0 group-hover:opacity-60 bg-linear-to-l from-transparent via-primary to-transparent transition-all duration-500 h-2 w-full" />
      </div>
    </button>
  );
}

// Main component remains the same
export default function Components() {
  const router = useRouter();
  const [categoryCards, setCategoryCards] = useState<CategoryCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const cards = getCategoryCards();
        setCategoryCards(cards);
      } catch (error) {
        console.error("Error loading components:", error);
        toast.error("Error loading components: " + error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleCardClick = (path: string) => {
    router.push(`/components${path}`);
  };

  return (
    <main className="w-full h-full">
      <header className="mb-8 pb-6 border-b w-full">
        <Badge
          variant="secondary"
          className="flex items-center mb-5.5 h-8 px-2 text-xs! leading-none  font-medium uppercase bg-foreground/5 border-foreground/10 shadow-xl/5! rounded"
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
        <p className="text-base md:text-lg  font-normal bg-clip-text text-transparent bg-linear-to-l from-foreground/15 via-foreground/70 to-foreground/15 w-full">
          A curated collection of reusable UI components designed to help you
          build faster and more consistently. From core building blocks to
          advanced patterns, everything you need to craft modern interfaces in
          one place.
        </p>
      </header>

      {/* Loading State */}
      {loading && (
        <section className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4 w-full">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="p-3 bg-foreground/3 border border-foreground/10 rounded-xl overflow-hidden w-full h-fit animate-pulse"
            >
              <div className="space-y-3 p-4 bg-background border rounded-md w-full h-full">
                <div className="flex justify-between items-start">
                  <div className="h-5 w-1/2 bg-foreground/10 rounded"></div>
                  <div className="h-6 w-8 bg-foreground/10 rounded"></div>
                </div>
                <div className="h-4 w-full bg-foreground/10 rounded"></div>
                <div className="h-4 w-3/4 bg-foreground/10 rounded"></div>
                <div className="flex gap-1.5">
                  <div className="h-5 w-12 bg-foreground/10 rounded"></div>
                  <div className="h-5 w-10 bg-foreground/10 rounded"></div>
                  <div className="h-5 w-8 bg-foreground/10 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Cards Grid */}
      {!loading && categoryCards.length > 0 && (
        <section className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4 w-full">
          {categoryCards.map((card) => (
            <CategoryCard key={card.id} card={card} onClick={handleCardClick} />
          ))}
        </section>
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
