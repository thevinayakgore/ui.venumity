"use client";
import React, { useState } from "react";

export default function ResponsiveBreadcrumb() {
  const [expanded, setExpanded] = useState(false);

  const items = [
    { label: "Home", href: "/" },
    { label: "Library", href: "/library" },
    { label: "Data", href: "/library/data" },
    { label: "Categories", href: "/library/data/categories" },
    { label: "Products", href: "#", current: true },
  ];

  const visibleItems = expanded ? items : [items[0], items[items.length - 1]];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Responsive Breadcrumb
      </h2>
      <div className="flex items-center space-x-2">
        {visibleItems.map((item, index) => (
          <React.Fragment key={item.label}>
            {index > 0 && (
              <>
                <span className="text-gray-400 dark:text-gray-500">/</span>
                {!expanded && index === 1 && (
                  <button
                    onClick={() => setExpanded(true)}
                    className="px-2 py-1 text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  >
                    ...
                  </button>
                )}
              </>
            )}
            <a
              href={item.href}
              className={`px-3 py-1 rounded ${
                item.current
                  ? "bg-primary text-white dark:text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {item.label}
            </a>
          </React.Fragment>
        ))}
        {expanded && (
          <button
            onClick={() => setExpanded(false)}
            className="ml-2 text-sm text-primary hover:text-primary/80"
          >
            Collapse
          </button>
        )}
      </div>
    </div>
  );
}
