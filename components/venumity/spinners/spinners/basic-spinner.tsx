"use client";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function SpinnerBasic() {
  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="flex flex-col items-center justify-center gap-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-blue-500 dark:text-blue-400" />
        </motion.div>
        
        <span className="text-gray-700 dark:text-gray-300 font-medium">
          Loading...
        </span>
      </div>
    </motion.main>
  );
}