"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  ListFilterPlus,
  CircleX,
} from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

// Action Alert
function ActionAlert({
  type = "success",
}: {
  type?: "success" | "warning" | "error" | "info" | "list";
}) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  const typeConfig = {
    success: {
      icon: CheckCircle,
      className: "border-green-500/40 bg-green-500/5 text-green-500",
      action: "bg-green-600 hover:bg-green-700",
    },
    warning: {
      icon: AlertTriangle,
      className: "border-yellow-500/40 bg-yellow-500/5 text-yellow-500",
      action: "bg-yellow-600 hover:bg-yellow-700",
    },
    error: {
      icon: CircleX,
      className: "border-red-500/40 bg-red-500/5 text-red-500",
      action: "bg-red-600 hover:bg-red-700",
    },
    info: {
      icon: Info,
      className: "border-blue-500/40 bg-blue-500/5 text-blue-500",
      action: "bg-blue-600 hover:bg-blue-700",
    },
    list: {
      icon: ListFilterPlus,
      className: "border-muted-foreground/30 bg-muted/40 text-foreground",
      action: "bg-primary hover:bg-primary/90",
    },
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  const handleCancel = () => {
    setVisible(false);
  };

  const handleConfirm = () => {
    // future side-effects can go here
    setVisible(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full"
    >
      <Alert
        className={`${config.className} relative flex flex-wrap items-center justify-between gap-4 backdrop-blur-sm`}
      >
        <div className="flex items-start gap-3">
          <Icon className="size-4 mt-0.5" />
          <div>
            <AlertTitle className="text-sm md:text-base font-medium">
              Action Required
            </AlertTitle>

            {type !== "list" ? (
              <AlertDescription className="text-foreground/80">
                Please confirm this action.
              </AlertDescription>
            ) : (
              <AlertDescription>
                <ul className="mt-2 list-disc pl-4 space-y-1 text-sm opacity-80">
                  <li>First required step.</li>
                  <li>Second confirmation needed.</li>
                  <li>Check assumptions carefully.</li>
                  <li>Proceed only when sure.</li>
                </ul>
              </AlertDescription>
            )}
          </div>
        </div>

        {type !== "list" ? (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={handleConfirm}
              className={`${config.action} text-white rounded-sm`}
            >
              Confirm
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              className="bg-background! rounded-sm"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className="absolute top-5 right-4 flex items-center gap-2">
            <Button
              size="sm"
              onClick={handleConfirm}
              className={`${config.action} text-white rounded-sm`}
            >
              Confirm
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              className="bg-background! rounded-sm"
            >
              Cancel
            </Button>
          </div>
        )}
      </Alert>
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
