"use client";
import { useState } from "react";

export default function SpeedDialMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: "📊", label: "Analytics", action: () => alert("Analytics opened") },
    { icon: "📈", label: "Charts", action: () => alert("Charts opened") },
    { icon: "📋", label: "Reports", action: () => alert("Reports opened") },
    { icon: "⚙️", label: "Settings", action: () => alert("Settings opened") },
    { icon: "👥", label: "Team", action: () => alert("Team opened") },
  ];

  return (
    <main className="flex flex-col items-end space-y-3">
      {isOpen &&
        actions.map((action, index) => (
          <div
            key={action.label}
            className="flex items-center space-x-2 transition-all duration-300"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateX(0)" : "translateX(20px)",
              transitionDelay: `${index * 50}ms`,
            }}
          >
            <span className="text-sm bg-gray-800 text-white px-2 py-1 rounded whitespace-nowrap">
              {action.label}
            </span>
            <button
              onClick={action.action}
              className="w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center text-xl hover:shadow-xl transition-shadow"
            >
              {action.icon}
            </button>
          </div>
        ))}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-2xl"
      >
        {isOpen ? "×" : "⚡"}
      </button>
    </main>
  );
}
