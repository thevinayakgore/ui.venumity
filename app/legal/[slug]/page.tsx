// app/legal/[slug]/page.tsx
import { join } from "path";
import Link from "next/link";
import { Metadata } from "next";
import { brandName } from "@/lib/brand";
import { formatDate } from "@/utils/format-date";
import { readFileSync, existsSync, statSync } from "fs";
import { MarkdownRenderer } from "@/components/site/common/markdown";
import { LEGAL_PAGES, LegalPage as LegalPageType } from "@/registry/site/legal";

type LegalPageSlug = keyof typeof LEGAL_PAGES;

// ─── FIX: All fs operations are inside functions — never at module level.
// ─────────────────────────────────────────────────────────────────────────────

function readLegalMarkdownContent(contentPath: string): {
  content: string | null;
  lastModified: Date | null;
} {
  if (!contentPath || typeof contentPath !== "string") {
    console.error(
      "readLegalMarkdownContent: contentPath is invalid:",
      contentPath,
    );
    return { content: null, lastModified: null };
  }

  try {
    // Remove leading slash if present to avoid double slash
    const cleanPath = contentPath.startsWith("/")
      ? contentPath.slice(1)
      : contentPath;
    const fullPath = join(/*turbopackIgnore: true*/ process.cwd(), cleanPath);

    console.log("Reading legal file from:", fullPath);

    if (!existsSync(fullPath)) {
      console.error("Legal markdown file not found:", fullPath);
      return { content: null, lastModified: null };
    }

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

function getLegalPageWithContent(
  slug: string,
): (LegalPageType & { content: string; lastUpdated: string }) | null {
  if (!slug || typeof slug !== "string") return null;

  const page = LEGAL_PAGES[slug as LegalPageSlug];
  if (!page) return null;

  if (!page.contentPath) {
    console.error(
      "getLegalPageWithContent: missing contentPath for slug:",
      slug,
    );
    return null;
  }

  const { content: markdownContent, lastModified } = readLegalMarkdownContent(
    page.contentPath,
  );

  const content = markdownContent ?? `# ${page.title}\n\nContent coming soon.`;
  const lastUpdatedDate = lastModified ?? new Date();
  const lastUpdated = formatDate(lastUpdatedDate);

  return {
    ...page,
    content,
    lastUpdated,
  };
}

// ─── Generate static params for all legal pages ────────────────────────────

export async function generateStaticParams() {
  return Object.keys(LEGAL_PAGES).map((slug) => ({
    slug,
  }));
}

// ─── SEO Metadata ───────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const page = LEGAL_PAGES[slug as LegalPageSlug];
  const readableTitle =
    page?.title ??
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

// ─── Page Component ─────────────────────────────────────────────────────────

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pageWithContent = getLegalPageWithContent(slug);

  if (!pageWithContent) {
    return (
      <section className="p-5 w-full h-full">
        <div className="space-y-10 max-w-3xl m-auto min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
            <p className="text-muted-foreground">
              The legal page you are looking for does not exist.
            </p>
            <Link
              href="/"
              className="mt-4 inline-block text-primary hover:underline"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative p-5 tracking-wide max-w-3xl m-auto w-full h-full">
      <MarkdownRenderer
        content={pageWithContent.content}
        title={pageWithContent.title}
        showHeader={true}
      />
    </section>
  );
}
