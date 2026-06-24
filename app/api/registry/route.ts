// app/api/registry/route.ts
import { COMPONENTS } from '@/registry/components';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = COMPONENTS.flatMap((category) =>
    category.subcategories.flatMap((subcategory) =>
      subcategory.items.map((item) => ({
        name: item.itemName,
        category: category.name,
        subcategory: subcategory.name,
        path: `venumity/${category.name}/${subcategory.name}/${item.itemName}`,
        dependencies: [],
        description: "",
      })),
    ),
  );
  
  return NextResponse.json(data);
}