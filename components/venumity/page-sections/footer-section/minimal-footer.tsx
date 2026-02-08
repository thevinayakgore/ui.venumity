"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function MinimalFooter() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <footer className="w-full py-12 border-t border-border">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-2xl font-bold font-display text-foreground dark:text-foreground">
            Logo
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-8">
            {["Home", "About", "Features", "Pricing", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          <button className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
            Get Started
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Company. Made with ♥ for the web.
          </p>
        </div>
      </footer>
    </motion.main>
  );
}
