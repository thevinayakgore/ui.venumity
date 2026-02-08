"use client";
import { useState } from "react";

export default function CircularFloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: "📝", label: "New Note", color: "bg-blue-500" },
    { icon: "📷", label: "Camera", color: "bg-purple-500" },
    { icon: "📍", label: "Location", color: "bg-green-500" },
    { icon: "📞", label: "Call", color: "bg-red-500" },
    { icon: "✉️", label: "Email", color: "bg-yellow-500" },
  ];

  return (
    <div className="relative h-96 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center text-2xl z-50 ${
            isOpen ? "bg-red-500 rotate-45" : "bg-primary"
          }`}
        >
          {isOpen ? "×" : "+"}
        </button>

        {menuItems.map((item, index) => {
          const angle = (index * 360) / menuItems.length;
          const radius = 120;
          const x = radius * Math.cos((angle * Math.PI) / 180);
          const y = radius * Math.sin((angle * Math.PI) / 180);

          return (
            <button
              key={item.label}
              className={`absolute w-12 h-12 rounded-full ${item.color} text-white shadow-lg flex items-center justify-center text-xl transition-all duration-300 z-40`}
              style={{
                transform: isOpen
                  ? `translate(${x}px, ${y}px) scale(1)`
                  : "translate(0, 0) scale(0)",
                opacity: isOpen ? 1 : 0,
              }}
              title={item.label}
            >
              {item.icon}
            </button>
          );
        })}
      </div>
    </div>
  );
}
