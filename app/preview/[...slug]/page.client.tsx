// app/preview/[...slug]/page.client.tsx
"use client";
import { useState, useEffect, useMemo } from "react";
import { toKebabCase } from "@/utils/slug-kebab";
import NotFound from "@/app/components/not-found";
import ComponentPreview from "@/app/components/content/preview";
import { resolvePreviewBySlug } from "@/registry/component-utils";
import ThemeToggle from "@/components/site/navigations/theme-toggle";

interface PreviewClientProps {
  slugPath: string;
}

export default function PreviewClient({ slugPath }: PreviewClientProps) {
  const [mounted, setMounted] = useState(false);

  const resolved = useMemo(
    () => resolvePreviewBySlug(slugPath),
    [slugPath],
  );

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

  if (!mounted) {
    return <PreviewLoading />;
  }

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
        componentName={toKebabCase(resolved.itemName)}
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
          <p className="text-sm text-muted-foreground">
            Preparing the component environment...
          </p>
        </div>
      </div>
    </section>
  );
}