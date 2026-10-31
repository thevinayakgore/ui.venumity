// components/site/navigations/search.tsx
"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { DOCS_DATA } from "@/registry/site/docs";
import { toKebabCase } from "@/utils/slug-kebab";
import Shimmer from "@/components/utility/shimmer";
import { COMPONENTS } from "@/registry/components";
import { PRIMITIVES } from "@/registry/primitives";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "motion/react";
import { insetButtonVariants } from "@/components/ui/inset-button";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import {
  Search as SearchIcon,
  ArrowRight,
  CircleFadingArrowUp,
  Mic,
  Layers,
  Boxes,
  FileText,
} from "lucide-react";

// ----------------------- TYPES -----------------------
type SearchResultType =
  | "component"
  | "primitive"
  | "docs"
  | "resource"
  | "faq"
  | "sidebar"
  | "changelog"
  | "video"
  | "contributor"
  | "category"
  | "subcategory";

interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  description?: string;
  category: string;
  path: string;
}

interface SearchContextType {
  isOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

interface InitialItem {
  id: string;
  name: string;
  category: string;
  path: string;
}

// ----------------------- CONTEXT -----------------------
const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openSearch = useCallback(() => setIsOpen(true), []);
  const closeSearch = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsOpen(true);
      }
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <SearchContext.Provider value={{ isOpen, openSearch, closeSearch }}>
      {children}
      <SearchModal isOpen={isOpen} onClose={closeSearch} />
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}

// ----------------------- WEB SPEECH API TYPES -----------------------
interface SpeechRecognitionAlternative {
  transcript: string;
  confidence?: number;
}

interface SpeechRecognitionResultLike {
  0: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultListLike {
  length: number;
  [index: number]: SpeechRecognitionResultLike;
}

interface SpeechRecognitionEventLike extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultListLike;
}

interface SpeechRecognitionErrorEventLike extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

// ----------------------- SEARCH LOGIC -----------------------
interface ApiSearchResult {
  type?: string;
  title: string;
  description?: string;
  category?: string;
  url: string;
}

async function searchAllContent(query: string): Promise<SearchResult[]> {
  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (!data.results || !Array.isArray(data.results)) {
      return [];
    }

    return data.results.map((item: ApiSearchResult, index: number) => {
      let type: SearchResultType = "component";
      const typeMap: Record<string, SearchResultType> = {
        component: "component",
        primitive: "primitive",
        resource: "resource",
        changelog: "changelog",
        docs: "docs",
        faq: "faq",
        video: "video",
      };
      const apiType = item.type ?? "component";
      type = typeMap[apiType] ?? "component";

      return {
        id: `api-result-${index}-${item.title}`,
        type: type,
        title: item.title,
        description: item.description || "",
        category: item.category || "General",
        path: item.url,
      };
    });
  } catch (error) {
    console.error("Search API error:", error);
    return [];
  }
}

// ----------------------- INITIAL SECTIONS -----------------------
function useInitialSections() {
  return useMemo(() => {
    const docsItems: InitialItem[] = [];
    DOCS_DATA.forEach((section) => {
      section.pages.forEach((page) => {
        docsItems.push({
          id: `d-${toKebabCase(page.page)}`,
          name: page.page,
          category: section.title,
          path: `/docs/${toKebabCase(page.page)}`,
        });
      });
    });

    const primitiveItems: InitialItem[] = [];
    PRIMITIVES.forEach((category) => {
      category.subcategories.forEach((subcategory) => {
        primitiveItems.push({
          id: `p-${category.slug}-${subcategory.slug}`,
          name: subcategory.name,
          category: category.name,
          path: `/primitives/${category.slug}/${subcategory.slug}`,
        });
      });
    });

    const componentItems: InitialItem[] = [];
    COMPONENTS.forEach((category) => {
      category.subcategories.forEach((subcategory) => {
        componentItems.push({
          id: `c-${category.slug}-${subcategory.slug}`,
          name: subcategory.name,
          category: category.name,
          path: `/components/${category.slug}/${subcategory.slug}`,
        });
      });
    });

    docsItems.sort((a, b) => a.name.localeCompare(b.name));
    primitiveItems.sort((a, b) => a.name.localeCompare(b.name));
    componentItems.sort((a, b) => a.name.localeCompare(b.name));

    return [
      {
        key: "docs",
        label: "Docs",
        icon: FileText,
        items: docsItems,
      },
      {
        key: "primitives",
        label: "Primitives",
        icon: Boxes,
        items: primitiveItems,
      },
      {
        key: "components",
        label: "Components",
        icon: Layers,
        items: componentItems,
      },
    ];
  }, []);
}

