"use client";
import { useState } from "react";
import {
  User,
  Settings,
  Bell,
  CreditCard,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Mail,
  Phone,
} from "lucide-react";

export default function CustomMenuWithUserProfile() {
  const [activeItem, setActiveItem] = useState("profile");

  const menuItems = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
      description: "Update your personal information",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      description: "Manage notification preferences",
      badge: 5,
    },
    {
      id: "billing",
      label: "Billing",
      icon: CreditCard,
      description: "Payment methods and invoices",
    },
    {
      id: "security",
      label: "Security",
      icon: Shield,
      description: "Password and 2FA settings",
    },
    {
      id: "support",
      label: "Support",
      icon: HelpCircle,
      description: "Get help and contact support",
    },
    {
      id: "logout",
      label: "Log Out",
      icon: LogOut,
      description: "Sign out of your account",
      variant: "danger",
    },
  ];

  return (
    <div className="w-80 p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
        Custom Menu with User Profile
      </h3>

      {/* User Profile Section */}
      <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-6">
        <div className="w-12 h-12 bg-linear-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
          JD
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-white">
            John Doe
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            john.doe@example.com
          </p>
          <div className="flex items-center space-x-3 mt-1">
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
              <Mail className="w-3 h-3 mr-1" />
              Verified
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
              <Phone className="w-3 h-3 mr-1" />
              Verified
            </span>
          </div>
        </div>
        <button className="p-2 text-gray-500 hover:text-primary bg-white dark:bg-gray-700 rounded-lg">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          const isDanger = item.variant === "danger";

          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${
                isActive
                  ? "bg-primary/10 border border-primary/20"
                  : isDanger
                  ? "hover:bg-red-50 dark:hover:bg-red-900/20"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`p-2 rounded-lg ${
                    isActive
                      ? "bg-primary text-white"
                      : isDanger
                      ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`font-medium ${
                        isActive
                          ? "text-primary"
                          : isDanger
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {item.label}
                    </span>
                    {item.badge && !isActive && (
                      <span className="bg-primary text-white text-xs font-medium px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {item.description}
                  </p>
                </div>
              </div>

              {isActive && (
                <ChevronRight
                  className={`w-5 h-5 ${
                    isDanger ? "text-red-600 dark:text-red-400" : "text-primary"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
