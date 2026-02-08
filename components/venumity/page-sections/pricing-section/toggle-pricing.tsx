"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";

interface Plan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  { name: "Basic", monthlyPrice: 12, yearlyPrice: 120, features: ["10 projects", "5GB storage", "Basic support"] },
  { name: "Professional", monthlyPrice: 39, yearlyPrice: 390, features: ["Unlimited projects", "50GB storage", "Priority support", "Advanced analytics", "Custom domains"], popular: true },
  { name: "Business", monthlyPrice: 79, yearlyPrice: 790, features: ["Everything in Pro", "Unlimited storage", "Dedicated manager", "SLA guarantee", "API access", "White-label"] },
];

export default function TogglePricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground dark:text-foreground mb-4">
          Choose your plan
        </h2>
        <div className="flex items-center justify-center gap-4 mt-8">
          <span className={`text-sm ${!isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>Monthly</span>
          <button onClick={() => setIsYearly(!isYearly)} className="relative w-14 h-7 rounded-full bg-secondary p-1 transition-colors">
            <div className={`w-5 h-5 rounded-full bg-primary transition-transform ${isYearly ? "translate-x-7" : "translate-x-0"}`} />
          </button>
          <span className={`text-sm ${isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>
            Yearly <span className="text-success font-medium">(Save 20%)</span>
          </span>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 w-full">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className={`p-8 rounded-3xl border ${plan.popular ? "border-primary bg-primary/5" : "border-border bg-card dark:bg-card"}`}
          >
            {plan.popular && <span className="text-primary text-sm font-medium">Recommended</span>}
            <h3 className="text-xl font-semibold text-foreground dark:text-foreground mt-2">{plan.name}</h3>
            <div className="mt-4 mb-6">
              <span className="text-4xl font-bold text-foreground dark:text-foreground">
                ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
              </span>
              <span className="text-muted-foreground">/{isYearly ? "year" : "month"}</span>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground dark:text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <button className={`w-full py-3 rounded-xl font-medium transition-opacity hover:opacity-90 ${plan.popular ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground dark:text-foreground"}`}>
              Start Free Trial
            </button>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
