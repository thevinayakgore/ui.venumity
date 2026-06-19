// app/components/[...slug]/page.tsx
import { Metadata } from "next";
import {
  getComponentByPath,
  getSubcategory,
  isSubcategoryPath,
  getCategorySubcategoryFromPath,
  getAllPaths,
  getOGThumbnailPath,
} from "@/registry/component-utils";
import { authorName, gitRepo, handle, website } from "@/lib/brand";
import PageClient from "./page.client";

export const dynamic = "force-static";
export const revalidate = 86400; // 24h

// ── Helper types ──────────────────────────────────────────
interface ComponentMeta {
  itemName?: string;
  tags?: string[];
  techs?: string[];
  category?: string;
  subcategory?: string;
  thumbnail?: string;
  description?: string;
}

interface SubcategoryMeta {
  name: string;
  tags?: string[];
  items?: { itemName: string }[];
  thumbnail?: string;
  description?: string;
}

// ── Helpers ──────────────────────────────────────────────
function formatTitle(str: string) {
  return str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function generateKeywords(
  component?: ComponentMeta,
  subcategory?: SubcategoryMeta,
): string {
  const base = [
    "venumity ui",
    "open source ui",
    "free components",
    "react components",
    "nextjs components",
    "tailwind css",
    "shadcn ui",
    "framer motion",
    "mit license",
    "ui library",
    "copy paste components",
  ];
  const specific: string[] = [];
  if (component) {
    if (component.itemName) specific.push(component.itemName.toLowerCase());
    if (component.category) specific.push(component.category.toLowerCase());
    if (component.subcategory)
      specific.push(component.subcategory.toLowerCase());
    component.tags?.forEach((t) => specific.push(t.toLowerCase()));
    component.techs?.forEach((t) => specific.push(t.toLowerCase()));
  }
  if (subcategory) {
    specific.push(subcategory.name.toLowerCase());
    subcategory.tags?.forEach((t) => specific.push(t.toLowerCase()));
    subcategory.items?.forEach((i) => specific.push(i.itemName.toLowerCase()));
  }
  const longTail = component?.itemName
    ? [
        `free ${component.itemName.toLowerCase()} component`,
        `${component.itemName.toLowerCase()} react component`,
        `${component.itemName.toLowerCase()} nextjs tailwind`,
        `download ${component.itemName.toLowerCase()} ui component`,
      ]
    : [];
  return [...new Set([...base, ...specific, ...longTail])].join(", ");
}

function generateStructuredData(
  component: ComponentMeta,
  path: string,
  title: string,
  description: string,
  imageUrl: string,
) {
  const baseUrl = website || "https://ui.venumity.com";
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: title,
    description,
    url: `${baseUrl}/components/${path}`,
    image: imageUrl,
    author: {
      "@type": "Person",
      name: authorName || "Vinayak Gore",
      url: gitRepo || "https://github.com/thevinayakgore",
    },
    publisher: { "@type": "Organization", name: "Venumity", url: baseUrl },
    programmingLanguage: "TypeScript",
    runtimePlatform: "Next.js",
    about: { "@type": "Thing", name: "UI Components" },
    license: "MIT",
    dateModified: new Date().toISOString().split("T")[0],
  };
}

