"use client";
import { motion } from "framer-motion";

export default function WaveLoaderCircle() {
  const waves = 8;
  
  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="relative w-48 h-48">
          {Array.from({ length: waves }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border-2 border-blue-500/40 dark:border-blue-400/40 rounded-full"
              animate={{
                scale: [1 + i * 0.1, 1.5 + i * 0.1],
                opacity: [0.3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.25,
                ease: "easeOut"
              }}
            />
          ))}
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-linear-to-r from-blue-500 to-cyan-400 dark:from-blue-600 dark:to-cyan-500 rounded-full" />
          </div>
        </div>
        
        <div className="text-center space-y-3">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Signal Processing
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Analyzing waveform patterns
          </p>
        </div>
      </div>
    </motion.main>
  );
}