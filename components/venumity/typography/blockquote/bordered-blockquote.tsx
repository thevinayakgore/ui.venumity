"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function BlockquoteBordered() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <blockquote className="relative max-w-3xl border-l-4 border-gray-300 dark:border-gray-600 pl-6 sm:pl-8">
        <Quote className="absolute -left-3 top-0 w-6 h-6 text-gray-300 dark:text-gray-600 bg-white dark:bg-black p-1 rounded-full" />
        <p className="text-base sm:text-lg lg:text-xl text-gray-800 dark:text-gray-200 italic mb-4 leading-relaxed">
          Your quote text here
        </p>
        {true && (
          <footer className="flex flex-col items-end gap-2 mt-3 not-italic w-full">
            <span className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300">
              Author Name
            </span>
            <span className="flex bg-linear-to-l from-gray-300 to-transparent dark:from-gray-600 h-px w-full" />
            <cite className="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Source or citation
            </cite>
          </footer>
        )}
      </blockquote>
    </motion.main>
  );
}
