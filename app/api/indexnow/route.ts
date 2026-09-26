// app/api/indexnow/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { website } from "@/lib/brand";
import { COMPONENTS } from "@/registry/components";
import { RESOURCE_CATEGORIES } from "@/registry/resources";
import { DOCS_DATA } from "@/registry/site/docs";
import { toKebabCase } from "@/utils/slug-kebab";

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "";
const SITE_URL = (website || "https://ui.venumity.com").replace(/\/$/, "");
const HOST = SITE_URL.replace(/^https?:\/\//, "");

const SEARCH_ENGINES = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
];

function collectAllUrls(): string[] {
  const urls = new Set<string>();

  [
    "",
    "/components",
    "/docs",
    "/resources",
    "/templates",
    "/thumbnails",
    "/changelog",
    "/videos",
    "/contributors",
    "/faq",
    "/cli",
    "/legal/license",
    "/legal/privacy",
    "/legal/terms",
    "/legal/refund",
  ].forEach((p) => urls.add(`${SITE_URL}${p}`));

  COMPONENTS.forEach((category) => {
    const catSlug = toKebabCase(category.name);
    category.subcategories.forEach((sub) => {
      const subSlug = toKebabCase(sub.name);
      urls.add(`${SITE_URL}/components/${catSlug}/${subSlug}`);
      sub.items.forEach((item) => {
        const itemSlug = toKebabCase(item.itemName);
        urls.add(`${SITE_URL}/components/${catSlug}/${subSlug}/${itemSlug}`);
      });
    });
  });

  DOCS_DATA.forEach((section) => {
    section.pages.forEach((page) => {
      if (page.published === false) return;
      urls.add(`${SITE_URL}/docs/${page.slug}`);
    });
  });

  RESOURCE_CATEGORIES.forEach((cat) => {
    cat.pages.forEach((page) => {
      if (!page.published) return;
      urls.add(`${SITE_URL}/resources/${cat.slug}/${toKebabCase(page.title)}`);
    });
  });

  try {
    const dir = path.join(process.cwd(), "public", "thumbnails");
    if (fs.existsSync(dir)) {
      fs.readdirSync(dir, { withFileTypes: true })
        .filter(
          (e) =>
            e.isFile() &&
            e.name.toLowerCase().endsWith(".webp") &&
            !e.name.startsWith("."),
        )
        .forEach((e) => {
          const name = e.name.replace(/\.webp$/i, "");
          urls.add(`${SITE_URL}/thumbnails/${name}`);
        });
    }
  } catch {
    /* ignore */
  }

  return Array.from(urls);
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function pingEngine(engine: string, urls: string[]) {
  const batches = chunk(urls, 500);

  const results = await Promise.allSettled(
    batches.map(async (urlChunk) => {
      const res = await fetch(engine, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          host: HOST,
          key: INDEXNOW_KEY,
          keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
          urlList: urlChunk,
        }),
      });
      return { status: res.status, ok: res.ok, size: urlChunk.length };
    }),
  );

  return {
    engine,
    batches: batches.length,
    results: results.map((r) =>
      r.status === "fulfilled"
        ? r.value
        : { status: 0, ok: false, size: 0, error: String(r.reason) },
    ),
  };
}

export async function POST(request: Request) {
  try {
    if (!INDEXNOW_KEY) {
      return NextResponse.json(
        {
          error:
            "INDEXNOW_KEY not configured. Add it to .env.local and keep public/<key>.txt in sync.",
        },
        { status: 500 },
      );
    }

    let body: { urlList?: string[] } = {};
    try {
      body = await request.json();
    } catch {
      /* empty body is fine — submit everything */
    }

    const urls =
      Array.isArray(body.urlList) && body.urlList.length > 0
        ? body.urlList.map((u) =>
            u.startsWith("http") ? u : `${SITE_URL}${u}`,
          )
        : collectAllUrls();

    if (urls.length === 0) {
      return NextResponse.json({ error: "No URLs to submit" }, { status: 400 });
    }

    const results = await Promise.all(
      SEARCH_ENGINES.map((engine) => pingEngine(engine, urls)),
    );

    const anyOk = results.some((r) => r.results.some((x) => x.ok));

    return NextResponse.json({
      success: anyOk,
      submitted: urls.length,
      engines: results,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      host: HOST,
    });
  } catch (error) {
    console.error("IndexNow error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  const res = await POST(
    new Request(`${SITE_URL}/api/indexnow`, { method: "POST" }),
  );
  return res;
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
