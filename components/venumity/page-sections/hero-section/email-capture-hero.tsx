"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function EmailCaptureHero() {
  const [email, setEmail] = useState("");

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-foreground dark:text-foreground leading-tight">
            Launch your startup in{" "}
            <span className="text-gradient">record time</span>
          </h1>

          <p className="text-lg text-muted-foreground">
            Get everything you need to go from idea to launch. 
            Join the waitlist and be first to experience the future.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(email);
            }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-5 py-4 rounded-xl bg-card dark:bg-card border border-border focus:border-primary outline-none text-foreground"
            />
            <button
              type="submit"
              className="px-6 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Join Waitlist
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="flex flex-wrap items-center gap-6">
            {["No credit card required", "Free forever plan", "Cancel anytime"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-success" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <div className="aspect-4/3 rounded-3xl bg-card dark:bg-card border border-border overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-warning" />
                <div className="w-3 h-3 rounded-full bg-success" />
              </div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-3 rounded bg-secondary" style={{ width: `${100 - i * 15}%` }} />
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute -bottom-4 -right-4 p-4 rounded-2xl bg-primary text-primary-foreground shadow-lg"
          >
            <div className="text-2xl font-bold">2,847</div>
            <div className="text-xs opacity-80">People waiting</div>
          </motion.div>
        </motion.div>
      </div>
    </motion.main>
  );
}
