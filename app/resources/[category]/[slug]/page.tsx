import { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getAllResources } from "@/registry/resources";
import { toKebabCase } from "@/utils/slug-kebab";
import { readFileSync, existsSync, statSync } from "fs";
import { join } from "path";
import { ChevronLeft, ChevronRight, Wrench } from "lucide-react";
import { website } from "@/lib/brand";
import { MarkdownRenderer } from "@/components/site/common/markdown-renderer";
import { formatDate } from "@/utils/format-date"; // Import from utils
import { Button } from "@/components/ui/button";

// Helper function to find resource by slug
function findResourceBySlug(categorySlug: string, pageSlug: string) {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return null;

  // Find page by matching slug
  const page = category.pages.find(
    (page) => toKebabCase(page.title) === pageSlug && page.published,
  );

  return page || null;
}

// Helper function to read markdown content and get last modified time
function readMarkdownContent(contentPath: string): {
  content: string | null;
  lastModified: Date | null;
} {
  try {
    // Content paths are relative from project root
    const fullPath = join(process.cwd(), contentPath);

    if (!existsSync(fullPath)) {
      console.error("Markdown file not found:", fullPath);
      return { content: null, lastModified: null };
    }

    // Get file stats to get last modified time
    const stats = statSync(fullPath);
    const content = readFileSync(fullPath, "utf-8");

    return {
      content,
      lastModified: stats.mtime,
    };
  } catch (error) {
    console.error("Error reading markdown file:", error);
    return { content: null, lastModified: null };
  }
}

