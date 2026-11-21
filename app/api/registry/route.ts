// app/api/registry/route.ts
import { NextResponse } from "next/server";
import { toKebabCase } from "@/utils/slug-kebab";
import { COMPONENTS } from "@/registry/components";
import { PRIMITIVES } from "@/registry/primitives";

export const dynamic = "force-static";
export const revalidate = 60;

export async function GET() {
  try {
    const componentData = COMPONENTS.flatMap((category) =>
      category.subcategories.flatMap((subcategory) => {
        const thumbCandidates = [
          subcategory.thumbnail,
          subcategory.items[0]?.itemName ? toKebabCase(subcategory.items[0].itemName) : null,
          toKebabCase(subcategory.name),
        ].filter(Boolean);

        const thumbnailName = thumbCandidates[0] || null;

        return subcategory.items.map((item) => ({
          name: item.itemName,
          slug: item.slug,
          category: category.name,
          categorySlug: category.slug,
          categoryIcon: category.icon || "",
          categoryTags: category.tags || [],
          subcategory: subcategory.name,
          subcategorySlug: subcategory.slug,
          subcategoryDescription: subcategory.description || "",
          subcategoryTags: subcategory.tags || [],
          subcategoryKind: subcategory.kind || "variant",
          thumbnail: thumbnailName ? `/api/thumbnails?name=${thumbnailName}` : null,
          thumbnailCandidates: thumbCandidates.map((c) => `/api/thumbnails?name=${c}`),
          path: `${category.slug}/${subcategory.slug}/${item.slug}`,
          dependencies: [],
          type: "component" as const,
        }));
      }),
    );

    const primitiveData = PRIMITIVES.flatMap((category) =>
      category.subcategories.flatMap((subcategory) => {
        const thumbCandidates = [
          subcategory.thumbnail,
          subcategory.items[0]?.itemName ? toKebabCase(subcategory.items[0].itemName) : null,
          toKebabCase(subcategory.name),
        ].filter(Boolean);

        const thumbnailName = thumbCandidates[0] || null;

        return subcategory.items.map((item) => ({
          name: item.itemName,
          slug: item.slug,
          category: category.name,
          categorySlug: category.slug,
          categoryIcon: category.icon || "",
          categoryTags: category.tags || [],
          subcategory: subcategory.name,
          subcategorySlug: subcategory.slug,
          subcategoryDescription: subcategory.description || "",
          subcategoryTags: subcategory.tags || [],
          subcategoryUsage: subcategory.usage || null,
          subcategoryProps: subcategory.props || [],
          subcategoryMoreExamples: subcategory.moreExamples || [],
          thumbnail: thumbnailName ? `/api/thumbnails?name=${thumbnailName}` : null,
          thumbnailCandidates: thumbCandidates.map((c) => `/api/thumbnails?name=${c}`),
          path: `${category.slug}/${subcategory.slug}/${item.slug}`,
          dependencies: [],
          type: "primitive" as const,
        }));
      }),
    );

    return NextResponse.json([...componentData, ...primitiveData], {
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=60, must-revalidate",
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to fetch registry: ${errorMessage}` },
      { status: 500 }
    );
  }
}