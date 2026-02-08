"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X, Search, Bell, User } from "lucide-react";

const navLinks = ["Dashboard", "Projects", "Team", "Reports"];

export default function DashboardNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <nav className="w-full px-6 py-3 rounded-2xl bg-card dark:bg-card border border-border">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <div className="text-xl font-bold font-display text-foreground dark:text-foreground">Logo</div>
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link, index) => (
                <a
                  key={link}
                  href="#"
                  className={`text-sm ${index === 0 ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"} transition-colors`}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm w-40 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
            </button>

            <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
              <User className="w-5 h-5 text-muted-foreground" />
            </button>

            <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden mt-4 pt-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a key={link} href="#" className="text-muted-foreground hover:text-foreground transition-colors">{link}</a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </motion.main>
  );
}
