"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  { name: "Starter", price: "$9", period: "/month", description: "Perfect for individuals", features: ["5 projects", "10GB storage", "Basic analytics", "Email support"] },
  { name: "Pro", price: "$29", period: "/month", description: "Best for growing teams", features: ["Unlimited projects", "100GB storage", "Advanced analytics", "Priority support", "Custom integrations", "API access"], popular: true },
  { name: "Enterprise", price: "$99", period: "/month", description: "For large organizations", features: ["Everything in Pro", "Unlimited storage", "Dedicated support", "Custom SLA", "SSO & SAML", "Audit logs"] },
];

export default function ThreeColumnPricing() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground dark:text-foreground mb-4">
          Simple, transparent pricing
        </h2>
        <p className="text-muted-foreground text-lg">Choose the plan that works for you</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 w-full">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className={`relative p-8 rounded-3xl border ${plan.popular ? "bg-primary text-primary-foreground border-primary" : "bg-card dark:bg-card border-border"}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                Most Popular
              </div>
            )}
            <div className="mb-6">
              <h3 className={`text-lg font-semibold mb-2 ${plan.popular ? "text-primary-foreground" : "text-foreground dark:text-foreground"}`}>{plan.name}</h3>
              <p className={`text-sm ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{plan.description}</p>
            </div>
            <div className="mb-6">
              <span className={`text-4xl font-bold ${plan.popular ? "text-primary-foreground" : "text-foreground dark:text-foreground"}`}>{plan.price}</span>
              <span className={plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}>{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className={`w-4 h-4 ${plan.popular ? "text-primary-foreground" : "text-primary"}`} />
                  <span className={`text-sm ${plan.popular ? "text-primary-foreground" : "text-foreground dark:text-foreground"}`}>{feature}</span>
                </li>
              ))}
            </ul>
            <button className={`w-full py-3 rounded-xl font-medium transition-opacity hover:opacity-90 ${plan.popular ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground"}`}>
              Get Started
            </button>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
