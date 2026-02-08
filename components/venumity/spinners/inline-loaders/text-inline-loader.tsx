"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function InlineLoaderText() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="inline-flex items-center gap-1 px-3 py-1.5">
        <span className="text-gray-600 dark:text-gray-400 font-medium">Processing</span>
        <motion.span 
          className="text-blue-500 dark:text-blue-400 font-bold min-w-[24px]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {dots}
        </motion.span>
      </div>
    </motion.main>
  );
}