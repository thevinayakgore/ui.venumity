"use client";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function SimpleFooter() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <footer className="w-full py-8 text-center">
        <nav className="flex flex-wrap items-center justify-center gap-6 mb-8">
          {["Home", "About", "Features", "Pricing", "Blog", "Contact"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-destructive fill-destructive" />
          <span>by our team</span>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          © 2024 Company. All rights reserved.
        </p>
      </footer>
    </motion.main>
  );
}
