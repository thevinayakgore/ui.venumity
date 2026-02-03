import type { Metadata, Viewport } from "next";
import { brandName } from "@/lib/brand";
import PageClient from "./page.client";

export const metadata: Metadata = {
  title: `Templates - ${brandName}`,
  description: `Explore premium and free website templates built with modern tech stacks. High-performance, animated, and production-ready templates by ${brandName}.`,
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function TemplatesPage() {
  return <PageClient />;
}
