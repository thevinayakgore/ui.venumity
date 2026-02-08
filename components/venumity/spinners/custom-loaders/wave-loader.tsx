"use client";
import { motion } from "framer-motion";

export default function CustomLoaderWave() {
  const wavePoints = 5;

  return (
    <div className="flex items-end justify-center gap-1 border-b-2 w-23 h-14">
      {Array.from({ length: wavePoints }).map((_, i) => (
        <motion.div
          key={i}
          className="w-3 bg-linear-to-t from-primary to-yellow-400 rounded-t-full"
          animate={{
            height: ["20%", "100%", "20%"],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
          style={{ height: "20%" }}
        />
      ))}
    </div>
  );
}
