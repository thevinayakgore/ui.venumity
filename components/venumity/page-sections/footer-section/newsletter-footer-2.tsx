"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";

const footerLinks = [
  { title: "Product", links: ["Features", "Pricing", "Security", "Roadmap"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
  { title: "Support", links: ["Help Center", "API Docs", "Status", "Community"] },
];

export default function NewsletterFooter() {
  const [email, setEmail] = useState("");

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <footer className="w-full">
        <div className="p-8 sm:p-12 rounded-3xl bg-primary mb-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                Subscribe to our newsletter
              </h3>
              <p className="text-primary-foreground/80">
                Get the latest updates, tips, and insights delivered to your inbox.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log(email);
              }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-background dark:bg-background border border-border focus:border-primary outline-none text-foreground"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-background dark:bg-background text-foreground font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-border">
          <div>
            <div className="text-2xl font-bold font-display text-foreground dark:text-foreground mb-4">
              Logo
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering teams to do their best work.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground dark:text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Company Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </motion.main>
  );
}
