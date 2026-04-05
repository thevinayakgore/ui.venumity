// app/resources/page.tsx
"use client";
import { Badge } from "@/components/ui/badge";
import { ScrollText } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import BadgeTextAnimate from "@/components/ui/badge-text-animate";
import { toKebabCase } from "@/utils/slug-kebab";
import {
  getAllResources,
  getAllCategories,
  ResourcePage,
} from "@/registry/resources";
import { useResources } from "@/contexts/resources";

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

export default function Resources() {
  const pathname = usePathname();
  const { selectedCategory } = useResources();

  // Get categories from registry
  const categories = getAllResources();
  const categoryDisplay = getAllCategories();

  // Get selected category data
  const selectedCategoryData = categories.find(
    (cat) => cat.slug === selectedCategory,
  );

  // Get all published pages for the selected category
  const publishedPages =
    selectedCategoryData?.pages?.filter((p) => p.published) || [];

  // Get category description from registry
  const getCategoryDescription = (categorySlug: string) => {
    const category = categoryDisplay.find((cat) => cat.slug === categorySlug);
    return category?.description || "Resource guide and documentation.";
  };

  // Check if we're on the main resources page
  const isMainPage = pathname === "/resources";

  return (
    <main className="flex flex-col items-start justify-start m-auto min-h-150 w-full">
      {/* Header - Only show on main page */}
      {isMainPage && (
        <header className="mb-8 pb-5 border-b w-full">
          <Badge
            variant="secondary"
            className="flex items-center gap-2 mb-5.5 h-8 px-2 text-sm! leading-none  font-medium capitalize bg-foreground/5 border-foreground/10 shadow-xl/5! rounded"
          >
            <ScrollText className="size-4!" />
            <BadgeTextAnimate
              leftWords={LEFT_WORDS}
              rightWords={RIGHT_WORDS}
              interval={4000}
            />
          </Badge>
          <h1 className="text-2xl md:text-4xl orbitron uppercase font-extrabold bg-clip-text text-transparent bg-linear-to-b from-foreground to-background opacity-30 leading-none">
            Resources
          </h1>
          <p className="text-sm md:text-base font-normal bg-clip-text text-transparent bg-linear-to-l from-foreground/15 via-foreground/70 to-foreground/15 w-full">
            Curated guides, libraries, and references to help you build faster
            with modern tools. From frameworks and animations to patterns and
            cheatsheets, everything in one place.
          </p>
        </header>
      )}

      {/* Category Content */}
      <section className="w-full">
        {publishedPages.length > 0 ? (
          // Cards Grid for selected category
          <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4 w-full">
            {publishedPages.map((page) => (
              <ResourceCard
                key={page.title}
                page={page}
                categorySlug={selectedCategory}
                fallbackDescription={getCategoryDescription(selectedCategory)}
              />
            ))}
          </div>
        ) : (
          // No content message
          <div className="col-span-full text-center py-16 h-fit">
            <p className="text-muted-foreground">
              No resources available in this category yet.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

// ResourceCard component
interface ResourceCardProps {
  page: ResourcePage;
  categorySlug: string;
  fallbackDescription: string;
}

function ResourceCard({
  page,
  categorySlug,
  fallbackDescription,
}: ResourceCardProps) {
  // Use page.description if available, otherwise use fallbackDescription
  const description = page.description || fallbackDescription;
  const slug = toKebabCase(page.title);

  return (
    <Link
      href={`/resources/${categorySlug}/${slug}`}
      className="flex flex-col items-start cursor-pointer group relative rounded-t-xl rounded-b-lg p-1 border border-foreground/5 bg-foreground/3 overflow-hidden transition-all duration-500 w-full h-fit"
    >
      <div className="relative flex items-center justify-center m-auto p-7 md:p-10 xl:p-15 bg-background rounded-[0.8rem] overflow-hidden duration-[1.5s] w-full h-full">
        <Image
          src={page.coverImage || "/card.png"}
          alt={page.title}
          width={2000}
          height={2000}
          className="rounded-sm w-1/2 h-auto"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.src = "/card.png";
          }}
        />
        <span className="absolute bottom-0 left-0 opacity-10 group-hover:opacity-30 bg-linear-to-l from-transparent via-primary to-transparent transition-all duration-[1.5s] w-full h-px" />
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-10 opacity-10 group-hover:opacity-100 bg-linear-to-l from-transparent via-primary to-transparent blur-lg rounded-full transition-all duration-[1.5s] w-full h-3" />
      </div>
      <div className="flex flex-col items-start text-start gap-0.5 py-3 px-2 group-hover:border-transparent font-normal w-full">
        <h3 className="text-lg uppercase font-semibold">{page.title}</h3>
        <p className="text-sm leading-5 text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="flex flex-wrap gap-1 mt-2">
          {(page.tags || []).slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-foreground/5 border rounded"
            >
              {tag}
            </span>
          ))}
          {page.tags && page.tags.length > 3 && (
            <span className="text-xs px-2 py-0.5 bg-foreground/5 border rounded">
              +{(page.tags || []).length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
