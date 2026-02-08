"use client";
import { motion } from "framer-motion";
import { Type, Smartphone, Tablet, Monitor, Maximize2 } from "lucide-react";
import { useState, useEffect } from "react";

interface ResponsiveTypographyProps {
  title: string;
  subtitle?: string;
}

const breakpoints = [
  { name: "Mobile", icon: Smartphone, width: "w-20", fontSize: "text-base" },
  { name: "Tablet", icon: Tablet, width: "w-40", fontSize: "text-xl" },
  { name: "Desktop", icon: Monitor, width: "w-64", fontSize: "text-2xl" },
  { name: "Large", icon: Maximize2, width: "w-80", fontSize: "text-3xl" },
];

export default function CustomTypographyResponsive({
  title = "Responsive Typography",
  subtitle = "Adjusts perfectly across all screen sizes",
}: ResponsiveTypographyProps) {
  const [currentBreakpoint, setCurrentBreakpoint] = useState(0);
  const [fontSize, setFontSize] = useState(1);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [fontWeight, setFontWeight] = useState(400);

  const handleBreakpointChange = (index: number) => {
    setCurrentBreakpoint(index);
    // Adjust typography settings based on breakpoint
    switch (index) {
      case 0: // Mobile
        setFontSize(1);
        setLineHeight(1.6);
        setLetterSpacing(0);
        setFontWeight(400);
        break;
      case 1: // Tablet
        setFontSize(1.2);
        setLineHeight(1.5);
        setLetterSpacing(0.5);
        setFontWeight(500);
        break;
      case 2: // Desktop
        setFontSize(1.5);
        setLineHeight(1.4);
        setLetterSpacing(1);
        setFontWeight(600);
        break;
      case 3: // Large
        setFontSize(2);
        setLineHeight(1.3);
        setLetterSpacing(1.5);
        setFontWeight(700);
        break;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBreakpoint((prev) => (prev + 1) % breakpoints.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      handleBreakpointChange(currentBreakpoint);
    }, 0);

    return () => clearTimeout(id);
  }, [currentBreakpoint]);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-5xl">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-3 mb-2">
            <Type className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Responsive Typography
            </h2>
          </div>

          {/* Device Preview */}
          <div className="w-full mb-8">
            <div className="relative bg-linear-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Preview
                </h3>
                <div className="flex items-center gap-2">
                  {breakpoints.map((bp, index) => {
                    const Icon = bp.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => handleBreakpointChange(index)}
                        className={`p-2 rounded-lg transition-colors ${
                          currentBreakpoint === index
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                        title={bp.name}
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center min-h-[200px] p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-300 dark:border-gray-600">
                <motion.div
                  key={currentBreakpoint}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`${breakpoints[currentBreakpoint].fontSize} font-bold text-center text-gray-900 dark:text-white mb-2`}
                  style={{
                    fontSize: `${fontSize}rem`,
                    lineHeight: lineHeight,
                    letterSpacing: `${letterSpacing}px`,
                    fontWeight: fontWeight,
                  }}
                >
                  {title}
                </motion.div>

                {subtitle && (
                  <p
                    className={`text-center text-gray-600 dark:text-gray-400 ${breakpoints[
                      currentBreakpoint
                    ].fontSize.replace("text-", "text-sm ")}`}
                  >
                    {subtitle}
                  </p>
                )}

                {/* Responsive width indicator */}
                <div
                  className={`mt-6 h-2 bg-linear-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ${breakpoints[currentBreakpoint].width}`}
                ></div>
              </div>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Font Size
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {fontSize.toFixed(1)}rem
                  </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Line Height
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {lineHeight.toFixed(1)}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Letter Spacing
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {letterSpacing.toFixed(1)}px
                  </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Font Weight
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {fontWeight}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Breakpoint Controls */}
          <div className="w-full">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 text-center">
              Breakpoints
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {breakpoints.map((bp, index) => {
                const Icon = bp.icon;
                return (
                  <motion.div
                    key={index}
                    onClick={() => handleBreakpointChange(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      currentBreakpoint === index
                        ? "bg-linear-to-r from-blue-500 to-purple-500 text-white border-transparent"
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{bp.name}</span>
                    </div>
                    <p
                      className={`text-xs ${
                        currentBreakpoint === index
                          ? "text-blue-100"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {bp.fontSize.replace("text-", "")}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
