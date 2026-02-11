"use client";
import { motion } from "framer-motion";

export default function DiscountBadge3_4() {
  const badges = [
    { discount: "25", label: "Weekend Sale", type: "simple" },
    { discount: "50", label: "Clearance", type: "circle" },
    { discount: "15", label: "Member Discount", type: "stripe" },
    { discount: "40", label: "Seasonal Offer", type: "ribbon" },
  ];

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="relative"
          >
            {/* Simple Badge */}
            {badge.type === "simple" && (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center shadow-sm">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {badge.discount}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {badge.label}
                </div>
              </div>
            )}

            {/* Circle Badge */}
            {badge.type === "circle" && (
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-2xl font-bold">{badge.discount}%</div>
                    <div className="text-xs opacity-90">OFF</div>
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-0.5 rounded whitespace-nowrap">
                  {badge.label}
                </div>
              </div>
            )}

            {/* Stripe Badge */}
            {badge.type === "stripe" && (
              <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-green-400 to-blue-500"></div>
                <div className="p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    -{badge.discount}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {badge.label}
                  </div>
                </div>
              </div>
            )}

            {/* Ribbon Badge */}
            {badge.type === "ribbon" && (
              <div className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
                {/* Ribbon corner */}
                <div className="absolute -top-2 -right-2">
                  <div className="w-16 h-16 overflow-hidden">
                    <div className="w-16 h-16 bg-red-500 transform rotate-45 translate-x-8 -translate-y-8">
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white text-xs font-bold">
                        SALE
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {badge.discount}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {badge.label}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </main>
  );
}
