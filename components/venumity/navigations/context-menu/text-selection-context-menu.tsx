"use client";
import React, { useState, useRef, useEffect } from "react";

export default function TextSelectionContextMenu() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState("");
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        setSelectedText(selection.toString());
      } else {
        setSelectedText("");
      }
    };

    document.addEventListener("selectionchange", handleSelection);
    return () =>
      document.removeEventListener("selectionchange", handleSelection);
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (selectedText) {
      setPosition({ x: e.clientX, y: e.clientY });
      setMenuVisible(true);
    }
  };

  const menuItems = [
    {
      label: "Copy",
      icon: "📋",
      action: () => navigator.clipboard.writeText(selectedText),
    },
    {
      label: "Search",
      icon: "🔍",
      action: () =>
        window.open(
          `https://google.com/search?q=${encodeURIComponent(selectedText)}`
        ),
    },
    {
      label: "Translate",
      icon: "🌐",
      action: () =>
        window.open(
          `https://translate.google.com/?text=${encodeURIComponent(
            selectedText
          )}`
        ),
    },
    {
      label: "Define",
      icon: "📚",
      action: () =>
        window.open(
          `https://dictionary.com/browse/${encodeURIComponent(selectedText)}`
        ),
    },
    { label: "Highlight", icon: "🖍️", action: () => alert("Text highlighted") },
    { label: "Note", icon: "📝", action: () => alert("Note added") },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Text Selection Context Menu
      </h2>

      <div
        ref={textRef}
        onContextMenu={handleContextMenu}
        className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg prose dark:prose-invert max-w-none"
      >
        <h3 className="text-lg font-semibold mb-3">
          Select text to see context menu
        </h3>
        <p className="mb-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
      </div>

      {menuVisible && (
        <div
          className="fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-50 min-w-[200px]"
          style={{ top: position.y, left: position.x }}
        >
          <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Selected Text
            </div>
            <div
              className="text-xs text-gray-500 dark:text-gray-400 truncate"
              title={selectedText}
            >
              &quot;{selectedText.slice(0, 30)}...&ldquo;
            </div>
          </div>

          <div className="py-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  item.action();
                  setMenuVisible(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
