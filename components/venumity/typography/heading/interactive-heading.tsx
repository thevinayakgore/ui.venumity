"use client";
import { motion } from "framer-motion";
import { Heading, Sliders, Eye, EyeOff, Zap, RotateCw } from "lucide-react";
import { useState, useEffect } from "react";

interface HeadingEffect {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

const headingTexts = [
  "Interactive Heading",
  "Dynamic Typography",
  "Modern Design",
  "Creative Effects",
];

const effects: HeadingEffect[] = [
  {
    id: "shadow",
    name: "Shadow",
    description: "Add depth with shadow",
    active: true,
  },
  {
    id: "glow",
    name: "Glow",
    description: "Glowing text effect",
    active: false,
  },
  {
    id: "gradient",
    name: "Gradient",
    description: "Color gradient text",
    active: false,
  },
  {
    id: "outline",
    name: "Outline",
    description: "Text outline effect",
    active: false,
  },
  {
    id: "blur",
    name: "Blur",
    description: "Motion blur effect",
    active: false,
  },
  { id: "wave", name: "Wave", description: "Wavy animation", active: false },
];

export default function HeadingInteractive() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [activeEffects, setActiveEffects] = useState<HeadingEffect[]>(effects);
  const [fontSize, setFontSize] = useState(48);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [color, setColor] = useState("#3b82f6"); // blue-500

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setCurrentTextIndex((prev) => (prev + 1) % headingTexts.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isAnimating]);

  const toggleEffect = (effectId: string) => {
    setActiveEffects(
      activeEffects.map((effect) =>
        effect.id === effectId ? { ...effect, active: !effect.active } : effect
      )
    );
  };

  const resetEffects = () => {
    setActiveEffects(
      effects.map((effect) => ({ ...effect, active: effect.id === "shadow" }))
    );
    setFontSize(48);
    setLetterSpacing(0);
    setColor("#3b82f6");
  };

  const activeEffectCount = activeEffects.filter((e) => e.active).length;

  const renderHeading = () => {
    const currentText = headingTexts[currentTextIndex];
    const styles: React.CSSProperties = {
      fontSize: `${fontSize}px`,
      letterSpacing: `${letterSpacing}px`,
      color: color,
    };

    // Apply effects
    const effectStyles: React.CSSProperties = {};
    let className = "font-black";

    activeEffects.forEach((effect) => {
      if (!effect.active) return;

      switch (effect.id) {
        case "shadow":
          effectStyles.textShadow = "4px 4px 0px rgba(0,0,0,0.1)";
          break;
        case "glow":
          effectStyles.textShadow = `0 0 20px ${color}, 0 0 40px ${color}40`;
          break;
        case "outline":
          className +=
            " [-webkit-text-stroke:2px_#000] dark:[-webkit-text-stroke:2px_#fff]";
          effectStyles.color = "transparent";
          break;
        case "blur":
          effectStyles.filter = "blur(1px)";
          break;
      }
    });

    if (activeEffects.find((e) => e.id === "gradient" && e.active)) {
      className +=
        " bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent";
    }

    if (activeEffects.find((e) => e.id === "wave" && e.active)) {
      return (
        <div className="flex">
          {currentText.split("").map((char, index) => (
            <motion.span
              key={index}
              className={`${className} inline-block`}
              style={{ ...styles, ...effectStyles }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 1,
                delay: index * 0.05,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
      );
    }

    return (
      <motion.h1
        key={currentTextIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`${className} text-center`}
        style={{ ...styles, ...effectStyles }}
      >
        {currentText}
      </motion.h1>
    );
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Interactive Heading
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAnimating(!isAnimating)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {isAnimating ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    <span>Animate</span>
                  </>
                )}
              </button>

              <button
                onClick={resetEffects}
                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                <RotateCw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Preview Area */}
          <div className="bg-linear-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="min-h-[200px] flex items-center justify-center">
              {renderHeading()}
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Effects */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Sliders className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Effects ({activeEffectCount}/6)
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {activeEffects.map((effect) => (
                  <button
                    key={effect.id}
                    onClick={() => toggleEffect(effect.id)}
                    className={`p-4 rounded-lg border transition-all ${
                      effect.active
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 ring-2 ring-blue-500/20"
                        : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-sm font-medium ${
                          effect.active
                            ? "text-blue-700 dark:text-blue-300"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {effect.name}
                      </span>
                      <div
                        className={`w-3 h-3 rounded-full ${
                          effect.active
                            ? "bg-blue-500"
                            : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 text-left">
                      {effect.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Typography Controls */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <Heading className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Typography
                  </h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Font Size: {fontSize}px
                      </span>
                      <span className="text-xs text-gray-500">
                        {fontSize >= 72
                          ? "XXL"
                          : fontSize >= 48
                          ? "XL"
                          : fontSize >= 36
                          ? "Large"
                          : "Normal"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="24"
                      max="96"
                      value={fontSize}
                      onChange={(e) => setFontSize(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Letter Spacing: {letterSpacing}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-2"
                      max="20"
                      value={letterSpacing}
                      onChange={(e) =>
                        setLetterSpacing(parseInt(e.target.value))
                      }
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Text Color
                      </span>
                      <span className="text-xs font-mono">{color}</span>
                    </div>
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full h-10 cursor-pointer rounded-lg border border-gray-300 dark:border-gray-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Selection */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Select Heading Text
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {headingTexts.map((text, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTextIndex(index)}
                  className={`p-3 rounded-lg border transition-all ${
                    currentTextIndex === index
                      ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300"
                      : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500"
                  }`}
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
