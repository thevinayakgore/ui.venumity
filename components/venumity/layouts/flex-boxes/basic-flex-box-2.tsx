"use client";
import { motion } from "framer-motion";

export default function BasicFlexBox() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Basic Flex Box Layout
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Flex Item 1</h3>
              <p className="text-blue-600 dark:text-blue-200 text-sm">
                Flexible width container that adjusts based on available space.
              </p>
            </div>
            <div className="flex-1 bg-green-50 dark:bg-green-900/20 p-4 rounded">
              <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">Flex Item 2</h3>
              <p className="text-green-600 dark:text-green-200 text-sm">
                Equal width distribution in responsive flex layout.
              </p>
            </div>
            <div className="flex-1 bg-purple-50 dark:bg-purple-900/20 p-4 rounded">
              <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Flex Item 3</h3>
              <p className="text-purple-600 dark:text-purple-200 text-sm">
                Responsive flex behavior with proper spacing.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="flex-1 min-w-[150px] bg-gray-50 dark:bg-gray-700/50 p-4 rounded border border-gray-200 dark:border-gray-600"
              >
                <div className="text-center">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-gray-700 dark:text-gray-300 font-bold">{item}</span>
                  </div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-200">Item {item}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">Flex item</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.main>
  );
}