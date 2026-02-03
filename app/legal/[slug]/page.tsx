import { brandName } from "@/lib/brand";
import { Metadata } from "next";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarClock } from "lucide-react";
import { LEGAL_PAGES, LegalPage as LegalPageType } from "@/registry/site/legal";
import { MarkdownRenderer } from "@/components/common/markdown-renderer";
import { readFileSync, existsSync, statSync } from "fs";
import { join } from "path";
import { formatDate } from "@/utils/format-date";

type LegalPageSlug = keyof typeof LEGAL_PAGES;

// Helper function to read markdown content and get last modified time
function readLegalMarkdownContent(contentPath: string): {
  content: string | null;
  lastModified: Date | null;
} {
  try {
    // Content paths are relative from project root
    const fullPath = join(process.cwd(), contentPath);

    if (!existsSync(fullPath)) {
      console.error("Legal markdown file not found:", fullPath);
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
    console.error("Error reading legal markdown file:", error);
    return { content: null, lastModified: null };
  }
}

// Helper function to get page with content
function getLegalPageWithContent(
  slug: string,
): (LegalPageType & { content: string; lastUpdated: string }) | null {
  const page = LEGAL_PAGES[slug as LegalPageSlug];

  if (!page) return null;

  // Read content from markdown file
  const { content: markdownContent, lastModified } = readLegalMarkdownContent(
    page.contentPath,
  );

  // Fallback content if markdown file doesn't exist
  const content = markdownContent || `# ${page.title}\n\nContent coming soon.`;

  // Format the last updated date
  const lastUpdatedDate = lastModified || new Date();
  const lastUpdated = formatDate(lastUpdatedDate); // Use formatLegalDate

  return {
    ...page,
    content,
    lastUpdated,
  };
}

/* -------------------- SEO METADATA -------------------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const page = LEGAL_PAGES[slug as LegalPageSlug];
  const readableTitle =
    page?.title ||
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const title = `${readableTitle} - ${brandName}`;
  const description = `Read the ${readableTitle} for ${brandName}. Learn about our policies, terms, and legal information in a clear and transparent way.`;

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
  };
}

/* -------------------- PAGE COMPONENT -------------------- */
export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pageWithContent = getLegalPageWithContent(slug);

  if (!pageWithContent) {
    const errorTitle = "Not Found";

    return (
      <main className="flex flex-col items-center justify-center m-auto p-5 w-full h-full">
        <h1 className="fixed top-0 left-1/2 -translate-x-1/2 -z-20 text-center text-[20rem]  uppercase tracking-wide whitespace-nowrap font-extrabold text-transparent bg-clip-text bg-linear-to-b from-foreground/15 via-foreground/5 leading-none">
          {errorTitle}
        </h1>
        <div className="py-24 z-30 transform-gpu min-w-2xl m-auto">
          <div className="space-y-10 min-h-screen">
            <Skeleton className="h-5 mb-20 w-full rounded-lg" />
            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center m-auto p-5 w-full h-full">
      <h1 className="fixed top-0 left-1/2 -translate-x-1/2 -z-20 text-center text-[20rem] uppercase tracking-wide whitespace-nowrap font-extrabold text-transparent bg-clip-text bg-linear-to-b from-foreground/15 via-foreground/5 leading-none">
        {pageWithContent.title}
      </h1>

      <div className="py-24 z-30 transform-gpu max-w-3xl m-auto">
        <MarkdownRenderer
          content={pageWithContent.content}
          title={pageWithContent.title}
          lastUpdated={pageWithContent.lastUpdated}
          showHeader={false}
        />
        <span className="inline-flex items-center gap-2 mt-10 uppercase font-medium text-foreground/80 text-[0.6rem] lg:text-xs p-2 lg:p-2.5 bg-muted/20 backdrop-blur border border-foreground/25 rounded">
          <CalendarClock className="size-3 lg:size-4" />
          <span>Last Updated</span>
          <span>-</span>
          <span>{pageWithContent.lastUpdated}</span>
        </span>
      </div>
    </main>
  );
}
