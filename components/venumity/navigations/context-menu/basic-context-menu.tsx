"use client";
import React, { useState, useRef } from "react";

export default function BasicContextMenu() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const contextRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
  };

  const handleClose = () => {
    setMenuVisible(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        contextRef.current &&
        !contextRef.current.contains(e.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const menuItems = [
    { label: "Copy", icon: "📋", action: () => alert("Copied!") },
    { label: "Cut", icon: "✂️", action: () => alert("Cut!") },
    { label: "Paste", icon: "📝", action: () => alert("Pasted!") },
    { label: "Delete", icon: "🗑️", action: () => alert("Deleted!") },
    { label: "Rename", icon: "✏️", action: () => alert("Renamed!") },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Context Menu
      </h2>
      <div
        className="p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-center cursor-context-menu"
        onContextMenu={handleContextMenu}
      >
        <p className="text-gray-600 dark:text-gray-400">
          Right-click anywhere in this area
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          Try right-clicking to see the context menu
        </p>
      </div>

      {menuVisible && (
        <div
          ref={contextRef}
          className="fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-50 min-w-[200px]"
          style={{ top: position.y, left: position.x }}
        >
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                item.action();
                handleClose();
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
