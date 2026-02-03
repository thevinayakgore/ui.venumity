"use client";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Info,
  AlertTriangle,
  XCircle,
  Loader2,
  Bell,
  Star,
} from "lucide-react";

const messages = [
  {
    type: "success",
    style: "simple",
    icon: <CheckCircle2 className="size-6 text-green-500" />,
    title: "Success",
    description: "Your operation completed successfully.",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/60",
    textColor: "text-green-500",
  },
  {
    type: "info",
    style: "shadow",
    icon: <Info className="size-6 text-blue-500" />,
    title: "Information",
    description: "Here is some important information for you.",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/60",
    textColor: "text-blue-500",
  },
  {
    type: "warning",
    style: "pill",
    icon: <AlertTriangle className="size-6 text-yellow-500" />,
    title: "Warning",
    description: "Be careful! There might be some issues.",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/60",
    textColor: "text-yellow-500",
  },
  {
    type: "danger",
    style: "accent",
    icon: <XCircle className="size-6 text-red-500" />,
    title: "Danger",
    description: "Something went wrong. Please try again.",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/60",
    textColor: "text-red-500",
  },
  {
    type: "loading",
    style: "spinner",
    icon: <Loader2 className="size-6 text-gray-500 animate-spin" />,
    title: "Loading",
    description: "Processing your request, please wait...",
    bgColor: "bg-gray-500/10",
    borderColor: "border-gray-500/60",
    textColor: "text-gray-500",
  },
  {
    type: "neutral",
    style: "simple",
    icon: <Bell className="size-6 text-teal-500" />,
    title: "Notification",
    description: "This is a neutral notification message.",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500",
    textColor: "text-teal-500",
  },
  {
    type: "custom",
    style: "shadow",
    icon: <Star className="size-6 text-purple-500" />,
    title: "Custom",
    description: "This is a custom inline message example.",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/60",
    textColor: "text-purple-500",
  },
];

export default function BasicInlineMessage() {
  return (
    <>
      {/* Inline Messages 1 */}
      <motion.main
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col m-auto gap-4 p-6 sm:p-10 overflow-auto max-w-4xl w-full h-full"
      >
        {messages.map(
          (
            {
              type,
              style,
              icon,
              title,
              description,
              bgColor,
              borderColor,
              textColor,
            },
            i,
          ) => {
            const cardClasses = {
              simple: `${bgColor} ${borderColor} border-x-6`,
              shadow: `${bgColor} ${borderColor} border-x-6`,
              pill: `${bgColor} ${borderColor} border rounded-sm`,
              accent: `${bgColor} border-l-12 ${borderColor} rounded-r-md bg-opacity-30`,
              spinner: `${bgColor} ${borderColor} border-l-8 flex items-center gap-3`,
            }[style];

            return (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className={`flex items-start gap-3 p-5 border cursor-pointer hover:shadow-lg transition-all duration-500 w-full ${cardClasses}`}
                role="alert"
                tabIndex={0}
              >
                <div aria-hidden="true">{icon}</div>
                <div className="flex flex-col">
                  <h4
                    className={`text-base md:text-lg font-medium mb-2 ${textColor}`}
                  >
                    {title}
                  </h4>
                  <p className={`text-sm ${textColor} opacity-90`}>
                    {description}
                  </p>
                </div>
              </motion.div>
            );
          },
        )}
      </motion.main>
    </>
  );
}
