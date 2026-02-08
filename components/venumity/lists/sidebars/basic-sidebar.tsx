"use client";
import { useState } from "react";
import {
  Home,
  Briefcase,
  FileText,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  HelpCircle,
} from "lucide-react";

export default function BasicSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "team", label: "Team", icon: Users },
    { id: "notifications", label: "Notifications", icon: Bell, badge: 3 },
  ];

  const bottomItems = [
    { id: "help", label: "Help", icon: HelpCircle },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-[500px] bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          collapsed ? "w-20" : "w-64"
        } flex flex-col transition-all duration-300 border-r border-gray-200 dark:border-gray-800`}
      >
        {/* Logo */}
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          } p-4 border-b border-gray-200 dark:border-gray-800`}
        >
          {!collapsed && (
            <div className="font-bold text-xl text-gray-900 dark:text-white">
              Logo
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Main Menu */}
        <div className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center ${
                  collapsed ? "justify-center" : "justify-between"
                } px-3 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  {!collapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </div>

                {!collapsed && item.badge && !isActive && (
                  <span className="bg-primary text-white text-xs font-medium px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Menu */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center ${
                  collapsed ? "justify-center" : "justify-start"
                } space-x-3 px-3 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Icon className="w-5 h-5" />
                {!collapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Basic Sidebar
        </h3>
        <div className="text-gray-600 dark:text-gray-400">
          <p>
            Current active item:{" "}
            <span className="font-medium text-primary">{activeItem}</span>
          </p>
          <p>Sidebar is {collapsed ? "collapsed" : "expanded"}</p>
          <p className="mt-4">
            Main content area goes here. You can display relevant content based
            on the active menu item.
          </p>
        </div>
      </div>
    </div>
  );
}
