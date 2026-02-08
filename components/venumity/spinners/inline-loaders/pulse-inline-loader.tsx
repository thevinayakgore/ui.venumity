"use client";
import { motion } from "framer-motion";

export default function InlineLoaderPulse() {
  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="inline-flex items-center gap-2">
        <motion.div
          className="w-3 h-3 bg-linear-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 rounded-full"
          animate={{
            scale: [1, 1.8, 1],
            boxShadow: [
              "0 0 0 0 rgba(59, 130, 246, 0)",
              "0 0 0 6px rgba(59, 130, 246, 0.3)",
              "0 0 0 0 rgba(59, 130, 246, 0)"
            ]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <span className="text-gray-600 dark:text-gray-400 text-sm">Loading</span>
      </div>
    </motion.main>
  );
}