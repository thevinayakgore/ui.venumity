"use client";
import { motion } from "framer-motion";
import { ArrowRight, Code, Palette, Rocket, Settings } from "lucide-react";
import { useState } from "react";

interface Feature {
  id: number;
   icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  details: string[];
}

const features: Feature[] = [
  {
    id: 1,
    icon: Code,
    title: "Developer Experience",
    description: "Built by developers, for developers. Clean APIs and extensive documentation.",
    details: ["TypeScript support", "RESTful & GraphQL APIs", "Comprehensive SDKs", "Real-time updates"],
  },
  {
    id: 2,
    icon: Palette,
    title: "Customizable Design",
    description: "Make it yours with unlimited customization options and themes.",
    details: ["Custom themes", "White-label options", "CSS-in-JS support", "Design tokens"],
  },
  {
    id: 3,
    icon: Rocket,
    title: "Performance",
    description: "Lightning-fast load times with edge optimization.",
    details: ["Edge caching", "Image optimization", "Code splitting", "Lazy loading"],
  },
  {
    id: 4,
    icon: Settings,
    title: "Automation",
    description: "Automate repetitive tasks and focus on what matters.",
    details: ["Workflow builder", "Scheduled tasks", "Webhooks", "CI/CD integration"],
  },
];

export default function TabFeatures() {
  const [activeFeature, setActiveFeature] = useState(features[0]);

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
          Built for modern teams
        </h2>
        <p className="text-muted-foreground text-lg">
          Discover the features that make our platform stand out.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 w-full items-center">
        <div className="space-y-4">
          {features.map((feature) => (
            <motion.button
              key={feature.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: feature.id * 0.1 }}
              onClick={() => setActiveFeature(feature)}
              className={`w-full p-4 rounded-xl text-left transition-all ${
                activeFeature.id === feature.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card dark:bg-card border border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-4">
                <feature.icon className="w-5 h-5" />
                <span className="font-medium">{feature.title}</span>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.div
          key={activeFeature.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 rounded-3xl bg-card dark:bg-card border border-border"
        >
          <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-6">
            <activeFeature.icon className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-foreground dark:text-foreground mb-4">
            {activeFeature.title}
          </h3>
          <p className="text-muted-foreground mb-6">{activeFeature.description}</p>
          <ul className="space-y-3 mb-6">
            {activeFeature.details.map((detail) => (
              <li key={detail} className="flex items-center gap-3 text-foreground dark:text-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {detail}
              </li>
            ))}
          </ul>
          <button className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all">
            Learn more <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </motion.main>
  );
}
