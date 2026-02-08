"use client";
import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronRight, Folder, File } from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  type: "folder" | "file";
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    label: "Projects",
    type: "folder",
    children: [
      { id: "1-1", label: "Website Redesign", type: "file" },
      { id: "1-2", label: "Mobile App", type: "file" },
      { id: "1-3", label: "API Documentation", type: "file" },
    ],
  },
  {
    id: "2",
    label: "Documents",
    type: "folder",
    children: [
      { id: "2-1", label: "Financial Reports", type: "file" },
      { id: "2-2", label: "Meeting Notes", type: "file" },
      { id: "2-3", label: "Research Papers", type: "file" },
    ],
  },
  {
    id: "3",
    label: "Media",
    type: "folder",
    children: [
      { id: "3-1", label: "Product Images", type: "file" },
      { id: "3-2", label: "Video Tutorials", type: "file" },
    ],
  },
];

export default function CollapsibleMenuWithSearch() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const filteredItems = useMemo(() => {
    if (!search) return menuItems;

    const filterTree = (items: MenuItem[]): MenuItem[] => {
      return items
        .map((item) => {
          const matchesSearch = item.label
            .toLowerCase()
            .includes(search.toLowerCase());

          if (item.children) {
            const filteredChildren = filterTree(item.children);
            if (filteredChildren.length > 0 || matchesSearch) {
              return {
                ...item,
                children: filteredChildren,
              };
            }
            return null;
          }

          return matchesSearch ? item : null;
        })
        .filter((item): item is MenuItem => item !== null);
    };

    return filterTree(menuItems);
  }, [search]);

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpanded(newExpanded);
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expanded.has(item.id);
    const shouldAutoExpand =
      search.length > 0 && item.children && item.children.length > 0;

    if (shouldAutoExpand && !isExpanded) {
      setExpanded((prev) => new Set([...prev, item.id]));
    }

    return (
      <div key={item.id}>
        <div
          className="flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
          style={{ paddingLeft: `${level * 20 + 12}px` }}
          onClick={() => hasChildren && toggleExpand(item.id)}
        >
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 dark:text-gray-400">
              {item.type === "folder" ? (
                <Folder className="w-4 h-4" />
              ) : (
                <File className="w-4 h-4" />
              )}
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              {highlightMatch(item.label, search)}
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

  const highlightMatch = (text: string, search: string) => {
    if (!search) return text;

    const parts = text.split(new RegExp(`(${search})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === search.toLowerCase() ? (
            <span
              key={i}
              className="bg-yellow-200 dark:bg-yellow-800 font-medium"
            >
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="w-72 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Collapsible Menu with Search
      </h3>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search menu items..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="space-y-1 max-h-96 overflow-y-auto">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => renderMenuItem(item))
        ) : (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            No matching items found
          </div>
        )}
      </div>
    </div>
  );
}