// Static paths
export async function generateStaticParams() {
  const paths = getAllPaths();
  return paths.map((slug) => ({ slug: slug.split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join("/");
  const baseUrl = website || "https://ui.venumity.com";
  const canonicalUrl = `${baseUrl}/components/${path}`;

  // Subcategory listing page
  if (isSubcategoryPath(path)) {
    const info = getCategorySubcategoryFromPath(path);
    if (!info) return fallbackMeta(slug);
    const subcategory = getSubcategory(
      info.category,
      info.subcategory,
    ) as SubcategoryMeta | null;
    if (!subcategory) return fallbackMeta(slug);

    const formattedName = formatTitle(subcategory.name);
    const categoryName = formatTitle(info.category);
    const itemNames =
      subcategory.items?.map((i) => i.itemName).join(", ") ?? "";
    const title = `${formattedName} Components – ${itemNames} | ${categoryName} | Venumity UI`;
    const description =
      subcategory.description ||
      `Free ${formattedName.toLowerCase()} components: ${itemNames}. Built with Next.js, Tailwind CSS, and shadcn/ui. ${subcategory.items?.length ?? 0} ready-to-use, copy-paste components.`;

    // ✅ Multiple absolute OG images
    const images = subcategory.items?.length
      ? subcategory.items.map((item) => ({
          url: new URL(getOGThumbnailPath(item.itemName), baseUrl).toString(),
          width: 1200,
          height: 630,
          alt: `${item.itemName} component preview`,
        }))
      : [
          {
            url: new URL("/logo.png", baseUrl).toString(),
            width: 1000,
            height: 1000,
            alt: title,
          },
        ];

    return {
      title,
      description,
      keywords: generateKeywords(undefined, subcategory),
      metadataBase: new URL(baseUrl),
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: "Venumity UI",
        images,
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: images.map((img) => img.url),
        creator: handle || "@thevinayakgore",
        site: "@venumityui",
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  }

  // Component detail page
  const component = getComponentByPath(path) as ComponentMeta | null;
  if (!component) return fallbackMeta(slug);

  const [categorySlug, subcategorySlug] = slug;
  const subcategory = getSubcategory(
    formatTitle(categorySlug),
    formatTitle(subcategorySlug),
  ) as SubcategoryMeta | null;
  const componentName =
    component.itemName || formatTitle(slug[slug.length - 1]);
  const title = `${componentName} - Free ${formatTitle(subcategorySlug)} Component | Venumity UI`;
  const techStack =
    component.techs?.join(", ") || "Next.js, Tailwind CSS, and shadcn/ui";
  const description =
    component.description ||
    subcategory?.description ||
    `Free, open-source ${componentName.toLowerCase()} component built with ${techStack}. MIT licensed, copy-paste ready.`;

  // Absolute OG image for single component
  const ogImage = new URL(
    getOGThumbnailPath(componentName),
    baseUrl,
  ).toString();
  const structuredData = generateStructuredData(
    component,
    path,
    title,
    description,
    ogImage,
  );

  return {
    title,
    description,
    keywords: generateKeywords(component, subcategory || undefined),
    metadataBase: new URL(baseUrl),
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Venumity UI",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${componentName} preview`,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: handle || "@thevinayakgore",
      site: "@venumityui",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: { "script:ld+json": JSON.stringify(structuredData) },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || "",
      other: {
        "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
      },
    },
    category: component.category || "UI Components",
    authors: [
      {
        name: authorName || "Vinayak Gore",
        url: gitRepo || "https://github.com/thevinayakgore",
      },
    ],
    publisher: "Venumity UI",
  };
}

function fallbackMeta(slug: string[]): Metadata {
  const title = slug.map(formatTitle).join(" / ");
  return {
    title: `${title} | Venumity UI`,
    description:
      "Free, open-source UI components for Next.js – copy-paste ready.",
  };
}

// ── Page component ────────────────────────────────────────
export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = slug.join("/");

  let component = null;
  let subcategoryData = null;
  let error: "not-found" | "unknown" | null = null;

  try {
    if (isSubcategoryPath(path)) {
      const info = getCategorySubcategoryFromPath(path);
      if (info) {
        subcategoryData = getSubcategory(info.category, info.subcategory);
        if (!subcategoryData || subcategoryData.items.length === 0)
          error = "not-found";
      } else error = "not-found";
    } else {
      component = getComponentByPath(path);
      if (!component) error = "not-found";
    }
  } catch {
    error = "unknown";
  }

  if (error === "not-found")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Not found - {path}</h1>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Error loading component</h1>
      </div>
    );

  return (
    <PageClient
      component={component}
      slugPath={path}
      subcategoryData={subcategoryData}
    />
  );
}
