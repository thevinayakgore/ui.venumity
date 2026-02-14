"use client";
import { brandName } from "@/lib/brand";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LogoPageLoader() {
  return (
    <main className="flex flex-col items-center justify-center m-auto gap-10">
      <div className="relative">
        <motion.div
          className="flex items-center justify-center size-30"
          animate={{
            rotateY: 360,
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Image
            src="/brand-logo.png"
            alt={brandName}
            width={1000}
            height={1000}
            className="border-6 border-white shadow-xl rounded-2xl w-full h-full"
          />
        </motion.div>

      </div>

      <div className="text-center space-y-6">
        <h1 className="flex items-center text-3xl font-medium">
          Venu<span className="text-primary mr-2">mity</span> UI
        </h1>
        <div className="flex items-center justify-center gap-1">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="size-2 bg-primary rounded-full"
              animate={{
                y: ["0%", "-80%", "0%"],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
