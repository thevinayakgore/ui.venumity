"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProgressCircleMultiLayer() {
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [progress3, setProgress3] = useState(0);
  
  const radius1 = 50;
  const radius2 = 40;
  const radius3 = 30;
  const circumference1 = 2 * Math.PI * radius1;
  const circumference2 = 2 * Math.PI * radius2;
  const circumference3 = 2 * Math.PI * radius3;

  const startAllProgress = () => {
    setProgress1(0);
    setProgress2(0);
    setProgress3(0);
    
    const startTime = Date.now();
    const duration = 3000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setProgress1(progress * 100);
      setProgress2(Math.min(progress * 120, 100));
      setProgress3(Math.min(progress * 150, 100));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };

  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="space-y-10">
        <div className="relative w-80 h-80">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Outer circle - Storage */}
            <circle
              cx="50"
              cy="50"
              r={radius1}
              strokeWidth="4"
              stroke="currentColor"
              className="text-gray-200 dark:text-gray-700"
              fill="none"
            />
            <motion.circle
              cx="50"
              cy="50"
              r={radius1}
              strokeWidth="4"
              stroke="currentColor"
              className="text-blue-500 dark:text-blue-400"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference1}
              style={{ strokeDashoffset: circumference1 - (progress1 / 100) * circumference1 }}
              transform="rotate(-90 50 50)"
            />
            
            {/* Middle circle - CPU */}
            <circle
              cx="50"
              cy="50"
              r={radius2}
              strokeWidth="6"
              stroke="currentColor"
              className="text-gray-200 dark:text-gray-700"
              fill="none"
            />
            <motion.circle
              cx="50"
              cy="50"
              r={radius2}
              strokeWidth="6"
              stroke="currentColor"
              className="text-purple-500 dark:text-purple-400"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference2}
              style={{ strokeDashoffset: circumference2 - (progress2 / 100) * circumference2 }}
              transform="rotate(-90 50 50)"
            />
            
            {/* Inner circle - Memory */}
            <circle
              cx="50"
              cy="50"
              r={radius3}
              strokeWidth="8"
              stroke="currentColor"
              className="text-gray-200 dark:text-gray-700"
              fill="none"
            />
            <motion.circle
              cx="50"
              cy="50"
              r={radius3}
              strokeWidth="8"
              stroke="currentColor"
              className="text-pink-500 dark:text-pink-400"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference3}
              style={{ strokeDashoffset: circumference3 - (progress3 / 100) * circumference3 }}
              transform="rotate(-90 50 50)"
            />
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                {Math.round((progress1 + progress2 + progress3) / 3)}%
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">System Load</p>
              <div className="flex gap-4 mt-4">
                <div className="text-center">
                  <div className="w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full mx-auto mb-1" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Storage</span>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 bg-purple-500 dark:bg-purple-400 rounded-full mx-auto mb-1" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">CPU</span>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 bg-pink-500 dark:bg-pink-400 rounded-full mx-auto mb-1" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Memory</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <button
          onClick={startAllProgress}
          className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 text-white font-bold py-3 px-10 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Simulate System Load
        </button>
      </div>
    </motion.main>
  );
}