"use client";
import { motion } from "framer-motion";
import {
  Radio,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { Loader, HelpCircle, AlertOctagon } from "lucide-react";

// System Status Badge
function SystemBadge({
  status = "online",
  index = 0,
}: {
  status?:
    | "online"
    | "offline"
    | "maintenance"
    | "degraded"
    | "loading"
    | "unknown"
    | "success"
    | "error";
  index?: number;
}) {
  const statusConfig = {
    online: {
      bg: "bg-green-500",
      text: "Online",
      textColor: "text-green-500",
      icon: Radio,
    },
    offline: {
      bg: "bg-zinc-500",
      text: "Offline",
      textColor: "text-zinc-500",
      icon: XCircle,
    },
    maintenance: {
      bg: "bg-yellow-500",
      text: "Maintenance",
      textColor: "text-yellow-500",
      icon: AlertTriangle,
    },
    degraded: {
      bg: "bg-orange-500",
      text: "Degraded",
      textColor: "text-orange-500",
      icon: Clock,
    },
    loading: {
      bg: "bg-blue-500",
      text: "Loading",
      textColor: "text-blue-500",
      icon: Loader,
    },
    unknown: {
      bg: "bg-slate-500",
      text: "Unknown",
      textColor: "text-slate-500",
      icon: HelpCircle,
    },
    success: {
      bg: "bg-pink-500",
      text: "Success",
      textColor: "text-pink-500",
      icon: CheckCircle,
    },
    error: {
      bg: "bg-rose-500",
      text: "Error",
      textColor: "text-rose-500",
      icon: AlertOctagon,
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.12 }}
      className={`flex items-center justify-center gap-2 text-sm font-medium text-white p-1 rounded-full shadow-lg/5 ${config.bg} hover:scale-105 transition-all duration-500`}
    >
      <Icon
        className={`size-6 p-1 bg-white ${config.textColor} rounded-full ${
          status === "loading" ? "animate-spin" : ""
        }`}
      />
      <span className="pr-3.5 leading-none">{config.text}</span>
    </motion.div>
  );
}

export default function SystemStatusBadge() {
  return (
    <main className="flex flex-wrap items-center justify-center m-auto gap-4 p-6 sm:p-10 max-w-4xl overflow-auto w-full">
      <SystemBadge status="online" index={0} />
      <SystemBadge status="offline" index={1} />
      <SystemBadge status="maintenance" index={2} />
      <SystemBadge status="degraded" index={3} />
      <SystemBadge status="loading" index={4} />
      <SystemBadge status="unknown" index={5} />
      <SystemBadge status="success" index={6} />
      <SystemBadge status="error" index={7} />
    </main>
  );
}
