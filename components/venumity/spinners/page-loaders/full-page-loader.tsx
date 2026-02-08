"use client";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function FullPageLoader() {
  return (
    <main className="flex flex-col items-center justify-center gap-5">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className="size-15 text-primary" />
      </motion.div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">
          Loading Application
        </h2>
        <p className="opacity-50">
          Please wait while we prepare everything for you
        </p>
      </div>

      <div className="w-64 h-1 bg-foreground/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-linear-to-r from-yellow-400 to-primary"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </main>
  );
}
