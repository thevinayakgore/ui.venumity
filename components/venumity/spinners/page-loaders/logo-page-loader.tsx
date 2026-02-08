"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function PageLoaderLogo() {
  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-screen"
    >
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="relative">
          <motion.div
            className="w-36 h-36 border-8 border-gray-100 dark:border-gray-800 rounded-3xl flex items-center justify-center"
            animate={{
              rotateY: 360,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="text-center">
              <Sparkles className="w-12 h-12 text-amber-500 dark:text-amber-400 mx-auto mb-3" />
              <span className="text-2xl font-bold bg-linear-to-r from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                Nova
              </span>
            </div>
          </motion.div>
          
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute -top-2 -left-2 w-40 h-40 border-2 border-blue-500/30 dark:border-blue-400/30 rounded-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
        
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Nova Dashboard
          </h2>
          <div className="flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full"
                animate={{
                  y: ["0%", "-100%", "0%"],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.main>
  );
}