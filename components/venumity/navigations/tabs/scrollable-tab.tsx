"use client";
import { useState, useRef } from "react";

export default function ScrollableTabs() {
  const [activeTab, setActiveTab] = useState("all");
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const categories = [
    "all",
    "design",
    "development",
    "marketing",
    "sales",
    "support",
    "finance",
    "hr",
    "operations",
    "product",
    "research",
    "qa",
  ];

  const scrollLeft = () => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full flex items-center justify-center shadow-md"
        >
          ←
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full flex items-center justify-center shadow-md"
        >
          →
        </button>

        <div
          ref={tabsContainerRef}
          className="flex space-x-2 overflow-x-auto scrollbar-hide px-10 py-2"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeTab === category
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Content
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Showing content for {activeTab} category
          </p>
        </div>
      </div>
    </div>
  );
}
