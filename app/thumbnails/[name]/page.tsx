// app/thumbnails/[name]/page.tsx
import fs from "fs";
import path from "path";
import Image from "next/image";
import { Metadata } from "next";
import { website } from "@/lib/brand";
import { notFound } from "next/navigation";
import { removeKebabCase } from "@/utils/slug-kebab";

interface PageProps {
  params: Promise<{ name: string }>;
}

// Static generation for every thumbnail
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "public", "thumbnails");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".webp"))
    .map((f) => ({ name: f.replace(/\.webp$/, "") }));
}

// Rich metadata per thumbnail
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { name } = await params;
  const display = removeKebabCase(name);
  const url = `${website}/thumbnails/${name}`;
  const imageUrl = `${website}/api/thumbnails?name=${encodeURIComponent(name)}`;

  return {
    title: `${display} — Thumbnail | Venumity UI`,
    description: `Preview the "${display}" component thumbnail from Venumity UI. High-quality WebP preview for the ${display} React component.`,
    keywords: [
      display,
      "thumbnail",
      "preview",
      "venumity",
      "venumity ui",
      "react component",
      "next.js",
      "tailwind",
      "shadcn",
      name,
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${display} — Thumbnail | Venumity UI`,
      description: `Preview thumbnail for the ${display} component.`,
      type: "article",
      url,
      siteName: "Venumity UI",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 800,
          alt: `${display} thumbnail`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${display} — Thumbnail | Venumity UI`,
      description: `Preview thumbnail for the ${display} component.`,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function ThumbnailPage({ params }: PageProps) {
  const { name } = await params;
  const display = removeKebabCase(name);
  const imageUrl = `/api/thumbnails?name=${encodeURIComponent(name)}`;

  // Verify existence
  const filePath = path.join(
    process.cwd(),
    "public",
    "thumbnails",
    `${name}.webp`,
  );
  if (!fs.existsSync(filePath)) notFound();

  return (
    <Image
      src={imageUrl}
      alt={`${display} thumbnail`}
      fill
      unoptimized
      priority
      className="object-contain"
    />
  );
}
