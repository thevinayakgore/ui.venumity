"use client";
import { motion } from "framer-motion";
import { PanelTop, SplitSquareVertical, CircleDot } from "lucide-react";

type FeatureItem = {
  title: string;
  description: string;
};

export default function FeaturesHighlightCard() {
  const main: FeatureItem = {
    title: "Design systems that match how your team actually builds.",
    description:
      "Tokens, components, and usage guidance built side-by-side with your engineering stack, so implementation moves quickly.",
  };

  const secondary: FeatureItem[] = [
    {
      title: "Token-driven styling",
      description:
        "Structure that covers spacing, color, typography, and motion in one consistent language.",
    },
    {
      title: "Component libraries",
      description:
        "Composable building blocks that reduce decisions for common patterns and states.",
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-6 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-6xl w-full h-full"
    >
      <section className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-sm px-6 py-7 sm:px-8 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <article className="space-y-3 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900">
                <PanelTop className="h-4 w-4" />
              </div>
              <p className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                Design systems
              </p>
            </div>
            <p className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-50">
              {main.title}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {main.description}
            </p>
          </article>

          <div className="space-y-4">
            {secondary.map((item) => (
              <article
                key={item.title}
                className="flex gap-3 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-4"
              >
                <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900">
                  {item.title.includes("Token") ? (
                    <CircleDot className="h-3.5 w-3.5" />
                  ) : (
                    <SplitSquareVertical className="h-3.5 w-3.5" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  );
}
