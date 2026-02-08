"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function SimpleCTA() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground dark:text-foreground mb-6">
          Ready to get started?
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Join thousands of satisfied customers using our platform to grow their business.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            Start Free Trial
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-border text-foreground dark:text-foreground hover:bg-secondary transition-colors">
            Talk to Sales
          </button>
        </div>
      </motion.div>
    </motion.main>
  );
}
