// app/primitives/[...slug]/page.tsx
import fs from "fs";
import path from "path";
import { Metadata } from "next";
import { website } from "@/lib/brand";
import PageClient from "./page.client";
import NoComponent from "@/app/no-component/page";
import {
  getPrimitiveCategory,
  getPrimitiveSubcategory,
  getAllPrimitivePathSlugs,
} from "@/registry/registry-utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/* -------------------------------------------------------------------------- */
/*                        Filesystem availability check                        */
/* -------------------------------------------------------------------------- */

const PRIMITIVE_BASE = path.join(
  process.cwd(),
  "components",
  "venumity",
  "primitives",
);

const NON_SOURCE_NAMES = new Set(["demo", "default", "index"]);

function isRealSourceFile(fileName: string): boolean {
  if (!fileName.endsWith(".tsx")) return false;
  const base = fileName.replace(/\.tsx$/, "").toLowerCase();
  return !NON_SOURCE_NAMES.has(base);
}

/**
 * Returns true only when EVERY registered item in the subcategory has
 * either:
 *   - `<cat>/<sub>/<item-slug>.tsx`
 *   - `<cat>/<sub>/<item-slug>/index.tsx`
 *
 * `demo.tsx`, `default.tsx`, `index.tsx` at the subcategory level do NOT
 * count toward a source. If any item is missing a source, the whole page
 * renders <NoComponent />.
 */
function allPrimitiveItemsHaveSource(
  catSlug: string,
  subSlug: string,
  itemSlugs: string[],
): boolean {
  const dir = path.join(PRIMITIVE_BASE, catSlug, subSlug);
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return false;
  if (itemSlugs.length === 0) return false;

  for (const itemSlug of itemSlugs) {
    const flat = path.join(dir, `${itemSlug}.tsx`);
    const hasFlat =
      fs.existsSync(flat) && isRealSourceFile(`${itemSlug}.tsx`);

    const itemDir = path.join(dir, itemSlug);
    const hasFolder =
      fs.existsSync(itemDir) &&
      fs.statSync(itemDir).isDirectory() &&
      fs.existsSync(path.join(itemDir, "index.tsx"));

    if (!hasFlat && !hasFolder) {
      // One missing item → the entire subcategory is treated as unavailable
      return false;
    }
  }

  return true;
}

/* -------------------------------------------------------------------------- */
/*                                Static params                                */
/* -------------------------------------------------------------------------- */

export async function generateStaticParams() {
  return getAllPrimitivePathSlugs()
    .filter((s) => s.length === 2)
    .map((slug) => ({ slug }));
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
  const [catSlug, subSlug] = slug;
  const category = getPrimitiveCategory(catSlug);
  const subcategory = subSlug
    ? getPrimitiveSubcategory(catSlug, subSlug)
    : null;

  if (!category || !subcategory) return { title: "Not Found | Venumity UI" };

  const baseUrl = website || "https://ui.venumity.com";
  const title = `${subcategory.name} – ${category.name} Primitives | Venumity UI`;

  const exampleList = subcategory.items
    .map((i) => i.itemName)
    .slice(0, 8)
    .join(", ");
  const description =
    subcategory.description ||
    `${subcategory.items.length} ${subcategory.name.toLowerCase()} primitives — ${exampleList}. Copy-paste ready for React, Next.js, and Tailwind CSS.`;

  return {
    title,
    description,
    keywords: [
      subcategory.name,
      category.name,
      ...(subcategory.tags || []),
      ...(category.tags || []),
      "ui primitive",
      "react",
      "nextjs",
      "tailwind css",
    ],
    metadataBase: new URL(baseUrl),
    alternates: { canonical: `${baseUrl}/primitives/${catSlug}/${subSlug}` },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/primitives/${catSlug}/${subSlug}`,
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

export default async function PrimitiveSubcategoryPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const [catSlug, subSlug] = slug;

  const category = getPrimitiveCategory(catSlug);
  const subcategory = subSlug
    ? getPrimitiveSubcategory(catSlug, subSlug)
    : null;
  if (!category || !subcategory) return <NoComponent />;

  // Strict rule: every registered item must have a real source file on disk
  const itemSlugs = subcategory.items.map((i) => i.slug);
  const available = allPrimitiveItemsHaveSource(
    category.slug,
    subcategory.slug,
    itemSlugs,
  );
  if (!available) return <NoComponent />;

  return <PageClient category={category} subcategory={subcategory} />;
}