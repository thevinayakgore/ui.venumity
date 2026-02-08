"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function GradientHero() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <div className="relative w-full rounded-3xl overflow-hidden bg-linear-to-br from-primary via-primary to-accent p-8 sm:p-12 lg:p-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-display text-primary-foreground mb-6 leading-tight"
          >
            Unlock your team&apos;s potential
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10"
          >
            The all-in-one workspace for teams who want to move fast, 
            stay aligned, and build amazing things together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-background dark:bg-background text-foreground font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors">
              View Pricing
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex items-center justify-center gap-8"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-primary-foreground/20 border-2 border-primary"
                />
              ))}
            </div>
            <p className="text-sm text-primary-foreground/80">
              Join <span className="font-semibold text-primary-foreground">2,000+</span> teams already using our platform
            </p>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
}
