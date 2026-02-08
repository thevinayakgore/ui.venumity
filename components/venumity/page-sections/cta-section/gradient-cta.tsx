"use client";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const benefits = [
  "14-day free trial",
  "No credit card required",
  "Cancel anytime",
];

export default function GradientCTA() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full p-8 sm:p-12 lg:p-16 rounded-3xl bg-linear-to-br from-primary to-accent text-center"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-primary-foreground mb-6">
          Transform your workflow today
        </h2>
        <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
          Experience the power of our platform with a free trial. No commitments, just results.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-2 text-primary-foreground"
            >
              <div className="w-5 h-5 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Check className="w-3 h-3" />
              </div>
              <span className="text-sm">{benefit}</span>
            </motion.div>
          ))}
        </div>

        <button className="px-8 py-4 rounded-2xl bg-background dark:bg-background text-foreground font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mx-auto">
          Get Started Free
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </motion.main>
  );
}
