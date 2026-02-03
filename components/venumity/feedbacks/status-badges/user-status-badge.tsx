"use client";
import { motion } from "framer-motion";

// User Status Badge
function UserBadge({
  status = "online",
  index = 0,
}: {
  status?: "online" | "away" | "busy" | "offline";
  index?: number;
}) {
  const statusConfig = {
    online: { color: "bg-green-400", pulse: "bg-green-400", text: "Online" },
    away: { color: "bg-yellow-400", pulse: "bg-yellow-400", text: "Away" },
    busy: { color: "bg-red-400", pulse: "bg-red-400", text: "Busy" },
    offline: { color: "bg-gray-400", pulse: "bg-gray-400", text: "Offline" },
  };

  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.12 }}
      className="flex items-center gap-3 bg-muted shadow-lg/5 rounded-full p-2 pr-3 border"
    >
      <div className="relative">
        <div className={`size-3 ${config.color} rounded-full`} />
        {status !== "offline" && (
          <motion.div
            className={`absolute inset-0 ${config.pulse} rounded-full opacity-60`}
            animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
      <span className="font-medium text-sm leading-none">{config.text}</span>
    </motion.div>
  );
}

export default function UserStatusBadge() {
  const statuses: Array<"online" | "away" | "busy" | "offline"> = [
    "online",
    "away",
    "busy",
    "offline",
  ];

  return (
    <main className="flex flex-wrap items-center justify-center m-auto gap-4 p-6 sm:p-10 max-w-4xl overflow-auto w-full">
      {statuses.map((status, index) => (
        <UserBadge key={status} status={status} index={index} />
      ))}
    </main>
  );
}
