"use client";
import { motion } from "framer-motion";

export default function PulseLoaderBasic() {
  return (
    <main className="flex items-center justify-center m-auto gap-6 w-full min-h-screen">
      <div className="relative">
        <motion.div
          className="size-10 bg-primary rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-0 border-2 border-primary rounded-full"
          animate={{
            scale: [1, 1.5, 2],
            opacity: [1, 0.5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <span className="opacity-50 font-medium">Loading...</span>
    </main>
  );
}
