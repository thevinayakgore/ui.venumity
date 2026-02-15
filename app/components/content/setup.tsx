// app/components/content/setup.tsx
"use client";
import { useState, useEffect } from "react";
import CodeBlock from "@/components/site/common/code-block";
import { Separator } from "@/components/ui/separator";
import { toKebabCase } from "@/utils/slug-kebab";

interface SetupProps {
  componentName: string;
  componentPath?: string; // Make optional since we'll auto-detect
  dependencies?: string[];
}

export default function Setup({
  componentName,
  componentPath,
  dependencies = [],
}: SetupProps) {
  const [entryFileContent, setEntryFileContent] = useState<string>(""); // changed from string | null

  // Auto-detect and fetch the entry file (index.tsx or page.tsx)
  useEffect(() => {
    const fetchEntryFile = async () => {
      if (!componentPath) {
        return;
      }

      try {
        // Try to fetch index.tsx first
        let response = await fetch(
          `/api/components/file?path=${encodeURIComponent(`${componentPath}/index.tsx`)}`,
        );

        if (response.ok) {
          // Removed setEntryFileName("index.tsx");
        } else {
          // If index.tsx not found, try page.tsx
          response = await fetch(
            `/api/components/file?path=${encodeURIComponent(`${componentPath}/page.tsx`)}`,
          );
          if (response.ok) {
            // Removed setEntryFileName("page.tsx");
          } else {
            // No entry file found
            setEntryFileContent("// Entry file not found"); // changed from null
            return;
          }
        }

        const data = await response.json();
        setEntryFileContent(data.content);
      } catch (error) {
        console.error("Error fetching entry file:", error);
        setEntryFileContent("// Entry file not found"); // changed from null
      }
    };

    fetchEntryFile();
  }, [componentPath]);

  const utilsCode = `import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

  return (
    <main className="p-3 bg-foreground/3! border border-foreground/5 rounded-lg overflow-auto">
      {dependencies.length > 0 ? (
        <section className="flex flex-col items-start gap-5 w-full">
          <div className="flex flex-col gap-2 w-full">
            <h3 className="ml-1 text-sm font-medium">Install Dependencies</h3>
            <div className="border border-foreground/5 rounded-lg overflow-hidden">
              <CodeBlock
                code={`npm install ${dependencies.join(" ")}`}
                language="tsx"
              />
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-2 w-full">
            <h3 className="ml-1 text-sm font-medium">Add util file</h3>
            <span className="ml-1 text-sm font-medium opacity-70">
              lib/utils.ts
            </span>
            <div className="border border-foreground/5 rounded-lg overflow-hidden">
              <CodeBlock code={utilsCode} language="tsx" />
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-2 w-full">
            <h3 className="ml-1 text-sm font-medium">
              Copy-Paste the source code
            </h3>
            <span className="ml-1 text-sm font-medium font-mono p-2 bg-foreground/5 border border-foreground/5 opacity-90 rounded-sm leading-none w-fit">{`components/ui/${toKebabCase(componentName)}`}</span>
            <div className="border border-foreground/5 rounded-lg overflow-hidden">
              <CodeBlock code={entryFileContent} language="tsx" />
            </div>
          </div>
        </section>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No external dependencies required for this component.
        </div>
      )}
    </main>
  );
}
