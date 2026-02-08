"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Download } from "lucide-react";

export default function ProgressCircleAnimated() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    
    return () => clearInterval(interval);
  }, [isLoading]);

  const startDownload = () => {
    setIsLoading(true);
    setProgress(0);
  };

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="space-y-10">
        <div className="relative w-60 h-60">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              strokeWidth="6"
              stroke="currentColor"
              className="text-gray-200 dark:text-gray-700"
              fill="none"
            />
            <motion.circle
              cx="50"
              cy="50"
              r={radius}
              strokeWidth="6"
              stroke="currentColor"
              className="text-green-500 dark:text-green-400"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              style={{ strokeDashoffset }}
              transform="rotate(-90 50 50)"
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              animate={isLoading ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="mb-4"
            >
              <Download className={`w-10 h-10 ${isLoading ? 'text-green-500 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`} />
            </motion.div>
            <span className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              {Math.round(progress)}%
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isLoading ? 'Downloading...' : 'Ready'}
            </p>
          </div>
        </div>
        
        <button
          onClick={startDownload}
          disabled={isLoading}
          className="bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 dark:from-green-600 dark:to-emerald-600 dark:hover:from-green-700 dark:hover:to-emerald-700 text-white font-semibold py-3 px-10 rounded-lg transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <>
              <motion.div
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              Downloading...
            </>
          ) : (
            'Start Download'
          )}
        </button>
      </div>
    </motion.main>
  );
}