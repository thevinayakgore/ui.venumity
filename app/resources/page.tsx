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
    <main className="flex flex-col items-start justify-start m-auto w-full min-h-screen">
      {/* Header - Only show on main page */}
      {isMainPage && (
        <header className="mb-8 pb-5 border-b w-full">
          <Badge
            variant="secondary"
            className="gap-1.5 h-8 pl-2 pr-3 mb-5 font-semibold! tracking-wider! bg-foreground/5 border-foreground/10 shadow-xl/5! rounded-sm [&>svg]:size-4!"
          >
            <ScrollText />
            <BadgeTextAnimate
              leftWords={LEFT_WORDS}
              rightWords={RIGHT_WORDS}
              interval={4000}
            />
          </Badge>
          <h1 className="satisfy text-5xl md:text-7xl py-3 tracking-tight text-transparent bg-clip-text bg-linear-to-b from-foreground/30 via-foreground/10">
            Resources
          </h1>

          <p className="text-sm md:text-base tracking-wide opacity-40 w-full">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
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
  // Use page.description if available, otherwise use fallbackDescription
  const description = page.description || fallbackDescription;
  const slug = toKebabCase(page.title);

  return (
    <Link
      href={`/resources/${categorySlug}/${slug}`}
      className="flex flex-col items-start cursor-pointer group relative rounded-3xl p-2 bg-foreground/3 hover:shadow-xl/10 overflow-hidden transition-all duration-500 w-full h-fit"
    >
      <div className="relative flex items-center justify-center m-auto shadow-xl/15 rounded-2xl overflow-hidden duration-[1.5s] w-full h-full">
        <Image
          src={page.coverImage || "/card.png"}
          alt={page.title}
          width={2000}
          height={2000}
          loading="eager"
          className="object-cover rounded-sm group-hover:scale-110 transition-all duration-500 w-full"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.src = "/card.png";
          }}
        />
        <span className="absolute bottom-0 left-0 opacity-10 group-hover:opacity-30 bg-linear-to-l from-transparent via-primary to-transparent transition-all duration-[1.5s] w-full h-px" />
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-10 opacity-10 group-hover:opacity-100 bg-linear-to-l from-transparent via-primary to-transparent blur-lg rounded-full transition-all duration-[1.5s] w-full h-3" />
      </div>
      <div className="flex flex-col items-start text-start gap-0.5 pt-4! p-3 group-hover:border-transparent w-full">
        <h3 className="text-base tracking-wide font-semibold">{page.title}</h3>
        <p className="text-sm text-foreground/40 tracking-wide line-clamp-2">
          {description}
        </p>
        <div className="flex flex-wrap gap-1 mt-2 font-semibold!">
          {(page.tags || []).slice(0, 2).map((tag: string) => (
            <span
              key={tag}
              className="flex items-center text-xs px-2.5 h-6 bg-foreground/5 text-foreground/70 capitalize border rounded-full"
            >
              {tag}
            </span>
          ))}
          {page.tags && page.tags.length > 2 && (
            <span className="flex items-center text-xs px-2.5 h-6 bg-foreground/5 text-foreground/70 capitalize border rounded-full">
              +{(page.tags || []).length - 2}
            </span>
          )}
        </div>
        {page.authorNames && page.authorNames.length > 0 && (
          <div className="flex items-center gap-3 p-1.5 bg-foreground/5 backdrop-blur-sm rounded-full mt-3 overflow-auto min-w-fit max-w-full">
            {page.authorNames.map((item, idx) => (
              <div
                key={item ?? idx}
                className="size-7 rounded-full overflow-hidden shrink-0"
              >
                <Image
                  src={`https://github.com/${item}.png`}
                  alt={item}
                  width={500}
                  height={500}
                  priority
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
