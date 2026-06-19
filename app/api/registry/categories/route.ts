import { COMPONENTS } from '@/registry/components';
import { NextResponse } from 'next/server';
import type { ComponentCategory } from '@/registry/types';

export async function GET() {
  try {
    const categories = new Set<string>();
    
    // Type assertion for COMPONENTS
    const components = COMPONENTS as ComponentCategory[];
    components.forEach((comp: ComponentCategory) => {
      if (comp.name) {
        categories.add(comp.name);
      }
    });
    
    return NextResponse.json({
      categories: Array.from(categories)
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to fetch categories: ${errorMessage}` },
      { status: 500 }
    );
  }
}