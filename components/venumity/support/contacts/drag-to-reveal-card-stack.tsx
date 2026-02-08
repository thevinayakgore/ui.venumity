"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactInfoDraggableStack() {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-160, 0, 160], [-10, 0, 10]);

  const items = [
    {
      icon: Mail,
      label: "Email",
      value: "studio@example.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (407) 555-0199",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Berlin, Germany · Remote-friendly",
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-10 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full bg-white dark:bg-black"
    >
      <section className="w-full max-w-sm">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
          Contact
        </p>
        <div className="relative h-56">
          {items.map((item, index) => {
            const depth = items.length - index;
            const offset = depth * 14;

            const Icon = item.icon;

            const isTop = index === 0;

            return (
              <motion.div
                key={item.label}
                style={isTop ? { x, rotate } : {}}
                drag={isTop ? "x" : undefined}
                dragConstraints={{ left: -160, right: 160 }}
                dragMomentum={false}
                dragElastic={0.2}
                whileTap={isTop ? { scale: 0.97 } : {}}
                className="absolute inset-x-0 flex justify-center"
              >
                <div
                  className="w-full max-w-xs rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-4 py-4"
                  style={{
                    top: offset,
                    transform: `scale(${1 - index * 0.04})`,
                    opacity: 1 - index * 0.12,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-50">
                        {item.label}
                      </p>
                      <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <p className="mt-3 text-[11px] text-neutral-500 dark:text-neutral-400">
          Drag the top card left or right to explore contact details.
        </p>
      </section>
    </motion.main>
  );
}
