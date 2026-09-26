// app/api/registry/mcp/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-static";
export const revalidate = 3600; // refresh hourly; swap to 0 for always-fresh

interface McpComponent {
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  subcategorySlug: string;
  description: string;
  tags: string[];
  techs: string[];
  install: string;
  source: string;
  preview: string;
  thumbnail: string;
  video?: string;
  author?: string;
}

interface McpIndex {
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

// Cache the file read in memory across requests within the same function instance.
let cachedIndex: McpIndex | null = null;

function loadIndex(): McpIndex | null {
  if (cachedIndex) return cachedIndex;
  try {
    const filePath = path.join(process.cwd(), "public", "mcp.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    cachedIndex = JSON.parse(raw) as McpIndex;
    return cachedIndex;
  } catch {
    return null;
  }
}

// ── GET: discovery + capability listing ─────────────────────
export async function GET() {
  const index = loadIndex();
  if (!index) {
    return NextResponse.json(
      { error: "Registry not generated. Run `npm run generate-agents`." },
      { status: 503 },
    );
  }

  return NextResponse.json(
    {
      protocol: "mcp",
      version: "1.0",
      name: "venumity-ui",
      description: index.data.components.length + " React components",
      tools: index.tools.map((t) => ({
        name: t.name,
        description: t.description,
        inputSchema: t.inputSchema,
      })),
      counts: index.counts,
      generatedAt: index.generatedAt,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}

// ── POST: tool invocation ──────────────────────────────────
export async function POST(request: NextRequest) {
  const index = loadIndex();
  if (!index) {
    return NextResponse.json(
      { error: "Registry not generated." },
      { status: 503 },
    );
  }

  let body: { method?: string; params?: Record<string, unknown> };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { method, params = {} } = body;

  // ── Tool: search_components ──────────────────────────────
  if (method === "search_components" || method === "tools/call") {
    const toolName = method === "tools/call" ? (params.name as string) : method;

    if (toolName === "search_components") {
      const {
        query,
        category,
        subcategory,
        tag,
        tech,
        limit = 20,
      } = (params.arguments ?? params) as {
        query?: string;
        category?: string;
        subcategory?: string;
        tag?: string;
        tech?: string;
        limit?: number;
      };

      const q = query?.toLowerCase().trim();

      let results = index.data.components;

      if (category) {
        results = results.filter((c) => c.categorySlug === category);
      }
      if (subcategory) {
        results = results.filter((c) => c.subcategorySlug === subcategory);
      }
      if (tag) {
        const t = tag.toLowerCase();
        results = results.filter((c) =>
          c.tags.some((x) => x.toLowerCase() === t),
        );
      }
      if (tech) {
        const t = tech.toLowerCase();
        results = results.filter((c) =>
          c.techs.some((x) => x.toLowerCase() === t),
        );
      }
      if (q) {
        results = results.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q),
        );
      }

      const capped = results.slice(0, Math.max(1, Math.min(limit, 100)));

      return NextResponse.json({
        result: {
          total: results.length,
          returned: capped.length,
          components: capped,
        },
      });
    }

    // ── Tool: get_component ────────────────────────────────
    if (toolName === "get_component") {
      const { slug } = (params.arguments ?? params) as { slug?: string };
      if (!slug) {
        return NextResponse.json(
          { error: "Missing required field: slug" },
          { status: 400 },
        );
      }
      const component = index.data.components.find((c) => c.slug === slug);
      if (!component) {
        return NextResponse.json(
          { error: `No component found for slug "${slug}"` },
          { status: 404 },
        );
      }
      return NextResponse.json({ result: component });
    }

    // ── Tool: list_categories ──────────────────────────────
    if (toolName === "list_categories") {
      return NextResponse.json({ result: index.data.categories });
    }

    return NextResponse.json(
      { error: `Unknown tool: ${toolName}` },
      { status: 400 },
    );
  }

  return NextResponse.json(
    { error: `Unknown method: ${method}` },
    { status: 400 },
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept",
    },
  });
}
