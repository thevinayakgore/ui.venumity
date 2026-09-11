"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { DOCS_DATA } from "@/registry/site/docs";
import { COMPONENTS } from "@/registry/components";
import { toKebabCase } from "@/utils/slug-kebab";
import { getLucideIcon } from "@/registry/component-utils";
import { ChevronDown, File } from "lucide-react";
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

type SidebarNavItem = {
  title: string;
  url: string;
  newItem?: boolean;
};

type SidebarSection = {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  url?: string;
  isActive?: boolean;
  items?: SidebarNavItem[];
};

export default function LeftSidebar() {
  const pathname = usePathname();

  const icons = LucideIcons as unknown as Record<
    string,
    React.ComponentType<{ className?: string }>
  >;

  // ─── Build docs sections ──────────────────────────────────
  const docsSections: SidebarSection[] = DOCS_DATA.map((section) => {
    const IconComponent =
      icons[section.icon.charAt(0).toUpperCase() + section.icon.slice(1)] ||
      File;

    return {
      title: section.title,
      icon: IconComponent,
      isActive: section.pages?.some((p) => pathname === `/docs/${p.slug}`),
      items: section.pages
        ?.filter((p) => p.published !== false)
        .map((page) => ({
          title: page.page,
          url: `/docs/${page.slug}`,
        })),
    };
  });

  // ─── Build components sections ────────────────────────────
  const componentSections: SidebarSection[] = [...COMPONENTS]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((category) => {
      const CategoryIcon = getLucideIcon(category.icon);

      if (category.subcategories.length === 0) {
        const url = `/components/${toKebabCase(category.name)}`;

        return {
          title: category.name,
          icon: CategoryIcon,
          url,
          isActive: pathname.startsWith(url),
        };
      }

      return {
        title: category.name,
        icon: CategoryIcon,
        isActive: pathname.startsWith(
          `/components/${toKebabCase(category.name)}`,
        ),
        items: [...category.subcategories]
          .filter((sub) => sub.items.length > 0)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((subcategory) => ({
            title: subcategory.name,
            url: `/components/${toKebabCase(category.name)}/${toKebabCase(
              subcategory.name,
            )}`,
            newItem: subcategory.newItem,
          })),
      };
    });

  // ─── Combine all nav items ────────────────────────────────
  const navItems = [...docsSections, ...componentSections].filter(Boolean);

  return (
    <SidebarProvider className="hidden lg:block lg:sticky top-0 p-3 pr-0! overflow-auto w-full max-h-screen">
      <SidebarGroup>
        <SidebarMenu>
          {navItems.map((item) => {
            if (!item) return null;

            // If no sub-items, render a simple link
            if (!item.items || item.items.length === 0) {
              const href =
                "url" in item && typeof item.url === "string"
                  ? item.url
                  : `/components/${toKebabCase(item.title)}`;
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

            // Has sub-items → collapsible
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
                      className="group flex items-center justify-between hover:bg-primary! text-foreground/50 hover:text-white! rounded-md w-full"
                    >
                      <div className="flex items-center gap-2">
                        {item.icon && <item.icon />}
                        <span className="font-semibold">{item.title}</span>
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
                              className="border-0! pl-2.5! pr-1! h-7.5! text-[0.8rem]! font-semibold! tracking-wide hover:bg-orange-500/10! data-active:bg-orange-500/10! dark:hover:bg-orange-600/20! dark:data-active:bg-orange-600/20! data-active:text-foreground! rounded-md w-full"
                            >
                              <Link
                                href={subItem.url}
                                className="flex items-center justify-between text-foreground/50! hover:text-foreground! w-full"
                              >
                                <span>{subItem.title}</span>
                                {(subItem.newItem ||
                                  subItem.title === "CLI Guide" ||
                                  subItem.title === "Add Resources") && (
                                  <span className="flex items-center justify-center px-2 py-0.5 h-5 text-[0.6rem] leading-0 font-bold tracking-wider uppercase bg-orange-500 dark:bg-orange-600 text-white rounded-full">
                                    New
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
