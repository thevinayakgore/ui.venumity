"use client";
import { motion } from "framer-motion";

export default function PulseLoaderDot() {
  const dots = 5;
  
  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex items-center justify-center gap-4">
          {Array.from({ length: dots }).map((_, i) => (
            <motion.div
              key={i}
              className="w-4 h-4 bg-linear-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 rounded-full"
              animate={{
                    scale: [1, 1.8, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        <div className="text-center space-y-3">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Syncing Data
          </h3>
          <div className="flex items-center justify-center gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.span
                key={i}
                className="text-gray-600 dark:text-gray-400"
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