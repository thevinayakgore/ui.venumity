"use client";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Zap, Download, Upload } from "lucide-react";

interface LinearProgressLoaderProps {
  progress?: number;
  variant?: "default" | "striped" | "animated" | "gradient";
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  status?: "loading" | "success" | "error" | "warning";
  label?: string;
  sublabel?: string;
  icon?: React.ReactNode;
}

export function LinearProgressLoader({
  progress = 0,
  variant = "default",
  size = "md",
  showValue = true,
  status = "loading",
  label,
  sublabel,
  icon,
}: LinearProgressLoaderProps) {
  const sizes = {
    sm: { bar: "h-2", text: "text-xs", icon: 16 },
    md: { bar: "h-3", text: "text-sm", icon: 18 },
    lg: { bar: "h-4", text: "text-base", icon: 20 },
  };

  const statusColors = {
    loading: "bg-primary",
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
  };

  const statusIcons = {
    loading: <Zap className="size-4 animate-pulse" />,
    success: <CheckCircle2 className="size-4" />,
    error: <AlertCircle className="size-4" />,
    warning: <AlertCircle className="size-4 text-yellow-500" />,
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "striped":
        return "bg-gradient-to-r from-primary/80 via-primary to-primary/80 bg-[length:200%_100%]";
      case "animated":
        return "bg-gradient-to-r from-primary via-primary/80 to-primary bg-[length:200%_100%] vnm-shimmer-btn";
      case "gradient":
        return "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500";
      default:
        return statusColors[status];
    }
  };

  return (
    <div className="space-y-3 w-full">
      {/* Label section */}
      {(label || sublabel) && (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {icon && <span className="text-muted-foreground">{icon}</span>}
            {label && (
              <span className={`font-medium ${sizes[size].text}`}>{label}</span>
            )}
          </div>
          {showValue && status === "loading" && (
            <motion.span
              key={progress}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`font-mono font-bold ${sizes[size].text} ${
                status === "loading" ? "text-foreground" : "text-green-600"
              }`}
            >
              {Math.round(progress)}%
            </motion.span>
          )}
          {status !== "loading" && (
            <div className={`flex items-center gap-1 ${sizes[size].text}`}>
              {statusIcons[status]}
              <span className="capitalize">{status}</span>
            </div>
          )}
        </div>
      )}

      {/* Progress bar container */}
      <div
        className={`w-full ${sizes[size].bar} bg-muted rounded-full overflow-hidden`}
      >
        <motion.div
          className={`h-full rounded-full ${getVariantStyles()} ${
            variant === "striped"
              ? "bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-size-[1rem_1rem]"
              : ""
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 20,
            mass: 1,
          }}
        />
      </div>

      {/* Sublabel */}
      {sublabel && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-muted-foreground ${sizes[size].text === "text-xs" ? "text-[10px]" : "text-xs"}`}
        >
          {sublabel}
        </motion.p>
      )}

      {/* Indeterminate state */}
      {progress === null && (
        <div className="relative w-full h-2 bg-muted overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-primary/20" />
          <motion.div
            className="absolute h-full bg-primary"
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
            style={{ width: "50%" }}
          />
        </div>
      )}
    </div>
  );
}

export default function CircularProgressLoaderDemo() {
  return (
    <main className="flex flex-col items-center justify-center m-auto gap-6 p-6 md:p-10 max-w-3xl w-full h-full">
      <LinearProgressLoader
        progress={45}
        size="sm"
        label="Default"
        sublabel="Uploading files..."
      />
      <LinearProgressLoader
        progress={60}
        variant="striped"
        size="md"
        label="Striped"
        icon={<Upload className="size-4" />}
      />
      <LinearProgressLoader
        progress={80}
        variant="animated"
        size="md"
        label="Animated"
      />
      <LinearProgressLoader
        progress={95}
        variant="gradient"
        size="lg"
        label="Gradient"
        showValue={true}
      />
      <LinearProgressLoader
        progress={100}
        status="success"
        label="Complete"
        sublabel="Upload finished successfully"
      />
      <LinearProgressLoader
        progress={32}
        status="loading"
        label="Downloading"
        icon={<Download className="size-4" />}
      />
      <LinearProgressLoader
        progress={0}
        label="Processing..."
        sublabel="Please wait while we process your request"
      />
    </main>
  );
}
