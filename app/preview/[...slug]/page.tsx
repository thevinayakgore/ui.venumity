// app/preview/[...slug]/page.tsx
import { Metadata } from "next";
import PageClient from "./page.client";
import { notFound } from "next/navigation";
import { toKebabCase } from "@/utils/slug-kebab";
import { resolvePreviewBySlug } from "@/registry/registry-utils";
import { brandName, website, handle, username } from "@/lib/brand";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const lastSegment = toKebabCase(slug[slug.length - 1] ?? "");

  const resolved = resolvePreviewBySlug(slugPath);

  if (!resolved) {
    return {
      title: `Preview Not Found - ${brandName}`,
      description: "The requested preview could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const {
    itemName,
    description,
    categoryName,
    subcategoryName,
    slugPath: canonicalPath,
  } = resolved;

  /* ── Detect the "demo" preview case ─────────────────────── */
  // /preview/<cat>/<sub>/demo → showing the whole subcategory demo
  const isDemoPreview = lastSegment === "demo";

  const pageUrl = `${website}/preview/${canonicalPath}`;
  const ogImage = `${website}/thumbnails/${toKebabCase(itemName)}.webp`;

  const title = isDemoPreview
    ? `${subcategoryName} Demo – Live Preview - ${brandName}`
    : `${itemName} – ${subcategoryName} - Live Preview - ${brandName}`;

  const finalDescription = isDemoPreview
    ? `Live preview of the ${subcategoryName} demo from the ${categoryName} collection. ${description}`
    : description ||
      `Live preview of ${itemName} from the ${subcategoryName} collection in ${categoryName}.`;

  const keywords = isDemoPreview
    ? [
        `${subcategoryName} demo`,
        `${subcategoryName} preview`,
        categoryName,
        subcategoryName,
        "react component demo",
        "nextjs live preview",
        "tailwind css",
        "shadcn ui",
        "framer motion",
      ]
    : [
        itemName,
        categoryName,
        subcategoryName,
        "react component",
        "nextjs component",
        "tailwind css",
        "shadcn ui",
        "live preview",
        "interactive demo",
      ];

  return {
    title,
    description: finalDescription,
    keywords,
    metadataBase: new URL(website),
    alternates: { canonical: pageUrl },
    authors: [{ name: "Vinayak Gore", url: handle }],
    creator: `@${username}`,
    openGraph: {
      title,
      description: finalDescription,
      url: pageUrl,
      siteName: brandName,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: isDemoPreview
            ? `${subcategoryName} demo preview`
            : `${itemName} preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: finalDescription,
      images: [ogImage],
      creator: `@${username}`,
      site: "@venumityui",
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
    category: categoryName,
  };
}

export default async function PreviewPage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    notFound();
  }

  return <PageClient slugPath={slug.join("/")} />;
}
