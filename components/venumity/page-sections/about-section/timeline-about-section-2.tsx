"use client";
import { motion } from "framer-motion";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const timeline: TimelineItem[] = [
  { year: "2014", title: "Company Founded", description: "Started with a vision to transform digital experiences" },
  { year: "2016", title: "First Major Client", description: "Partnered with Fortune 500 companies" },
  { year: "2019", title: "Global Expansion", description: "Opened offices in 5 new countries" },
  { year: "2022", title: "Innovation Award", description: "Recognized for breakthrough technology solutions" },
  { year: "2024", title: "Industry Leader", description: "Serving 1000+ clients worldwide" },
];

export default function TimelineAbout() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground dark:text-foreground mb-4">
          Our Journey
        </h2>
        <p className="text-muted-foreground text-lg">
          A decade of innovation, growth, and excellence in delivering world-class solutions.
        </p>
      </motion.div>

      <div className="relative w-full max-w-4xl">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border" />
        
        {timeline.map((item, index) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.15 }}
            className={`relative flex items-center mb-8 ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}>
              <div className="p-6 rounded-2xl bg-card dark:bg-card border border-border hover:border-primary/50 transition-colors">
                <span className="text-primary font-bold text-xl">{item.year}</span>
                <h3 className="text-xl font-semibold text-foreground dark:text-foreground mt-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mt-2">{item.description}</p>
              </div>
            </div>
            
            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background dark:border-background" />
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
