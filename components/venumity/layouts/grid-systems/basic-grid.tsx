"use client";
import { motion } from "framer-motion";

export default function BasicGrid() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Basic Grid Layout
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded border border-gray-200 dark:border-gray-600"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-gray-700 dark:text-gray-300 text-2xl font-bold">{item}</span>
                  </div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Grid Item {item}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Basic grid item with responsive behavior
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["A", "B", "C", "D"].map((item) => (
              <div
                key={item}
                className="bg-gray-100 dark:bg-gray-700 p-4 rounded text-center"
              >
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Compact Item {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.main>
  );
}