"use client";
import React from "react";

export default function IconBreadcrumb() {
  const items = [
    { label: "Dashboard", icon: "📊", href: "/" },
    { label: "Projects", icon: "📁", href: "/projects" },
    { label: "Current", icon: "🚀", href: "/projects/current" },
    { label: "Documentation", icon: "📄", href: "#", current: true },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Icon Breadcrumb
      </h2>
      <nav className="flex items-center space-x-2">
        {items.map((item, index) => (
          <React.Fragment key={item.label}>
            <a
              href={item.href}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                item.current
                  ? "bg-primary/10 text-primary dark:bg-primary/20"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              <span>{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </a>
            {index < items.length - 1 && (
              <span className="text-gray-300 dark:text-gray-600">→</span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}
