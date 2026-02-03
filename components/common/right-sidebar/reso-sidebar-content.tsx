"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  smoothScrollToElement,
  setupScrollSpy,
  throttle,
} from "./utils/scroll-utils";
import CommonActions from "./common-actions";
import { toast } from "sonner";

interface HeadingItem {
  id: string;
  text: string;
  level: "h1" | "h2" | "h3";
}

export default function ResourcesSidebarContent() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const isManualScrollingRef = useRef(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Determine if we're on resources route
  const isResourcesRoute = pathname.startsWith("/resources");
  const showSidebar = isResourcesRoute;

  // Extract headings from the page content
  useEffect(() => {
    if (!showSidebar) return;

    const extractHeadings = () => {
      try {
        // Get the main article content
        const article = document.querySelector("article");
        if (!article) return;

        // Get headings from article content only
        const headingElements = Array.from(
          article.querySelectorAll("h1[id], h2[id], h3[id], h4[id]"),
        );

        const headingItems: HeadingItem[] = headingElements
          .map((el): HeadingItem | null => {
            const tag = el.tagName.toLowerCase();
            if (tag === "h1" || tag === "h2" || tag === "h3" || tag === "h4") {
              // Generate ID if not present
              if (!el.id) {
                const text = el.textContent || "";
                el.id = text
                  .toLowerCase()
                  .replace(/[^\w\s-]/g, "")
                  .replace(/\s+/g, "-")
                  .replace(/--+/g, "-");
              }

              return {
                id: el.id,
                text: el.textContent?.trim() || "",
                level: tag as "h1" | "h2" | "h3",
              };
            }
            return null;
          })
          .filter(
            (item): item is HeadingItem =>
              item !== null && item.text.length > 0,
          );

        setHeadings(headingItems);

        // Setup IntersectionObserver for scroll spy
        if (observerRef.current) {
          observerRef.current.disconnect();
        }

        if (headingItems.length > 0) {
          observerRef.current = setupScrollSpy(
            "h1[id], h2[id], h3[id], h4[id]",
            (entry) => {
              if (entry.isIntersecting && !isManualScrollingRef.current) {
                setActiveId(entry.target.id);
              }
            },
            {
              rootMargin: "-20% 0px -70% 0px",
              threshold: 0.1,
            },
          );

          // Set initial active ID
          if (!activeId && headingItems.length > 0) {
            setActiveId(headingItems[0].id);
          }
        }
      } catch (error) {
        toast.error("Error extracting headings : " + error);
      }
    };

    // Wait for page to be fully rendered
    const timer = setTimeout(() => {
      extractHeadings();
      setMounted(true);
    }, 300);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [showSidebar, pathname, activeId]);

  const handleHeadingClick = useCallback((id: string) => {
    isManualScrollingRef.current = true;
    setActiveId(id);

    // Use your existing smooth scroll utility
    const success = smoothScrollToElement(id, -100);

    if (success) {
      // Update URL without full page reload
      const newUrl = `${window.location.pathname}#${id}`;
      window.history.pushState(null, "", newUrl);
    }

    // Reset manual scrolling flag
    setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 800);
  }, []);

  // Scroll active button into view in sidebar
  useEffect(() => {
    if (!sidebarRef.current || !activeId || !mounted) return;

    const activeButton = sidebarRef.current.querySelector<HTMLButtonElement>(
      `button[data-heading-id="${activeId}"]`,
    );

    if (activeButton && sidebarRef.current) {
      const container = sidebarRef.current;
      const buttonTop = activeButton.offsetTop;
      const containerHeight = container.clientHeight;
      const buttonHeight = activeButton.clientHeight;
      const scrollTop = buttonTop - containerHeight / 2 + buttonHeight / 2;

      container.scrollTo({
        top: scrollTop,
        behavior: "smooth",
      });
    }
  }, [activeId, mounted]);

  // Handle scroll events for better UX
  useEffect(() => {
    if (!showSidebar || !mounted) return;

    const handleScroll = throttle(() => {
      if (isManualScrollingRef.current) return;
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showSidebar, mounted]);

  if (!showSidebar || !mounted) {
    return null;
  }

  return (
    <aside className="flex flex-col items-start w-full max-h-3/4">
      <h2 className="pb-2 mb-2 border-b w-full">On this page</h2>
      <div
        ref={sidebarRef}
        className="flex flex-col text-sm overflow-auto w-full h-full"
      >
        {headings.length === 0 ? (
          <div className="text-xs text-muted-foreground p-2.5 italic">
            No headings found on this page
          </div>
        ) : (
          headings.map((heading) => (
            <button
              key={heading.id}
              data-heading-id={heading.id}
              onClick={() => handleHeadingClick(heading.id)}
              className={`inline-flex text-left items-center group cursor-pointer w-fit py-1.5 text-xs transition-all duration-500 ${
                activeId === heading.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span
                title={heading.text}
                className="truncate whitespace-nowrap overflow-hidden text-ellipsis w-full"
              >
                {heading.text}
              </span>
            </button>
          ))
        )}
      </div>
      <CommonActions />
    </aside>
  );
}
