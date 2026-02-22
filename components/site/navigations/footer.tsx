"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { authorName, brandName } from "@/lib/brand";
import { usePathname } from "next/navigation";
import SocialMedia from "../../site/sections/social-media";
import { useEffect, useState } from "react";
import { COMPANY_SECTION } from "./navbar";
import { TEMPLATES } from "@/registry/site/templates";
import { toUrlSlug } from "@/utils/slug-kebab";
import { COMPONENTS } from "@/registry/components";
import { DOCS_DATA } from "@/registry/site/docs";

type FooterLink = {
  id: string;
  name: string;
  href: string;
  isExternal?: boolean;
};

type FooterSection = {
  id: string;
  title: string;
  links: FooterLink[];
};

const words = ["Imagine", "Impact", "Inspire"];

const FOOTER_TITLE =
  "The best way to learn is to build and the best way to build is with tools that empower rather than overwhelm.";

const LEGAL_SECTION: FooterSection = {
  id: "legal-section",
  title: "Legal",
  links: [
    { id: "license", name: "License", href: "/legal/license" },
    { id: "privacy", name: "Privacy", href: "/legal/privacy" },
    { id: "terms", name: "Terms", href: "/legal/terms" },
  ],
};

// Hardcoded footer configuration
const FOOTER_CONFIG = {
  sections: [
    {
      title: "Components",
      _type: "autoComponentsSection" as const,
    },
    {
      title: "Templates",
      _type: "autoCategorySection" as const,
    },
    {
      title: "Documents",
      _type: "autoDocsSection" as const,
    },
  ],
};

export const BottomFooter = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-3  font-medium text-muted-foreground/80 tracking-normal text-center py-3 px-10 bg-transparent/5 backdrop-blur-md border-y 2xl:border-y-2 2xl:border-dashed w-full">
      <div className="flex items-center text-sm">
        <p className="flex items-center gap-2">
          © {new Date().getFullYear()}{" "}
          <span className="flex items-center font-semibold text-foreground">
            <span>{brandName.slice(0, 4)}</span>
            <span className="text-primary">{brandName.slice(4, 8)}</span>
            <span className="ml-1">{brandName.slice(8, 12)}</span>
          </span>
        </p>
        <span className="font-light text-base leading-none mx-1.5">|</span>
        <p>MIT Licensed</p>
      </div>
      <span className="text-[0.8rem]">
        Building in public at{" "}
        <Link
          href="https://thevinayakgore.vercel.app/"
          target="_blank"
          className="font-medium text-primary ml-1"
        >
          {authorName}
        </Link>
      </span>
      <SocialMedia />
    </section>
  );
};

