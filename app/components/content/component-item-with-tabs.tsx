// app/components/content/component-item-with-tabs.tsx
"use client";
import Manual from "./manual";
import { useEffect, useMemo, useState } from "react";
import Overview from "./overview";
import { toKebabCase } from "@/utils/slug-kebab";
import { PencilRuler, Terminal } from "lucide-react";
import CodeBlock from "@/components/site/common/code-block";
import { ComponentItemData } from "../[...slug]/page.client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ComponentItemWithTabsProps {
  item: ComponentItemData;
  index: number;
}

// ─────────────────────────────────────────────────────────────
// PACKAGE MANAGER CONFIG
// ─────────────────────────────────────────────────────────────
type PackageManagerName = "npm" | "pnpm" | "yarn" | "bun";

interface PackageManagerConfig {
  name: PackageManagerName;
  label: string;
  command: (componentName: string) => string;
  activeClass: string;
  inactiveClass: string;
}

const packageManagers: PackageManagerConfig[] = [
  {
    name: "npm",
    label: "npm",
    command: (c) => `npx venumityui@latest add ${c}`,
    activeClass: "bg-background text-foreground border border-foreground/20",
    inactiveClass:
      "hover:bg-background hover:text-foreground border border-transparent hover:border-foreground/20",
  },
  {
    name: "pnpm",
    label: "pnpm",
    command: (c) => `pnpm dlx venumityui@latest add ${c}`,
    activeClass: "bg-background text-foreground border border-foreground/20",
    inactiveClass:
      "hover:bg-background hover:text-foreground border border-transparent hover:border-foreground/20",
  },
  {
    name: "yarn",
    label: "yarn",
    command: (c) => `yarn dlx venumityui@latest add ${c}`,
    activeClass: "bg-background text-foreground border border-foreground/20",
    inactiveClass:
      "hover:bg-background hover:text-foreground border border-transparent hover:border-foreground/20",
  },
  {
    name: "bun",
    label: "bun",
    command: (c) => `bunx venumityui@latest add ${c}`,
    activeClass: "bg-background text-foreground border border-foreground/20",
    inactiveClass:
      "hover:bg-background hover:text-foreground border border-transparent hover:border-foreground/20",
  },
];

// ─────────────────────────────────────────────────────────────
// GLOBAL PM PREFERENCE
//   - Shared across all component tabs on the page
//   - Persisted to localStorage
//   - Auto-detected from browser UA on first visit
// ─────────────────────────────────────────────────────────────
const PM_STORAGE_KEY = "venumity-pm-preference";
const PM_EVENT = "venumity-pm-change";

const isPackageManagerName = (v: string): v is PackageManagerName =>
  ["npm", "pnpm", "yarn", "bun"].includes(v);

function readStoredPM(): PackageManagerName | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(PM_STORAGE_KEY);
    return stored && isPackageManagerName(stored) ? stored : null;
  } catch {
    return null;
  }
}

function detectPMFromUA(): PackageManagerName {
  if (typeof window === "undefined") return "npm";
  const ua = window.navigator.userAgent.toLowerCase();
  if (ua.includes("pnpm")) return "pnpm";
  if (ua.includes("yarn")) return "yarn";
  if (ua.includes("bun")) return "bun";
  return "npm";
}

function writeStoredPM(pm: PackageManagerName) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PM_STORAGE_KEY, pm);
    // Notify all other component instances on the page
    window.dispatchEvent(new CustomEvent(PM_EVENT, { detail: pm }));
  } catch {
    // localStorage unavailable — ignore
  }
}

/**
 * Global, shared package manager state.
 * Any tab that changes PM updates every other tab on the page.
 */
