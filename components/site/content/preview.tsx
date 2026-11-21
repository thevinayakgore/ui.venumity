// components/site/content/preview.tsx
"use client";
import { Button } from "@/components/ui/button";
import { toKebabCase } from "@/utils/slug-kebab";
import {
  useState,
  useEffect,
  useCallback,
  Component,
  type ReactNode,
  type ErrorInfo,
} from "react";

/* -------------------------------------------------------------------------- */
/*                            Error Boundary                                  */
/* -------------------------------------------------------------------------- */

interface ErrorBoundaryState {
  hasError: boolean;
  message: string | null;
}

class PreviewErrorBoundary extends Component<
  { children: ReactNode; onError?: (message: string) => void },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, message: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ComponentPreview] render error:", error, info);
    this.props.onError?.(error.message);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

/* -------------------------------------------------------------------------- */
/*                              Preview                                       */
/* -------------------------------------------------------------------------- */

interface ComponentPreviewProps {
  category: string;
  subcategory?: string | null;
  componentName: string;
  demoName?: string | null;
  source?: "primitives" | "components";
}

type PreviewStatus = "loading" | "ready" | "missing";

const PREVIEW_MODULE_CACHE = new Map<string, React.ComponentType | null>();

/**
 * A module export is only treated as a preview candidate if it:
 *  1. is a function or a forwardRef/memo object, AND
 *  2. looks like a component (has a name that starts with an uppercase letter,
 *     or is a forwardRef/memo wrapper — `.$$typeof` is present).
 */
function isRenderableComponent(value: unknown): boolean {
  if (typeof value === "function") {
    const name =
      (value as { name?: string; displayName?: string }).name ??
      (value as { displayName?: string }).displayName ??
      "";
    if (!name) return true;
    if (name.startsWith("use")) return false;
    if (name.startsWith("_")) return false;
    return true;
  }
  if (value && typeof value === "object") {
    const any = value as { $$typeof?: symbol };
    return Boolean(any.$$typeof);
  }
  return false;
}

function pickPreviewExport(
  mod: Record<string, unknown>,
  componentName: string,
): React.ComponentType | null {
  const pascalName = componentName
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");

  const candidates: unknown[] = [
    mod.default,
    mod[pascalName],
    mod[toKebabCase(componentName)],
  ];

  for (const candidate of candidates) {
    if (isRenderableComponent(candidate)) {
      return candidate as React.ComponentType;
    }
  }
  return null;
}

export default function ComponentPreview({
  category,
  subcategory,
  componentName,
  demoName,
  source,
}: ComponentPreviewProps) {
  const [status, setStatus] = useState<PreviewStatus>("loading");
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const cacheKey = `${source || "both"}|${toKebabCase(category)}|${toKebabCase(
    subcategory || "",
  )}|${toKebabCase(componentName)}|${toKebabCase(demoName || "")}`;

  const loadComponent = useCallback(async () => {
    setStatus("loading");
    setComponent(null);

    // 0. Module cache
    if (PREVIEW_MODULE_CACHE.has(cacheKey)) {
      const cached = PREVIEW_MODULE_CACHE.get(cacheKey);
      if (cached) {
        setComponent(() => cached);
        setStatus("ready");
      } else {
        setStatus("missing");
      }
      return;
    }

    const kebabCategory = toKebabCase(category);
    const kebabSubcategory = subcategory ? toKebabCase(subcategory) : "";
    const kebabComponentName = toKebabCase(componentName);
    const kebabDemoName = demoName ? toKebabCase(demoName) : "";

    let importedModule: Record<string, unknown> | null = null;

    // Helper to safely import from the new flat unified path
    const tryImport = async (path: string) => {
      try {
        return (await import(`@/components/venumity/${path}`)) as Record<
          string,
          unknown
        >;
      } catch {
        return null;
      }
    };

    if (kebabSubcategory) {
      // 1. Exact Variant / Item File
      // e.g. @/components/venumity/data-display/accordion/single-minimal-accordion.tsx
      if (!importedModule && kebabComponentName) {
        importedModule = await tryImport(
          `${kebabCategory}/${kebabSubcategory}/${kebabComponentName}.tsx`,
        );
      }

      // 2. Multi-file Component Folder
      // e.g. @/components/venumity/data-display/accordion/index.tsx
      if (!importedModule && kebabComponentName) {
        importedModule = await tryImport(
          `${kebabCategory}/${kebabSubcategory}/${kebabComponentName}/index.tsx`,
        );
      }

      // 3. Named Demo File
      // e.g. @/components/venumity/data-display/accordion/my-demo.tsx
      if (!importedModule && kebabDemoName && kebabDemoName !== "default") {
        importedModule = await tryImport(
          `${kebabCategory}/${kebabSubcategory}/${kebabDemoName}.tsx`,
        );
      }

      // 4. Default demo.tsx
      // e.g. @/components/venumity/data-display/accordion/demo.tsx
      if (!importedModule) {
        importedModule = await tryImport(
          `${kebabCategory}/${kebabSubcategory}/demo.tsx`,
        );
      }

      // 5. Subcategory Root Index
      // e.g. @/components/venumity/data-display/accordion/index.tsx
      if (!importedModule) {
        importedModule = await tryImport(
          `${kebabCategory}/${kebabSubcategory}/index.tsx`,
        );
      }
    }

    // 6. Fallback to shadcn ui directory
    if (!importedModule && kebabComponentName) {
      importedModule = await tryImport(`ui/${kebabComponentName}.tsx`);
    }

    if (!importedModule) {
      PREVIEW_MODULE_CACHE.set(cacheKey, null);
      setStatus("missing");
      return;
    }

    const picked = pickPreviewExport(importedModule, componentName);
    if (!picked) {
      PREVIEW_MODULE_CACHE.set(cacheKey, null);
      setStatus("missing");
      return;
    }

    PREVIEW_MODULE_CACHE.set(cacheKey, picked);
    setComponent(() => picked);
    setStatus("ready");
  }, [category, subcategory, componentName, demoName, cacheKey]);

  useEffect(() => {
    const id = setTimeout(() => void loadComponent(), 0);
    return () => clearTimeout(id);
  }, [loadComponent, refreshKey]);

  const handleRefresh = () => {
    PREVIEW_MODULE_CACHE.delete(cacheKey);
    setRefreshKey((p) => p + 1);
  };

  /* ---------- Loading ---------- */
  if (status === "loading") {
    return (
      <div className="flex min-h-full w-full items-center justify-center bg-background p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 animate-spin rounded-full border-3 border-primary border-t-transparent" />
          <span className="text-sm md:text-base text-foreground/50">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  /* ---------- Missing / fallback ---------- */
  if (status === "missing" || !Component) {
    return <NoPreviewFallback onRetry={handleRefresh} />;
  }

  /* ---------- Ready: render inside an error boundary ---------- */
  return (
    <PreviewErrorBoundary key={refreshKey} onError={() => setStatus("missing")}>
      <Component />
    </PreviewErrorBoundary>
  );
}

/* -------------------------------------------------------------------------- */
/*                          Fallback UI                                       */
/* -------------------------------------------------------------------------- */

function NoPreviewFallback({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex min-h-full w-full items-center justify-center bg-background p-4">
      <div className="p-6 bg-foreground/5 border border-foreground/10 rounded-lg max-w-md text-center">
        <div className="font-medium mb-2">No preview available</div>
        <div className="text-sm md:text-base text-foreground/50">
          This component doesn&apos;t have a demo yet.
        </div>
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-4">
          Retry
        </Button>
      </div>
    </div>
  );
}
