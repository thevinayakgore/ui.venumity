"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function PulseLoaderPremium() {
  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="flex flex-col items-center justify-center gap-12">
        <div className="relative">
          <div className="relative w-36 h-36">
            {/* Outer pulse rings */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border-4 border-amber-500/20 dark:border-amber-400/20 rounded-full"
                animate={{
                  scale: [1, 1.8],
                  opacity: [0.4, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeOut"
                }}
              />
            ))}
            
            {/* Inner glowing circle */}
            <motion.div
              className="absolute inset-8 bg-linear-to-r from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 rounded-full shadow-xl shadow-amber-500/30 dark:shadow-amber-600/30"
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 20px 0px rgba(245, 158, 11, 0.3)",
                  "0 0 40px 10px rgba(245, 158, 11, 0.5)",
                  "0 0 20px 0px rgba(245, 158, 11, 0.3)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-12 h-12 text-white dark:text-gray-100" />
              </motion.div>
            </div>
          </div>
          
          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-2 h-2 bg-linear-to-r from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transform: `rotate(${i * 45}deg) translateX(100px)`,
              }}
              animate={{
                x: [0, -20],
                y: [0, -20],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.25,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Premium Processing
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            Unleashing maximum performance with advanced algorithms
          </p>
        </div>
      </div>
    </motion.main>
  );
}