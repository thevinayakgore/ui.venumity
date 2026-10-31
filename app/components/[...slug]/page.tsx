// app/components/[...slug]/page.tsx
import fs from "fs";
import path from "path";
import { Metadata } from "next";
import { website } from "@/lib/brand";
import PageClient from "./page.client";
import NoComponent from "@/app/no-component/page";
import { COMPONENTS } from "@/registry/components";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

const COMPONENT_BASE = path.join(
  process.cwd(),
  "components",
  "venumity",
  "components",
);

const NON_SOURCE_NAMES = new Set(["demo", "default", "index"]);

function isRealSourceFile(fileName: string): boolean {
  if (!fileName.endsWith(".tsx")) return false;
  const base = fileName.replace(/\.tsx$/, "").toLowerCase();
  return !NON_SOURCE_NAMES.has(base);
}

/**
 * Returns true only when EVERY registered item in the subcategory has
 * either a flat `<item>.tsx` or a `<item>/index.tsx` on disk.
 */
function allComponentItemsHaveSource(
  catSlug: string,
  subSlug: string,
  itemSlugs: string[],
): boolean {
  const dir = path.join(COMPONENT_BASE, catSlug, subSlug);
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return false;
  if (itemSlugs.length === 0) return false;

  for (const itemSlug of itemSlugs) {
    const flat = path.join(dir, `${itemSlug}.tsx`);
    const hasFlat = fs.existsSync(flat) && isRealSourceFile(`${itemSlug}.tsx`);

    const itemDir = path.join(dir, itemSlug);
    const hasFolder =
      fs.existsSync(itemDir) &&
      fs.statSync(itemDir).isDirectory() &&
      fs.existsSync(path.join(itemDir, "index.tsx"));

    if (!hasFlat && !hasFolder) return false;
  }

  return true;
}

/* -------------------------------------------------------------------------- */
/*                                Static params                                */
/* -------------------------------------------------------------------------- */

export async function generateStaticParams() {
  const paths: { slug: string[] }[] = [];
  COMPONENTS.forEach((cat) => {
    cat.subcategories.forEach((sub) => {
      paths.push({ slug: [cat.slug, sub.slug] });
    });
  });
  return paths;
}

/* -------------------------------------------------------------------------- */
/*                                  Metadata                                   */
/* -------------------------------------------------------------------------- */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [catSlug, subSlug] = slug;

  const category = COMPONENTS.find((c) => c.slug === catSlug);
  const subcategory = category?.subcategories.find((s) => s.slug === subSlug);

  if (!category || !subcategory) return { title: "Not Found | Venumity UI" };

  const baseUrl = website || "https://ui.venumity.com";
  const exampleList = subcategory.items
    .map((i) => i.itemName)
    .slice(0, 8)
    .join(", ");
  const title = `${subcategory.name} – ${category.name} Components | Venumity UI`;
  const description =
    subcategory.description ||
    `${subcategory.items.length} ${subcategory.name.toLowerCase()} components — ${exampleList}. Copy-paste ready for React, Next.js, and Tailwind CSS.`;

  return {
    title,
    description,
    keywords: [
      subcategory.name,
      category.name,
      ...(subcategory.tags || []),
      ...(category.tags || []),
      "react component",
      "nextjs",
      "tailwind css",
    ],
    metadataBase: new URL(baseUrl),
    alternates: { canonical: `${baseUrl}/components/${catSlug}/${subSlug}` },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/components/${catSlug}/${subSlug}`,
      siteName: "Venumity UI",
      images: [{ url: "/logo.png", width: 1000, height: 1000, alt: title }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/logo.png"],
      creator: "@thevinayakgore",
    },
    robots: { index: true, follow: true },
  };
}

/* -------------------------------------------------------------------------- */
/*                                   Page                                      */
/* -------------------------------------------------------------------------- */

export default async function ComponentSubcategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const [catSlug, subSlug] = slug;
  if (!catSlug || !subSlug) return <NoComponent />;

  const category = COMPONENTS.find((c) => c.slug === catSlug);
  const subcategory = category?.subcategories.find((s) => s.slug === subSlug);
  if (!category || !subcategory) return <NoComponent />;

  // Strict rule: every registered item must have a real source file on disk
  const itemSlugs = subcategory.items.map((i) => i.slug);
  const available = allComponentItemsHaveSource(
    category.slug,
    subcategory.slug,
    itemSlugs,
  );
  if (!available) return <NoComponent />;

  return <PageClient category={category} subcategory={subcategory} />;
}
