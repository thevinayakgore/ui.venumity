// app/api/registry/route.ts
import { NextResponse } from "next/server";
import { COMPONENTS } from "@/registry/components";
import { PRIMITIVES } from "@/registry/primitives";

export const dynamic = "force-static";
export const revalidate = 60;

export async function GET() {
  const componentData = COMPONENTS.flatMap((category) =>
    category.subcategories.flatMap((subcategory) =>
      subcategory.items.map((item) => ({
        name: item.itemName,
        slug: item.slug,
        category: category.name,
        subcategory: subcategory.name,
        path: `venumity/components/${category.slug}/${subcategory.slug}/${item.slug}`,
        dependencies: [],
        type: "component" as const,
      })),
    ),
  );

  const primitiveData = PRIMITIVES.flatMap((category) =>
    category.subcategories.flatMap((subcategory) =>
      subcategory.items.map((item) => ({
        name: item.itemName,
        slug: item.slug,
        category: category.name,
        subcategory: subcategory.name,
        path: `venumity/primitives/${category.slug}/${subcategory.slug}/${item.slug}`,
        dependencies: [],
        type: "primitive" as const,
      })),
    ),
  );

  return NextResponse.json([...componentData, ...primitiveData], {
    headers: {
      "Cache-Control": "public, max-age=60, s-maxage=60, must-revalidate",
    },
  });
}