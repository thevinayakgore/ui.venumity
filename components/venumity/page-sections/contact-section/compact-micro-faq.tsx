"use client";
import { motion } from "framer-motion";
import { HelpCircle, Mail } from "lucide-react";

type MiniFaq = {
  question: string;
  answer: string;
};

export default function ContactWithMiniFaq() {
  const faqs: MiniFaq[] = [
    {
      question: "What types of projects are a good fit?",
      answer:
        "Product design, UX for SaaS, design systems, and interface motion work with clear ownership.",
    },
    {
      question: "How do engagements usually start?",
      answer:
        "With a short intro call, followed by a written summary of scope, timeline, and recommended format.",
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-5xl w-full h-full"
    >
      <section className="w-full grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-sm p-6 sm:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
            Contact
          </p>
          <h2 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-semibold text-neutral-900 dark:text-neutral-50">
            Tell a bit about your product and where you want it to go.
          </h2>
          <form className="mt-5 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                Full name
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
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                What would you like to work on?
              </label>
              <textarea
                rows={4}
                placeholder="Share product context, constraints, and any links that help understand the surface."
                className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-50 outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-200 resize-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              <Mail className="h-4 w-4" />
              Send message
            </button>
          </form>
        </div>

        <aside className="space-y-4 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900">
              <HelpCircle className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Not sure where to start?
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                These are a few common questions that come up early in projects.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((item) => (
              <details
                key={item.question}
                className="group rounded-lg border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-black px-3 py-2"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-medium text-neutral-800 dark:text-neutral-200">
                  {item.question}
                  <span className="ml-2 text-neutral-400 group-open:rotate-90 transition-transform">
                    →
                  </span>
                </summary>
                <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </aside>
      </section>
    </motion.main>
  );
}
