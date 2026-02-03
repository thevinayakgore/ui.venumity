"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon, ArrowRight } from "lucide-react";
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
    component: "text-blue-500",
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
            path: `/components/${toKebabCase(category.name)}/${toKebabCase(subcategory.name)}/${toKebabCase(item.itemName)}`,
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
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const totalSubcategories = COMPONENTS.reduce(
    (count, category) => count + category.subcategories.length,
    0,
  );

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

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === "Enter" && results.length > 0 && !isLoading) {
        event.preventDefault();
        handleResultClick(results[0]);
      }

      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, isLoading, handleResultClick, onClose]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    } else if (!isOpen) {
      setResults([]);
      setQuery("");
    }
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    const handleSearch = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const searchResults = await searchAllContent(query);
        const validResults = searchResults.filter(
          (res) => res.path && res.path !== "#" && !res.path.endsWith("/"),
        );
        setResults(validResults);
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

  // Render result item
  const renderResultItem = (result: SearchResult, index: number) => (
    <motion.div
      key={result.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        href={result.path}
        onClick={(e) => {
          e.preventDefault();
          handleResultClick(result);
        }}
        className="flex items-center gap-5 py-3 px-5 mb-2 border border-foreground/10 bg-muted/10 hover:bg-blue-500/5 hover:border-blue-500/70 text-foreground rounded-md transition-all duration-200 group w-full"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-light text-base truncate">{result.title}</h3>
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
          <p className="font-mono tracking-tight font-normal text-xs text-foreground opacity-50 lowercase mt-1">
            #_{result.category}
          </p>
        </div>
        <ArrowRight className="size-4 text-muted-foreground group-hover:text-blue-500 group-hover:translate-x-2 transition-all duration-500" />
      </Link>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-1000 bg-background/5 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full max-w-140"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0.5, scale: 0.5, y: 500, x: 500 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0.5, scale: 0.5, y: 500, x: -500 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center justify-between bg-background border-5 border-zinc-500/20 rounded-2xl shadow-2xl overflow-hidden w-full h-120">
              {/* Search Input */}
              <div className="relative  font-medium tracking-tight border-b w-full">
                <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Start searching here..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-14 pr-20 bg-background h-14 text-base border-none rounded-none shadow-none focus-visible:ring-0"
                  autoComplete="off"
                  spellCheck="false"
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  {query.length === 0 && (
                    <span className="flex items-center justify-center bg-background border text-xs p-2 h-8 rounded leading-none">
                      {totalSubcategories} Components
                    </span>
                  )}

                  {query.length >= 2 && !isLoading && results.length > 0 && (
                    <span className="flex items-center justify-center bg-background border text-xs p-2 h-8 rounded leading-none">
                      {results.length} result{results.length !== 1 ? "s" : ""}
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="leading-none px-3 text-xs bg-background border rounded cursor-pointer w-fit"
                  >
                    ESC
                  </Button>
                </div>
              </div>

              {/* Results Container */}
              <div className="flex flex-col justify-start overflow-y-auto text-center p-5 w-full h-full">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center text-muted-foreground w-full h-full">
                    <div className="animate-spin rounded-full size-10 border-2 border-primary border-t-transparent mb-4" />
                    <p className="text-sm">Searching across all content...</p>
                  </div>
                ) : results.length > 0 ? (
                  <div className="space-y-2 text-start w-full">
                    {results.map((result, index) =>
                      renderResultItem(result, index),
                    )}
                  </div>
                ) : query.length >= 2 ? (
                  <div className="flex flex-col items-center justify-center text-center text-muted-foreground w-full h-full">
                    <SearchIcon className="size-10 mb-4 opacity-50" />
                    <p className="text-sm">
                      No results found for &quot;{query}&ldquo;
                    </p>
                    <p className="text-xs mt-2">
                      Try different keywords or check spelling
                    </p>
                  </div>
                ) : query.length > 0 ? (
                  <div className="flex items-center justify-center text-muted-foreground w-full h-full">
                    <p className="text-sm">
                      Type at least 2 characters to search
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 text-start w-full h-full overflow-y-auto">
                    {[...COMPONENTS]
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((category) => (
                        <div
                          key={category.name}
                          className="border border-foreground/10 rounded-md pt-3 p-4"
                        >
                          <h3 className="text-sm md:text-base font-medium text-foreground mb-4">
                            {category.name}
                          </h3>

                          <div className="flex flex-wrap gap-2">
                            {[...category.subcategories]
                              .sort((a, b) => a.name.localeCompare(b.name))
                              .map((subcategory) => (
                                <Link
                                  key={subcategory.name}
                                  href={`/components/${toKebabCase(category.name)}/${toKebabCase(subcategory.name)}`}
                                  onClick={() => {
                                    onClose();
                                    setResults([]);
                                    setQuery("");
                                  }}
                                  className="text-sm px-5 py-1.5 rounded bg-muted/50 hover:bg-blue-500/10 border border-foreground/10 hover:border-blue-500/60 text-muted-foreground hover:text-blue-500 transition-all duration-500"
                                >
                                  {subcategory.name}
                                </Link>
                              ))}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 text-xs text-muted-foreground lowercase bg-muted/50 border-t text-center w-full">
                Search across components, docs, templates, resources, guides,
                faqs, etc.
              </div>
            </div>
          </motion.div>
        </motion.div>
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
        className="relative group flex items-center justify-start px-2! text-muted-foreground hover:text-foreground hover:border-foreground/30 cursor-pointer bg-foreground/5 border rounded w-28 hover:w-62 max-w-62 overflow-hidden transition-all duration-500"
        onClick={() => setIsSearchOpen(true)}
      >
        <SearchIcon className="size-4 shrink-0" />
        <span className="flex-1 text-left  lowercase font-normal truncate text-sm tracking-wider leading-4">
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
