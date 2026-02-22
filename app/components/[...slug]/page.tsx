// app/components/[...slug]/page.tsx
import { Metadata } from "next";
import {
  getComponentByPath,
  getSubcategory,
  isSubcategoryPath,
  getCategorySubcategoryFromPath,
} from "@/registry/component-utils";
import { authorName, gitRepo, handle, website } from "@/lib/brand";
import PageClient from "./page.client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

// Helper to capitalize and format strings
function formatTitle(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Generate OG image URL
function getOgImageUrl(
  path: string,
  title: string,
  category?: string,
  subcategory?: string,
): string {
  const baseUrl = website || "https://ui.venumity.com";
  const ogImageUrl = new URL("/api/og", baseUrl);
  ogImageUrl.searchParams.set("path", path);
  ogImageUrl.searchParams.set("title", title);
  if (category) ogImageUrl.searchParams.set("category", category);
  if (subcategory) ogImageUrl.searchParams.set("subcategory", subcategory);
  return ogImageUrl.toString();
}

// Generate keywords based on component data
type KeywordComponent = {
  itemName?: string;
  tags?: string[];
  techs?: string[];
};

type KeywordSubcategory = {
  name: string;
  tags?: string[];
};

function generateKeywords(
  component?: KeywordComponent,
  subcategory?: KeywordSubcategory,
): string {
  const baseKeywords = [
    "venumity ui",
    "open source ui",
    "free components",
    "react components",
    "nextjs components",
    "tailwind css",
    "shadcn ui",
    "framer motion",
    "mit license",
  ];

  const specificKeywords = [];

  if (subcategory) {
    specificKeywords.push(
      subcategory.name.toLowerCase(),
      ...(subcategory.tags || []).map((t: string) => t.toLowerCase()),
    );
  }

  return [...new Set([...baseKeywords, ...specificKeywords])].join(", ");
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const path = slug.join("/");
    const canonicalUrl = `${website || "https://ui.venumity.com"}/components/${path}`;

    // Check if this is a subcategory path (2 parts)
    if (isSubcategoryPath(path)) {
      const categorySubcategory = getCategorySubcategoryFromPath(path);
      if (categorySubcategory) {
        const subcategory = getSubcategory(
          categorySubcategory.category,
          categorySubcategory.subcategory,
        );
        if (subcategory) {
          const formattedName = formatTitle(subcategory.name);
          const title = formattedName;
          const description =
            subcategory.description ||
            `Free, open-source ${formattedName.toLowerCase()} components built with Next.js, Tailwind CSS, and shadcn/ui. ${subcategory.items.length} ready-to-use components.`;

          return {
            title: title,
            description: description,
            keywords: generateKeywords(undefined, subcategory),
            metadataBase: new URL(website || "https://ui.venumity.com"),
            alternates: {
              canonical: canonicalUrl,
            },
            openGraph: {
              title: title,
              description: description,
              url: canonicalUrl,
              siteName: "Venumity UI",
              images: [
                {
                  url: getOgImageUrl(
                    path,
                    title,
                    categorySubcategory.category,
                    categorySubcategory.subcategory,
                  ),
                  width: 1200,
                  height: 630,
                  alt: title,
                  type: "image/png",
                },
              ],
              locale: "en_US",
              type: "website",
            },
            twitter: {
              card: "summary_large_image",
              title: title,
              description: description,
              images: [
                getOgImageUrl(
                  path,
                  title,
                  categorySubcategory.category,
                  categorySubcategory.subcategory,
                ),
              ],
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
      }
    }

    // Otherwise, it's a component path (3+ parts)
    const component = getComponentByPath(path);

    if (!component) {
      // Fallback for non-existent paths
      const title = slug.map((part) => formatTitle(part)).join(" / ");

      return {
        title: `${title} | Venumity UI`,
        description: `Browse ${title.toLowerCase()} components and templates`,
      };
    }

    // Get subcategory for additional context
    const [categorySlug, subcategorySlug] = slug;
    const subcategory = getSubcategory(
      formatTitle(categorySlug),
      formatTitle(subcategorySlug),
    );

    const componentName =
      component.itemName || formatTitle(slug[slug.length - 1]);
    const title = `${componentName} - ${formatTitle(subcategorySlug)} Component | Venumity UI`;
    const description =
      component.description ||
      subcategory?.description ||
      `Free, open-source ${componentName.toLowerCase()} component built with ${component.techs?.join(", ") || "Next.js, Tailwind CSS, and shadcn/ui"}. MIT licensed and ready to use.`;

    return {
      title: title,
      description: description,
      keywords: generateKeywords(component),
      metadataBase: new URL(website || "https://ui.venumity.com"),
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: title,
        description: description,
        url: canonicalUrl,
        siteName: "Venumity UI",
        images: [
          {
            url: getOgImageUrl(
              path,
              componentName,
              categorySlug,
              subcategorySlug,
            ),
            width: 1200,
            height: 630,
            alt: componentName,
            type: "image/png",
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        images: [
          getOgImageUrl(path, componentName, categorySlug, subcategorySlug),
        ],
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
      // Verification codes (add yours)
      verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
        yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || "",
        // Bing uses 'msvalidate.01' – add it here
        other: {
          "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
        },
      },
      // Other metadata
      category: component?.category || "UI Components",
      authors: [
        {
          name: authorName || "Vinayak Gore",
          url: gitRepo || "https://github.com/thevinayakgore",
        },
      ],
      publisher: "Venumity",
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Component | Venumity UI",
      description: "Free, open-source UI components for Next.js",
    };
  }
}

export default async function ComponentPage({ params }: PageProps) {
  let path: string | null = null;
  let component: ReturnType<typeof getComponentByPath> | null = null;
  let subcategoryData: ReturnType<typeof getSubcategory> | null = null;
  let error: "not-found" | "unknown" | null = null;

  try {
    const resolvedParams = await params;
    path = resolvedParams.slug.join("/");

    // Check if this is a subcategory path (2 parts)
    if (isSubcategoryPath(path)) {
      const categorySubcategory = getCategorySubcategoryFromPath(path);
      if (categorySubcategory) {
        subcategoryData = getSubcategory(
          categorySubcategory.category,
          categorySubcategory.subcategory,
        );
        if (!subcategoryData || subcategoryData.items.length === 0) {
          error = "not-found";
        }
      } else {
        error = "not-found";
      }
    } else {
      // It's a component path (3+ parts)
      component = getComponentByPath(path);
      if (!component) {
        error = "not-found";
      }
    }
  } catch (err) {
    console.error("Error loading component :", err);
    error = "unknown";
  }

  if (error === "not-found") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Not found: {path}</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Error loading component</h1>
      </div>
    );
  }

  return (
    <PageClient
      component={component}
      slugPath={path!}
      subcategoryData={subcategoryData}
    />
  );
}
