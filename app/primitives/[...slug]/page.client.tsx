// app/primitives/[...slug]/page.client.tsx
"use client";
import { Badge } from "@/components/ui/badge";
import { toKebabCase } from "@/utils/slug-kebab";
import NoComponent from "@/app/no-component/page";
import Usage from "@/components/site/content/usage";
import { useMemo, useEffect, useState } from "react";
import Overview from "@/components/site/content/overview";
import PropsTable from "@/components/site/content/props-table";
import Installation from "@/components/site/content/installation";
import type {
  PrimitiveCategory,
  PrimitiveItem,
  PrimitiveSubcategory,
} from "@/types/primitives";
import {
  buildCacheKey,
  cachedFetchJson,
  getCached,
} from "@/utils/source-cache";

interface Props {
  category: PrimitiveCategory;
  subcategory: PrimitiveSubcategory;
}

interface SourceResponse {
  code?: string;
  name?: string;
  path?: string;
}

/* -------------------------------------------------------------------------- */
/*                                  Hooks                                      */
/* -------------------------------------------------------------------------- */

function readETagFromSession(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(key);
    if (!raw) return null;
    return (JSON.parse(raw) as { etag: string }).etag ?? null;
  } catch {
    return null;
  }
}

function useVariantSource(item: PrimitiveItem | null) {
  const [code, setCode] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!item) {
      const id = setTimeout(() => setLoaded(true), 0);
      return () => clearTimeout(id);
    }

    let cancelled = false;
    const timer = window.setTimeout(async () => {
      const key = buildCacheKey("source", "primitives", item.filePath);
      const etag = readETagFromSession(key);

      const url = `/api/components?${new URLSearchParams({
        action: "primitive-source",
        filePath: item.filePath,
        registry: "primitives",
      })}`;

      const { data: fresh } = await cachedFetchJson<SourceResponse>(
        key,
        url,
        etag,
      );

      if (cancelled) return;

      if (fresh) setCode(fresh.code || "");
      else {
        const hit = getCached<SourceResponse>(key, etag || "");
        if (hit) setCode(hit.code || "");
      }
      setLoaded(true);
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [item]);

  return { code, loaded };
}

function useDemoSource(
  categorySlug: string | null,
  subcategorySlug: string | null,
) {
  const [code, setCode] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!categorySlug || !subcategorySlug) {
      const id = setTimeout(() => setLoaded(true), 0);
      return () => clearTimeout(id);
    }

    let cancelled = false;
    const timer = window.setTimeout(async () => {
      const key = buildCacheKey(
        "demo",
        "primitives",
        categorySlug,
        subcategorySlug,
      );
      const etag = readETagFromSession(key);

      const url = `/api/components?${new URLSearchParams({
        action: "primitive-demo",
        category: categorySlug,
        subcategory: subcategorySlug,
        demo: "demo",
        registry: "primitives",
      })}`;

      const { data: fresh } = await cachedFetchJson<SourceResponse>(
        key,
        url,
        etag,
      );

      if (cancelled) return;

      if (fresh) setCode(fresh.code || "");
      else {
        const hit = getCached<SourceResponse>(key, etag || "");
        if (hit) setCode(hit.code || "");
      }
      setLoaded(true);
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [categorySlug, subcategorySlug]);

  return { code, loaded };
}

/* -------------------------------------------------------------------------- */
/*                                Sub-blocks                                   */
/* -------------------------------------------------------------------------- */

function ExampleBlock({
  item,
  category,
  subcategory,
}: {
  item: PrimitiveItem;
  category: PrimitiveCategory;
  subcategory: PrimitiveSubcategory;
}) {
  const { code } = useVariantSource(item);

  return (
    <div id={item.slug} className="scroll-mt-24 flex flex-col gap-4 w-full">
      <h3 className="text-xl md:text-2xl font-medium tracking-tight md:px-3">
        {item.itemName}
      </h3>
      <Overview
        hideTitle
        code={code}
        source="primitives"
        title={item.itemName}
        itemName={item.itemName}
        component={item.itemName}
        componentName={category.slug}
        subcategory={subcategory.slug}
        previewComponentName={item.slug}
        githubUsername={item.githubUsername}
        slugPath={`${category.slug}/${subcategory.slug}/${item.slug}`}
      />
    </div>
  );
}

