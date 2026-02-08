"use client";
import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  File,
  Plus,
  MoreVertical,
  Trash2,
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  type: "folder" | "file";
  children?: MenuItem[];
}

export default function CollapsibleMenuWithActions() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["projects"]));
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "projects",
      label: "Projects",
      type: "folder",
      children: [
        { id: "p1", label: "Website Design", type: "file" },
        { id: "p2", label: "Mobile App", type: "file" },
      ],
    },
    {
      id: "documents",
      label: "Documents",
      type: "folder",
      children: [
        { id: "d1", label: "Report.pdf", type: "file" },
        { id: "d2", label: "Presentation.pptx", type: "file" },
      ],
    },
  ]);

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpanded(newExpanded);
  };

  const addItem = (parentId?: string) => {
    const newItem: MenuItem = {
      id: `new-${Date.now()}`,
      label: "New Item",
      type: "file",
    };

    if (parentId) {
      setMenuItems((prev) =>
        prev.map((item) =>
          item.id === parentId
            ? { ...item, children: [...(item.children || []), newItem] }
            : item
        )
      );
    } else {
      setMenuItems((prev) => [...prev, newItem]);
    }
  };

  const deleteItem = (id: string) => {
    const deleteRecursive = (items: MenuItem[]): MenuItem[] => {
      return items
        .filter((item) => item.id !== id)
        .map((item) => ({
          ...item,
          children: item.children ? deleteRecursive(item.children) : undefined,
        }));
    };

    setMenuItems(deleteRecursive(menuItems));
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expanded.has(item.id);

    return (
      <div
        key={item.id}
        className="group"
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <div
          className="flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          style={{ paddingLeft: `${level * 24 + 12}px` }}
        >
          <div
            className="flex items-center space-x-2 flex-1 cursor-pointer"
            onClick={() => hasChildren && toggleExpand(item.id)}
          >
            {hasChildren && (
              <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            )}
            {!hasChildren && <div className="w-4" />}

            <span className="text-gray-500 dark:text-gray-400">
              {item.type === "folder" ? (
                <Folder className="w-4 h-4" />
              ) : (
                <File className="w-4 h-4" />
              )}
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              {item.label}
            </span>
          </div>

          <div
            className={`flex items-center space-x-1 transition-opacity ${
              hoveredItem === item.id ? "opacity-100" : "opacity-0"
            }`}
          >
            {item.type === "folder" && (
              <button
                onClick={() => addItem(item.id)}
                className="p-1 text-gray-400 hover:text-primary"
                title="Add item"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => deleteItem(item.id)}
              className="p-1 text-gray-400 hover:text-red-500"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              title="More actions"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div>
            {item.children!.map((child) =>
              renderMenuItem(child, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-72 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Collapsible Menu with Actions
        </h3>
        <button
          onClick={() => addItem()}
          className="p-2 text-gray-500 hover:text-primary bg-gray-100 dark:bg-gray-800 rounded-lg"
          title="Add folder"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-1">
        {menuItems.map((item) => renderMenuItem(item))}
      </div>
    </div>
  );
}
