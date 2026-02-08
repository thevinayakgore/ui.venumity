"use client";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export default function CenteredHero() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <div className="text-center max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
        >
          Introducing the next generation
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-display text-foreground dark:text-foreground mb-6 leading-tight"
        >
          Build better products with{" "}
          <span className="text-gradient">intelligent tools</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Streamline your workflow, boost productivity, and deliver exceptional 
          results with our powerful platform designed for modern teams.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-border text-foreground dark:text-foreground hover:bg-secondary transition-colors flex items-center justify-center gap-2">
            <Play className="w-4 h-4" />
            Watch Demo
          </button>
        </motion.div>
      </div>
    </motion.main>
  );
}
