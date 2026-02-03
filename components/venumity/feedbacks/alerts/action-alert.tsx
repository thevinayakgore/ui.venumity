"use client";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  ListFilterPlus,
  CircleX,
} from "lucide-react";

// Action Alert
function ActionAlert({
  type = "success",
}: {
  type?: "success" | "warning" | "error" | "info" | "list";
}) {
  const typeConfig = {
    success: {
      bg: "bg-green-500/20",
      border: "border-green-500/50",
      text: "text-green-500",
      button: "bg-green-500 hover:bg-green-600",
      icon: CheckCircle,
    },
    warning: {
      bg: "bg-yellow-400/20",
      border: "border-yellow-400/60",
      text: "text-yellow-500",
      button: "bg-yellow-400 hover:bg-yellow-500",
      icon: AlertTriangle,
    },
    error: {
      bg: "bg-red-500/20",
      border: "border-red-500/50",
      text: "text-red-500",
      button: "bg-red-500 hover:bg-red-600",
      icon: CircleX,
    },
    info: {
      bg: "bg-blue-500/20",
      border: "border-blue-500/50",
      text: "text-blue-500",
      button: "bg-blue-500 hover:bg-blue-600",
      icon: Info,
    },
    list: {
      bg: "bg-muted/30",
      border: "border-border",
      text: "text-foreground",
      button: "bg-purple-500 hover:bg-purple-600",
      icon: ListFilterPlus,
    },
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`p-4 rounded-md border ${config.bg} ${config.border} backdrop-blur-sm w-full`}
    >
      <div
        className={`flex flex-wrap gap-3 ${
          type === "list" ? "items-start" : "items-center"
        } justify-between w-full`}
      >
        <div className={`flex items-start gap-3 ${config.text}`}>
          <Icon className="size-5 " />
          <div className="">
            <p className="text-base md:text-lg font-semibold leading-none">
              Action Required
            </p>
            {type !== "list" ? (
              <p className="text-sm text-foreground opacity-80 mt-1">
                Please confirm this action
              </p>
            ) : (
              <ul className="text-sm text-muted-foreground mt-2 list-disc pl-3 space-y-1">
                <li>First required step.</li>
                <li>Second confirmation needed.</li>
                <li>Check assumptions carefully.</li>
                <li>Proceed only when sure.</li>
              </ul>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className={`cursor-pointer px-6 py-2 rounded-sm ${config.button} text-white font-medium text-sm hover:scale-105 transition-all duration-500`}
          >
            Confirm
          </button>
          <button className="cursor-pointer px-6 py-2 rounded-sm border bg-white text-black font-medium text-sm hover:scale-105 transition-all duration-500">
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function actionAlert() {
  return (
    <>
      {/* Action Alert */}
      <motion.main
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col m-auto gap-4 p-6 sm:p-10 overflow-auto max-w-4xl w-full h-full"
      >
        {["success", "warning", "error", "info", "list"].map((alert, index) => (
          <motion.div
            key={alert}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
            className="w-full"
          >
            <ActionAlert
              type={alert as "success" | "warning" | "error" | "info" | "list"}
            />
          </motion.div>
        ))}
      </motion.main>
    </>
  );
}
