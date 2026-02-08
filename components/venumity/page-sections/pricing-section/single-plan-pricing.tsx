"use client";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

export default function SinglePlanPricing() {
  const features = [
    "Unlimited projects",
    "Unlimited team members",
    "100GB storage",
    "Advanced analytics",
    "Priority support",
    "Custom integrations",
    "API access",
    "SSO authentication",
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground dark:text-foreground mb-4">
          One plan, all features
        </h2>
        <p className="text-muted-foreground text-lg">Everything you need to succeed, no hidden costs</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-4xl p-8 sm:p-12 rounded-3xl bg-linear-to-br from-primary to-accent text-primary-foreground"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-6xl font-bold mb-2">$49</div>
            <div className="text-primary-foreground/80 mb-6">per user / month</div>
            <p className="text-primary-foreground/90 mb-8">
              Get full access to all features with no limitations. 
              Start your 14-day free trial today.
            </p>
            <button className="px-8 py-4 rounded-xl bg-primary-foreground text-primary font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-sm text-primary-foreground/70 mt-4">No credit card required</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-center gap-2"
              >
                <div className="w-5 h-5 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-sm">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.main>
  );
}
