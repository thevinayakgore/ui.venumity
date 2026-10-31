// app/resources/[...slug]/page.tsx
import fs from "fs";
import path from "path";
import { Metadata } from "next";
import { website } from "@/lib/brand";
import PageClient from "./page.client";
import { toKebabCase } from "@/utils/slug-kebab";
import { formatDate } from "@/utils/format-date";
import NoComponent from "@/app/no-component/page";
import {
  getCategoryBySlug,
  getAllResources,
} from "@/registry/resources";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/* -------------------------------------------------------------------------- */
/*                        Filesystem availability check                        */
/* -------------------------------------------------------------------------- */

const RESOURCES_BASE = path.join(process.cwd(), "registry", "reso");

/**
 * Returns true only when the markdown file exists for the resource.
 * Structure: registry/reso/<category-slug>/<page-slug>.md
 */
function resourceHasSource(catSlug: string, pageSlug: string): boolean {
  const filePath = path.join(RESOURCES_BASE, catSlug, `${pageSlug}.md`);
  return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
}

/* -------------------------------------------------------------------------- */
/*                                Static params                                */
/* -------------------------------------------------------------------------- */

export async function generateStaticParams() {
  const categories = getAllResources();
  const params: { slug: string[] }[] = [];

  categories.forEach((category) => {
    category.pages.forEach((page) => {
      params.push({ slug: [category.slug, toKebabCase(page.title)] });
    });
  });

  return params;
}

/* -------------------------------------------------------------------------- */
/*                                  Metadata                                   */
/* -------------------------------------------------------------------------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [catSlug, pageSlug] = slug;
  
  const category = getCategoryBySlug(catSlug);
  const page = category?.pages.find(
    (p) => toKebabCase(p.title) === pageSlug
  );

  if (!category || !page) return { title: "Not Found | Venumity UI" };

  const baseUrl = website || "https://ui.venumity.com";
  const title = `${page.title} – ${category.name} | Venumity UI`;
  const description = page.description || `Learn more about ${page.title}`;

  return {
    title,
    description,
    keywords: [
      page.title,
      category.name,
      ...(page.tags || []),
    ],
    metadataBase: new URL(baseUrl),
    alternates: { canonical: `${baseUrl}/resources/${catSlug}/${pageSlug}` },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/resources/${catSlug}/${pageSlug}`,
      siteName: "Venumity UI",
      images: [{ url: page.coverImage || "/logo.png", width: 1200, height: 630, alt: title }],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [page.coverImage || "/logo.png"],
      creator: "@thevinayakgore",
    },
    robots: { index: true, follow: true },
  };
}

/* -------------------------------------------------------------------------- */
/*                                   Page                                      */
/* -------------------------------------------------------------------------- */

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  
  // Handle bad urls (e.g., someone visits /resources/frameworks)
  if (slug.length !== 2) return <NoComponent />;
  
  const [catSlug, pageSlug] = slug;

  const category = getCategoryBySlug(catSlug);
  const page = category?.pages.find(
    (p) => toKebabCase(p.title) === pageSlug
  );

  if (!category || !page) return <NoComponent />;

  // Strict rule: Markdown file must exist on disk
  const available = resourceHasSource(catSlug, pageSlug);
  if (!available) return <NoComponent />;

  // Find Prev / Next
  const pages = category.pages;
  const currentIndex = pages.findIndex((p) => toKebabCase(p.title) === pageSlug);

  const prevPage = currentIndex > 0 ? pages[currentIndex - 1] : null;
  
  let nextPage = null;
  let nextCategorySlug = catSlug;
  let nextPageSlug = null;
  
  if (currentIndex < pages.length - 1) {
    nextPage = pages[currentIndex + 1];
    nextPageSlug = toKebabCase(nextPage.title);
  } else {
    const allCategories = getAllResources();
    const currentCatIndex = allCategories.findIndex((cat) => cat.slug === catSlug);
    if (currentCatIndex !== -1 && currentCatIndex < allCategories.length - 1) {
      const nextCat = allCategories[currentCatIndex + 1];
      const nextCatPages = (nextCat.pages || []);
      if (nextCatPages.length > 0) {
        nextPage = nextCatPages[0];
        nextCategorySlug = nextCat.slug;
        nextPageSlug = toKebabCase(nextPage.title);
      }
    }
  }

  // Read content
  let markdownContent = null;
  let formattedLastUpdated = "";
  
  try {
    const fullPath = path.join(RESOURCES_BASE, catSlug, `${pageSlug}.md`);
    markdownContent = fs.readFileSync(fullPath, "utf-8");
    const stats = fs.statSync(fullPath);
    formattedLastUpdated = formatDate(stats.mtime);
  } catch (err) {
    console.error("Failed to read markdown", err);
  }

  return (
    <PageClient
    page={page}
    prevPage={prevPage}
    nextPage={nextPage}
    category={category.slug}
    nextPageSlug={nextPageSlug}
    markdownContent={markdownContent}
    nextCategorySlug={nextCategorySlug}
      formattedLastUpdated={formattedLastUpdated}
    />
  );
}