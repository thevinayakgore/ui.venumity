"use client";
import { motion } from "framer-motion";

export default function BasicSidebarLayout() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="md:w-1/4 bg-gray-50 dark:bg-gray-700/50 p-6 border-r border-gray-200 dark:border-gray-600">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Navigation</h3>
              <nav>
                <ul className="space-y-2">
                  {["Dashboard", "Profile", "Messages", "Settings", "Help"].map((item) => (
                    <li key={item}>
                      <button className="w-full text-left px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Main Content */}
            <div className="md:w-3/4 p-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                Basic Sidebar Layout
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Simple sidebar layout with navigation and main content area. Fully responsive with clean design.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded border border-gray-200 dark:border-gray-600">
                    <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Content Block {item}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Basic content area within the main layout
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