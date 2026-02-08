"use client";
import { motion } from "framer-motion";
import { Palette } from "lucide-react";
import { useState } from "react";

interface GradientBadge {
  id: string;
  label: string;
  gradient: string;
  textColor: string;
  description: string;
}

const gradientBadges: GradientBadge[] = [
  {
    id: "sunset",
    label: "Featured",
    gradient: "bg-linear-to-r from-orange-500 to-pink-500",
    textColor: "text-white",
    description: "Sunset gradient for featured content",
  },
  {
    id: "ocean",
    label: "New",
    gradient: "bg-linear-to-r from-blue-500 to-cyan-500",
    textColor: "text-white",
    description: "Ocean gradient for new items",
  },
  {
    id: "forest",
    label: "Success",
    gradient: "bg-linear-to-r from-emerald-500 to-green-500",
    textColor: "text-white",
    description: "Forest gradient for success status",
  },
  {
    id: "royal",
    label: "Premium",
    gradient: "bg-linear-to-r from-purple-600 to-pink-500",
    textColor: "text-white",
    description: "Royal gradient for premium features",
  },
  {
    id: "neon",
    label: "Trending",
    gradient: "bg-linear-to-r from-fuchsia-500 to-cyan-500",
    textColor: "text-white",
    description: "Neon gradient for trending items",
  },
  {
    id: "metal",
    label: "Pro",
    gradient: "bg-linear-to-r from-gray-700 to-gray-500",
    textColor: "text-white",
    description: "Metallic gradient for pro features",
  },
  {
    id: "sunrise",
    label: "Popular",
    gradient: "bg-linear-to-r from-yellow-500 to-red-500",
    textColor: "text-gray-900",
    description: "Sunrise gradient for popular content",
  },
  {
    id: "galaxy",
    label: "Limited",
    gradient: "bg-linear-to-r from-indigo-600 to-purple-600",
    textColor: "text-white",
    description: "Galaxy gradient for limited editions",
  },
];

const shapeOptions = [
  { name: "Rounded", value: "rounded-lg" },
  { name: "Pill", value: "rounded-full" },
  { name: "Square", value: "rounded-none" },
];

export default function TextBadgeGradient() {
  const [selectedBadge, setSelectedBadge] = useState(0);
  const [selectedShape, setSelectedShape] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [direction, setDirection] = useState<"horizontal" | "vertical" | "diagonal">("horizontal");

  const getDirectionClass = () => {
    switch (direction) {
      case "horizontal": return "bg-linear-to-r";
      case "vertical": return "bg-linear-to-b";
      case "diagonal": return "bg-linear-to-br";
      default: return "bg-linear-to-r";
    }
  };

  const renderBadge = () => {
    const badge = gradientBadges[selectedBadge];
    const shape = shapeOptions[selectedShape];
    
    const gradientClass = badge.gradient.replace('bg-linear-to-r', getDirectionClass());
    
    return (
      <motion.span
        className={`inline-flex items-center px-4 py-2 font-medium ${shape.value} ${gradientClass} ${badge.textColor}`}
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
        {badge.label}
      </motion.span>
    );
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
              Gradient Badges
            </span>
          </div>

          {/* Badge Preview */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Gradient Badge Preview
              </h3>
              
              <div className="flex items-center gap-6">
                {renderBadge()}
                
                <div className="text-gray-600 dark:text-gray-400">
                  <p className="text-sm">
                    Shape: {shapeOptions[selectedShape].name}
                  </p>
                  <p className="text-sm">
                    Animation: {animate ? "On" : "Off"}
                  </p>
                </div>
              </div>
            </div>

            {/* Direction Controls */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Gradient Direction
                </span>
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
          </div>

          {/* Gradient Selection */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  Gradient Styles
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {gradientBadges.length} gradient options
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={animate}
                    onChange={(e) => setAnimate(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Animate Gradient
                  </span>
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {gradientBadges.map((badge, index) => (
                <button
                  key={badge.id}
                  onClick={() => setSelectedBadge(index)}
                  className={`relative p-4 rounded-lg border transition-all ${
                    selectedBadge === index
                      ? "ring-2 ring-offset-2 ring-blue-500 border-transparent"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div
                    className={`h-12 rounded-lg mb-2 ${badge.gradient}`}
                  ></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white block">
                    {badge.label}
                  </span>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {badge.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Shape Selection */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Badge Shapes
            </h3>
            
            <div className="grid grid-cols-3 gap-4">
              {shapeOptions.map((shape, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedShape(index)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedShape === index
                      ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 ring-2 ring-blue-500/20"
                      : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className={`inline-flex items-center px-4 py-2 font-medium ${shape.value} ${gradientBadges[selectedBadge].gradient} ${gradientBadges[selectedBadge].textColor}`}>
                      {shape.name}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {shape.value}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* All Badges Display */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              All Gradient Badges
            </h3>
            
            <div className="flex flex-wrap gap-3">
              {gradientBadges.map((badge) => (
                <span
                  key={badge.id}
                  className={`inline-flex items-center px-3 py-1.5 rounded-full font-medium ${badge.gradient} ${badge.textColor}`}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          {/* Gradient Details */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Current Gradient Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tailwind Classes
                </p>
                <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4">
                  <code className="text-sm text-gray-300 font-mono break-all">
                    {gradientBadges[selectedBadge].gradient} {gradientBadges[selectedBadge].textColor}
                  </code>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preview Colors
                </p>
                <div className="flex items-center gap-2">
                  {gradientBadges[selectedBadge].gradient.includes('from-') && (
                    <div className="flex items-center gap-1">
                      <div className="w-6 h-6 rounded border border-gray-300" style={{ 
                        backgroundColor: gradientBadges[selectedBadge].gradient
                          .match(/from-([a-z]+)-(\d+)/)?.[0]
                          .replace('from-', '')
                      }}></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        From
                      </span>
                    </div>
                  )}
                  
                  {gradientBadges[selectedBadge].gradient.includes('to-') && (
                    <div className="flex items-center gap-1">
                      <div className="w-6 h-6 rounded border border-gray-300" style={{ 
                        backgroundColor: gradientBadges[selectedBadge].gradient
                          .match(/to-([a-z]+)-(\d+)/)?.[0]
                          .replace('to-', '')
                      }}></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        To
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}