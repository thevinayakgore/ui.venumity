"use client";
import { useState } from "react";
import { ChevronRight, Home, ChevronDown } from "lucide-react";

export default function BreadcrumbsWithDropdown() {
  const [showDropdown, setShowDropdown] = useState(false);
  const currentItem = "Smartphone";
  const relatedItems = [
    "Laptop",
    "Tablet",
    "Smartwatch",
    "Headphones",
    "Camera",
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Breadcrumbs with Dropdown
      </h3>
      <nav className="flex items-center space-x-2 text-sm">
        <a
          href="#"
          className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary flex items-center"
        >
          <Home className="w-4 h-4 mr-1" />
          Home
        </a>
        <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
        <a
          href="#"
          className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
        >
          Products
        </a>
        <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-1 text-primary font-medium hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded"
          >
            <span>Electronics</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {showDropdown && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  All Electronics
                </a>
                {relatedItems.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
        <span className="font-medium text-gray-900 dark:text-white">
          {currentItem}
        </span>
      </nav>
    </div>
  );
}
