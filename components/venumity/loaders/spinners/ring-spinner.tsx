"use client";
import { motion } from "framer-motion";

export default function SpinnerRing() {
  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="relative">
          <motion.div
            className="w-24 h-24 border-8 border-gray-200 dark:border-gray-700 border-t-blue-500 dark:border-t-blue-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="absolute inset-4 border-8 border-gray-200 dark:border-gray-700 border-b-purple-500 dark:border-b-purple-400 rounded-full">
            <motion.div
              className="w-full h-full border-8 border-transparent border-l-green-500 dark:border-l-green-400 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Initializing Systems
          </h4>
          <div className="flex items-center justify-center gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.span
                key={i}
                className="text-gray-500 dark:text-gray-400"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
              >
                .
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.main>
  );
}