"use client";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, XCircle, List, Info } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

function StandardAlert({
  type = "success",
}: {
  type?: "success" | "warning" | "error" | "info" | "list";
}) {
  const alertConfig = {
    success: {
      icon: CheckCircle,
      className: "border-green-500/30 bg-green-500/5 text-green-500",
      title: "Success",
    },
    warning: {
      icon: AlertTriangle,
      className: "border-yellow-500/30 bg-yellow-500/5 text-yellow-500",
      title: "Warning",
    },
    error: {
      icon: XCircle,
      className: "border-red-500/30 bg-red-500/5 text-red-500",
      title: "Error",
    },
    info: {
      icon: Info,
      className: "border-blue-500/30 bg-blue-500/5 text-blue-500",
      title: "Info",
    },
    list: {
      icon: List,
      className: "border-muted-foreground/20 bg-muted/30 text-foreground",
      title: "Important Notes",
    },
  };

  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full"
    >
      <Alert className={`${config.className} backdrop-blur-sm`}>
        <Icon className="h-4 w-4" />
        <AlertTitle className="tracking-wide font-medium">
          {config.title}
        </AlertTitle>

        {type !== "list" ? (
          <AlertDescription>
            This is a {type} message for the user.
          </AlertDescription>
        ) : (
          <AlertDescription>
            <ul className="mt-2 list-disc space-y-1 opacity-70">
              <li>This is the first useful point.</li>
              <li>Here is another important message.</li>
              <li>Users should pay attention to this.</li>
              <li>Follow the instructions carefully.</li>
            </ul>
          </AlertDescription>
        )}
      </Alert>
    </motion.div>
  );
}

export default function standardAlert() {
  const alertTypes = ["success", "warning", "error", "info", "list"] as const;
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
