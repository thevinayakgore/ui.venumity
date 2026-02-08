"use client";
import { motion } from "framer-motion";
import { Zap, Shield, BarChart, Users, Cloud, Lock } from "lucide-react";

interface Feature {
   icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const features: Feature[] = [
  { icon: Zap, title: "Lightning Fast", description: "Blazing fast performance with optimized delivery" },
  { icon: Shield, title: "Secure by Default", description: "Enterprise-grade security built into every layer" },
  { icon: BarChart, title: "Analytics", description: "Deep insights to understand your users better" },
  { icon: Users, title: "Team Collaboration", description: "Work together seamlessly with your team" },
  { icon: Cloud, title: "Cloud Native", description: "Built for the modern cloud infrastructure" },
  { icon: Lock, title: "Privacy First", description: "Your data stays yours, always encrypted" },
];

export default function GridFeatures() {
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
        <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
          Features
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground dark:text-foreground mb-4">
          Everything you need
        </h2>
        <p className="text-muted-foreground text-lg">
          Powerful features to help you build, scale, and succeed.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="group p-6 rounded-2xl bg-card dark:bg-card border border-border hover:border-primary/50 transition-all duration-300"
          >
            <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-foreground dark:text-foreground mb-2">
              {feature.title}
            </h3>
            <p className="text-muted-foreground text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
