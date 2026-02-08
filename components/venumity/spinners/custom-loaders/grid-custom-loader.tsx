"use client";
import { motion } from "framer-motion";

const GRID_SIZE = 3;

export default function CustomLoaderGrid() {
  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => (
          <motion.div
            key={index}
            className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 rounded-lg"
            animate={{
              scale: [1, 0.5, 1],
              opacity: [1, 0.3, 1],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: index * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.main>
  );
}