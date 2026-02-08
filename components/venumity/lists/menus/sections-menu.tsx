"use client";
import { useState } from "react";
import {
  Home,
  Briefcase,
  FileText,
  Users,
  Settings,
  Star,
  Folder,
  Calendar,
  PieChart,
} from "lucide-react";

export default function MenuWithSections() {
  const [activeItem, setActiveItem] = useState("dashboard");

  const sections = [
    {
      title: "Main",
      items: [
        { id: "dashboard", label: "Dashboard", icon: Home },
        { id: "projects", label: "Projects", icon: Briefcase },
        { id: "documents", label: "Documents", icon: FileText },
      ],
    },
    {
      title: "Team",
      items: [
        { id: "team", label: "Team Members", icon: Users },
        { id: "calendar", label: "Calendar", icon: Calendar },
        { id: "analytics", label: "Analytics", icon: PieChart },
      ],
    },
    {
      title: "Favorites",
      items: [
        { id: "favorites", label: "Starred Items", icon: Star },
        { id: "recent", label: "Recently Viewed", icon: Folder },
      ],
    },
  ];

  return (
    <div className="w-64 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Menu with Sections
      </h3>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-3">
              {section.title}
            </h4>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveItem(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Settings at bottom */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveItem("settings")}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
            activeItem === "settings"
              ? "bg-primary text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          <div className="flex items-center space-x-3">
            <Settings className="w-4 h-4" />
            <span className="font-medium">Settings</span>
          </div>
          {activeItem === "settings" && (
            <div className="w-2 h-2 bg-white rounded-full" />
          )}
        </button>
      </div>
    </div>
  );
}
