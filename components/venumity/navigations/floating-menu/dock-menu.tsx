"use client";
import { useState } from "react";

export default function DockMenu() {
  const [active, setActive] = useState<string | null>(null);

  const dockItems = [
    { icon: "🔍", label: "Search" },
    { icon: "📧", label: "Mail" },
    { icon: "📅", label: "Calendar" },
    { icon: "📱", label: "Phone" },
    { icon: "🌐", label: "Browser" },
    { icon: "📁", label: "Files" },
    { icon: "🎵", label: "Music" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="flex items-end space-x-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 shadow-xl">
        {dockItems.map((item) => (
          <button
            key={item.label}
            onMouseEnter={() => setActive(item.label)}
            onMouseLeave={() => setActive(null)}
            onClick={() => alert(`Opening ${item.label}`)}
            className="flex flex-col items-center transition-all duration-200"
          >
            <div
              className={`rounded-xl p-3 flex items-center justify-center text-2xl transition-all duration-200 ${
                active === item.label
                  ? "scale-125 bg-primary/10 dark:bg-primary/20"
                  : "hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {item.icon}
            </div>
            <span
              className={`text-xs mt-1 transition-all duration-200 ${
                active === item.label
                  ? "opacity-100 translate-y-0 text-primary"
                  : "opacity-0 translate-y-2"
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
