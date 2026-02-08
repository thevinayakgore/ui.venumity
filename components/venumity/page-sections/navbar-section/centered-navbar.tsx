"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = ["Features", "Pricing", "About", "Blog"];

export default function CenteredNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <nav className="w-full">
        <div className="flex items-center justify-between py-4">
          <div className="text-xl font-bold font-display text-foreground dark:text-foreground">Logo</div>

          <div className="hidden md:flex items-center gap-1 px-2 py-2 rounded-full bg-secondary">
            {navLinks.map((link, index) => (
              <a
                key={link}
                href="#"
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  index === 0
                    ? "bg-card dark:bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-muted-foreground hover:text-foreground transition-colors">Sign In</button>
            <button className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
              Start Free <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
          </button>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden p-4 rounded-2xl bg-card dark:bg-card border border-border"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a key={link} href="#" className="text-muted-foreground hover:text-foreground transition-colors">{link}</a>
              ))}
              <button className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2">
                Start Free <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.main>
  );
}
