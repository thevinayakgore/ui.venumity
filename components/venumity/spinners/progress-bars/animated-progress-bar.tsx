"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ProgressBarAnimated() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            setProgress(0);
          }, 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [isLoading]);

  const startLoading = () => {
    setIsLoading(true);
    setProgress(0);
  };

  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-lg space-y-10">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Download Progress
            </span>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {Math.round(progress)}%
            </span>
          </div>
          
          <div className="relative">
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-linear-to-r from-green-400 to-blue-500 dark:from-green-500 dark:to-blue-600"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            <motion.div
              className="absolute top-1/2 w-6 h-6 bg-white dark:bg-gray-900 border-2 border-blue-500 dark:border-blue-400 rounded-full shadow-lg"
              style={{ left: `${progress}%` }}
              animate={{
                y: [-10, 0, -10],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 px-2">
            <span>Start</span>
            <span>Halfway</span>
            <span>Complete</span>
          </div>
        </div>
        
        <button
          onClick={startLoading}
          disabled={isLoading}
          className="w-full bg-linear-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 dark:from-green-600 dark:to-blue-600 dark:hover:from-green-700 dark:hover:to-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 disabled:opacity-70"
        >
          {isLoading ? "Downloading..." : "Start Download"}
        </button>
      </div>
    </motion.main>
  );
}