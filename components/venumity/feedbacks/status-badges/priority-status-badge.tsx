"use client";
import { motion } from "framer-motion";
import {
  SeparatorHorizontal,
  TrendingDown,
  Flag,
  TrendingUp,
  CheckCircle,
  Info,
  Eye,
  Ban,
  ShieldAlert,
} from "lucide-react";

// Priority Status Badge
function PriorityBadge({
  priority = "medium",
  index = 0,
}: {
  priority?:
    | "low"
    | "medium"
    | "high"
    | "critical"
    | "blocked"
    | "urgent"
    | "review"
    | "info"
    | "resolved";
  index?: number;
}) {
  const priorityConfig = {
    low: { color: "bg-orange-500", text: "Low", icon: TrendingDown },
    medium: {
      color: "bg-yellow-400",
      text: "Medium",
      icon: SeparatorHorizontal,
    },
    high: { color: "bg-green-500", text: "High", icon: TrendingUp },
    critical: { color: "bg-red-500", text: "Critical", icon: Flag },
    blocked: { color: "bg-zinc-500", text: "Blocked", icon: Ban },
    urgent: { color: "bg-purple-500", text: "Urgent", icon: ShieldAlert },
    review: { color: "bg-cyan-500", text: "Review", icon: Eye },
    info: { color: "bg-blue-500", text: "Info", icon: Info },
    resolved: { color: "bg-pink-500", text: "Resolved", icon: CheckCircle },
  };

  const config = priorityConfig[priority];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.12 }}
      className="flex items-center gap-3 bg-muted rounded-sm shadow-lg/5 px-3 py-2 border"
    >
      <div className="flex items-center gap-2">
        <Icon className="size-4" />
        <span className="font-medium text-sm leading-none">{config.text}</span>
      </div>
      <div className={`size-3 ${config.color} rounded-full`} />
    </motion.div>
  );
}

export default function PriorityStatusBadge() {
  return (
    <main className="flex flex-wrap items-center justify-center m-auto gap-4 p-6 sm:p-10 max-w-4xl overflow-auto w-full">
      {(
        [
          "low",
          "medium",
          "high",
          "critical",
          "blocked",
          "urgent",
          "review",
          "info",
          "resolved",
        ] as const
      ).map((priority, index) => (
        <PriorityBadge key={priority} priority={priority} index={index} />
      ))}
    </main>
  );
}
