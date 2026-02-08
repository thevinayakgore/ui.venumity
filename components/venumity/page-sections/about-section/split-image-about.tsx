"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface FeatureItem {
  text: string;
}

const features: FeatureItem[] = [
  { text: "Industry-leading expertise" },
  { text: "24/7 dedicated support" },
  { text: "Scalable solutions" },
  { text: "Proven track record" },
];

export default function SplitImageAbout() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl bg-linear-to-br from-primary/20 to-accent/20 overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800')] bg-cover bg-center" />
          </div>
          <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-2xl bg-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">Years of Excellence</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground dark:text-foreground">
              Building the future, one project at a time
            </h2>
            <p className="text-muted-foreground text-lg">
              We are passionate about creating innovative solutions that help businesses 
              thrive in the digital age. Our approach combines strategic thinking with 
              cutting-edge technology.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-foreground dark:text-foreground">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          <button className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
            Get Started
          </button>
        </motion.div>
      </div>
    </motion.main>
  );
}
