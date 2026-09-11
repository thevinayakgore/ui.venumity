// app/preview/[...slug]/page.client.tsx
"use client";
import { useState, useEffect } from "react";
import { toKebabCase } from "@/utils/slug-kebab";
import NotFound from "@/app/components/not-found";
import { COMPONENTS } from "@/registry/components";
import ComponentPreview from "@/app/components/content/preview";
import {
  findComponentBySlugPath,
  getComponentByPath,
} from "@/registry/component-utils";
import ThemeToggle from "@/components/site/navigations/theme-toggle";

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
      <div className="flex items-center justify-center m-auto w-full max-w-4xl h-full">
        <NotFound />
      </div>
    );
  }

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center justify-center m-auto w-full min-h-screen">
      {componentPath && (
        <ComponentPreview
          category={componentData.category}
          subcategory={componentData.subcategory}
          componentName={toKebabCase(componentData.itemName)}
        />
      )}
      <ThemeToggle />
    </div>
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
