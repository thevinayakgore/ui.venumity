"use client";
import { motion } from "framer-motion";

export default function CustomLoaderBasic() {
  return (
    <div className="flex items-center justify-center gap-2">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="size-3 bg-primary rounded-full"
          animate={{
            y: ["0%", "-50%", "0%"],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}
