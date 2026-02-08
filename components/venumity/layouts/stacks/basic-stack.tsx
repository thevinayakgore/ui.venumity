"use client";
import { motion } from "framer-motion";

export default function BasicStack() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Basic Stack Layout
          </h2>
          
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded border border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-gray-700 dark:text-gray-300 font-bold">{item}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      Stack Item {item}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Basic stacked item with consistent spacing and clean layout
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.main>
  );
}