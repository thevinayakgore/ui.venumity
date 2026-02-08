"use client";
import { motion } from "framer-motion";
import { Type, Bold, Italic, Underline, Sparkles, Zap } from "lucide-react";
import { useState } from "react";

interface EmphasisStyle {
  id: string;
  name: string;
  icon: React.ReactNode;
  style: string;
  description: string;
  intensity: number;
}

const emphasisStyles: EmphasisStyle[] = [
  {
    id: "bold",
    name: "Bold",
    icon: <Bold className="w-4 h-4" />,
    style: "font-bold",
    description: "Strong emphasis for important text",
    intensity: 3,
  },
  {
    id: "italic",
    name: "Italic",
    icon: <Italic className="w-4 h-4" />,
    style: "italic",
    description: "Subtle emphasis or foreign words",
    intensity: 2,
  },
  {
    id: "underline",
    name: "Underline",
    icon: <Underline className="w-4 h-4" />,
    style: "underline",
    description: "Highlight links or key terms",
    intensity: 2,
  },
  {
    id: "gradient",
    name: "Gradient",
    icon: <Sparkles className="w-4 h-4" />,
    style:
      "bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent",
    description: "Colorful gradient for visual appeal",
    intensity: 4,
  },
  {
    id: "glow",
    name: "Glow",
    icon: <Zap className="w-4 h-4" />,
    style: "text-blue-500 dark:text-blue-400 drop-shadow-glow",
    description: "Glowing effect for attention",
    intensity: 5,
  },
  {
    id: "highlight",
    name: "Highlight",
    icon: <Sparkles className="w-4 h-4" />,
    style:
      "bg-yellow-200 dark:bg-yellow-900/30 text-yellow-900 dark:text-yellow-200 px-1",
    description: "Background highlight for key points",
    intensity: 4,
  },
];

const sampleTexts = [
  "This text demonstrates how emphasis styles can make certain words stand out in a paragraph.",
  "Emphasis helps guide readers' attention to the most important parts of your content.",
  "Different emphasis styles serve different purposes and create varying visual impacts.",
  "Choose the right emphasis style based on the importance and context of your text.",
];

export default function InlineTextEmphasis() {
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [intensity, setIntensity] = useState(emphasisStyles[0].intensity);
  const [sampleIndex, setSampleIndex] = useState(0);

  const getEmphasizedText = () => {
    const text = sampleTexts[sampleIndex];
    const words = text.split(" ");
    const emphasizeIndex = Math.floor(words.length / 2); // Emphasize middle word

    return words.map((word, index) => {
      const cleanWord = word.replace(/[.,]/g, "");
      const punctuation = word.match(/[.,]/g)?.[0] || "";

      if (index === emphasizeIndex) {
        return (
          <span key={index}>
            <span
              className={`${emphasisStyles[selectedStyle].style} ${
                emphasisStyles[selectedStyle].id === "glow"
                  ? `[text-shadow:0_0_${intensity * 2}px_currentColor]`
                  : ""
              }`}
            >
              {cleanWord}
            </span>
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

  const handleStyleChange = (index: number) => {
    setSelectedStyle(index);
    setIntensity(emphasisStyles[index].intensity);
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-5xl">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 mb-2">
            <Type className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Text Emphasis
            </span>
          </div>

          {/* Emphasis Preview */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Emphasis in Context
              </h3>

              <div className="text-lg sm:text-xl text-gray-800 dark:text-gray-200 leading-relaxed">
                {getEmphasizedText()}
              </div>
            </div>

            {/* Sample Text Selection */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Sample Text
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {sampleIndex + 1} of {sampleTexts.length}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    setSampleIndex((prev) =>
                      prev === 0 ? sampleTexts.length - 1 : prev - 1
                    )
                  }
                  className="px-3 py-1.5 text-sm rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Previous
                </button>

                <div className="flex-1 flex items-center justify-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                  &quot;{sampleTexts[sampleIndex].split(" ").slice(0, 3).join(" ")}
                    ...&ldquo;
                  </span>
                </div>

                <button
                  onClick={() =>
                    setSampleIndex((prev) =>
                      prev === sampleTexts.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="px-3 py-1.5 text-sm rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Emphasis Style Selection */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  Emphasis Styles
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {emphasisStyles.length} different styles
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {emphasisStyles.map((style, index) => (
                <button
                  key={style.id}
                  onClick={() => handleStyleChange(index)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedStyle === index
                      ? "ring-2 ring-offset-2 ring-blue-500 border-transparent"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        selectedStyle === index
                          ? "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {style.icon}
                    </div>

                    <div className="text-center">
                      <span
                        className={`text-sm font-medium ${
                          selectedStyle === index
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {style.name}
                      </span>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {style.description}
                      </p>
                    </div>

                    {/* Intensity Indicator */}
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${
                            i < style.intensity
                              ? "bg-blue-500"
                              : "bg-gray-300 dark:bg-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Intensity Control */}
          {emphasisStyles[selectedStyle].id === "glow" && (
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Glow Intensity
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Glow Strength: {intensity}
                    </span>
                    <span className="text-xs text-gray-500">
                      {intensity <= 2
                        ? "Subtle"
                        : intensity <= 4
                        ? "Moderate"
                        : "Strong"}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={intensity}
                    onChange={(e) => setIntensity(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                  />
                </div>

                <div className="flex justify-center">
                  <span
                    className={`text-2xl font-bold ${emphasisStyles[selectedStyle].style}`}
                    style={{
                      textShadow: `0 0 ${intensity * 2}px currentColor`,
                    }}
                  >
                    Glow Preview
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* All Styles Preview */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              All Emphasis Styles
            </h3>

            <div className="space-y-4">
              {emphasisStyles.map((style) => (
                <div
                  key={style.id}
                  className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-600">
                      {style.icon}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {style.name}
                    </span>
                  </div>

                  <span className={style.style}>Example Text</span>
                </div>
              ))}
            </div>
          </div>

          {/* Usage Guidelines */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
            <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-4">
              When to Use Each Style
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Bold className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Bold
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Use for key terms, headings, or important warnings
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Italic className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Italic
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Use for book titles, foreign phrases, or subtle emphasis
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Gradient/Glow
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Use for marketing text, special offers, or featured content
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Underline className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Underline/Highlight
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Use for links, key points, or study materials
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
