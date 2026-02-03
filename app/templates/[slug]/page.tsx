// templates/[slug]/page.tsx
import { Metadata, Viewport } from "next";
import { brandName, handle, website } from "@/lib/brand";
import PageClient from "./page.client";
import { TEMPLATES } from "@/registry/site/templates";
import { toKebabCase } from "@/utils/slug-kebab";

// Generate Metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (!slug) {
    return {
      title: `Template Not Found | Templates | ${brandName}`,
      description: "The requested template was not found.",
    };
  }

  // Find template by converting each template name to kebab case and comparing
  const template = TEMPLATES.find((t) => {
    const templateSlug = toKebabCase(t.name);
    return templateSlug === slug && t.isPublished;
  });

  if (!template) {
    return {
      title: `Template Not Found - ${brandName}`,
      description: "The requested template was not found !",
      robots: { index: false, follow: false },
    };
  }

  // Use template name and description for SEO
  const seoTitle = `${template.name} - ${template?.category || "Template"}`;
  const seoDescription = template.desc || `Explore ${template.name} template`;

  // Generate canonical URL
  const baseUrl = website;
  const canonicalUrl = `${baseUrl}/templates/${slug}`;

  // Get preview image URL
  const previewUrl =
    typeof template.preview === "string" ? template.preview : template?.preview;
  const ogImage = previewUrl || "/logo.png";

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      template.name,
      template?.category || "Templates",
      "web templates",
      "website templates",
      brandName,
      "Next.js",
      "React",
      "Tailwind CSS",
    ],
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
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      siteName: brandName,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: template.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [ogImage],
      creator: handle,
      site: handle,
    },
    other: {
      "og:price:amount": template.price.toString(),
      "og:price:currency": "USD",
      "og:availability":
        template.price === 0 ? "instock" : "available for purchase",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// Async content component
async function TemplateContent({ slug }: { slug: string }) {
  // Find template by converting each template name to kebab case and comparing
  const template = TEMPLATES.find((t) => {
    const templateSlug = toKebabCase(t.name);
    return templateSlug === slug && t.isPublished;
  });

  if (!template) {
    return (
      <div className="container max-w-7xl m-auto w-full min-h-screen">
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-4">Template Not Found</h1>
          <p className="text-muted-foreground">
            The template you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return <PageClient template={template} />;
}

// Main Page Component
export default async function TemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <TemplateContent slug={slug} />;
}
