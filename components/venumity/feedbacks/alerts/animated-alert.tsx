"use client";
import { motion } from "framer-motion";
import { AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

const variants = [
  {
    key: "pulse",
    motionProps: {
      animate: { scale: [1, 1.02, 1] },
      transition: { duration: 2, repeat: Infinity },
    },
    alert: {
      icon: AlertTriangle,
      title: "Pulse Alert",
      description: "Continuously pulsing for attention",
      className: "bg-yellow-500/5 border-yellow-500/30",
      text: "text-yellow-500!",
    },
  },
  {
    key: "shake",
    motionProps: {
      animate: { x: [0, -5, 5, -5, 5, 0] },
      transition: { duration: 0.5, repeat: Infinity, repeatDelay: 2 },
    },
    alert: {
      icon: XCircle,
      title: "Shake Alert",
      description: "Shaking to grab attention",
      className: "bg-red-500/10 border-red-500/50",
      text: "text-red-500!",
    },
  },
  {
    key: "glow",
    motionProps: {
      animate: {
        boxShadow: [
          "0 0 0px rgba(59, 130, 246, 0.5)",
          "0 0 20px rgba(59, 130, 246, 0.8)",
          "0 0 0px rgba(59, 130, 246, 0.5)",
        ],
      },
      transition: { duration: 2, repeat: Infinity },
    },
    wrapperClassName: "rounded-lg",
    alert: {
      icon: Info,
      title: "Glow Alert",
      description: "Glowing border effect",
      className: "bg-blue-500/10 border-blue-500/50",
      text: "text-blue-500!",
    },
  },
  {
    key: "bounce",
    motionProps: {
      animate: { y: [0, -5, 0] },
      transition: { duration: 1, repeat: Infinity },
    },
    alert: {
      icon: CheckCircle,
      title: "Bounce Alert",
      description: "Bouncing up and down",
      className: "bg-green-500/10 border-green-500/50",
      text: "text-green-500!",
    },
  },
];

export default function AnimatedAlert() {
  return (
    <main className="flex flex-col items-center justify-center m-auto gap-4 p-6 sm:p-10 overflow-auto max-w-4xl w-full h-full">
      {variants.map(
        ({
          key,
          motionProps,
          wrapperClassName,
          alert: { icon: Icon, title, description, className, text },
        }) => (
          <motion.div
            key={key}
            {...motionProps}
            className={cn(wrapperClassName, "w-full")}
          >
            <Alert className={`${className} backdrop-blur-sm`}>
              <Icon className={`size-4 ${text}`} />
              <AlertTitle className={text}>{title}</AlertTitle>
              <AlertDescription>{description}</AlertDescription>
            </Alert>
          </motion.div>
        ),
      )}
    </main>
  );
}
