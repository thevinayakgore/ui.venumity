"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";

const floatingCards = [
  { icon: Sparkles, label: "AI Powered", x: "10%", y: "20%" },
  { icon: Zap, label: "Lightning Fast", x: "75%", y: "15%" },
  { icon: Shield, label: "Secure", x: "80%", y: "60%" },
];

export default function AnimatedHero() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen relative overflow-hidden"
    >
      {floatingCards.map((card, index) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + index * 0.2, type: "spring" }}
          className="hidden lg:flex absolute p-3 rounded-xl bg-card dark:bg-card border border-border shadow-lg items-center gap-2"
          style={{ left: card.x, top: card.y }}
        >
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <card.icon className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium text-foreground dark:text-foreground">{card.label}</span>
        </motion.div>
      ))}

      <div className="text-center max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-20 h-20 rounded-2xl bg-linear-to-br from-primary to-accent flex items-center justify-center mx-auto mb-8"
        >
          <Sparkles className="w-10 h-10 text-primary-foreground" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-display text-foreground dark:text-foreground mb-6 leading-tight"
        >
          The future of{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gradient inline-block"
          >
            productivity
          </motion.span>{" "}
          is here
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Experience a new way of working that adapts to you. 
          Smart, intuitive, and incredibly powerful.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2"
          >
            Try It Free
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-border text-foreground dark:text-foreground"
          >
            See How It Works
          </motion.button>
        </motion.div>
      </div>
    </motion.main>
  );
}
