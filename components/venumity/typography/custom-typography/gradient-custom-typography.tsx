"use client";
import { motion } from "framer-motion";
import { Type, Palette } from "lucide-react";
import { useState } from "react";

interface GradientTypographyProps {
  text: string;
  gradientFrom?: string;
  gradientTo?: string;
}

const gradients = [
  { from: "from-blue-500", to: "to-purple-600", name: "Blue-Purple" },
  { from: "from-pink-500", to: "to-rose-600", name: "Pink-Rose" },
  { from: "from-emerald-500", to: "to-cyan-600", name: "Emerald-Cyan" },
  { from: "from-orange-500", to: "to-yellow-600", name: "Orange-Yellow" },
  { from: "from-violet-500", to: "to-fuchsia-600", name: "Violet-Fuchsia" },
];

export default function CustomTypographyGradient({
  text = "Gradient Typography",
}: GradientTypographyProps) {
  const [selectedGradient, setSelectedGradient] = useState(0);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-3 mb-2">
            <Type className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Gradient Text
            </h2>
          </div>

          <motion.h1
            key={selectedGradient}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-center bg-linear-to-r ${gradients[selectedGradient].from} ${gradients[selectedGradient].to} bg-clip-text text-transparent leading-tight`}
          >
            {text}
          </motion.h1>

          <div className="mt-8 w-full">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="text-base font-medium text-gray-700 dark:text-gray-300">
                Choose Gradient
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {gradients.map((gradient, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedGradient(index)}
                  className={`relative p-4 rounded-xl border transition-all ${
                    selectedGradient === index
                      ? "ring-2 ring-offset-2 ring-blue-500 border-transparent"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div
                    className={`h-2 w-full rounded-full bg-linear-to-r ${gradient.from} ${gradient.to} mb-2`}
                  ></div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {gradient.name}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Current Gradient
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Tailwind Classes:
                  </p>
                </div>
                <code className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-800 dark:text-gray-200">
                  {`bg-linear-to-r ${gradients[selectedGradient].from} ${gradients[selectedGradient].to}`}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
