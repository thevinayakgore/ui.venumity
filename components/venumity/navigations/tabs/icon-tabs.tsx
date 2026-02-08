"use client";
import { useState } from "react";

export default function IconTabs() {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "search", icon: "🔍", label: "Search" },
    { id: "favorites", icon: "⭐", label: "Favorites" },
    { id: "profile", icon: "👤", label: "Profile" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-center space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center p-4 rounded-xl transition-all ${
              activeTab === tab.id
                ? "bg-primary/10 text-primary"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <span className="text-2xl mb-1">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          {tabs.find((t) => t.id === activeTab)?.label}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Content for{" "}
          {tabs.find((t) => t.id === activeTab)?.label.toLowerCase()} tab
        </p>
      </div>
    </div>
  );
}
