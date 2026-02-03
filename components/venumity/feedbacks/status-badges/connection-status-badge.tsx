"use client";
import { motion } from "framer-motion";
import { Wifi } from "lucide-react";

// Connection Status Badge
function ConnectionBadge({
  strength = "good",
  index = 0,
}: {
  strength?: "excellent" | "good" | "fair" | "poor";
  index?: number;
}) {
  const strengthConfig = {
    excellent: { bars: 4, color: "bg-green-500", text: "Excellent" },
    good: { bars: 3, color: "bg-blue-500", text: "Good" },
    fair: { bars: 2, color: "bg-yellow-400", text: "Fair" },
    poor: { bars: 1, color: "bg-red-500", text: "Poor" },
  };

  const config = strengthConfig[strength];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.12 }}
      className="bg-muted/60 backdrop-blur-lg rounded-sm p-4 border max-w-max"
    >
      <div className="flex items-center justify-center m-auto gap-2 mb-5">
        <Wifi className="size-5" />
        <span className="font-medium text-sm md:text-base leading-none">
          {config.text}
        </span>
      </div>
      <div className="flex items-end justify-center m-auto gap-1.5 h-10 w-32">
        {[1, 2, 3, 4].map((bar) => (
          <motion.div
            key={bar}
            initial={{ height: 0 }}
            animate={{ height: bar <= config.bars ? `${bar * 10}px` : "6px" }}
            transition={{ duration: 0.5, delay: bar * 0.1 }}
            className={`w-2 rounded-full ${
              bar <= config.bars ? config.color : "bg-muted-foreground/50"
            } ${config.bars === 1 && bar === 1 && "animate-pulse"}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function ConnectionStatusBadge() {
  return (
    <main className="flex flex-wrap items-center justify-center m-auto gap-4 p-6 sm:p-10 max-w-4xl overflow-auto w-full">
      {(["excellent", "good", "fair", "poor"] as const).map(
        (strength, index) => (
          <ConnectionBadge key={strength} strength={strength} index={index} />
        ),
      )}
    </main>
  );
}
