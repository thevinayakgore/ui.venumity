"use client";
import { motion } from "motion/react";
import { MessageSquare, Mail, Slack } from "lucide-react";

type Channel = {
  label: string;
  description: string;
  response: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export default function ContactInfoSupportChannels() {
  const channels: Channel[] = [
    {
      label: "Support inbox",
      description: "Structured tickets, async responses, and clear history.",
      response: "< 24h on weekdays",
      icon: Mail,
    },
    {
      label: "Shared Slack",
      description: "Fast back-and-forth for active projects.",
      response: "Same-day for active engagements",
      icon: Slack,
    },
    {
      label: "Project comments",
      description: "Design files and docs with inline feedback.",
      response: "Within 48h",
      icon: MessageSquare,
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <section className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-6 py-7 sm:px-8 sm:py-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
              Support
            </p>
            <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
              Choose the channel that fits the type of question you have.
            </p>
          </div>
          <div className="grid w-full max-w-xl gap-4 sm:grid-cols-3">
            {channels.map(({ label, description, response, icon: Icon }) => (
              <article
                key={label}
                className="flex flex-col rounded-xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-black p-4"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900">
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-50">
                    {label}
                  </p>
                </div>
                <p className="mt-2 text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400">
                  {description}
                </p>
                <p className="mt-3 text-[11px] text-neutral-500 dark:text-neutral-400">
                  Typical response: {response}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  );
}
