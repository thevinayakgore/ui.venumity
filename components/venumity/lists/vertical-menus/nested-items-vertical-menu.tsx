"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  File,
  FolderOpen,
  Code,
  Palette,
  Database,
  Server,
  Cloud,
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  type: "folder" | "file";
  children?: MenuItem[];
}

export default function VerticalMenuWithNestedItems() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(["projects"])
  );
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <File className="w-4 h-4" />,
      type: "file",
    },
    {
      id: "projects",
      label: "Projects",
      icon: <FolderOpen className="w-4 h-4" />,
      type: "folder",
      children: [
        {
          id: "web",
          label: "Web Development",
          icon: <Code className="w-4 h-4" />,
          type: "folder",
        },
        {
          id: "mobile",
          label: "Mobile Apps",
          icon: <Code className="w-4 h-4" />,
          type: "file",
        },
        {
          id: "design",
          label: "UI/UX Design",
          icon: <Palette className="w-4 h-4" />,
          type: "file",
        },
      ],
    },
    {
      id: "infrastructure",
      label: "Infrastructure",
      icon: <Server className="w-4 h-4" />,
      type: "folder",
      children: [
        {
          id: "database",
          label: "Database",
          icon: <Database className="w-4 h-4" />,
          type: "file",
        },
        {
          id: "cloud",
          label: "Cloud Services",
          icon: <Cloud className="w-4 h-4" />,
          type: "folder",
        },
      ],
    },
  ];

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const isActive = activeItem === item.id;

    return (
      <div key={item.id}>
        <div
          className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all cursor-pointer ${
            isActive
              ? "bg-primary text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          style={{ paddingLeft: `${level * 20 + 16}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleExpand(item.id);
            } else {
              setActiveItem(item.id);
            }
          }}
        >
          <div className="flex items-center space-x-3">
            <span className="text-gray-500 dark:text-gray-400">
              {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
          </div>

          {hasChildren && (
            <span className="text-gray-400 dark:text-gray-500">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </span>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div>
            {item.children!.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-72 p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
        Vertical Menu with Nested Items
      </h3>

      <div className="space-y-1">
        {menuItems.map((item) => renderMenuItem(item))}
      </div>

      {/* Status Information */}
      <div className="mt-8 space-y-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Current Selection
          </div>
          <div className="font-medium text-primary">{activeItem}</div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Expanded Folders
          </div>
          <div className="space-y-1">
            {Array.from(expandedItems).map((itemId) => {
              const item = findMenuItem(menuItems, itemId);
              return item ? (
                <div
                  key={itemId}
                  className="flex items-center space-x-2 text-sm"
                >
                  <span className="text-gray-400">📁</span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {item.label}
                  </span>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );

  function findMenuItem(items: MenuItem[], id: string): MenuItem | null {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findMenuItem(item.children, id);
        if (found) return found;
      }
    }
    return null;
  }
}
