"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Bell,
  Zap,
  X,
} from "lucide-react";
import { useState } from "react";

type AlertType = "info" | "success" | "warning" | "error" | "action";
type AlertPosition = "top" | "right" | "bottom" | "left";

// Main Slide-in Alert Component
function SlideInAlert({
  type,
  position,
  onClose,
}: {
  type: AlertType;
  position: AlertPosition;
  onClose: () => void;
}) {
  const positionConfig = {
    top: {
      from: "-translate-y-full",
      to: "translate-y-0",
      classes: "top-4 left-1/2 -translate-x-1/2",
    },
    right: {
      from: "translate-x-full",
      to: "translate-x-0",
      classes: "top-4 right-4",
    },
    bottom: {
      from: "translate-y-full",
      to: "translate-y-0",
      classes: "bottom-4 left-1/2 -translate-x-1/2",
    },
    left: {
      from: "-translate-x-full",
      to: "translate-x-0",
      classes: "top-4 left-4",
    },
  };

  const typeConfig = {
    info: { icon: Info, bg: "bg-blue-500", text: "text-blue-100" },
    success: { icon: CheckCircle, bg: "bg-green-500", text: "text-green-100" },
    warning: {
      icon: AlertTriangle,
      bg: "bg-yellow-500",
      text: "text-yellow-100",
    },
    error: { icon: XCircle, bg: "bg-red-500", text: "text-red-100" },
    action: { icon: Bell, bg: "bg-purple-500", text: "text-purple-100" },
  };

  const config = typeConfig[type] || typeConfig.info;
  const pos = positionConfig[position] || positionConfig.top;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{
        opacity: 0,
        [position === "top" || position === "bottom" ? "y" : "x"]:
          pos.from.includes("-") ? -100 : 100,
      }}
      animate={{
        opacity: 1,
        [position === "top" || position === "bottom" ? "y" : "x"]: 0,
      }}
      exit={{
        opacity: 0,
        [position === "top" || position === "bottom" ? "y" : "x"]:
          pos.from.includes("-") ? -100 : 100,
      }}
      className={`fixed ${pos.classes} z-50 max-w-sm w-full`}
    >
      <motion.div
        className={`${config.bg} rounded-md p-4 shadow-2xl border border-white/10 backdrop-blur-sm`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5 text-white" />
            <div className={config.text}>
              <p className="font-semibold capitalize">{type} Alert</p>
              <p className="text-sm opacity-90">Slide-in from {position}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 size-6 p-1.5 cursor-pointer rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all duration-500"
          >
            <X className="w-full h-full" />
          </button>
        </div>

        {type === "action" && (
          <div className="flex gap-2 mt-3">
            <button className="flex-1 cursor-pointer py-3 bg-white/20 hover:bg-white/30 rounded-sm text-white text-sm font-medium hover:scale-105 transition-all duration-500">
              Action
            </button>
            <button className="flex-1 cursor-pointer py-3 bg-white text-purple-600 hover:bg-gray-100 rounded-sm text-sm font-medium hover:scale-105 transition-all duration-500">
              Confirm
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function SlideInAlert2() {
  const [alerts, setAlerts] = useState<
    Array<{ id: string; type: AlertType; position: AlertPosition }>
  >([]);

  const addAlert = (type: AlertType, position: AlertPosition) => {
    const id = crypto.randomUUID();
    setAlerts((prev) => [...prev, { id, type, position }]);

    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 5000);
  };

  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const slideInConfigs: Array<{
    title: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    iconColor: string;
    position: AlertPosition;
    fullWidth?: boolean;
    buttons: Array<{
      label: string;
      type: AlertType;
      bg: string;
      hover: string;
      border: string;
    }>;
  }> = [
    {
      title: "Top Slide-in",
      icon: Bell,
      iconColor: "text-blue-400",
      position: "top",
      buttons: [
        {
          label: "Open Top Alert",
          type: "info",
          bg: "from-blue-500 to-blue-400",
          hover: "hover:bg-blue-600",
          border: "border-blue-500/70",
        },
      ],
    },
    {
      title: "Right Slide-in",
      icon: Zap,
      iconColor: "text-purple-400",
      position: "right",
      buttons: [
        {
          label: "Open Right Alert",
          type: "info",
          bg: "from-purple-500 to-purple-400",
          hover: "hover:bg-purple-500/30",
          border: "border-purple-500/70",
        },
      ],
    },
    {
      title: "Bottom Slide-in",
      icon: Info,
      iconColor: "text-cyan-400",
      position: "bottom",
      buttons: [
        {
          label: "Open Bottom Alert",
          type: "info",
          bg: "from-cyan-500 to-cyan-400",
          hover: "hover:bg-cyan-600",
          border: "border-cyan-500/70",
        },
      ],
    },
    {
      title: "Left Slide-in",
      icon: AlertTriangle,
      iconColor: "text-orange-400",
      position: "left",
      buttons: [
        {
          label: "Open Left Alert",
          type: "info",
          bg: "from-orange-500 to-orange-400",
          hover: "hover:bg-orange-600",
          border: "border-orange-500/70",
        },
      ],
    },
    {
      title: "Action Buttons",
      icon: CheckCircle,
      iconColor: "text-green-400",
      position: "top",
      buttons: [
        {
          label: "Action",
          type: "action",
          bg: "from-pink-500 to-pink-400",
          hover: "hover:bg-pink-600",
          border: "border-pink-500/70",
        },
      ],
    },
  ];

  return (
    <main className="flex flex-col items-center justify-center m-auto gap-6 py-7 md:py-14 max-w-7xl w-full h-full">
      {/* Alert Containers */}
      <AnimatePresence>
        {alerts.map((alert) => (
          <SlideInAlert
            key={alert.id}
            type={alert.type}
            position={alert.position}
            onClose={() => removeAlert(alert.id)}
          />
        ))}
      </AnimatePresence>
      {/* Main Grid */}
      <div className="flex flex-col items-center justify-center m-auto gap-8 mb-16 w-full">
        {slideInConfigs.map((cfg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="w-60"
          >
            <div
              className={`${
                cfg.fullWidth
                  ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                  : "space-y-4"
              }`}
            >
              {cfg.buttons.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => addAlert(btn.type, cfg.position)}
                  className={`w-full py-3 cursor-pointer rounded-sm font-medium transition-all bg-linear-to-tl ${btn.bg} ${btn.hover} text-white hover:scale-105 transition-all duration-500`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
