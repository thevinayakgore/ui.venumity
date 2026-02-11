"use client";
import { useState } from "react";

export default function PillsTabs() {
  const [activeTab, setActiveTab] = useState("messages");

  const tabs = [
    { id: "messages", label: "Messages", count: 3 },
    { id: "notifications", label: "Notifications", count: 12 },
    { id: "tasks", label: "Tasks", count: 5 },
    { id: "calendar", label: "Calendar", count: 0 },
  ];

  return (
    <div className="w-full">
      <div className="flex space-x-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? "bg-white dark:bg-gray-900 text-primary shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
            }`}
          >
            <span className="font-medium">{tab.label}</span>
            {tab.count > 0 && (
              <span
                className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === "messages" && (
          <div className="space-y-3">
            {["John Doe", "Jane Smith", "Bob Johnson"].map((name) => (
              <div
                key={name}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary transition-colors"
              >
                <div className="font-medium text-gray-800 dark:text-gray-200">
                  {name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-500">
                  New message from {name}
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === "notifications" && (
          <div className="text-gray-600 dark:text-gray-400">
            You have {tabs.find((t) => t.id === "notifications")?.count}{" "}
            notifications
          </div>
        )}
        {activeTab === "tasks" && (
          <div className="text-gray-600 dark:text-gray-400">
            You have {tabs.find((t) => t.id === "tasks")?.count} pending tasks
          </div>
        )}
        {activeTab === "calendar" && (
          <div className="text-gray-600 dark:text-gray-400">
            No upcoming events in calendar
          </div>
        )}
      </div>
    </div>
  );
}
