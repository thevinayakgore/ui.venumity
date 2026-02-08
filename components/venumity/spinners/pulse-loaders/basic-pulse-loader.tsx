"use client";
import { motion } from "framer-motion";

export default function PulseLoaderBasic() {
  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <motion.div
            className="w-16 h-16 bg-blue-500 dark:bg-blue-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute inset-0 border-4 border-blue-500 dark:border-blue-400 rounded-full"
            animate={{
              scale: [1, 1.5, 2],
              opacity: [1, 0.5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <span className="text-gray-700 dark:text-gray-300 font-medium">
          Loading...
        </span>
      </div>
    </motion.main>
  );
}