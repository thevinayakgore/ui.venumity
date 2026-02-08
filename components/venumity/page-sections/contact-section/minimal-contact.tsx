"use client";
import { motion } from "framer-motion";
import { ArrowRight, Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { useState } from "react";

interface SocialLink {
    icon: React.ComponentType<{ className?: string }>;
  name: string;
  url: string;
}

const socials: SocialLink[] = [
  { icon: Twitter, name: "Twitter", url: "#" },
  { icon: Github, name: "GitHub", url: "#" },
  { icon: Linkedin, name: "LinkedIn", url: "#" },
  { icon: Instagram, name: "Instagram", url: "#" },
];

export default function MinimalContact() {
  const [email, setEmail] = useState("");

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <div className="text-center max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-foreground dark:text-foreground mb-6"
        >
          Let&apos;s create something{" "}
          <span className="text-gradient">extraordinary</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-muted-foreground mb-12"
        >
          Drop us a line and we&apos;ll get back to you within 24 hours.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onSubmit={(e) => {
            e.preventDefault();
            console.log(email);
          }}
          className="flex flex-col sm:flex-row items-center gap-4 max-w-xl mx-auto mb-16"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 w-full px-6 py-4 rounded-2xl bg-card dark:bg-card border border-border focus:border-primary outline-none text-foreground"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            Get in Touch
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <p className="text-sm text-muted-foreground">Or find us on</p>
          <div className="flex items-center justify-center gap-4">
            {socials.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-3 rounded-xl bg-card dark:bg-card border border-border hover:border-primary/50 hover:text-primary transition-colors text-foreground"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
