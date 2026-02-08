"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MessageCircle, X, Plus } from "lucide-react";
import { useState } from "react";

interface ContactOption {
  icon: React.ReactNode;
  label: string;
  href: string;
  bgColor: string;
}

export default function FloatingContactInfo() {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions: ContactOption[] = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      href: "mailto:support@company.com",
      bgColor: "bg-blue-500 hover:bg-blue-600",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Call",
      href: "tel:+15551234567",
      bgColor: "bg-emerald-500 hover:bg-emerald-600",
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "Chat",
      href: "#",
      bgColor: "bg-violet-500 hover:bg-violet-600",
    },
  ];

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 20,
        delay: i * 0.1,
      },
    }),
    exit: (i: number) => ({
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
        delay: (contactOptions.length - 1 - i) * 0.05,
      },
    }),
  };

  const labelVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.1 },
    },
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="relative w-full min-h-[400px] bg-secondary/30 dark:bg-secondary/20 rounded-2xl flex items-center justify-center">
        <p className="text-muted-foreground text-center px-4">
          Click the floating button to reveal contact options
        </p>

        <div className="fixed bottom-8 right-8 flex flex-col-reverse items-end gap-3">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-20 right-0 bg-card dark:bg-card rounded-xl border border-border shadow-xl p-4 min-w-[200px]"
              >
                <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">
                  Get in touch
                </p>
                <div className="space-y-2">
                  {contactOptions.map((option, index) => (
                    <motion.a
                      key={index}
                      href={option.href}
                      custom={index}
                      variants={buttonVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary dark:hover:bg-secondary transition-colors"
                    >
                      <div className={`${option.bgColor} p-2 rounded-lg text-white`}>
                        {option.icon}
                      </div>
                      <motion.span
                        variants={labelVariants}
                        className="font-medium text-foreground"
                      >
                        {option.label}
                      </motion.span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ rotate: isOpen ? 45 : 0 }}
            className="w-14 h-14 bg-linear-to-br from-primary to-primary/80 text-primary-foreground rounded-full shadow-lg shadow-primary/30 flex items-center justify-center"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>
    </motion.main>
  );
}
