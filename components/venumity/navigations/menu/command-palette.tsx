"use client";
import { useState, useEffect } from "react";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const commands = [
    { icon: "📊", label: "Open Dashboard", shortcut: "⌘K D" },
    { icon: "📁", label: "Open Projects", shortcut: "⌘K P" },
    { icon: "👤", label: "Open Profile", shortcut: "⌘K U" },
    { icon: "⚙️", label: "Open Settings", shortcut: "⌘K S" },
    { icon: "📈", label: "View Analytics", shortcut: "⌘K A" },
    { icon: "📋", label: "Create New Project", shortcut: "⌘K N" },
    { icon: "🔍", label: "Search Files", shortcut: "⌘K F" },
    { icon: "🎨", label: "Change Theme", shortcut: "⌘K T" },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        ⌘K
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-lg">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-lg text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none"
                autoFocus
              />
            </div>

            <div className="max-h-96 overflow-y-auto py-2">
              {filteredCommands.map((cmd) => (
                <button
                  key={cmd.label}
                  onClick={() => {
                    alert(`Executing: ${cmd.label}`);
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <div className="flex items-center">
                    <span className="mr-3">{cmd.icon}</span>
                    <span className="text-gray-800 dark:text-gray-200">
                      {cmd.label}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-500 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                    {cmd.shortcut}
                  </span>
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-500">
              <div className="flex justify-between">
                <span>↑↓ to navigate</span>
                <span>↵ to select</span>
                <span>esc to close</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
