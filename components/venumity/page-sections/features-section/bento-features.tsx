"use client";
import { motion } from "framer-motion";
import { Layers, Workflow, Cpu, Globe, ShieldCheck, Gauge } from "lucide-react";

interface Feature {
   icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const features: Feature[] = [
  { icon: Layers, title: "Modular Architecture", description: "Build with composable, reusable components" },
  { icon: Workflow, title: "Seamless Workflows", description: "Streamline your processes effortlessly" },
  { icon: Cpu, title: "AI-Powered", description: "Intelligent automation at your fingertips" },
  { icon: Globe, title: "Global Scale", description: "Deploy anywhere with edge optimization" },
  { icon: ShieldCheck, title: "Enterprise Security", description: "Bank-level security and compliance" },
  { icon: Gauge, title: "Real-time Monitoring", description: "Track performance in real-time" },
];

export default function BentoFeatures() {
  const Feature0Icon = features[0].icon;
  const Feature1Icon = features[1].icon;
  const Feature2Icon = features[2].icon;
  const Feature3Icon = features[3].icon;
  const Feature4Icon = features[4].icon;

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
          Powerful features,{" "}
          <span className="text-gradient">beautifully designed</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2 p-8 rounded-3xl bg-linear-to-br from-primary to-accent text-primary-foreground"
        >
          <Feature0Icon className="w-10 h-10 mb-4" />
          <h3 className="text-2xl font-bold mb-2">{features[0].title}</h3>
          <p className="text-primary-foreground/80">{features[0].description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-8 rounded-3xl bg-card dark:bg-card border border-border"
        >
          <Feature1Icon className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-xl font-bold text-foreground dark:text-foreground mb-2">{features[1].title}</h3>
          <p className="text-muted-foreground text-sm">{features[1].description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-8 rounded-3xl bg-card dark:bg-card border border-border"
        >
          <Feature2Icon className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-xl font-bold text-foreground dark:text-foreground mb-2">{features[2].title}</h3>
          <p className="text-muted-foreground text-sm">{features[2].description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-8 rounded-3xl bg-card dark:bg-card border border-border"
        >
          <Feature3Icon className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-xl font-bold text-foreground dark:text-foreground mb-2">{features[3].title}</h3>
          <p className="text-muted-foreground text-sm">{features[3].description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="md:col-span-2 lg:col-span-1 p-8 rounded-3xl bg-secondary"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Feature4Icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground dark:text-foreground">{features[4].title}</h3>
              <p className="text-muted-foreground text-sm">{features[4].description}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
