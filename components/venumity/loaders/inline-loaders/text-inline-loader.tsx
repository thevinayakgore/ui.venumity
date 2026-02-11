"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TextInlineLoader() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-xl m-auto space-y-1 text-sm text-foreground">
      <p>
        <span className="text-lg font-medium">
          Venu<span className="text-primary">mity</span>
        </span>{" "}
        is a modern UI system built to deliver fast, elegant, and
        production-ready, fully responsive components. This reduces development
        time and inspires to build faster with the reading materials to upskill
        and grow in web dev field and also
        <motion.span
          className="text-lg leading-none text-primary font-bold ml-0.5"
          animate={{ opacity: [0.5, 0.8, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {dots}
        </motion.span>
      </p>
    </div>
  );
}
