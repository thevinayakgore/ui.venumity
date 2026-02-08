"use client";
import { motion } from "framer-motion";

export default function SpinnerDots() {
  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex items-center gap-3">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-5 h-5 bg-linear-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 rounded-full"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
        
        <div className="text-center space-y-3">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Loading Content
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Fetching data from the server
          </p>
        </div>
      </div>
    </motion.main>
  );
}