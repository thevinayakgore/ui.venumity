"use client";
import { motion } from "framer-motion";

export default function WaveLoaderBasic() {
  const bars = 5;
  
  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex items-end justify-center gap-2 h-20">
          {Array.from({ length: bars }).map((_, i) => (
            <motion.div
              key={i}
              className="w-4 bg-blue-500 dark:bg-blue-400 rounded-t-lg"
              animate={{
                height: ["30%", "80%", "30%"],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
              style={{ height: "30%" }}
            />
          ))}
        </div>
        
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Processing Audio
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Analyzing sound waves...
          </p>
        </div>
      </div>
    </motion.main>
  );
}