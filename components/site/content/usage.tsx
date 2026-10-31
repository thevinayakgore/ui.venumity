// components/site/content/usage.tsx
"use client";
import { useMemo } from "react";
import CodeBlock from "@/components/utility/code-block";
import { rewriteVenumityImports } from "@/utils/import-rewrite";

interface UsageProps {
  code: string;
  subcategorySlug?: string;
}

export default function Usage({ code, subcategorySlug }: UsageProps) {
  const displayCode = useMemo(() => {
    if (!code) return "";
    if (!subcategorySlug) return code;
    return rewriteVenumityImports(code, subcategorySlug);
  }, [code, subcategorySlug]);

  if (!code || !subcategorySlug) {
    return (
      <div className="flex flex-col gap-3 md:gap-5 w-full">
        <header className="mb-2 md:px-3">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
            Usage
          </h2>
          <p className="text-sm md:text-base text-foreground/50 mt-1">
            Import and use this component in your project.
          </p>
        </header>
        <div className="p-6 bg-foreground/5 rounded-lg md:rounded-xl text-center text-sm md:text-base text-foreground/50">
          No usage example available yet.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 md:gap-5 w-full">
      <header className="mb-2 md:px-3">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
          Usage
        </h2>
        <p className="text-sm md:text-base text-foreground/50 mt-1">
          Import and use this component in your project.
        </p>
      </header>
      <div className="p-1 md:p-2 bg-foreground/5 backdrop-blur-md inset-shadow-sm inset-shadow-foreground/15 rounded-xl md:rounded-2xl w-full">
        <div className="border border-foreground/5 shadow-lg/8 rounded-lg md:rounded-xl overflow-hidden w-full">
          <CodeBlock code={displayCode} language="tsx" />
        </div>
      </div>
    </div>
  );
}
