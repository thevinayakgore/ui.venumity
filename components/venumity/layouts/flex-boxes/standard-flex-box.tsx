"use client";
import { motion } from "framer-motion";

export default function StandardFlexBox() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Standard Flex Box Layout
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Professional flex layout with responsive behavior and proper
                alignment
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Action
                </button>
                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                  Secondary
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <div className="bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  Main Content Area
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  This is the primary content area using flex-grow to take
                  available space. It adjusts responsively based on screen size.
                </p>
                <div className="flex flex-wrap gap-4">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="flex-1 min-w-[200px] bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                        Feature {item}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Flexible content block with proper spacing
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="bg-linear-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 h-full">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  Sidebar
                </h3>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      Recent Activity
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Latest updates and notifications
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      Quick Stats
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Important metrics at a glance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flex Row with Centered Items */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="w-20 h-20 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">1</span>
            </div>
            <div className="w-20 h-20 rounded-full bg-linear-to-r from-green-500 to-emerald-500 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">2</span>
            </div>
            <div className="w-20 h-20 rounded-full bg-linear-to-r from-orange-500 to-red-500 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">3</span>
            </div>
            <div className="w-20 h-20 rounded-full bg-linear-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">4</span>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
