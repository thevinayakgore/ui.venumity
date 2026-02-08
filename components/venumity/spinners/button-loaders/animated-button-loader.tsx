"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Check, X } from "lucide-react";
import { useState } from "react";

type LoaderState = "idle" | "loading" | "success" | "error";

export default function ButtonLoaderAnimated() {
  const [state, setState] = useState<LoaderState>("idle");

  const handleClick = () => {
    setState("loading");
    setTimeout(() => {
      setState(Math.random() > 0.5 ? "success" : "error");
      setTimeout(() => setState("idle"), 1500);
    }, 1500);
  };

  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <button 
        onClick={handleClick}
        disabled={state !== "idle"}
        className="relative bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 dark:from-blue-600 dark:to-purple-600 dark:hover:from-blue-700 dark:hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 min-w-50 h-12 disabled:opacity-90 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.span
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center"
            >
              Submit Action
            </motion.span>
          )}
          
          {state === "loading" && (
            <motion.span
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-3"
            >
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </motion.span>
          )}
          
          {state === "success" && (
            <motion.span
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-3 text-green-300"
            >
              <Check className="w-5 h-5" />
              Success!
            </motion.span>
          )}
          
          {state === "error" && (
            <motion.span
              key="error"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-3 text-red-300"
            >
              <X className="w-5 h-5" />
              Failed!
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </motion.main>
  );
}