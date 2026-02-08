"use client";
import React from "react";
import { ChevronRight, Home, Folder, File } from "lucide-react";

export default function BreadcrumbsWithIcons() {
  const items = [
    { label: "Home", icon: Home },
    { label: "Documents", icon: Folder },
    { label: "Projects", icon: Folder },
    { label: "Report.pdf", icon: File },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Breadcrumbs with Icons
      </h3>
      <nav className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => (
          <React.Fragment key={item.label}>
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            )}
            <a
              href="#"
              className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors ${
                index === items.length - 1
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </a>
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}
