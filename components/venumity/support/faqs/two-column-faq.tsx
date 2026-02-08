"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function TwoColumnFAQ() {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const leftColumnFAQs: FAQItem[] = [
    { question: "What is included in the free plan?", answer: "The free plan includes up to 3 projects, 1GB storage, basic analytics, and email support. Perfect for individuals or small teams just getting started." },
    { question: "How do upgrades work?", answer: "Upgrading is instant and prorated. You only pay the difference for the remaining billing period. Downgrading takes effect at the start of your next billing cycle." },
    { question: "Can I use my own domain?", answer: "Yes! Custom domains are available on Pro plans and above. Simply add your domain in settings and update your DNS records." },
    { question: "Do you offer annual billing?", answer: "Yes, annual billing saves you 20% compared to monthly. Switch to annual billing anytime from your account settings." },
  ];

  const rightColumnFAQs: FAQItem[] = [
    { question: "Is there a setup fee?", answer: "No setup fees ever. Start using the platform immediately after signup with our quick onboarding process." },
    { question: "What integrations do you support?", answer: "We integrate with 50+ popular tools including Slack, Notion, GitHub, Figma, Google Workspace, and many more." },
    { question: "Can I cancel anytime?", answer: "Absolutely. Cancel your subscription anytime with no penalties. Your data remains accessible for 30 days after cancellation." },
    { question: "How secure is my data?", answer: "Enterprise-grade security with SOC 2 Type II certification, end-to-end encryption, and regular security audits." },
  ];

  const toggleItem = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const renderFAQItem = (item: FAQItem, index: number, offset: number) => {
    const globalIndex = index + offset;
    const isOpen = openIndices.includes(globalIndex);

    return (
      <motion.div
        key={globalIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="border-b border-border last:border-b-0"
      >
        <motion.button
          onClick={() => toggleItem(globalIndex)}
          className="w-full flex items-center justify-between py-5 text-left group"
          whileHover={{ x: 4 }}
        >
          <span className="font-medium text-foreground group-hover:text-primary transition-colors pr-4">
            {item.question}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
              isOpen ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
            }`}
          >
            {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.p
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                className="pb-5 text-muted-foreground leading-relaxed"
              >
                {item.answer}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card dark:bg-card rounded-2xl border border-border p-6 shadow-lg"
          >
            <h3 className="text-lg font-display font-semibold text-foreground mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Pricing & Plans
            </h3>
            <div className="divide-y divide-border">
              {leftColumnFAQs.map((item, index) => renderFAQItem(item, index, 0))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card dark:bg-card rounded-2xl border border-border p-6 shadow-lg"
          >
            <h3 className="text-lg font-display font-semibold text-foreground mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Features & Support
            </h3>
            <div className="divide-y divide-border">
              {rightColumnFAQs.map((item, index) => renderFAQItem(item, index, leftColumnFAQs.length))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-6 bg-linear-to-r from-primary/10 to-accent/10 dark:from-primary/5 dark:to-accent/5 rounded-2xl border border-border text-center"
        >
          <MessageCircle className="w-10 h-10 text-primary mx-auto mb-3" />
          <h4 className="font-display font-semibold text-foreground mb-2">
            Still have questions?
          </h4>
          <p className="text-muted-foreground text-sm mb-4">
            Can&apos;t find the answer you&apos;re looking for? Our team is here to help.
          </p>
          <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium shadow-lg shadow-primary/20"
          >
            Contact Support
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </motion.main>
  );
}
