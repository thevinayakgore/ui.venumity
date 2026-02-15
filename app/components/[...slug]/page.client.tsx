// app/components/[...slug]/page.client.tsx
"use client";
import { useState, useEffect, useMemo } from "react";
import { fetchComponentCode } from "@/utils/api-client";
import { toKebabCase } from "@/utils/slug-kebab";
import { COMPONENTS } from "@/registry/components";
import Overview from "../content/overview";
import FolderStructure from "../content/folder-structure";
import Setup from "../content/setup";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  ComponentSubcategory,
  ComponentItem,
} from "@/registry/component-utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FolderTree, Package } from "lucide-react";
import ComponentItemWithTabs from "../content/component-item-with-tabs";

export interface ComponentItemData extends ComponentItem {
  code?: string;
}

interface PageClientProps {
  component: ComponentItemData | null;
  slugPath: string;
  subcategoryData?: ComponentSubcategory | null;
}

function getSubcategoryItems(
  categorySlug: string,
  subcategorySlug: string,
): ComponentItemData[] {
  const category = COMPONENTS.find(
    (c) => toKebabCase(c.name) === toKebabCase(categorySlug),
  );
  if (!category) return [];

  const subcategory = category.subcategories.find(
    (s) => toKebabCase(s.name) === toKebabCase(subcategorySlug),
  );

  if (!subcategory) return [];

  return subcategory.items.map((item) => ({
    ...item,
    category: category.name,
    subcategory: subcategory.name,
  }));
}

