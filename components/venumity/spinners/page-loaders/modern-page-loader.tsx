"use client";
import { motion } from "framer-motion";

export default function PageLoaderModern() {
  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-screen"
    >
      <div className="flex flex-col items-center justify-center gap-12">
        <div className="relative">
          <div className="grid grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 rounded-lg"
                animate={{
                  scale: [1, 0.5, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center space-y-6">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-gray-900 dark:text-white mb-3"
            >
              Modern Loader
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 dark:text-gray-400"
            >
              Loading your content with style
            </motion.p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Loading modules</span>
              <span>75%</span>
            </div>
            <div className="w-96 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-linear-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600"
                initial={{ width: "0%" }}
                animate={{ width: "75%" }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}