// ----------------------- SEARCH MODAL -----------------------
function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const router = useRouter();

  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const voiceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cleanupTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearVoiceTimeout = useCallback(() => {
    if (voiceTimeoutRef.current) {
      clearTimeout(voiceTimeoutRef.current);
      voiceTimeoutRef.current = null;
    }
  }, []);

  const clearCleanupTimeout = useCallback(() => {
    if (cleanupTimeoutRef.current) {
      clearTimeout(cleanupTimeoutRef.current);
      cleanupTimeoutRef.current = null;
    }
  }, []);

  const initialSections = useInitialSections();

  // Flatten for keyboard navigation (order = section order)
  const initialFlat = useMemo(
    () => initialSections.flatMap((s) => s.items),
    [initialSections],
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

  const handleInitialClick = useCallback(
    (path: string) => {
      router.push(path);
      onClose();
      setResults([]);
      setQuery("");
    },
    [router, onClose],
  );

  // ---------- Voice recognition setup ----------
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: SpeechRecognitionEventLike) => {
        clearVoiceTimeout();
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const chunk = event.results[i][0]?.transcript ?? "";
          if (event.results[i].isFinal) {
            finalTranscript += chunk;
          }
        }
        if (finalTranscript) {
          setQuery(finalTranscript);
          setIsListening(false);
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEventLike) => {
        clearVoiceTimeout();
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        clearVoiceTimeout();
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      console.warn("Speech recognition not supported in this browser");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      clearVoiceTimeout();
      clearCleanupTimeout();
    };
  }, [clearVoiceTimeout, clearCleanupTimeout]);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      clearVoiceTimeout();
      setToast(null);
      return;
    }
    setToast(null);
    setIsListening(true);
    try {
      recognitionRef.current.start();
      voiceTimeoutRef.current = setTimeout(() => {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
        setIsListening(false);
        setToast("You have to speak something to search !");
        cleanupTimeoutRef.current = setTimeout(() => {
          onClose();
          setToast(null);
        }, 2000);
      }, 5000);
    } catch (error) {
      console.error("Failed to start recognition:", error);
      setIsListening(false);
      clearVoiceTimeout();
    }
  }, [isListening, onClose, clearVoiceTimeout]);

  useEffect(() => {
    if (!isOpen) {
      clearVoiceTimeout();
      clearCleanupTimeout();
      setTimeout(() => {
        setToast(null);
      }, 0);
      if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
    }
  }, [isOpen, clearVoiceTimeout, clearCleanupTimeout, isListening]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      const listLength =
        query.length === 0 ? initialFlat.length : results.length;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (listLength === 0) return;
        setSelectedIndex((prev) => (prev < listLength - 1 ? prev + 1 : 0));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (listLength === 0) return;
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : listLength - 1));
      }
      if (event.key === "Enter") {
        event.preventDefault();
        if (isLoading) return;

        if (query.length === 0 && initialFlat.length > 0) {
          handleInitialClick(initialFlat[selectedIndex].path);
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
    initialFlat,
    handleResultClick,
    handleInitialClick,
    onClose,
  ]);

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
    }

    if (!isOpen) {
      const timeoutId = setTimeout(() => {
        setResults([]);
        setQuery("");
        setSelectedIndex(0);
        if (isListening) {
          recognitionRef.current?.stop();
          setIsListening(false);
        }
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, isListening]);

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
        <div className="fixed inset-0 z-100!" onClick={onClose}>
          <motion.div
            className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 md:p-2.5 lg:p-4 md:bg-foreground/5 md:backdrop-blur-xl md:rounded-4xl! md:shadow-2xl w-full md:max-w-130 h-full md:h-fit"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0.5, scale: 0.5, y: 500, x: 500 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0.5, scale: 0.5, y: 500, x: -500 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="relative flex flex-col items-center justify-between p-3 bg-background border border-foreground/15 md:rounded-2xl! overflow-hidden w-full h-full md:h-130">
              <header className="relative z-50 font-medium tracking-wide bg-popover border rounded-lg w-full h-12">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Start searching here..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 pr-16 bg-transparent! placeholder:text-foreground/40 text-foreground/90 h-full text-base border-none rounded-none shadow-none focus-visible:ring-0"
                  autoComplete="off"
                  spellCheck="false"
                />
                <button
                  type="button"
                  onClick={toggleListening}
                  className={cn(
                    "absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-muted rounded-full transition-all duration-500 flex items-center justify-center",
                  )}
                  title={isListening ? "Stop listening" : "Start voice search"}
                >
                  {isListening ? (
                    <div className="relative">
                      <Mic className="size-4 text-primary! relative z-30" />
                      <span className="absolute inset-0 z-0 bg-primary/80! animate-ping rounded-full w-full h-full" />
                      <span className="absolute inset-0 z-0 bg-primary/80! scale-110 animate-ping rounded-full w-full h-full" />
                    </div>
                  ) : (
                    <Mic className="size-4" />
                  )}
                </button>
              </header>

              <section className="absolute inset-0 z-0 flex flex-col justify-start overflow-y-auto text-center w-full h-full">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center text-muted-foreground px-5 w-full h-full">
                    <div className="animate-spin rounded-full size-10 border-2 border-foreground border-t-transparent mb-4" />
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
                              "bg-foreground/5 dark:bg-foreground/10 border-foreground/15",
                          )}
                        >
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base truncate">
                              {result.title}
                            </h3>
                            {result.description && (
                              <p className="text-xs text-muted-foreground truncate">
                                {result.description}
                              </p>
                            )}
                          </div>
                          <ArrowRight
                            className={`size-5 ${selectedIndex === index ? "text-foreground translate-x-2" : "text-muted-foreground group-hover:text-foreground group-hover:translate-x-2"} transition-all duration-500`}
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
                  // ─── Initial sections: Components / Primitives / Docs ───
                  <div className="flex flex-col gap-5 text-start px-3 py-18 w-full">
                    {initialSections.map((section) => {
                      const Icon = section.icon;
                      if (section.items.length === 0) return null;
                      return (
                        <div key={section.key} className="flex flex-col gap-1">
                          <div className="flex items-center justify-between p-3 mb-2 border-y border-dashed border-foreground/15 w-full">
                            <span className="flex items-center gap-3 text-sm uppercase tracking-wider font-medium">
                              <Icon className="size-4" />
                              {section.label}
                            </span>
                            <span className="flex items-center justify-center min-w-7.5 h-7 p-1 bg-foreground/5 dark:bg-foreground/10 border text-xs font-mono text-foreground/50 rounded-sm">
                              {section.items.length}
                            </span>
                          </div>
                          {section.items.map((item) => {
                            const flatIndex = initialFlat.indexOf(item);
                            const isSelected = selectedIndex === flatIndex;
                            return (
                              <Link
                                key={item.id}
                                ref={(el) => {
                                  itemRefs.current[flatIndex] = el;
                                }}
                                href={item.path}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleInitialClick(item.path);
                                }}
                                onMouseEnter={() => setSelectedIndex(flatIndex)}
                                className={cn(
                                  "flex items-center justify-between text-sm px-3 py-2 rounded-md text-foreground/40 border border-transparent transition-all duration-200",
                                  isSelected &&
                                    "bg-foreground/5 dark:bg-foreground/10 border-foreground/15 text-foreground",
                                )}
                              >
                                <span className="flex items-center gap-3 min-w-0 flex-1">
                                  <CircleFadingArrowUp
                                    className={`size-4 shrink-0 ${isSelected && "rotate-90 scale-110"} transition-all duration-500`}
                                  />
                                  <span className="flex-1 font-medium truncate min-w-0">
                                    {item.name}
                                  </span>
                                </span>
                                <ArrowRight
                                  className={`size-4 shrink-0 ml-2 ${isSelected ? "opacity-100 scale-120" : "opacity-60"} transition-all duration-500`}
                                />
                              </Link>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              <footer className="z-50 bg-foreground/5 dark:bg-foreground/10 backdrop-blur-lg border border-foreground/10 rounded-lg overflow-hidden w-full">
                <div className="flex items-start justify-between m-auto text-xs md:text-sm leading-none w-full h-full">
                  <div className="flex items-center justify-end p-3 bg-background border-r border-foreground/20 w-fit h-full">
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
                  <div className="flex items-center justify-end bg-background border-l border-foreground/20 w-fit h-full">
                    {query.length === 0 ? (
                      <span className="flex items-center justify-center p-3">
                        {initialFlat.length > 0 ? selectedIndex + 1 : 0}/
                        {initialFlat.length}
                      </span>
                    ) : (
                      query.length >= 2 &&
                      !isLoading &&
                      results.length > 0 && (
                        <span className="flex items-center justify-center p-3">
                          {selectedIndex + 1}/{results.length}
                        </span>
                      )
                    )}
                    <button
                      onClick={onClose}
                      className="p-3 bg-destructive text-white font-semibold leading-none border-l w-fit h-full"
                    >
                      ESC
                    </button>
                  </div>
                </div>
              </footer>
            </div>

            {toast && (
              <div className="absolute bottom-5 md:bottom-10 left-1/2 -translate-x-1/2 text-center bg-red-500 text-white p-3 rounded-md text-base text-shadow-lg text-shadow-black/20 tracking-wide shadow-lg shadow-red-500/40 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 w-[75%]">
                {toast}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ----------------------- TRIGGER -----------------------
export function SearchTrigger() {
  const { openSearch } = useSearch();

  return (
    <button
      onClick={openSearch}
      className="relative group flex items-center justify-between gap-1 pl-2 pr-1 h-9! bg-foreground/5 dark:bg-foreground/10 text-foreground border border-foreground/15 rounded-[7.5px]"
    >
      <SearchIcon className="size-3.5! shrink-0" />
      <Separator
        orientation="vertical"
        className="h-4.5 my-auto bg-foreground/40 mx-1 rotate-8"
      />
      <Mic className="size-3.5! shrink-0 mr-1" />
      <kbd
        className={insetButtonVariants(
          "relative pointer-events-none hidden lg:flex font-mono text-xs font-medium overflow-hidden",
          "sm",
        )}
      >
        <span className="text-sm leading-0">⌘</span>K
        <Shimmer className="via-white/40 w-5!" />
      </kbd>
    </button>
  );
}
