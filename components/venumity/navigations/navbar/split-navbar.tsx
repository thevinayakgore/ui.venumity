"use client";
import { useState } from "react";

export default function SplitNavbar() {
  const [active, setActive] = useState("dashboard");

  const leftItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "analytics", label: "Analytics" },
    { id: "reports", label: "Reports" },
  ];

  const rightItems = [
    { id: "settings", label: "Settings" },
    { id: "help", label: "Help" },
    { id: "profile", label: "Profile" },
  ];

  return (
    <nav className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg" />
              <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
                App
              </span>
            </div>

            <div className="hidden md:flex space-x-6">
              {leftItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    active === item.id
                      ? "bg-primary text-white"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-4">
              {rightItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    active === item.id
                      ? "bg-primary/10 text-primary dark:bg-primary/20"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <button className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                JD
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
