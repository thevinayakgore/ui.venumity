// app/api/featured-components/route.ts
import { NextResponse } from "next/server";
import { COMPONENTS } from "@/registry/components";
import type { ComponentCategory, ComponentItem } from "@/registry/types";

// Helper to convert to kebab-case
function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Hardcoded list of featured component names (20 components)
const FEATURED_COMPONENT_NAMES = [
  "summary-block",
  "enhance-mail",
  "profile-card-1",
  "gradient-spotlight-1",
  "system-status-badge",
  "range-sparkline",
  "personal-panel-1",
  "sortable-table",
  "filters-table",
  "real-time-filterable-table",
  "pricing-table-2",
  "masonry-image-gallery",
  "snackbar-1",
  "full-page-loader",
  "carousel-testimonial-2",
  "premium-wave-loader",
  "standard-footer",
  "dashboard-skeleton-loader",
  "editable-table",
  "shiny-button-loader",
];

// Types
interface ComponentMeta {
  name: string;
  displayName: string;
  category: string;
  subcategory: string;
  description: string;
  dependencies: string[];
  tags: string[];
}

interface FeaturedComponent {
  name: string;
  displayName: string;
  category: string;
  subcategory: string;
  description: string;
  thumbnail: string;
  componentUrl: string;
  dependencies: string[];
  tags: string[];
  code: string | null;
  files?: Array<{ path: string; content: string }>;
  isFolder: boolean;
}

interface ComponentCodeResponse {
  code: string | null;
  files?: Array<{ path: string; content: string }>;
  isFolder: boolean;
}

// Build component map from registry with tags from subcategory
function buildComponentMap(): Map<string, ComponentMeta> {
  const map = new Map<string, ComponentMeta>();

  (COMPONENTS as ComponentCategory[]).forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      // Get tags from subcategory level
      const subcategoryTags = subcategory.tags || [];

      subcategory.items.forEach((item: ComponentItem) => {
        const kebabName = toKebabCase(item.itemName || "");
        map.set(kebabName, {
          name: kebabName,
          displayName: item.itemName || "",
          category: category.name || "",
          subcategory: subcategory.name || "",
          description: item.description || `${item.itemName || ""} component`,
          dependencies: item.dependencies || [],
          tags: subcategoryTags, // Tags from subcategory
        });
      });
    });
  });

  return map;
}

// Get base URL for internal API calls
function getBaseUrl(): string {
  if (process.env.NODE_ENV === "production") {
    return "https://ui.venumity.com";
  }
  return "http://localhost:3000";
}

// Fetch component code from the components API
async function fetchComponentCode(
  category: string,
  subcategory: string,
  componentName: string,
): Promise<ComponentCodeResponse> {
  const baseUrl = getBaseUrl();
  const path = `/api/components/${encodeURIComponent(category)}/${encodeURIComponent(subcategory)}/${encodeURIComponent(componentName)}`;
  const url = `${baseUrl}${path}`;

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return { code: null, isFolder: false };
    }

    const data = (await res.json()) as ComponentCodeResponse;
    return {
      code: data.code || null,
      files: data.files || undefined,
      isFolder: data.isFolder || false,
    };
  } catch (error) {
    console.error(`Error fetching code for ${componentName}:`, error);
    return { code: null, isFolder: false };
  }
}

export async function GET() {
  try {
    // 1. Build component map from registry (with tags from subcategory)
    const componentMap = buildComponentMap();

    // 2. Build featured components list with metadata
    const featuredComponents: FeaturedComponent[] = [];
    const componentsToFetch: Array<{
      index: number;
      category: string;
      subcategory: string;
      name: string;
    }> = [];

    for (const name of FEATURED_COMPONENT_NAMES) {
      const comp = componentMap.get(name);
      if (comp) {
        const index = featuredComponents.length;
        featuredComponents.push({
          name: comp.name,
          displayName: comp.displayName || comp.name,
          category: comp.category || "Uncategorized",
          subcategory: comp.subcategory || "General",
          description:
            comp.description || `${comp.displayName || comp.name} component`,
          thumbnail: `https://ui.venumity.com/thumbnails/${comp.name}.png`,
          componentUrl: `https://ui.venumity.com/component/${comp.name}`,
          dependencies: comp.dependencies || [],
          tags: comp.tags || [], // Tags from subcategory
          code: null,
          files: undefined,
          isFolder: false,
        });

        componentsToFetch.push({
          index,
          category: comp.category,
          subcategory: comp.subcategory,
          name: comp.name,
        });
      }
    }

    // 3. Fetch code for all featured components in parallel
    const codePromises = componentsToFetch.map(
      async ({ index, category, subcategory, name }) => {
        const result = await fetchComponentCode(category, subcategory, name);
        featuredComponents[index].code = result.code;
        featuredComponents[index].isFolder = result.isFolder;
        if (result.files) {
          featuredComponents[index].files = result.files;
        }
      },
    );

    await Promise.all(codePromises);

    // 4. Filter out components that couldn't be found (no code)
    const validComponents = featuredComponents.filter((c) => c.code !== null);

    return NextResponse.json(
      {
        success: true,
        total: validComponents.length,
        featuredCount: FEATURED_COMPONENT_NAMES.length,
        components: validComponents,
        metadata: {
          endpoint: "featured-components",
          version: "1.0.0",
          lastUpdated: new Date().toISOString(),
          source: "registry-api",
        },
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch featured components",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      },
    );
  }
}

// Enable CORS for cross-origin requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