function useGlobalPackageManager(): [
  PackageManagerName,
  (pm: PackageManagerName) => void,
] {
  const [pm, setPm] = useState<PackageManagerName>("npm");

  // Initialize from storage / UA on mount
  useEffect(() => {
    const timeout = setTimeout(() => {
      const stored = readStoredPM();
      setPm(stored ?? detectPMFromUA());
    }, 0); // change 0 to e.g. 300 or 500 if you want a real delay

    return () => clearTimeout(timeout);
  }, []);

  // Listen for changes from other instances
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<PackageManagerName>).detail;
      if (detail && isPackageManagerName(detail)) {
        setPm(detail);
      }
    };
    window.addEventListener(PM_EVENT, handler);
    return () => window.removeEventListener(PM_EVENT, handler);
  }, []);

  const update = (next: PackageManagerName) => {
    setPm(next);
    writeStoredPM(next);
  };

  return [pm, update];
}

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────
export default function ComponentItemWithTabs({
  item,
  index,
}: ComponentItemWithTabsProps) {
  const [componentActiveTab, setComponentActiveTab] = useState<string>("cli");

  // Shared + persisted PM preference across every tab on the page
  const [selectedPackageManager, setSelectedPackageManager] =
    useGlobalPackageManager();

  // Memoize slug paths — they never change for a given item
  const itemSlugPath = useMemo(
    () =>
      `${toKebabCase(item.category)}/${toKebabCase(item.subcategory || "")}/${toKebabCase(item.itemName)}`,
    [item.category, item.subcategory, item.itemName],
  );

  const componentFolderPath = useMemo(() => itemSlugPath, [itemSlugPath]);

  const showManual = Boolean(item.code);
  const showCli = true;
  const showAnyExtra = showCli || showManual;

  // Memoize the CLI command shown in the code block
  const currentCommand = useMemo(() => {
    const pm = packageManagers.find((p) => p.name === selectedPackageManager);
    return (
      pm?.command(toKebabCase(item.itemName)) ??
      `npx venumityui@latest add ${toKebabCase(item.itemName)}`
    );
  }, [selectedPackageManager, item.itemName]);

  // Memoize tab column count
  const tabCount = useMemo(
    () => [showCli, showManual].filter(Boolean).length,
    [showCli, showManual],
  );

  const tabGridClass = useMemo(() => {
    if (tabCount === 3) return "grid-cols-3";
    if (tabCount === 2) return "grid-cols-2";
    return "grid-cols-1";
  }, [tabCount]);

  return (
    <section
      key={`${item.itemName}-${index}`}
      id={toKebabCase(item.itemName)}
      className="scroll-mt-24 w-full"
    >
      <Overview
        itemName={item.itemName}
        componentName={item.category}
        component={item.itemName}
        description={item.description || ""}
        tags={item.tags || []}
        techs={item.techs || []}
        youtubeUrl={item.video}
        code={item.code}
        slugPath={itemSlugPath}
        subcategory={item.subcategory}
        isInListView={true}
        githubUsername={item.githubUsername}
      />

      {showAnyExtra && (
        <div className="w-full py-5 md:py-10 mb-5 md:mb-10 border-b">
          <Tabs
            value={componentActiveTab}
            onValueChange={setComponentActiveTab}
            className="w-full"
          >
            <TabsList
              className={`grid p-1.25 mb-3 w-full bg-accent dark:bg-popover border-0! rounded-lg max-w-fit! h-12! ${tabGridClass}`}
            >
              {showCli && (
                <TabsTrigger
                  value="cli"
                  className="flex items-center gap-2 px-3! border-0! data-active:bg-white! dark:data-active:bg-foreground/10! rounded-md"
                >
                  <Terminal className="size-4" />
                  CLI
                </TabsTrigger>
              )}
              {showManual && (
                <TabsTrigger
                  value="manual"
                  className="flex items-center gap-2 px-3! border-0! data-active:bg-white! dark:data-active:bg-foreground/10! rounded-md"
                >
                  <PencilRuler className="size-4" />
                  Manual
                </TabsTrigger>
              )}
            </TabsList>

            {showCli && (
              <TabsContent value="cli">
                <div className="p-1.5 bg-foreground/5 backdrop-blur-md rounded-xl">
                  <div className="flex items-center justify-between px-1.5 w-full">
                    <div className="flex items-center gap-1.5 pt-1 pb-2 text-xs font-semibold text-foreground/50">
                      <Terminal className="size-5 p-0.75 mr-1 bg-foreground/70 text-background rounded-[3px]" />
                      {packageManagers.map((pm) => (
                        <button
                          key={pm.name}
                          type="button"
                          onClick={() => setSelectedPackageManager(pm.name)}
                          className={`px-2 py-1 rounded-sm transition-all duration-200 ${
                            selectedPackageManager === pm.name
                              ? pm.activeClass
                              : pm.inactiveClass
                          }`}
                          aria-pressed={selectedPackageManager === pm.name}
                        >
                          {pm.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="border border-foreground/6 rounded-lg overflow-hidden">
                    <div>
                      <CodeBlock code={currentCommand} language="txt" />
                    </div>
                  </div>
                </div>
              </TabsContent>
            )}

            {showManual && item.code && (
              <TabsContent value="manual">
                <Manual
                  componentName={item.itemName}
                  componentPath={componentFolderPath}
                  code={item.code}
                />
              </TabsContent>
            )}
          </Tabs>
        </div>
      )}
    </section>
  );
}
