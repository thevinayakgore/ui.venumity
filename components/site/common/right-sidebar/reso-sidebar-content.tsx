// resources-sidebar-content.tsx
"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { setupScrollSpy } from "./utils/scroll-utils";
import CommonActions from "./common-actions";
import { toast } from "sonner";
import { useScrollContainer } from "@/contexts/scroll-container";

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
  const scrollContainerRef = useScrollContainer();

  const isResourcesRoute = pathname.startsWith("/resources");
  const showSidebar = isResourcesRoute;

  // Extract headings and setup IntersectionObserver with container as root
  useEffect(() => {
    const container = scrollContainerRef?.current;
    if (!showSidebar || !container) return;

    const extractHeadings = () => {
      try {
        const article = document.querySelector("article");
        if (!article) return;

        const headingElements = Array.from(
          article.querySelectorAll("h1[id], h2[id], h3[id], h4[id]"),
        );

        const headingItems: HeadingItem[] = headingElements
          .map((el): HeadingItem | null => {
            const tag = el.tagName.toLowerCase();
            if (tag === "h1" || tag === "h2" || tag === "h3" || tag === "h4") {
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
              root: container, // 🔁 Watch inside the scroll container
              rootMargin: "-20% 0px -70% 0px",
              threshold: 0.1,
            },
          );

          if (!activeId) {
            setActiveId(headingItems[0].id);
          }
        }
      } catch (error) {
        toast.error("Error extracting headings : " + error);
      }
    };

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
  }, [showSidebar, pathname, scrollContainerRef, activeId]);

  const handleHeadingClick = useCallback((id: string) => {
    isManualScrollingRef.current = true;
    setActiveId(id);

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${id}`);
    } else {
      // fallback to old utility if element not found? No, just log error.
      toast.error("Could not find the heading");
    }

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

  // No need for window scroll listener – IntersectionObserver handles everything

  if (!showSidebar || !mounted) {
    return null;
  }

  return (
    <aside className="flex flex-col items-start font-semibold! tracking-wide! w-full max-h-3/4">
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
              className={`inline-flex text-left items-center group cursor-pointer py-1.25 text-[0.8rem] transition-all duration-500 min-w-0 w-full ${
                activeId === heading.id
                  ? "text-foreground"
                  : "text-foreground/40 hover:text-foreground"
              }`}
            >
              <span
                title={heading.text}
                className="truncate whitespace-nowrap overflow-hidden min-w-0 w-full"
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
