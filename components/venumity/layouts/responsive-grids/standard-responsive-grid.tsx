"use client";
import { motion } from "framer-motion";

export default function StandardResponsiveGrid() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">
              Standard Responsive Grid
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Professional responsive grid with multiple breakpoints and optimized spacing
            </p>
          </div>

          {/* Main Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { title: "Mobile First", value: "100%", color: "bg-blue-100 dark:bg-blue-900/30" },
              { title: "Tablet View", value: "768px", color: "bg-green-100 dark:bg-green-900/30" },
              { title: "Desktop View", value: "1024px", color: "bg-purple-100 dark:bg-purple-900/30" },
              { title: "Large Screen", value: "1280px", color: "bg-orange-100 dark:bg-orange-900/30" },
            ].map((item, index) => (
              <div
                key={index}
                className={`${item.color} rounded-xl p-6 border border-gray-200 dark:border-gray-600`}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                    {item.value}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                    Breakpoint optimized for {item.title.toLowerCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Responsive Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  Main Content Area
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  This area spans two columns on medium screens and above, demonstrating responsive column spanning.
                  The layout adapts perfectly to all screen sizes.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Feature A</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Responsive feature description</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Feature B</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Adaptive layout element</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-linear-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  Side Panel
                </h3>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Info Panel</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Responsive side content</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Quick Stats</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Adaptive statistics display</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}