"use client";
import React, { useState, useRef, useEffect } from "react";

export default function NestedContextMenu() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [subMenuVisible, setSubMenuVisible] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const subMenuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
    setSubMenuVisible(null);
  };

  const handleClose = () => {
    setMenuVisible(false);
    setSubMenuVisible(null);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        if (
          subMenuRef.current &&
          !subMenuRef.current.contains(e.target as Node)
        ) {
          handleClose();
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const menuItems = [
    {
      label: "New",
      icon: "📄",
      submenu: [
        { label: "Document", action: () => alert("New Document") },
        { label: "Spreadsheet", action: () => alert("New Spreadsheet") },
        { label: "Presentation", action: () => alert("New Presentation") },
      ],
    },
    {
      label: "Open",
      icon: "📂",
      submenu: [
        { label: "Recent Files", action: () => alert("Recent Files") },
        { label: "From Cloud", action: () => alert("From Cloud") },
      ],
    },
    { label: "Save", icon: "💾", action: () => alert("Saved!") },
    { label: "Save As", icon: "💾", action: () => alert("Save As!") },
    { label: "Print", icon: "🖨️", action: () => alert("Print!") },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Nested Context Menu
      </h2>
      <div
        className="p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-center cursor-context-menu"
        onContextMenu={handleContextMenu}
      >
        <p className="text-gray-600 dark:text-gray-400">
          Right-click to see nested menu
        </p>
      </div>

      {menuVisible && (
        <div
          ref={menuRef}
          className="fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-50 min-w-[200px]"
          style={{ top: position.y, left: position.x }}
        >
          {menuItems.map((item) => (
            <div key={item.label} className="relative">
              <button
                onMouseEnter={() =>
                  item.submenu && setSubMenuVisible(item.label)
                }
                onMouseLeave={() =>
                  setTimeout(() => {
                    if (subMenuVisible === item.label) setSubMenuVisible(null);
                  }, 200)
                }
                onClick={() => item.action && item.action()}
                className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="flex items-center">
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </div>
                {item.submenu && <span>▶</span>}
              </button>

              {item.submenu && subMenuVisible === item.label && (
                <div
                  ref={subMenuRef}
                  className="absolute left-full top-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 min-w-[160px] z-50"
                >
                  {item.submenu.map((subItem) => (
                    <button
                      key={subItem.label}
                      onClick={() => {
                        subItem.action();
                        handleClose();
                      }}
                      className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
