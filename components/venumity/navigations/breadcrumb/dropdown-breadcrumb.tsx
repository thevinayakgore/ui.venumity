"use client";
import React, { useState } from "react";

export default function BreadcrumbWithDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const history = [
    { label: "Home", href: "/" },
    { label: "Documents", href: "/documents" },
    { label: "Projects", href: "/documents/projects" },
    { label: "2023", href: "/documents/projects/2023" },
    { label: "Q4 Reports", href: "#", current: true },
  ];

  const recentItems = [
    { label: "Q3 Reports", href: "/documents/projects/2023/q3" },
    { label: "Marketing", href: "/documents/projects/2023/marketing" },
    { label: "Financial", href: "/documents/projects/2023/financial" },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Breadcrumb with History
      </h2>
      <div className="flex items-center space-x-2">
        {history.slice(0, 3).map((item, index) => (
          <React.Fragment key={item.label}>
            {index > 0 && (
              <span className="text-gray-400 dark:text-gray-500">/</span>
            )}
            <a
              href={item.href}
              className="px-2 py-1 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
            >
              {item.label}
            </a>
          </React.Fragment>
        ))}

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="px-2 py-1 text-gray-400 dark:text-gray-500 hover:text-primary"
          >
            ...
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 border rounded-lg shadow-lg py-1 z-10">
              {history.slice(3, -1).map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {item.label}
                </a>
              ))}
              <div className="border-t my-1 dark:border-gray-700" />
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                Recent
              </div>
              {recentItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <span className="text-gray-400 dark:text-gray-500">/</span>
        <a
          href={history[history.length - 1].href}
          className="px-2 py-1 font-medium text-primary dark:text-primary"
        >
          {history[history.length - 1].label}
        </a>
      </div>
    </div>
  );
}
