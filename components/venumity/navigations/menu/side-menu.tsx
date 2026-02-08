"use client";
import { useState } from "react";

export default function SideMenu() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "projects", icon: "📁", label: "Projects" },
    { id: "tasks", icon: "✅", label: "Tasks" },
    { id: "calendar", icon: "📅", label: "Calendar" },
    { id: "messages", icon: "💬", label: "Messages" },
    { id: "analytics", icon: "📈", label: "Analytics" },
    { id: "team", icon: "👥", label: "Team" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];

  return (
    <div
      className={`flex flex-col h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg" />
              <span className="font-bold text-gray-800 dark:text-gray-200">
                Dashboard
              </span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                activeItem === item.id
                  ? "bg-primary/10 text-primary dark:bg-primary/20"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {!collapsed && (
                <span className="ml-3 font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
            JD
          </div>
          {!collapsed && (
            <div className="flex-1">
              <div className="font-medium text-gray-800 dark:text-gray-200">
                John Doe
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-500">
                Administrator
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
