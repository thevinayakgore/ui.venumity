"use client";
import { motion } from "framer-motion";

export default function PulseLoaderBasic() {
  return (
    <div className="flex items-center justify-center m-auto gap-3 w-full h-full">
      <div className="relative">
        <motion.div
          className="size-5 bg-primary rounded-full"
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
      <p className="text-sm md:text-base opacity-60 font-semibold">Loading...</p>
    </div>
  );
}
