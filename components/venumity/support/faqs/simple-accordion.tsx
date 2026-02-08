"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export default function FAQ1() {
  const [openItem, setOpenItem] = useState<number | null>(1);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "How do I reset my password?",
      answer:
        "To reset your password, go to the login page and click 'Forgot Password'. Enter your email address and follow the instructions sent to your inbox. The link will expire in 24 hours for security reasons.",
      category: "account",
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers for enterprise customers. All payments are processed securely with 256-bit encryption.",
      category: "billing",
    },
    {
      id: 3,
      question: "How can I upgrade my plan?",
      answer:
        "You can upgrade your plan anytime from your account dashboard. Go to Billing > Plans, select your desired plan, and confirm the upgrade. The changes take effect immediately and you'll be billed pro-rata.",
      category: "account",
    },
    {
      id: 4,
      question: "Is there a free trial available?",
      answer:
        "Yes, we offer a 14-day free trial for all new users. No credit card required. After the trial ends, you can choose to upgrade to a paid plan or continue with our limited free tier.",
      category: "general",
    },
    {
      id: 5,
      question: "How do I cancel my subscription?",
      answer:
        "You can cancel your subscription anytime from your account settings. Go to Billing > Subscription and click 'Cancel Plan'. Your access will continue until the end of your current billing period.",
      category: "billing",
    },
    {
      id: 6,
      question: "Do you offer discounts for non-profits?",
      answer:
        "Yes, we offer special pricing for registered non-profit organizations and educational institutions. Please contact our sales team with your documentation to apply for discounted pricing.",
      category: "general",
    },
  ];

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "account", label: "Account" },
    { id: "billing", label: "Billing" },
    { id: "general", label: "General" },
  ];

  const filteredItems =
    activeCategory === "all"
      ? faqItems
      : faqItems.filter((item) => item.category === activeCategory);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <HelpCircle
              size={32}
              className="text-blue-600 dark:text-blue-400"
            />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find quick answers to common questions about our services, features,
            and support.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: item.id * 0.05 }}
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800"
            >
              <button
                onClick={() =>
                  setOpenItem(openItem === item.id ? null : item.id)
                }
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <HelpCircle
                      size={20}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {item.question}
                    </h3>
                    <div className="mt-1">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          item.category === "account"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                            : item.category === "billing"
                            ? "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400"
                            : "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400"
                        }`}
                      >
                        {item.category.charAt(0).toUpperCase() +
                          item.category.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: openItem === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-4"
                >
                  <ChevronDown size={20} className="text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openItem === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-gray-100 dark:border-gray-800">
                      <div className="pl-12">
                        <p className="text-gray-600 dark:text-gray-400">
                          {item.answer}
                        </p>
                        <div className="mt-4 flex gap-3">
                          <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                            Was this helpful?
                          </button>
                          <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                            Share feedback
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Still have questions?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
              Contact Support
            </button>
            <button className="px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors">
              Browse Documentation
            </button>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
