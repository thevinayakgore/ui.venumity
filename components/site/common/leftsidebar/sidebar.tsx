// components/site/common/left-sidebar/sidebar.tsx
"use client";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { usePathname } from "next/navigation";
import { DOCS_DATA } from "@/registry/site/docs";
import { toKebabCase } from "@/utils/slug-kebab";
import { ChevronDown, File } from "lucide-react";
import { COMPONENTS } from "@/registry/components";
import { PRIMITIVES } from "@/registry/primitives";
import { RESOURCES } from "@/registry/resources";
import Shimmer from "@/components/utility/shimmer";
import { getLucideIcon } from "@/registry/registry-utils";
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
import { insetButtonVariants } from "@/components/ui/inset-button";

type SidebarNavItem = {
  title: string;
  url: string;
  newItem?: boolean;
};

type SidebarSection = {
  title: string;
  url?: string;
  isActive?: boolean;
  items?: SidebarNavItem[];
  icon?: React.ComponentType<{ className?: string }>;
};

// ─── Loose shapes that accept BOTH registries ─────────────
type LooseItem = {
  itemName?: string;
  title?: string; // Resources use 'title'
  newItem?: boolean; // Added for Resources
};

type LooseSubcategory = {
  name: string;
  slug?: string;
  newItem?: boolean;
  items: LooseItem[];
};

type LooseCategory = {
  name: string;
  slug?: string;
  icon: string;
  subcategories?: LooseSubcategory[];
  pages?: LooseItem[]; // Resources use 'pages' instead of 'subcategories'
};

export default function LeftSidebar() {
  const pathname = usePathname();

  const icons = LucideIcons as unknown as Record<
    string,
    React.ComponentType<{ className?: string }>
  >;

  const isPrimitives = pathname.startsWith("/primitives");
  const isResources = pathname.startsWith("/resources");
  const basePath = isPrimitives
    ? "/primitives"
    : isResources
      ? "/resources"
      : "/components";

  // Pick the correct active registry
  const activeRegistry = (isPrimitives
    ? PRIMITIVES
    : isResources
      ? RESOURCES
      : COMPONENTS) as unknown as LooseCategory[];

  // ─── Docs sections (Only shown on Components/Primitives) ───
  const docsSections: SidebarSection[] = !isResources
    ? DOCS_DATA.map((section) => {
        const IconComponent =
          icons[section.icon.charAt(0).toUpperCase() + section.icon.slice(1)] ||
          File;

        return {
          title: section.title,
          icon: IconComponent,
          isActive: section.pages?.some((p) => pathname === `/docs/${p.page}`),
          items: section.pages.map((page) => ({
            title: page.page,
            newItem: page.newItem,
            url: `/docs/${toKebabCase(page.page)}`,
          })),
        };
      })
    : [];

  // ─── Registry sections ───────────────────────────────────
  const registrySections: SidebarSection[] = [...activeRegistry]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((category): SidebarSection => {
      const CategoryIcon = getLucideIcon(category.icon);
      const catSlug = category.slug || toKebabCase(category.name);

      // Handle Resources (Direct pages instead of subcategories)
      if (isResources && category.pages) {
        return {
          title: category.name,
          icon: CategoryIcon,
          isActive: pathname.startsWith(`${basePath}/${catSlug}`),
          items: category.pages.map((page) => {
            // Resources use 'title', Primitives/Components use 'itemName'
            const pageTitle = page.title || page.itemName || "Untitled";
            return {
              title: pageTitle,
              url: `${basePath}/${catSlug}/${toKebabCase(pageTitle)}`,
              newItem: page.newItem,
            };
          }),
        };
      }

      // Handle Primitives/Components (Subcategories)
      if (!category.subcategories || category.subcategories.length === 0) {
        return {
          title: category.name,
          icon: CategoryIcon,
          url: `${basePath}/${catSlug}`,
          isActive: pathname.startsWith(`${basePath}/${catSlug}`),
        };
      }

      return {
        title: category.name,
        icon: CategoryIcon,
        isActive: pathname.startsWith(`${basePath}/${catSlug}`),
        items: [...category.subcategories]
          .filter((sub) => sub.items && sub.items.length > 0)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((sub) => {
            const subSlug = sub.slug || toKebabCase(sub.name);
            return {
              title: sub.name,
              url: `${basePath}/${catSlug}/${subSlug}`,
              newItem: sub.newItem,
            };
          }),
      };
    });

  const navItems = [...docsSections, ...registrySections].filter(Boolean);

  return (
    <SidebarProvider className="hidden lg:block lg:sticky top-0 p-3 pr-0! overflow-auto w-full max-h-screen">
      <SidebarGroup>
        <SidebarMenu>
          {navItems.map((item) => {
            if (!item) return null;

            if (!item.items || item.items.length === 0) {
              const href =
                "url" in item && typeof item.url === "string"
                  ? item.url
                  : `${basePath}/${toKebabCase(item.title)}`;
              const isActive = pathname.startsWith(href);

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.title}
                    className="flex items-center justify-between hover:bg-foreground/10! opacity-50 rounded-md w-full"
                  >
                    <Link href={href}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            }

            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={true}
                className="group/collapsible w-full"
              >
                <SidebarMenuItem className="w-full">
                  <CollapsibleTrigger asChild className="w-full">
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="group flex items-center justify-between hover:bg-foreground/10! data-active:bg-foreground/10! font-semibold rounded-md w-full"
                    >
                      <div className="flex items-center gap-2">
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </div>
                      <ChevronDown className="size-4 opacity-80 group-hover:opacity-100 group-data-[state=open]/collapsible:rotate-y-180 group-data-[state=open]/collapsible:rotate-x-180 transition-all duration-500" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pr-2">
                    <SidebarMenuSub className="border-l-foreground/20 gap-0.5! w-full">
                      {item.items.map((subItem) => {
                        const isActive = pathname === subItem.url;
                        return (
                          <SidebarMenuSubItem
                            key={subItem.title}
                            className="w-full"
                          >
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive}
                              className="border-0! pl-2.5! pr-1! h-7.5! text-[0.8rem]! font-medium! tracking-wide hover:bg-foreground/10! data-active:bg-foreground/10! data-active:text-foreground! rounded-md w-full"
                            >
                              <Link
                                href={subItem.url}
                                className="flex items-center justify-between text-muted-foreground! hover:text-foreground! w-full"
                              >
                                <span className="truncate">
                                  {subItem.title}
                                </span>
                                {subItem.newItem && (
                                  <span
                                    className={insetButtonVariants(
                                      "relative h-5 px-1.5 text-[0.65rem] uppercase font-semibold overflow-hidden rounded-full",
                                      "sm",
                                    )}
                                  >
                                    New
                                    <Shimmer className="via-white/40 w-5!" />
                                  </span>
                                )}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarProvider>
  );
}
