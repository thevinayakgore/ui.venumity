"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Highlighter } from "lucide-react";

interface HighlightedTextProps {
  color: "yellow" | "blue" | "green" | "pink" | "purple";
}

const highlightColors = {
  yellow:
    "bg-yellow-200 dark:bg-yellow-900/30 text-yellow-900 dark:text-yellow-200",
  blue: "bg-blue-200 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200",
  green: "bg-green-200 dark:bg-green-900/30 text-green-900 dark:text-green-200",
  pink: "bg-pink-200 dark:bg-pink-900/30 text-pink-900 dark:text-pink-200",
  purple:
    "bg-purple-200 dark:bg-purple-900/30 text-purple-900 dark:text-purple-200",
};

// Example data directly in the page
const highlightData: { title: string; text: string; highlight: string }[] = [
  {
    title: "Introduction to UI Components",
    text: "The HighlightedText component allows you to emphasize important text sections for users, making the interface more readable and engaging.",
    highlight: "emphasize",
  },
  {
    title: "Usage in Forms",
    text: "Highlight key validation messages and instructions to guide users and improve form completion rates.",
    highlight: "Highlight",
  },
  {
    title: "Best Practices",
    text: "Use consistent colors and styles to maintain a cohesive design system and ensure accessibility for all users.",
    highlight: "consistent",
  },
];

export default function HighlightedTextBasic({
  color = "yellow",
}: HighlightedTextProps) {
  const [selectedColor, setSelectedColor] = useState(color);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-3xl flex flex-col gap-12">
        {highlightData.map((item, index) => {
          const parts = item.text.split(
            new RegExp(`(${item.highlight})`, "gi")
          );

          return (
            <div key={index} className="flex flex-col gap-6">
              <div className="flex items-center gap-3 mb-2">
                <Highlighter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {item.title}
                </span>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
                <p className="text-lg sm:text-xl text-gray-800 dark:text-gray-200 leading-relaxed">
                  {parts.map((part, i) =>
                    part.toLowerCase() === item.highlight.toLowerCase() ? (
                      <mark
                        key={i}
                        className={`${highlightColors[selectedColor]} px-1 py-0.5 rounded not-italic`}
                      >
                        {part}
                      </mark>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )}
                </p>
              </div>
            </div>
          );
        })}

        {/* Color Selection */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Highlight Color
          </h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(highlightColors).map(([key, value]) => (
              <button
                key={key}
                onClick={() =>
                  setSelectedColor(key as HighlightedTextProps["color"])
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  selectedColor === key
                    ? "ring-2 ring-offset-2 ring-blue-500 border-transparent"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <div className={`w-4 h-4 rounded ${value.split(" ")[0]}`}></div>
                <span className="text-sm font-medium capitalize">{key}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.main>
  );
}
