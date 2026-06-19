// components/common/LeftSidebar/LeftResources.tsx
"use client";
import { ResourceCategory, getAllCategories } from "@/registry/resources";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Boxes, ChevronsLeft, Star, ChevronDown } from "lucide-react";
import { toKebabCase } from "@/utils/slug-kebab";
import { useResources } from "@/contexts/resources";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

interface LeftResourcesProps {
  initialCategories: ResourceCategory[];
  initialCategory?: string;
}

export default function LeftResources({
  initialCategories,
}: LeftResourcesProps) {
  const pathname = usePathname();
  const { selectedCategory, setSelectedCategory } = useResources();

  // Extract category and slug from pathname
  const pathSegments = pathname.split("/").filter(Boolean);
  const isResourcePage =
    pathSegments[0] === "resources" && pathSegments.length === 3;
  const categorySlug = isResourcePage ? pathSegments[1] : null;
  const pageSlug = isResourcePage ? pathSegments[2] : null;

  // Use categories from props
  const categories = initialCategories;

  // Get category display data from registry
  const categoryDisplay = getAllCategories();

  // Update selected category when URL changes
  useEffect(() => {
    if (!categorySlug) return;
    const id = setTimeout(() => {
      setSelectedCategory(categorySlug);
    }, 0);
    return () => clearTimeout(id);
  }, [categorySlug, setSelectedCategory]);

  // Get current category data
  const currentCategory = categories.find(
    (cat) => cat.slug === selectedCategory,
  );

  return (
    <SidebarProvider className="hidden md:block sticky top-0 p-5 pr-0! overflow-auto w-full max-h-screen">
      <SidebarGroup>
        <SidebarMenu>
          {/* ─── Categories Section (Collapsible) ──────────────── */}
          <Collapsible
            asChild
            defaultOpen={true}
            className="group/categories w-full"
          >
            <SidebarMenuItem className="w-full">
              <CollapsibleTrigger asChild className="mb-1 w-full">
                <SidebarMenuButton
                  tooltip="Categories"
                  className="flex items-center justify-between hover:bg-foreground/10! opacity-50 rounded-sm w-full"
                >
                  <div className="flex items-center gap-2">
                    <Boxes className="size-4" />
                    <span className="font-semibold">Categories</span>
                  </div>
                  <ChevronDown className="size-4 opacity-80 group-data-[state=open]/categories:rotate-180 transition-all duration-500" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="pr-2">
                <SidebarMenuSub className="border-l-foreground/20 gap-0.5! w-full">
                  {categoryDisplay.map((categoryConfig) => {
                    const fetchedCategory = categories.find(
                      (cat) => cat.slug === categoryConfig.slug,
                    );
                    if (
                      !fetchedCategory ||
                      fetchedCategory.pages.filter((p) => p.published)
                        .length === 0
                    ) {
                      return null;
                    }

                    const isActive = categoryConfig.slug === selectedCategory;
                    const publishedCount =
                      fetchedCategory.pages.filter((p) => p.published).length ||
                      0;

                    const firstPageSlug = (() => {
                      if (!fetchedCategory) return null;
                      const published = fetchedCategory.pages.filter(
                        (p) => p.published,
                      );
                      if (published.length === 0) return null;
                      return toKebabCase(published[0].title);
                    })();

                    const href = firstPageSlug
                      ? `/resources/${categoryConfig.slug}/${firstPageSlug}`
                      : `/resources`;

                    return (
                      <SidebarMenuSubItem
                        key={categoryConfig.id}
                        className="w-full"
                      >
                        <SidebarMenuSubButton
                          asChild
                          isActive={isActive}
                          className="border-0! pl-2.5! pr-1.5! h-7.5! text-[0.8rem]! font-semibold! tracking-wide hover:bg-foreground/7! data-active:bg-foreground/7! data-active:text-foreground! rounded-sm w-full"
                          onClick={() =>
                            setSelectedCategory(categoryConfig.slug)
                          }
                        >
                          <Link
                            href={href}
                            className="flex items-center justify-between text-foreground/50! hover:text-foreground! transition-all duration-500 w-full"
                          >
                            <span>{categoryConfig.label}</span>
                            <span
                              className={`text-[10px] px-1 py-0.5 rounded ${
                                isActive
                                  ? "bg-primary text-white"
                                  : "bg-foreground/10 text-muted-foreground"
                              }`}
                            >
                              {publishedCount > 0 && publishedCount < 10
                                ? `0${publishedCount}`
                                : publishedCount}
                            </span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          {/* ─── Pages Section (Collapsible) ───────────────────── */}
          {currentCategory && currentCategory.pages.length > 0 && (
            <Collapsible
              asChild
              defaultOpen={true}
              className="group/pages w-full"
            >
              <SidebarMenuItem className="w-full">
                <CollapsibleTrigger asChild className="mb-1 w-full">
                  <SidebarMenuButton
                    tooltip={
                      categoryDisplay.find(
                        (cat) => cat.slug === selectedCategory,
                      )?.label || currentCategory.name
                    }
                    className="flex items-center justify-between hover:bg-foreground/10! opacity-50 rounded-sm w-full"
                  >
                    <div className="flex items-center gap-2">
                      <Star className="size-4" />
                      <span className="font-semibold">
                        {categoryDisplay.find(
                          (cat) => cat.slug === selectedCategory,
                        )?.label || currentCategory.name}
                      </span>
                    </div>
                    <ChevronDown className="size-4 opacity-80 group-data-[state=open]/pages:rotate-180 transition-all duration-500" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="pr-2">
                  <SidebarMenuSub className="border-l-foreground/20 gap-0.5! w-full">
                    {currentCategory.pages
                      .filter((p) => p.published)
                      .map((resource) => {
                        const slug = toKebabCase(resource.title);
                        const isActive = slug === pageSlug;

                        return (
                          <SidebarMenuSubItem
                            key={resource.title}
                            className="w-full"
                          >
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive}
                              className="border-0! px-2.5! h-7.5! text-[0.8rem]! font-semibold! tracking-wide hover:bg-foreground/7! data-active:bg-foreground/7! data-active:text-foreground! rounded-sm w-full"
                            >
                              <Link
                                href={`/resources/${currentCategory.slug}/${slug}`}
                                className="text-foreground/50! hover:text-foreground! transition-all duration-500 w-full truncate"
                              >
                                {resource.title}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )}

          {/* Back to Resources Button */}
          {isResourcePage && (
            <SidebarMenuItem className="w-full mt-4 pt-3 border-t">
              <Link
                href="/resources"
                className="flex items-center justify-center gap-2 text-[11px] font-bold tracking-wide leading-none text-foreground/40 hover:text-foreground bg-foreground/5 border hover:border-foreground/20 rounded-md w-full py-3 px-5 uppercase"
                onClick={() => {
                  if (categorySlug) {
                    setSelectedCategory(categorySlug);
                  }
                }}
              >
                <ChevronsLeft className="size-4" />
                <span>Back to Resources</span>
              </Link>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarProvider>
  );
}
