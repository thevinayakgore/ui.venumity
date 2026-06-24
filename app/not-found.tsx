"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const IMAGES = [
  "/404.png",
  "/404-1.png",
  "/404-2.png",
  "/404-3.png",
  "/404-4.png",
];

export default function NotFound() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, 5000); // change every 5s

    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center m-auto p-5 md:p-10 max-w-400 w-full h-full">
      <div className="relative border rounded-3xl overflow-hidden w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={IMAGES[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.7 }}
            transition={{
              duration: 1.2, // slow fade
              ease: [0.22, 0.61, 0.36, 1], // smooth easing
            }}
            className="w-full"
          >
            <Image
              src={IMAGES[index]}
              alt="Not Found"
              width={5000}
              height={5000}
              priority
              loading="eager"
              className="aspect-9/4 object-cover w-full"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
