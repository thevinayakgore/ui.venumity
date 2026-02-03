"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  Info,
  AlertTriangle,
  XCircle,
  Loader2,
  Clock,
  BellRing,
} from "lucide-react";

type ModalVariant =
  | "success"
  | "info"
  | "warning"
  | "error"
  | "loading"
  | "reminder"
  | "notification";

interface VariantStyle {
  border: string;
  text: string;
  buttonBg: string;
  buttonHover: string;
  icon: React.ReactElement;
}

interface ModalData {
  key: ModalVariant;
  title: string;
  description: React.ReactNode;
  variant: ModalVariant;
  icon: React.ReactElement;
}

const variants: Record<ModalVariant, VariantStyle> = {
  success: {
    border: "border-green-500/70",
    text: "text-green-500",
    buttonBg: "bg-linear-to-tl from-green-500 to-green-300",
    buttonHover: "hover:from-green-600 hover:to-green-300",
    icon: <CheckCircle2 className="size-6 text-green-500" />,
  },
  info: {
    border: "border-blue-500/70",
    text: "text-blue-500",
    buttonBg: "bg-linear-to-tl from-blue-500 to-blue-300",
    buttonHover: "hover:from-blue-600 hover:to-blue-300",
    icon: <Info className="size-6 text-blue-500" />,
  },
  warning: {
    border: "border-yellow-500/70",
    text: "text-yellow-500",
    buttonBg: "bg-linear-to-tl from-yellow-500 to-yellow-300",
    buttonHover: "hover:from-yellow-600 hover:to-yellow-300",
    icon: <AlertTriangle className="size-6 text-yellow-500" />,
  },
  error: {
    border: "border-red-500/70",
    text: "text-red-500",
    buttonBg: "bg-linear-to-tl from-red-500 to-red-300",
    buttonHover: "hover:from-red-600 hover:to-red-300",
    icon: <XCircle className="size-6 text-red-500" />,
  },
  loading: {
    border: "border-gray-500/70",
    text: "text-gray-500",
    buttonBg: "bg-linear-to-tl from-gray-500 to-gray-300",
    buttonHover: "hover:from-gray-600 hover:to-gray-300",
    icon: <Loader2 className="size-6 animate-spin text-gray-500" />,
  },
  reminder: {
    border: "border-indigo-500/70",
    text: "text-indigo-500",
    buttonBg: "bg-linear-to-tl from-indigo-500 to-indigo-300",
    buttonHover: "hover:from-indigo-600 hover:to-indigo-300",
    icon: <Clock className="size-6 text-indigo-500" />,
  },
  notification: {
    border: "border-teal-500/70",
    text: "text-teal-500",
    buttonBg: "bg-linear-to-tl from-teal-500 to-teal-300",
    buttonHover: "hover:from-teal-600 hover:to-teal-300",
    icon: (
      <BellRing className="size-6 text-teal-500 animate-[ring_0.5s_ease-in-out_infinite]" />
    ),
  },
};

function ModalAlert({
  title,
  description,
  variant,
  icon,
  isOpen,
  onClose,
}: {
  title: string;
  description: React.ReactNode;
  variant: ModalVariant;
  icon: React.ReactElement;
  isOpen: boolean;
  onClose: () => void;
}) {
  const style = variants[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${variant}-modal-title`}
            aria-describedby={`${variant}-modal-desc`}
            className="fixed z-50 inset-0 flex items-center justify-center p-4"
          >
            <div
              className={`max-w-lg w-full rounded-sm bg-background border ${style.border} shadow-lg p-5 flex flex-col space-y-4`}
            >
              <div className={`flex flex-col items-start gap-3 mb-5 rounded`}>
                <h2
                  id={`${variant}-modal-title`}
                  className={`flex items-center gap-2 text-lg font-semibold ${style.text}`}
                >
                  {icon}
                  {title}
                </h2>
                <div
                  id={`${variant}-modal-desc`}
                  className="text-sm text-foreground/80"
                >
                  {description}
                </div>
              </div>
              <button
                onClick={onClose}
                className={`px-4 py-3 cursor-pointer rounded text-white ${style.buttonBg} ${style.buttonHover} transition-all duration-500`}
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function SmipleModalAlert() {
  const [openModal, setOpenModal] = useState<ModalVariant | null>(null);

  const [reminderSeconds, setReminderSeconds] = useState(5);

  useEffect(() => {
    if (openModal === "reminder") {
      const interval = setInterval(() => {
        setReminderSeconds((prev) => (prev > 1 ? prev - 1 : 5));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [openModal]);

  const modals: ModalData[] = [
    {
      key: "success",
      title: "Success",
      description: "Your operation was completed successfully.",
      variant: "success",
      icon: variants.success.icon,
    },
    {
      key: "info",
      title: "Information",
      description: (
        <div className="text-sm space-y-2 text-blue-500">
          <p className="text-sm text-foreground/80">
            Here is some important information for you :
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/80">
            <li>Point one about the information.</li>
            <li>Additional important detail included here.</li>
            <li>Helpful suggestions or reminders.</li>
          </ul>
        </div>
      ),
      variant: "info",
      icon: variants.info.icon,
    },
    {
      key: "error",
      title: "Error",
      description: "This action could have serious consequences.",
      variant: "error",
      icon: variants.error.icon,
    },
    {
      key: "loading",
      title: "Loading",
      description: "Please wait while we process your request.",
      variant: "loading",
      icon: variants.loading.icon,
    },
    {
      key: "reminder",
      title: "Reminder",
      description: (
        <div className="flex flex-col gap-2 text-indigo-500">
          <p className="text-sm text-foreground/80">
            Do not forget to check your tasks for today.
          </p>
          <p className="font-semibold" id="reminder-timer">
            Timer:{" "}
            <span className="inline-block" id="reminder-timer-value">
              5
            </span>
            s
          </p>
        </div>
      ),
      variant: "reminder",
      icon: variants.reminder.icon,
    },
    {
      key: "notification",
      title: "Notification",
      description: "You have a new notification.",
      variant: "notification",
      icon: variants.notification.icon,
    },
  ];

  return (
    <>
      <main className="flex flex-col items-center justify-center m-auto gap-4 p-6 sm:p-10 overflow-auto max-w-4xl w-full h-full">
        {modals.map(({ key, title, variant }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            className="w-80"
          >
            <button
              onClick={() => setOpenModal(key)}
              className={`w-full py-4 cursor-pointer rounded-sm text-white font-medium ${variants[variant].buttonBg} ${variants[variant].buttonHover} hover:scale-105 transition-all duration-500`}
            >
              Open {title} Modal
            </button>
          </motion.div>
        ))}
      </main>

      {modals.map(({ key, title, description, variant, icon }) => (
        <ModalAlert
          key={key}
          title={title}
          description={
            variant === "reminder" ? (
              <div className="flex flex-col gap-2 text-indigo-500">
                <p>Do not forget to check your tasks for today.</p>
                <p className="font-semibold">Timer: {reminderSeconds}s</p>
              </div>
            ) : (
              description
            )
          }
          variant={variant}
          icon={icon}
          isOpen={openModal === key}
          onClose={() => setOpenModal(null)}
        />
      ))}
    </>
  );
}
