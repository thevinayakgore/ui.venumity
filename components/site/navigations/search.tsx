"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search as SearchIcon,
  ArrowRight,
  CircleFadingArrowUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { brandName } from "@/lib/brand";
import { COMPONENTS } from "@/registry/components";
import { DOCS_DATA } from "@/registry/site/docs";
import { TEMPLATES } from "@/registry/site/templates";
import { RESOURCE_CATEGORIES } from "@/registry/resources";
import { FAQDATA } from "@/registry/site/faq";
import { toKebabCase } from "@/utils/slug-kebab";
import { cn } from "@/lib/utils";

// ======================= TYPES =======================
interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  description?: string;
  category: string;
  path: string;
}

type SearchResultType =
  | "component"
  | "docs"
  | "template"
  | "resource"
  | "faq"
  | "sidebar";

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

function getResultColor(type: SearchResultType): string {
  const colorMap: Record<SearchResultType, string> = {
    component: "text-primary",
    docs: "text-green-500",
    template: "text-cyan-500",
    resource: "text-yellow-400",
    faq: "text-purple-500",
    sidebar: "text-pink-500",
  };
  return colorMap[type] || "text-foreground/70";
}

async function searchAllContent(query: string): Promise<SearchResult[]> {
  const results: SearchResult[] = [];
  const searchTerm = query.toLowerCase().trim();

  // Search Components
  COMPONENTS.forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      subcategory.items.forEach((item) => {
        const title = item.itemName.toLowerCase();
        const desc = item.description?.toLowerCase() || "";
        const tags = item.tags?.join(" ").toLowerCase() || "";

        if (
          title.includes(searchTerm) ||
          desc.includes(searchTerm) ||
          tags.includes(searchTerm)
        ) {
          results.push({
            id: `${category.name}-${subcategory.name}-${item.itemName}`,
            type: "component",
            title: item.itemName,
            description: item.description,
            category: `${category.name} > ${subcategory.name}`,
            path: `/components/${toKebabCase(category.name)}/${toKebabCase(subcategory.name)}`,
          });
        }
      });
    });
  });

  // Search Docs
  DOCS_DATA.forEach((section) => {
    section.pages.forEach((page) => {
      const title = page.page.toLowerCase();
      const tags = page.tags?.join(" ").toLowerCase() || "";

      if (title.includes(searchTerm) || tags.includes(searchTerm)) {
        results.push({
          id: `docs-${page.slug}`,
          type: "docs",
          title: page.page,
          category: "Documentation",
          path: `/docs/${page.slug}`,
        });
      }
    });
  });

  // Search Templates
  TEMPLATES.forEach((template) => {
    const title = template.name.toLowerCase();
    const desc = template.desc.toLowerCase();
    const category = template.category.toLowerCase();

    if (
      title.includes(searchTerm) ||
      desc.includes(searchTerm) ||
      category.includes(searchTerm)
    ) {
      results.push({
        id: `template-${template.name}`,
        type: "template",
        title: template.name,
        description: template.desc,
        category: "Templates",
        path: `/templates/${toKebabCase(template.name)}`,
      });
    }
  });

  // Search Resources
  RESOURCE_CATEGORIES.forEach((category) => {
    category.pages.forEach((page) => {
      const title = page.title.toLowerCase();
      const desc = page.description?.toLowerCase() || "";
      const tags = page.tags?.join(" ").toLowerCase() || "";

      if (
        title.includes(searchTerm) ||
        desc.includes(searchTerm) ||
        tags.includes(searchTerm)
      ) {
        results.push({
          id: `resource-${category.slug}-${page.title}`,
          type: "resource",
          title: page.title,
          description: page.description,
          category: `Resources > ${category.name}`,
          path: `/resources/${category.slug}/${toKebabCase(page.title)}`,
        });
      }
    });
  });

  // Search FAQs
  FAQDATA.forEach((faq) => {
    const question = faq.question.toLowerCase();
    const answer = faq.answer.toLowerCase();

    if (question.includes(searchTerm) || answer.includes(searchTerm)) {
      results.push({
        id: `faq-${faq.question.substring(0, 20)}`,
        type: "faq",
        title: faq.question,
        description: faq.answer.substring(0, 100) + "...",
        category: "FAQ",
        path: "/faq",
      });
    }
  });

  return results.slice(0, 50);
}

