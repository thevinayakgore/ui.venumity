"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "#" },
  {
    label: "Products",
    dropdown: [
      { label: "Analytics", href: "#" },
      { label: "Automation", href: "#" },
      { label: "Reports", href: "#" },
    ],
  },
  {
    label: "Resources",
    dropdown: [
      { label: "Blog", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "Help Center", href: "#" },
    ],
  },
  { label: "Pricing", href: "#" },
];

export default function DropdownNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <nav className="w-full px-6 py-4 rounded-2xl bg-card dark:bg-card border border-border">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold font-display text-foreground dark:text-foreground">Logo</div>

          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.dropdown ? (
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                ) : (
                  <a href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </a>
                )}

                {item.dropdown && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-2 w-48 py-2 rounded-xl bg-card dark:bg-card border border-border shadow-lg"
                  >
                    {item.dropdown.map((dropItem) => (
                      <a
                        key={dropItem.label}
                        href={dropItem.href}
                        className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      >
                        {dropItem.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button className="px-4 py-2 text-foreground dark:text-foreground hover:text-primary transition-colors">
              Login
            </button>
            <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90">
              Sign Up
            </button>
          </div>

          <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
          </button>
        </div>

        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden mt-4 pt-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  <a href={item.href || "#"} className="text-muted-foreground hover:text-foreground">{item.label}</a>
                  {item.dropdown && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.dropdown.map((sub) => (
                        <a key={sub.label} href={sub.href} className="block text-sm text-muted-foreground">{sub.label}</a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium">Sign Up</button>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.main>
  );
}
