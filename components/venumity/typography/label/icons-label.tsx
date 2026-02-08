"use client";
import { motion } from "framer-motion";
import {
  Tag,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Clock,
  Star,
  TrendingUp,
  Shield,
} from "lucide-react";
import { useState } from "react";

interface IconLabel {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const iconLabels: IconLabel[] = [
  {
    id: "success",
    label: "Completed",
    icon: <CheckCircle className="w-4 h-4" />,
    color:
      "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800",
    description: "Task or process completed successfully",
  },
  {
    id: "error",
    label: "Failed",
    icon: <XCircle className="w-4 h-4" />,
    color:
      "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800",
    description: "Operation failed or encountered error",
  },
  {
    id: "warning",
    label: "Warning",
    icon: <AlertCircle className="w-4 h-4" />,
    color:
      "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800",
    description: "Important warning or caution needed",
  },
  {
    id: "info",
    label: "Information",
    icon: <Info className="w-4 h-4" />,
    color:
      "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800",
    description: "Informational message or details",
  },
  {
    id: "pending",
    label: "Pending",
    icon: <Clock className="w-4 h-4" />,
    color:
      "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700",
    description: "Waiting for action or approval",
  },
  {
    id: "featured",
    label: "Featured",
    icon: <Star className="w-4 h-4" />,
    color:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800",
    description: "Featured or special content",
  },
  {
    id: "trending",
    label: "Trending",
    icon: <TrendingUp className="w-4 h-4" />,
    color:
      "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 border border-pink-200 dark:border-pink-800",
    description: "Popular or trending item",
  },
  {
    id: "secure",
    label: "Secure",
    icon: <Shield className="w-4 h-4" />,
    color:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800",
    description: "Security verified or protected",
  },
];

export default function LabelWithIcons() {
  const [selectedLabel, setSelectedLabel] = useState(0);
  const [iconPosition, setIconPosition] = useState<"left" | "right">("left");
  const [showIcon, setShowIcon] = useState(true);

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
              Labels with Icons
            </span>
          </div>

          {/* Label Preview */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Label Preview
              </h3>

              <div className="flex items-center gap-6">
                {showIcon ? (
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium ${iconLabels[selectedLabel].color}`}
                  >
                    {iconPosition === "left" && iconLabels[selectedLabel].icon}
                    {iconLabels[selectedLabel].label}
                    {iconPosition === "right" && iconLabels[selectedLabel].icon}
                  </span>
                ) : (
                  <span
                    className={`inline-flex items-center px-3 py-1.5 rounded-lg font-medium ${iconLabels[selectedLabel].color}`}
                  >
                    {iconLabels[selectedLabel].label}
                  </span>
                )}

                <div className="text-gray-600 dark:text-gray-400">
                  <p className="text-sm">
                    Icon: {showIcon ? "Visible" : "Hidden"}
                  </p>
                  <p className="text-sm">Position: {iconPosition}</p>
                </div>
              </div>
            </div>

            {/* Example Usage */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Example in dashboard:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {iconLabels.slice(0, 4).map((label) => (
                  <div
                    key={label.id}
                    className="flex items-center gap-2 p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    {showIcon && label.icon}
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {label.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Label Selection */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  Label Styles
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {iconLabels.length} different styles
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
              {iconLabels.map((label, index) => (
                <button
                  key={label.id}
                  onClick={() => setSelectedLabel(index)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedLabel === index
                      ? "ring-2 ring-offset-2 ring-blue-500 border-transparent"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`p-1.5 rounded ${label.color.split(" ")[0]}`}
                    >
                      {label.icon}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        selectedLabel === index
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {label.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-left">
                    {label.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Icon Position */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Icon Position
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setIconPosition("left")}
                className={`p-4 rounded-lg border transition-all ${
                  iconPosition === "left"
                    ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 ring-2 ring-blue-500/20"
                    : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                }`}
              >
                <div className="flex items-center gap-2">
                  {iconLabels[selectedLabel].icon}
                  <div className="flex-1">
                    <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                    <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2 block">
                  Icon on Left
                </span>
              </button>

              <button
                onClick={() => setIconPosition("right")}
                className={`p-4 rounded-lg border transition-all ${
                  iconPosition === "right"
                    ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 ring-2 ring-blue-500/20"
                    : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                    <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                  </div>
                  {iconLabels[selectedLabel].icon}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2 block">
                  Icon on Right
                </span>
              </button>
            </div>
          </div>

          {/* All Labels Display */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              All Label Examples
            </h3>

            <div className="flex flex-wrap gap-3">
              {iconLabels.map((label) => (
                <span
                  key={label.id}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium ${label.color}`}
                >
                  {showIcon && label.icon}
                  {label.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
