"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ProgressBarAnimated() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            setProgress(0);
          }, 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isLoading]);

  const startLoading = () => {
    setIsLoading(true);
    setProgress(0);
  };

  return (
    <main className="w-full max-w-xl space-y-5">
      <section className="w-full">
        <div className="flex justify-between items-center text-xl">
          <span className="font-semibold">Download Progress</span>
          <motion.span
            animate={{ scale: progress > 50 ? 0.02 * Math.round(progress) : 1 }}
            className={`italic ${
              progress === 0
                ? "text-foreground/30"
                : progress > 90
                  ? "text-lime-500"
                  : progress > 75
                    ? "text-green-500"
                    : progress > 50
                      ? "text-emerald-500"
                      : progress > 25
                        ? "text-teal-500"
                        : ""
            }`}
          >
            {Math.round(progress)}%
          </motion.span>
        </div>

        <div className="relative my-5">
          <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
            <motion.div
              className="bg-linear-to-r from-yellow-400 to-primary rounded-full h-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <motion.div
            className="absolute -top-1/2 left-0 -ml-3 size-4 bg-background border-2 border-primary rounded-full shadow-lg"
            style={{ left: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between text-xs italic opacity-50">
          <span>Start</span>
          <span>Halfway</span>
          <span>Complete</span>
        </div>
      </section>

      <Button
        variant="outline"
        onClick={startLoading}
        disabled={isLoading}
        className="p-5 bg-accent cursor-pointer border-2 text-sm font-medium rounded-full w-40"
      >
        {isLoading ? "Downloading..." : "Start Download"}
      </Button>
    </main>
  );
}
