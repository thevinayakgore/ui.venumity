"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function EmailCaptureCTA() {
  const [email, setEmail] = useState("");

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full p-8 sm:p-12 rounded-3xl bg-card dark:bg-card border border-border text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
        >
          <Sparkles className="w-8 h-8 text-primary" />
        </motion.div>

        <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground dark:text-foreground mb-4">
          Get early access
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto mb-8">
          Be the first to experience our new features. Join the waitlist and get exclusive updates.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(email);
          }}
          className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 w-full px-5 py-4 rounded-xl bg-background dark:bg-background border border-border focus:border-primary outline-none text-foreground"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            Join Waitlist
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-xs text-muted-foreground mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </motion.div>
    </motion.main>
  );
}
