// app/preview/[...slug]/page.client.tsx
"use client";
import { toKebabCase } from "@/utils/slug-kebab";
import NotFound from "@/components/site/common/not-found";
import { useState, useEffect, useMemo } from "react";
import ThemeToggle from "@/components/site/navigations/theme";
import { resolvePreviewBySlug } from "@/registry/registry-utils";
import ComponentPreview from "@/components/site/content/preview";

interface PreviewClientProps {
  slugPath: string;
}

export default function PreviewClient({ slugPath }: PreviewClientProps) {
  const [mounted, setMounted] = useState(false);

  const resolved = useMemo(() => resolvePreviewBySlug(slugPath), [slugPath]);

  // Take the LAST segment of slugPath — this is either a variant slug
  // (single-open-accordion) or the special "demo"
  const previewName = useMemo(() => {
    const parts = slugPath.split("/").filter(Boolean);
    return toKebabCase(parts[parts.length - 1] || "");
  }, [slugPath]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (url.searchParams.has("ref") || url.searchParams.has("source")) {
      url.searchParams.delete("ref");
      url.searchParams.delete("source");
      window.history.replaceState(null, "", url.toString());
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return <PreviewLoading />;

  if (!resolved) {
    return (
      <div className="flex items-center justify-center m-auto w-full max-w-4xl h-full">
        <NotFound />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center m-auto w-full min-h-screen">
      <ComponentPreview
        category={resolved.category}
        subcategory={resolved.subcategory}
        componentName={previewName}
        source={resolved.source}
      />
      <ThemeToggle />
    </div>
  );
}

function PreviewLoading() {
  return (
    <section className="bg-background flex items-center justify-center m-auto w-full min-h-screen">
      <div className="flex flex-col items-center gap-4 w-full h-full">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-foreground/10 border-t-primary rounded-full animate-spin" />
          <div className="absolute inset-0 border-4 border-transparent border-l-primary/30 rounded-full animate-spin animate-reverse" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-foreground font-medium">Loading preview</p>
          <p className="text-sm md:text-base text-foreground/50">
            Preparing the component environment...
          </p>
        </div>
      </div>
    </section>
  );
}
