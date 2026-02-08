"use client";
import { useState } from "react";

export default function CenteredNavbar() {
  const [active, setActive] = useState("home");

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "work", label: "Work" },
    { id: "blog", label: "Blog" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-linear-to-r from-primary to-purple-500 rounded-lg" />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                  active === item.id
                    ? "text-primary dark:text-primary"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                }`}
              >
                {item.label}
                {active === item.id && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-gray-600 dark:text-gray-400 hover:text-primary">
              🔍
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors text-sm">
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
