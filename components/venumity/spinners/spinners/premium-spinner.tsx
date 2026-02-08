"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function SpinnerPremium() {
  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="flex flex-col items-center justify-center gap-12">
        <div className="relative">
          <motion.div
            className="w-28 h-28 border-4 border-transparent border-t-amber-500 border-r-orange-500 rounded-full shadow-xl shadow-amber-500/20 dark:shadow-amber-400/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.div
            className="absolute inset-4 border-4 border-transparent border-b-red-500 border-l-pink-500 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-10 h-10 text-amber-500 dark:text-amber-400" />
            </motion.div>
          </div>
          
          {/* Orbiting dots */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-linear-to-r from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transform: `rotate(${i * 60}deg) translateX(70px)`,
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
        
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Premium Experience
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            Loading exclusive features for enhanced performance
          </p>
        </div>
      </div>
    </motion.main>
  );
}