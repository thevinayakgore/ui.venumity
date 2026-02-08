"use client";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

interface Feature {
  name: string;
  starter: boolean;
  pro: boolean;
  enterprise: boolean;
}

const features: Feature[] = [
  { name: "Projects", starter: true, pro: true, enterprise: true },
  { name: "Team members", starter: true, pro: true, enterprise: true },
  { name: "Storage", starter: true, pro: true, enterprise: true },
  { name: "Analytics", starter: false, pro: true, enterprise: true },
  { name: "Custom domains", starter: false, pro: true, enterprise: true },
  { name: "API Access", starter: false, pro: false, enterprise: true },
  { name: "Dedicated support", starter: false, pro: false, enterprise: true },
  { name: "SLA", starter: false, pro: false, enterprise: true },
];

const plans = [
  { name: "Starter", price: "$0", description: "Free forever" },
  { name: "Pro", price: "$49", description: "Per month" },
  { name: "Enterprise", price: "Custom", description: "Contact us" },
];

export default function ComparisonPricing() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground dark:text-foreground mb-4">
          Compare plans
        </h2>
      </motion.div>

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              <th className="text-left p-4"></th>
              {plans.map((plan) => (
                <th key={plan.name} className="text-center p-4">
                  <div className="text-lg font-semibold text-foreground dark:text-foreground">{plan.name}</div>
                  <div className="text-2xl font-bold text-primary mt-2">{plan.price}</div>
                  <div className="text-sm text-muted-foreground">{plan.description}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <motion.tr
                key={feature.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 * index }}
                className="border-t border-border"
              >
                <td className="p-4 text-foreground dark:text-foreground">{feature.name}</td>
                <td className="p-4 text-center">
                  {feature.starter ? <Check className="w-5 h-5 text-success mx-auto" /> : <X className="w-5 h-5 text-muted-foreground mx-auto" />}
                </td>
                <td className="p-4 text-center">
                  {feature.pro ? <Check className="w-5 h-5 text-success mx-auto" /> : <X className="w-5 h-5 text-muted-foreground mx-auto" />}
                </td>
                <td className="p-4 text-center">
                  {feature.enterprise ? <Check className="w-5 h-5 text-success mx-auto" /> : <X className="w-5 h-5 text-muted-foreground mx-auto" />}
                </td>
              </motion.tr>
            ))}
            <tr className="border-t border-border">
              <td className="p-4"></td>
              <td className="p-4 text-center"><button className="px-6 py-2 rounded-lg bg-secondary text-foreground font-medium">Get Started</button></td>
              <td className="p-4 text-center"><button className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium">Get Started</button></td>
              <td className="p-4 text-center"><button className="px-6 py-2 rounded-lg bg-secondary text-foreground font-medium">Contact Us</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </motion.main>
  );
}
