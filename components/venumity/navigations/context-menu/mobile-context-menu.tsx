"use client";
import { useState, useRef, TouchEvent } from "react";

export default function MobileContextMenu() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [pressed, setPressed] = useState(false);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = (e: TouchEvent) => {
    setPressed(true);
    pressTimer.current = setTimeout(() => {
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX,
        y: touch.clientY,
      });
      setMenuVisible(true);
    }, 500); // 500ms long press
  };

  const handleTouchEnd = () => {
    setPressed(false);
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
    }
  };

  const menuItems = [
    { label: "Share", icon: "📤", action: () => alert("Shared!") },
    { label: "Save", icon: "💾", action: () => alert("Saved!") },
    { label: "Copy Link", icon: "🔗", action: () => alert("Link copied!") },
    { label: "Report", icon: "🚩", action: () => alert("Reported!") },
    {
      label: "Add to Favorites",
      icon: "⭐",
      action: () => alert("Added to favorites!"),
    },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Mobile Long Press Menu
      </h2>

      <div
        className={`p-8 border-2 rounded-lg text-center transition-all ${
          pressed
            ? "border-primary bg-primary/5 dark:bg-primary/10"
            : "border-gray-300 dark:border-gray-700"
        }`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className="text-4xl mb-4">📱</div>
        <p className="text-gray-600 dark:text-gray-400">
          Press and hold for 500ms
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          Simulates mobile long-press context menu
        </p>
      </div>

      {menuVisible && (
        <div
          className="fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-50 min-w-[200px]"
          style={{
            top: position.y,
            left: Math.min(position.x, window.innerWidth - 250),
          }}
        >
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                item.action();
                setMenuVisible(false);
              }}
              className="flex items-center w-full px-4 py-3 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600"
            >
              <span className="mr-3 text-xl">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
