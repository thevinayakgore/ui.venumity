"use client";
import { motion } from "framer-motion";

export function BadgeRoot({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 bg-popover shadow-lg/5 rounded-full py-1.5 pl-2 pr-3 border ${className}`}
    >
      {children}
    </div>
  );
}

export function BadgeIndicator({
  color = "bg-gray-400",
  size = "size-2.5",
}: {
  color?: string;
  size?: string;
}) {
  return <div className={`${size} ${color} rounded-full`} />;
}

export function BadgePulse({
  color = "bg-gray-400",
}: {
  color?: string;
  size?: string;
}) {
  return (
    <motion.div
      className={`absolute inset-0 ${color} rounded-full opacity-60`}
      animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  );
}

export function BadgeLabel({ text }: { text: string }) {
  return <span className="text-xs leading-none">{text}</span>;
}

export function UserBadge({
  status = "online",
}: {
  status?: "online" | "away" | "busy" | "offline";
  index?: number;
}) {
  const statusConfig = {
    online: { color: "bg-green-500", text: "Online" },
    away: { color: "bg-yellow-500", text: "Away" },
    busy: { color: "bg-red-500", text: "Busy" },
    offline: { color: "bg-gray-500", text: "Offline" },
  };

  const config = statusConfig[status];

  return (
    <BadgeRoot>
      <div className="relative">
        <BadgeIndicator color={config.color} />
        {status !== "offline" && <BadgePulse color={config.color} />}
      </div>
      <BadgeLabel text={config.text} />
    </BadgeRoot>
  );
}

export default function UserStatusBadgePage() {
  return (
    <main className="flex items-center mx-auto w-full h-full">
      <section className="flex flex-wrap items-center justify-center m-auto gap-3 p-6 md:p-10 max-w-3xl">
        <UserBadge status="online" />
        <UserBadge status="offline" />
        <UserBadge status="away" />
        <UserBadge status="busy" />
      </section>
    </main>
  );
}
