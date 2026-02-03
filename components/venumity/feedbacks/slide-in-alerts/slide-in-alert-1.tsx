"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  Info,
  AlertTriangle,
  AlertCircle,
  Loader2,
  Bell,
  Star,
  Clock,
  XCircle,
  Mail,
  X,
} from "lucide-react";

type AlertType =
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "loading"
  | "neutral"
  | "custom"
  | "reminder"
  | "error"
  | "notification";

type ShowAt = "bottom-center" | "bottom-left" | "bottom-right";

interface AlertProps {
  id: number;
  type: AlertType;
  title: string;
  description: string;
  onDismiss: (id: number) => void;
}

const alertsData: {
  type: AlertType;
  title: string;
  description: string;
  icon: React.ReactNode;
  colors: {
    bg: string;
    border: string;
    text: string;
    icon: string;
    closeHover: string;
  };
  gradient: string;
}[] = [
  {
    type: "success",
    title: "Success",
    description: "Your operation completed successfully.",
    icon: <CheckCircle2 className="size-6" />,
    colors: {
      bg: "bg-green-500/20",
      border: "border-green-500/70",
      text: "text-green-500",
      icon: "text-green-500",
      closeHover: "hover:bg-green-500 hover:text-white",
    },
    gradient: "from-green-500 to-green-300",
  },
  {
    type: "info",
    title: "Info",
    description: "Here is some important information.",
    icon: <Info className="size-6" />,
    colors: {
      bg: "bg-blue-500/20",
      border: "border-blue-500/70",
      text: "text-blue-500",
      icon: "text-blue-500",
      closeHover: "hover:bg-blue-500 hover:text-white",
    },
    gradient: "from-blue-500 to-blue-300",
  },
  {
    type: "warning",
    title: "Warning",
    description: "Be careful about this action.",
    icon: <AlertTriangle className="size-6" />,
    colors: {
      bg: "bg-yellow-500/20",
      border: "border-yellow-500/70",
      text: "text-yellow-500",
      icon: "text-yellow-500",
      closeHover: "hover:bg-yellow-500 hover:text-white",
    },
    gradient: "from-yellow-400 to-yellow-200",
  },
  {
    type: "danger",
    title: "Danger",
    description: "Something went wrong!",
    icon: <AlertCircle className="size-6" />,
    colors: {
      bg: "bg-red-500/20",
      border: "border-red-500/70",
      text: "text-red-500",
      icon: "text-red-500",
      closeHover: "hover:bg-red-500 hover:text-white",
    },
    gradient: "from-red-500 to-red-300",
  },
  {
    type: "loading",
    title: "Loading",
    description: "Please wait while we process your request.",
    icon: <Loader2 className="w-6 h-6 animate-spin" />,
    colors: {
      bg: "bg-sky-500/20",
      border: "border-sky-500/70",
      text: "text-sky-500",
      icon: "text-sky-500",
      closeHover: "hover:bg-sky-500 hover:text-white",
    },
    gradient: "from-sky-400 to-sky-200",
  },
  {
    type: "neutral",
    title: "Neutral",
    description: "This is a neutral alert.",
    icon: <Bell className="size-6" />,
    colors: {
      bg: "bg-neutral-500/20",
      border: "border-neutral-500/70",
      text: "text-foreground",
      icon: "text-foreground",
      closeHover: "hover:bg-neutral-500 hover:text-white",
    },
    gradient: "from-neutral-500 to-neutral-300",
  },
  {
    type: "custom",
    title: "Custom",
    description: "This is a custom alert type.",
    icon: <Star className="size-6" />,
    colors: {
      bg: "bg-purple-500/20",
      border: "border-purple-500/70",
      text: "text-purple-500",
      icon: "text-purple-500",
      closeHover: "hover:bg-purple-500 hover:text-white",
    },
    gradient: "from-purple-500 to-purple-300",
  },
  {
    type: "reminder",
    title: "Reminder",
    description: "Don't forget your appointment tomorrow.",
    icon: <Clock className="size-6" />,
    colors: {
      bg: "bg-indigo-500/20",
      border: "border-indigo-500/70",
      text: "text-indigo-500",
      icon: "text-indigo-500",
      closeHover: "hover:bg-indigo-500 hover:text-white",
    },
    gradient: "from-indigo-500 to-indigo-300",
  },
  {
    type: "error",
    title: "Error",
    description: "An error has occurred.",
    icon: <XCircle className="size-6" />,
    colors: {
      bg: "bg-red-500/20",
      border: "border-red-500/70",
      text: "text-red-500",
      icon: "text-red-500",
      closeHover: "hover:bg-red-500 hover:text-white",
    },
    gradient: "from-red-600 to-red-400",
  },
  {
    type: "notification",
    title: "Notification",
    description: "You have new notifications.",
    icon: <Mail className="size-6" />,
    colors: {
      bg: "bg-teal-500/20",
      border: "border-teal-500/70",
      text: "text-teal-500",
      icon: "text-teal-500",
      closeHover: "hover:bg-teal-500 hover:text-white",
    },
    gradient: "from-teal-500 to-teal-300",
  },
];

