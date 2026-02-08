"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function BlockquoteBasic() {
  const content = "This is a sample quote for demonstration. Replace with your text.";
  const author = "John Doe";
  const cite = "Source Name";
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <blockquote className="relative max-w-3xl">
        <div className="flex items-start gap-4">
          <div className="mt-1.5">
            <Quote className="w-8 h-8 text-gray-400 dark:text-gray-600" />
          </div>
          <div className="flex-1">
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-800 dark:text-gray-200 italic leading-relaxed">
              {content}
            </p>
            {(author || cite) && (
              <footer className="mt-4 not-italic">
                {author && (
                  <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                    — {author}
                  </span>
                )}
                {cite && (
                  <cite className="block text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {cite}
                  </cite>
                )}
              </footer>
            )}
          </div>
        </div>
      </blockquote>
    </motion.main>
  );
}
