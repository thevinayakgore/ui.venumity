// app/docs/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { brandName, website, authorName, gitRepo, handle } from "@/lib/brand";
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
import { MarkdownRenderer } from "@/components/site/common/markdown-renderer";
import { toKebabCase } from "@/utils/slug-kebab";

// ── Helpers ──────────────────────────────────────────────
function readDocsMarkdownContent(contentPath: string): {
  content: string | null;
  lastModified: Date | null;
} {
  try {
    const fullPath = join(
      /* turbopackIgnore: true */ process.cwd(),
      contentPath,
    );
    if (!existsSync(fullPath)) {
      console.error("Docs markdown file not found:", fullPath);
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
      if (page.published !== false) slugs.push({ slug: page.slug });
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

  const { content } = readDocsMarkdownContent(page.contentPath);
  const firstParagraph =
    content?.split("\n\n")[1] || `Learn more about ${page.page} documentation.`;
  const description = firstParagraph.substring(0, 160).replace(/[#`*]/g, "");

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
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || "",
      other: {
        "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
      },
    },
  };
}

// ── Page Component ────────────────────────────────────────
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) notFound();

  const { prevPage, nextPage } = getPageNavigation(slug);
  const firstComponent = getFirstComponent();
  const isLastPage = !nextPage;

  const { content: markdownContent } = readDocsMarkdownContent(
    page.contentPath,
  );
  const content = markdownContent || `# ${page.page}\n\nContent coming soon.`;

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
        ? `/docs/${nextPage.slug}`
        : "#";

  return (
    <section className="mb-5 transition-all duration-500 w-full h-full">
      <MarkdownRenderer
        content={content}
        title={page.page}
        tags={page.tags}
        showHeader={true}
      />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 font-semibold tracking-wide mt-5 md:mt-10 py-10 border-t border-foreground/10 w-full">
        <form
          action={prevPage ? `/docs/${prevPage.slug}` : ""}
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
    </section>
  );
}
