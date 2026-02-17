"use client";

import { motion } from "framer-motion";

export default function BasicInlineLoader() {
  return (
    <main className="flex flex-col items-center justify-center m-auto p-6 md:p-10 max-w-3xl w-full h-full">
      <p className="text-sm text-foreground w-full">
        <span className="text-lg font-medium">AI</span> can now write, see,
        hear, and reason together - modern multimodal AI systems can understand
        text, images, audio, and video at the same time, letting them do things
        like diagnose medical images while reading patient notes and listening
        to doctor instructions in one unified model 🤯 and also can...
      </p>
      {/* Line loader */}
      <div className="relative h-1 mt-5 overflow-hidden rounded-full bg-foreground/10 w-full">
        <motion.div
          className="absolute left-0 top-0 h-full w-1/2 rounded-full bg-linear-to-l from-transparent via-primary/80 to-transparent"
          animate={{ x: ["-100%", "250%"] }}
          transition={{
            duration: 1.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </main>
  );
}