// ======================= MAIN COMPONENT =======================
export function Search({ isOpen, onClose }: SearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const router = useRouter();

  // Flatten all subcategories
  const allSubcategories = COMPONENTS.flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      id: `${category.name}-${subcategory.name}`,
      name: subcategory.name,
      category: category.name,
      path: `/components/${toKebabCase(category.name)}/${toKebabCase(subcategory.name)}`,
    })),
  ).sort((a, b) => a.name.localeCompare(b.name));

  const handleResultClick = useCallback(
    (result: SearchResult) => {
      const targetPath = result.type === "faq" ? "/faq" : result.path;

      if (targetPath) {
        router.push(targetPath);
        onClose();
        setResults([]);
        setQuery("");
      }
    },
    [router, onClose],
  );

  const handleSubcategoryClick = useCallback(
    (path: string) => {
      router.push(path);
      onClose();
      setResults([]);
      setQuery("");
    },
    [router, onClose],
  );

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        const maxIndex =
          query.length === 0 ? allSubcategories.length - 1 : results.length - 1;
        setSelectedIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        const maxIndex =
          query.length === 0 ? allSubcategories.length - 1 : results.length - 1;
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
      }

      if (event.key === "Enter") {
        event.preventDefault();
        if (isLoading) return;

        if (query.length === 0 && allSubcategories.length > 0) {
          const selectedSubcategory = allSubcategories[selectedIndex];
          handleSubcategoryClick(selectedSubcategory.path);
        } else if (results.length > 0) {
          handleResultClick(results[selectedIndex]);
        }
      }

      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    isOpen,
    results,
    isLoading,
    selectedIndex,
    query,
    allSubcategories,
    handleResultClick,
    handleSubcategoryClick,
    onClose,
  ]);

  // Scroll selected item into view
  useEffect(() => {
    if (itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    } else if (!isOpen) {
      setResults([]);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    const handleSearch = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        setSelectedIndex(0);
        return;
      }

      setIsLoading(true);
      try {
        const searchResults = await searchAllContent(query);
        const validResults = searchResults.filter(
          (res) => res.path && res.path !== "#" && !res.path.endsWith("/"),
        );
        setResults(validResults);
        setSelectedIndex(0);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(handleSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-1000" onClick={onClose}>
          <motion.div
            className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-3 bg-foreground/5 backdrop-blur-xl rounded-4xl! shadow-2xl w-full max-w-130"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0.5, scale: 0.5, y: 500, x: 500 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0.5, scale: 0.5, y: 500, x: -500 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="relative p-3 pt-5 bg-muted border rounded-3xl! shadow-xl/10 w-full h-full">
              <div className="absolute top-1.5 left-1/4 translate-x-16 bg-muted-foreground/30 dark:bg-popover rounded-full size-2" />
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 bg-muted-foreground/30 dark:bg-popover rounded-full h-2 w-1/5" />
              <div className="absolute top-1.5 left-1/2 translate-x-13 bg-muted-foreground/30 dark:bg-popover rounded-full size-2" />
              <div className="relative flex flex-col items-center justify-between p-3 bg-background border border-foreground/15 rounded-2xl! overflow-hidden w-full h-130">
                {/* Search Input */}
                <header className="relative z-50 font-medium tracking-tight bg-popover border-2 rounded-lg w-full h-12">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Start searching here..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10 pr-20 bg-transparent! placeholder:text-foreground/40 text-foreground/90 h-full text-base border-none rounded-none shadow-none focus-visible:ring-0"
                    autoComplete="off"
                    spellCheck="false"
                  />
                </header>

                {/* Results Container */}
                <section className="absolute inset-0 z-0 flex flex-col justify-start overflow-y-auto text-center w-full h-full">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center text-muted-foreground px-5 w-full h-full">
                      <div className="animate-spin rounded-full size-10 border-2 border-primary border-t-transparent mb-4" />
                      <p className="text-sm">Searching across all content...</p>
                    </div>
                  ) : results.length > 0 ? (
                    <div className="space-y-2 px-3 py-18 text-start w-full">
                      {results.map((result, index) => (
                        <motion.div
                          key={result.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            ref={(el) => {
                              itemRefs.current[index] = el;
                            }}
                            href={result.path}
                            onClick={(e) => {
                              e.preventDefault();
                              handleResultClick(result);
                            }}
                            onMouseEnter={() => setSelectedIndex(index)}
                            className={cn(
                              "flex items-center gap-5 py-3 px-5 border border-foreground/10 bg-muted/10 text-foreground rounded-md transition-all duration-200 group w-full",
                              selectedIndex === index &&
                                "bg-primary/10 border-primary/50",
                            )}
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-base truncate">
                                  {result.title}
                                </h3>
                                <span
                                  className={`uppercase font-mono tracking-tight font-medium text-xs ${getResultColor(result.type)}`}
                                >
                                  {result.type}
                                </span>
                              </div>
                              {result.description && (
                                <p className="text-xs text-muted-foreground truncate">
                                  {result.description}
                                </p>
                              )}
                              <p
                                className={`font-mono tracking-tight font-normal text-xs ${selectedIndex === index ? "text-primary" : "text-foreground/50"} lowercase mt-1`}
                              >
                                #_{result.category}
                              </p>
                            </div>
                            <ArrowRight
                              className={`size-4 ${selectedIndex === index ? "text-primary translate-x-2" : "text-muted-foreground group-hover:text-primary group-hover:translate-x-2"}  transition-all duration-500`}
                            />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  ) : query.length >= 2 ? (
                    <div className="flex flex-col items-center justify-center text-center text-muted-foreground px-5 w-full h-full">
                      <SearchIcon className="size-10 mb-4 opacity-50" />
                      <p className="text-sm">
                        No results found for &quot;{query}&ldquo;
                      </p>
                      <p className="text-xs mt-2">
                        Try different keywords or check spelling
                      </p>
                    </div>
                  ) : query.length > 0 ? (
                    <div className="flex items-center justify-center text-muted-foreground px-5 w-full h-full">
                      <p className="text-sm">
                        Type at least 2 characters to search
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1 text-start px-3 py-18 overflow-y-auto w-full h-full">
                      {allSubcategories.map((subcategory, index) => (
                        <Link
                          key={subcategory.id}
                          ref={(el) => {
                            itemRefs.current[index] = el;
                          }}
                          href={subcategory.path}
                          onClick={(e) => {
                            e.preventDefault();
                            handleSubcategoryClick(subcategory.path);
                          }}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={cn(
                            "flex items-center justify-between text-sm px-3 py-2 rounded-md text-foreground/40 border border-transparent transition-all duration-200",
                            selectedIndex === index &&
                              "bg-primary/5 border-primary/30 text-primary/90",
                          )}
                        >
                          <span className="flex items-center gap-3">
                            <CircleFadingArrowUp
                              className={`size-4 ${selectedIndex === index && "rotate-90 scale-110"} transition-all duration-500`}
                            />
                            <div className="flex-1 font-medium truncate min-w-0">
                              {subcategory.name}
                            </div>
                          </span>
                          <ArrowRight
                            className={`size-4 ${selectedIndex === index ? "opacity-100 scale-120" : "opacity-60"} transition-all duration-500`}
                          />
                        </Link>
                      ))}
                    </div>
                  )}
                </section>

                {/* Footer */}
                <footer className="flex flex-col items-center gap-2 p-2 z-50 bg-popover border-2 rounded-lg overflow-hidden w-full">
                  <div className="flex items-start justify-between m-auto text-[0.6rem] leading-none w-full">
                    <div className="flex items-center justify-end px-3 bg-background border dark:border-foreground/15 rounded-sm w-fit h-7">
                      <span>Use</span>
                      <kbd className="px-1 py-0.5 mx-1 bg-popover border rounded text-[0.55rem]">
                        ↑
                      </kbd>
                      <kbd className="px-1 py-0.5 mr-1 bg-popover border rounded text-[0.55rem]">
                        ↓
                      </kbd>
                      to navigate
                      <span>
                        <kbd className="px-1.5 py-0.5 mx-1 bg-popover border rounded text-[0.55rem]">
                          Enter
                        </kbd>
                        to select
                      </span>
                    </div>
                    <div className="flex items-center justify-end bg-background border dark:border-foreground/15 rounded-sm overflow-hidden w-fit h-7">
                      {query.length === 0 ? (
                        <span className="flex items-center justify-center px-2.5">
                          {selectedIndex + 1}/{allSubcategories.length}
                        </span>
                      ) : (
                        query.length >= 2 &&
                        !isLoading &&
                        results.length > 0 && (
                          <span className="flex items-center justify-center px-2.5">
                            {selectedIndex + 1}/{results.length}
                          </span>
                        )
                      )}
                      <button
                        onClick={onClose}
                        className="px-3 bg-muted dark:bg-popover leading-none text-[0.6rem] border-l cursor-pointer w-fit h-full"
                      >
                        ESC
                      </button>
                    </div>
                  </div>
                </footer>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ======================= SEARCH TRIGGER =======================
export function SearchTrigger() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsSearchOpen(true);
      }
      if (event.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  return (
    <>
      <Button
        variant="secondary"
        className="relative group flex items-center justify-start px-2! text-muted-foreground hover:text-foreground hover:border-foreground/30 cursor-pointer bg-zinc-50! dark:bg-zinc-900! border rounded w-full md:w-28 hover:w-62 max-w-62 overflow-hidden transition-all duration-500"
        onClick={() => setIsSearchOpen(true)}
      >
        <SearchIcon className="size-4 shrink-0" />
        <span className="flex-1 text-left lowercase font-normal truncate text-sm tracking-wider leading-4">
          build with {brandName}...
        </span>
        <kbd className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 hidden h-6 select-none items-center gap-0.5 rounded border border-foreground/15 group-hover:border-foreground/30 bg-muted px-2 font-mono text-[10px] font-medium sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <Search isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
