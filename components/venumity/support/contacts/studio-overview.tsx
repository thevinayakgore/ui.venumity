"use client";
import { motion } from "motion/react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactInfoStudioOverview() {
  const contactEmail = "studio@example.com";
  const contactPhone = "+1 (407) 555-0199";
  const contactLocation = "Berlin, Germany · Remote-friendly";

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <section className="w-full max-w-3xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-6 py-7 sm:px-8 sm:py-8 shadow-sm">
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
              Contact
            </p>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              A small studio based in Europe, working async with teams across time zones.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900">
                <Mail className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  Email
                </p>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                  {contactEmail}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                <Phone className="h-4.5 w-4.5 text-neutral-800 dark:text-neutral-200" />
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  Phone
                </p>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                  {contactPhone}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                <MapPin className="h-4.5 w-4.5 text-neutral-800 dark:text-neutral-200" />
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  Location
                </p>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                  {contactLocation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
