// app/components/content/preview.tsx
"use client";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { toKebabCase } from "@/utils/slug-kebab";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface ComponentPreviewProps {
  category: string;
  subcategory?: string | null;
  componentName: string;
}

export default function ComponentPreview({
  category,
  subcategory,
  componentName,
}: ComponentPreviewProps) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const pathname = usePathname();

  const loadComponent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const kebabCategory = toKebabCase(category);
      const kebabSubcategory = subcategory ? toKebabCase(subcategory) : "";
      const kebabComponentName = toKebabCase(componentName);

      let importedModule = null;
      let lastError = null;

      try {
        if (subcategory && kebabSubcategory) {
          // Try different import patterns for components with subcategory
          try {
            // Try file-based import (direct .tsx file)
            importedModule = await import(
              `@/components/venumity/${kebabCategory}/${kebabSubcategory}/${kebabComponentName}.tsx`
            );
          } catch {
            // Try folder-based import with index.tsx
            importedModule = await import(
              `@/components/venumity/${kebabCategory}/${kebabSubcategory}/${kebabComponentName}/index.tsx`
            );
          }
        } else {
          // Try different import patterns for components without subcategory
          try {
            // Try file-based import (direct .tsx file)
            importedModule = await import(
              `@/components/venumity/${kebabCategory}/${kebabComponentName}.tsx`
            );
          } catch {
            // Try folder-based import with index.tsx
            importedModule = await import(
              `@/components/venumity/${kebabCategory}/${kebabComponentName}/index.tsx`
            );
          }
        }
      } catch (e) {
        lastError = e;
        console.error("Import failed:", e);
      }

      if (!importedModule) {
        throw lastError || new Error(`Component not found`);
      }

      // Try different ways to find the component
      const ComponentToRender =
        importedModule.default ||
        importedModule[componentName as keyof typeof importedModule] ||
        importedModule[kebabComponentName as keyof typeof importedModule];

      if (!ComponentToRender) {
        throw new Error(`Component not found in module`);
      }

      setComponent(() => ComponentToRender);
    } catch (err) {
      console.error("Failed to load component:", err);
      setError(err instanceof Error ? err.message : "Failed to load component");
      setComponent(null);
    } finally {
      setLoading(false);
    }
  }, [category, subcategory, componentName]);

  useEffect(() => {
    loadComponent();
  }, [loadComponent, refreshKey]);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 animate-spin rounded-full border-3 border-primary border-t-transparent" />
          <span className="text-sm text-muted-foreground">
            Loading component...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full p-4">
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg max-w-md text-center">
          <div className="font-medium text-red-700 mb-2">
            Component Load Error
          </div>
          <div className="text-sm text-red-600 mb-4">{error}</div>
          <div className="text-xs text-gray-500">
            Path: {category}/{subcategory ? `${subcategory}/` : ""}
            {componentName}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!Component) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="text-muted-foreground">Component not available</div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          className="ml-4"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="overflow-auto h-full">
      <Button
        size="icon"
        variant="secondary"
        onClick={handleRefresh}
        className={`absolute top-4 right-4 z-100 transform-gpu bg-foreground/5 backdrop-blur-sm ${
          !pathname.startsWith("/components") && "hidden"
        } cursor-pointer transition-all duration-500 rounded-sm`}
        title="Refresh preview"
      >
        <RotateCcw />
      </Button>
      <Component key={refreshKey} />
    </div>
  );
}
