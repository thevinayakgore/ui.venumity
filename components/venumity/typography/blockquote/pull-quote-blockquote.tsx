"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function BlockquotePullQuote() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="relative max-w-4xl w-full">
        <div className="relative bg-linear-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 sm:p-12 lg:p-16 border border-gray-200 dark:border-gray-700">
          <Quote className="absolute top-6 left-6 w-12 h-12 sm:w-16 sm:h-16 text-gray-200 dark:text-gray-700" />

          <div className="relative z-10">
            <p className="text-2xl sm:text-3xl lg:text-4xl text-gray-900 dark:text-white font-bold leading-tight mb-6 text-center">
              Design is not just what it looks like and feels like. Design is how it works.
            </p>

              <div className="flex items-center justify-center gap-3 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-500 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      S
                    </span>
                  </div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Steve Jobs
                  </span>
                </div>
              </div>
          </div>

          <Quote className="absolute bottom-6 right-6 w-12 h-12 sm:w-16 sm:h-16 text-gray-200 dark:text-gray-700 transform rotate-180" />
        </div>
      </div>
    </motion.main>
  );
}
