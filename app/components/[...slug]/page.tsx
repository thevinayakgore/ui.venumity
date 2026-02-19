// app/components/[...slug]/page.tsx
import { COMPONENTS } from "@/registry/components";
import { toKebabCase } from "@/utils/slug-kebab";
import PageClient from "./page.client";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = slug.join("/");

  // Find component data
  let componentData = null;
  let subcategoryData = null;

  const parts = slugPath.split("/").filter(Boolean);

  // Handle subcategory pages (parts.length === 2)
  if (parts.length === 2) {
    const categorySlug = parts[0];
    const subcategorySlug = parts[1];

    for (const category of COMPONENTS) {
      if (toKebabCase(category.name) === categorySlug) {
        for (const subcategory of category.subcategories) {
          if (toKebabCase(subcategory.name) === subcategorySlug) {
            subcategoryData = subcategory;
            break;
          }
        }
        break;
      }
    }
  }

  // Handle component pages (parts.length >= 3)
  if (parts.length >= 3) {
    const categorySlug = parts[0];
    const subcategorySlug = parts[1];
    const componentSlug = parts.slice(2).join("/");

    for (const category of COMPONENTS) {
      if (toKebabCase(category.name) === categorySlug) {
        for (const subcategory of category.subcategories) {
          if (toKebabCase(subcategory.name) === subcategorySlug) {
            subcategoryData = subcategory;
            for (const item of subcategory.items) {
              if (toKebabCase(item.itemName) === componentSlug) {
                componentData = {
                  ...item,
                  category: category.name,
                  subcategory: subcategory.name,
                };
                break;
              }
            }
            break;
          }
        }
        break;
      }
    }
  }

  return (
    <PageClient
      component={componentData}
      slugPath={slugPath}
      subcategoryData={subcategoryData}
    />
  );
}
