"use client";
import { useState } from "react";

export default function RadialMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const sectors = [
    { label: "Home", icon: "🏠", color: "bg-blue-500" },
    { label: "Work", icon: "💼", color: "bg-green-500" },
    { label: "Play", icon: "🎮", color: "bg-yellow-500" },
    { label: "Learn", icon: "📚", color: "bg-purple-500" },
    { label: "Shop", icon: "🛍️", color: "bg-pink-500" },
    { label: "Travel", icon: "✈️", color: "bg-indigo-500" },
  ];

  return (
    <div className="flex items-center justify-center h-96">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-20 h-20 rounded-full shadow-2xl transition-all duration-500 flex items-center justify-center text-2xl z-50 ${
          isOpen ? "bg-gray-800 text-white" : "bg-primary text-white"
        }`}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {isOpen && (
        <div className="absolute">
          {sectors.map((sector, index) => {
            const angle = (index * 360) / sectors.length;
            const radius = 140;
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);

            return (
              <button
                key={sector.label}
                className={`absolute w-16 h-16 ${sector.color} text-white rounded-full shadow-lg flex flex-col items-center justify-center transition-all duration-500 z-40 hover:scale-110`}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
                title={sector.label}
              >
                <span className="text-xl">{sector.icon}</span>
                <span className="text-xs mt-1">{sector.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
