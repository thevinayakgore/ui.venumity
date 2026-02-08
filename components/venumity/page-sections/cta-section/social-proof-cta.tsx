"use client";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";

export default function SocialProofCTA() {
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-primary/20 border-2 border-background dark:border-background"
              />
            ))}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-warning text-warning" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Loved by 10,000+ users</p>
          </div>
        </motion.div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground dark:text-foreground mb-6">
          Join the community of innovators
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Thousands of teams trust us to power their most important work. 
          See why they made the switch.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            Start Your Free Trial
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-border text-foreground dark:text-foreground hover:bg-secondary transition-colors">
            Read Case Studies
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-50"
        >
          {["Company 1", "Company 2", "Company 3", "Company 4", "Company 5"].map((company) => (
            <span key={company} className="text-lg font-semibold text-muted-foreground">
              {company}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </motion.main>
  );
}
