// app/resources/layout.tsx
import { brandName, website } from "@/lib/brand";
import { Metadata, Viewport } from "next";
import ContentLayoutClient from "./layout.client";
import { getAllResources } from "@/registry/resources";

// Generate metadata dynamically to include cover image from first resource (if available)
export async function generateMetadata(): Promise<Metadata> {
  const categories = getAllResources();
  const firstResource = categories[0]?.pages?.[0];
  const coverImage = firstResource?.coverImage || "/logo.png";

  return {
    title: `Resources - ${brandName}`,
    description:
      "Curated guides, libraries, and references to help you build faster with modern tools.",
    keywords: [
      "resources",
      "frameworks",
      "tutorials",
      "cheat sheets",
      "animations",
      "developer guides",
    ],
    openGraph: {
      title: `Resources - ${brandName}`,
      description:
        "Curated guides, libraries, and references to help you build faster with modern tools.",
      url: `${website}/resources`,
      siteName: brandName,
      images: [
        {
          url: coverImage,
          width: 1200,
          height: 630,
          alt: `${brandName} Resources`,
        },
      ],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `Resources - ${brandName}`,
      description:
        "Curated guides, libraries, and references to help you build faster with modern tools.",
      images: [coverImage],
      site: "@thevinayakgore",
    },
    alternates: {
      canonical: `${website}/resources`,
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = getAllResources();
  const initialCategory = "frameworks";

  return (
    <ContentLayoutClient
      initialCategories={categories}
      initialCategory={initialCategory}
    >
      {children}
    </ContentLayoutClient>
  );
}
