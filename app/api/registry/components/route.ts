// app/api/registry/components/route.ts
import { NextResponse } from "next/server";
import { toKebabCase } from "@/utils/slug-kebab";
import { COMPONENTS } from "@/registry/components";
import { PRIMITIVES } from "@/registry/primitives";

export const dynamic = "force-static";
export const revalidate = 60;

export async function GET() {
  try {
    const components = COMPONENTS.flatMap((cat) =>
      cat.subcategories.flatMap((sub) =>
        sub.items.map((item) => ({
          name: toKebabCase(item.itemName || ""),
          displayName: item.itemName || "",
          category: cat.name || "",
          subcategory: sub.name || "",
          path: `venumity/components/${cat.slug}/${sub.slug}/${item.slug}`,
          type: "component" as const,
        })),
      ),
    );

    const primitives = PRIMITIVES.flatMap((cat) =>
      cat.subcategories.flatMap((sub) =>
        sub.items.map((item) => ({
          name: toKebabCase(item.slug || item.itemName),
          displayName: item.itemName || "",
          category: cat.name || "",
          subcategory: sub.name || "",
          path: `venumity/primitives/${cat.slug}/${sub.slug}/${item.slug}`,
          type: "primitive" as const,
        })),
      ),
    );

    const all = [...components, ...primitives];

    return NextResponse.json(
      { components: all, total: all.length },
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