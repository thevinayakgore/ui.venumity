"use client";
import { Settings, Shield, Trash2, User, Loader2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function PopupModal({
  isOpen,
  onClose,
  onConfirm,
  icon: Icon,
  iconClass,
  title,
  description,
  bg,
  borderClass,
  confirmClass,
  confirmLabel,
  loading,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  icon: React.ComponentType<{ className?: string }>;
  iconClass: string;
  title: string;
  description: string;
  bg: string;
  borderClass: string;
  confirmClass: string;
  confirmLabel: string;
  loading?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      {isOpen && (
        <DialogContent
          className={`bg-linear-to-b ${bg} rounded-lg p-6 max-w-100! w-full border ${borderClass} shadow-2xl **:data-[slot=dialog-close]:hidden`}
        >
          <DialogHeader className="items-center text-center">
            <Icon className={`size-14 p-3 rounded-sm mb-4 ${iconClass}`} />
            <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {description}
            </DialogDescription>
          </DialogHeader>

          {children && <div>{children}</div>}

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 p-6 cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              size="lg"
              className={`flex-1 p-6 cursor-pointer ${confirmClass}`}
              onClick={onConfirm}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin size-4 mr-2" />
                  Loading...
                </>
              ) : (
                confirmLabel
              )}
            </Button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}

const POPUPS = [
  {
    key: "delete",
    triggerLabel: "Delete Popup",
    triggerClass:
      "cursor-pointer p-6 bg-linear-to-tl from-red-500 to-pink-400 text-white rounded-sm font-medium hover:scale-105 transition-all duration-500",
    modalProps: {
      icon: Trash2,
      iconClass: "text-red-500 bg-red-500/15",
      title: "Delete Item",
      description:
        "Are you sure you want to delete this item ? This action cannot be undone.",
      bg: "from-background via-background to-red-500/30",
      borderClass: "border-red-500/60",
      confirmClass: "bg-red-500 hover:bg-red-600",
      confirmLabel: "Delete",
    },
  },
  {
    key: "logout",
    triggerLabel: "Logout Popup",
    triggerClass:
      "cursor-pointer p-6 bg-linear-to-tl from-orange-500 to-yellow-400 text-white rounded-sm font-medium hover:scale-105 transition-all duration-500",
    modalProps: {
      icon: User,
      iconClass: "text-orange-500 bg-orange-500/15",
      title: "Logout",
      description:
        "Are you sure you want to logout ? You will need to sign in again to access your account.",
      bg: "from-background via-background to-orange-500/30",
      borderClass: "border-orange-500/60",
      confirmClass: "bg-orange-500 hover:bg-orange-600",
      confirmLabel: "Logout",
    },
    withLoading: true,
  },
  {
    key: "settings",
    triggerLabel: "Settings Popup",
    triggerClass:
      "cursor-pointer p-6 bg-linear-to-tl from-blue-500 to-cyan-400 text-white rounded-sm font-medium hover:scale-105 transition-all duration-500",
    modalProps: {
      icon: Settings,
      iconClass: "text-blue-500 bg-blue-500/15",
      title: "Apply Changes",
      description:
        "Do you want to save these settings? Some changes may require a page refresh.",
      bg: "from-background via-background to-blue-500/30",
      borderClass: "border-blue-500/60",
      confirmClass: "bg-blue-500 hover:bg-blue-600",
      confirmLabel: "Apply",
    },
    children: (
      <ul className="p-4 pl-8 border border-blue-500/70 bg-blue-500/10 backdrop-blur-lg rounded-sm text-sm opacity-70 list-decimal space-y-1">
        <li>Updates will take effect immediately.</li>
        <li>Some settings may restart the app.</li>
        <li>Requires page refresh for full changes.</li>
        <li>Apply only when you are sure.</li>
      </ul>
    ),
  },
  {
    key: "security",
    triggerLabel: "Security Popup",
    triggerClass:
      "cursor-pointer p-6 bg-linear-to-tl from-green-500 to-teal-400 text-white rounded-sm font-medium hover:scale-105 transition-all duration-500",
    modalProps: {
      icon: Shield,
      iconClass: "text-green-500 bg-green-500/15",
      title: "Security Action",
      description:
        "This action requires additional security confirmation. Please verify your identity.",
      bg: "from-background via-background to-green-500/30",
      borderClass: "border-green-500/60",
      confirmClass: "bg-green-500 hover:bg-green-600",
      confirmLabel: "Verify",
    },
    children: (
      <input
        type="password"
        placeholder="********"
        className="w-full px-4 py-3 bg-background border border-green-500/50 rounded-sm focus:outline-none focus:border-green-500"
      />
    ),
  },
];

export default function Popup1() {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [loadingLogout, setLoadingLogout] = useState(false);

  return (
    <main className="grid grid-cols-2 gap-4 p-6 sm:p-10 md:py-14">
      {POPUPS.map(
        ({
          key,
          triggerLabel,
          triggerClass,
          modalProps,
          children,
          withLoading,
        }) => (
          <div key={key}>
            <Button
              onClick={() => setActivePopup(key)}
              className={cn(triggerClass, "w-full")}
            >
              {triggerLabel}
            </Button>

            <PopupModal
              isOpen={activePopup === key}
              onClose={() => setActivePopup(null)}
              onConfirm={() => {
                if (withLoading) {
                  setLoadingLogout(true);
                  setTimeout(() => {
                    console.log(`${key} confirmed`);
                    setLoadingLogout(false);
                    setActivePopup(null);
                  }, 4000);
                } else {
                  console.log(`${key} confirmed`);
                  setActivePopup(null);
                }
              }}
              loading={withLoading ? loadingLogout : undefined}
              {...modalProps}
            >
              {children}
            </PopupModal>
          </div>
        ),
      )}
    </main>
  );
}
