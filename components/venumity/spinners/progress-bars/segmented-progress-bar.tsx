"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProgressBarSegmented() {
  const [progress, setProgress] = useState(0);
  const segments = 10;
  const segmentWidth = 100 / segments;

  const handleProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const nextSegment = Math.ceil((prev + 5) / segmentWidth) * segmentWidth;
        return Math.min(nextSegment, 100);
      });
    }, 300);
  };

  return (
    <div className="w-full max-w-xl space-y-5">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">Installation Progress</span>
          <span className="text-sm uppercase">
            Step {Math.floor(progress / segmentWidth) + 1} / {segments}
          </span>
        </div>

        <div className="flex gap-1">
          {Array.from({ length: segments }).map((_, index) => {
            const segmentStart = index * segmentWidth;
            const segmentEnd = (index + 1) * segmentWidth;
            const isActive = progress >= segmentEnd;
            const isCurrent = progress >= segmentStart && progress < segmentEnd;
            const segmentColor =
              index < 2
                ? "bg-green-500"
                : index < 4
                  ? "bg-lime-500"
                  : index < 6
                    ? "bg-yellow-400"
                    : index < 8
                      ? "bg-amber-500"
                      : "bg-primary";

            return (
              <div key={index} className="flex-1">
                <div className="h-2 bg-foreground/10 rounded-full overflow-hidden mb-1">
                  {isActive && <div className={`h-full ${segmentColor}`} />}
                  {isCurrent && (
                    <motion.div
                      className={`h-full ${segmentColor}`}
                      initial={{ width: "0%" }}
                      animate={{
                        width: `${((progress - segmentStart) / segmentWidth) * 100}%`,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
                <div className="text-center mt-2">
                  <span className="text-xs font-medium opacity-40">
                    {index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Button
        variant="outline"
        onClick={handleProgress}
        className="p-5 cursor-pointer border-2 hover:border-white! bg-accent hover:bg-primary! hover:text-white shadow-none hover:shadow-lg shadow-primary/30 transition-all duration-500 rounded-full w-40"
      >
        Install Now
      </Button>
    </div>
  );
}
