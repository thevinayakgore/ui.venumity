"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function MultiLayerPulseLoader() {
  return (
    <div className="flex flex-col items-center justify-center m-auto gap-5 md:gap-10 lg:gap-15 w-full h-full">
      <div className="relative size-40">
        {/* Outer pulse rings */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 bg-primary/20 rounded-full"
            animate={{
              scale: [1, 2],
              opacity: [0, 0.6, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Inner Glowing Icon Circle */}
        <div className="absolute inset-0 z-50 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 size-30 bg-primary border-3 border-white ring-6 ring-primary shadow-xl shadow-primary/40 rounded-full">
          <Image
            src="/brand.webp"
            alt="Brand Logo"
            width={500}
            height={500}
            priority
            unoptimized
            loading="eager"
            className="p-5 mt-1.5 object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-semibold">Scanning System...</h3>
        <p className="opacity-50">Please wait while we scan for updates</p>
      </div>
    </div>
  );
}
