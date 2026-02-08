"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "100+", label: "Happy Clients" },
  { value: "50+", label: "Team Members" },
];

export default function MinimalAbout() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            About Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground dark:text-foreground leading-tight">
            We create digital experiences that matter
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Founded in 2014, we&apos;ve been at the forefront of digital innovation, 
            helping businesses transform their ideas into reality. Our team of experts 
            combines creativity with technical excellence to deliver solutions that drive growth.
          </p>
          <button className="inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all duration-300">
            Learn more about us
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="p-6 rounded-2xl bg-card dark:bg-card border border-border text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.main>
  );
}
