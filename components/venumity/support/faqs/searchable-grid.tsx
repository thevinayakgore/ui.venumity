"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  HelpCircle,
  ChevronRight,
  BookOpen,
  MessageSquare,
} from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  views: number;
  helpful: number;
}

const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "How do I create an account?",
      answer:
        "To create an account, click the 'Sign Up' button on the top right corner of our website. You'll need to provide your email address, create a password, and verify your email. Once verified, you can complete your profile and start using our services.",
      category: "getting-started",
      tags: ["account", "signup", "registration"],
      views: 1250,
      helpful: 89,
    },
    {
      id: 2,
      question: "What are the system requirements?",
      answer:
        "Our platform works on all modern browsers including Chrome 90+, Firefox 88+, Safari 14+, and Edge 90+. For mobile apps, we support iOS 14+ and Android 10+. A minimum internet speed of 5 Mbps is recommended for optimal performance.",
      category: "technical",
      tags: ["requirements", "browser", "mobile"],
      views: 890,
      helpful: 76,
    },
    {
      id: 3,
      question: "How secure is my data?",
      answer:
        "We use enterprise-grade security measures including AES-256 encryption, SOC 2 compliance, regular security audits, and two-factor authentication. All data is stored in GDPR-compliant data centers with redundant backups and disaster recovery protocols.",
      category: "security",
      tags: ["security", "privacy", "encryption"],
      views: 2100,
      helpful: 95,
    },
    {
      id: 4,
      question: "Can I export my data?",
      answer:
        "Yes, you can export all your data at any time. Go to Settings > Data Management > Export Data. You can choose to export in CSV, JSON, or PDF formats. Enterprise customers have access to API endpoints for automated data exports.",
      category: "data",
      tags: ["export", "data", "backup"],
      views: 750,
      helpful: 82,
    },
    {
      id: 5,
      question: "How do team collaborations work?",
      answer:
        "You can invite team members from your workspace settings. Each member gets a unique role with specific permissions. Real-time collaboration features include shared workspaces, comments, mentions, and activity tracking. Enterprise plans include advanced collaboration tools.",
      category: "collaboration",
      tags: ["team", "collaboration", "workspace"],
      views: 1100,
      helpful: 91,
    },
    {
      id: 6,
      question: "What's your refund policy?",
      answer:
        "We offer a 30-day money-back guarantee for all annual plans. If you're not satisfied, contact our support team within 30 days of purchase for a full refund. Monthly plans can be canceled anytime without future charges, but we don't offer refunds for partial months.",
      category: "billing",
      tags: ["refund", "cancel", "money-back"],
      views: 950,
      helpful: 88,
    },
    {
      id: 7,
      question: "How do integrations work?",
      answer:
        "We offer native integrations with popular tools like Slack, Google Workspace, Microsoft 365, and more. You can also use our REST API or webhooks for custom integrations. Most integrations can be set up in minutes from the Integrations section of your dashboard.",
      category: "integrations",
      tags: ["api", "integrations", "webhooks"],
      views: 820,
      helpful: 79,
    },
    {
      id: 8,
      question: "Is there mobile app support?",
      answer:
        "Yes, we have native mobile apps for iOS and Android. You can download them from the App Store or Google Play Store. The mobile apps offer full functionality including push notifications, offline mode, and biometric authentication.",
      category: "mobile",
      tags: ["ios", "android", "app"],
      views: 680,
      helpful: 72,
    },
  ];

  const categories = [
    { id: "all", label: "All Categories", count: faqItems.length },
    {
      id: "getting-started",
      label: "Getting Started",
      count: faqItems.filter((item) => item.category === "getting-started")
        .length,
    },
    {
      id: "technical",
      label: "Technical",
      count: faqItems.filter((item) => item.category === "technical").length,
    },
    {
      id: "security",
      label: "Security",
      count: faqItems.filter((item) => item.category === "security").length,
    },
    {
      id: "billing",
      label: "Billing",
      count: faqItems.filter((item) => item.category === "billing").length,
    },
    {
      id: "data",
      label: "Data Management",
      count: faqItems.filter((item) => item.category === "data").length,
    },
  ];

export default function FAQ2() {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredItems = useMemo(() => {
    let filtered = faqItems;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const handleHelpfulClick = (id: number) => {
    console.log(`Marked FAQ ${id} as helpful`);
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl">
              <HelpCircle size={28} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Knowledge Base
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Search our comprehensive knowledge base or browse by category
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-10">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for answers..."
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-xl text-center transition-all ${
                selectedCategory === category.id
                  ? "bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-md"
              }`}
            >
              <div className="font-medium mb-1">{category.label}</div>
              <div
                className={`text-sm ${
                  selectedCategory === category.id
                    ? "text-blue-100"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {category.count} articles
              </div>
            </motion.button>
          ))}
        </div>

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "Result" : "Results"}
          </h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Sorted by relevance
          </div>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() =>
                    setOpenItem(openItem === item.id ? null : item.id)
                  }
                  className="w-full p-6 text-left"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.category === "getting-started"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                              : item.category === "technical"
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400"
                              : item.category === "security"
                              ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
                              : "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400"
                          }`}
                        >
                          {
                            categories.find((c) => c.id === item.category)
                              ?.label
                          }
                        </span>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {item.views} views
                        </div>
                      </div>

                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {item.question}
                      </h3>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <motion.div
                      animate={{ rotate: openItem === item.id ? 90 : 0 }}
                      className="ml-4"
                    >
                      <ChevronRight size={20} className="text-gray-400" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {openItem === item.id && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden border-t border-gray-100 dark:border-gray-800"
                    >
                      <div className="p-6 pt-4">
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {item.answer}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {item.helpful}% found this helpful
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleHelpfulClick(item.id)}
                              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                            >
                              Yes, this helped
                            </button>
                            <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                              Not helpful
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No results found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter to find what you are looking
              for.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* Bottom Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-600 rounded-lg">
                <BookOpen size={20} className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Documentation
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Browse our detailed documentation and guides
            </p>
            <button className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300">
              View documentation →
            </button>
          </div>

          <div className="bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-600 rounded-lg">
                <MessageSquare size={20} className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Still need help?
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Contact our support team for personalized assistance
            </p>
            <button className="text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300">
              Contact support →
            </button>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
