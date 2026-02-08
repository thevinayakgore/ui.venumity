"use client";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Phone, Clock } from "lucide-react";

interface ContactOption {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action: string;
  highlight?: boolean;
}

const options: ContactOption[] = [
  { icon: MessageSquare, title: "Chat with us", description: "Get instant support from our team", action: "Start chat", highlight: true },
  { icon: Mail, title: "Email support", description: "We'll respond within 24 hours", action: "Send email" },
  { icon: Phone, title: "Call us", description: "Mon-Fri from 9am to 6pm", action: "View number" },
  { icon: Clock, title: "Schedule a call", description: "Book a time that works for you", action: "Book now" },
];

export default function CardGridContact() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground dark:text-foreground mb-4">
          How can we help?
        </h2>
        <p className="text-muted-foreground text-lg">
          Choose the best way to reach us. We&apos;re here to help you succeed.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {options.map((option, index) => (
          <motion.div
            key={option.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className={`group p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
              option.highlight
                ? "bg-primary text-primary-foreground border-primary hover:shadow-lg hover:shadow-primary/20"
                : "bg-card dark:bg-card border-border hover:border-primary/50"
            }`}
          >
            <div
              className={`p-3 rounded-xl w-fit mb-4 ${
                option.highlight
                  ? "bg-primary-foreground/20"
                  : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
              } transition-colors`}
            >
              <option.icon className="w-6 h-6" />
            </div>
            <h3
              className={`text-lg font-semibold mb-2 ${
                option.highlight ? "text-primary-foreground" : "text-foreground dark:text-foreground"
              }`}
            >
              {option.title}
            </h3>
            <p
              className={`text-sm mb-4 ${
                option.highlight ? "text-primary-foreground/80" : "text-muted-foreground"
              }`}
            >
              {option.description}
            </p>
            <span
              className={`text-sm font-medium ${
                option.highlight ? "text-primary-foreground underline" : "text-primary"
              }`}
            >
              {option.action} →
            </span>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
