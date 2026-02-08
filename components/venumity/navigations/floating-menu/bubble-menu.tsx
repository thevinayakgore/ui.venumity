"use client";
import { useState } from "react";

export default function BubbleMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const bubbles = [
    { icon: "🎨", label: "Design", color: "bg-purple-500" },
    { icon: "💻", label: "Code", color: "bg-blue-500" },
    { icon: "📊", label: "Data", color: "bg-green-500" },
    { icon: "🎥", label: "Video", color: "bg-red-500" },
    { icon: "🎵", label: "Audio", color: "bg-yellow-500" },
  ];

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <div className="flex flex-col items-end space-y-3">
        {isOpen &&
          bubbles.map((bubble, index) => (
            <button
              key={bubble.label}
              className={`w-12 h-12 ${bubble.color} text-white rounded-full shadow-lg flex items-center justify-center text-xl transition-all duration-300 hover:shadow-xl`}
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${index * 100}ms`,
              }}
              title={bubble.label}
            >
              {bubble.icon}
            </button>
          ))}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-linear-to-r from-primary to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-2xl"
        >
          {isOpen ? "−" : "+"}
        </button>
      </div>
    </div>
  );
}
