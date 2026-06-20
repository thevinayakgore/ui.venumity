// app/components/content/component-item-with-tabs.tsx
"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PencilRuler, Terminal } from "lucide-react";
import Overview from "./overview";
import { toKebabCase } from "@/utils/slug-kebab";
import { ComponentItemData } from "../[...slug]/page.client";
import Manual from "./manual";
import CodeBlock from "@/components/site/common/code-block";

interface ComponentItemWithTabsProps {
  item: ComponentItemData;
  index: number;
}

// Package manager configurations
const packageManagers = [
  {
    name: "npm",
    command: (componentName: string) =>
      `npx venumityui@latest add ${componentName}`,
    activeClass: "bg-background text-foreground border border-foreground/20",
    inactiveClass:
      "hover:bg-background hover:text-foreground border border-transparent hover:border-foreground/20",
  },
  // {
  //   name: "pnpm",
  //   command: (componentName: string) =>
  //     `pnpm dlx venumityui@latest add ${componentName}`,
  //   activeClass: "bg-background text-foreground border border-foreground/20",
  //   inactiveClass:
  //     "hover:bg-background hover:text-foreground border border-transparent hover:border-foreground/20",
  // },
  // {
  //   name: "yarn",
  //   command: (componentName: string) =>
  //     `yarn dlx venumityui@latest add ${componentName}`,
  //   activeClass: "bg-background text-foreground border border-foreground/20",
  //   inactiveClass:
  //     "hover:bg-background hover:text-foreground border border-transparent hover:border-foreground/20",
  // },
  // {
  //   name: "bun",
  //   command: (componentName: string) =>
  //     `bunx venumityui@latest add ${componentName}`,
  //   activeClass: "bg-background text-foreground border border-foreground/20",
  //   inactiveClass:
  //     "hover:bg-background hover:text-foreground border border-transparent hover:border-foreground/20",
  // },
];

export default function ComponentItemWithTabs({
  item,
  index,
}: ComponentItemWithTabsProps) {
  const itemSlugPath = `${toKebabCase(item.category)}/${toKebabCase(item.subcategory || "")}/${toKebabCase(item.itemName)}`;
  const componentFolderPath = `${toKebabCase(item.category)}/${toKebabCase(item.subcategory || "")}/${toKebabCase(item.itemName)}`;

  const showManual = Boolean(item.code);
  const showCli = true;
  const showAnyExtra = showCli || showManual;

  const [componentActiveTab, setComponentActiveTab] = useState<string>("cli");
  const [selectedPackageManager, setSelectedPackageManager] =
    useState<string>("npm");

  // Get the current command based on selected package manager
  const currentCommand =
    packageManagers
      .find((pm) => pm.name === selectedPackageManager)
      ?.command(toKebabCase(item.itemName)) ||
    `npx venumityui@latest add ${toKebabCase(item.itemName)}`;

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
              className={`grid p-1.25 mb-3 w-full bg-accent dark:bg-popover border-0! rounded-lg max-w-fit! h-12! ${
                [showCli, showManual].filter(Boolean).length === 3
                  ? "grid-cols-3"
                  : [showCli, showManual].filter(Boolean).length === 2
                    ? "grid-cols-2"
                    : "grid-cols-1"
              }`}
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
                          onClick={() => setSelectedPackageManager(pm.name)}
                          className={`px-2 py-1 rounded-sm transition-all duration-200 ${
                            selectedPackageManager === pm.name
                              ? pm.activeClass
                              : pm.inactiveClass
                          }`}
                        >
                          {pm.name}
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
