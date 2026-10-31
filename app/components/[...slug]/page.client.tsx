// app/components/[...slug]/page.client.tsx
"use client";
import { Badge } from "@/components/ui/badge";
import { toKebabCase } from "@/utils/slug-kebab";
import NoComponent from "@/app/no-component/page";
import { useEffect, useMemo, useState } from "react";
import Overview from "@/components/site/content/overview";
import PropsTable from "@/components/site/content/props-table";
import Installation from "@/components/site/content/installation";
import type {
  ComponentItem,
  ComponentCategory,
  ComponentSubcategory,
} from "@/types/components";
import {
  getCached,
  buildCacheKey,
  cachedFetchJson,
} from "@/utils/source-cache";

interface Props {
  category: ComponentCategory;
  subcategory: ComponentSubcategory;
}

interface SourceResponse {
  code?: string;
  name?: string;
  path?: string;
}

interface ItemFiles {
  kind: "multi" | "single";
  entry: string;
  entryCode: string;
  files: { path: string; content: string }[];
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

function useVariantSource(item: ComponentItem | null) {
  const [code, setCode] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!item || item.kind !== "variant") {
      const id = setTimeout(() => setLoaded(true), 0);
      return () => clearTimeout(id);
    }

    let cancelled = false;
    const timer = window.setTimeout(async () => {
      const key = buildCacheKey("source", "components", item.filePath);
      const etag = readETagFromSession(key);
      const url = `/api/components?${new URLSearchParams({
        action: "primitive-source",
        filePath: item.filePath,
        registry: "components",
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
        "components",
        categorySlug,
        subcategorySlug,
      );
      const etag = readETagFromSession(key);
      const url = `/api/components?${new URLSearchParams({
        action: "primitive-demo",
        category: categorySlug,
        subcategory: subcategorySlug,
        demo: "demo",
        registry: "components",
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

function useItemFiles(
  categorySlug: string | null,
  subcategorySlug: string | null,
  itemSlug: string | null,
) {
  const [data, setData] = useState<ItemFiles | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      if (!categorySlug || !subcategorySlug || !itemSlug) {
        setLoading(false);
        return;
      }
      const key = buildCacheKey(
        "item-files",
        "components",
        categorySlug,
        subcategorySlug,
        itemSlug,
      );
      const etag = readETagFromSession(key);
      const url = `/api/components?${new URLSearchParams({
        action: "item-files",
        registry: "components",
        category: categorySlug,
        subcategory: subcategorySlug,
        item: itemSlug,
      })}`;
      const { data: fresh } = await cachedFetchJson<ItemFiles>(key, url, etag);
      if (cancelled) return;
      if (fresh) setData(fresh);
      else {
        const hit = getCached<ItemFiles>(key, etag || "");
        if (hit) setData(hit);
      }
      setLoading(false);
    }, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [categorySlug, subcategorySlug, itemSlug]);

  return { data, loading };
}

/* -------------------------------------------------------------------------- */
/*                                Sub-blocks                                   */
/* -------------------------------------------------------------------------- */

function VariantExampleBlock({
  item,
  category,
  subcategory,
}: {
  item: ComponentItem;
  category: ComponentCategory;
  subcategory: ComponentSubcategory;
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
        source="components"
        cliSlug={item.slug}
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

function MultiItemBlock({
  item,
  category,
  subcategory,
}: {
  item: ComponentItem;
  category: ComponentCategory;
  subcategory: ComponentSubcategory;
}) {
  const { data, loading } = useItemFiles(
    category.slug,
    subcategory.slug,
    item.slug,
  );
  const entryCode = data?.entryCode || "";
  const isSingleFile = data?.kind === "single";
  const isMultiFile = data?.kind === "multi";
  const cliSlug = isSingleFile ? item.slug : undefined;

  return (
    <div id={item.slug} className="scroll-mt-24 flex flex-col gap-4 w-full">
      <h3 className="text-xl md:text-2xl font-medium tracking-tight md:px-3">
        {item.itemName}
      </h3>
      <Overview
        code={entryCode}
        cliSlug={cliSlug}
        source="components"
        title={item.itemName}
        itemName={item.itemName}
        component={item.itemName}
        componentName={category.slug}
        subcategory={subcategory.slug}
        previewComponentName={item.slug}
        githubUsername={item.githubUsername}
        slugPath={`${category.slug}/${subcategory.slug}/${item.slug}`}
      />
      {!loading && isMultiFile && data && (
        <Installation
          subcategorySlug={item.slug}
          filePath={`${category.slug}/${subcategory.slug}/${item.slug}/index.tsx`}
          registry="components"
          itemFiles={data.files}
        />
      )}
    </div>
  );
}

function MoreExampleBlock({
  fileName,
  category,
  subcategory,
}: {
  fileName: string;
  category: ComponentCategory;
  subcategory: ComponentSubcategory;
}) {
  const slug = toKebabCase(fileName);
  const fakeItem: ComponentItem = useMemo(
    () => ({
      itemName: fileName
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      slug,
      category: category.slug,
      subcategory: subcategory.slug,
      kind: "variant",
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
        source="components"
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
  const isMulti = subcategory.kind === "multi";
  const primaryItem = subcategory.items[0];

  const demo = useDemoSource(
    isMulti ? null : category.slug,
    isMulti ? null : subcategory.slug,
  );
  const firstItemSource = useVariantSource(
    !isMulti ? (primaryItem ?? null) : null,
  );
  const firstMultiItemFiles = useItemFiles(
    isMulti ? category.slug : null,
    isMulti ? subcategory.slug : null,
    isMulti ? (primaryItem?.slug ?? null) : null,
  );

  const examples = useMemo(() => subcategory.items, [subcategory.items]);
  const showProps =
    !isMulti && !!subcategory.props && subcategory.props.length > 0;
  const moreExamples = subcategory.moreExamples ?? [];

  // Wait for the appropriate fetch to complete
  const ready = isMulti
    ? !firstMultiItemFiles.loading
    : demo.loaded && firstItemSource.loaded;

  if (!ready) {
    return (
      <section className="flex min-h-80 items-center justify-center w-full">
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 animate-spin rounded-full border-3 border-primary border-t-transparent" />
          <span className="text-sm text-foreground/50">Loading…</span>
        </div>
      </section>
    );
  }

  const hasCode = isMulti
    ? Boolean(firstMultiItemFiles.data?.entryCode)
    : Boolean(demo.code || firstItemSource.code);

  if (!hasCode) return <NoComponent />;

  return (
    <section className="space-y-5 md:space-y-10 pb-5 md:pb-10 tracking-wide w-full">
      <header className="md:px-3 w-full">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-none">
          {subcategory.name}
        </h1>
        {subcategory.description && (
          <p className="mt-3 max-w-lg text-sm text-foreground/50 md:text-base">
            {subcategory.description}
          </p>
        )}
        {subcategory.tags && subcategory.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {subcategory.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="h-7! rounded-sm bg-foreground/5 px-3! text-xs font-medium capitalize text-foreground/80"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      {isMulti &&
        examples.map((item) => (
          <MultiItemBlock
            key={item.slug}
            item={item}
            category={category}
            subcategory={subcategory}
          />
        ))}

      {!isMulti && primaryItem && demo.code && (
        <>
          <Overview
            code={demo.code}
            source="components"
            previewComponentName="demo"
            componentName={category.slug}
            itemName={primaryItem.itemName}
            subcategory={subcategory.slug}
            component={primaryItem.itemName}
            githubUsername={primaryItem.githubUsername}
            slugPath={`${category.slug}/${subcategory.slug}/${primaryItem.slug}`}
          />
          <Installation
            subcategorySlug={subcategory.slug}
            filePath={primaryItem.filePath}
            registry="components"
          />
        </>
      )}

      {!isMulti && examples.length > 0 && firstItemSource.code && (
        <section className="flex flex-col gap-5 w-full">
          {demo.code && (
            <header className="md:px-3">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Examples
              </h2>
              <p className="mt-1 text-sm text-foreground/50 md:text-base">
                All variants from this collection.
              </p>
            </header>
          )}

          <div className="flex w-full flex-col gap-5 md:gap-10">
            {examples.map((example) => (
              <VariantExampleBlock
                key={example.slug}
                item={example}
                category={category}
                subcategory={subcategory}
              />
            ))}
          </div>
        </section>
      )}

      {!isMulti && moreExamples.length > 0 && hasCode && (
        <section className="flex flex-col gap-5 w-full">
          <header className="md:px-3">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              More Examples
            </h2>
            <p className="mt-1 text-sm text-foreground/50 md:text-base">
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

      {showProps && hasCode && (
        <section className="flex flex-col gap-5 w-full">
          <header className="md:px-3">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Props
            </h2>
            <p className="mt-1 text-sm text-foreground/50 md:text-base">
              All available props across every {subcategory.name.toLowerCase()}{" "}
              variant.
            </p>
          </header>
          <PropsTable props={subcategory.props || []} />
        </section>
      )}
    </section>
  );
}
