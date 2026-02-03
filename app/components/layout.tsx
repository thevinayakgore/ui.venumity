// app/components/layout.tsx
import type { Metadata } from "next";
import ContentLayoutClient from "./layout.client";
import { brandName, website } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Components - ${brandName}`,
  description: `Explore ${brandName} modern, accessible, and fully customizable UI components built for scalable web applications.`,
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(website || "http://localhost:3000"),
};

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ContentLayoutClient>{children}</ContentLayoutClient>;
}