"use client";
import { motion } from "framer-motion";
import { Heading } from "lucide-react";

interface UnderlinedHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
}

export default function HeadingUnderlined({
  align = "center",
}: UnderlinedHeadingProps) {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl">
        <div className={`flex flex-col gap-6 ${alignmentClasses[align]}`}>
          <div className="flex items-center gap-3 mb-2">
            <Heading className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Underlined Heading
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Title
            </h1>

            <div className="relative">
              <div className="h-1 w-24 bg-linear-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <motion.div
                className="absolute top-0 h-1 w-8 bg-white dark:bg-gray-900 rounded-full"
                animate={{
                  x: [0, 16],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 pt-4">
              Subtitle
            </p>
          </div>

          {/* Alignment Controls */}
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Alignment
            </p>
            <div className="flex gap-3">
              {(["left", "center", "right"] as const).map((position) => (
                <button
                  key={position}
                  onClick={() => {}}
                  className={`flex-1 py-2 rounded-lg transition-colors ${
                    align === position
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {position.charAt(0).toUpperCase() + position.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
