"use client";
import React, { useState, useRef, useEffect } from "react";

export default function ContextMenu() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const contextRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
  };

  const menuItems = [
    { label: "New File", icon: "📄", shortcut: "Ctrl+N" },
    { label: "New Folder", icon: "📁", shortcut: "Ctrl+Shift+N" },
    { label: "Open", icon: "📂", shortcut: "Ctrl+O" },
    { label: "Save", icon: "💾", shortcut: "Ctrl+S" },
    { label: "Save As", icon: "💾", shortcut: "Ctrl+Shift+S" },
    { label: "Print", icon: "🖨️", shortcut: "Ctrl+P" },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        contextRef.current &&
        !contextRef.current.contains(e.target as Node)
      ) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 border rounded-lg shadow-sm">
      <div
        ref={contextRef}
        onContextMenu={handleContextMenu}
        className="p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-center cursor-context-menu"
      >
        <p className="text-gray-600 dark:text-gray-400">Right-click here</p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          Try right-clicking to see the context menu
        </p>
      </div>

      {menuVisible && (
        <div
          className="fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-50 min-w-[240px]"
          style={{ top: position.y, left: position.x }}
        >
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                alert(`Selected: ${item.label}`);
                setMenuVisible(false);
              }}
              className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="flex items-center">
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-500">
                {item.shortcut}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
