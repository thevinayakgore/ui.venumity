"use client";
import React, { useState } from "react";
import { ChevronRight, MoreHorizontal, Home } from "lucide-react";

export default function BreadcrumbsWithTruncation() {
  const [showAll, setShowAll] = useState(false);

  const fullPath = [
    "Home",
    "Very",
    "Long",
    "Folder",
    "Name",
    "That",
    "Should",
    "Be",
    "Truncated",
    "Final",
  ];

  const displayedPath = showAll
    ? fullPath
    : [fullPath[0], "...", ...fullPath.slice(-3)];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Breadcrumbs with Truncation
      </h3>
      <nav className="flex items-center space-x-2 text-sm">
        {displayedPath.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            )}
            {item === "..." ? (
              <button
                onClick={() => setShowAll(!showAll)}
                className="flex items-center text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            ) : (
              <a
                href="#"
                className={`px-2 py-1 rounded transition-colors ${
                  index === displayedPath.length - 1
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {item === "Home" ? (
                  <span className="flex items-center">
                    <Home className="w-4 h-4 mr-1" />
                    {item}
                  </span>
                ) : (
                  item
                )}
              </a>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}
