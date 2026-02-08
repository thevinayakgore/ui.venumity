"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ThumbsDown, Copy, Check, MessageSquare } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  helpful: number;
  notHelpful: number;
}

export default function InteractiveFAQ() {
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Record<number, "up" | "down" | null>>({});

  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    { id: 1, question: "How do I reset my password?", answer: "To reset your password, click 'Forgot Password' on the login page. Enter your email address and we'll send you a secure reset link. The link expires after 24 hours for security. If you don't receive the email, check your spam folder or contact support.", helpful: 142, notHelpful: 8 },
    { id: 2, question: "What are the system requirements?", answer: "Our platform works on any modern browser including Chrome 80+, Firefox 75+, Safari 13+, and Edge 80+. We recommend at least 4GB RAM and a stable internet connection. Mobile apps require iOS 14+ or Android 8+.", helpful: 89, notHelpful: 5 },
    { id: 3, question: "How do I enable notifications?", answer: "Go to Settings > Notifications to customize your preferences. You can enable email, push, and in-app notifications for different events like updates, mentions, and due dates. Browser notifications require permission.", helpful: 67, notHelpful: 12 },
    { id: 4, question: "Can I import data from other platforms?", answer: "Yes! We support importing from CSV, Excel, JSON, and direct integrations with Notion, Trello, Asana, and more. Go to Settings > Import/Export to start the migration wizard.", helpful: 203, notHelpful: 11 },
    { id: 5, question: "What happens to my data if I cancel?", answer: "After cancellation, your data remains accessible in read-only mode for 30 days. You can export everything during this period. After 30 days, data is permanently deleted unless you reactivate.", helpful: 156, notHelpful: 7 },
  ]);

  const selectedItem = faqItems.find((item) => item.id === selectedId);

  const handleCopy = (id: number, answer: string) => {
    navigator.clipboard.writeText(answer);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (id: number, type: "up" | "down") => {
    if (feedback[id] === type) return;

    setFeedback((prev) => ({ ...prev, [id]: type }));
    setFaqItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const wasUp = feedback[id] === "up";
          const wasDown = feedback[id] === "down";
          return {
            ...item,
            helpful: item.helpful + (type === "up" ? 1 : 0) - (wasUp ? 1 : 0),
            notHelpful: item.notHelpful + (type === "down" ? 1 : 0) - (wasDown ? 1 : 0),
          };
        }
        return item;
      })
    );
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full grid lg:grid-cols-5 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-card dark:bg-card rounded-2xl border border-border p-4 shadow-lg h-fit"
        >
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 mb-3">
            Popular Questions
          </p>
          <div className="space-y-1">
            {faqItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 4 }}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  selectedId === item.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "hover:bg-secondary dark:hover:bg-secondary text-foreground"
                }`}
              >
                <p className="text-sm font-medium line-clamp-2">{item.question}</p>
                <div className="flex items-center gap-3 mt-2 text-xs opacity-70">
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    {item.helpful}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    Answer
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3"
        >
          <AnimatePresence mode="wait">
            {selectedItem && (
              <motion.div
                key={selectedItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-card dark:bg-card rounded-2xl border border-border p-6 shadow-lg"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xl font-display font-semibold text-foreground"
                  >
                    {selectedItem.question}
                  </motion.h3>
                  <motion.button
                    onClick={() => handleCopy(selectedItem.id, selectedItem.answer)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="shrink-0 p-2 rounded-lg hover:bg-secondary transition-colors"
                    title="Copy answer"
                  >
                    {copiedId === selectedItem.id ? (
                      <Check className="w-4 h-4 text-accent" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </motion.button>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="prose prose-sm dark:prose-invert max-w-none"
                >
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {selectedItem.answer}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-8 pt-6 border-t border-border"
                >
                  <p className="text-sm text-muted-foreground mb-4">Was this answer helpful?</p>
                  <div className="flex items-center gap-3">
                    <motion.button
                      onClick={() => handleFeedback(selectedItem.id, "up")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
                        feedback[selectedItem.id] === "up"
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary dark:bg-secondary text-foreground hover:bg-accent/20"
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm font-medium">{selectedItem.helpful}</span>
                    </motion.button>

                    <motion.button
                      onClick={() => handleFeedback(selectedItem.id, "down")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
                        feedback[selectedItem.id] === "down"
                          ? "bg-destructive text-destructive-foreground"
                          : "bg-secondary dark:bg-secondary text-foreground hover:bg-destructive/20"
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span className="text-sm font-medium">{selectedItem.notHelpful}</span>
                    </motion.button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 p-4 bg-secondary/50 dark:bg-secondary/30 rounded-xl flex items-center justify-between"
                >
                  <p className="text-sm text-muted-foreground">Need more help?</p>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.02 }}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Contact Support →
                  </motion.a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.main>
  );
}
