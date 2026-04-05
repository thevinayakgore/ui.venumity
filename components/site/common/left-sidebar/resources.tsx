// components/common/LeftSidebar/LeftResources.tsx
"use client";
import { ResourceCategory, getAllCategories } from "@/registry/resources";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
import { Boxes, ChevronsLeft, Star } from "lucide-react";
import { toKebabCase } from "@/utils/slug-kebab";
import { useResources } from "@/contexts/resources";

interface LeftResourcesProps {
  initialCategories: ResourceCategory[];
  initialCategory?: string;
}

export default function LeftResources({
  initialCategories,
}: LeftResourcesProps) {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { selectedCategory, setSelectedCategory } = useResources();

  // Extract category and slug from pathname
  const pathSegments = pathname.split("/").filter(Boolean);
  const isResourcePage =
    pathSegments[0] === "resources" && pathSegments.length === 3;
  const categorySlug = isResourcePage ? pathSegments[1] : null;
  const pageSlug = isResourcePage ? pathSegments[2] : null;

  // Use categories from props
  const categories = initialCategories;

  // Get category display data from registry
  const categoryDisplay = getAllCategories();

  // Update selected category when URL changes
  useEffect(() => {
    if (!categorySlug) return;

    const id = setTimeout(() => {
      setSelectedCategory(categorySlug);
    }, 0);

    return () => clearTimeout(id);
  }, [categorySlug, setSelectedCategory]);

  // Get current category data
  const currentCategory = categories.find(
    (cat) => cat.slug === selectedCategory,
  );

  // Handle category selection
  const handleCategorySelect = (categorySlug: string) => {
    setSelectedCategory(categorySlug);

    // If we're on a resource detail page, navigate to first page of selected category
    if (isResourcePage) {
      // Find the selected category
      const selectedCategoryData = categories.find(
        (cat) => cat.slug === categorySlug,
      );

      if (selectedCategoryData && selectedCategoryData.pages.length > 0) {
        // Find the first published page in the selected category
        const firstPage = selectedCategoryData.pages.filter(
          (p) => p.published,
        )[0];

        if (firstPage) {
          // Navigate to the first page of the selected category
          const slug = toKebabCase(firstPage.title);
          router.push(`/resources/${categorySlug}/${slug}`);
        }
      }
    }
    // If we're on main resources page, just update context (cards will update automatically)
  };

  // Helper function to get the first published page for a category
  const getFirstPublishedPageSlug = (categorySlug: string): string | null => {
    const category = categories.find((cat) => cat.slug === categorySlug);
    if (!category || category.pages.length === 0) return null;

    const publishedPages = category.pages.filter((p) => p.published);
    if (publishedPages.length === 0) return null;

    // Sort by order to get first page
    const firstPage = publishedPages[0];
    return toKebabCase(firstPage.title);
  };

  return (
    <aside className="block md:sticky top-0 z-30 bg-background overflow-auto w-full max-h-screen">
      <div
        ref={sidebarRef}
        className="flex flex-col items-start pt-16 lg:pt-24 text-[0.8rem] font-medium overflow-y-auto w-full h-full"
      >
        {/* Category List */}
        <div className="border-b w-full">
          <div className="flex items-center gap-2 pb-3 border-b border-foreground/15 text-sm font-semibold w-full">
            <Boxes className="size-4" />
            <span>Categories</span>
          </div>
          <div className="flex flex-col gap-0.5 py-2 overflow-hidden w-full">
            {categoryDisplay.map((categoryConfig) => {
              // Find the corresponding category in fetched data
              const fetchedCategory = categories.find(
                (cat) => cat.slug === categoryConfig.slug,
              );
              // Only show if category exists and has published pages
              if (
                !fetchedCategory ||
                fetchedCategory.pages.filter((p) => p.published).length === 0
              ) {
                return null;
              }

              const isActive = categoryConfig.slug === selectedCategory;
              const publishedCount =
                fetchedCategory.pages.filter((p) => p.published).length || 0;

              // Get the href for the category button
              const firstPageSlug = getFirstPublishedPageSlug(
                categoryConfig.slug,
              );

              // Determine if we should use a Link or button
              const shouldUseLink = isResourcePage && firstPageSlug;

              return shouldUseLink ? (
                <Link
                  key={categoryConfig.id}
                  href={`/resources/${categoryConfig.slug}/${firstPageSlug}`}
                  className={`flex justify-between items-center cursor-pointer truncate leading-none border-x rounded-[3px] group w-full py-2.5 pl-5 pr-2.5 text-left ${
                    isActive
                      ? "text-foreground bg-muted/60 border-primary"
                      : "text-muted-foreground/80 hover:text-foreground hover:bg-muted/60 border-transparent hover:border-primary"
                  }`}
                  onClick={() => setSelectedCategory(categoryConfig.slug)}
                >
                  <span>{categoryConfig.label}</span>
                  <span
                    className={`text-[10px] px-1 py-0.5 rounded ${
                      isActive
                        ? "bg-primary text-white"
                        : "bg-foreground/10 text-muted-foreground"
                    }`}
                  >
                    {publishedCount > 0 && publishedCount < 10
                      ? `0${publishedCount}`
                      : publishedCount}
                  </span>
                </Link>
              ) : (
                <button
                  key={categoryConfig.id}
                  onClick={() => handleCategorySelect(categoryConfig.slug)}
                  className={`flex justify-between items-center cursor-pointer truncate leading-none border-x rounded-[3px] group w-full py-2.5 pl-5 pr-2.5 text-left ${
                    isActive
                      ? "text-foreground bg-muted/60 border-primary"
                      : "text-muted-foreground/80 hover:text-foreground hover:bg-muted/60 border-transparent hover:border-primary"
                  }`}
                >
                  <span>{categoryConfig.label}</span>
                  <span
                    className={`text-[10px] px-1 py-0.5 rounded ${
                      isActive
                        ? "bg-primary text-white"
                        : "bg-foreground/10 text-muted-foreground"
                    }`}
                  >
                    {publishedCount > 0 && publishedCount < 10
                      ? `0${publishedCount}`
                      : publishedCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* All Items in Selected Category */}
        {currentCategory && currentCategory.pages.length > 0 && (
          <div className="border-b w-full">
            <div className="flex items-center gap-2 text-sm font-medium w-full py-3 border-b border-foreground/15">
              <Star className="size-4" />
              <span>
                {categoryDisplay.find((cat) => cat.slug === selectedCategory)
                  ?.label || currentCategory.name}
              </span>
            </div>
            <div className="flex flex-col gap-0.5 py-2 text-sm overflow-hidden w-full">
              {currentCategory.pages
                .filter((p) => p.published)
                .map((resource) => {
                  const slug = toKebabCase(resource.title);
                  const isActive = slug === pageSlug;
                  return (
                    <Link
                      key={resource.title}
                      href={`/resources/${currentCategory.slug}/${slug}`}
                      className={`flex items-center justify-between text-[0.8rem]  truncate font-medium leading-none border-x rounded-[3px] group w-full py-2.5 px-5 ${
                        isActive
                          ? "text-foreground bg-muted/60 border-primary"
                          : "text-muted-foreground/80 hover:text-foreground hover:bg-muted/60 border-transparent hover:border-primary"
                      } truncate`}
                    >
                      {resource.title}
                    </Link>
                  );
                })}
            </div>
          </div>
        )}

        {/* Back to All Resources (shown on resource pages only) */}
        {isResourcePage && (
          <div className="mt-3 w-full">
            <Link
              href="/resources"
              className="flex items-center justify-center gap-2 text-[11px] leading-none font-medium text-muted-foreground/80 hover:text-foreground bg-foreground/5 border hover:border-foreground/20 rounded w-full py-3 px-5 uppercase"
              onClick={() => {
                // Keep the current category selected when going back
                if (categorySlug) {
                  setSelectedCategory(categorySlug);
                }
              }}
            >
              <ChevronsLeft className="size-4" />
              <span>Back to Resources</span>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
