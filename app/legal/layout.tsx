"use client";
import { motion } from "motion/react";
import { ReactNode } from "react";

export function FadeIn({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FadeIn className="w-full">
      <div className="prose prose-sm sm:prose dark:prose-invert  font-normal 2xl:border-x-2 border-dashed overflow-hidden max-w-360 m-auto w-full">
        {children}
      </div>
    </FadeIn>
  );
}
