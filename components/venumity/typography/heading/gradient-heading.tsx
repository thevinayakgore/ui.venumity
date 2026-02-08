"use client";
import { motion } from "framer-motion";
import { Heading, Palette, Sparkles } from "lucide-react";
import { useState } from "react";

interface GradientOption {
  name: string;
  from: string;
  to: string;
  direction: string;
}

const gradients: GradientOption[] = [
  {
    name: "Ocean",
    from: "from-blue-500",
    to: "to-cyan-400",
    direction: "bg-linear-to-r",
  },
  {
    name: "Sunset",
    from: "from-orange-500",
    to: "to-pink-500",
    direction: "bg-linear-to-r",
  },
  {
    name: "Forest",
    from: "from-emerald-500",
    to: "to-green-400",
    direction: "bg-linear-to-r",
  },
  {
    name: "Royal",
    from: "from-purple-600",
    to: "to-pink-500",
    direction: "bg-linear-to-r",
  },
  {
    name: "Neon",
    from: "from-fuchsia-500",
    to: "to-cyan-400",
    direction: "bg-linear-to-r",
  },
  {
    name: "Metallic",
    from: "from-gray-600",
    to: "to-gray-400",
    direction: "bg-linear-to-r",
  },
];

const directions = [
  { label: "→ Right", value: "bg-linear-to-r" },
  { label: "← Left", value: "bg-linear-to-l" },
  { label: "↓ Bottom", value: "bg-linear-to-b" },
  { label: "↑ Top", value: "bg-linear-to-t" },
  { label: "↘ Diagonal", value: "bg-linear-to-br" },
  { label: "↙ Diagonal", value: "bg-linear-to-bl" },
];

interface GradientHeadingProps {
  title: string;
}

export default function HeadingGradient({ 
  title = "Gradient Heading"
}: GradientHeadingProps) {
  const [selectedGradient, setSelectedGradient] = useState(0);
  const [selectedDirection, setSelectedDirection] = useState(0);
  const [animate, setAnimate] = useState(false);

  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-5xl">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Gradient Heading
            </span>
          </div>

          {/* Preview */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <motion.div
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
              className="text-center"
            >
              <h1
                className={`${directions[selectedDirection].value} ${gradients[selectedGradient].from} ${gradients[selectedGradient].to} bg-clip-text text-transparent text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight`}
                style={
                  animate
                    ? {
                        backgroundSize: "200% auto",
                      }
                    : {}
                }
              >
                {title}
              </h1>
            </motion.div>
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
                {gradients.map((gradient, index) => (
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
                      className={`h-12 rounded-lg ${gradient.direction} ${gradient.from} ${gradient.to} mb-2`}
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
                  <Heading className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Direction
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {directions.map((direction, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDirection(index)}
                      className={`p-3 rounded-lg border transition-all ${
                        selectedDirection === index
                          ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300"
                          : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500"
                      }`}
                    >
                      <span className="text-sm font-medium">{direction.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Animation Toggle */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Animation
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Animate gradient flow
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
                      Gradient is animating across the text
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Code Display */}
          <div className="bg-gray-900 dark:bg-gray-950 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-300">
                Tailwind Classes
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${directions[selectedDirection].value} ${gradients[selectedGradient].from} ${gradients[selectedGradient].to} bg-clip-text text-transparent`
                  );
                }}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Copy
              </button>
            </div>
            <code className="text-sm text-gray-300 font-mono break-all">
              {directions[selectedDirection].value} {gradients[selectedGradient].from}{" "}
              {gradients[selectedGradient].to} bg-clip-text text-transparent
            </code>
          </div>
        </div>
      </div>
    </motion.main>
  );
}