"use client";
import { useState } from "react";

export default function FloatingSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: "🏠", label: "Home" },
    { icon: "🔍", label: "Search" },
    { icon: "📁", label: "Files" },
    { icon: "📊", label: "Analytics" },
    { icon: "⚙️", label: "Settings" },
    { icon: "👤", label: "Profile" },
  ];

  return (
    <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50">
      {isOpen && (
        <div className="absolute left-14 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-4 min-w-[200px]">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  alert(`Navigating to ${item.label}`);
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                <span className="text-xl mr-4">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-2xl"
      >
        {isOpen ? "✕" : "☰"}
      </button>
    </div>
  );
}
