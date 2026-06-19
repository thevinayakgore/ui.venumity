// app/changelog/layout.tsx
import type { Metadata } from "next";
import ContentLayoutClient from "./layout.client";
import { brandName, website } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Changelog - ${brandName}`,
  description: `Stay up to date with the latest features, improvements, and fixes in ${brandName} UI components.`,
  openGraph: {
    title: `Changelog | ${brandName}`,
    description: "All updates and new releases for our component library.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Changelog - ${brandName}`,
    description: "See what's new in our UI component library.",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(website || "http://localhost:3000"),
};

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ContentLayoutClient>{children}</ContentLayoutClient>;
}