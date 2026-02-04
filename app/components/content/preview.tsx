// app/components/content/preview.tsx
"use client";
import { useState, useEffect } from "react";
import { toKebabCase } from "@/utils/slug-kebab";

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

  useEffect(() => {
    const loadComponent = async () => {
      try {
        setLoading(true);
        setError(null);

        const kebabCategory = toKebabCase(category);
        const kebabSubcategory = subcategory ? toKebabCase(subcategory) : "";
        const kebabComponentName = toKebabCase(componentName);

        let importPath = "";

        if (subcategory && kebabSubcategory) {
          importPath = `@/components/venumity/${kebabCategory}/${kebabSubcategory}/${kebabComponentName}`;
        } else {
          importPath = `@/components/venumity/${kebabCategory}/${kebabComponentName}`;
        }

        console.log("Attempting to load from:", importPath);

        try {
          const importedModule = await import(/* @vite-ignore */ importPath);

          // Try different ways to find the component
          const ComponentToRender =
            importedModule.default ||
            importedModule[componentName as keyof typeof importedModule] ||
            importedModule[
              toKebabCase(componentName) as keyof typeof importedModule
            ];

          if (!ComponentToRender) {
            throw new Error(`Component not found in module at ${importPath}`);
          }

          setComponent(() => ComponentToRender);
        } catch (importError) {
          console.error("Import failed:", importError);
          throw importError;
        }
      } catch (err) {
        console.error("Failed to load component:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load component",
        );
        setComponent(null);
      } finally {
        setLoading(false);
      }
    };

    loadComponent();
  }, [category, subcategory, componentName]);

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
        </div>
      </div>
    );
  }

  if (!Component) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="text-muted-foreground">Component not available</div>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center m-auto overflow-auto w-full h-full">
      <Component />
    </main>
  );
}
