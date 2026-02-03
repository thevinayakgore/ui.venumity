"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { COMPONENTS } from "@/registry/components";
import { toKebabCase } from "@/utils/slug-kebab";
import NoComponentMessage from "./no-comp-message";

export default function ComponentsSidebarContent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemNames, setItemNames] = useState<string[]>([]);
  const isManualScrollingRef = useRef(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Get item names for current URL category/subcategory
  useEffect(() => {
    const currentPath = pathname.replace("/components/", "");
    const parts = currentPath.split("/").filter(Boolean);

    let currentItems: string[] = [];

    if (parts.length >= 2) {
      // Subcategory page: /components/feedbacks/alert
      const category = COMPONENTS.find(
        (c) => toKebabCase(c.name) === toKebabCase(parts[0]),
      );

      if (category) {
        const subcategory = category.subcategories.find(
          (s) => toKebabCase(s.name) === toKebabCase(parts[1]),
        );

        if (subcategory) {
          currentItems = subcategory.items.map((item) => item.itemName);
        }
      }
    } else if (parts.length === 1) {
      // Category page: /components/feedbacks
      const category = COMPONENTS.find(
        (c) => toKebabCase(c.name) === toKebabCase(parts[0]),
      );

      if (category) {
        // Get all items from all subcategories in this category
        category.subcategories.forEach((subcategory) => {
          subcategory.items.forEach((item) => {
            currentItems.push(item.itemName);
          });
        });
      }
    }

    setTimeout(() => {
      setItemNames(currentItems);
    }, 0);
  }, [pathname]);

  const handleScroll = (id: string, index: number) => {
    isManualScrollingRef.current = true;
    setActiveIndex(index);

    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = -120;
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });

    setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 1000);
  };

  // Scroll spy logic
  useEffect(() => {
    const handleScrollSpy = () => {
      if (isManualScrollingRef.current) return;

      const possibleIds = itemNames.map((name) => toKebabCase(name));

      const sectionElements = possibleIds
        .map((id) => {
          const element = document.getElementById(id);
          return {
            id,
            element,
            top: element ? element.offsetTop : 0,
          };
        })
        .sort((a, b) => a.top - b.top);

      if (sectionElements.length === 0) return;
      const scrollPosition = window.scrollY + 200;
      let currentActiveIndex = -1;

      for (let i = 0; i < sectionElements.length; i++) {
        const section = sectionElements[i];
        if (
          scrollPosition >= section.top &&
          (i === sectionElements.length - 1 ||
            scrollPosition < (sectionElements[i + 1]?.top || Infinity))
        ) {
          currentActiveIndex = i;
          break;
        }
      }

      if (
        currentActiveIndex === -1 &&
        scrollPosition < sectionElements[0].top
      ) {
        currentActiveIndex = 0;
      }

      if (currentActiveIndex !== -1 && activeIndex !== currentActiveIndex) {
        setTimeout(() => {
          setActiveIndex(currentActiveIndex);
        }, 0);
      }
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScrollSpy();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    const timeoutId = setTimeout(() => handleScrollSpy(), 500);

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      clearTimeout(timeoutId);
    };
  }, [activeIndex, itemNames]);

  // Scroll active button into view
  useEffect(() => {
    if (!sidebarRef.current || itemNames.length === 0) return;
    const activeButton = sidebarRef.current.querySelector<HTMLButtonElement>(
      "button.bg-muted\\/40",
    );
    if (activeButton) {
      const offset = 80;
      const containerTop = sidebarRef.current.getBoundingClientRect().top;
      const buttonTop = activeButton.getBoundingClientRect().top;
      sidebarRef.current.scrollTop += buttonTop - containerTop - offset;
    }
  }, [activeIndex, itemNames]);

  if (itemNames.length === 0) {
    return <NoComponentMessage />;
  }

  return (
    <div className="flex flex-col items-start w-full h-fit! max-h-3/4">
      <h2 className="pb-2 mb-2 border-b w-full">On this page</h2>
      <div
        ref={sidebarRef}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="flex flex-col overflow-auto w-full h-full"
      >
        {itemNames.map((itemName, index) => {
          const sectionId = toKebabCase(itemName);
          const isActive = index === activeIndex;

          return (
            <button
              key={itemName}
              onClick={() => handleScroll(sectionId, index)}
              className={`inline-flex text-left text-[0.8rem] items-center group cursor-pointer py-1.5 leading-none w-fit transition-all duration-500 ${
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground/70 hover:text-foreground"
              }`}
            >
              <span
                title={itemName}
                className="truncate whitespace-nowrap overflow-hidden text-ellipsis w-full"
              >
                {itemName}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
