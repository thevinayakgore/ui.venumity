// app/preview/[...slug]/page.client.tsx
"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { COMPONENTS } from "@/registry/components";
import { toKebabCase } from "@/utils/slug-kebab";
import ComponentPreview from "@/app/components/content/preview";
import NotFound from "@/app/components/not-found";
import { Button } from "@/components/ui/button";
import {
  findComponentBySlugPath,
  getComponentByPath,
} from "@/registry/component-utils";
import { ArrowLeft, Terminal } from "lucide-react";
import Link from "next/link";

interface PreviewClientProps {
  slugPath: string;
}

// Helper function to find component by multiple path strategies
const findComponent = (
  slugPath: string,
): ReturnType<typeof getComponentByPath> | null => {
  if (!slugPath) return null;

  const parts = slugPath.split("/").filter(Boolean);

  // Strategy 1: Direct path match
  const directMatch = getComponentByPath(slugPath);
  if (directMatch) return directMatch;

  // Strategy 2: Use our new finder
  const slugMatch = findComponentBySlugPath(slugPath);
  if (slugMatch) return slugMatch;

  // Strategy 3: Try to find in COMPONENTS array
  for (const category of COMPONENTS) {
    const categoryKebab = toKebabCase(category.name);

    for (const subcategory of category.subcategories) {
      for (const item of subcategory.items) {
        const itemKebab = toKebabCase(item.itemName);

        // Try different combinations
        if (parts.length === 2) {
          // format: /feedbacks/standard-alert
          if (categoryKebab === parts[0] && itemKebab === parts[1]) {
            return item;
          }
        }

        // Try with folderPath
        if (item.folderPath) {
          const folderParts = item.folderPath.split("/").filter(Boolean);
          if (folderParts.length >= 3) {
            // format: feedbacks/alert/standard-alert
            const folderKebab = folderParts
              .map((p) => toKebabCase(p))
              .join("/");
            if (folderKebab === slugPath) {
              return item;
            }

            // Try without first part
            const withoutCategory = folderParts.slice(1).join("/");
            if (toKebabCase(withoutCategory) === slugPath) {
              return item;
            }
          }
        }
      }
    }
  }

  return null;
};

export default function PreviewClient({ slugPath }: PreviewClientProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [componentData, setComponentData] = useState<ReturnType<
    typeof getComponentByPath
  > | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [componentPath, setComponentPath] = useState("");

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  // Get component data from registry
  useEffect(() => {
    if (!slugPath) return;

    const timer = setTimeout(() => {
      console.log("Looking for component with slug:", slugPath);

      const component = findComponent(slugPath);
      console.log("Found component:", component);

      if (component) {
        setComponentData(component);

        if (component.folderPath) {
          setComponentPath(component.folderPath);
        } else {
          const pathParts = [
            component.category,
            component.subcategory || "",
            toKebabCase(component.itemName),
          ].filter(Boolean);
          setComponentPath(pathParts.join("/"));
        }
      }

      setTimeout(() => setIsLoading(false), 500);
    }, 0);

    return () => clearTimeout(timer);
  }, [slugPath]);

  if (isLoading) {
    return <PreviewLoading />;
  }

  if (!componentData) {
    return (
      <div className="flex items-center justify-center m-auto w-full max-w-4xl min-h-screen">
        <NotFound />
      </div>
    );
  }

  if (!mounted) return null;

  return (
    <main className="flex flex-col items-center justify-center m-auto overflow-auto w-full min-h-screen">
      <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 z-10000! transform-gpu! flex items-center gap-2 p-2 bg-background border rounded-full">
        <Link href="/components">
          <Button
            variant="ghost"
            className="flex items-center gap-2 cursor-pointer text-foreground/60 hover:text-foreground rounded-full"
          >
            <ArrowLeft />
            <span>Components</span>
          </Button>
        </Link>
        <Button
          size="icon"
          variant="secondary"
          onClick={() =>
            setTheme(mounted && theme === "dark" ? "light" : "dark")
          }
          className="cursor-pointer bg-zinc-50! dark:bg-zinc-900! border rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4.5"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M12 3l0 18" />
            <path d="M12 9l4.65 -4.65" />
            <path d="M12 14.3l7.37 -7.37" />
            <path d="M12 19.6l8.85 -8.85" />
          </svg>
        </Button>
        <Button
          size="icon"
          variant="secondary"
          onClick={() => window.location.reload()}
          className="cursor-pointer bg-zinc-50! dark:bg-zinc-900! border rounded-full"
          title="Refresh preview"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4.5"
          >
            <path d="M21 12a9 9 0 1 1 -3 -6.7" />
            <path d="M21 3v6h-6" />
          </svg>
        </Button>
        <Link
          href={
            componentData?.subcategory
              ? `/components/${toKebabCase(componentData.category)}/${toKebabCase(componentData.subcategory)}`
              : `/components/${toKebabCase(componentData.category)}`
          }
        >
          <Button
            variant="secondary"
            className="flex items-center gpa-2 cursor-pointer bg-foreground! text-secondary! inset-shadow-sm inset-shadow-secondary/30 border-2 border-foreground rounded-full"
          >
            <Terminal />
            <span>Code</span>
          </Button>
        </Link>
      </footer>
      <section className="w-full h-full">
        {componentPath && (
          <ComponentPreview
            category={componentData.category}
            subcategory={componentData.subcategory}
            componentName={toKebabCase(componentData.itemName)}
          />
        )}
      </section>
    </main>
  );
}

// Loading component
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
