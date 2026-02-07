"use client";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { DOCS_DATA } from "@/registry/site/docs";
import { COMPONENTS } from "@/registry/components";
import { toKebabCase } from "@/utils/slug-kebab";
import { getLucideIcon } from "@/registry/component-utils";

export default function LeftSidebar() {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const icons = LucideIcons as unknown as Record<
    string,
    React.ComponentType<{ className?: string }>
  >;

  return (
    <aside className="sticky top-0 overflow-auto w-full max-h-screen">
      <div
        ref={sidebarRef}
        className="flex flex-col items-start text-[0.8rem] font-medium leading-none pt-24 overflow-y-auto w-full h-full"
      >
        <div className="w-full">
          {/* ------------------------------ DOCS ----------------------------- */}
          {DOCS_DATA.map((section) => {
            const IconComponent =
              icons[
                section.icon.charAt(0).toUpperCase() + section.icon.slice(1)
              ] || icons.File;

            return (
              <div
                key={`docs-${section.title}`}
                className="space-y-2 w-full mb-2"
              >
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <IconComponent className="size-3.5" />
                  <span>{section.title}</span>
                </div>

                <div className="flex flex-col gap-0.5">
                  {section.pages
                    ?.filter((p) => p.published !== false)
                    .map((page) => {
                      const href = `/docs/${page.slug}`;
                      const isActive = pathname === href;

                      return (
                        <Link
                          key={page.slug}
                          href={href}
                          className={`flex items-center tracking-wide px-5 py-2 border-x rounded-[3px] transition-all duration-500 ${
                            isActive
                              ? "text-foreground bg-muted/60 border-primary"
                              : "text-muted-foreground/80 hover:text-foreground hover:bg-muted/60 border-transparent hover:border-primary"
                          }`}
                        >
                          {page.page}
                        </Link>
                      );
                    })}
                </div>
              </div>
            );
          })}

          {/* --------------------------- COMPONENTS --------------------------- */}
          <div className="flex flex-col w-full">
            {[...COMPONENTS]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((category) => {
                const hasSubcategories = category.subcategories.length > 0;
                const CategoryIcon = getLucideIcon(category.icon);

                if (!hasSubcategories) {
                  const categoryLink = `/components/${toKebabCase(category.name)}`;
                  const isCategoryActive = pathname.startsWith(
                    `/components/${toKebabCase(category.name)}`,
                  );

                  return (
                    <Link
                      key={category.name}
                      href={categoryLink}
                      className={`flex items-center gap-2 tracking-wide px-5 py-2 border-x rounded-[3px] transition-all duration-500 ${
                        isCategoryActive
                          ? "text-foreground bg-muted/60 border-primary"
                          : "text-muted-foreground/80 hover:text-foreground hover:bg-muted/60 border-transparent hover:border-primary"
                      }`}
                    >
                      <CategoryIcon className="size-3.5" />
                      <span>{category.name}</span>
                    </Link>
                  );
                }

                return (
                  <div key={category.name} className="w-full">
                    <div className="py-3 border-y border-dashed w-full last:border-b-0">
                      <div className="flex items-center gap-2 text-sm font-semibold opacity-90 mb-2">
                        <CategoryIcon className="size-4!" />
                        <span>{category.name}</span>
                      </div>

                      <div className="space-y-0.5 w-full">
                        {[...category.subcategories]
                          .filter((sub) => sub.items.length > 0)
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((subcategory) => {
                            const subcategoryLink = `/components/${toKebabCase(category.name)}/${toKebabCase(subcategory.name)}`;
                            const isSubcategoryActive =
                              pathname === subcategoryLink ||
                              pathname.startsWith(`${subcategoryLink}/`);

                            // Get subcategory icon or use folder icon as fallback
                            const SubcategoryIcon = getLucideIcon(
                              subcategory.icon ? subcategory.icon : "",
                            );

                            return (
                              <Link
                                key={`${category.name}-${subcategory.name}`}
                                href={subcategoryLink}
                                className={`flex items-center gap-2 tracking-wide px-5 py-2 border-x rounded-[3px] transition-all duration-500 ${
                                  isSubcategoryActive
                                    ? "text-foreground bg-muted/60 border-primary"
                                    : "text-muted-foreground/80 hover:text-foreground hover:bg-muted/60 border-transparent hover:border-primary"
                                }`}
                              >
                                {subcategory.icon ? (
                                  <SubcategoryIcon className="size-3.5" />
                                ) : (
                                  ""
                                )}
                                <span>{subcategory.name}</span>
                              </Link>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </aside>
  );
}
