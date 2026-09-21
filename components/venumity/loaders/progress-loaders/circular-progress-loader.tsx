"use client";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, X } from "lucide-react";

interface CircularProgressLoaderProps {
  progress?: number;
  size?: "sm" | "md" | "lg";
  showPercentage?: boolean;
  status?: "loading" | "success" | "error";
  label?: string;
}

export function CircularProgressLoader({
  progress = 0,
  size = "md",
  showPercentage = true,
  status = "loading",
  label,
}: CircularProgressLoaderProps) {
  const sizes = {
    sm: { container: "w-16 h-16", stroke: 4, text: "text-sm", icon: 20 },
    md: { container: "w-24 h-24", stroke: 6, text: "text-lg", icon: 30 },
    lg: { container: "w-32 h-32", stroke: 8, text: "text-xl", icon: 40 },
  };

  const radius = size === "sm" ? 30 : size === "md" ? 42 : 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`relative ${sizes[size].container}`}>
        {/* Background circle */}
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={sizes[size].stroke}
            className="text-muted/20"
          />

          {/* Progress circle */}
          <motion.circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={sizes[size].stroke}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            style={{
              strokeDasharray: circumference,
              stroke:
                status === "success"
                  ? "var(--color-green-500)"
                  : status === "error"
                    ? "var(--color-red-500)"
                    : "var(--color-blue-500)",
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          {status === "loading" && (
            <>
              {showPercentage ? (
                <span className={`font-bold ${sizes[size].text}`}>
                  {Math.round(progress)}%
                </span>
              ) : (
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              )}
            </>
          )}
          {status === "success" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <CheckCircle2
                className={`text-green-500`}
                size={sizes[size].icon}
              />
            </motion.div>
          )}
          {status === "error" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <X className={`text-red-500`} size={sizes[size].icon} />
            </motion.div>
          )}
        </div>
      </div>

      {label && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`${sizes[size].text === "text-sm" ? "text-xs" : "text-base"} ${status === "error" ? "text-red-500" : status === "success" ? "text-green-500" : "text-foreground"}`}
        >
          {label}
        </motion.p>
      )}
    </div>
  );
}

export default function CircularProgressLoaderDemo() {
  return (
    <div className="flex items-center justify-center m-auto gap-6 w-full h-full">
      <CircularProgressLoader progress={65} size="sm" label="Small" />
      <CircularProgressLoader progress={75} size="md" label="Medium" />
      <CircularProgressLoader progress={90} size="lg" label="Large" />
      <CircularProgressLoader progress={100} status="success" label="Success" />
      <CircularProgressLoader progress={45} status="error" label="Error" />
    </div>
  );
}
