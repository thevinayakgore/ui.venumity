// app/docs/[slug]/page.tsx
import { join } from "path";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toKebabCase } from "@/utils/slug-kebab";
import { COMPONENTS } from "@/registry/components";
import { readFileSync, existsSync, statSync } from "fs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MarkdownRenderer } from "@/components/site/common/markdown";
import { brandName, website, authorName, gitRepo, handle } from "@/lib/brand";
import {
  DOCS_DATA,
  getPageBySlug,
  getPageNavigation,
} from "@/registry/site/docs";
import Contributors from "@/registry/docs/contributors";

// ── Helpers ──────────────────────────────────────────────
function readDocsMarkdownContent(slug: string): {
  content: string | null;
  lastModified: Date | null;
} {
  try {
    const contentPath = `/registry/docs/${slug}.md`;
    const fullPath = join(
      /* turbopackIgnore: true */ process.cwd(),
      contentPath,
    );
    if (!existsSync(fullPath)) {
      return { content: null, lastModified: null };
    }
    const stats = statSync(fullPath);
    const content = readFileSync(fullPath, "utf-8");
    return { content, lastModified: stats.mtime };
  } catch (error) {
    console.error("Error reading docs markdown file:", error);
    return { content: null, lastModified: null };
  }
}

function getFirstComponent() {
  if (COMPONENTS.length > 0 && COMPONENTS[0].subcategories.length > 0) {
    const firstCategory = COMPONENTS[0];
    const firstSubcategory = firstCategory.subcategories[0];
    return {
      title: firstSubcategory.name,
      slug: `/components/${toKebabCase(firstCategory.name)}/${toKebabCase(firstSubcategory.name)}`,
    };
  }
  return null;
}

// ── Static paths ──────────────────────────────────────────
export async function generateStaticParams() {
  const slugs: { slug: string }[] = [];
  DOCS_DATA.forEach((section) => {
    section.pages.forEach((page) => {
      slugs.push({ slug: toKebabCase(page.page) });
    });
  });
  return slugs;
}

// ── Metadata ──────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  const baseUrl = website || "https://ui.venumity.com";

  if (!page) {
    return {
      title: `Document Not Found / ${brandName}`,
      description: "The requested documentation page was not found.",
    };
  }

  // Handle custom page metadata
  let description = `Learn more about ${page.page} documentation.`;
  if (slug !== "contributors") {
    const { content } = readDocsMarkdownContent(slug);
    const firstParagraph = content?.split("\n\n")[1] || description;
    description = firstParagraph.substring(0, 160).replace(/[#`*]/g, "");
  } else {
    description =
      "Meet the amazing contributors who make Venumity UI possible.";
  }

  const title = `${page.page} – ${brandName} Docs`;
  const canonicalUrl = `${baseUrl}/docs/${slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: canonicalUrl,
    author: {
      "@type": "Person",
      name: authorName || "Vinayak Gore",
      url: gitRepo || "https://github.com/thevinayakgore",
    },
    publisher: {
      "@type": "Organization",
      name: brandName,
      url: baseUrl,
    },
    datePublished: new Date().toISOString().split("T")[0],
    dateModified: new Date().toISOString().split("T")[0],
    mainEntityOfPage: canonicalUrl,
  };

  return {
    title,
    description,
    keywords: page.tags || [],
    authors: [{ name: authorName || "Vinayak Gore" }],
    publisher: brandName,
    metadataBase: new URL(baseUrl),
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      siteName: brandName,
      images: [
        {
          url: new URL("/logo.jpg", baseUrl).toString(),
          width: 1200,
          height: 630,
          alt: page.page,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [new URL("/logo.jpg", baseUrl).toString()],
      creator: `@${handle || "thevinayakgore"}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "script:ld+json": JSON.stringify(structuredData),
    },
  };
}

