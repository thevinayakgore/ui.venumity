"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Info,
  CheckCircle,
  Shield,
  Lock,
  Star,
  Zap,
  X,
} from "lucide-react";
import { useState } from "react";

// Modal Configs for each modal type
const modalConfigs = {
  standard: {
    title: "Information",
    message:
      "This is a standard modal alert. It provides important information that requires user attention.",
    icon: Info,
    style: {
      border: "border-blue-500/70",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400",
      container: "from-blue-500 via-background to-background",
    },
    extras: {
      infoBox:
        "Modal alerts are perfect for notifications that need immediate user interaction.",
      infoBoxColor: "bg-gray-500/20",
    },
    actions: [
      { label: "Cancel", color: "bg-foreground text-secondary" },
      { label: "Confirm", color: "bg-blue-500 hover:bg-blue-600 text-white" },
    ],
  },
  warning: {
    title: "Warning !",
    message:
      "This action cannot be undone. Please make sure you want to proceed with this operation.",
    icon: AlertTriangle,
    style: {
      border: "border border-yellow-500/70",
      iconBg: "bg-yellow-500/20",
      iconColor: "text-yellow-400",
      container: "from-yellow-500 via-background to-background",
    },
    extras: {
      warningBox: {
        icon: AlertTriangle,
        text: "Continuing will permanently delete your data and this action cannot be reversed.",
        color:
          "bg-yellow-500/10 border border-yellow-500/70 rounded-sm p-3 mb-6 text-yellow-300",
      },
    },
    actions: [
      { label: "Cancel", color: "bg-foreground text-secondary" },
      {
        label: "Proceed",
        color: "bg-secondary text-foreground",
      },
    ],
  },
  success: {
    title: "Success!",
    message:
      "Your operation has been completed successfully. Everything is working as expected.",
    icon: CheckCircle,
    style: {
      border: "border border-green-500/70",
      iconBg: "bg-green-500/20",
      iconColor: "text-green-400",
      container: "from-green-500 via-background to-background",
    },
    extras: {
      progressBar: true,
    },
    actions: [
      { label: "Cancel", color: "bg-foreground text-secondary" },
      {
        label: "Continue",
        color: "bg-green-500 hover:bg-green-600 text-white",
      },
    ],
  },
  security: {
    title: "Security Verification",
    message:
      "Please verify your identity to continue with this sensitive operation.",
    icon: Shield,
    style: {
      border: "border border-red-500/70",
      iconBg: "bg-red-500/20",
      iconColor: "text-red-400",
      container: "from-red-500 via-background to-background",
    },
    extras: {
      password: true,
      passwordLabel: "Enter Security Code",
      lockIcon: Lock,
      lockText: "This action requires additional security clearance",
    },
    actions: [
      { label: "Cancel", color: "bg-foreground text-secondary" },
      {
        label: "Verify",
        color: "bg-red-500 hover:bg-red-600 text-white",
        requiresPassword: true,
      },
    ],
  },
  premium1: {
    title: "Premium Feature",
    message:
      "Unlock exclusive features and enhanced capabilities with our premium plan.",
    icon: Star,
    style: {
      border: "border-white",
      iconBg: "bg-white/30",
      iconColor: "text-white",
      container: "bg-linear-to-tl from-purple-500 to-sky-500",
    },
    extras: {
      animatedIcon: {
        animate: { rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] },
        transition: { duration: 2, repeat: Infinity },
      },
      features: [
        { label: "Advanced Analytics", icon: Zap },
        { label: "Priority Support", icon: Star },
      ],
      featuresBox: "bg-white/10",
      featuresText: "text-white",
    },
    actions: [
      { label: "Later", color: "bg-white text-black" },
      {
        label: "Upgrade",
        color: "border border-white bg-white/20 Backdrop-blur-md text-white",
      },
    ],
  },
  premium2: {
    title: "Turbo Mode",
    message:
      "Activate turbo mode for enhanced performance and faster processing.",
    icon: Zap,
    style: {
      border: "border border-pink-500/70",
      iconBg: "bg-pink-500/20",
      iconColor: "text-pink-500",
      container: "from-pink-500 via-background to-background",
    },
    extras: {
      animatedIcon: {
        animate: { scale: [1, 1.2, 1] },
        transition: { duration: 2, repeat: Infinity },
      },
      points: [
        "2x faster processing",
        "Priority queue access",
        "Advanced features unlocked",
      ],
      pointsColor: "text-pink-500",
      pointDot: "bg-pink-500",
    },
    actions: [
      { label: "Skip", color: "bg-foreground text-secondary" },
      {
        label: "Activate",
        color: "bg-pink-500 hover:bg-pink-600 text-white",
      },
    ],
  },
};

