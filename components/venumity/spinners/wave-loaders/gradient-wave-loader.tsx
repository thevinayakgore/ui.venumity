"use client";
import { motion } from "framer-motion";

export default function WaveLoaderGradient() {
  const bars = 7;
  
  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="flex flex-col items-center justify-center gap-12">
        <div className="flex items-end justify-center gap-3 h-28">
          {Array.from({ length: bars }).map((_, i) => (
            <motion.div
              key={i}
              className="w-6 rounded-t-lg"
              style={{
                background: `linear-gradient(to top, 
                  ${i % 3 === 0 ? '#3B82F6' : i % 3 === 1 ? '#8B5CF6' : '#EC4899'}, 
                  ${i % 3 === 0 ? '#60A5FA' : i % 3 === 1 ? '#A78BFA' : '#F472B6'}
                )`
              }}
              animate={{
                height: ["20%", "90%", "20%"],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Music Visualization
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            Real-time audio processing and visualization
          </p>
        </div>
      </div>
    </motion.main>
  );
}