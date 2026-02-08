"use client";
import { motion } from "framer-motion";

export default function BasicSplitLayout() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Panel */}
            <div className="md:w-1/2 bg-blue-50 dark:bg-blue-900/20 p-8 border-r border-gray-200 dark:border-gray-600">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Left Panel
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This is the left side of the split layout. It contains primary content or features.
              </p>
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-700/50 p-4 rounded border border-gray-200 dark:border-gray-600">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Feature One</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Basic feature description</p>
                </div>
                <div className="bg-white dark:bg-gray-700/50 p-4 rounded border border-gray-200 dark:border-gray-600">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Feature Two</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Additional information</p>
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="md:w-1/2 bg-gray-50 dark:bg-gray-700/20 p-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Right Panel
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This is the right side of the split layout. It contains secondary content or details.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-white dark:bg-gray-700/50 p-4 rounded border border-gray-200 dark:border-gray-600">
                    <div className="text-center">
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <span className="text-gray-700 dark:text-gray-300 font-bold">{item}</span>
                      </div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-200">Item {item}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}