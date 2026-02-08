"use client";
import { motion } from "framer-motion";
import {
  Tag,
  CheckCircle,
  AlertCircle,
  Info,
  Clock,
  Star,
  TrendingUp,
  Zap,
  Shield,
} from "lucide-react";
import { useState } from "react";

interface IconBadge {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const iconBadges: IconBadge[] = [
  {
    id: "success",
    label: "Success",
    icon: <CheckCircle className="w-3.5 h-3.5" />,
    color:
      "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    description: "Completed or successful items",
  },
  {
    id: "warning",
    label: "Warning",
    icon: <AlertCircle className="w-3.5 h-3.5" />,
    color:
      "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    description: "Important warnings or alerts",
  },
  {
    id: "info",
    label: "Info",
    icon: <Info className="w-3.5 h-3.5" />,
    color:
      "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    description: "Informational messages",
  },
  {
    id: "time",
    label: "Pending",
    icon: <Clock className="w-3.5 h-3.5" />,
    color:
      "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700",
    description: "Time-sensitive or pending items",
  },
  {
    id: "featured",
    label: "Featured",
    icon: <Star className="w-3.5 h-3.5" />,
    color:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
    description: "Featured or special content",
  },
  {
    id: "trending",
    label: "Trending",
    icon: <TrendingUp className="w-3.5 h-3.5" />,
    color:
      "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 border-pink-200 dark:border-pink-800",
    description: "Popular or trending items",
  },
  {
    id: "urgent",
    label: "Urgent",
    icon: <Zap className="w-3.5 h-3.5" />,
    color:
      "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800",
    description: "Urgent or high-priority items",
  },
  {
    id: "secure",
    label: "Secure",
    icon: <Shield className="w-3.5 h-3.5" />,
    color:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    description: "Security or verified items",
  },
];

export default function InlineBadgeWithIcons() {
  const [selectedBadge, setSelectedBadge] = useState(0);
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [showIcon, setShowIcon] = useState(true);

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  };

  const sampleTexts = [
    "Your account has been successfully verified and is now active.",
    "Please review the important warning about system maintenance tonight.",
    "New information about the upcoming features has been released.",
    "The update is currently pending approval from the security team.",
    "Check out our featured collection of premium templates.",
    "This product is trending among users this week.",
    "Urgent action required: Please update your password immediately.",
    "Your data is protected with secure encryption methods.",
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-5xl">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 mb-2">
            <Tag className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Icon Badges
            </span>
          </div>

          {/* Preview Area */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Preview
              </h3>
              <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                <span
                  className={`inline-flex items-center gap-1.5 ${sizeClasses[size]} rounded-md border font-medium ${iconBadges[selectedBadge].color} mx-1`}
                >
                  {showIcon && iconBadges[selectedBadge].icon}
                  {iconBadges[selectedBadge].label}
                </span>
                {sampleTexts[selectedBadge]}
              </p>
            </div>

            {/* Example Usage */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Example in context:
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Status:{" "}
                <span
                  className={`inline-flex items-center gap-1.5 ${sizeClasses.md} rounded-md border font-medium ${iconBadges[selectedBadge].color}`}
                >
                  {showIcon && iconBadges[selectedBadge].icon}
                  {iconBadges[selectedBadge].label}
                </span>
                {" • "}
                Click badges below to change
              </p>
            </div>
          </div>

          {/* Badge Selection */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  Badge Styles
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {iconBadges.length} predefined styles
                </p>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showIcon}
                    onChange={(e) => setShowIcon(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Show Icon
                  </span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {iconBadges.map((badge, index) => (
                <button
                  key={badge.id}
                  onClick={() => setSelectedBadge(index)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedBadge === index
                      ? "ring-2 ring-offset-2 ring-blue-500 border-transparent"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
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
                </button>
              ))}
            </div>
          </div>

          {/* Size Controls */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Size Options
            </h3>

            <div className="grid grid-cols-3 gap-4">
              {(["sm", "md", "lg"] as const).map((sizeOption) => (
                <button
                  key={sizeOption}
                  onClick={() => setSize(sizeOption)}
                  className={`p-4 rounded-lg border transition-all ${
                    size === sizeOption
                      ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 ring-2 ring-blue-500/20"
                      : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 ${sizeClasses[sizeOption]} rounded-md border font-medium ${iconBadges[selectedBadge].color}`}
                    >
                      {showIcon && iconBadges[selectedBadge].icon}
                      {sizeOption.toUpperCase()}
                    </span>
                    <span className="text-sm capitalize">{sizeOption}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* All Badges Display */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              All Badge Examples
            </h3>

            <div className="flex flex-wrap gap-3">
              {iconBadges.map((badge) => (
                <span
                  key={badge.id}
                  className={`inline-flex items-center gap-1.5 ${sizeClasses[size]} rounded-md border font-medium ${badge.color}`}
                >
                  {showIcon && badge.icon}
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
