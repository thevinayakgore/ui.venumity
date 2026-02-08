"use client";
import { useState, useEffect } from "react";

export default function TransparentNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Home", "About", "Services", "Portfolio", "Contact"];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg" />
            <span
              className={`text-xl font-bold transition-colors ${
                scrolled ? "text-gray-800 dark:text-gray-200" : "text-white"
              }`}
            >
              Brand
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className={`font-medium transition-colors ${
                  scrolled
                    ? "text-gray-700 dark:text-gray-300 hover:text-primary"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item}
              </a>
            ))}
            <button className="px-6 py-2 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors font-medium">
              Sign In
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg ${
              scrolled ? "text-gray-700 dark:text-gray-300" : "text-white"
            }`}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 rounded-lg shadow-lg mt-2 p-4">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
