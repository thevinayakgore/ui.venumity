import { Metadata } from "next";
import { notFound } from "next/navigation";
import { brandName, website } from "@/lib/brand";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DOCS_DATA,
  getPageBySlug,
  getPageNavigation,
} from "@/registry/site/docs";
import { COMPONENTS } from "@/registry/components";
import { readFileSync, existsSync, statSync } from "fs";
import { join } from "path";
import { MarkdownRenderer } from "@/components/common/markdown-renderer";
import { formatDate } from "@/utils/format-date"; // Import from utils

// Helper function to read markdown content and get last modified time
function readDocsMarkdownContent(contentPath: string): {
  content: string | null;
  lastModified: Date | null;
} {
  try {
    // Content paths are relative from project root
    const fullPath = join(process.cwd(), contentPath);

    if (!existsSync(fullPath)) {
      console.error("Docs markdown file not found:", fullPath);
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
    console.error("Error reading docs markdown file:", error);
    return { content: null, lastModified: null };
  }
}

// Get first component subcategory for "Get Started" button
function getFirstComponent() {
  if (COMPONENTS.length > 0 && COMPONENTS[0].subcategories.length > 0) {
    const firstCategory = COMPONENTS[0];
    const firstSubcategory = firstCategory.subcategories[0];

    return {
      title: firstSubcategory.name,
      slug: `/components/${firstCategory.name.toLowerCase()}/${firstSubcategory.name.toLowerCase()}`,
    };
  }
  return null;
}

// Generate static paths
export async function generateStaticParams() {
  const slugs: { slug: string }[] = [];

  DOCS_DATA.forEach((section) => {
    section.pages.forEach((page) => {
      if (page.published !== false) {
        slugs.push({ slug: page.slug });
      }
    });
  });

  return slugs;
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    return {
      title: `Document Not Found / ${brandName}`,
      description: "The requested documentation page was not found.",
    };
  }

  // Read content for description
  const { content } = readDocsMarkdownContent(page.contentPath);
  const firstParagraph =
    content?.split("\n\n")[1] || `Learn more about ${page.page} documentation.`;
  const description = firstParagraph.substring(0, 160).replace(/[#`*]/g, "");

  const title = `${page.page} - ${brandName}`;

  return {
    title: title,
    description: description,
    keywords: page.tags,
    openGraph: {
      title: title,
      description: description,
      type: "article",
      url: `${website}/docs/${slug}`,
      images: [
        {
          url: "/logo.jpg",
          width: 1200,
          height: 630,
          alt: page.page,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: ["/logo.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const { prevPage, nextPage } = getPageNavigation(slug);
  const firstComponent = getFirstComponent();
  const isLastPage = !nextPage;

  // Read markdown content and get last modified time
  const { content: markdownContent, lastModified } = readDocsMarkdownContent(
    page.contentPath,
  );

  // Fallback content if markdown file doesn't exist
  const content = markdownContent || `# ${page.page}\n\nContent coming soon.`;

  // Format the last modified date
  const formattedLastUpdated = lastModified ? formatDate(lastModified) : "";

  // Determine next button text and URL
  const nextButtonText =
    isLastPage && firstComponent
      ? `${firstComponent.title}`
      : nextPage
        ? nextPage.page
        : "None";

  const nextButtonSlug =
    isLastPage && firstComponent
      ? firstComponent.slug
      : nextPage
        ? `/docs/${nextPage.slug}`
        : "#";

  return (
    <section className="mt-14 mb-5 transition-all duration-500 w-full h-full">
      <MarkdownRenderer
        content={content}
        title={page.page}
        tags={page.tags}
        lastUpdated={formattedLastUpdated} // Pass formatted date string
        showHeader={true}
      />

      {/* Navigation buttons */}
      <div className="flex items-center justify-between font-medium pt-10 mt-10 border-t border-foreground/10 w-full">
        <form
          action={prevPage ? `/docs/${prevPage.slug}` : ""}
          method="get"
          className="w-full"
        >
          <Button
            type="submit"
            variant="outline"
            size="lg"
            disabled={!prevPage}
            className={`relative cursor-pointer inline-flex flex-col items-end group rounded-sm border-foreground/10! hover:border-foreground/30 hover:shadow-none! bg-background! w-2/3 hover:w-full h-24! transition-all duration-500
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
              <span>{prevPage ? prevPage.page : "None"}</span>
            </span>
          </Button>
        </form>

        <form
          action={nextButtonSlug}
          method="get"
          className="text-end ml-4 w-full"
        >
          <Button
            type="submit"
            variant="outline"
            size="lg"
            disabled={nextButtonSlug === "#"}
            className={`relative cursor-pointer inline-flex flex-col items-start group rounded-sm border-foreground/10! hover:border-foreground/30 hover:shadow-none! bg-background! w-2/3 hover:w-full h-24! transition-all duration-500
              ${
                nextPage || (isLastPage && firstComponent)
                  ? isLastPage && firstComponent
                    ? "border-green-500/30 hover:border-green-500 hover:bg-green-500/5"
                    : "border-border hover:bg-muted"
                  : "border-border text-muted-foreground"
              }`}
          >
            <span className="pr-5 text-muted-foreground group-hover:text-foreground transition-all duration-500">
              {isLastPage && firstComponent ? "Get Started" : "Next"}
            </span>
            <span className="flex items-center text-lg group-hover:text-primary leading-none transition-all duration-500">
              <span>{nextButtonText}</span>
              <ChevronRight className="absolute bottom-5 right-4 size-7! text-muted-foreground/40 group-hover:text-foreground transition-all duration-500" />
            </span>
          </Button>
        </form>
      </div>
    </section>
  );
}
