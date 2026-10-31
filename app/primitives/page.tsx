// app/primitives/page.tsx
import { Metadata } from "next";
import { website } from "@/lib/brand";
import Primitives from "./page.client";
import { PRIMITIVES } from "@/registry/primitives";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = website || "https://ui.venumity.com";
  const title = "Free React & Next.js Primitives | Venumity UI";
  const description = `Browse ${PRIMITIVES.length} primitive categories — buttons, badges, inputs, and more. Copy-paste React + Tailwind primitives for Next.js.`;

  return {
    title,
    description,
    keywords: [
      "ui primitives",
      "react primitives",
      "nextjs primitives",
      "tailwind primitives",
      "shadcn primitives",
    ],
    metadataBase: new URL(baseUrl),
    alternates: { canonical: `${baseUrl}/primitives` },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/primitives`,
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

export default function PrimitivesPage() {
  return <Primitives />;
}
