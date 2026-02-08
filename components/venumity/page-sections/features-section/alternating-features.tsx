"use client";
import { motion } from "framer-motion";
import { Sparkles, Timer, TrendingUp, Lightbulb, Shield, Zap } from "lucide-react";

interface Feature {
   icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const features: Feature[] = [
  { icon: Sparkles, title: "AI Assistant", description: "Smart suggestions powered by machine learning" },
  { icon: Timer, title: "Save Time", description: "Automate repetitive tasks instantly" },
  { icon: TrendingUp, title: "Boost Growth", description: "Data-driven insights for better decisions" },
  { icon: Lightbulb, title: "Innovation", description: "Stay ahead with cutting-edge features" },
  { icon: Shield, title: "Reliability", description: "Enterprise-grade infrastructure" },
  { icon: Zap, title: "Speed", description: "Optimized for maximum performance" },
];

export default function AlternatingFeatures() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
          Why Us
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground dark:text-foreground">
          Features that matter
        </h2>
      </motion.div>

      <div className="space-y-24 w-full">
        {features.slice(0, 3).map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.2 }}
            className={`grid lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <div className="p-4 rounded-2xl bg-primary/10 text-primary w-fit mb-6">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-foreground dark:text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-lg text-muted-foreground mb-6">{feature.description}</p>
              <ul className="space-y-3">
                {["Feature benefit one", "Feature benefit two", "Feature benefit three"].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-foreground dark:text-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`aspect-video rounded-3xl bg-linear-to-br from-primary/10 to-accent/10 ${
              index % 2 === 1 ? "lg:order-1" : ""
            }`}>
              <div className="w-full h-full flex items-center justify-center">
                <feature.icon className="w-24 h-24 text-primary/20" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
