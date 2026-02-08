"use client";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

export default function SplitHero() {
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
          className="space-y-8"
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-warning text-warning" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">Trusted by 10,000+ users</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-foreground dark:text-foreground leading-tight">
            The smarter way to manage your work
          </h1>

          <p className="text-lg text-muted-foreground">
            Say goodbye to chaos and hello to clarity. Our platform helps you 
            organize, track, and deliver projects on time, every time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-4 rounded-2xl border border-border text-foreground dark:text-foreground hover:bg-secondary transition-colors">
              Learn More
            </button>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div>
              <div className="text-2xl font-bold text-foreground dark:text-foreground">50K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <div className="text-2xl font-bold text-foreground dark:text-foreground">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <div className="text-2xl font-bold text-foreground dark:text-foreground">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl bg-linear-to-br from-primary/20 to-accent/20 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3/4 h-3/4 rounded-2xl bg-card dark:bg-card border border-border shadow-2xl" />
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 p-4 rounded-2xl bg-card dark:bg-card border border-border shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center text-success-foreground">
                ✓
              </div>
              <div>
                <div className="font-medium text-foreground dark:text-foreground">Setup Complete</div>
                <div className="text-xs text-muted-foreground">Ready to go!</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
