"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Upload, Check } from "lucide-react";

export default function ProgressBarPremium() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "uploading" | "complete">("idle");

  useEffect(() => {
    if (status !== "uploading") return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setStatus("complete"), 500);
          return 100;
        }
        return Math.min(prev + 1 + Math.random() * 3, 100);
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [status]);

  const startUpload = () => {
    setStatus("uploading");
    setProgress(0);
  };

  const reset = () => {
    setStatus("idle");
    setProgress(0);
  };

  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-xl space-y-8">
        <div className="bg-linear-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700">
          <div className="space-y-10">
            <div className="text-center">
              <h3 className="text-2xl font-bold bg-linear-to-r from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent mb-2">
                Premium Upload
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Upload your files with enhanced encryption
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {status === "complete" ? (
                    <Check className="w-6 h-6 text-green-500 dark:text-green-400" />
                  ) : (
                    <Upload className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                  )}
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {status === "idle" && "Ready to Upload"}
                    {status === "uploading" && "Uploading..."}
                    {status === "complete" && "Upload Complete!"}
                  </span>
                </div>
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400">
                  {Math.round(progress)}%
                </span>
              </div>
              
              <div className="relative">
                <div className="w-full h-4 bg-linear-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    className="h-full bg-linear-to-r from-amber-400 via-orange-500 to-red-500 dark:from-amber-500 dark:via-orange-600 dark:to-red-600"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                
                {status === "uploading" && (
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-gray-900 rounded-full border-2 border-amber-500 dark:border-amber-400 shadow-xl"
                    style={{ left: `${progress}%` }}
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </div>
              
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>0 MB</span>
                <span>500 MB</span>
                <span>1 GB</span>
              </div>
            </div>
            
            <div className="flex gap-4">
              {status === "idle" ? (
                <button
                  onClick={startUpload}
                  className="flex-1 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 dark:from-amber-600 dark:to-orange-600 dark:hover:from-amber-700 dark:hover:to-orange-700 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Start Upload
                </button>
              ) : status === "complete" ? (
                <button
                  onClick={reset}
                  className="flex-1 bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 dark:from-green-600 dark:to-emerald-600 dark:hover:from-green-700 dark:hover:to-emerald-700 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Upload Another
                </button>
              ) : (
                <button
                  disabled
                  className="flex-1 bg-linear-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 text-white font-bold py-4 rounded-xl opacity-90"
                >
                  Uploading...
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}