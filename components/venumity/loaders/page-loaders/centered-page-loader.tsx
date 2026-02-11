"use client";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export default function CenteredPageLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="relative">
        <motion.div
          className="size-30 border-4 border-t-primary rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Globe className="size-14 text-primary" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">
          Initializing System
        </h3>
        <p className="opacity-50 max-w-md">
          Loading required modules and preparing your environment
        </p>
      </div>

      <div className="flex items-center gap-1.5">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="size-2 bg-primary rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
