"use client";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function MultiPulseLoader() {
  return (
    <main className="flex flex-col items-center justify-center m-auto gap-20 w-full min-h-screen">
      <div className="relative size-40">
        {/* Outer pulse rings */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 bg-primary/20 rounded-full"
            animate={{
              scale: [1, 2],
              opacity: [0, 0.4, 0.8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Inner glowing circle */}
        <motion.div
          className="absolute inset-10 bg-linear-to-r from-yellow-400 to-primary rounded-full shadow-xl shadow-amber-500/30 dark:shadow-amber-600/30"
          animate={{
            scale: [1, 1.2, 1],
            boxShadow: [
              "0 0 20px 0px rgba(245, 158, 11, 0.3)",
              "0 0 40px 10px rgba(245, 158, 11, 0.5)",
              "0 0 20px 0px rgba(245, 158, 11, 0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center m-auto size-10 text-white">
          <Zap className="w-full h-full" />
        </div>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold">Scanning System</h3>
        <p className="opacity-40">Please wait while we scan for updates</p>
      </div>
    </main>
  );
}
