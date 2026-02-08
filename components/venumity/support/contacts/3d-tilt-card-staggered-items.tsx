"use client";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

type ContactItem = {
  label: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export default function ContactInfoTiltStaggered() {
  const [isHovering, setIsHovering] = useState(false);

  const items: ContactItem[] = [
    {
      label: "Email",
      value: "studio@example.com",
      icon: Mail,
    },
    {
      label: "Phone",
      value: "+1 (407) 555-0199",
      icon: Phone,
    },
    {
      label: "Location",
      value: "Berlin, Germany · Remote-friendly",
      icon: MapPin,
    },
  ];

  const cardVariants = {
    initial: {
      rotateX: 0,
      rotateY: 0,
      boxShadow: "0 18px 40px rgba(0,0,0,0.16)",
    },
    hover: {
      rotateX: -6,
      rotateY: 6,
      boxShadow: "0 30px 80px rgba(0,0,0,0.28)",
      transition: {
        stiffness: 180,
        damping: 16,
        type: "spring" as const
      },
    },
    exit: {
      rotateX: 0,
      rotateY: 0,
      boxShadow: "0 0 0 rgba(0,0,0,0)",
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.15 + index * 0.08, duration: 0.28, ease: easeOut },
    }),
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full bg-white dark:bg-black"
    >
      <div className="relative w-full max-w-xl perspective-[1600px]">
        <AnimatePresence>
          <motion.section
            key="contact-tilt-card"
            variants={cardVariants}
            initial="initial"
            animate={isHovering ? "hover" : "initial"}
            exit="exit"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="relative rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-6 py-7 sm:px-8 sm:py-8 overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(15,23,42,0.09),transparent_52%),radial-gradient(circle_at_100%_0%,rgba(15,23,42,0.07),transparent_55%)] dark:bg-[radial-gradient(circle_at_0%_0%,rgba(248,250,252,0.08),transparent_55%),radial-gradient(circle_at_100%_0%,rgba(248,250,252,0.06),transparent_60%)]" />

            <div className="relative flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-2"
              >
                <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Contact
                </p>
                <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
                  Reach the studio directly for new projects, ongoing work, or
                  quick product questions.
                </p>
              </motion.div>

              <div className="grid gap-4 sm:grid-cols-3">
                {items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.label}
                      type="button"
                      custom={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{
                        y: -4,
                        scale: 1.02,
                        boxShadow: "0 18px 40px rgba(15,23,42,0.20)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 18,
                      }}
                      className="group flex flex-col items-start rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/90 dark:bg-neutral-950/90 px-4 py-3 text-left backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 group-hover:scale-105 transition-transform">
                          <Icon className="h-4 w-4" />
                        </div>
                        <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-50">
                          {item.label}
                        </p>
                      </div>
                      <p className="mt-2 text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400">
                        {item.value}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.section>
        </AnimatePresence>
      </div>
    </motion.main>
  );
}
