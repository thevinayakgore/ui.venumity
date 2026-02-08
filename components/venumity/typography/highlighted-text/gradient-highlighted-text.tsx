"use client";
import { motion } from "framer-motion";
import { Highlighter, Palette, Sparkles } from "lucide-react";
import { useState } from "react";

interface GradientOption {
  name: string;
  from: string;
  to: string;
  textColor: string;
}

const gradientOptions: GradientOption[] = [
  {
    name: "Sunset",
    from: "from-orange-400",
    to: "to-pink-500",
    textColor: "text-white",
  },
  {
    name: "Ocean",
    from: "from-blue-400",
    to: "to-cyan-400",
    textColor: "text-white",
  },
  {
    name: "Forest",
    from: "from-emerald-400",
    to: "to-green-500",
    textColor: "text-white",
  },
  {
    name: "Royal",
    from: "from-purple-500",
    to: "to-indigo-500",
    textColor: "text-white",
  },
  {
    name: "Neon",
    from: "from-fuchsia-500",
    to: "to-pink-500",
    textColor: "text-white",
  },
  {
    name: "Gold",
    from: "from-yellow-400",
    to: "to-amber-500",
    textColor: "text-gray-900",
  },
];

const sampleText =
  "Create stunning gradient highlights that make important text stand out. Use gradient effects to draw attention to key phrases and improve readability.";

const highlightPhrases = [
  "stunning gradient",
  "important text",
  "key phrases",
  "improve readability",
];

export default function HighlightedTextGradient() {
  const [selectedGradient, setSelectedGradient] = useState(0);
  const [direction, setDirection] = useState<
    "horizontal" | "vertical" | "diagonal"
  >("horizontal");
  const [animate, setAnimate] = useState(false);

  const getDirectionClass = () => {
    switch (direction) {
      case "horizontal":
        return "bg-linear-to-r";
      case "vertical":
        return "bg-linear-to-b";
      case "diagonal":
        return "bg-linear-to-br";
      default:
        return "bg-linear-to-r";
    }
  };

  const renderText = () => {
    const gradient = gradientOptions[selectedGradient];
    const directionClass = getDirectionClass();

    return sampleText.split(" ").map((word, index) => {
      const cleanWord = word.replace(/[.,]/g, "").toLowerCase();
      const punctuation = word.match(/[.,]/g)?.[0] || "";

      if (
        highlightPhrases.some((phrase) =>
          phrase.toLowerCase().includes(cleanWord)
        )
      ) {
        return (
          <span key={index}>
            <motion.span
              className={`${directionClass} ${gradient.from} ${gradient.to} ${gradient.textColor} px-2 py-1 rounded-lg font-medium mx-0.5 inline-block`}
              animate={
                animate
                  ? {
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }
                  : {}
              }
              transition={
                animate
                  ? {
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }
                  : {}
              }
              style={
                animate
                  ? {
                      backgroundSize: "200% auto",
                    }
                  : {}
              }
            >
              {word.replace(punctuation, "")}
            </motion.span>
            {punctuation}
            {index < sampleText.split(" ").length - 1 ? " " : ""}
          </span>
        );
      }

      return (
        <span key={index}>
          {word}
          {index < sampleText.split(" ").length - 1 ? " " : ""}
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
      <div className="w-full max-w-5xl">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 mb-2">
            <Palette className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Gradient Highlight
            </span>
          </div>

          {/* Text Preview */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <p className="text-lg sm:text-xl text-gray-800 dark:text-gray-200 leading-relaxed">
              {renderText()}
            </p>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gradient Selection */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Palette className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Gradient Colors
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {gradientOptions.map((gradient, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedGradient(index)}
                    className={`relative p-4 rounded-lg border transition-all ${
                      selectedGradient === index
                        ? "ring-2 ring-offset-2 ring-blue-500 border-transparent"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <div
                      className={`h-12 rounded-lg ${getDirectionClass()} ${
                        gradient.from
                      } ${gradient.to} mb-2`}
                    ></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {gradient.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Direction & Animation */}
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Highlighter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Direction
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setDirection("horizontal")}
                    className={`p-3 rounded-lg border transition-all ${
                      direction === "horizontal"
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300"
                        : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                  >
                    <span className="text-sm font-medium">→ Horizontal</span>
                  </button>

                  <button
                    onClick={() => setDirection("vertical")}
                    className={`p-3 rounded-lg border transition-all ${
                      direction === "vertical"
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300"
                        : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                  >
                    <span className="text-sm font-medium">↓ Vertical</span>
                  </button>

                  <button
                    onClick={() => setDirection("diagonal")}
                    className={`p-3 rounded-lg border transition-all ${
                      direction === "diagonal"
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300"
                        : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                  >
                    <span className="text-sm font-medium">↘ Diagonal</span>
                  </button>
                </div>
              </div>

              {/* Animation Toggle */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Animate Gradient
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Flow gradient colors
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setAnimate(!animate)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      animate ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        animate ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {animate && (
                  <motion.div
                    className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Gradient is flowing across highlighted text
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Current Gradient Info */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Gradient
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {gradientOptions[selectedGradient].name} • {direction}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-8 w-8 rounded-lg ${getDirectionClass()} ${
                      gradientOptions[selectedGradient].from
                    } ${gradientOptions[selectedGradient].to}`}
                  ></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Preview
                  </span>
                </div>

                <button
                  onClick={() => {
                    const gradientClass = `${getDirectionClass()} ${
                      gradientOptions[selectedGradient].from
                    } ${gradientOptions[selectedGradient].to} ${
                      gradientOptions[selectedGradient].textColor
                    }`;
                    navigator.clipboard.writeText(gradientClass);
                  }}
                  className="px-3 py-1.5 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  Copy Classes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
