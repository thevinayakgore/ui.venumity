"use client";
import { useState } from "react";

export default function MegaMenu() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = [
    {
      id: "design",
      name: "Design",
      items: [
        { title: "UI Design", description: "User interface design tools" },
        {
          title: "UX Research",
          description: "User experience research methods",
        },
        {
          title: "Prototyping",
          description: "Interactive prototypes creation",
        },
      ],
    },
    {
      id: "development",
      name: "Development",
      items: [
        { title: "Frontend", description: "Client-side development" },
        { title: "Backend", description: "Server-side development" },
        { title: "DevOps", description: "Development operations" },
      ],
    },
    {
      id: "marketing",
      name: "Marketing",
      items: [
        { title: "SEO", description: "Search engine optimization" },
        { title: "Content", description: "Content marketing strategies" },
        { title: "Social Media", description: "Social media marketing" },
      ],
    },
  ];

  return (
    <div className="relative">
      <div className="flex space-x-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onMouseEnter={() => setActiveCategory(category.id)}
            onMouseLeave={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeCategory === category.id
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {activeCategory && (
        <div
          className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-6 z-50"
          onMouseEnter={() => setActiveCategory(activeCategory)}
          onMouseLeave={() => setActiveCategory(null)}
        >
          <div className="grid grid-cols-3 gap-6">
            {categories
              .find((cat) => cat.id === activeCategory)
              ?.items.map((item, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary transition-colors cursor-pointer"
                >
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                  Need help choosing?
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Our experts can guide you
                </p>
              </div>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
