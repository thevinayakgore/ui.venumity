// app/resources/layout.tsx
import { Metadata, Viewport } from "next";
import { brandName, website } from "@/lib/brand";
import ContentLayoutClient from "./layout.client";
import { getAllResources } from "@/registry/resources";
import { ResourcesProvider } from "@/contexts/resources";

export async function generateMetadata(): Promise<Metadata> {
  const categories = getAllResources();
  const firstResource = categories[0]?.pages?.[0];
  const coverImage = firstResource?.coverImage || "/logo.png";

  return {
    title: `Resources - ${brandName}`,
    description:
      "Curated guides, libraries, and references to help you build faster with modern tools.",
    openGraph: {
      title: `Resources - ${brandName}`,
      description:
        "Curated guides, libraries, and references to help you build faster with modern tools.",
      url: `${website}/resources`,
      siteName: brandName,
      images: [{ url: coverImage, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Resources - ${brandName}`,
      description:
        "Curated guides, libraries, and references to help you build faster with modern tools.",
      images: [coverImage],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResourcesProvider>
      <ContentLayoutClient>{children}</ContentLayoutClient>
    </ResourcesProvider>
  );
}
