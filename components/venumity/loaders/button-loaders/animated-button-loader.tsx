"use client";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, X, CheckCircle } from "lucide-react";
import { useState } from "react";

type LoaderState = "idle" | "loading" | "success" | "waiting" | "error";

function AnimatedButton({
  label,
  finalState,
}: {
  label: string;
  finalState: Exclude<LoaderState, "idle" | "loading">;
}) {
  const [state, setState] = useState<LoaderState>("idle");

  const handleClick = () => {
    setState("loading");
    setTimeout(() => {
      setState(finalState);
      setTimeout(() => setState("idle"), 1500);
    }, 1500);
  };

  return (
    <Button
      variant="secondary"
      onClick={handleClick}
      disabled={state !== "idle"}
      className="relative cursor-pointer p-6 border-2 min-w-50 disabled:opacity-80"
    >
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center"
          >
            {label}
          </motion.span>
        )}

        {state === "loading" && (
          <motion.span
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-3"
          >
            <Loader2 className="size-5 animate-spin" />
            Processing...
          </motion.span>
        )}

        {state === "success" && (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-3 text-green-500"
          >
            <CheckCircle className="size-5" />
            Success !
          </motion.span>
        )}

        {state === "waiting" && (
          <motion.span
            key="waiting"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-3 text-yellow-500"
          >
            <Loader2 className="size-5 animate-spin" />
            Wait a minute...
          </motion.span>
        )}

        {state === "error" && (
          <motion.span
            key="error"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-3 text-red-500"
          >
            <X className="size-5" />
            Failed !
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}

export default function ButtonLoaderAnimated() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-4"
    >
      <AnimatedButton label="Success Action" finalState="success" />
      <AnimatedButton label="Waiting Action" finalState="waiting" />
      <AnimatedButton label="Error Action" finalState="error" />
    </motion.div>
  );
}
