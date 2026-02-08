"use client";
import { useState } from "react";

export default function MultiLevelSidebar() {
  const [activeLevel, setActiveLevel] = useState<
    "primary" | "secondary" | "tertiary"
  >("primary");
  const [selectedItem, setSelectedItem] = useState<string>("dashboard");

  const primaryItems = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "projects", icon: "📁", label: "Projects" },
    { id: "analytics", icon: "📈", label: "Analytics" },
    { id: "team", icon: "👥", label: "Team" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];

  const secondaryItems: Record<string, Array<{ id: string; label: string }>> = {
    dashboard: [
      { id: "overview", label: "Overview" },
      { id: "stats", label: "Statistics" },
      { id: "activity", label: "Activity" },
    ],
    projects: [
      { id: "all", label: "All Projects" },
      { id: "active", label: "Active" },
      { id: "archived", label: "Archived" },
    ],
    analytics: [
      { id: "reports", label: "Reports" },
      { id: "insights", label: "Insights" },
      { id: "metrics", label: "Metrics" },
    ],
    team: [
      { id: "members", label: "Members" },
      { id: "roles", label: "Roles" },
      { id: "permissions", label: "Permissions" },
    ],
    settings: [
      { id: "account", label: "Account" },
      { id: "preferences", label: "Preferences" },
      { id: "security", label: "Security" },
    ],
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      {/* Primary Sidebar */}
      <div
        className={`w-16 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ${
          activeLevel === "primary" ? "opacity-100" : "opacity-50"
        }`}
      >
        <div className="p-4">
          <div className="space-y-4">
            {primaryItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedItem(item.id);
                  setActiveLevel("secondary");
                }}
                className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${
                  selectedItem === item.id
                    ? "bg-primary/10 text-primary dark:bg-primary/20"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                title={item.label}
              >
                {item.icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Sidebar */}
      <div
        className={`w-56 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ${
          activeLevel === "secondary" ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <button
            onClick={() => setActiveLevel("primary")}
            className="flex items-center mb-6 text-gray-600 dark:text-gray-400 hover:text-primary"
          >
            ← Back
          </button>

          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
            {primaryItems.find((i) => i.id === selectedItem)?.label}
          </h3>

          <div className="space-y-1">
            {secondaryItems[selectedItem]?.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveLevel("tertiary")}
                className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tertiary Content */}
      <div
        className={`flex-1 p-8 transition-all duration-300 ${
          activeLevel === "tertiary" ? "opacity-100" : "opacity-50"
        }`}
      >
        <button
          onClick={() => setActiveLevel("secondary")}
          className="flex items-center mb-6 text-gray-600 dark:text-gray-400 hover:text-primary"
        >
          ← Back to {primaryItems.find((i) => i.id === selectedItem)?.label}
        </button>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Detailed Content
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          This area shows detailed content based on your selection from the
          sidebar. You can navigate through the three levels to access different
          sections of the application.
        </p>
      </div>
    </div>
  );
}
