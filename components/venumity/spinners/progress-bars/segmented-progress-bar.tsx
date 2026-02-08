"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProgressBarSegmented() {
  const [progress, setProgress] = useState(0);
  const segments = 10;
  const segmentWidth = 100 / segments;

  const handleProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const nextSegment = Math.ceil((prev + 5) / segmentWidth) * segmentWidth;
        return Math.min(nextSegment, 100);
      });
    }, 300);
  };

  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-2xl space-y-10">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Installation Progress
            </span>
            <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
              Step {Math.floor(progress / segmentWidth) + 1}/{segments}
            </span>
          </div>
          
          <div className="flex gap-1">
            {Array.from({ length: segments }).map((_, index) => {
              const segmentStart = index * segmentWidth;
              const segmentEnd = (index + 1) * segmentWidth;
              const isActive = progress >= segmentEnd;
              const isCurrent = progress >= segmentStart && progress < segmentEnd;
              
              return (
                <div key={index} className="flex-1">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-1">
                    {isActive && (
                      <div className="h-full bg-linear-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600" />
                    )}
                    {isCurrent && (
                      <motion.div
                        className="h-full bg-linear-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600"
                        initial={{ width: "0%" }}
                        animate={{ width: `${((progress - segmentStart) / segmentWidth) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      {index + 1}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <button
          onClick={handleProgress}
          className="w-full bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 dark:from-purple-600 dark:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Install Now
        </button>
      </div>
    </motion.main>
  );
}