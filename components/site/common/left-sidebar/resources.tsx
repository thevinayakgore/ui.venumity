// components/site/common/left-sidebar/resources.tsx
"use client";
import { ResourceCategory, getAllCategories } from "@/registry/resources";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Boxes, ChevronsLeft, Star, ChevronDown, Menu } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface LeftResourcesProps {
  initialCategories: ResourceCategory[];
  initialCategory?: string;
}

export default function LeftResources({
  initialCategories,
}: LeftResourcesProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { selectedCategory, setSelectedCategory } = useResources();

  // Extract category and slug from pathname
  const pathSegments = pathname.split("/").filter(Boolean);
  const isOnMainResourcesPage =
    pathSegments[0] === "resources" && pathSegments.length === 1;
  const isOnResourcePage =
    pathSegments[0] === "resources" && pathSegments.length === 3;
  const categorySlug = isOnResourcePage ? pathSegments[1] : null;
  const pageSlug = isOnResourcePage ? pathSegments[2] : null;

  const categories = initialCategories;
  const categoryDisplay = getAllCategories();

  // Update selected category when URL changes
  useEffect(() => {
    if (!categorySlug) return;
    const id = setTimeout(() => {
      setSelectedCategory(categorySlug);
    }, 0);
    return () => clearTimeout(id);
  }, [categorySlug, setSelectedCategory]);

  const currentCategory = categories.find(
    (cat) => cat.slug === selectedCategory,
  );

  const getFirstPublishedPageSlug = (categorySlug: string): string | null => {
    const category = categories.find((cat) => cat.slug === categorySlug);
    if (!category || category.pages.length === 0) return null;
    const publishedPages = category.pages.filter((p) => p.published);
    if (publishedPages.length === 0) return null;
    return toKebabCase(publishedPages[0].title);
  };

  const handleCategoryClick = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    if (isOnMainResourcesPage) return;
    const firstPageSlug = getFirstPublishedPageSlug(categorySlug);
    if (firstPageSlug) {
      router.push(`/resources/${categorySlug}/${firstPageSlug}`);
    }
  };

  return (
    <>
      {/* ─── Mobile / Tablet: View List button + Sheet ───────────── */}
      <div className="lg:hidden fixed bottom-5 right-5 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="bg-primary! text-white! font-bold border-[0.8px] border-secondary/70! ring-2 ring-primary shadow-lg shadow-primary/40"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="overflow-y-auto p-0! gap-0! min-w-full"
          >
            <SheetHeader className="border-b">
              <SheetTitle className="text-left">Resources</SheetTitle>
            </SheetHeader>
            <div className="p-4 space-y-6">
              {/* Categories */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-muted-foreground">
                  Categories
                </h4>
                <ul className="space-y-1">
                  {categoryDisplay.map((categoryConfig) => {
                    const fetchedCategory = categories.find(
                      (cat) => cat.slug === categoryConfig.slug,
                    );
                    if (
                      !fetchedCategory ||
                      fetchedCategory.pages.filter((p) => p.published)
                        .length === 0
                    )
                      return null;

                    const isActive = categoryConfig.slug === selectedCategory;
                    const publishedCount =
                      fetchedCategory.pages.filter((p) => p.published).length ||
                      0;

                    return (
                      <li key={categoryConfig.id}>
                        <button
                          onClick={() =>
                            handleCategoryClick(categoryConfig.slug)
                          }
                          className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-foreground/10 text-foreground"
                              : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
                          }`}
                        >
                          <span>{categoryConfig.label}</span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              isActive
                                ? "bg-primary text-white"
                                : "bg-foreground/10 text-muted-foreground"
                            }`}
                          >
                            {publishedCount}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Pages of selected category */}
              {currentCategory && currentCategory.pages.length > 0 && (
                <div className="pb-3 border-b w-full">
                  <h4 className="mb-5 text-sm font-semibold text-muted-foreground">
                    {categoryDisplay.find(
                      (cat) => cat.slug === selectedCategory,
                    )?.label || currentCategory.name}
                  </h4>
                  <ul className="space-y-1">
                    {currentCategory.pages
                      .filter((p) => p.published)
                      .map((resource) => {
                        const slug = toKebabCase(resource.title);
                        const isActive = slug === pageSlug;
                        return (
                          <li key={resource.title}>
                            <Link
                              href={`/resources/${currentCategory.slug}/${slug}`}
                              className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                isActive
                                  ? "bg-foreground/10 text-foreground"
                                  : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
                              }`}
                            >
                              {resource.title}
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              )}

              {/* Back to Resources */}
              {isOnResourcePage && (
                <Link
                  href="/resources"
                  onClick={() => {
                    if (categorySlug) setSelectedCategory(categorySlug);
                  }}
                  className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wide text-foreground/50 hover:text-foreground border border-foreground/10 rounded-md px-3 py-3 mt-6"
                >
                  <ChevronsLeft className="size-4" />
                  Back to Resources
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* ─── Desktop Sidebar (unchanged) ─────────────────────────── */}
      <SidebarProvider className="hidden lg:block sticky top-0 p-5 pr-0! overflow-auto w-full max-h-screen">
        <SidebarGroup>
          <SidebarMenu>
            {/* Categories Section */}
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
                        fetchedCategory.pages.filter((p) => p.published)
                          .length || 0;

                      return (
                        <SidebarMenuSubItem
                          key={categoryConfig.id}
                          className="w-full"
                        >
                          <SidebarMenuSubButton
                            isActive={isActive}
                            className="border-0! pl-2.5! pr-1.5! h-7.5! text-[0.8rem]! font-semibold! tracking-wide hover:bg-foreground/7! data-active:bg-foreground/7! data-active:text-foreground! rounded-sm w-full cursor-pointer"
                            onClick={() =>
                              handleCategoryClick(categoryConfig.slug)
                            }
                          >
                            <div className="flex items-center justify-between text-foreground/50! hover:text-foreground! transition-all duration-500 w-full">
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
                            </div>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            {/* Pages Section */}
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

            {/* Back to Resources */}
            {isOnResourcePage && (
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
    </>
  );
}
