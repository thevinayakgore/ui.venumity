"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight, X, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "How do I create a new project?",
    answer:
      "Click the 'New Project' button in your dashboard, choose a template or start from scratch, and follow the setup wizard to configure your project settings.",
    category: "Getting Started",
  },
  {
    id: 2,
    question: "Can I invite team members?",
    answer:
      "Yes! Go to Project Settings > Team, enter your teammate's email address, and choose their role. They'll receive an invitation to join your workspace.",
    category: "Collaboration",
  },
  {
    id: 3,
    question: "What file formats are supported?",
    answer:
      "We support all common file formats including PNG, JPG, SVG, PDF, DOCX, XLSX, and more. Maximum file size is 100MB per upload.",
    category: "Files",
  },
  {
    id: 4,
    question: "How do I export my work?",
    answer:
      "Click the Export button in the top toolbar, select your preferred format (PDF, PNG, or native), adjust quality settings, and download your file.",
    category: "Export",
  },
  {
    id: 5,
    question: "Is there version history?",
    answer:
      "Yes, we automatically save version history for 30 days. Access it from the History panel to view, compare, or restore previous versions.",
    category: "Features",
  },
  {
    id: 6,
    question: "How do I connect integrations?",
    answer:
      "Navigate to Settings > Integrations, browse available apps, and click Connect. Follow the authorization steps to link your external accounts.",
    category: "Integrations",
  },
  {
    id: 7,
    question: "What are the keyboard shortcuts?",
    answer:
      "Press Ctrl/Cmd + K to open the command palette, or visit Help > Keyboard Shortcuts for a complete list of available shortcuts.",
    category: "Tips",
  },
  {
    id: 8,
    question: "How do I contact support?",
    answer:
      "Use the chat widget in the bottom right, email support@company.com, or visit our Help Center for self-service resources.",
    category: "Support",
  },
];

export default function SearchableFAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return faqItems;
    const query = searchQuery.toLowerCase();
    return faqItems.filter(
      (item) =>
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span
          key={i}
          className="bg-primary/20 text-primary font-medium rounded px-0.5"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-6"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search frequently asked questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 bg-card dark:bg-card border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground transition-all shadow-lg"
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded-full"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {searchQuery && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-sm text-muted-foreground mb-4 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              Found {filteredItems.length} result
              {filteredItems.length !== 1 ? "s" : ""} for &quot;{searchQuery}
              &quot;
            </motion.p>
          )}
        </AnimatePresence>

        <motion.div layout className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card dark:bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <motion.button
                  onClick={() =>
                    setExpandedId(expandedId === item.id ? null : item.id)
                  }
                  className="w-full flex items-start gap-4 p-4 text-left"
                  whileHover={{ x: 2 }}
                >
                  <motion.div
                    animate={{ rotate: expandedId === item.id ? 90 : 0 }}
                    className="mt-1 text-primary"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                  <div className="flex-1">
                    <span className="inline-block px-2 py-0.5 text-xs font-medium bg-secondary dark:bg-secondary text-muted-foreground rounded-md mb-2">
                      {item.category}
                    </span>
                    <p className="font-medium text-foreground">
                      {highlightText(item.question, searchQuery)}
                    </p>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {expandedId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-4 pb-4 pl-12">
                        <motion.p
                          initial={{ y: -10 }}
                          animate={{ y: 0 }}
                          className="text-muted-foreground leading-relaxed p-4 bg-secondary/50 dark:bg-secondary/30 rounded-lg"
                        >
                          {highlightText(item.answer, searchQuery)}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">
                No results found for &quot;{searchQuery}&quot;
              </p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Try a different search term
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.main>
  );
}
