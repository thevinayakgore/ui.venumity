"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function SplitCTA() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <div className="grid lg:grid-cols-2 gap-8 w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="p-8 sm:p-12 rounded-3xl bg-primary text-primary-foreground"
        >
          <span className="text-sm font-medium text-primary-foreground/80 mb-4 block">
            For Startups
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold font-display mb-4">
            Build faster, scale smarter
          </h3>
          <p className="text-primary-foreground/80 mb-8">
            Get access to enterprise-grade tools at startup-friendly prices. 
            Launch your MVP in weeks, not months.
          </p>
          <button className="px-6 py-3 rounded-xl bg-primary-foreground text-primary font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
            Explore Startup Plans
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="p-8 sm:p-12 rounded-3xl bg-card dark:bg-card border border-border"
        >
          <span className="text-sm font-medium text-muted-foreground mb-4 block">
            For Enterprise
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-foreground dark:text-foreground mb-4">
            Power your organization
          </h3>
          <p className="text-muted-foreground mb-8">
            Custom solutions, dedicated support, and enterprise security. 
            Everything you need to succeed at scale.
          </p>
          <button className="px-6 py-3 rounded-xl border border-border text-foreground dark:text-foreground hover:bg-secondary transition-colors flex items-center gap-2">
            Contact Sales
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </motion.main>
  );
}
