"use client";
import { CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function BasicStatusBadge() {
  const statuses = [
    {
      label: "Online",
      color: "bg-green-500",
      icon: <CheckCircle className="w-4 h-4" />,
      showIcon: true,
      showLabel: true,
    },
    {
      label: "Busy",
      color: "bg-red-500",
      icon: <XCircle className="w-4 h-4" />,
      showIcon: true,
      showLabel: true,
    },
    {
      label: "Offline",
      color: "bg-gray-400",
      showIcon: false,
      showDot: true,
      showLabel: true,
    },
    {
      label: "Away",
      color: "bg-yellow-400",
      showIcon: false,
      showDot: true,
      showLabel: true,
    },
    {
      label: "Idle",
      color: "bg-blue-400",
      showIcon: false,
      showDot: true,
      showLabel: true,
    },
    {
      label: "New Feature",
      color: "bg-purple-500",
      showIcon: false,
      showDot: false,
      showLabel: true,
    },
    {
      label: "Beta",
      color: "bg-pink-500",
      showIcon: false,
      showDot: false,
      showLabel: true,
    },
    {
      label: "Messages",
      count: 5,
      color: "bg-indigo-500",
      showIcon: false,
      showDot: false,
      showLabel: false,
    },
    {
      label: "Alerts",
      count: 12,
      color: "bg-red-600",
      showIcon: false,
      showDot: false,
      showLabel: false,
    },
    {
      label: "Verified",
      color: "bg-teal-500",
      icon: <CheckCircle className="w-4 h-4" />,
      showIcon: true,
      showLabel: true,
    },
    {
      label: "Pending",
      color: "bg-yellow-400",
      showIcon: false,
      showDot: true,
      showLabel: true,
    },
    {
      label: "Updates",
      count: 3,
      color: "bg-blue-500",
      showIcon: false,
      showDot: false,
      showLabel: false,
    },
    {
      label: "Dot Only",
      color: "bg-pink-400",
      showDot: true,
      showIcon: false,
      showLabel: false,
    },
    {
      label: "Icon Only",
      color: "bg-green-600",
      icon: <CheckCircle className="w-4 h-4" />,
      showIcon: true,
      showLabel: false,
    },
    {
      label: "Number Only",
      count: 7,
      color: "bg-indigo-600",
      showIcon: false,
      showDot: false,
      showLabel: false,
    },
  ];

  return (
    <main className="flex flex-wrap items-center justify-center m-auto gap-4 p-6 sm:p-10 max-w-4xl overflow-auto w-full">
      {statuses.map(
        (
          { label, color, icon, showIcon, showDot, count, showLabel },
          index,
        ) => (
          <div key={label} className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: index * 0.12 }}
              className={`flex items-center space-x-2 ${
                showLabel ? "px-2 pr-3 py-1 bg-muted border shadow-lg/5" : ""
              } rounded-full`}
            >
              {showDot && !showLabel && !showIcon && !count && (
                <span className={`size-3 rounded-full ${color}`} />
              )}
              {showIcon && !showLabel && !count && <span>{icon}</span>}
              {count !== undefined && !showLabel && (
                <span
                  className={`inline-flex items-center justify-center size-5 text-xs font-medium leading-none text-white rounded-full ${color}`}
                >
                  {count}
                </span>
              )}
              {(showDot || showIcon) && showLabel && (
                <>
                  {showIcon && <span>{icon}</span>}
                  {showDot && (
                    <span className={`size-3 rounded-full ${color}`} />
                  )}
                  <span className="text-sm">{label}</span>
                </>
              )}
              {!showIcon && !showDot && !count && showLabel && (
                <span className="text-sm px-1">{label}</span>
              )}
            </motion.div>
          </div>
        ),
      )}
    </main>
  );
}
