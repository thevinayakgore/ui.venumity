"use client";
import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";

interface ComparisonItem {
  feature: string;
  us: boolean;
  others: boolean;
}

const comparison: ComparisonItem[] = [
  { feature: "Unlimited projects", us: true, others: false },
  { feature: "Real-time collaboration", us: true, others: true },
  { feature: "Custom domains", us: true, others: false },
  { feature: "Priority support", us: true, others: false },
  { feature: "Advanced analytics", us: true, others: true },
  { feature: "API access", us: true, others: false },
  { feature: "White-label options", us: true, others: false },
  { feature: "99.9% uptime SLA", us: true, others: false },
];

export default function ComparisonFeatures() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground dark:text-foreground mb-4">
          Why choose us?
        </h2>
        <p className="text-muted-foreground text-lg">
          See how we stack up against the competition.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-3xl mx-auto rounded-3xl bg-card dark:bg-card border border-border overflow-hidden"
      >
        <div className="grid grid-cols-3 p-6 bg-secondary text-center font-semibold">
          <div className="text-left text-foreground dark:text-foreground">Feature</div>
          <div className="text-primary">Our Platform</div>
          <div className="text-muted-foreground">Others</div>
        </div>

        <div className="divide-y divide-border">
          {comparison.map((item, index) => (
            <motion.div
              key={item.feature}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="grid grid-cols-3 p-6 text-center items-center"
            >
              <div className="text-left text-foreground dark:text-foreground">{item.feature}</div>
              <div>
                {item.us ? (
                  <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center mx-auto">
                    <Check className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-destructive/20 text-destructive flex items-center justify-center mx-auto">
                    <X className="w-4 h-4" />
                  </div>
                )}
              </div>
              <div>
                {item.others ? (
                  <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center mx-auto">
                    <Check className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-destructive/20 text-destructive flex items-center justify-center mx-auto">
                    <X className="w-4 h-4" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-6 bg-secondary text-center">
          <button className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto">
            Get Started
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </motion.main>
  );
}
