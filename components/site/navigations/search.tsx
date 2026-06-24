// components/site/navigations/search.tsx
"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  Search as SearchIcon,
  ArrowRight,
  CircleFadingArrowUp,
  Mic,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { COMPONENTS } from "@/registry/components";
import { toKebabCase } from "@/utils/slug-kebab";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

// ----------------------- TYPES -----------------------
type SearchResultType =
  | "component"
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

// ----------------------- CONTEXT -----------------------
const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openSearch = useCallback(() => setIsOpen(true), []);
  const closeSearch = useCallback(() => setIsOpen(false), []);

  // Global keyboard shortcut (⌘K / Ctrl+K) AND (⌘S / Ctrl+S)
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

// ----------------------- SEARCH LOGIC (UPDATED - uses API) -----------------------
interface ApiSearchResult {
  type?: string;
  title: string;
  description?: string;
  category?: string;
  url: string;
}
function getResultColor(type: SearchResultType): string {
  const colorMap: Record<SearchResultType, string> = {
    component: "text-primary",
    docs: "text-green-500",
    resource: "text-yellow-400",
    faq: "text-purple-500",
    sidebar: "text-pink-500",
    changelog: "text-blue-400",
    video: "text-red-400",
    contributor: "text-cyan-400",
    category: "text-orange-400",
    subcategory: "text-teal-400",
  };
  return colorMap[type] || "text-foreground/70";
}

// ============================================================
// IMPORTANT FIX: Use the API endpoint instead of local search
// ============================================================
async function searchAllContent(query: string): Promise<SearchResult[]> {
  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (!data.results || !Array.isArray(data.results)) {
      return [];
    }

    // Map API results to the SearchResult format expected by the UI
    return data.results.map((item: ApiSearchResult, index: number) => {
      // Determine the type mapping
      let type: SearchResultType = "component";
      const typeMap: Record<string, SearchResultType> = {
        component: "component",
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

  // ---------- Voice recognition state ----------
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const voiceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cleanupTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // ---------------------------------------------

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

  // Flatten subcategories for empty-state display
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
      // Set 5-second timeout for inactivity
      voiceTimeoutRef.current = setTimeout(() => {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
        setIsListening(false);
        setToast("You have to speak something to search !");
        // Close modal after 2 seconds to let user read toast
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

  // Clean up when modal closes
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

  // Keyboard navigation (unchanged)
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
          handleSubcategoryClick(allSubcategories[selectedIndex].path);
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

  // Focus input on open / clear on close - FIXED with setTimeout
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }

    if (!isOpen) {
      // Use setTimeout to avoid synchronous setState cascade
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

  // Debounced search (UPDATED - uses API)
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
          {/* GLASS CONTAINER - EXACT ORIGINAL DESIGN */}
          <motion.div
            className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-3 bg-foreground/5 backdrop-blur-xl rounded-4xl! shadow-2xl w-full max-w-130"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0.5, scale: 0.5, y: 500, x: 500 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0.5, scale: 0.5, y: 500, x: -500 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="relative p-3 pt-5 bg-muted border rounded-3xl! shadow-xl/10 w-full h-full">
              {/* Decorative dots */}
              <div className="absolute top-1.5 left-1/4 translate-x-16 bg-muted-foreground/30 dark:bg-popover rounded-full size-2" />
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 bg-muted-foreground/30 dark:bg-popover rounded-full h-2 w-1/5" />
              <div className="absolute top-1.5 left-1/2 translate-x-13 bg-muted-foreground/30 dark:bg-popover rounded-full size-2" />

              <div className="relative flex flex-col items-center justify-between p-3 bg-background border border-foreground/15 rounded-2xl! overflow-hidden w-full h-130">
                {/* Search Input with Voice Button */}
                <header className="relative z-50 font-semibold tracking-wide bg-popover border rounded-lg w-full h-12">
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
                  {/* Microphone button with pulse animation when listening */}
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={cn(
                      "absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-muted rounded-full transition-all duration-500 flex items-center justify-center",
                    )}
                    title={
                      isListening ? "Stop listening" : "Start voice search"
                    }
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
                                "bg-primary/10 border-primary/30",
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
                              className={`size-4 ${selectedIndex === index ? "text-primary translate-x-2" : "text-muted-foreground group-hover:text-primary group-hover:translate-x-2"} transition-all duration-500`}
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
                    // Subcategories list (empty state)
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
                              "bg-primary/10 border-primary/30 text-primary/90",
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
                <footer className="flex flex-col items-center gap-2 p-2 z-50 bg-popover border rounded-lg overflow-hidden w-full">
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

              {/* Toast notification */}
              {toast && (
                <div className="absolute bottom-5 md:bottom-10 left-1/2 -translate-x-1/2 text-center bg-red-500 text-white p-3 rounded-md text-base text-shadow-lg text-shadow-black/20 tracking-wide shadow-lg shadow-red-500/40 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 w-[75%]">
                  {toast}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ----------------------- TRIGGER (unchanged) -----------------------
export function SearchTrigger() {
  const { openSearch } = useSearch();

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={openSearch}
      className="relative group flex items-center justify-between pl-2! pr-0.5! h-8! bg-foreground/5! border-foreground/15! transition-all duration-500 cursor-pointer rounded-sm"
    >
      <SearchIcon className="size-3.5! shrink-0" />
      <Separator
        orientation="vertical"
        className="h-4 my-auto bg-foreground/40 mx-1 rotate-8"
      />
      <Mic className="size-3.5! shrink-0 mr-1" />
      <kbd className="pointer-events-none hidden sm:flex h-6 select-none items-center gap-0.5 rounded bg-foreground/7! border border-foreground/15 px-1.5 font-mono text-[10px] font-medium">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  );
}
