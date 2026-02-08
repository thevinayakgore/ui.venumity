"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Mail,
  MessageSquare,
  Bell,
  Users,
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  children?: MenuItem[];
}

export default function CollapsibleMenuWithBadges() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["messages"]));

  const menuItems: MenuItem[] = [
    {
      id: "messages",
      label: "Messages",
      icon: <Mail className="w-4 h-4" />,
      badge: 12,
      children: [
        {
          id: "inbox",
          label: "Inbox",
          icon: <Mail className="w-4 h-4" />,
          badge: 5,
        },
        { id: "sent", label: "Sent", icon: <Mail className="w-4 h-4" /> },
        {
          id: "drafts",
          label: "Drafts",
          icon: <Mail className="w-4 h-4" />,
          badge: 2,
        },
        {
          id: "spam",
          label: "Spam",
          icon: <Mail className="w-4 h-4" />,
          badge: 45,
        },
      ],
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="w-4 h-4" />,
      badge: 3,
      children: [
        {
          id: "unread",
          label: "Unread",
          icon: <Bell className="w-4 h-4" />,
          badge: 3,
        },
        {
          id: "archived",
          label: "Archived",
          icon: <Bell className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "team",
      label: "Team Chat",
      icon: <Users className="w-4 h-4" />,
      children: [
        {
          id: "general",
          label: "General",
          icon: <MessageSquare className="w-4 h-4" />,
          badge: 23,
        },
        {
          id: "projects",
          label: "Projects",
          icon: <MessageSquare className="w-4 h-4" />,
          badge: 7,
        },
        {
          id: "random",
          label: "Random",
          icon: <MessageSquare className="w-4 h-4" />,
        },
      ],
    },
  ];

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

    return (
      <div key={item.id}>
        <div
          className="flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
          style={{ paddingLeft: `${level * 20 + 12}px` }}
          onClick={() => hasChildren && toggleExpand(item.id)}
        >
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 dark:text-gray-400">
              {item.icon}
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              {item.label}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {item.badge !== undefined && (
              <span className="bg-primary text-white text-xs font-medium px-2 py-0.5 rounded-full min-w-6 text-center">
                {item.badge}
              </span>
            )}
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
        Collapsible Menu with Badges
      </h3>
      <div className="space-y-1">
        {menuItems.map((item) => renderMenuItem(item))}
      </div>
    </div>
  );
}
