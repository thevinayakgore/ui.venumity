"use client";
import { useState } from "react";

export default function SearchNavbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = ["Home", "Explore", "Library", "Trending", "Subscriptions"];

  const searchResults = [
    "How to build a React app",
    "Next.js tutorial for beginners",
    "TypeScript best practices",
    "Tailwind CSS components",
    "Modern web development",
  ];

  return (
    <nav className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg" />
              <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
                LearnHub
              </span>
            </div>

            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary font-medium"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                🔍
              </button>

              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-96 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search courses, tutorials, and more..."
                      className="w-full px-4 py-2 pl-10 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      autoFocus
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      🔍
                    </span>
                  </div>

                  {searchQuery && (
                    <div className="mt-4 space-y-2">
                      {searchResults
                        .filter((result) =>
                          result
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        )
                        .map((result, index) => (
                          <button
                            key={index}
                            className="block w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                          >
                            {result}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
              Join Free
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