export default function Footer() {
  const pathname = usePathname();
  const [footerSections, setFooterSections] = useState<FooterSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function buildFooterData() {
      try {
        const footerData = FOOTER_CONFIG;

        if (!footerData?.sections) {
          setFooterSections([]);
          return;
        }

        let componentsSection: FooterSection | null = null;
        let templatesSection: FooterSection | null = null;
        let docsSection: FooterSection | null = null;

        for (const section of footerData.sections) {
          switch (section._type) {
            case "autoComponentsSection":
              // Use components data from registry/components.ts
              const componentLinks: FooterLink[] = [];

              COMPONENTS.forEach((category, index) => {
                // Get first subcategory link for this category
                if (category.subcategories.length > 0) {
                  const firstSubcategory = category.subcategories[0];
                  const href = `/components/${toUrlSlug(category.name)}/${toUrlSlug(firstSubcategory.name)}`;

                  componentLinks.push({
                    id: `component-${index}`,
                    name: category.name,
                    href: href,
                  });
                }
              });

              if (componentLinks.length > 0) {
                componentsSection = {
                  id: "components-section",
                  title: section.title,
                  links: componentLinks.sort((a, b) =>
                    a.name.localeCompare(b.name, undefined, {
                      sensitivity: "base",
                    }),
                  ),
                };
              }
              break;

            case "autoDocsSection": {
              const docsLinks: FooterLink[] = DOCS_DATA.flatMap(
                (section, sectionIndex) =>
                  section.pages
                    .filter((page) => page.published !== false)
                    .map((page, pageIndex) => ({
                      id: `doc-${sectionIndex}-${pageIndex}`,
                      name: page.page,
                      href: `/docs/${page.slug}`,
                    })),
              );

              if (docsLinks.length > 0) {
                docsSection = {
                  id: "docs-section",
                  title: section.title,
                  links: docsLinks,
                };
              }
              break;
            }

            case "autoCategorySection": {
              const templateLinks: FooterLink[] = TEMPLATES.filter(
                (template) => template.isPublished,
              ).map((template) => {
                const firstWord = template.name.split(" ")[0];

                return {
                  id: `template-${toUrlSlug(template.name)}`,
                  name: firstWord,
                  href: `/templates/${toUrlSlug(template.name)}`,
                };
              });

              if (templateLinks.length > 0) {
                templatesSection = {
                  id: "templates-section",
                  title: section.title,
                  links: templateLinks.sort((a, b) =>
                    a.name.localeCompare(b.name, undefined, {
                      sensitivity: "base",
                    }),
                  ),
                };
              }

              break;
            }
          }
        }

        // Build sections in the correct order
        const orderedSections: FooterSection[] = [];

        // 1. Components section (if exists and has items)
        if (componentsSection && componentsSection.links.length > 0) {
          orderedSections.push(componentsSection);
        }

        // 2. Templates section (if exists and has published templates)
        if (templatesSection && templatesSection.links.length > 0) {
          orderedSections.push(templatesSection);
        }

        // 3. Docs section (if exists)
        if (docsSection) {
          orderedSections.push(docsSection);
        }

        // 4. Company section (hardcoded)
        orderedSections.push({
          id: "company-section",
          title: COMPANY_SECTION.title,
          links: COMPANY_SECTION.links.map((link, index) => ({
            id: `company-${index}`,
            ...link,
          })),
        });

        // 5. Legal section (hardcoded)
        orderedSections.push(LEGAL_SECTION);

        setFooterSections(orderedSections);
      } catch (error) {
        console.error("Error building footer data:", error);
        // Fallback to hardcoded sections only
        setFooterSections([
          {
            id: "company-section-fallback",
            title: COMPANY_SECTION.title,
            links: COMPANY_SECTION.links.map((link, index) => ({
              id: `company-fallback-${index}`,
              ...link,
            })),
          },
          LEGAL_SECTION,
        ]);
      } finally {
        setLoading(false);
      }
    }

    // Simulate loading delay
    const timer = setTimeout(() => {
      buildFooterData();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (pathname?.startsWith("/components") || pathname?.startsWith("/docs")) {
    return null;
  }

  // Skeleton component
  const FooterLinkSkeleton = () => (
    <div className="h-5 w-20 rounded-[3px] bg-foreground/10 animate-pulse" />
  );

  // Skeleton sections - show these when loading
  const SKELETON_SECTIONS: FooterSection[] = [
    {
      id: "skeleton-components",
      title: "Components",
      links: Array.from({ length: 8 }).map((_, i) => ({
        id: `skeleton-comp-${i}`,
        name: `Component ${i + 1}`,
        href: "#",
      })),
    },
    {
      id: "skeleton-templates",
      title: "Templates",
      links: Array.from({ length: 4 }).map((_, i) => ({
        id: `skeleton-temp-${i}`,
        name: `Template ${i + 1}`,
        href: "#",
      })),
    },
    {
      id: "skeleton-docs",
      title: "Documents",
      links: Array.from({ length: 4 }).map((_, i) => ({
        id: `skeleton-doc-${i}`,
        name: `Doc ${i + 1}`,
        href: "#",
      })),
    },
    {
      id: "skeleton-company",
      title: COMPANY_SECTION.title,
      links: COMPANY_SECTION.links.map((link, i) => ({
        id: `skeleton-company-${i}`,
        ...link,
      })),
    },
    LEGAL_SECTION,
  ];

  const sectionsToRender =
    footerSections.length > 0 ? footerSections : SKELETON_SECTIONS;

  const componentsSection = sectionsToRender.find((section) =>
    section.title.toLowerCase().includes("component"),
  );

  const templatesSection = sectionsToRender.find((section) =>
    section.title.toLowerCase().includes("template"),
  );

  const totalComponentAndTemplateItems =
    (componentsSection?.links.length ?? 0) +
    (templatesSection?.links.length ?? 0);

  const shouldShowBrandDecoration = totalComponentAndTemplateItems >= 36;

  if (pathname.startsWith("/preview")) return null;

  return (
    <footer className="w-full">
      <div className="relative flex flex-col items-center justify-center gap-5 max-w-360 m-auto bg-background border-t 2xl:border-2 2xl:border-dashed 2xl:border-t overflow-hidden w-full h-full">
        <span className="absolute top-0 left-1/2 -translate-x-1/2 bg-linear-to-l from-transparent via-primary to-transparent transition-all duration-500 w-1/2 h-px" />
        <span className="absolute -top-15 left-1/2 -translate-x-1/2 z-10 blur-3xl bg-linear-to-l from-transparent via-primary/60 to-transparent transition-all duration-500 rounded-full w-1/2 h-10" />

        <section
          className={`flex flex-col items-center text-center max-w-2xl m-auto mb-8 p-6 sm:p-10 pb-0! w-full px-2 sm:px-0`}
        >
          <Link
            href="/"
            className="flex items-center gap-1 sm:gap-2 text-3xl sm:text-4xl md:text-[5rem] stackSans font-medium!"
          >
            <div className="flex items-center">
              <span className="opacity-50 text-transparent bg-clip-text bg-linear-to-tl from-transparent via-foreground to-transparent">
                {brandName.slice(0, -7)}
              </span>
              <span className="opacity-80 text-primary">
                {brandName.slice(-7, -3)}
              </span>
            </div>
            <span>⚡</span>
          </Link>
          <p className="mt-5  font-normal text-lg text-transparent bg-clip-text bg-linear-to-l from-foreground/10 via-foreground/70 to-foreground/10 opacity-60">
            {FOOTER_TITLE}
          </p>
        </section>

        {/* Footer Links Section */}
        <section className="p-6 md:px-10 pb-60 z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 items-center justify-between gap-y-10  font-normal w-full">
          {sectionsToRender.map((section, index) => {
            const isDynamicSection =
              section.title.toLowerCase().includes("component") ||
              section.title.toLowerCase().includes("template") ||
              section.title.toLowerCase().includes("doc");

            const shouldSortAlphabetically =
              section.title.toLowerCase().includes("component") ||
              section.title.toLowerCase().includes("template");

            const sortedLinks = shouldSortAlphabetically
              ? [...section.links].sort((a, b) =>
                  (a.name || "").localeCompare(b.name || "", undefined, {
                    sensitivity: "base",
                  }),
                )
              : section.links;

            return (
              <div
                key={section.id}
                className={`flex flex-col items-start gap-3 text-xs xl:text-sm text-foreground/70 w-full h-full ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <h3 className="relative px-5 text-foreground/90 text-sm xl:text-base leading-none">
                  {section.title}
                  <span className="absolute -bottom-3 left-0 bg-linear-to-t from-primary/20 h-full w-full" />
                  <span className="absolute -bottom-3 left-0 bg-primary/50 h-px w-full" />
                  <span className="absolute -bottom-3 left-0 bg-linear-to-t from-primary/50 h-10 w-px" />
                  <span className="absolute -bottom-3 right-0 bg-linear-to-t from-primary/50 h-10 w-px" />
                </h3>

                {index === 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                    <ul className="space-y-3 p-1.5 pt-3 border-l whitespace-nowrap">
                      {loading && isDynamicSection
                        ? Array.from({
                            length: Math.ceil(section.links.length / 2),
                          }).map((_, i) => (
                            <li
                              key={`skeleton-${section.id}-left-${i}`}
                              className="ml-1.5"
                            >
                              <FooterLinkSkeleton />
                            </li>
                          ))
                        : sortedLinks
                            .slice(0, Math.ceil(sortedLinks.length / 2))
                            .map((link) => (
                              <li key={link.id}>
                                <Link
                                  href={link.href}
                                  className="relative group py-1.5 px-3 hover:bg-foreground/10 rounded hover:text-foreground transition-all duration-500 opacity-70 hover:opacity-100 w-fit"
                                >
                                  {link.name}
                                  <span className="absolute left-[25%] bottom-0 w-0 h-0.5 bg-primary rounded-full group-hover:w-1/2 transition-all duration-500" />
                                </Link>
                              </li>
                            ))}
                    </ul>

                    <ul className="space-y-3 p-1.5 mt-1 border-l whitespace-nowrap">
                      {loading && isDynamicSection
                        ? Array.from({
                            length: Math.floor(section.links.length / 2),
                          }).map((_, i) => (
                            <li
                              key={`skeleton-${section.id}-right-${i}`}
                              className="ml-1.5"
                            >
                              <FooterLinkSkeleton />
                            </li>
                          ))
                        : sortedLinks
                            .slice(Math.ceil(sortedLinks.length / 2))
                            .map((link) => (
                              <li key={link.id}>
                                <Link
                                  href={link.href}
                                  className="relative group py-1.5 px-3 hover:bg-foreground/10 rounded hover:text-foreground transition-all duration-500 opacity-70 hover:opacity-100 w-fit"
                                >
                                  {link.name}
                                  <span className="absolute left-[25%] bottom-0 w-0 h-0.5 bg-primary rounded-full group-hover:w-1/2 transition-all duration-500" />
                                </Link>
                              </li>
                            ))}
                    </ul>
                  </div>
                ) : (
                  <ul className="space-y-3 p-1.5 pt-3 border-l whitespace-nowrap">
                    {loading && isDynamicSection
                      ? Array.from({ length: section.links.length }).map(
                          (_, i) => (
                            <li
                              key={`skeleton-${section.id}-${i}`}
                              className="ml-1.5"
                            >
                              <FooterLinkSkeleton />
                            </li>
                          ),
                        )
                      : sortedLinks.map((link) => (
                          <li key={link.id}>
                            <Link
                              href={link.href}
                              className="relative group py-1.5 px-3 hover:bg-foreground/10 rounded hover:text-foreground transition-all duration-500 opacity-70 hover:opacity-100"
                            >
                              {link.name}
                              <span className="absolute left-[25%] bottom-0 w-0 h-0.5 bg-primary rounded-full group-hover:w-1/2 transition-all duration-500" />
                            </Link>
                          </li>
                        ))}
                  </ul>
                )}
              </div>
            );
          })}
        </section>

        <h1 className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-30 text-center text-[20rem]  uppercase tracking-wide whitespace-nowrap font-extrabold text-transparent bg-clip-text bg-linear-to-b from-foreground/15 via-foreground/5 leading-none">
          Library
        </h1>
        <h3 className="absolute bottom-30 left-1/2 -translate-x-1/2 tracking-widest text-center text-3xl font-medium uppercase whitespace-nowrap leading-none w-fit flex gap-3">
          {words.map((word, i) => (
            <motion.span
              key={word}
              animate={{
                y: [0, -15, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                delay: i * 0.8,
              }}
              className={`inline-block ${i === 0 ? "text-primary" : i === 2 ? "text-green-500" : "text-zinc-300"}`}
            >
              {word} ^
            </motion.span>
          ))}
        </h3>

        {/* Footer Bottom */}
        <BottomFooter />

        {shouldShowBrandDecoration && (
          <div className="absolute bottom-28 left-1/2 pl-10 xl:pl-14 pt-8 xl:pt-10 bg-linear-to-br from-green-500/20 via-transparent hidden lg:flex flex-col items-start justify-center text-left capitalize md:text-2xl lg:text-7xl xl:text-[7rem] m-auto font-bold">
            <h3 className="opacity-10 leading-none">Build with</h3>
            <div className="relatiev flex items-center">
              <span className="opacity-10 leading-none">
                {brandName.slice(0, 4)}
              </span>
              <span className="text-primary opacity-50 lowercase leading-none">
                {brandName.slice(4, 8)}
              </span>
            </div>
            <span className="absolute -top-2 -left-2 bg-green-500 size-4 rounded-full" />
            <span className="absolute -top-2 -left-2 bg-green-500 size-4 scale-125 rounded-full animate-ping" />
            <span className="absolute -top-2.5 -left-2.5 bg-green-500 size-5 scale-150 rounded-full animate-ping" />
            <span className="absolute top-0 left-0 bg-linear-to-b from-green-500/60 via-green-500/20 to-transparent w-px h-full" />
            <span className="absolute top-0 left-0 bg-linear-to-r from-green-500/60 via-green-500/20 to-transparent w-full h-px" />
          </div>
        )}
      </div>
    </footer>
  );
}
