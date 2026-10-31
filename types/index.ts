// types/index.ts
export * from "./components";
export * from "./primitives";

// ── Resources ─────────────────────────────────────────────
export interface ResourcePage {
  title: string;
  tags?: string[];
  newItem?: boolean;
  contentPath: string;
  description?: string;
  officialUrl?: string;
  coverImage?: string;
  authorNames?: string[];
}

export interface ResourceCategory {
  name: string;
  slug: string;
  description?: string;
  icon: string; // Added for sidebar
  pages: ResourcePage[];
  // Removed 'order' field
}

// ── MCP ───────────────────────────────────────────────────
export interface McpComponent {
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  subcategorySlug: string;
  description: string;
  tags: string[];
  install: string;
  source: string;
  preview: string;
  thumbnail: string;
  video?: string;
  author?: string;
}

export interface McpIndex {
  tools: Array<{
    name: string;
    description: string;
    inputSchema: Record<string, unknown>;
  }>;
  data: {
    categories: Array<{
      name: string;
      slug: string;
      count: number;
      subcategories: string[];
    }>;
    components: McpComponent[];
  };
  counts: { components: number; categories: number };
  generatedAt: string;
}

// ── Preview Resolver ─────────────────────────────────────
export interface ResolvedPreview {
  itemName: string;
  description: string;
  category: string;
  subcategory: string;
  categoryName: string;
  subcategoryName: string;
  slugPath: string;
  source?: "primitives" | "components";
}