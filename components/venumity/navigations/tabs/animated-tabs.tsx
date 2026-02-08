"use client";
import { useState } from "react";

export default function AnimatedTabs() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [hoverTab, setHoverTab] = useState<string | null>(null);

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "reports", label: "Reports", icon: "📋" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="w-full">
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            onMouseEnter={() => setHoverTab(tab.id)}
            onMouseLeave={() => setHoverTab(null)}
            className={`relative flex-1 flex items-center justify-center py-3 px-4 rounded-lg transition-all duration-300 ${
              activeTab === tab.id
                ? "text-primary"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
            }`}
          >
            <div className="flex items-center space-x-2">
              <span className="text-xl">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </div>

            {(activeTab === tab.id || hoverTab === tab.id) && (
              <div
                className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white dark:bg-gray-900 shadow-lg"
                    : "bg-white/50 dark:bg-gray-900/50"
                }`}
              />
            )}
          </button>
        ))}
      </div>

      <div className="mt-8">
        <div className="relative overflow-hidden rounded-xl bg-linear-to-r from-primary/10 to-purple-500/10 p-8">
          <div className="text-center">
            <span className="text-4xl mb-4 inline-block">
              {tabs.find((t) => t.id === activeTab)?.icon}
            </span>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome to the{" "}
              {tabs.find((t) => t.id === activeTab)?.label.toLowerCase()}{" "}
              section
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
