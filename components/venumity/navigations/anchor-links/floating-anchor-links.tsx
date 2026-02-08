"use client";
import { useState } from "react";

export default function FloatingAnchorLinks() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  const links = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "search", label: "Search", icon: "🔍" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "messages", label: "Messages", icon: "💬" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-2xl z-50"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 z-40 min-w-[200px]">
          <div className="space-y-2">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveLink(link.id);
                  setIsOpen(false);
                }}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all ${
                  activeLink === link.id
                    ? "bg-primary/10 text-primary dark:bg-primary/20"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {link.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
