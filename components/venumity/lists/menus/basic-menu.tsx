"use client";
import { useState } from "react";
import {
  Home,
  User,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function BasicMenu() {
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell, badge: 3 },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "help", label: "Help & Support", icon: HelpCircle },
    { id: "logout", label: "Log Out", icon: LogOut, variant: "danger" },
  ];

  return (
    <div className="w-64 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Basic Menu
      </h3>

      <div className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          const isDanger = item.variant === "danger";

          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-primary text-white"
                  : isDanger
                  ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>

              <div className="flex items-center space-x-2">
                {item.badge && !isActive && (
                  <span className="bg-primary text-white text-xs font-medium px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight className="w-4 h-4" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
