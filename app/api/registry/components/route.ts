import { COMPONENTS } from '@/registry/components';
import { NextResponse } from 'next/server';
import type { ComponentCategory, ComponentItem } from '@/registry/types';

// Utility to convert to kebab-case
function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function GET() {
  try {
    const components = (COMPONENTS as ComponentCategory[]).flatMap((cat: ComponentCategory) => {
      return cat.subcategories.flatMap((sub) => {
        return sub.items.map((item: ComponentItem) => ({
          name: toKebabCase(item.itemName || ''),
          displayName: item.itemName || '',
          category: cat.name || '',
          subcategory: sub.name || '',
          path: `venumity/${toKebabCase(cat.name)}/${toKebabCase(sub.name)}/${toKebabCase(item.itemName)}`,
          dependencies: item.dependencies || [],
          description: item.description || '',
        }));
      });
    });
    
    return NextResponse.json({
      components,
      total: components.length
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to fetch components: ${errorMessage}` },
      { status: 500 }
    );
  }
}