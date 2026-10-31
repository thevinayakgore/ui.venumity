// app/api/registry/categories/route.ts
import { NextResponse } from "next/server";
import { COMPONENTS } from "@/registry/components";
import { PRIMITIVES } from "@/registry/primitives";

export const dynamic = "force-static";
export const revalidate = 60;

export async function GET() {
  try {
    const categories = new Set<string>();

    COMPONENTS.forEach((comp) => {
      if (comp.name) categories.add(comp.name);
    });
    PRIMITIVES.forEach((prim) => {
      if (prim.name) categories.add(prim.name);
    });

    return NextResponse.json(
      { categories: Array.from(categories) },
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
      { error: `Failed to fetch categories: ${errorMessage}` },
      { status: 500 },
    );
  }
}