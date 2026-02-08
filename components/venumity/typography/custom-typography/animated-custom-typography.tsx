"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Type, Sparkles, Zap, Waves } from "lucide-react";
import { useState, useEffect } from "react";

interface AnimatedTypographyProps {
  texts: string[];
}

const animations = [
  {
    id: "wave",
    name: "Wave Effect",
    icon: Waves,
    duration: 2,
    description: "Characters wave sequentially",
  },
  {
    id: "glitch",
    name: "Glitch Effect",
    icon: Zap,
    duration: 1.5,
    description: "Digital glitch effect",
  },
  {
    id: "sparkle",
    name: "Sparkle Effect",
    icon: Sparkles,
    duration: 3,
    description: "Sparkling characters",
  },
];

export default function CustomTypographyAnimated({
  texts = ["Animated", "Typography", "Effects", "Showcase"],
}: AnimatedTypographyProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [selectedAnimation, setSelectedAnimation] = useState("wave");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [texts.length]);

  const renderAnimatedText = (text: string) => {
    const characters = text.split("");

    switch (selectedAnimation) {
      case "wave":
        return (
          <div className="flex">
            {characters.map((char, index) => (
              <motion.span
                key={index}
                className="inline-block"
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
        );

      case "glitch":
        return (
          <div className="relative">
            <span className="relative z-10">{text}</span>
            <motion.span
              className="absolute left-0 top-0 text-red-400 opacity-70"
              animate={{
                x: [0, 2, -2, 0],
              }}
              transition={{
                duration: 0.1,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            >
              {text}
            </motion.span>
            <motion.span
              className="absolute left-0 top-0 text-blue-400 opacity-50"
              animate={{
                x: [0, -2, 2, 0],
              }}
              transition={{
                duration: 0.1,
                repeat: Infinity,
                repeatDelay: 0.5,
                delay: 0.05,
              }}
            >
              {text}
            </motion.span>
          </div>
        );

      case "sparkle":
        return (
          <div className="relative">
            <span>{text}</span>
            {characters.map((char, index) => (
              <motion.div
                key={index}
                className="absolute"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 0.8,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                }}
                style={{
                  left: `${(index / characters.length) * 100}%`,
                  top: "-10px",
                }}
              >
                <Sparkles className="w-3 h-3 text-yellow-400" />
              </motion.div>
            ))}
          </div>
        );

      default:
        return <span>{text}</span>;
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-3 mb-4">
            <Type className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Animated Typography
            </h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentTextIndex}-${selectedAnimation}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                {renderAnimatedText(texts[currentTextIndex])}
              </h1>

              <div className="flex items-center justify-center gap-4 mt-6">
                {texts.map((text, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTextIndex(index)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      currentTextIndex === index
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {text}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="w-full mt-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6 text-center">
              Animation Effects
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {animations.map((animation) => {
                const Icon = animation.icon;
                return (
                  <button
                    key={animation.id}
                    onClick={() => setSelectedAnimation(animation.id)}
                    className={`p-4 rounded-xl border transition-all ${
                      selectedAnimation === animation.id
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 ring-2 ring-blue-500/20"
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`p-2 rounded-lg ${
                          selectedAnimation === animation.id
                            ? "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`font-medium ${
                          selectedAnimation === animation.id
                            ? "text-blue-700 dark:text-blue-300"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {animation.name}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-left">
                      {animation.description}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-blue-500"
                          animate={{
                            width: ["0%", "100%"],
                          }}
                          transition={{
                            duration: animation.duration,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {animation.duration}s
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
