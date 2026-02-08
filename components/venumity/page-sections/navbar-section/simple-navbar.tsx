"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = ["Home", "About", "Features", "Pricing", "Contact"];

export default function SimpleNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <nav className="w-full px-6 py-4 rounded-2xl bg-card dark:bg-card border border-border">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold font-display text-foreground dark:text-foreground">Logo</div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link} href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                {link}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="px-4 py-2 text-foreground dark:text-foreground hover:text-primary transition-colors">
              Sign In
            </button>
            <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
              Get Started
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
            className="md:hidden mt-4 pt-4 border-t border-border"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a key={link} href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {link}
                </a>
              ))}
              <button className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.main>
  );
}
