"use client";
import { motion } from "framer-motion";
import { Tag, Sparkles, Zap, RotateCw, TrendingUp, PlusCircleIcon } from "lucide-react";
import { useState } from "react";

interface AnimatedBadge {
  id: string;
  label: string;
  animation: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const animatedBadges: AnimatedBadge[] = [
  {
    id: "pulse",
    label: "Live",
    animation: "pulse",
    icon: <PlusCircleIcon className="w-3.5 h-3.5" />,
    description: "Pulsing animation for active status",
    color: "bg-emerald-500 text-white border-emerald-600",
  },
  {
    id: "bounce",
    label: "Trending",
    animation: "bounce",
    icon: <TrendingUp className="w-3.5 h-3.5" />,
    description: "Bouncing effect for trending items",
    color: "bg-pink-500 text-white border-pink-600",
  },
  {
    id: "spin",
    label: "Loading",
    animation: "spin",
    icon: <RotateCw className="w-3.5 h-3.5" />,
    description: "Spinning animation for loading states",
    color: "bg-blue-500 text-white border-blue-600",
  },
  {
    id: "shake",
    label: "Alert",
    animation: "shake",
    icon: <Zap className="w-3.5 h-3.5" />,
    description: "Shaking effect for important alerts",
    color: "bg-amber-500 text-white border-amber-600",
  },
  {
    id: "glow",
    label: "New",
    animation: "glow",
    icon: <Sparkles className="w-3.5 h-3.5" />,
    description: "Glowing effect for new items",
    color: "bg-purple-500 text-white border-purple-600",
  },
  {
    id: "float",
    label: "Featured",
    animation: "float",
    icon: <Sparkles className="w-3.5 h-3.5" />,
    description: "Floating animation for featured content",
    color: "bg-cyan-500 text-white border-cyan-600",
  },
];

export default function InlineBadgeAnimated() {
  const [selectedBadge, setSelectedBadge] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [showAll, setShowAll] = useState(false);

  const renderAnimatedBadge = (badge: AnimatedBadge) => {
    const baseClasses = `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${badge.color}`;

    switch (badge.animation) {
      case "pulse":
        return (
          <motion.span
            className={baseClasses}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: 2 / speed,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {badge.icon}
            {badge.label}
          </motion.span>
        );

      case "bounce":
        return (
          <motion.span
            className={baseClasses}
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 0.6 / speed,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {badge.icon}
            {badge.label}
          </motion.span>
        );

      case "spin":
        return (
          <motion.span
            className={baseClasses}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2 / speed,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.span
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 2 / speed,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {badge.icon}
            </motion.span>
            {badge.label}
          </motion.span>
        );

      case "shake":
        return (
          <motion.span
            className={baseClasses}
            animate={{
              x: [0, -2, 2, -2, 2, 0],
            }}
            transition={{
              duration: 0.5 / speed,
              repeat: Infinity,
              repeatDelay: 2 / speed,
            }}
          >
            {badge.icon}
            {badge.label}
          </motion.span>
        );

      case "glow":
        return (
          <motion.span
            className={baseClasses}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(147, 51, 234, 0.7)",
                "0 0 0 6px rgba(147, 51, 234, 0)",
              ],
            }}
            transition={{
              duration: 2 / speed,
              repeat: Infinity,
            }}
          >
            {badge.icon}
            {badge.label}
          </motion.span>
        );

      case "float":
        return (
          <motion.span
            className={baseClasses}
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 2 / speed,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {badge.icon}
            {badge.label}
          </motion.span>
        );

      default:
        return (
          <span className={baseClasses}>
            {badge.icon}
            {badge.label}
          </span>
        );
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-5xl">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Tag className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Animated Badges
              </span>
            </div>

            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {showAll ? "Show Single" : "Show All"}
            </button>
          </div>

          {/* Preview Area */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Preview
              </h3>

              {showAll ? (
                <div className="flex flex-wrap gap-4">
                  {animatedBadges.map((badge) => (
                    <div
                      key={badge.id}
                      className="flex flex-col items-center gap-2"
                    >
                      {renderAnimatedBadge(badge)}
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {badge.animation}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-6">
                  <div className="text-center">
                    {renderAnimatedBadge(animatedBadges[selectedBadge])}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    This badge has a{" "}
                    {`"${animatedBadges[selectedBadge].animation}"`}
                    animation effect
                  </p>
                </div>
              )}
            </div>

            {/* Speed Control */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Animation Speed
                </label>
                <span className="text-xs text-gray-500">
                  {speed === 0.5
                    ? "Slow"
                    : speed === 1
                    ? "Normal"
                    : speed === 2
                    ? "Fast"
                    : "Very Fast"}
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
              />
            </div>
          </div>

          {/* Badge Selection */}
          {!showAll && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Animation Types
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {animatedBadges.map((badge, index) => (
                  <button
                    key={badge.id}
                    onClick={() => setSelectedBadge(index)}
                    className={`p-4 rounded-lg border transition-all ${
                      selectedBadge === index
                        ? "ring-2 ring-offset-2 ring-blue-500 border-transparent"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`p-1.5 rounded ${badge.color.split(" ")[0]}`}
                      >
                        {badge.icon}
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          selectedBadge === index
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {badge.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 text-left">
                      {badge.description}
                    </p>
                    <div className="mt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {badge.animation}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Usage Examples */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Example Usage
            </h3>

            <div className="space-y-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-800 dark:text-gray-200">
                  Server Status: {renderAnimatedBadge(animatedBadges[0])}
                  {" - System is active and monitoring"}
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-800 dark:text-gray-200">
                  New Feature: {renderAnimatedBadge(animatedBadges[4])}
                  {" - Just released, check it out!"}
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-800 dark:text-gray-200">
                  Processing: {renderAnimatedBadge(animatedBadges[2])}
                  {" - Please wait while we complete your request"}
                </p>
              </div>
            </div>
          </div>

          {/* Animation Properties */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Current Animation Properties
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Type
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {animatedBadges[selectedBadge].animation}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Speed
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {speed}x
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Duration
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {(2 / speed).toFixed(1)}s
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
