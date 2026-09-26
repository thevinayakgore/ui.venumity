// app/preview/[...slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import PageClient from "./page.client";
import { brandName, website, handle, username } from "@/lib/brand";
import { toKebabCase } from "@/utils/slug-kebab";
import { resolvePreviewBySlug } from "@/registry/component-utils";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug.join("/");

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
    tags,
    techs,
    categoryName,
    subcategoryName,
    slugPath: canonicalPath,
  } = resolved;

  const pageUrl = `${website}/preview/${canonicalPath}`;
  const ogImage = `${website}/thumbnails/${toKebabCase(itemName)}.webp`;

  const title = `${itemName} - ${brandName} - Beautiful set of React, Tailwind CSS, Framer Motion Animated Components`;

  const keywords = [
    itemName,
    categoryName,
    subcategoryName,
    ...tags,
    ...techs,
    "react component",
    "nextjs component",
    "tailwind css",
    "shadcn ui",
    "live preview",
    "interactive demo",
  ];

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(website),
    alternates: { canonical: pageUrl },
    authors: [{ name: "Vinayak Gore", url: handle }],
    creator: `@${username}`,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: brandName,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${itemName} preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
