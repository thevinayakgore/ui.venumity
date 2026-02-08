"use client";
import { useState } from "react";

export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard", icon: "📊" },
    { label: "Projects", icon: "📁" },
    { label: "Team", icon: "👥" },
    { label: "Calendar", icon: "📅" },
    { label: "Reports", icon: "📈" },
    { label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Menu ▾
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                alert(`Selected: ${item.label}`);
                setIsOpen(false);
              }}
              className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}

          <div className="border-t border-gray-100 dark:border-gray-700 my-1" />

          <button className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <span className="mr-3">🚪</span>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
