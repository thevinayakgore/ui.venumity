"use client";
import React from "react";
import { ChevronRight, Home } from "lucide-react";

export default function BasicBreadcrumbs() {
  const items = ["Home", "Products", "Electronics", "Smartphones"];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Basic Breadcrumbs
      </h3>
      <nav className="flex items-center space-x-2 text-sm">
        <a
          href="#"
          className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary flex items-center"
        >
          <Home className="w-4 h-4 mr-1" />
          Home
        </a>
        {items.slice(1).map((item, index) => (
          <React.Fragment key={item}>
            <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            <a
              href="#"
              className={`${
                index === items.length - 2
                  ? "text-primary font-medium"
                  : "text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              }`}
            >
              {item}
            </a>
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}