function SlideInAlert({ id, type, title, description, onDismiss }: AlertProps) {
  const alertData = alertsData.find((a) => a.type === type);
  if (!alertData) return null;
  const { colors, icon } = alertData;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      drag="x"
      dragConstraints={{ left: -100, right: 100 }}
      onDragEnd={(event, info) => {
        if (info.point.x < -15 || info.point.x > 15) {
          onDismiss(id);
        }
      }}
      className={`max-w-md w-full rounded-md border ${colors.border} ${colors.bg} backdrop-blur-2xl flex items-start gap-3 p-4`}
      role="alert"
      aria-live="assertive"
    >
      <div className={`${colors.icon} shrink-0 mt-0.5`}>{icon}</div>
      <div className="flex-1">
        <h3 className={`font-semibold ${colors.text} text-sm sm:text-base`}>
          {title}
        </h3>
        <p className={`mt-1 text-xs sm:text-sm ${colors.text} opacity-80`}>
          {description}
        </p>
      </div>
      <button
        onClick={() => onDismiss(id)}
        aria-label="Dismiss alert"
        className={`ml-3 p-1 cursor-pointer rounded-full ${colors.text} ${colors.closeHover} focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-${type}-500 transition-all duration-500`}
        type="button"
      >
        <X className="size-4" />
      </button>
    </motion.div>
  );
}

export default function SlideInAlert1() {
  const [alerts, setAlerts] = useState<AlertProps[]>([]);
  const [counter, setCounter] = useState(0);
  const [showAt, setShowAt] = useState<ShowAt>("bottom-right");

  function triggerAlert(index: number, showAtParam: ShowAt) {
    const alertDef = alertsData[index];
    const newAlert: AlertProps = {
      id: counter,
      onDismiss: handleDismiss,
      type: alertDef.type,
      title: alertDef.title,
      description: alertDef.description,
    };
    setShowAt(showAtParam);
    setAlerts((prev) => [...prev, newAlert]);
    setCounter((c) => c + 1);
  }

  function handleDismiss(id: number) {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }

  const containerPositionClasses = {
    "bottom-center":
      "fixed bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col gap-3 z-50 w-full max-w-md",
    "bottom-left":
      "fixed bottom-6 left-6 flex flex-col gap-3 z-50 w-full max-w-md",
    "bottom-right":
      "fixed bottom-6 right-6 flex flex-col gap-3 z-50 w-full max-w-md",
  };

  type AlertButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    showAt: ShowAt;
    alert: number;
  };

  function AlertButton({ showAt, alert, ...rest }: AlertButtonProps) {
    return <button {...rest} onClick={() => triggerAlert(alert, showAt)} />;
  }

  return (
    <>
      <main className="flex flex-col items-center justify-center m-auto gap-6 py-7 md:py-14 max-w-7xl w-full h-full">
        {alertsData.map((alert, i) => (
          <motion.div
            key={alert.type}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="w-60"
          >
            <AlertButton
              showAt="bottom-right"
              alert={i}
              className={`w-full py-4 text-base md:text-lg font-medium cursor-pointer rounded-sm hover:shadow-lg text-white bg-linear-to-tl ${alert.gradient} hover:scale-105 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-1`}
              type="button"
            >
              Show {alert.title}
            </AlertButton>
          </motion.div>
        ))}
      </main>

      <div className={containerPositionClasses[showAt]}>
        {alerts.length >= 4 && (
          <div className="absolute -top-14 right-0 z-20 flex justify-end mb-2">
            <button
              onClick={() => setAlerts([])}
              className="px-6 py-2 bg-foreground text-secondary border border-foreground/30 rounded cursor-pointer font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-muted-foreground transition-all"
              type="button"
            >
              Clear All Messages
            </button>
          </div>
        )}
        <div
          className={`flex flex-col items-center gap-3 ${
            alerts.length >= 4 &&
            "p-3 bg-background border border-foreground/20 rounded-sm"
          } overflow-auto w-full max-h-60`}
        >
          <AnimatePresence initial={false}>
            {alerts.map((alert) => (
              <SlideInAlert key={alert.id} {...alert} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}