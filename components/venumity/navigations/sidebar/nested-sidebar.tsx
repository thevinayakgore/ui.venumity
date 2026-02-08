"use client";
import { useState } from "react";

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  children?: MenuItem[];
}

export default function NestedSidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>(["dashboard"]);
  const [activeItem, setActiveItem] = useState("overview");

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "📊",
      children: [
        { id: "overview", label: "Overview", icon: "👁️" },
        { id: "analytics", label: "Analytics", icon: "📈" },
        { id: "reports", label: "Reports", icon: "📋" },
      ],
    },
    {
      id: "projects",
      label: "Projects",
      icon: "📁",
      children: [
        { id: "all", label: "All Projects", icon: "📦" },
        { id: "active", label: "Active", icon: "⚡" },
        { id: "completed", label: "Completed", icon: "✅" },
      ],
    },
    {
      id: "team",
      label: "Team",
      icon: "👥",
      children: [
        { id: "members", label: "Members", icon: "👤" },
        { id: "roles", label: "Roles", icon: "🎭" },
        { id: "permissions", label: "Permissions", icon: "🔐" },
      ],
    },
    {
      id: "settings",
      label: "Settings",
      icon: "⚙️",
      children: [
        { id: "account", label: "Account", icon: "👤" },
        { id: "notifications", label: "Notifications", icon: "🔔" },
        { id: "security", label: "Security", icon: "🔒" },
      ],
    },
  ];

  const toggleExpand = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg" />
          <span className="font-bold text-gray-800 dark:text-gray-200">
            Admin Panel
          </span>
        </div>
      </div>

      <nav className="p-4">
        {menuItems.map((item) => (
          <div key={item.id} className="mb-2">
            <button
              onClick={() => toggleExpand(item.id)}
              className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              <div className="flex items-center">
                <span className="text-xl mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </div>
              <span
                className={`transition-transform ${
                  expandedItems.includes(item.id) ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {expandedItems.includes(item.id) && item.children && (
              <div className="ml-8 mt-1 space-y-1">
                {item.children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => setActiveItem(child.id)}
                    className={`flex items-center w-full p-2 rounded-lg transition-colors ${
                      activeItem === child.id
                        ? "bg-primary/10 text-primary dark:bg-primary/20"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    <span className="text-lg mr-3">{child.icon}</span>
                    <span>{child.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
