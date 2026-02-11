"use client";
import {
  Radio,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Gift,
} from "lucide-react";
import { Loader, HelpCircle, AlertOctagon } from "lucide-react";

type Status =
  | "online"
  | "offline"
  | "maintenance"
  | "degraded"
  | "loading"
  | "unknown"
  | "success"
  | "error";

const defaultStatusConfig: Record<
  Status,
  {
    bg: string;
    text: string;
    textColor: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }
> = {
  online: {
    bg: "bg-green-500",
    text: "Online",
    textColor: "text-green-500",
    icon: Radio,
  },
  offline: {
    bg: "bg-zinc-500",
    text: "Offline",
    textColor: "text-zinc-500",
    icon: XCircle,
  },
  maintenance: {
    bg: "bg-yellow-500",
    text: "Maintenance",
    textColor: "text-yellow-500",
    icon: AlertTriangle,
  },
  degraded: {
    bg: "bg-orange-500",
    text: "Degraded",
    textColor: "text-orange-500",
    icon: Clock,
  },
  loading: {
    bg: "bg-blue-500",
    text: "Loading",
    textColor: "text-blue-500",
    icon: Loader,
  },
  unknown: {
    bg: "bg-slate-500",
    text: "Unknown",
    textColor: "text-slate-500",
    icon: HelpCircle,
  },
  success: {
    bg: "bg-pink-500",
    text: "Success",
    textColor: "text-pink-500",
    icon: CheckCircle,
  },
  error: {
    bg: "bg-rose-500",
    text: "Error",
    textColor: "text-rose-500",
    icon: AlertOctagon,
  },
};

interface SystemStatusBadgeProps {
  status: Status;
  text?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  spin?: boolean;
  rootClassName?: string;
  iconColor?: string;
  textColor?: string;
}

export function SystemStatusBadge({
  status,
  text,
  icon,
  spin,
  rootClassName = "",
  iconColor,
  textColor,
}: SystemStatusBadgeProps) {
  const defaultConfig = defaultStatusConfig[status];

  const badgeText = text ?? defaultConfig.text;
  const Icon = icon ?? defaultConfig.icon;

  const baseRootClass =
    "flex items-center justify-center gap-2 text-sm font-medium text-white p-1 pr-4 rounded-full shadow-lg/5 hover:scale-105 transition-all duration-500";

  const rootClasses = [baseRootClass, defaultConfig.bg, rootClassName]
    .filter(Boolean)
    .join(" ");
  const iconColorClass = iconColor ?? defaultConfig.textColor;

  const iconClasses = [
    "size-6 p-1 bg-white rounded-full",
    iconColorClass,
    spin ? "animate-spin" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const textClass =
    (textColor ?? defaultConfig.textColor) + "text-white leading-none";

  return (
    <div className={rootClasses}>
      <Icon className={iconClasses} />
      <span className={textClass}>{badgeText}</span>
    </div>
  );
}

export default function SystemStatusBadgeDemo() {
  return (
    <main className="flex flex-wrap items-center justify-center m-auto gap-4 p-6 sm:p-10 max-w-4xl overflow-auto w-full">
      <SystemStatusBadge status="online" />
      <SystemStatusBadge status="offline" />
      <SystemStatusBadge status="maintenance" />
      <SystemStatusBadge status="degraded" />
      <SystemStatusBadge status="loading" spin />
      <SystemStatusBadge
        status="error"
        text="Critical Failure"
        icon={XCircle}
      />
      <SystemStatusBadge
        status="success"
        text="All Good"
        icon={CheckCircle}
        rootClassName="bg-white! text-green-500! ring-2 ring-green-500"
        iconColor="text-green-500"
      />
      <SystemStatusBadge
        status="unknown"
        text="Mystery"
        icon={Gift}
        rootClassName="bg-linear-to-tl from-pink-500 to-fuchsia-300 ring-5 ring-sky-400"
        iconColor="text-pink-500"
        textColor="text-pink-500"
      />
    </main>
  );
}
