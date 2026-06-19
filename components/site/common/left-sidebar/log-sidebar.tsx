// app/changelog/log-sidebar.tsx
"use client";
import { useState } from "react";
import { useChangelog } from "@/app/changelog/layout.client";
import { ChevronDown, Terminal } from "lucide-react";
import Link from "next/link";
import { toKebabCase } from "@/utils/slug-kebab";

// Helper: group entries by year
function groupByYear(entries: ReturnType<typeof useChangelog>) {
  const groups: Record<number, typeof entries> = {};
  entries.forEach((entry) => {
    const year = new Date(entry.date).getFullYear();
    if (!groups[year]) groups[year] = [];
    groups[year].push(entry);
  });
  return Object.entries(groups).sort(([a], [b]) => Number(b) - Number(a));
}

export function LogSidebar() {
  const entries = useChangelog();
  const grouped = groupByYear(entries);

  const [openYears, setOpenYears] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    grouped.forEach(([year]) => {
      initial[year] = true;
    });
    return initial;
  });

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    slug: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Update URL hash without jumping
      window.history.pushState({}, "", `#${slug}`);
    }
  };

  return (
    <aside className="sticky top-0 p-5 max-h-screen overflow-auto w-full">
      <div className="flex flex-col items-start overflow-auto w-full h-full">
        {grouped.map(([year, items]) => {
          const isOpen = !!openYears[year];

          return (
            <div key={year} className="p-2 pb-0! last:pb-2! w-full">
              <button
                type="button"
                onClick={() =>
                  setOpenYears((prev) => ({
                    ...prev,
                    [year]: !prev[year],
                  }))
                }
                className="sticky top-0 group/btn flex w-full items-center gap-3 px-3 py-2 bg-foreground/5 backdrop-blur-md rounded-md cursor-pointer"
              >
                <Terminal className="size-4 opacity-40" />
                <h3 className="text-base font-semibold opacity-40 flex-1 text-left">
                  {year} yr
                </h3>
                <ChevronDown
                  className={`size-4 opacity-30 group-hover/btn:opacity-100 transition-all duration-500 ${isOpen ? "rotate-x-180 rotate-y-180" : "rotate-0"}`}
                />
              </button>
              {isOpen && (
                <ul className="py-2">
                  {items.map((item) => {
                    const slug = toKebabCase(item.title);
                    return (
                      <li key={item.title}>
                        <Link
                          href={`#${slug}`}
                          onClick={(e) => handleClick(e, slug)}
                          className="flex w-full min-w-0 items-center rounded-md px-3 py-2 text-sm tracking-wide text-foreground/40 hover:bg-foreground/7 hover:text-foreground cursor-pointer"
                        >
                          <span className="block w-full min-w-0 truncate tracking-wide">
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
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-50 bg-linear-to-t from-transparent via-primary to-transparent rounded-full h-[90%] w-px" />
    </aside>
  );
}
