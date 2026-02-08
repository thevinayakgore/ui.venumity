"use client";
import { motion } from "framer-motion";
import { Highlighter, Sparkles, Zap, Waves } from "lucide-react";
import { useState } from "react";

interface HighlightAnimation {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const animations: HighlightAnimation[] = [
  {
    id: "pulse",
    name: "Pulse",
    icon: <Sparkles className="w-4 h-4" />,
    description: "Gentle pulsing effect",
  },
  {
    id: "flash",
    name: "Flash",
    icon: <Zap className="w-4 h-4" />,
    description: "Quick flashing animation",
  },
  {
    id: "wave",
    name: "Wave",
    icon: <Waves className="w-4 h-4" />,
    description: "Wavy highlight motion",
  },
  {
    id: "bounce",
    name: "Bounce",
    icon: <Sparkles className="w-4 h-4" />,
    description: "Bouncing highlight effect",
  },
];

const sampleText =
  "The quick brown fox jumps over the lazy dog. This sentence contains all letters of the alphabet. Highlighted words will stand out with animation effects.";

const highlightWords = ["quick", "fox", "lazy", "alphabet", "animation"];

export default function HighlightedTextAnimated() {
  const [selectedAnimation, setSelectedAnimation] = useState("pulse");
  const [highlightColor, setHighlightColor] = useState(
    "bg-yellow-200 dark:bg-yellow-900/30"
  );
  const [intensity, setIntensity] = useState(1);

  const renderAnimatedHighlight = (word: string, index: number) => {
    const baseClasses = `${highlightColor} px-1 py-0.5 rounded mx-0.5`;

    switch (selectedAnimation) {
      case "pulse":
        return (
          <motion.mark
            key={index}
            className={baseClasses}
            animate={{
              y: [-5, 0], // only two keyframes
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              type: "spring",
              stiffness: 200,
            }}
          >
            {word}
          </motion.mark>
        );

      case "flash":
        return (
          <motion.mark
            key={index}
            className={baseClasses}
            animate={{
              backgroundColor: [
                highlightColor.split(" ")[0],
                "rgb(255 255 255)",
                highlightColor.split(" ")[0],
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.3,
            }}
          >
            {word}
          </motion.mark>
        );

      case "wave":
        return (
          <motion.mark
            key={index}
            className={baseClasses}
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: index * 0.15,
              ease: "easeInOut",
            }}
          >
            {word}
          </motion.mark>
        );

      case "bounce":
        return (
          <motion.mark
            key={index}
            className={baseClasses}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: index * 0.25,
              type: "spring",
              stiffness: 200,
            }}
          >
            {word}
          </motion.mark>
        );

      default:
        return (
          <mark key={index} className={baseClasses}>
            {word}
          </mark>
        );
    }
  };

  const renderText = () => {
    const words = sampleText.split(" ");

    return words.map((word, index) => {
      const cleanWord = word.replace(/[.,]/g, "").toLowerCase();
      const punctuation = word.match(/[.,]/g)?.[0] || "";

      if (highlightWords.includes(cleanWord)) {
        return (
          <span key={index}>
            {renderAnimatedHighlight(word.replace(punctuation, ""), index)}
            {punctuation}
            {index < words.length - 1 ? " " : ""}
          </span>
        );
      }

      return (
        <span key={index}>
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      );
    });
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 mb-2">
            <Highlighter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Animated Highlight
            </span>
          </div>

          {/* Text Preview */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
            <p className="text-lg sm:text-xl text-gray-800 dark:text-gray-200 leading-relaxed">
              {renderText()}
            </p>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Animation Selection */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Animation Effects
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {animations.map((animation) => (
                  <button
                    key={animation.id}
                    onClick={() => setSelectedAnimation(animation.id)}
                    className={`p-4 rounded-lg border transition-all ${
                      selectedAnimation === animation.id
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 ring-2 ring-blue-500/20"
                        : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`p-1.5 rounded ${
                          selectedAnimation === animation.id
                            ? "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300"
                            : "bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {animation.icon}
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          selectedAnimation === animation.id
                            ? "text-blue-700 dark:text-blue-300"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {animation.name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 text-left">
                      {animation.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Color & Intensity */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                Highlight Settings
              </h3>

              <div className="space-y-6">
                {/* Color Selection */}
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Highlight Color
                  </p>
                  <div className="flex gap-2">
                    {[
                      {
                        name: "Yellow",
                        value: "bg-yellow-200 dark:bg-yellow-900/30",
                      },
                      {
                        name: "Blue",
                        value: "bg-blue-200 dark:bg-blue-900/30",
                      },
                      {
                        name: "Green",
                        value: "bg-green-200 dark:bg-green-900/30",
                      },
                      {
                        name: "Pink",
                        value: "bg-pink-200 dark:bg-pink-900/30",
                      },
                      {
                        name: "Purple",
                        value: "bg-purple-200 dark:bg-purple-900/30",
                      },
                    ].map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setHighlightColor(color.value)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          highlightColor === color.value
                            ? "border-gray-900 dark:border-white scale-110"
                            : "border-gray-300 dark:border-gray-600 hover:scale-105"
                        }`}
                        style={{
                          backgroundColor:
                            color.value
                              .split(" ")[0]
                              .replace("bg-", "")
                              .split("-")[0] === "yellow"
                              ? "#fef3c7"
                              : color.value
                                  .split(" ")[0]
                                  .replace("bg-", "")
                                  .split("-")[0] === "blue"
                              ? "#dbeafe"
                              : color.value
                                  .split(" ")[0]
                                  .replace("bg-", "")
                                  .split("-")[0] === "green"
                              ? "#d1fae5"
                              : color.value
                                  .split(" ")[0]
                                  .replace("bg-", "")
                                  .split("-")[0] === "pink"
                              ? "#fce7f3"
                              : "#f3e8ff",
                        }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Intensity Control */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Animation Intensity
                    </p>
                    <span className="text-xs text-gray-500">
                      {intensity === 1
                        ? "Low"
                        : intensity === 2
                        ? "Medium"
                        : "High"}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    value={intensity}
                    onChange={(e) => setIntensity(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Highlighted Words List */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Highlighted Words ({highlightWords.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {highlightWords.map((word, index) => (
                <span
                  key={index}
                  className={`${highlightColor} px-3 py-1.5 rounded-full text-sm font-medium capitalize`}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