export default function PageClient({
  component,
  slugPath,
  subcategoryData,
}: PageClientProps) {
  const [mounted, setMounted] = useState(false);
  const [componentData, setComponentData] = useState<ComponentItemData | null>(
    null,
  );
  const [subcategoryItemsWithCode, setSubcategoryItemsWithCode] = useState<
    ComponentItemData[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [isSubcategoryPage, setIsSubcategoryPage] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("");

  const pathInfo = useMemo(() => {
    const parts = slugPath.split("/").filter(Boolean);
    return {
      parts,
      isSubcategory: parts.length === 2,
      isComponent: parts.length >= 3,
      category: parts[0] || "",
      subcategory: parts[1] || "",
      componentName: parts.length >= 3 ? parts.slice(2).join("/") : "",
    };
  }, [slugPath]);

  // Load data based on path type
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      try {
        if (pathInfo.isSubcategory) {
          // Load subcategory page (list of components)
          setIsSubcategoryPage(true);

          const items = getSubcategoryItems(
            pathInfo.category,
            pathInfo.subcategory,
          );

          const itemsWithCode = await Promise.all(
            items.map(async (item) => {
              try {
                const code = await fetchComponentCode(
                  toKebabCase(item.category),
                  `${toKebabCase(item.subcategory || "")}/${toKebabCase(item.itemName)}`,
                );
                return { ...item, code: code || undefined };
              } catch {
                return { ...item, code: undefined };
              }
            }),
          );

          setSubcategoryItemsWithCode(itemsWithCode);

          // Set default tab for subcategory if it has folder structure/installation
          if (
            subcategoryData?.hasFolderStructure ||
            subcategoryData?.hasSetup
          ) {
            setActiveTab(
              subcategoryData?.hasFolderStructure
                ? "structure"
                : "installation",
            );
          }
        } else if (pathInfo.isComponent && component) {
          // Load single component page
          setIsSubcategoryPage(false);

          const rawCode = await fetchComponentCode(
            toKebabCase(component.category),
            `${toKebabCase(component.subcategory || "")}/${toKebabCase(component.itemName)}`,
          );

          const updatedComponent = { ...component, code: rawCode || undefined };
          setComponentData(updatedComponent);

          // Set default tab for component if it has folder structure/installation
          if (
            updatedComponent.hasFolderStructure ||
            updatedComponent.hasSetup
          ) {
            setActiveTab(
              updatedComponent.hasFolderStructure
                ? "structure"
                : "installation",
            );
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [component, slugPath, pathInfo, subcategoryData]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-3 border-primary border-t-transparent" />
      </div>
    );
  }

  // ==================== SUBCATEGORY PAGE VIEW ====================
  if (isSubcategoryPage && subcategoryItemsWithCode.length > 0) {
    return (
      <main className="w-full">
        <header className="mb-6 pb-6 border-b border-dashed w-full">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-3xl md:text-4xl font-bold capitalize tracking-tight leading-none opacity-90">
              {subcategoryData?.name ?? pathInfo.subcategory.replace(/-/g, " ")}
            </h1>
            {subcategoryData?.techs && (
              <div className="flex items-center flex-wrap gap-1 h-full">
                {subcategoryData.techs.map((tech, index) => (
                  <div
                    key={`${tech}-${index}`}
                    className="flex items-center justify-center size-7 p-0.5 rounded border bg-foreground/3 overflow-hidden"
                    title={tech}
                  >
                    <Image
                      src={`/icons/${tech.toLowerCase().replace(/[.\-\s]/g, "")}.png`}
                      alt={tech}
                      width={500}
                      height={500}
                      className="object-cover rounded-[3px] w-full h-full"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <p className="text-muted-foreground capitalize mt-2">
            {subcategoryItemsWithCode.length} component
            {subcategoryItemsWithCode.length !== 1 ? "s" : ""} •{" "}
            {pathInfo.category}
          </p>

          {subcategoryData?.description && (
            <p className="text-base font-normal text-muted-foreground mt-3">
              {subcategoryData.description}
            </p>
          )}

          {subcategoryData?.tags && (
            <div className="flex flex-wrap gap-2 mt-4">
              {subcategoryData.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs capitalize tracking-wide bg-foreground/5 opacity-80 rounded"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        {/* List of Components in Subcategory - Each with its own tabs */}
        <div className="flex flex-col gap-16 w-full">
          {subcategoryItemsWithCode.map((item, index) => (
            <ComponentItemWithTabs
              key={`${item.itemName}-${index}`}
              item={item}
              index={index}
            />
          ))}
        </div>

        <div className="text-[0.6rem] font-medium italic text-center opacity-40 mt-6 w-full">
          Always use Live button to see the full page preview !
        </div>
      </main>
    );
  }

  if (isSubcategoryPage && subcategoryItemsWithCode.length === 0) {
    return (
      <main className="w-full">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold capitalize">
            {pathInfo.subcategory.replace(/-/g, " ")}
          </h1>
          {subcategoryData?.description && (
            <p className="text-base font-normal text-muted-foreground mt-3">
              {subcategoryData.description}
            </p>
          )}
        </header>
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground">
            No components found in this category.
          </p>
        </div>
      </main>
    );
  }

  // ==================== SINGLE COMPONENT PAGE VIEW ====================
  if (componentData) {
    const parts = slugPath.split("/").filter(Boolean);
    const category = parts[0] || "component";
    const subcategory = parts.length >= 2 ? parts[1] : null;

    // This should point to the specific component folder, not just the subcategory
    const componentFolderPath = `${toKebabCase(componentData.category)}/${toKebabCase(componentData.subcategory || "")}/${toKebabCase(componentData.itemName)}`;

    const showFolderStructure = componentData.hasFolderStructure;
    const showInstallation = componentData.hasSetup;
    const showAnyExtra = showFolderStructure || showInstallation;

    return (
      <main className="w-full">
        <section className="relative flex flex-col items-center text-sm! w-full">
          <div className="flex flex-col items-start w-full">
            {/* Overview Section */}
            <section
              id={toKebabCase(componentData.itemName)}
              className="w-full"
            >
              <Overview
                itemName={componentData.itemName || "Overview"}
                componentName={category}
                component={componentData.itemName}
                description={componentData.description || ""}
                tags={componentData.tags || []}
                techs={componentData.techs || []}
                youtubeUrl={componentData.video}
                code={componentData.code}
                slugPath={slugPath}
                subcategory={subcategory || componentData.subcategory}
                isInListView={false}
              />
            </section>

            {/* Additional Tabs for Components with Structure/Installation */}
            {showAnyExtra && (
              <div className="w-full mt-12 border-t pt-8">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                  defaultValue={
                    showFolderStructure
                      ? "structure"
                      : showInstallation
                        ? "installation"
                        : ""
                  }
                >
                  <TabsList
                    className={`grid w-full max-w-md ${
                      showFolderStructure && showInstallation
                        ? "grid-cols-2"
                        : "grid-cols-1"
                    }`}
                  >
                    {showFolderStructure && (
                      <TabsTrigger
                        value="structure"
                        className="flex items-center gap-2"
                      >
                        <FolderTree className="size-4" />
                        Structure
                      </TabsTrigger>
                    )}
                    {showInstallation && (
                      <TabsTrigger
                        value="installation"
                        className="flex items-center gap-2"
                      >
                        <Package className="size-4" />
                        Installation
                      </TabsTrigger>
                    )}
                  </TabsList>

                  {showFolderStructure && (
                    <TabsContent value="structure" className="mt-6">
                      <div className="bg-foreground/3 border rounded-xl p-4">
                        <h2 className="text-lg font-semibold mb-4">
                          Component Structure
                        </h2>
                        <FolderStructure
                          basePath={componentFolderPath} // Use full component path
                          componentName="" // Pass empty string
                        />
                      </div>
                    </TabsContent>
                  )}

                  {showInstallation && (
                    <TabsContent value="installation" className="mt-6">
                      <div className="bg-foreground/3 border rounded-xl p-4">
                        <h2 className="text-lg font-semibold mb-4">
                          Component Installation
                        </h2>
                        <Setup
                          componentName={componentData.itemName}
                          componentPath={componentFolderPath} // Pass the full path
                          dependencies={componentData.techs || []}
                        />
                      </div>
                    </TabsContent>
                  )}
                </Tabs>
              </div>
            )}
          </div>
        </section>
      </main>
    );
  }

  // Not Found
  return (
    <div className="flex items-center justify-center m-auto p-10 w-full h-full">
      <div className="p-10 bg-foreground/5 backdrop-blur-sm border rounded-xl shadow-xl w-full h-full">
        <h1 className="text-2xl font-bold mb-2">Component not found</h1>
        <p className="text-muted-foreground">
          The requested component or category does not exist.
        </p>
      </div>
    </div>
  );
}
