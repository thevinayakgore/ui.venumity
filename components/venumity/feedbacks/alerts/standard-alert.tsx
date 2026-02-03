"use client";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, XCircle, List } from "lucide-react";

// Standard Alert
function StandardAlert({
  type = "success",
}: {
  type?: "success" | "warning" | "error" | "list";
}) {
  const alertConfig = {
    success: {
      icon: CheckCircle,
      bg: "bg-green-500/10",
      border: "border-green-500/50",
      text: "text-green-500",
      iconColor: "text-green-500",
    },
    warning: {
      icon: AlertTriangle,
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/50",
      text: "text-yellow-500",
      iconColor: "text-yellow-500",
    },
    error: {
      icon: XCircle,
      bg: "bg-red-500/10",
      border: "border-red-500/50",
      text: "text-red-500",
      iconColor: "text-red-500",
    },
    list: {
      icon: List,
      bg: "bg-muted/30",
      border: "border-muted-foreground/15",
      text: "text-foreground",
      iconColor: "text-foreground",
    },
  };

  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`p-4 rounded-md border ${config.bg} ${config.border} backdrop-blur-sm w-full`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`size-5 ${config.iconColor}`} />
        <div className={config.text}>
          <h1 className="text-base md:text-lg tracking-wider leading-none font-medium capitalize">
            {type} Alert
          </h1>
          {type !== "list" ? (
            <p className="text-sm opacity-80 mt-2">
              This is a {type} message for the user
            </p>
          ) : (
            <ul className="text-sm opacity-50 mt-3 list-disc pl-3 space-y-1">
              <li>This is the first useful point.</li>
              <li>Here is another important message.</li>
              <li>Users should pay attention to this.</li>
              <li>Follow the instructions carefully.</li>
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function standardAlert() {
  const alertTypes = ["success", "warning", "error", "list"] as const;
  return (
    <>
      {/* Variation 1: Standard Alert */}
      <motion.main
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col m-auto gap-4 p-6 sm:p-10 overflow-auto max-w-4xl w-full h-full"
      >
        {alertTypes.map((t, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            className="w-full"
          >
            <StandardAlert type={t} />
          </motion.div>
        ))}
      </motion.main>
    </>
  );
}
