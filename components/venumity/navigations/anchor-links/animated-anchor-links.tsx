"use client";
import { useState } from "react";

export default function AnimatedAnchorLinks() {
  const [active, setActive] = useState("home");

  const links = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "about", label: "About", icon: "👤" },
    { id: "services", label: "Services", icon: "⚙️" },
    { id: "portfolio", label: "Portfolio", icon: "📁" },
    { id: "contact", label: "Contact", icon: "📧" },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        Animated Navigation
      </h2>
      <div className="flex flex-col space-y-3">
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => setActive(link.id)}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
              active === link.id
                ? "bg-primary/10 text-primary dark:bg-primary/20 border-l-4 border-primary"
                : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
          >
            <span className="text-xl">{link.icon}</span>
            <span className="font-medium">{link.label}</span>
            {active === link.id && (
              <span className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
