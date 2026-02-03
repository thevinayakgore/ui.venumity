"use client";
import { motion } from "framer-motion";

// ProgressBadge Status Badge
function ProgressBadge({
  progress = 50,
  index = 0,
}: {
  progress?: number;
  index?: number;
}) {
  const getColor = (progress: number) => {
    if (progress >= 75) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    if (progress >= 25) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.12 }}
      className="bg-muted rounded-sm p-4 border min-w-sm"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-sm leading-none">Progress</span>
        <span className="text-sm">{progress}%</span>
      </div>
      <div className="w-full bg-muted-foreground rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-2 rounded-full ${getColor(progress)}`}
        />
      </div>
    </motion.div>
  );
}

export default function ProgressStatusBadge() {
  return (
    <main className="flex flex-col items-center justify-center m-auto gap-4 p-6 sm:p-10 max-w-4xl overflow-auto w-full">
      {[10, 50, 75, 100].map((progress, index) => (
        <ProgressBadge key={progress} progress={progress} index={index} />
      ))}
    </main>
  );
}
