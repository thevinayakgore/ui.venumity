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

type MenuItem = {
  id: string;
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  badge?: number;
  variant?: string;
};

export default function CustomMenuWithCategories() {
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuCategories: { title: string; items: MenuItem[] }[] = [
    {
      title: "Main",
      items: [
        { id: "dashboard", label: "Dashboard", icon: Home },
        { id: "profile", label: "Profile", icon: User },
        { id: "notifications", label: "Notifications", icon: Bell, badge: 3 },
      ],
    },
    {
      title: "Settings",
      items: [
        { id: "account", label: "Account Settings", icon: Settings },
        { id: "privacy", label: "Privacy", icon: Settings },
        { id: "billing", label: "Billing", icon: Settings },
      ],
    },
    {
      title: "Support",
      items: [
        { id: "help", label: "Help Center", icon: HelpCircle },
        { id: "contact", label: "Contact Us", icon: HelpCircle },
        { id: "logout", label: "Log Out", icon: LogOut, variant: "danger" },
      ],
    },
  ];

  return (
    <div className="w-64 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Custom Menu with Categories
      </h3>

      <div className="space-y-6">
        {menuCategories.map((category) => (
          <div key={category.title}>
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              {category.title}
            </h4>
            <div className="space-y-1">
              {category.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;
                const isDanger = item.variant === "danger";

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveItem(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                      isActive
                        ? "bg-primary text-white"
                        : isDanger
                        ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4" />
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
        ))}
      </div>
    </div>
  );
}
