// app/components/page.tsx
import { Metadata } from "next";
import { Components } from "./page.client";
import { website } from "@/lib/brand";
import { COMPONENTS } from "@/registry/components";
import { toKebabCase } from "@/utils/slug-kebab";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = website || "https://ui.venumity.com";

  // Collect every component item name from the registry
  const allComponentNames: string[] = [];
  for (const cat of COMPONENTS) {
    for (const sub of cat.subcategories) {
      for (const item of sub.items) {
        allComponentNames.push(item.itemName);
      }
    }
  }

  const title =
    "React & Next.js UI Components – Copy-Paste Library | Venumity UI";
  const description = `Browse ${allComponentNames.length} free, open-source UI components and subcategories. Build faster with copy-paste React, Next.js, and Tailwind CSS components.`;

  // Absolute OG images for the first 20 component items
  const images = allComponentNames.slice(0, 20).map((itemName) => ({
    url: `${baseUrl}/thumbnails/${toKebabCase(itemName)}.png`,
    width: 1200,
    height: 630,
    alt: `${itemName} component preview`,
  }));

  return {
    title,
    description,
    keywords: [
      "react components",
      "nextjs components",
      "ui library",
      "tailwind css",
      "shadcn ui",
      "copy paste components",
      "free ui kit",
      "open source design system",
    ],
    metadataBase: new URL(baseUrl),
    alternates: { canonical: `${baseUrl}/components` },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/components`,
      siteName: "Venumity UI",
      images: images.length
        ? images
        : [{ url: "/logo.png", width: 1000, height: 1000, alt: "Venumity UI" }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((img) => img.url),
      creator: "@thevinayakgore",
      site: "@venumityui",
    },
    robots: { index: true, follow: true },
  };
}

export default function ComponentsPage() {
  return <Components />;
}
