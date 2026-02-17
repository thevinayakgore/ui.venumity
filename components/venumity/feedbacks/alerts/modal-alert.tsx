"use client";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Info,
  CheckCircle,
  Shield,
  Lock,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

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
      container: "from-blue-500/50 via-background to-background",
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
      container: "from-yellow-500/50 via-background to-background",
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
      container: "from-green-500/50 via-background to-background",
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
      container: "from-red-500/50 via-background to-background",
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
};

const modalButtonStyles: Record<keyof typeof modalConfigs, string> = {
  standard: "bg-gradient-to-tl from-blue-500 to-blue-400",
  warning: "bg-gradient-to-tl from-yellow-500 to-yellow-400",
  success: "bg-gradient-to-tl from-green-500 to-green-400",
  security: "bg-gradient-to-tl from-red-500 to-red-400",
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
  const animatedIcon = null;
  // For static icon
  const staticIcon = !animatedIcon ? (
    <div
      className={`size-16 ${config.style.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}
    >
      <config.icon className={`size-8 ${config.style.iconColor}`} />
    </div>
  ) : null;
  // For modal header layout
  const isStandard = configKey === "standard";

  // Determine button variant based on action label and modal type
  function getButtonVariant(actionLabel: string) {
    if (actionLabel.toLowerCase() === "cancel") {
      return "outline";
    }
    return "default";
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        className={`p-0 max-w-100! w-full shadow-2xl border ${config.style.border} bg-linear-to-t ${config.style.container} data-[state=open]:animate-none`}
        style={{ padding: undefined }}
      >
        <Card className="p-6 gap-0 bg-transparent border-none">
          {isStandard ? (
            <CardHeader className="flex items-center justify-between mb-4 p-0">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-blue-500/20 rounded-sm flex items-center justify-center">
                  <Info className="size-6 text-blue-500" />
                </div>
                <DialogTitle className="text-xl font-bold p-0 m-0">
                  {config.title}
                </DialogTitle>
              </div>
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 size-6 p-1 cursor-pointer rounded-full bg-muted hover:bg-foreground hover:text-secondary"
                  aria-label="Close"
                >
                  <X className="w-full h-full" />
                </Button>
              </DialogClose>
            </CardHeader>
          ) : (
            <CardHeader className="text-center mb-6 p-0">
              {animatedIcon || staticIcon}
              <DialogTitle className="text-xl font-bold mb-2">
                {config.title}
              </DialogTitle>
            </CardHeader>
          )}
          <CardContent className={isStandard ? "mb-6 p-0" : "p-0"}>
            {isStandard ? (
              <>
                <p className="text-muted-foreground mb-4">{config.message}</p>
                {infoBox}
              </>
            ) : (
              <p className="text-muted-foreground mb-6">{config.message}</p>
            )}
            {configKey === "warning" ? warningBox : null}
            {configKey === "security" ? passwordInput : null}
          </CardContent>
          <CardFooter className="flex gap-3 p-0">
            {config.actions.map(
              (action: {
                label: string;
                color: string;
                requiresPassword?: boolean;
              }) => (
                <DialogClose asChild key={action.label}>
                  <Button
                    onClick={onClose}
                    variant={getButtonVariant(action.label)}
                    className={`flex-1 cursor-pointer p-6 rounded-sm font-medium hover:scale-105 transition-all duration-500 ${getButtonVariant(action.label) === "default" && "bg-foreground hover:bg-foreground/80 text-secondary"} ${
                      action.label.toLowerCase() !== "cancel"
                        ? config.style.container
                        : ""
                    }`}
                    disabled={
                      action.requiresPassword ? password.length !== 6 : false
                    }
                    type="button"
                  >
                    {action.label}
                  </Button>
                </DialogClose>
              ),
            )}
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

export default function StandardModalAlert() {
  const [activeModal, setActiveModal] = useState<
    keyof typeof modalConfigs | null
  >(null);
  return (
    <main className="flex items-center mx-auto w-full h-full">
      <section className="flex flex-wrap items-center justify-center m-auto gap-3 p-6 md:p-10 max-w-3xl">
        {(Object.keys(modalConfigs) as Array<keyof typeof modalConfigs>).map(
          (key) => (
            <Button
              key={key}
              onClick={() => setActiveModal(key)}
              className={`cursor-pointer p-6 rounded-sm text-white font-medium hover:scale-105 transition-all duration-500 capitalize ${modalButtonStyles[key]}`}
              type="button"
            >
              {key} Modal
            </Button>
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
      </section>
    </main>
  );
}
