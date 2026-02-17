"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  Info,
  AlertTriangle,
  XCircle,
  Loader2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type SnackbarType = "success" | "info" | "loading";

interface Snackbar {
  id: string;
  type: SnackbarType;
  message: string;
  duration: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const snackbarTypes: {
  type: SnackbarType;
  bg: string;
  actionLabel?: string;
}[] = [
  {
    type: "success",
    bg: "bg-linear-to-tl from-green-500 to-green-400",
    actionLabel: "Undo",
  },
  {
    type: "info",
    bg: "bg-linear-to-tl from-blue-500 to-blue-400",
    actionLabel: "View",
  },
  {
    type: "loading",
    bg: "bg-linear-to-tl from-zinc-500 to-zinc-400",
  },
];

const icons = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
  error: XCircle,
  loading: Loader2,
};

const defaultDuration = 4000;

export default function Snackbar1() {
  const [snackbar, setSnackbar] = useState<Snackbar | null>(null);

  const showSnackbar = useCallback((type: SnackbarType, message: string) => {
    const id = Date.now().toString();
    const config = snackbarTypes.find((s) => s.type === type);
    const action = config?.actionLabel
      ? {
          label: config.actionLabel,
          onClick: () => {
            alert(`${config.actionLabel} action clicked`);
            setSnackbar(null);
          },
        }
      : undefined;

    setSnackbar({ id, type, message, duration: defaultDuration, action });
  }, []);

  const hideSnackbar = useCallback(() => setSnackbar(null), []);

  return (
    <main className="grid grid-cols-1 items-center justify-center m-auto gap-4 py-7 md:py-14 w-full h-full">
      <section className="flex flex-wrap items-center justify-center m-auto gap-3 p-6 md:p-10 max-w-3xl">
        {/* Buttons to Trigger */}
        {snackbarTypes.map(({ type, bg }) => (
          <Button
            key={type}
            onClick={() => showSnackbar(type, `This is a ${type} message.`)}
            className={`p-6 cursor-pointer text-white bg-linear-to-tl ${bg} hover:scale-105 transition-all duration-500`}
            type="button"
          >
            Show {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        ))}
      </section>

      {/* Snackbar Container */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <AnimatePresence>
          {snackbar && (
            <motion.div
              key={snackbar.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="bg-zinc-700 text-white p-3 rounded-sm shadow-md hover:shadow-lg flex items-center gap-3 max-w-md"
            >
              <div className="shrink-0">
                {React.createElement(icons[snackbar.type], {
                  className:
                    snackbar.type === "loading"
                      ? "animate-spin h-5 w-5"
                      : "h-5 w-5",
                })}
              </div>
              <div className="flex-1 text-sm flex items-center gap-3">
                <span>{snackbar.message}</span>
                {snackbar.action && (
                  <button
                    onClick={snackbar.action.onClick}
                    className="underline text-blue-400 hover:text-blue-500 cursor-pointer focus:outline-none"
                    type="button"
                  >
                    {snackbar.action.label}
                  </button>
                )}
              </div>
              <button
                onClick={hideSnackbar}
                className="text-muted-foreground hover:text-white cursor-pointer focus:outline-none"
              >
                <X className="size-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
