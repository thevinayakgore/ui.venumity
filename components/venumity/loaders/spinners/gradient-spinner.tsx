"use client";
import { motion } from "framer-motion";

export default function SpinnerGradient() {
  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="relative w-20 h-20">
          <motion.div
            className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 border-4 border-transparent border-b-pink-500 border-l-green-500 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Processing Request
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Please wait a moment
          </p>
        </div>
      </div>
    </motion.main>
  );
}