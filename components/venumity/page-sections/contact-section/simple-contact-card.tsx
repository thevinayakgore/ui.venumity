"use client";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Phone } from "lucide-react";

export default function ContactSimpleCard() {
  const channels = [
    {
      icon: Mail,
      label: "Email",
      value: "studio@example.com",
    },
    {
      icon: Phone,
      label: "Call",
      value: "+1 (407) 555-0199",
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <section className="w-full max-w-2xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-sm p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
              Contact
            </p>
            <p className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-50">
              Start a conversation about your next product iteration.
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Share a quick outline of your team, product, and where you need help. You will receive a thoughtful reply within two working days.
            </p>
          </div>
        </div>

        <form className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                Name
              </label>
              <input
                type="text"
                placeholder="Alex Doe"
                className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-50 outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-200"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                Work email
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-50 outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-200"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
              What do you need help with?
            </label>
            <textarea
              rows={4}
              placeholder="Share a short overview of your product, timeline, and what you are looking for."
              className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-50 outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-200 resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              <Mail className="h-4 w-4" />
              Send message
            </button>
            <div className="flex flex-wrap gap-4 text-xs text-neutral-500 dark:text-neutral-400">
              {channels.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <div className="flex flex-col">
                    <span className="font-medium">{label}</span>
                    <span>{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
      </section>
    </motion.main>
  );
}
