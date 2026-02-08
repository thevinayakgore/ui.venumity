"use client";
import { useState } from "react";

export default function BasicTabs() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "analytics", label: "Analytics" },
    { id: "reports", label: "Reports" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="w-full">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-primary dark:text-primary"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {activeTab === "overview" && (
          <div className="text-gray-600 dark:text-gray-400">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Overview
            </h3>
            <p>
              This is the overview content. Here you can see a summary of all
              important information.
            </p>
          </div>
        )}
        {activeTab === "analytics" && (
          <div className="text-gray-600 dark:text-gray-400">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Analytics
            </h3>
            <p>Detailed analytics and insights about your data.</p>
          </div>
        )}
        {activeTab === "reports" && (
          <div className="text-gray-600 dark:text-gray-400">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Reports
            </h3>
            <p>Generate and view detailed reports.</p>
          </div>
        )}
        {activeTab === "settings" && (
          <div className="text-gray-600 dark:text-gray-400">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Settings
            </h3>
            <p>Configure your preferences and settings.</p>
          </div>
        )}
      </div>
    </div>
  );
}
