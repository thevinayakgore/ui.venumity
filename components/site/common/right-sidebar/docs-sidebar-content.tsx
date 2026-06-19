"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface HeadingItem {
  id: string;
  text: string;
  level: "h1" | "h2" | "h3";
}

interface DocsSidebarContentProps {
  slug: string;
}

export default function DocsSidebarContent({}: DocsSidebarContentProps) {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pageName, setPageName] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Extract page name from URL
  useEffect(() => {
    const timer = setTimeout(() => {
      const segments = pathname.split("/");
      const lastSegment = segments[segments.length - 1];

      if (lastSegment && lastSegment !== "docs") {
        const formattedName = lastSegment
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        setPageName(formattedName);
      } else {
        setPageName("Documentation");
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Extract headings
  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const extractHeadings = () => {
      const elements = Array.from(
        document.querySelectorAll("h1[id], h2[id], h3[id], div[id^='table-']"),
      ).filter((el) => !el.closest("header"));

      const headingItems: HeadingItem[] = elements
        .map((el): HeadingItem | null => {
          if (el.id.startsWith("table-")) {
            const tableNumber = el.id.replace("table-", "");
            return {
              id: el.id,
              text: `Table - ${tableNumber}`,
              level: "h3",
            };
          }

          const tag = el.tagName.toLowerCase();
          if (tag === "h1" || tag === "h2" || tag === "h3") {
            return {
              id: el.id,
              text: el.textContent || "",
              level: tag,
            };
          }

          return null;
        })
        .filter((item): item is HeadingItem => item !== null);

      setHeadings([...headingItems]);
      if (headingItems.length > 0) {
        setActiveId(headingItems[0].id);
      }

      const observedElements = document.querySelectorAll(
        "h1[id], h2[id], h3[id], div[id^='table-']",
      );

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        {
          rootMargin: "-30% 0px -60% 0px",
          threshold: 0,
        },
      );

      observedElements.forEach((el) => observer?.observe(el));
    };

    const timer = setTimeout(extractHeadings, 120);

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, [pathname, pageName]);

  // Scroll active heading into view
  useEffect(() => {
    if (activeId && buttonRefs.current[activeId] && containerRef.current) {
      const button = buttonRefs.current[activeId]!;
      const container = containerRef.current;
      const buttonTop = button.offsetTop;
      const offset = 50;
      container.scrollTo({
        top: buttonTop - offset,
        behavior: "smooth",
      });
    }
  }, [activeId]);

  const handleHeadingClick = (id: string) => {
    if (id === "page-title") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", pathname);
      setActiveId("page-title");
    } else {
      const element = document.getElementById(id);
      if (!element) return;

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.history.pushState(null, "", `#${id}`);
      setActiveId(id);
    }
  };

  return (
    <aside className="relative flex flex-col items-start font-semibold! tracking-wide! w-full max-h-3/4">
      <h2 className="pb-2 mb-2 border-b w-full">On this page</h2>

      <div
        ref={containerRef}
        className="sticky top-10 flex flex-col text-sm overflow-auto w-full h-full"
      >
        {headings.length === 0 ? (
          <div className="text-xs text-muted-foreground p-2.5 italic">
            No headings found on this page
          </div>
        ) : (
          headings.map((heading, index) => (
            <button
              key={`${heading.id}-${index}`}
              ref={(el) => void (buttonRefs.current[heading.id] = el)}
              onClick={() => handleHeadingClick(heading.id)}
              className={`inline-flex text-left items-center group cursor-pointer py-1.5 text-xs transition-all duration-500 min-w-0 w-full ${
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
    </aside>
  );
}
