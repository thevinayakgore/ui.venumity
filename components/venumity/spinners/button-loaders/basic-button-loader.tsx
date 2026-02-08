"use client";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function ButtonLoaderBasic() {
  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <button 
        className="relative bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 min-w-45 disabled:opacity-70 disabled:cursor-not-allowed"
        disabled
      >
        <Loader2 className="w-5 h-5 animate-spin" />
        Processing...
      </button>
    </motion.main>
  );
}