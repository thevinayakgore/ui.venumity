// app/api/registry/components/route.ts
import { NextResponse } from "next/server";
import { toKebabCase } from "@/utils/slug-kebab";
import { COMPONENTS } from "@/registry/components";

export const dynamic = "force-static";
export const revalidate = 60;

export async function GET() {
  try {
    const components = COMPONENTS.flatMap((cat) =>
      cat.subcategories.flatMap((sub) => {
        // Determine the thumbnail for the subcategory
        const thumbCandidates = [
          sub.thumbnail,
          sub.items[0]?.itemName ? toKebabCase(sub.items[0].itemName) : null,
          toKebabCase(sub.name),
        ].filter(Boolean);

        const thumbnailName = thumbCandidates[0] || null;

        return sub.items.map((item) => ({
          name: toKebabCase(item.itemName || ""),
          displayName: item.itemName || "",
          category: cat.name || "",
          categorySlug: cat.slug || "",
          categoryIcon: cat.icon || "",
          categoryTags: cat.tags || [],
          subcategory: sub.name || "",
          subcategorySlug: sub.slug || "",
          subcategoryDescription: sub.description || "",
          subcategoryTags: sub.tags || [],
          subcategoryKind: sub.kind || "variant",
          thumbnail: thumbnailName ? `/api/thumbnails?name=${thumbnailName}` : null,
          thumbnailCandidates: thumbCandidates.map((c) => `/api/thumbnails?name=${c}`),
          path: `${cat.slug}/${sub.slug}/${item.slug}`,
          type: "component" as const,
        }));
      }),
    );

    return NextResponse.json(
      { components, total: components.length },
      {
        headers: {
          "Cache-Control": "public, max-age=60, s-maxage=60, must-revalidate",
        },
      },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to fetch components: ${errorMessage}` },
      { status: 500 },
    );
  }
}