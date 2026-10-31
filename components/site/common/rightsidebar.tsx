// components/site/common/rightsidebar.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import Actions from "../content/actions";
import { usePathname } from "next/navigation";
import { RESOURCES } from "@/registry/resources";
import { COMPONENTS } from "@/registry/components";
import { PRIMITIVES } from "@/registry/primitives";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

interface HeadingItem {
  id: string;
  text: string;
}

interface Contributor {
  username: string;
  avatar: string;
  profileUrl: string;
  sources: Set<string>;
}

// ── Extract all unique contributors from the registries ─────
function extractContributors(): Contributor[] {
  const map = new Map<string, Contributor>();

  const addSource = (username: string, source: string) => {
    if (!map.has(username)) {
      map.set(username, {
        username,
        avatar: `https://github.com/${username}.png`,
        profileUrl: `https://github.com/${username}`,
        sources: new Set(),
      });
    }
    map.get(username)!.sources.add(source);
  };

  // From components
  COMPONENTS.forEach((cat) => {
    cat.subcategories.forEach((sub) => {
      sub.items.forEach((item) => {
        if (item.githubUsername) {
          addSource(item.githubUsername, "Component Contributor");
        }
      });
    });
  });

  // From primitives
  PRIMITIVES.forEach((cat) => {
    cat.subcategories.forEach((sub) => {
      sub.items.forEach((item) => {
        if (item.githubUsername) {
          addSource(item.githubUsername, "Primitive Contributor");
        }
      });
    });
  });

  // From resources (authors)
  RESOURCES.forEach((cat) => {
    cat.pages.forEach((page) => {
      if (page.authorNames) {
        page.authorNames.forEach((author) => {
          addSource(author, "Resource Contributor");
        });
      }
    });
  });

  // Always include the core author as Core
  if (map.has("thevinayakgore")) {
    map.get("thevinayakgore")!.sources.add("Core");
  } else {
    map.set("thevinayakgore", {
      username: "thevinayakgore",
      avatar: `https://github.com/thevinayakgore.png`,
      profileUrl: `https://github.com/thevinayagore`,
      sources: new Set(["Core"]),
    });
  }

  return Array.from(map.values()).sort((a, b) =>
    a.username.localeCompare(b.username),
  );
}

