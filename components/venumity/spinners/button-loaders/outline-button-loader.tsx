"use client";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function ButtonLoaderOutline() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <button 
        onClick={handleClick}
        disabled={loading}
        className="relative border-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 min-w-50 disabled:opacity-70 group"
      >
        {loading && (
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "linear" }}
            className="absolute bottom-0 left-0 h-0.5 bg-blue-500 dark:bg-blue-400"
          />
        )}
        
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading...
          </>
        ) : (
          "Load Content"
        )}
      </button>
    </motion.main>
  );
}