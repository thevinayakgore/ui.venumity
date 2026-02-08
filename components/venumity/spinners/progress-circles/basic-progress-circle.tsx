"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProgressCircleBasic() {
  const [progress, setProgress] = useState(0);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const handleProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="space-y-10">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              strokeWidth="8"
              stroke="currentColor"
              className="text-gray-200 dark:text-gray-700"
              fill="none"
            />
            <motion.circle
              cx="50"
              cy="50"
              r={radius}
              strokeWidth="8"
              stroke="currentColor"
              className="text-blue-500 dark:text-blue-400"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              style={{ strokeDashoffset }}
              transform="rotate(-90 50 50)"
            />
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                {progress}%
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Complete</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleProgress}
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
        >
          Start Progress
        </button>
      </div>
    </motion.main>
  );
}