export async function generateStaticParams() {
  const categories = getAllResources();
  const params: { category: string; slug: string }[] = [];

  categories.forEach((category) => {
    category.pages.forEach((page) => {
      if (page.published) {
        params.push({
          category: category.slug,
          slug: toKebabCase(page.title),
        });
      }
    });
  });

  return params;
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const page = findResourceBySlug(category, slug);

  if (!page) {
    return {
      title: "Resource Not Found",
      description: "The requested resource was not found.",
    };
  }

  const seoTitle = `${page.title} - ${category.charAt(0).toUpperCase() + category.slice(1)}`;
  const seoDescription = page.description || `Learn more about ${page.title}`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: page.tags,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "article",
      url: `${website}/resources/${category}/${slug}`,
      images: [
        {
          url: page.coverImage || "/logo.png",
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [page.coverImage || "/logo.png"],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// Server component for the resource page
export default async function ResourcePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const categoryData = getCategoryBySlug(category);

  if (!categoryData) {
    notFound();
  }

  const pages = categoryData.pages.filter((p) => p.published);
  const currentIndex = pages.findIndex(
    (page) => toKebabCase(page.title) === slug,
  );

  if (currentIndex === -1) {
    notFound();
  }

  const page = pages[currentIndex];

  // Previous logic remains unchanged
  const prevPage = currentIndex > 0 ? pages[currentIndex - 1] : null;

  // Next logic: handle category boundaries
  let nextPage = null;
  let nextCategorySlug = category;
  let nextPageSlug = null;
  if (currentIndex < pages.length - 1) {
    // There is a next page in the current category
    nextPage = pages[currentIndex + 1];
    nextCategorySlug = category;
    nextPageSlug = toKebabCase(nextPage.title);
  } else {
    // At the last page of this category, look for first page of next category
    const allCategories = getAllResources();
    const currentCatIndex = allCategories.findIndex(
      (cat) => cat.slug === category,
    );
    if (currentCatIndex !== -1 && currentCatIndex < allCategories.length - 1) {
      // There is a next category
      const nextCat = allCategories[currentCatIndex + 1];
      const nextCatPages = (nextCat.pages || []).filter((p) => p.published);
      if (nextCatPages.length > 0) {
        nextPage = nextCatPages[0];
        nextCategorySlug = nextCat.slug;
        nextPageSlug = toKebabCase(nextPage.title);
      }
    }
    // If no next category or no published page, nextPage remains null
  }

  // Read markdown content and get last modified time
  const { content: markdownContent, lastModified } = readMarkdownContent(
    page.contentPath,
  );

  // Format the last modified date
  const formattedLastUpdated = lastModified ? formatDate(lastModified) : "";

  return (
    <section className="relative z-10 bg-background flex flex-col items-start justify-start m-auto overflow-auto w-full h-full">
      {markdownContent ? (
        <div className="w-full h-full">
          <MarkdownRenderer
            content={markdownContent}
            title={page.title}
            tags={page.tags}
            officialUrl={page.officialUrl}
            lastUpdated={formattedLastUpdated} // Pass formatted date string
          />
          {/* Navigation buttons */}
          <div className="flex items-center justify-between font-medium pt-10 border-t border-foreground/10 w-full">
            <form
              action={
                prevPage
                  ? `/resources/${category}/${toKebabCase(prevPage.title)}`
                  : ""
              }
              method="get"
              className="w-full"
            >
              <Button
                type="submit"
                variant="outline"
                size="lg"
                disabled={!prevPage}
                className={`relative cursor-pointer inline-flex flex-col items-end group rounded-sm border-foreground/10! hover:border-foreground/30 hover:shadow-none! bg-background! w-full md:w-2/3 hover:w-full h-24! transition-all duration-500
              ${
                prevPage
                  ? "border-border hover:bg-muted"
                  : "border-border text-muted-foreground"
              }`}
              >
                <span className="pl-5 text-muted-foreground group-hover:text-foreground transition-all duration-500">
                  Previous
                </span>
                <span className="flex items-center text-lg group-hover:text-primary leading-none transition-all duration-500">
                  <ChevronLeft className="absolute bottom-5 left-4 size-7! text-muted-foreground/40 group-hover:text-foreground transition-all duration-500" />
                  <span>{prevPage ? prevPage.title : "None"}</span>
                </span>
              </Button>
            </form>

            <form
              action={
                nextPage ? `/resources/${nextCategorySlug}/${nextPageSlug}` : ""
              }
              method="get"
              className="text-end ml-4 w-full"
            >
              <Button
                type="submit"
                variant="outline"
                size="lg"
                disabled={!nextPage}
                className={`relative cursor-pointer inline-flex flex-col items-start group rounded-sm border-foreground/10! hover:border-foreground/30 hover:shadow-none! bg-background! w-full md:w-2/3 hover:w-full h-24! transition-all duration-500
              ${
                nextPage
                  ? "border-border hover:bg-muted"
                  : "border-border text-muted-foreground"
              }`}
              >
                <span className="pr-5 text-muted-foreground group-hover:text-foreground transition-all duration-500">
                  Next
                </span>
                <span className="flex items-center text-lg group-hover:text-primary leading-none transition-all duration-500">
                  <span>{nextPage ? nextPage.title : "None"}</span>
                  <ChevronRight className="absolute bottom-5 right-4 size-7! text-muted-foreground/40 group-hover:text-foreground transition-all duration-500" />
                </span>
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <h1 className="orbitron -mt-1.5 text-4xl md:text-[2.8rem] font-extrabold uppercase text-transparent bg-clip-text bg-linear-to-b from-foreground leading-none! opacity-50">
            {page.title}
          </h1>
          <div className="mt-6 prose prose-gray dark:prose-invert max-w-none w-full">
            <div className="mb-4">
              <p className="text-lg text-muted-foreground">
                {page.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {(page.tags || []).map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs lowercase font-light text-blue-500"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* No content available */}
            <div className="mt-8 w-full">
              <div className="p-4 border border-foreground/20 bg-foreground/5 rounded-lg w-full">
                <div className="flex flex-col items-center justify-center text-center py-8 w-full">
                  <div className="mb-4 w-full">
                    <div className="size-16 mx-auto flex items-center justify-center rounded-full bg-yellow-500/10 border border-yellow-500/20">
                      <Wrench className="text-yellow-400 w-1/2 h-1/2" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    No Content Available Yet !
                  </h3>
                  <p className="text-muted-foreground mb-4 max-w-md">
                    We are working on creating amazing content for this
                    resource. Check back soon for comprehensive guides,
                    tutorials, and examples.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
