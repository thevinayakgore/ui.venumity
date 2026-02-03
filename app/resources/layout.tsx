// app/resources/layout.tsx
import { brandName, website } from "@/lib/brand";
import { Metadata, Viewport } from "next";
import ContentLayoutClient from "./layout.client";
import { getAllResources } from "@/registry/resources";

export const metadata: Metadata = {
  title: `Resources - ${brandName}`,
  description:
    "Curated guides, libraries, and references to help you build faster with modern tools.",
  keywords: [
    "resources",
    "frameworks",
    "tutorials",
    "cheat sheets",
    "animations",
  ],
  openGraph: {
    title: `Resources - ${brandName}`,
    description:
      "Curated guides, libraries, and references to help you build faster with modern tools.",
    url: `${website}/resources`,
    siteName: brandName,
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: `${brandName} Logo`,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Resources - ${brandName}`,
    description:
      "Curated guides, libraries, and references to help you build faster with modern tools.",
    images: ["/logo.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get categories from registry
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
