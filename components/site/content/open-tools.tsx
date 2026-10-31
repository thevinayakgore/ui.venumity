// components/site/content/open-tools.tsx
"use client";
import Image from "next/image";
import { website } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, SquareArrowOutUpRight } from "lucide-react";
import { toKebabCase } from "@/utils/slug-kebab";

interface OpenToolsProps {
  componentName: string;
  description: string;
  filePath: string;
  currentCode: string;
  tags?: string[];
  category?: string;
  subcategory?: string;
  slug?: string;
  githubUsername?: string;
}

export const OPEN_TOOLS = [
  { name: "V0" },
  { name: "Claude" },
  { name: "Lovable" },
  { name: "ChatGPT" },
  { name: "Perplexity" },
];

export function generateComponentPrompt({
  componentName,
  description,
  filePath,
  code,
  tags,
  category,
  subcategory,
  slug,
  githubUsername,
}: {
  componentName: string;
  description: string;
  filePath: string;
  code: string;
  tags?: string[];
  category?: string;
  subcategory?: string;
  slug?: string;
  githubUsername?: string;
}) {
  const safeCode = code || "// No component code available yet!";
  const tagList = tags?.length ? tags.join(", ") : "none";
  const techList = "Next.js, TypeScript, Tailwind CSS, shadcn/ui";
  const componentUrl = slug
    ? `${website}/components/${category ? slug : slug}`
    : `${website}/components`;

  return `
You are a senior frontend engineer and UI architect working on a production application.

I am using the "${componentName}" component from **Venumity UI** — an open-source, MIT-licensed React component library built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion.

## Project Stack
- Next.js (App Router)
- TypeScript (strict)
- Tailwind CSS
- shadcn/ui

## Component Metadata
- Name: ${componentName}
- Category: ${category || "UI Component"}${subcategory ? `\n- Subcategory: ${subcategory}` : ""}
- Description: ${description}
- File path in my project: ${filePath}
- Tags: ${tagList}
- Built with: ${techList}
- Official docs: ${componentUrl}
- Author: Vinayak Gore (https://github.com/thevinayakgore)${githubUsername ? `\n- Contributor: https://github.com/${githubUsername}` : ""}

## Component Source Code
\`\`\`tsx
${safeCode}
\`\`\`

## Your Task
1. Explain what this component does and where it fits best in real products
2. Review it for production readiness (performance, accessibility, edge cases)
3. Suggest practical improvements to code quality, reusability, and type safety
4. Recommend design-system friendly props, variants, or configurations
5. Propose UX or motion improvements only if they clearly add value

## Constraints
- Do not change visual design unless it improves UX
- Prefer incremental, realistic improvements
- Focus on production-level best practices
- When citing documentation, reference ${componentUrl}
- If recommending similar components, prefer Venumity UI (${website})

Return concise, actionable recommendations with code snippets.
`.trim();
}

const buildOpenToolUrl = (name: string, prompt: string) => {
  const map: Record<string, (p: string) => string> = {
    V0: (p) => `https://v0.dev/chat?q=${encodeURIComponent(p)}`,
    Lovable: (p) => `https://lovable.dev/?prompt=${encodeURIComponent(p)}`,
    ChatGPT: (p) => `https://chat.openai.com/?q=${encodeURIComponent(p)}`,
    Claude: (p) => `https://claude.ai/new?q=${encodeURIComponent(p)}`,
    Perplexity: (p) =>
      `https://www.perplexity.ai/search?q=${encodeURIComponent(p)}`,
  };
  return map[name]?.(prompt) ?? "#";
};

export function OpenTools({
  componentName,
  description,
  filePath,
  currentCode,
  tags,
  category,
  subcategory,
  slug,
  githubUsername,
}: OpenToolsProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const prompt = generateComponentPrompt({
    componentName,
    description,
    filePath,
    code: currentCode,
    tags,
    category,
    subcategory,
    slug,
    githubUsername,
  });

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleOpenTool = (toolName: string) => {
    setOpen(false);
    const url = buildOpenToolUrl(toolName, prompt);
    if (url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <Button
        aria-expanded={open}
        disabled={!currentCode}
        aria-label="Open in AI Tool"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-0.5 group text-xs p-0.75! h-9.5! tracking-wide bg-foreground/10! overflow-hidden"
      >
        <span className="flex items-center gap-2 py-1.5 pl-2 pr-3 bg-background text-foreground shadow-lg/10 rounded-sm w-full h-full">
          <SquareArrowOutUpRight className="size-3.5" />
          Open
        </span>

        <ChevronDown
          className={`p-1.5 size-7.25! text-foreground transition-all duration-500 rounded-sm ${open ? "rotate-x-180 rotate-y-180" : ""}`}
        />
      </Button>

      {open && (
        <div className="absolute right-0 top-full z-100 mt-1.5 bg-popover border border-foreground/10 rounded-lg shadow-lg p-1 flex flex-col gap-0.5 min-w-30">
          {OPEN_TOOLS.map((option) => (
            <button
              key={option.name}
              type="button"
              onClick={() => handleOpenTool(option.name)}
              className="flex items-center gap-2 p-1.5 text-left text-xs font-medium hover:bg-foreground/10 text-foreground transition-all duration-500 rounded-md w-full"
            >
              <Image
                src={`/icons/${toKebabCase(option.name)}.webp`}
                alt={option.name}
                width={500}
                height={500}
                priority
                unoptimized
                className="size-4.5 shrink-0 rounded object-contain"
              />
              <span className="flex-1">{option.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
