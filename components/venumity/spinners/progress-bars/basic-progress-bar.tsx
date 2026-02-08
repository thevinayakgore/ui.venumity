"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProgressBarBasic() {
  const [progress, setProgress] = useState(0);

  const handleStart = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            setProgress(0);
          }, 2000);

          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <main className="w-full max-w-xl space-y-6">
      <section className="space-y-5">
        <div className="flex justify-between text-xl font-medium">
          <span>Upload Progress</span>
          <span className="text-sm text-primary italic">{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-foreground/10 rounded-full overflow-hidden">
          <motion.div
            className="bg-linear-to-r from-yellow-400 via-amber-500 to-primary rounded-full h-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </section>

      <Button
        variant="outline"
        onClick={handleStart}
        className="p-5 bg-accent border-2 font-semibold cursor-pointer rounded-full w-40"
      >
        Start Upload
      </Button>
    </main>
  );
}
