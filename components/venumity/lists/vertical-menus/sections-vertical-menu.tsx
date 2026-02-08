"use client";
import { useState } from "react";
import {
  Home,
  Briefcase,
  FileText,
  Users,
  Settings,
  Star,
  History,
  HelpCircle,
} from "lucide-react";

export default function VerticalMenuWithSections() {
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
        { id: "collaboration", label: "Collaboration", icon: Users },
      ],
    },
    {
      title: "Personal",
      items: [
        { id: "favorites", label: "Favorites", icon: Star },
        { id: "recent", label: "Recent", icon: History },
      ],
    },
  ];

  const bottomItems = [
    { id: "settings", label: "Settings", icon: Settings },
    { id: "help", label: "Help & Support", icon: HelpCircle },
  ];

  return (
    <div className="w-64 p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
        Vertical Menu with Sections
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
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Items */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Item Info */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm">
          <div className="text-gray-600 dark:text-gray-400 mb-1">
            Current Selection
          </div>
          <div className="font-medium text-primary">{activeItem}</div>
        </div>
      </div>
    </div>
  );
}
