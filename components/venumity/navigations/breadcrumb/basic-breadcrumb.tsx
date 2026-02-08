"use client";
import React from "react";
import Link from "next/link";

export default function BasicBreadcrumb() {
  const items = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Electronics", href: "/products/electronics" },
    { label: "Smartphones", href: "/products/electronics/smartphones" },
    { label: "iPhone 15", href: "#", current: true },
  ];

  return (
    <nav className="p-6 bg-white dark:bg-gray-900 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Breadcrumb Navigation
      </h2>
      <div className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => (
          <React.Fragment key={item.label}>
            {index > 0 && (
              <span className="text-gray-400 dark:text-gray-500">/</span>
            )}
            {item.current ? (
              <span className="text-gray-600 dark:text-gray-400 font-medium">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
}
