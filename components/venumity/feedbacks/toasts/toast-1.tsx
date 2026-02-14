"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
};

const colorThemes: Record<ToastType, string> = {
  success: "bg-green-500/10 border-green-500/60 text-green-500",
  error: "bg-red-500/10 border-red-500/60 text-red-500",
  info: "bg-blue-500/10 border-blue-500/60 text-blue-500",
  warning: "bg-yellow-400/10 border-yellow-500/60 text-yellow-500",
};

const actionButtonThemes: Record<ToastType, string> = {
  success: "text-green-500 border-green-500 hover:bg-green-500/10",
  error: "text-red-500 border-red-500 hover:bg-red-500/10",
  info: "text-blue-500 border-blue-500 hover:bg-blue-500/10",
  warning: "text-yellow-500 border-yellow-500 hover:bg-yellow-500/10",
};

type ToastType = "success" | "error" | "info" | "warning";

function Toast({
  type,
  title,
  action,
  onAction,
}: {
  type: ToastType;
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  const Icon = icons[type];
  const colorClass = colorThemes[type];
  const actionButtonClass = actionButtonThemes[type];
  return (
    <div
      className={`flex items-center justify-between border ${colorClass} p-3 rounded-lg backdrop-blur-md min-w-sm!`}
    >
      <div className="flex items-center gap-3">
        <Icon className="size-6!" />
        <span>{title}</span>
      </div>
      {action && onAction && (
        <Button
          size="sm"
          variant="outline"
          className={cn(actionButtonClass, "cursor-pointer")}
          onClick={onAction}
        >
          {action}
        </Button>
      )}
    </div>
  );
}

export default function Toast1() {
  function showToast(type: ToastType) {
    toast.custom((id: string | number) => (
      <Toast
        type={type}
        title={`This is a ${type.charAt(0).toUpperCase() + type.slice(1)} toast message.`}
        action={type === "info" ? "Undo" : undefined}
        onAction={
          type === "info"
            ? () => {
                toast.dismiss(id);
                alert("Undo action triggered");
              }
            : undefined
        }
      />
    ));
  }

  return (
    <main className="grid grid-cols-2 gap-4 items-center justify-center m-auto p-6 sm:p-10 md:py-14">
      <Button
        variant="default"
        className="bg-green-600 hover:bg-green-700 text-white p-6 cursor-pointer"
        onClick={() => showToast("success")}
      >
        Show Success
      </Button>
      <Button
        variant="default"
        className="bg-red-600 hover:bg-red-700 text-white p-6 cursor-pointer"
        onClick={() => showToast("error")}
      >
        Show Error
      </Button>
      <Button
        variant="default"
        className="bg-blue-600 hover:bg-blue-700 text-white p-6 cursor-pointer"
        onClick={() => showToast("info")}
      >
        Show Info
      </Button>
      <Button
        variant="default"
        className="bg-yellow-400 hover:bg-yellow-500 text-white p-6 cursor-pointer"
        onClick={() => showToast("warning")}
      >
        Show Warning
      </Button>
    </main>
  );
}
