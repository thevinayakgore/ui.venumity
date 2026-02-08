"use client";
import { motion } from "framer-motion";

export default function CustomLoaderWave() {
  const wavePoints = 5;
  
  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="flex items-end justify-center gap-2 h-16">
        {Array.from({ length: wavePoints }).map((_, i) => (
          <motion.div
            key={i}
            className="w-3 bg-linear-to-t from-blue-500 to-cyan-400 dark:from-blue-600 dark:to-cyan-500 rounded-t-lg"
            animate={{
              height: ["20%", "80%", "20%"],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
            style={{ height: "20%" }}
          />
        ))}
      </div>
    </motion.main>
  );
}