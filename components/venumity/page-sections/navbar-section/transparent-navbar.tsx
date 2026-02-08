"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = ["Home", "About", "Services", "Work", "Contact"];

export default function TransparentNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <div className="w-full rounded-3xl bg-linear-to-br from-primary/20 to-accent/20 p-8 min-h-[400px] relative">
        <nav className="absolute top-0 left-0 right-0 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold font-display text-foreground dark:text-foreground">Logo</div>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a key={link} href="#" className="text-foreground/80 hover:text-foreground transition-colors">
                  {link}
                </a>
              ))}
            </div>

            <button className="hidden md:block px-5 py-2.5 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition-opacity">
              Get in Touch
            </button>

            <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
            </button>
          </div>

          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 p-4 rounded-2xl bg-card/90 dark:bg-card/90 backdrop-blur-lg border border-border"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a key={link} href="#" className="text-foreground hover:text-primary transition-colors">{link}</a>
                ))}
                <button className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium">Get in Touch</button>
              </div>
            </motion.div>
          )}
        </nav>

        <div className="flex items-center justify-center h-full pt-20">
          <p className="text-muted-foreground">Transparent navbar overlaying content</p>
        </div>
      </div>
    </motion.main>
  );
}
