"use client";
import { motion } from "framer-motion";
import { Heading, Tag, Sparkles, TrendingUp, Award } from "lucide-react";
import { useState } from "react";

interface BadgeType {
  id: string;
  label: string;
  color: string;
  icon: React.ReactNode;
}

const badgeTypes: BadgeType[] = [
  {
    id: "new",
    label: "New",
    color: "bg-blue-500 text-white",
    icon: <Sparkles className="w-3 h-3" />,
  },
  {
    id: "trending",
    label: "Trending",
    color: "bg-emerald-500 text-white",
    icon: <TrendingUp className="w-3 h-3" />,
  },
  {
    id: "featured",
    label: "Featured",
    color: "bg-purple-500 text-white",
    icon: <Award className="w-3 h-3" />,
  },
  {
    id: "popular",
    label: "Popular",
    color: "bg-rose-500 text-white",
    icon: <TrendingUp className="w-3 h-3" />,
  },
];

export default function HeadingWithBadge() {
  const [selectedBadge, setSelectedBadge] = useState(0);
  const [position, setPosition] = useState<"left" | "right">("right");

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 mb-2">
            <Tag className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Heading with Badge
            </span>
          </div>

          {/* Preview */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {position === "left" && (
                <div className="shrink-0">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${badgeTypes[selectedBadge].color}`}
                  >
                    {badgeTypes[selectedBadge].icon}
                    {badgeTypes[selectedBadge].label}
                  </span>
                </div>
              )}

              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                  Title
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Description
                </p>
              </div>

              {position === "right" && (
                <div className="shrink-0">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${badgeTypes[selectedBadge].color}`}
                  >
                    {badgeTypes[selectedBadge].icon}
                    {badgeTypes[selectedBadge].label}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Badge Selection */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Tag className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Badge Style
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {badgeTypes.map((badge, index) => (
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
                      {badge.icon}
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
                    <div
                      className={`h-1 rounded-full ${
                        badge.color.split(" ")[0]
                      }`}
                    ></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Position Controls */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Heading className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Position
                </h3>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPosition("left")}
                    className={`p-4 rounded-lg border transition-all ${
                      position === "left"
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 ring-2 ring-blue-500/20"
                        : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded ${
                          badgeTypes[selectedBadge].color.split(" ")[0]
                        } opacity-20`}
                      ></div>
                      <div className="flex-1 text-left">
                        <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                        <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2 block">
                      Left
                    </span>
                  </button>

                  <button
                    onClick={() => setPosition("right")}
                    className={`p-4 rounded-lg border transition-all ${
                      position === "right"
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 ring-2 ring-blue-500/20"
                        : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex-1 text-left">
                        <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                        <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                      </div>
                      <div
                        className={`w-8 h-8 rounded ${
                          badgeTypes[selectedBadge].color.split(" ")[0]
                        } opacity-20`}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2 block">
                      Right
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
