"use client";
import { useState, useEffect, useMemo } from "react";
import { fetchComponentCode } from "@/utils/api-client";
import { toKebabCase } from "@/utils/slug-kebab";
import { COMPONENTS } from "@/registry/components";
import Overview from "../content/overview";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ComponentSubcategory } from "@/registry/component-utils";

interface ComponentItemData {
  itemName: string;
  description?: string;
  tags?: string[];
  techs?: string[];
  video?: string;
  category: string;
  subcategory?: string;
  folderPath?: string;
  code?: string;
}

interface PageClientProps {
  component: ComponentItemData | null;
  slugPath: string;
  subcategoryData?: ComponentSubcategory | null; // NEW: Added subcategoryData prop
}

// Helper function to get all items in a subcategory
function getSubcategoryItems(
  categorySlug: string,
  subcategorySlug: string,
): ComponentItemData[] {
  const result: ComponentItemData[] = [];

  const category = COMPONENTS.find(
    (c) => toKebabCase(c.name) === toKebabCase(categorySlug),
  );
  if (!category) return result;

  const subcategory = category.subcategories.find(
    (s) => toKebabCase(s.name) === toKebabCase(subcategorySlug),
  );

  if (!subcategory) return result;

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
    (ComponentItemData & { code?: string })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [isSubcategoryPage, setIsSubcategoryPage] = useState(false);

  // Check if this is a subcategory page (2 parts) or component page (3+ parts)
  const pathInfo = useMemo(() => {
    const parts = slugPath.split("/").filter(Boolean);
    return {
      parts,
      isSubcategory: parts.length === 2,
      category: parts[0] || "",
      subcategory: parts[1] || "",
      componentName: parts.length >= 3 ? parts.slice(2).join("/") : "",
    };
  }, [slugPath]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      try {
        if (pathInfo.isSubcategory) {
          setIsSubcategoryPage(true);

          const items = getSubcategoryItems(
            pathInfo.category,
            pathInfo.subcategory,
          );

          const itemsWithPromises = items.map(async (item) => {
            try {
              const code = await fetchComponentCode(
                toKebabCase(item.category),
                `${toKebabCase(item.subcategory || "")}/${toKebabCase(item.itemName)}`,
              );
              return { ...item, code: code || undefined };
            } catch {
              return { ...item, code: undefined };
            }
          });

          const itemsWithCode = await Promise.all(itemsWithPromises);
          setSubcategoryItemsWithCode(itemsWithCode);
        } else if (component) {
          setIsSubcategoryPage(false);

          const rawCode = await fetchComponentCode(
            toKebabCase(component.category),
            `${toKebabCase(component.subcategory || "")}/${toKebabCase(component.itemName)}`,
          );

          setComponentData({ ...component, code: rawCode || undefined });
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [component, slugPath, pathInfo]);

  useEffect(() => {
    const id = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-3 border-primary border-t-transparent" />
      </div>
    );
  }

  // In the subcategory page section, update the header to show tags/techs:
  if (isSubcategoryPage && subcategoryItemsWithCode.length > 0) {
    return (
      <main className="w-full">
        <header className="mb-6 pb-6 border-b border-dashed w-full">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-3xl md:text-4xl font-bold capitalize tracking-tight leading-none opacity-90">
              {pathInfo.subcategory.replace(/-/g, " ")}
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
                      src={`/icons/${tech
                        .toLowerCase()
                        .replace(/[.\-\s]/g, "")}.png`}
                      alt={tech}
                      width={100}
                      height={100}
                      className="object-contain rounded-[3px] w-full h-full"
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
            <p className="text-base  font-normal text-muted-foreground mt-3">
              {subcategoryData.description}
            </p>
          )}

          {subcategoryData?.tags && (
            <div className="flex flex-wrap gap-2 mt-4">
              {/* Tags */}
              {subcategoryData.tags?.map((tag) => (
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

        <div className="flex flex-col gap-12 w-full">
          {subcategoryItemsWithCode.map((item, index) => {
            const itemSlugPath = `${toKebabCase(item.category)}/${toKebabCase(item.subcategory || "")}/${toKebabCase(item.itemName)}`;

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
                />
              </section>
            );
          })}
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
            <p className="text-base  font-normal text-muted-foreground mt-3">
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

  if (componentData) {
    const parts = slugPath.split("/").filter(Boolean);
    const category = parts[0] || "component";
    const subcategory = parts.length >= 2 ? parts[1] : null;

    return (
      <main className="w-full">
        <section className="relative flex flex-col items-center text-sm! w-full">
          <div className="flex flex-col items-start w-full">
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
          </div>
        </section>
      </main>
    );
  }

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