function MoreExampleBlock({
  fileName,
  category,
  subcategory,
}: {
  fileName: string;
  category: PrimitiveCategory;
  subcategory: PrimitiveSubcategory;
}) {
  const slug = toKebabCase(fileName);
  const fakeItem: PrimitiveItem = useMemo(
    () => ({
      itemName: fileName
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      slug,
      category: category.slug,
      subcategory: subcategory.slug,
      filePath: `${category.slug}/${subcategory.slug}/${slug}.tsx`,
      folderPath: `${category.slug}/${subcategory.slug}`,
    }),
    [fileName, slug, category.slug, subcategory.slug],
  );

  const { code } = useVariantSource(fakeItem);

  return (
    <div id={slug} className="scroll-mt-24 flex flex-col gap-4 w-full">
      <h3 className="text-xl md:text-2xl font-medium tracking-tight md:px-3">
        {fakeItem.itemName}
      </h3>
      <Overview
        hideTitle
        code={code}
        source="primitives"
        title={fakeItem.itemName}
        previewComponentName={slug}
        itemName={fakeItem.itemName}
        componentName={category.slug}
        component={fakeItem.itemName}
        subcategory={subcategory.slug}
        slugPath={`${category.slug}/${subcategory.slug}/${slug}`}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Page                                       */
/* -------------------------------------------------------------------------- */

export default function PageClient({ category, subcategory }: Props) {
  const primaryItem = subcategory.items[0];
  const demo = useDemoSource(category.slug, subcategory.slug);
  const firstItemSource = useVariantSource(primaryItem ?? null);

  const examples = useMemo(() => subcategory.items, [subcategory.items]);
  const showProps = !!subcategory.props && subcategory.props.length > 0;
  const moreExamples = subcategory.moreExamples ?? [];

  // Wait for both fetches before deciding anything
  const ready = demo.loaded && firstItemSource.loaded;

  if (!ready) {
    return (
      <section className="flex min-h-80 items-center justify-center w-full">
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 animate-spin rounded-full border-3 border-primary border-t-transparent" />
          <span className="text-sm text-muted-foreground">Loading…</span>
        </div>
      </section>
    );
  }

  // If neither the demo nor the first item has code, hide the whole page.
  const hasCode = Boolean(demo.code || firstItemSource.code);
  if (!hasCode) return <NoComponent />;

  return (
    <section className="tracking-wide pb-3 sm:pb-5 md:pb-10 w-full">
      <header className="mb-5 md:px-3 w-full">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-none">
          {subcategory.name}
        </h1>

        {subcategory.description && (
          <p className="text-sm md:text-base text-muted-foreground mt-3 max-w-3xl">
            {subcategory.description}
          </p>
        )}

        {subcategory.tags && subcategory.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {subcategory.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="h-7! px-3! text-xs capitalize bg-foreground/5 text-foreground/80 font-medium rounded-sm"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      {primaryItem && demo.code && (
        <section className="mb-5 md:mb-10 w-full">
          <Overview
            code={demo.code}
            source="primitives"
            previewComponentName="demo"
            componentName={category.slug}
            subcategory={subcategory.slug}
            itemName={primaryItem.itemName}
            component={primaryItem.itemName}
            githubUsername={primaryItem.githubUsername}
            slugPath={`${category.slug}/${subcategory.slug}/${primaryItem.slug}`}
          />
        </section>
      )}

      {primaryItem && demo.code && (
        <section className="mb-5 md:mb-10 w-full">
          <Installation
            subcategorySlug={subcategory.slug}
            filePath={primaryItem.filePath}
            registry="primitives"
          />
        </section>
      )}

      {subcategory.usage && (
        <section className="mb-5 md:mb-10 w-full">
          <Usage code={subcategory.usage} subcategorySlug={subcategory.slug} />
        </section>
      )}

      {examples.length > 0 && firstItemSource.code && (
        <section className="mb-5 md:mb-10 flex flex-col gap-5 w-full">
          <header className="md:px-3">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Examples
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              All {subcategory.name.toLowerCase()} variants from this
              collection.
            </p>
          </header>
          <div className="flex flex-col gap-5 md:gap-10 w-full">
            {examples.map((ex) => (
              <ExampleBlock
                key={ex.slug}
                item={ex}
                category={category}
                subcategory={subcategory}
              />
            ))}
          </div>
        </section>
      )}

      {showProps && hasCode && (
        <section className="flex flex-col gap-5 w-full">
          <header className="md:px-3">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Props
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              All available props across every {subcategory.name.toLowerCase()}{" "}
              variant.
            </p>
          </header>
          <PropsTable props={subcategory.props || []} />
        </section>
      )}

      {moreExamples.length > 0 && hasCode && (
        <section className="my-5 md:my-10 flex flex-col gap-5 w-full">
          <header className="md:px-3">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              More Examples
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              Additional more useful examples.
            </p>
          </header>
          <div className="flex flex-col gap-5 md:gap-10 w-full">
            {moreExamples.map((f) => (
              <MoreExampleBlock
                key={f}
                fileName={f}
                category={category}
                subcategory={subcategory}
              />
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
