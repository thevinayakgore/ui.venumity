"use client";
import { motion } from "framer-motion";

export default function BasicCustomLayout() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="md:w-1/4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Navigation</h3>
                <ul className="space-y-2">
                  {["Dashboard", "Profile", "Settings", "Help"].map((item) => (
                    <li key={item}>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:w-3/4">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  Basic Custom Layout
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  A simple customizable layout with sidebar and main content area.
                  Fully responsive with clean spacing and modern typography.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded">
                    <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Content Block {item}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Customizable content area with flexible layout options.
                    </p>
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