const modalButtonStyles: Record<keyof typeof modalConfigs, string> = {
  standard: "bg-gradient-to-tl from-blue-500 to-blue-400",
  warning: "bg-gradient-to-tl from-yellow-500 to-yellow-400",
  success: "bg-gradient-to-tl from-green-500 to-green-400",
  security: "bg-gradient-to-tl from-red-500 to-red-400",
  premium1: "bg-gradient-to-tl from-purple-500 to-purple-400",
  premium2: "bg-gradient-to-tl from-pink-500 to-pink-400",
};

// UniversalModal Component
function UniversalModal({
  isOpen,
  onClose,
  config,
}: {
  isOpen: boolean;
  onClose: () => void;
  config: (typeof modalConfigs)[keyof typeof modalConfigs];
}) {
  const configKey = Object.keys(modalConfigs).find(
    (k) => modalConfigs[k as keyof typeof modalConfigs] === config,
  ) as keyof typeof modalConfigs;
  const [password, setPassword] = useState("");
  // For progress bar animation in success modal
  const progressBar =
    config.extras && "progressBar" in config.extras ? (
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: 0.5, duration: 1 }}
        className="h-1 bg-linear-to-r from-green-500 to-emerald-500 rounded-full mb-6"
      />
    ) : null;
  // For info box in standard modal
  const infoBox =
    config.extras && "infoBox" in config.extras ? (
      <div
        className={`${
          config.extras.infoBoxColor || "bg-muted/50"
        } rounded-sm p-3`}
      >
        <p className="text-sm text-muted-foreground">{config.extras.infoBox}</p>
      </div>
    ) : null;
  // For warning box in warning modal
  const warningBox =
    config.extras && "warningBox" in config.extras ? (
      <div className={config.extras.warningBox.color}>
        <div className="flex items-start gap-3">
          <config.extras.warningBox.icon className="size-5 text-yellow-500 shrink-0" />
          <p className="text-yellow-500 text-sm">
            {config.extras.warningBox.text}
          </p>
        </div>
      </div>
    ) : null;
  // For features in premium1 modal
  const features =
    config.extras && "features" in config.extras
      ? (() => {
          const extras = config.extras as {
            features: {
              label: string;
              icon: React.ComponentType<{ className?: string }>;
            }[];
            featuresBox: string;
            featuresText: string;
          };
          return (
            <div className={`${extras.featuresBox} rounded-sm p-4 mb-6`}>
              {extras.features.map((f, i) => (
                <div
                  key={f.label}
                  className={`flex items-center justify-between ${
                    extras.featuresText
                  } ${i > 0 ? "mt-2" : ""}`}
                >
                  <span>{f.label}</span>
                  <f.icon className="w-5 h-5" />
                </div>
              ))}
            </div>
          );
        })()
      : null;
  // For points in premium2 modal
  const points =
    config.extras && "points" in config.extras
      ? (() => {
          const extras = config.extras as {
            points: string[];
            pointsColor: string;
            pointDot: string;
          };
          return (
            <div className="space-y-3 mb-6">
              {extras.points.map((p) => (
                <div
                  key={p}
                  className={`flex items-center gap-3 ${extras.pointsColor}`}
                >
                  <div className={`w-2 h-2 ${extras.pointDot} rounded-full`} />
                  <span className="text-sm">{p}</span>
                </div>
              ))}
            </div>
          );
        })()
      : null;
  // For password input in security modal
  const passwordInput =
    config.extras && "password" in config.extras ? (
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            {config.extras.passwordLabel}
          </label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
            className="w-full px-6 py-3 bg-background border border-foreground/15 rounded-sm text-white text-center text-lg tracking-widest placeholder-gray-500 focus:outline-none focus:border-red-500"
            maxLength={6}
          />
        </div>
        <div className="flex items-center gap-2 text-sm italic">
          <config.extras.lockIcon className="size-4" />
          <span>{config.extras.lockText}</span>
        </div>
      </div>
    ) : null;
  // For animated icon
  const animatedIcon =
    config.extras && "animatedIcon" in config.extras ? (
      <motion.div
        animate={config.extras.animatedIcon.animate}
        transition={config.extras.animatedIcon.transition}
        className={`size-16 ${config.style.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}
      >
        <config.icon className={`size-8 ${config.style.iconColor}`} />
      </motion.div>
    ) : null;
  // For static icon
  const staticIcon = !animatedIcon ? (
    <motion.div
      initial={{
        scale: 0,
        ...(config.title === "Success !" ? { rotate: -180 } : {}),
      }}
      animate={{
        scale: 1,
        ...(config.title === "Success !" ? { rotate: 0 } : {}),
      }}
      transition={
        config.title === "Success !"
          ? { type: "spring", stiffness: 200 }
          : undefined
      }
      className={`size-16 ${config.style.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}
    >
      <config.icon className={`size-8 ${config.style.iconColor}`} />
    </motion.div>
  ) : null;
  // For modal header layout
  const isStandard = configKey === "standard";
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className={`relative rounded-lg p-6 max-w-md w-full shadow-2xl border ${config.style.border} bg-linear-to-t ${config.style.container}`}
          >
            {/* Header */}
            {isStandard ? (
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-blue-500/20 rounded-sm flex items-center justify-center">
                    <Info className="size-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold">{config.title}</h3>
                </div>
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 size-6 p-1 cursor-pointer rounded-full bg-muted hover:bg-foreground hover:text-secondary"
                >
                  <X className="w-full h-full" />
                </button>
              </div>
            ) : (
              <div className="text-center mb-6">
                {animatedIcon || staticIcon}
                <h3
                  className={`text-xl font-bold mb-2 ${
                    configKey === "premium1" ? "text-white" : ""
                  }`}
                >
                  {config.title}
                </h3>
                <p
                  className={
                    configKey === "premium1"
                      ? "text-white"
                      : "text-muted-foreground"
                  }
                >
                  {config.message}
                </p>
              </div>
            )}
            {/* Content */}
            {isStandard ? (
              <div className="mb-6">
                <p className="text-muted-foreground mb-4">{config.message}</p>
                {infoBox}
              </div>
            ) : null}
            {configKey === "warning" ? warningBox : null}
            {configKey === "success" ? progressBar : null}
            {configKey === "security" ? passwordInput : null}
            {configKey === "premium1" ? features : null}
            {configKey === "premium2" ? points : null}
            {/* Actions */}
            <div className="flex gap-3">
              {config.actions.map(
                (action: {
                  label: string;
                  color: string;
                  requiresPassword?: boolean;
                }) => (
                  <button
                    key={action.label}
                    onClick={onClose}
                    className={`flex-1 cursor-pointer px-6 py-3 rounded-sm font-medium hover:scale-105 transition-all duration-500 ${action.color}`}
                    disabled={
                      action.requiresPassword ? password.length !== 6 : false
                    }
                  >
                    {action.label}
                  </button>
                ),
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function StandardModalAlert() {
  const [activeModal, setActiveModal] = useState<
    keyof typeof modalConfigs | null
  >(null);
  return (
    <main className="flex flex-col items-center justify-center m-auto gap-6 py-7 md:py-14 max-w-7xl w-full h-full">
      {(Object.keys(modalConfigs) as Array<keyof typeof modalConfigs>).map(
        (key) => (
          <button
            key={key}
            onClick={() => setActiveModal(key)}
            className={`cursor-pointer px-6 py-3 rounded-sm text-white font-medium hover:scale-105 transition-all duration-500 w-60 capitalize ${modalButtonStyles[key]}`}
          >
            {key} Modal
          </button>
        ),
      )}

      {/* Render selected modal dynamically */}
      {activeModal && (
        <UniversalModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          config={modalConfigs[activeModal]}
        />
      )}
    </main>
  );
}
