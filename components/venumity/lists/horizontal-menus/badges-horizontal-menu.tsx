"use client";
import { useState } from "react";
import { Inbox, Send, FileText, Star, Trash2, Folder } from "lucide-react";

export default function HorizontalMenuWithBadges() {
  const [activeTab, setActiveTab] = useState("inbox");

  const menuItems = [
    {
      id: "inbox",
      label: "Inbox",
      icon: Inbox,
      badge: 12,
      badgeColor: "bg-blue-500",
    },
    { id: "sent", label: "Sent", icon: Send, badge: 0 },
    {
      id: "drafts",
      label: "Drafts",
      icon: FileText,
      badge: 3,
      badgeColor: "bg-yellow-500",
    },
    {
      id: "starred",
      label: "Starred",
      icon: Star,
      badge: 8,
      badgeColor: "bg-orange-500",
    },
    { id: "archive", label: "Archive", icon: Folder, badge: 0 },
    {
      id: "spam",
      label: "Spam",
      icon: Trash2,
      badge: 47,
      badgeColor: "bg-red-500",
    },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Horizontal Menu with Badges
      </h3>

      <div className="flex flex-wrap gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const hasBadge = item.badge > 0;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all relative ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{item.label}</span>

              {hasBadge && (
                <span
                  className={`${
                    item.badgeColor || "bg-gray-500"
                  } text-white text-xs font-medium px-2 py-0.5 rounded-full min-w-6 text-center ${
                    isActive ? "bg-white text-primary" : ""
                  }`}
                >
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              )}

              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-white rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
