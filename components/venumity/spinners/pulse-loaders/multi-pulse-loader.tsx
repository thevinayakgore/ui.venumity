"use client";
import { motion } from "framer-motion";

export default function PulseLoaderMulti() {
  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="relative w-32 h-32">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border-4 border-blue-500/30 dark:border-blue-400/30 rounded-full"
              animate={{
                scale: [1, 2],
                opacity: [1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeOut"
              }}
            />
          ))}
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 rounded-full" />
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Scanning System
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Please wait while we scan for updates
          </p>
        </div>
      </div>
    </motion.main>
  );
}