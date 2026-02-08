"use client";
import { useState } from "react";
import { User, Settings, Bell, HelpCircle } from "lucide-react";

export default function BasicTabs() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "help", label: "Help", icon: HelpCircle },
  ];

  const tabContent = {
    profile: {
      title: "Profile Information",
      content:
        "Edit your personal profile information, including your name, email, and profile picture.",
    },
    settings: {
      title: "Account Settings",
      content:
        "Manage your account settings, security options, and privacy preferences.",
    },
    notifications: {
      title: "Notification Settings",
      content:
        "Configure how and when you receive notifications from the application.",
    },
    help: {
      title: "Help & Support",
      content:
        "Get help, browse documentation, or contact support for assistance.",
    },
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
        Basic Tabs
      </h3>

      {/* Tabs Header */}
      <div className="flex space-x-1 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-all relative ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
              {isActive && (
                <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
          {tabContent[activeTab as keyof typeof tabContent].title}
        </h4>
        <p className="text-gray-600 dark:text-gray-400">
          {tabContent[activeTab as keyof typeof tabContent].content}
        </p>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Currently viewing:{" "}
            <span className="font-medium text-primary">{activeTab}</span> tab
          </div>
        </div>
      </div>
    </div>
  );
}
