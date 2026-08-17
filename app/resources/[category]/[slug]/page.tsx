// app/resources/[category]/[slug]/page.tsx
import { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getAllResources } from "@/registry/resources";
import { toKebabCase } from "@/utils/slug-kebab";
import { brandName, website } from "@/lib/brand";
import { formatDate } from "@/utils/format-date";
import ResourcePageClient from "./page.client";

// Helper function to find resource by slug
function findResourceBySlug(categorySlug: string, pageSlug: string) {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return null;

  const page = category.pages.find(
    (page) => toKebabCase(page.title) === pageSlug && page.published,
  );

  return page || null;
}

// Fetch markdown content from API
async function fetchMarkdownContent(contentPath: string): Promise<{
  content: string | null;
  lastModified: string | null;
}> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(
      `${baseUrl}/api/resources?path=${encodeURIComponent(contentPath)}`,
      { cache: 'force-cache' } // Static cache for build time
    );
    
    if (!res.ok) {
      return { content: null, lastModified: null };
    }
    
    const data = await res.json();
    return {
      content: data.content || null,
      lastModified: data.lastModified || null,
    };
  } catch (error) {
    console.error("Error fetching markdown:", error);
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

// Server Component
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

  // Previous / next logic
  const prevPage = currentIndex > 0 ? pages[currentIndex - 1] : null;
  let nextPage = null;
  let nextCategorySlug = category;
  let nextPageSlug = null;
  if (currentIndex < pages.length - 1) {
    nextPage = pages[currentIndex + 1];
    nextCategorySlug = category;
    nextPageSlug = toKebabCase(nextPage.title);
  } else {
    const allCategories = getAllResources();
    const currentCatIndex = allCategories.findIndex(
      (cat) => cat.slug === category,
    );
    if (currentCatIndex !== -1 && currentCatIndex < allCategories.length - 1) {
      const nextCat = allCategories[currentCatIndex + 1];
      const nextCatPages = (nextCat.pages || []).filter((p) => p.published);
      if (nextCatPages.length > 0) {
        nextPage = nextCatPages[0];
        nextCategorySlug = nextCat.slug;
        nextPageSlug = toKebabCase(nextPage.title);
      }
    }
  }

  // Fetch markdown content from API
  const { content: markdownContent, lastModified } = await fetchMarkdownContent(
    page.contentPath,
  );
  const formattedLastUpdated = lastModified
    ? formatDate(new Date(lastModified))
    : "";

  // Structured Data (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description || "",
    image: page.coverImage || "/logo.png",
    author: page.authorNames?.map((name: string) => ({
      "@type": "Person",
      name,
    })) || [{ "@type": "Person", name: brandName }],
    datePublished: lastModified || new Date().toISOString(),
    dateModified: lastModified || new Date().toISOString(),
    publisher: {
      "@type": "Organization",
      name: brandName,
      logo: {
        "@type": "ImageObject",
        url: `${website}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${website}/resources/${category}/${slug}`,
    },
  };

  // Pass all props to client component
  return (
    <>
      <ResourcePageClient
        markdownContent={markdownContent}
        page={page}
        category={category}
        prevPage={prevPage}
        nextPage={nextPage}
        nextCategorySlug={nextCategorySlug}
        nextPageSlug={nextPageSlug}
        formattedLastUpdated={formattedLastUpdated}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}