"use client";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";

export default function ButtonLoaderPremium() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
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
        className="relative bg-linear-to-br from-amber-400 via-orange-500 to-red-500 hover:from-amber-500 hover:via-orange-600 hover:to-red-600 dark:from-amber-500 dark:via-orange-600 dark:to-red-600 dark:hover:from-amber-600 dark:hover:via-orange-700 dark:hover:to-red-700 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 min-w-60 h-14 disabled:opacity-90 shadow-xl hover:shadow-2xl shadow-orange-500/30 dark:shadow-orange-600/30 overflow-hidden group"
      >
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        <div className="relative flex items-center justify-center gap-3">
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Premium Loading...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Premium Action</span>
              <Sparkles className="w-5 h-5" />
            </>
          )}
        </div>
      </button>
    </motion.main>
  );
}