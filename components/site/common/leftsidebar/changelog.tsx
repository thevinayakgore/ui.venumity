// components/site/common/left-sidebar/changelog.tsx
"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { toKebabCase } from "@/utils/slug-kebab";
import { useState, useEffect, useMemo } from "react";
import { CalendarCheck2, ChevronDown } from "lucide-react";
import { useChangelog } from "@/app/changelog/layout.client";

export function LogSidebar() {
  const categories = useChangelog();
  const [activeSlug, setActiveSlug] = useState<string>("");

  // Default all years to open
  const [openYears, setOpenYears] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    categories.forEach((cat) => {
      initial[cat.year] = true;
    });
    return initial;
  });

  // Flatten all items for the IntersectionObserver
  const allItems = useMemo(() => {
    return categories.flatMap((cat) => cat.items);
  }, [categories]);

  // Set the first item as active on initial load
  useEffect(() => {
    if (allItems.length > 0 && !activeSlug) {
      const timer = setTimeout(() => {
        setActiveSlug(toKebabCase(allItems[0].title));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [allItems, activeSlug]);

  // Setup IntersectionObserver to update active state on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    allItems.forEach((item) => {
      const slug = toKebabCase(item.title);
      const el = document.getElementById(slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [allItems]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    slug: string,
  ) => {
    e.preventDefault();
    setActiveSlug(slug);
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState({}, "", `#${slug}`);
    }
  };

  return (
    <aside className="sticky top-0 lg:p-1 overflow-auto w-full h-[calc(100vh-6rem)]">
      <div className="hidden lg:flex flex-col items-start p-2 overflow-auto w-full h-full">
        {categories.map((category) => {
          const year = category.year;
          const isOpen = !!openYears[year];

          // Check if the active item belongs to this category
          const isCategoryActive = category.items.some(
            (item) => toKebabCase(item.title) === activeSlug,
          );

          return (
            <div key={year} className="w-full">
              <button
                type="button"
                onClick={() =>
                  setOpenYears((prev) => ({
                    ...prev,
                    [year]: !prev[year],
                  }))
                }
                className={`sticky top-0 z-20 group/btn flex w-full items-center gap-2 p-2 border inset-shadow-white/50 rounded-lg transition-colors ${
                  isCategoryActive
                    ? "bg-primary text-white border-primary/60 inset-shadow-sm"
                    : "bg-accent hover:bg-primary hover:text-white hover:border-primary/60 hover:inset-shadow-sm"
                }`}
              >
                <CalendarCheck2 className="size-5" />
                <h3 className="text-sm md:text-base font-medium flex-1 text-left">
                  {year} Updates
                </h3>
                <ChevronDown
                  className={`size-5 transition-all duration-500 ${
                    isOpen ? "rotate-x-180 rotate-y-180" : "rotate-0"
                  }`}
                />
              </button>

              {isOpen && (
                <ul className="relative py-2 space-y-0.5">
                  {category.items.map((item) => {
                    const slug = toKebabCase(item.title);
                    const isActive = activeSlug === slug;

                    return (
                      <li key={item.title}>
                        <Link
                          href={`#${slug}`}
                          onClick={(e) => handleClick(e, slug)}
                          className={`relative flex w-full min-w-0 items-center font-medium p-2 text-sm tracking-wide border rounded-md transition-colors ${
                            isActive
                              ? "border-transparent text-foreground"
                              : "hover:bg-accent text-muted-foreground hover:text-foreground border-transparent hover:border-foreground/10"
                          }`}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="active-changelog-item"
                              className="absolute inset-0 z-0 bg-accent border border-foreground/10 rounded-md w-full h-full"
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                              }}
                            />
                          )}
                          <span className="relative z-10 block w-full min-w-0 truncate tracking-wide">
                            {item.title}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 opacity-50 bg-linear-to-t from-transparent via-primary to-transparent rounded-full h-[90%] w-px" />
    </aside>
  );
}
