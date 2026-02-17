"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

type SnackbarType = "success" | "error";
type SnackbarVariant = "action" | "loading";

// Main Snackbar Component
function Snackbar({
  type,
  variant,
  onClose,
}: {
  type: SnackbarType;
  variant: SnackbarVariant;
  onClose: () => void;
}) {
  const typeConfig = {
    success: {
      icon: CheckCircle,
      bg: "bg-green-500",
      text: "text-green-100",
      accent: "bg-green-400",
    },
    error: {
      icon: XCircle,
      bg: "bg-red-500",
      text: "text-red-100",
      accent: "bg-red-400",
    },
  };

  const config = typeConfig[type as keyof typeof typeConfig];
  const Icon = config.icon;

  const variants = {
    action: (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className={`fixed bottom-20 left-1/2 -translate-x-1/2 ${config.bg} rounded-md p-4 shadow-lg z-50 min-w-md`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <Icon className="size-5 text-white" />
            <div className={config.text}>
              <h1 className="font-medium leading-none">Action Required</h1>
              <p className="text-sm opacity-80 my-1">
                Would you like to proceed ?
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 cursor-pointer bg-white/20 hover:bg-white/30 rounded text-white text-sm font-medium transition-all duration-500"
            >
              Undo
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 cursor-pointer bg-white text-black hover:bg-green-500 hover:text-white rounded text-sm font-medium transition-all duration-500"
            >
              Confirm
            </button>
          </div>
        </div>
      </motion.div>
    ),
    loading: (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-green-500 rounded-md p-3 shadow-lg z-50 min-w-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3 text-white">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="size-5" />
            </motion.div>
            <div>
              <h1 className="font-medium leading-none">Processing...</h1>
              <p className="text-sm opacity-80 my-1">
                Please wait while we complete the action
              </p>
            </div>
          </div>
        </div>
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-1 bg-white rounded-full mt-2 origin-left"
        />
      </motion.div>
    ),
  };

  return variants[variant as keyof typeof variants];
}

export default function Snackbar2() {
  const [snackbars, setSnackbars] = useState<
    Array<{ id: string; type: SnackbarType; variant: SnackbarVariant }>
  >([]);

  const addSnackbar = (type: SnackbarType, variant: SnackbarVariant) => {
    const id = crypto.randomUUID();
    setSnackbars((prev) => [...prev, { id, type, variant }]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
    }, 5000);
  };

  const removeSnackbar = (id: string) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
  };

  const snackbarButtons: Array<{
    label: string;
    type: SnackbarType;
    variant: SnackbarVariant;
    bg: string;
  }> = [
    {
      label: "Error Action",
      type: "error",
      variant: "action",
      bg: "bg-linear-to-tl from-red-500 to-red-400",
    },
    {
      label: "Progress Snackbar",
      type: "success",
      variant: "loading",
      bg: "bg-linear-to-tl from-green-500 to-green-400",
    },
  ];

  return (
    <main className="grid grid-cols-1 items-center justify-center m-auto gap-4 py-7 md:py-14 w-full h-full">
      <section className="flex flex-wrap items-center justify-center m-auto gap-3 p-6 md:p-10 max-w-3xl">
        {snackbarButtons.map((btn) => (
          <Button
            key={btn.label}
            onClick={() => addSnackbar(btn.type, btn.variant)}
            className={`p-6 cursor-pointer ${btn.bg} rounded-sm text-white font-medium hover:scale-105 transition-all duration-500`}
          >
            {btn.label}
          </Button>
        ))}
        <AnimatePresence>
          {snackbars.map((snackbar) => (
            <Snackbar
              key={snackbar.id}
              type={snackbar.type}
              variant={snackbar.variant}
              onClose={() => removeSnackbar(snackbar.id)}
            />
          ))}
        </AnimatePresence>
      </section>
    </main>
  );
}
