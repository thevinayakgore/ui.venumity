// app/components/[...slug]/page.client.tsx
"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { toKebabCase } from "@/utils/slug-kebab";
import { COMPONENTS } from "@/registry/components";
import { useState, useEffect, useMemo } from "react";
import { fetchComponentCode } from "@/utils/api-client";
import ComponentItemWithTabs from "../content/component-item-with-tabs";
import {
  ComponentSubcategory,
  ComponentItem,
} from "@/registry/component-utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
  const [subcategoryItemsWithCode, setSubcategoryItemsWithCode] = useState<
    ComponentItemData[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [isSubcategoryPage, setIsSubcategoryPage] = useState(false);

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
        } else if (pathInfo.isComponent && component) {
          // Load single component page
          setIsSubcategoryPage(false);
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
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
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
      <main className="tracking-wide w-full">
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
                    className="flex items-center justify-center size-7 p-0.5 rounded bg-foreground/3 overflow-hidden"
                    title={tech}
                  >
                    <Image
                      src={`/icons/${tech.toLowerCase().replace(/[.\-\s]/g, "")}.webp`}
                      alt={tech}
                      width={500}
                      height={500}
                      priority
                      unoptimized
                      loading="eager"
                      className="object-cover rounded-[3px] w-full h-full"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <Breadcrumb className="mt-3 font-semibold! tracking-wide">
            <BreadcrumbList>
              <BreadcrumbItem className="text-foreground/40">
                <BreadcrumbLink
                  href="/components"
                  className="hover:text-foreground"
                >
                  components
                </BreadcrumbLink>
              </BreadcrumbItem>
              <div className="flex items-center -space-x-2 text-foreground/40">
                <BreadcrumbSeparator />
                <BreadcrumbSeparator />
              </div>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-foreground/40!">
                  {pathInfo.category}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <div className="flex items-center -space-x-2 text-foreground/40">
                <BreadcrumbSeparator />
                <BreadcrumbSeparator />
              </div>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold!">
                  {pathInfo.subcategory}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {subcategoryData?.description && (
            <p className="text-sm md:text-base text-foreground/50 mt-3 max-w-lg">
              {subcategoryData.description}
            </p>
          )}

          {subcategoryData?.tags && (
            <div className="flex flex-wrap gap-2 mt-4">
              {subcategoryData.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="h-7! px-3! text-xs capitalize bg-foreground/5 text-foreground/80 font-semibold rounded-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        {/* List of Components in Subcategory - Each with its own tabs */}
        <div className="flex flex-col w-full">
          {subcategoryItemsWithCode.map((item, index) => (
            <ComponentItemWithTabs
              key={`${item.itemName}-${index}`}
              item={item}
              index={index}
            />
          ))}
        </div>

        <div className="text-sm tracking-wide text-center opacity-40 mb-5 w-full">
          Always use Live button to see the full page preview !
        </div>
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
