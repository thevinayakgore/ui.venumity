"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { AlertTriangle, Info, CheckCircle, X, CircleX } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

function BannerAlert({
  variant = "info",
}: {
  variant?: "info" | "success" | "warning" | "error" | "list";
}) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const variantConfig = {
    info: {
      icon: Info,
      className: "border-blue-500/40 bg-blue-500/5 text-blue-500",
      title: "Information",
    },
    success: {
      icon: CheckCircle,
      className: "border-green-500/40 bg-green-500/5 text-green-500",
      title: "Success",
    },
    warning: {
      icon: AlertTriangle,
      className: "border-amber-500/40 bg-amber-500/5 text-amber-500",
      title: "Warning",
    },
    error: {
      icon: CircleX,
      className: "border-red-500/40 bg-red-500/5 text-red-500",
      title: "Error",
    },
    list: {
      icon: Info,
      className: "border-muted-foreground/30 bg-muted/40 text-foreground",
      title: "Important Notes",
    },
  };

  const config = variantConfig[variant];
  const Icon = config.icon;

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Alert
        className={`${config.className} relative flex items-center justify-between gap-4 rounded-none`}
      >
        <div className="flex items-start gap-3">
          <Icon className="size-4 mt-0.5" />
          <div>
            <AlertTitle className="font-medium tracking-wide">
              {config.title}
            </AlertTitle>
            {variant !== "list" ? (
              <AlertDescription className="text-sm opacity-80">
                This is a {variant} banner alert meant to grab attention.
              </AlertDescription>
            ) : (
              <AlertDescription>
                <ul className="mt-1 list-disc pl-4 space-y-1 text-sm opacity-80">
                  <li>First important message</li>
                  <li>Another key update</li>
                  <li>Please review carefully</li>
                </ul>
              </AlertDescription>
            )}
          </div>
        </div>

        {variant !== "list" ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="hover:bg-background/20"
          >
            <X className="size-4" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="absolute top-3 right-4 hover:bg-background/20"
          >
            <X className="size-4" />
          </Button>
        )}
      </Alert>
    </motion.div>
  );
}

export default function bannerAlert1() {
  return (
    <>
      {/* Banner Alert 1 */}
      <motion.main
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col m-auto gap-4 p-6 sm:p-10 overflow-auto max-w-4xl w-full"
      >
        {["info", "success", "warning", "error", "list"].map((v, i) => (
          <motion.div
            key={v}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            className="w-full"
          >
            <BannerAlert
              variant={v as "info" | "success" | "warning" | "error" | "list"}
            />
          </motion.div>
        ))}
      </motion.main>
    </>
  );
}