// ── Component ───────────────────────────────────────────────
export default function RightSidebar() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const isManualScrollingRef = useRef(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const isDocsRoute = pathname?.startsWith("/docs");
  const isResourcesRoute = pathname?.startsWith("/resources");
  const isContributorsPage = pathname === "/docs/contributors";
  const showSidebar = isDocsRoute || isResourcesRoute;

  const contributors = useMemo(() => {
    if (!isContributorsPage) return [];
    return extractContributors();
  }, [isContributorsPage]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!showSidebar) return;
    const timer = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(timer);
  }, [showSidebar]);

  // Extract headings
  useEffect(() => {
    if (!mounted || !showSidebar || isContributorsPage) return;

    const extractHeadings = () => {
      try {
        const contentArea =
          document.getElementById("content") ||
          document.querySelector("article") ||
          document.body;

        const headingElements = Array.from(
          contentArea.querySelectorAll("h1[id], h2[id], h3[id]"),
        ).filter(
          (el) =>
            !el.closest("header") &&
            !el.closest("nav") &&
            !el.closest("footer"),
        );

        const headingItems: HeadingItem[] = headingElements
          .map((el): HeadingItem | null => {
            if (!el.id) {
              el.id = (el.textContent || "")
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/--+/g, "-");
            }
            return { id: el.id, text: el.textContent?.trim() || "" };
          })
          .filter(
            (item): item is HeadingItem =>
              item !== null && item.text.length > 0,
          );

        setHeadings(headingItems);
        observerRef.current?.disconnect();

        if (headingItems.length > 0) {
          observerRef.current = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting && !isManualScrollingRef.current) {
                  setActiveId(entry.target.id);
                }
              });
            },
            {
              rootMargin: "-20% 0px -70% 0px",
              threshold: 0.1,
            },
          );

          headingElements.forEach((el) => observerRef.current?.observe(el));
          if (!activeId) setActiveId(headingItems[0].id);
        }
      } catch (error) {
        console.error("Error extracting headings:", error);
      }
    };

    const timer = setTimeout(extractHeadings, 200);
    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  }, [pathname, mounted, showSidebar, activeId, isContributorsPage]);

  // Scroll active heading into view
  useEffect(() => {
    if (!sidebarRef.current || !activeId || !mounted) return;

    const activeButton = sidebarRef.current.querySelector<HTMLButtonElement>(
      `button[data-heading-id="${activeId}"]`,
    );
    if (activeButton) {
      const container = sidebarRef.current;
      const buttonTop = activeButton.offsetTop;
      const containerHeight = container.clientHeight;
      const buttonHeight = activeButton.clientHeight;
      container.scrollTo({
        top: buttonTop - containerHeight / 2 + buttonHeight / 2,
        behavior: "smooth",
      });
    }
  }, [activeId, mounted]);

  const handleHeadingClick = useCallback((id: string) => {
    isManualScrollingRef.current = true;
    setActiveId(id);

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${id}`);
    }

    setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 800);
  }, []);

  if (!showSidebar || windowWidth <= 1280 || !mounted) return null;

  return (
    <aside className="sticky top-0 p-4 pl-0 overflow-hidden w-full max-h-screen">
      <h2 className="text-sm font-semibold tracking-wide pb-2 mb-2 border-b w-full shrink-0">
        {isContributorsPage ? "Contributors" : "On this page"}
      </h2>

      <div
        ref={sidebarRef}
        className="flex-1 flex-col gap-0.5 pr-2 overflow-auto min-h-0 w-full max-h-[50%]"
      >
        {/* ✅ Contributors list */}
        {isContributorsPage ? (
          <div
            className={`flex flex-col ${isContributorsPage ? "gap-1" : "gap-2"} py-1 w-full`}
          >
            {contributors.map((contributor) => {
              // Format the sources
              const sourceList = Array.from(contributor.sources);
              const isCore =
                sourceList.includes("Core") ||
                (sourceList.includes("Component") &&
                  sourceList.includes("Primitive") &&
                  sourceList.includes("Resource"));

              const sourceLabel = isCore
                ? "Core Contributor"
                : sourceList.join(", ");

              return (
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  key={contributor.username}
                  href={contributor.profileUrl}
                  className="group flex items-center gap-1.5 p-0.75 hover:bg-foreground/10 rounded-md transition-all duration-300"
                >
                  <div className="shrink-0 size-8 border border-foreground/10 rounded-sm overflow-hidden">
                    <Image
                      src={contributor.avatar}
                      alt={contributor.username}
                      width={500}
                      height={500}
                      priority
                      unoptimized
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col font-medium min-w-0">
                    <span className="text-xs font-semibold truncate text-foreground">
                      {contributor.username}
                    </span>
                    <span className="text-[0.65rem] text-muted-foreground">
                      {sourceLabel}
                    </span>
                  </div>
                </Link>
              );
            })}

            {contributors.length === 0 && (
              <div className="text-xs text-muted-foreground p-2.5 italic">
                No contributors found.
              </div>
            )}
          </div>
        ) : headings.length === 0 ? (
          <div className="text-xs text-muted-foreground p-2.5 italic">
            No headings found on this page
          </div>
        ) : (
          headings.map((heading) => (
            <button
              key={heading.id}
              data-heading-id={heading.id}
              onClick={() => handleHeadingClick(heading.id)}
              className={`block text-start py-0.75 text-[0.8rem] font-medium transition-all duration-300 truncate shrink-0 w-full ${
                activeId === heading.id
                  ? "text-foreground"
                  : "text-foreground/40 hover:text-foreground"
              }`}
            >
              <span className="block truncate w-full" title={heading.text}>
                {heading.text}
              </span>
            </button>
          ))
        )}
      </div>
      <Actions />
    </aside>
  );
}
