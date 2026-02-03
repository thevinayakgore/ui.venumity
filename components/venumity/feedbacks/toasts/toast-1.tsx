"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  Info,
  AlertTriangle,
  XCircle,
  Loader2,
  X,
} from "lucide-react";

type ToastType = "success" | "info" | "warning" | "error" | "loading";

interface Toast {
  id: number;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number | null;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const toastIcons = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
  error: XCircle,
  loading: Loader2,
};

const toastColors = {
  success: "from-green-400 to-green-600",
  info: "from-blue-400 to-blue-600",
  warning: "from-yellow-400 to-yellow-600",
  error: "from-red-400 to-red-600",
  loading: "from-gray-400 to-gray-600",
};

const toastTitles = {
  success: "Success",
  info: "Info",
  warning: "Warning",
  error: "Error",
  loading: "Loading",
};

const defaultDuration = 5000; // Reduced for better UX

const toastButtons = [
  {
    type: "success" as ToastType,
    label: "Success Toast",
    color: "from-green-400 to-green-600",
    ring: "focus:ring-green-300",
    textColor: "text-green-500",
    borderColor: "border-green-500/40",
  },
  {
    type: "info" as ToastType,
    label: "Info Toast",
    color: "from-blue-400 to-blue-600",
    ring: "focus:ring-blue-300",
    textColor: "text-blue-500",
    borderColor: "border-blue-500/40",
  },
  {
    type: "warning" as ToastType,
    label: "Warning Toast",
    color: "from-yellow-400 to-yellow-600",
    ring: "focus:ring-yellow-300",
    textColor: "text-yellow-500",
    borderColor: "border-yellow-500/40",
  },
  {
    type: "error" as ToastType,
    label: "Error Toast",
    color: "from-red-400 to-red-600",
    ring: "focus:ring-red-300",
    textColor: "text-red-500",
    borderColor: "border-red-500/40",
  },
  {
    type: "loading" as ToastType,
    label: "Loading Toast",
    color: "from-gray-400 to-gray-600",
    ring: "focus:ring-gray-300",
    textColor: "text-gray-400",
    borderColor: "border-gray-500/40",
  },
];

export default function Toast1() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Map<number, NodeJS.Timeout>>(new Map());

  const addToast = useCallback((type: ToastType) => {
    const id = Date.now();
    const newToast: Toast = {
      id,
      type,
      title: toastTitles[type],
      description:
        type === "loading"
          ? "Please wait..."
          : type === "success"
          ? "Operation completed successfully."
          : type === "info"
          ? "Here is some information."
          : type === "warning"
          ? "Be careful with this action."
          : "An error occurred.",
      duration: type === "loading" ? null : defaultDuration,
      action:
        type === "info"
          ? {
              label: "Learn More",
              onClick: () => alert("More information..."),
            }
          : undefined,
    };

    setToasts((prev) => [newToast, ...prev]);
  }, []);

  const removeToast = useCallback((id: number) => {
    // Clear the timer if it exists
    if (timers.current.has(id)) {
      clearTimeout(timers.current.get(id));
      timers.current.delete(id);
    }

    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const startTimer = useCallback(
    (toast: Toast) => {
      if (toast.duration === null || toast.duration === undefined) return;

      // Clear any existing timer for this toast
      if (timers.current.has(toast.id)) {
        clearTimeout(timers.current.get(toast.id));
      }

      const timer = setTimeout(() => {
        removeToast(toast.id);
      }, toast.duration);

      timers.current.set(toast.id, timer);
    },
    [removeToast]
  );

  const pauseTimer = useCallback((id: number) => {
    if (timers.current.has(id)) {
      clearTimeout(timers.current.get(id));
      timers.current.delete(id);
    }
  }, []);

  const resumeTimer = useCallback(
    (toast: Toast) => {
      if (toast.duration === null || toast.duration === undefined) return;
      startTimer(toast);
    },
    [startTimer]
  );

  // Initialize timers for toasts that need them
  const initializeTimers = useCallback(() => {
    toasts.forEach((toast) => {
      if (
        toast.duration !== null &&
        toast.duration !== undefined &&
        !timers.current.has(toast.id)
      ) {
        startTimer(toast);
      }
    });
  }, [toasts, startTimer]);

  // Initialize timers when toasts change (after render)
  useEffect(() => {
    const t = setTimeout(() => {
      initializeTimers();
    }, 0);

    return () => clearTimeout(t);
  }, [toasts, initializeTimers]);

  const toastTextColors = Object.fromEntries(
    toastButtons.map((b) => [b.type, b.textColor])
  );

  const toastBorderColors = Object.fromEntries(
    toastButtons.map((b) => [b.type, b.borderColor])
  );

  return (
    <>
      <div className="absolute top-0 right-0 z-50 flex flex-col gap-4 px-6 py-10 max-h-screen overflow-y-auto w-full max-w-sm">
        <AnimatePresence initial={false}>
          {toasts.map((toast) => {
            const { id, type, title, description, action, duration } = toast;
            const Icon = toastIcons[type];

            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.9 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`relative p-4 rounded-md hover:shadow-lg overflow-hidden bg-muted/60 border ${toastBorderColors[type]} hover:scale-105 transition-all duration-500 w-full min-h-max`}
                onMouseEnter={() => pauseTimer(id)}
                onMouseLeave={() => resumeTimer(toast)}
              >
                <div className="flex items-start mb-4 w-full">
                  <div className="shrink-0 flex items-center">
                    <Icon
                      className={`size-5 ${
                        type === "loading" ? "animate-spin" : ""
                      } ${toastTextColors[type]}`}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="ml-3 flex-1 flex flex-col items-start w-full">
                    <h1
                      className={`font-medium leading-none ${toastTextColors[type]}`}
                    >
                      {title}
                    </h1>
                    {description && (
                      <p className="mt-1 text-sm leading-snug">{description}</p>
                    )}
                    {action && (
                      <button
                        onClick={action.onClick}
                        className="cursor-pointer mt-2 text-blue-500 underline underline-offset-4 hover:text-blue-600 transition-all duration-300"
                        type="button"
                      >
                        {action.label}
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => removeToast(id)}
                    className={`absolute top-2 right-2 size-5 cursor-pointer hover:bg-linear-to-tl ${toastColors[type]} hover:text-white p-1 rounded-full transition-all duration-300`}
                    aria-label="Close"
                    type="button"
                  >
                    <X className="w-full h-full" />
                  </button>
                </div>

                {/* Progress Bar (hidden for loading & infinite duration toasts) */}
                {!(type === "loading" || duration === null) &&
                  duration !== undefined && (
                    <motion.div
                      key={`${id}-progress`}
                      initial={{ width: "100%" }}
                      animate={{ width: 0 }}
                      transition={{
                        duration: duration / 1000,
                        ease: "linear",
                      }}
                      className={`h-1 rounded-full bg-linear-to-br ${toastColors[type]}`}
                    ></motion.div>
                  )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <main className="flex flex-col items-center justify-center gap-6 container max-w-7xl m-auto w-full">
        {toastButtons.map(({ type, label, color }, index) => (
          <motion.button
            key={type}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: index * 0.12 }}
            onClick={() => addToast(type)}
            className={`bg-linear-to-tl ${color} text-white py-3 cursor-pointer rounded-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-500 w-60`}
            type="button"
          >
            {label}
          </motion.button>
        ))}
      </main>
    </>
  );
}