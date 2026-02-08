"use client";
import { motion } from "framer-motion";

export default function BasicMasonryLayout() {
  const items = [
    { height: "h-48", color: "bg-blue-50 dark:bg-blue-900/20", title: "Item 1" },
    { height: "h-32", color: "bg-green-50 dark:bg-green-900/20", title: "Item 2" },
    { height: "h-40", color: "bg-purple-50 dark:bg-purple-900/20", title: "Item 3" },
    { height: "h-36", color: "bg-orange-50 dark:bg-orange-900/20", title: "Item 4" },
    { height: "h-44", color: "bg-pink-50 dark:bg-pink-900/20", title: "Item 5" },
    { height: "h-28", color: "bg-teal-50 dark:bg-teal-900/20", title: "Item 6" },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Basic Masonry Layout
          </h2>
          
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {items.map((item, index) => (
              <div
                key={index}
                className={`${item.color} ${item.height} rounded-lg p-4 break-inside-avoid border border-gray-200 dark:border-gray-600`}
              >
                <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Basic masonry item with variable height for visual interest
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.main>
  );
}