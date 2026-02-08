"use client";
import { motion } from "framer-motion";
import { Clock, MapPin, Send } from "lucide-react";

export default function ContactSplitPanel() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-5xl w-full h-full"
    >
      <section className="w-full grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-sm overflow-hidden">
        <div className="px-6 py-7 sm:px-8 sm:py-8 lg:px-9">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
            Contact
          </p>
          <h2 className="mt-2 text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
            Share a short brief and get a structured next step.
          </h2>
          <form className="mt-5 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                Company or product name
              </label>
              <input
                type="text"
                placeholder="Acme Inc."
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
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                  Budget range
                </label>
                <select
                  className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-50 outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-200"
                  defaultValue="25-50"
                >
                  <option value="under-25">Under $25k</option>
                  <option value="25-50">$25k – $50k</option>
                  <option value="50-100">$50k – $100k</option>
                  <option value="over-100">$100k+</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                  Timeline
                </label>
                <select
                  className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-50 outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-200"
                  defaultValue="4-8"
                >
                  <option value="now">Starting now</option>
                  <option value="0-4">0–4 weeks</option>
                  <option value="4-8">4–8 weeks</option>
                  <option value="later">Exploring options</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                Project context
              </label>
              <textarea
                rows={4}
                placeholder="Share a quick outline of where the product is today and what needs to move next."
                className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-50 outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-200 resize-none"
              />
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              <Send className="h-4 w-4" />
              Submit
            </button>
          </form>
        </div>

        <aside className="flex flex-col justify-between border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-6 py-6 sm:px-7 sm:py-8 lg:border-l lg:border-t-0">
          <div className="space-y-3">
            <p className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
              Availability
            </p>
            <div className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
              <Clock className="h-4 w-4" />
              <span>Bookings open for Q2 and Q3.</span>
            </div>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              Typical projects run between 6–10 weeks with clear milestones and async updates.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <p className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
              Studio location
            </p>
            <div className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
              <MapPin className="mt-0.5 h-4 w-4" />
              <div>
                <p>Berlin, Germany</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Working async with teams in Europe and North America.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </motion.main>
  );
}
