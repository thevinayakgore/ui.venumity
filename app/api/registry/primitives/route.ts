// app/api/registry/primitives/route.ts
import { NextResponse } from "next/server";
import { PRIMITIVES } from "@/registry/primitives";

export const dynamic = "force-static";
export const revalidate = 60;

export async function GET() {
  const primitives = PRIMITIVES.flatMap((category) =>
    category.subcategories.flatMap((subcategory) =>
      subcategory.items.map((item) => ({
        name: item.itemName,
        slug: item.slug,
        category: category.name,
        categorySlug: category.slug,
        subcategory: subcategory.name,
        subcategorySlug: subcategory.slug,
        path: `venumity/primitives/${category.slug}/${subcategory.slug}/${item.slug}`,
        type: "primitive" as const,
      })),
    ),
  );

  return NextResponse.json(
    { primitives, total: primitives.length },
    {
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=60, must-revalidate",
      },
    },
  );
}
