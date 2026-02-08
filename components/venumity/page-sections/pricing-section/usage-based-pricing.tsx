"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Minus, Plus } from "lucide-react";

export default function UsageBasedPricing() {
  const [users, setUsers] = useState(5);
  const basePrice = 10;
  const pricePerUser = 8;
  const total = basePrice + users * pricePerUser;

  const features = ["All features included", "Unlimited projects", "Priority support", "Custom integrations"];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground dark:text-foreground mb-4">
          Pay for what you use
        </h2>
        <p className="text-muted-foreground text-lg">Scale up or down as your team grows</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-lg p-8 rounded-3xl bg-card dark:bg-card border border-border"
      >
        <div className="text-center mb-8">
          <div className="text-sm text-muted-foreground mb-2">Team size</div>
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setUsers(Math.max(1, users - 1))}
              className="p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Minus className="w-5 h-5 text-foreground" />
            </button>
            <div className="text-4xl font-bold text-foreground dark:text-foreground w-20 text-center">{users}</div>
            <button
              onClick={() => setUsers(users + 1)}
              className="p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Plus className="w-5 h-5 text-foreground" />
            </button>
          </div>
          <div className="text-sm text-muted-foreground mt-2">users</div>
        </div>

        <div className="p-6 rounded-2xl bg-secondary mb-8">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-muted-foreground">Base price</span>
            <span className="text-foreground dark:text-foreground">${basePrice}/mo</span>
          </div>
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-muted-foreground">{users} users × ${pricePerUser}</span>
            <span className="text-foreground dark:text-foreground">${users * pricePerUser}/mo</span>
          </div>
          <div className="pt-4 border-t border-border flex items-baseline justify-between">
            <span className="font-semibold text-foreground dark:text-foreground">Total</span>
            <span className="text-3xl font-bold text-primary">${total}/mo</span>
          </div>
        </div>

        <ul className="space-y-3 mb-8">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <Check className="w-4 h-4 text-primary" />
              <span className="text-foreground dark:text-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        <button className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
          Get Started
        </button>
      </motion.div>
    </motion.main>
  );
}
