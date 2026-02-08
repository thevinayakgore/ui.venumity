"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronRight, Folder, File } from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

export default function BasicCollapsibleMenu() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(["1"])
  );

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const menuItems: MenuItem[] = [
    {
      id: "1",
      label: "Projects",
      icon: <Folder className="w-4 h-4" />,
      children: [
        {
          id: "1-1",
          label: "Project Alpha",
          icon: <File className="w-4 h-4" />,
        },
        {
          id: "1-2",
          label: "Project Beta",
          icon: <File className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "2",
      label: "Documents",
      icon: <Folder className="w-4 h-4" />,
      children: [
        { id: "2-1", label: "Reports", icon: <File className="w-4 h-4" /> },
        {
          id: "2-2",
          label: "Presentations",
          icon: <File className="w-4 h-4" />,
        },
      ],
    },
  ];

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);

    return (
      <div key={item.id} className="select-none">
        <div
          className={`flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors ${
            level === 0 ? "font-medium" : ""
          }`}
          style={{ paddingLeft: `${level * 20 + 12}px` }}
          onClick={() => hasChildren && toggleItem(item.id)}
        >
          <div className="flex items-center space-x-2">
            {item.icon && (
              <span className="text-gray-500 dark:text-gray-400">
                {item.icon}
              </span>
            )}
            <span className="text-gray-700 dark:text-gray-300">
              {item.label}
            </span>
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
    <div className="w-64 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Basic Collapsible Menu
      </h3>
      <div className="space-y-1">
        {menuItems.map((item) => renderMenuItem(item))}
      </div>
    </div>
  );
}
