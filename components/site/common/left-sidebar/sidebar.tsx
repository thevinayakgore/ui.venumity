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

export default function LeftSidebar() {
  const pathname = usePathname();

  const icons = LucideIcons as unknown as Record<
    string,
    React.ComponentType<{ className?: string }>
  >;

  // ─── Build docs sections ──────────────────────────────────
  const docsSections = DOCS_DATA.map((section) => {
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
  const componentSections = [...COMPONENTS]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((category) => {
      const CategoryIcon = getLucideIcon(category.icon);

      if (category.subcategories.length === 0) {
        // No subcategories → single link
        const url = `/components/${toKebabCase(category.name)}`;
        return {
          title: category.name,
          icon: CategoryIcon,
          url, // direct link, no children
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
            url: `/components/${toKebabCase(category.name)}/${toKebabCase(subcategory.name)}`,
          })),
      };
    });

  // ─── Combine all nav items ────────────────────────────────
  const navItems = [...docsSections, ...componentSections].filter(Boolean);

  return (
    <SidebarProvider className="hidden md:block sticky top-0 p-5 pr-0! overflow-auto w-full max-h-screen">
      <SidebarGroup>
        <SidebarMenu>
          {navItems.map((item) => {
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
                     className="flex items-center justify-between hover:bg-foreground/10! opacity-50 rounded-sm w-full"
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
                      className="flex items-center justify-between hover:bg-foreground/10! opacity-50 rounded-sm w-full"
                    >
                      <div className="flex items-center gap-2">
                        {item.icon && <item.icon />}
                        <span className="font-semibold">{item.title}</span>
                      </div>
                      <ChevronDown className="size-4 opacity-80 group-data-[state=open]/collapsible:rotate-y-180 group-data-[state=open]/collapsible:rotate-x-180 transition-all duration-500" />
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
                              className="border-0! px-2.5! h-7.5! text-[0.8rem]! font-semibold! tracking-wide hover:bg-foreground/7! data-active:bg-foreground/7! data-active:text-foreground! rounded-sm w-full"
                            >
                              <Link
                                href={subItem.url}
                                className="text-foreground/50! hover:text-foreground! transition-all duration-500 w-full"
                              >
                                <span>{subItem.title}</span>
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
