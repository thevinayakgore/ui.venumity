"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  Users,
  Settings,
  Database,
  Code,
  Palette,
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  type: "folder" | "file";
  children?: MenuItem[];
}

export default function SidebarWithNestedMenus() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(["projects", "team"])
  );
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Folder className="w-4 h-4" />,
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
          type: "folder",
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
      id: "team",
      label: "Team",
      icon: <Users className="w-4 h-4" />,
      type: "folder",
      children: [
        {
          id: "members",
          label: "Team Members",
          icon: <Users className="w-4 h-4" />,
          type: "file",
        },
        {
          id: "roles",
          label: "Roles & Permissions",
          icon: <Settings className="w-4 h-4" />,
          type: "file",
        },
      ],
    },
    {
      id: "database",
      label: "Database",
      icon: <Database className="w-4 h-4" />,
      type: "folder",
      children: [
        {
          id: "tables",
          label: "Tables",
          icon: <Database className="w-4 h-4" />,
          type: "file",
        },
        {
          id: "queries",
          label: "Queries",
          icon: <Code className="w-4 h-4" />,
          type: "file",
        },
        {
          id: "backups",
          label: "Backups",
          icon: <Database className="w-4 h-4" />,
          type: "file",
        },
      ],
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
      type: "file",
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
          style={{ paddingLeft: `${level * 24 + 16}px` }}
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
    <div className="flex h-[500px] bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 flex flex-col border-r border-gray-200 dark:border-gray-800">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">
            File Explorer
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your projects and files
          </p>
        </div>

        {/* Menu */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => renderMenuItem(item))}
          </div>
        </div>

        {/* Status */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <div className="flex justify-between mb-1">
              <span>Expanded items:</span>
              <span className="font-medium">{expandedItems.size}</span>
            </div>
            <div className="flex justify-between">
              <span>Active item:</span>
              <span className="font-medium text-primary">{activeItem}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Sidebar with Nested Menus
        </h3>

        <div className="space-y-6">
          {/* Current Selection */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="font-medium text-gray-900 dark:text-white mb-2">
              Current Selection
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Active:{" "}
              <span className="font-medium text-primary">{activeItem}</span>
            </div>
          </div>

          {/* Expanded Items */}
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="font-medium text-gray-900 dark:text-white mb-3">
              Expanded Folders
            </div>
            <div className="space-y-2">
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

          {/* Breadcrumb Path */}
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="font-medium text-gray-900 dark:text-white mb-3">
              Current Path
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {getBreadcrumbPath(menuItems, activeItem).map(
                (item, index, array) => (
                  <React.Fragment key={item.id}>
                    <span
                      className={
                        item.id === activeItem ? "text-primary font-medium" : ""
                      }
                    >
                      {item.label}
                    </span>
                    {index < array.length - 1 && (
                      <span className="mx-2">/</span>
                    )}
                  </React.Fragment>
                )
              )}
            </div>
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

  function getBreadcrumbPath(items: MenuItem[], id: string): MenuItem[] {
    const path: MenuItem[] = [];

    function findPath(currentItems: MenuItem[], currentId: string): boolean {
      for (const item of currentItems) {
        if (item.id === currentId) {
          path.push(item);
          return true;
        }
        if (item.children) {
          path.push(item);
          if (findPath(item.children, currentId)) {
            return true;
          }
          path.pop();
        }
      }
      return false;
    }

    findPath(items, id);
    return path;
  }
}
