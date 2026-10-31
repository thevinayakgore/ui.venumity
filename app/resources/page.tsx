// app/resources/page.tsx
import { Metadata } from "next";
import { website } from "@/lib/brand";
import Resources from "./page.client";
import { getAllResources, getAllCategories } from "@/registry/resources";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = website || "https://ui.venumity.com";
  const categories = getAllCategories();
  const title = "Curated Developer Resources & Guides | Venumity UI";
  const description = `Browse ${categories.length} resource categories — frameworks, animations, tutorials, and more. Guides and cheat-sheets to help you build faster.`;

  return {
    title,
    description,
    keywords: [
      "developer resources",
      "web dev guides",
      "cheat sheets",
      "frameworks",
      "animations",
      "tutorials",
    ],
    metadataBase: new URL(baseUrl),
    alternates: { canonical: `${baseUrl}/resources` },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/resources`,
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

export default function ResourcesPage() {
  // We pass the categories to the client component for the Sidebar Context
  const initialCategories = getAllResources();
  return <Resources initialCategories={initialCategories} />;
}