// ── Page Component ────────────────────────────────────────
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = getPageBySlug(toKebabCase(slug));
  if (!page) notFound();

  const { prevPage, nextPage } = getPageNavigation(toKebabCase(slug));
  const firstComponent = getFirstComponent();
  const isLastPage = !nextPage;

  // 👈 Check if this is a custom TSX page or a Markdown page
  const isCustomPage = slug === "contributors";

  let content = "";
  if (!isCustomPage) {
    const { content: markdownContent } = readDocsMarkdownContent(
      toKebabCase(slug),
    );
    content = markdownContent || `# ${page.page}\n\nContent coming soon.`;
  }

  const nextButtonText =
    isLastPage && firstComponent
      ? firstComponent.title
      : nextPage
        ? nextPage.page
        : "None";
  const nextButtonSlug =
    isLastPage && firstComponent
      ? firstComponent.slug
      : nextPage
        ? `/docs/${toKebabCase(nextPage.page)}`
        : "#";

  return (
    <section className="w-full h-full">
      {/* 👈 Render Custom TSX Page OR Markdown Page */}
      {isCustomPage ? (
        <div className="p-3 md:p-5 w-full">
          <Contributors />
        </div>
      ) : (
        <div className="p-3 md:p-5 w-full">
          <MarkdownRenderer
            content={content}
            title={page.page}
            tags={page.tags}
            showHeader={true}
          />
        </div>
      )}

      {/* Navigation Buttons (Shared for both) */}
      <div className="px-3 md:px-5 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 font-semibold tracking-wide mt-5 md:mt-10 py-10 border-t border-foreground/10 w-full">
          <form
            action={prevPage ? `/docs/${toKebabCase(prevPage.page)}` : ""}
            method="get"
            className={
              prevPage
                ? "p-1 bg-foreground/5 rounded-[0.8rem] border w-full"
                : "w-full"
            }
          >
            <Button
              type="submit"
              variant="outline"
              size="lg"
              disabled={!prevPage}
              className={`relative cursor-pointer inline-flex flex-col items-end group rounded-lg border-foreground/10! hover:border-foreground/30 hover:shadow-none! bg-background! px-4 sm:px-5 w-full md:w-2/3 hover:w-full h-20 sm:h-22! transition-all duration-500
                ${
                  prevPage
                    ? "border-border hover:bg-muted"
                    : "border-border text-muted-foreground"
                }`}
            >
              <span className="text-muted-foreground group-hover:text-foreground transition-all duration-500 text-sm sm:text-base">
                Previous
              </span>
              <span className="flex items-center text-sm sm:text-lg group-hover:text-primary leading-none transition-all duration-500">
                <ChevronLeft className="absolute bottom-4 sm:bottom-5 left-3 sm:left-4 size-5 sm:size-7! text-muted-foreground/40 group-hover:text-foreground transition-all duration-500" />
                <span className="truncate max-w-30 sm:max-w-none">
                  {prevPage ? prevPage.page : "None"}
                </span>
              </span>
            </Button>
          </form>

          <form
            action={nextButtonSlug}
            method="get"
            className="text-end ml-0 sm:ml-4 p-1 bg-foreground/5 rounded-[0.8rem] border w-full"
          >
            <Button
              type="submit"
              variant="outline"
              size="lg"
              disabled={nextButtonSlug === "#"}
              className={`relative cursor-pointer inline-flex flex-col items-start group rounded-lg border-foreground/10! hover:border-foreground/30 hover:shadow-none! bg-background! px-4 sm:px-5 w-full md:w-2/3 hover:w-full h-20 sm:h-22! transition-all duration-500
                ${
                  nextPage || (isLastPage && firstComponent)
                    ? isLastPage && firstComponent
                      ? "text-foreground"
                      : "border-border hover:bg-muted"
                    : "border-border text-muted-foreground"
                }`}
            >
              <span className="text-muted-foreground group-hover:text-foreground transition-all duration-500 text-sm sm:text-base">
                {isLastPage && firstComponent ? "Get Started" : "Next"}
              </span>
              <span className="flex items-center text-sm sm:text-lg group-hover:text-primary leading-none transition-all duration-500">
                <span className="truncate max-w-30 sm:max-w-none">
                  {nextButtonText}
                </span>
                <ChevronRight className="absolute bottom-4 sm:bottom-5 right-3 sm:right-4 size-5 sm:size-7! text-muted-foreground/40 group-hover:text-foreground transition-all duration-500" />
              </span>
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
