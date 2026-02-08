"use client";
import { motion } from "framer-motion";

export default function CustomLoaderGradient() {
  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="relative w-24 h-24">
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 rounded-full"
          animate={{
            rotate: 360,
            scale: [1, 0.9, 1],
          }}
          transition={{
            rotate: {
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
        <div className="absolute inset-4 bg-white dark:bg-gray-900 rounded-full" />
      </div>
    </motion.main>
  );
}