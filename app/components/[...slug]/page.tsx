// app/components/[...slug]/page.tsx
import { Metadata } from "next";
import {
  getComponentByPath,
  getSubcategory,
  isSubcategoryPath,
  getCategorySubcategoryFromPath,
} from "@/registry/component-utils";
import PageClient from "./page.client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const path = slug.join("/");

    // Check if this is a subcategory path
    if (isSubcategoryPath(path)) {
      const categorySubcategory = getCategorySubcategoryFromPath(path);
      if (categorySubcategory) {
        const subcategory = getSubcategory(
          categorySubcategory.category,
          categorySubcategory.subcategory,
        );
        if (subcategory) {
          return {
            title: `${subcategory.name.charAt(0).toUpperCase()}${subcategory.name.slice(1)}`,
            description: subcategory.description || `Browse ${subcategory.items.length} ${subcategory.name.toLowerCase()} components`,
          };
        }
      }
    }

    // Otherwise, it's a component path
    const component = getComponentByPath(path);

    if (!component) {
      const title = slug
        .map((part) =>
          part
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
        )
        .join(" / ");

      return {
        title: title || "Component",
        description: `${title} component details`,
      };
    }

    return {
      title: component.itemName || "Component",
      description: component.description || "Component details",
      openGraph: {
        title: component.itemName || "Component",
        description: component.description || "Component details",
        type: "website",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Component",
      description: "Component details page",
    };
  }
}

export default async function ComponentPage({ params }: PageProps) {
  let path: string | null = null;
  let component: ReturnType<typeof getComponentByPath> | null = null;
  let subcategoryData: ReturnType<typeof getSubcategory> | null = null; // NEW: Changed to get subcategory data
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
    console.error("Error loading component:", err);
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

  return <PageClient component={component} slugPath={path!} subcategoryData={subcategoryData} />;
}