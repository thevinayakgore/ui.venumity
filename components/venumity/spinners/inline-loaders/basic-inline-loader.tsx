"use client";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function InlineLoaderBasic() {
  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <Loader2 className="w-4 h-4 animate-spin text-blue-500 dark:text-blue-400" />
        <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">Loading data...</span>
      </div>
    </motion.main>
  );
}