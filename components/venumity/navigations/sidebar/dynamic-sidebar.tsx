"use client";
import { useState } from "react";

export default function DynamicSidebar() {
  const [sidebarType, setSidebarType] = useState<
    "compact" | "normal" | "expanded"
  >("normal");
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    { icon: "📊", label: "Dashboard" },
    { icon: "📁", label: "Projects" },
    { icon: "📅", label: "Calendar" },
    { icon: "💬", label: "Messages" },
    { icon: "📈", label: "Analytics" },
    { icon: "👥", label: "Team" },
    { icon: "⚙️", label: "Settings" },
  ];

  const getSidebarWidth = () => {
    switch (sidebarType) {
      case "compact":
        return "w-20";
      case "normal":
        return "w-64";
      case "expanded":
        return "w-80";
    }
  };

  const getItemLayout = (item: { icon: string; label: string }) => {
    switch (sidebarType) {
      case "compact":
        return (
          <div className="flex flex-col items-center p-3">
            <span className="text-2xl">{item.icon}</span>
          </div>
        );
      case "normal":
        return (
          <div className="flex items-center p-3">
            <span className="text-xl mr-3">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </div>
        );
      case "expanded":
        return (
          <div className="flex items-center p-3">
            <span className="text-2xl mr-4">{item.icon}</span>
            <div className="flex-1">
              <div className="font-medium">{item.label}</div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Click to navigate
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`flex flex-col h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ${getSidebarWidth()}`}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          {sidebarType !== "compact" && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg" />
              <span className="font-bold text-gray-800 dark:text-gray-200">
                App
              </span>
            </div>
          )}

          <div className="flex space-x-1">
            {(["compact", "normal", "expanded"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSidebarType(type)}
                className={`w-8 h-8 rounded text-xs ${
                  sidebarType === type
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                }`}
                title={type.charAt(0).toUpperCase() + type.slice(1)}
              >
                {type.charAt(0)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveItem(item.label)}
              className={`w-full rounded-lg transition-colors ${
                activeItem === item.label
                  ? "bg-primary/10 text-primary dark:bg-primary/20"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              {getItemLayout(item)}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
