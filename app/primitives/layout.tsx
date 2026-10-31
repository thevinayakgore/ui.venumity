// app/primitives/layout.tsx
import type { Metadata } from "next";
import ContentLayoutClient from "./layout.client";
import { brandName, website } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Primitives - ${brandName}`,
  description: `Explore ${brandName} foundational UI primitives — buttons, badges, inputs, and more.`,
  robots: { index: true, follow: true },
  metadataBase: new URL(website || "http://localhost:3000"),
};

export default function PrimitivesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ContentLayoutClient>{children}</ContentLayoutClient>;
}