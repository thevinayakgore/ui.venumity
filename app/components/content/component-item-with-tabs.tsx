// app/components/content/component-item-with-tabs.tsx
"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FolderTree, Package } from "lucide-react";
import Overview from "./overview";
import FolderStructure from "./folder-structure";
import Setup from "./setup";
import { toKebabCase } from "@/utils/slug-kebab";
import { ComponentItemData } from "../[...slug]/page.client";

interface ComponentItemWithTabsProps {
  item: ComponentItemData; // Replace with proper type
  index: number;
}

export default function ComponentItemWithTabs({
  item,
  index,
}: ComponentItemWithTabsProps) {
  const itemSlugPath = `${toKebabCase(item.category)}/${toKebabCase(item.subcategory || "")}/${toKebabCase(item.itemName)}`;
  const componentFolderPath = `${toKebabCase(item.category)}/${toKebabCase(item.subcategory || "")}/${toKebabCase(item.itemName)}`;

  const showFolderStructure = item.hasFolderStructure;
  const showSetup = item.hasSetup;
  const showAnyExtra = showFolderStructure || showSetup;

  const [componentActiveTab, setComponentActiveTab] = useState<string>(
    showFolderStructure ? "structure" : showSetup ? "setup" : "",
  );

  return (
    <section
      key={`${item.itemName}-${index}`}
      id={toKebabCase(item.itemName)}
      className="scroll-mt-24 w-full"
    >
      {/* Component Overview */}
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

      {/* Component-specific Folder Structure & Installation */}
      {showAnyExtra && (
        <div className="w-full mt-8">
          <Tabs
            value={componentActiveTab}
            onValueChange={setComponentActiveTab}
            className="w-full"
          >
            <TabsList
              className={`grid mb-3 w-full bg-accent dark:bg-popover border border-foreground/3 rounded-md max-w-fit h-11! ${
                showFolderStructure && showSetup ? "grid-cols-2" : "grid-cols-1"
              }`}
            >
              {showFolderStructure && (
                <TabsTrigger
                  value="structure"
                  className="flex items-center gap-2 px-3! cursor-pointer rounded-sm"
                >
                  <FolderTree className="size-4" />
                  Structure
                </TabsTrigger>
              )}
              {showSetup && (
                <TabsTrigger
                  value="setup"
                  className="flex items-center gap-2 px-3! cursor-pointer rounded-sm"
                >
                  <Package className="size-4" />
                  Setup
                </TabsTrigger>
              )}
            </TabsList>

            {showFolderStructure && (
              <TabsContent value="structure">
                <FolderStructure
                  basePath={componentFolderPath}
                  componentName=""
                />
              </TabsContent>
            )}

            {showSetup && (
              <TabsContent value="setup">
                <Setup
                  componentName={item.itemName}
                  componentPath={componentFolderPath}
                  dependencies={item.techs || []}
                />
              </TabsContent>
            )}
          </Tabs>
        </div>
      )}
    </section>
  );
}
