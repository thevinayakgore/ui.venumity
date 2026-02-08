"use client";
import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import { useState } from "react";

interface BadgeVariant {
  name: string;
  style: string;
  description: string;
}

const badgeVariants: BadgeVariant[] = [
  {
    name: "Default",
    style: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200",
    description: "Neutral badge for general use",
  },
  {
    name: "Primary",
    style: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
    description: "Primary action or main category",
  },
  {
    name: "Success",
    style:
      "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
    description: "Successful status or completion",
  },
  {
    name: "Warning",
    style:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
    description: "Warning or attention needed",
  },
  {
    name: "Error",
    style: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
    description: "Error state or critical issue",
  },
  {
    name: "Info",
    style: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300",
    description: "Informational or helpful hint",
  },
];

const badgeShapes = [
  { name: "Rounded", style: "rounded" },
  { name: "Pill", style: "rounded-full" },
  { name: "Square", style: "rounded-none" },
];

export default function TextBadgeBasic() {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedShape, setSelectedShape] = useState(0);

  const sampleBadges = [
    { text: "New", variant: 1 },
    { text: "Popular", variant: 2 },
    { text: "Featured", variant: 4 },
    { text: "Limited", variant: 3 },
    { text: "Updated", variant: 5 },
  ];

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
              Text Badges
            </span>
          </div>

          {/* Badge Preview */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Badge Preview
              </h3>

              <div className="flex items-center gap-4">
                <span
                  className={`inline-flex items-center px-3 py-1.5 text-sm font-medium ${badgeShapes[selectedShape].style} ${badgeVariants[selectedVariant].style}`}
                >
                  {badgeVariants[selectedVariant].name}
                </span>

                <div className="text-gray-600 dark:text-gray-400">
                  <p className="text-sm">
                    Variant: {badgeVariants[selectedVariant].name}
                  </p>
                  <p className="text-sm">
                    Shape: {badgeShapes[selectedShape].name}
                  </p>
                </div>
              </div>
            </div>

            {/* Example Usage */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Example badges in context:
              </p>
              <div className="flex flex-wrap gap-2">
                {sampleBadges.map((badge, index) => (
                  <span
                    key={index}
                    className={`inline-flex items-center px-3 py-1 text-sm font-medium ${
                      badgeShapes[selectedShape].style
                    } ${badgeVariants[badge.variant].style}`}
                  >
                    {badge.text}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Variant Selection */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Badge Variants
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {badgeVariants.map((variant, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedVariant(index)}
                  className={`flex flex-col items-center p-4 rounded-lg border transition-all ${
                    selectedVariant === index
                      ? "ring-2 ring-offset-2 ring-blue-500 border-transparent"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium mb-2 ${variant.style}`}
                  >
                    {variant.name}
                  </span>
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                    {variant.description}
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
              {badgeShapes.map((shape, index) => (
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
                    <span
                      className={`inline-flex items-center px-3 py-1.5 text-sm font-medium ${shape.style} ${badgeVariants[selectedVariant].style}`}
                    >
                      {shape.name}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {shape.style}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* All Combinations */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              All Variants & Shapes
            </h3>

            <div className="space-y-4">
              {badgeShapes.map((shape) => (
                <div key={shape.name} className="space-y-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {shape.name} Shape
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {badgeVariants.map((variant) => (
                      <span
                        key={`${shape.name}-${variant.name}`}
                        className={`inline-flex items-center px-3 py-1 text-sm font-medium ${shape.style} ${variant.style}`}
                      >
                        {variant.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
