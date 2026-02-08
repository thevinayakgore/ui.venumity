"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Star, TrendingUp, Clock, ThumbsUp } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  popularity: number;
  helpful: number;
  updated: string;
}

type TabType = "popular" | "recent" | "featured" | "all";

const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "How do I set up two-factor authentication?",
      answer:
        "To enable two-factor authentication: 1) Go to Account Settings > Security, 2) Click 'Enable 2FA', 3) Scan the QR code with your authenticator app (Google Authenticator or Authy), 4) Enter the 6-digit code to verify. You'll need to enter a code each time you log in from a new device.",
      category: "security",
      popularity: 95,
      helpful: 92,
      updated: "2 days ago",
    },
    {
      id: 2,
      question: "What happens when I exceed my storage limit?",
      answer:
        "When you reach 80% of your storage limit, you'll receive a notification. At 100%, you won't be able to upload new files until you either: 1) Upgrade your plan for more storage, 2) Delete unnecessary files, or 3) Export and remove older data. Your existing files remain accessible.",
      category: "storage",
      popularity: 88,
      helpful: 85,
      updated: "1 week ago",
    },
    {
      id: 3,
      question: "Can I customize my workspace?",
      answer:
        "Yes, you can fully customize your workspace: 1) Change theme (light/dark), 2) Rearrange dashboard widgets, 3) Create custom views and filters, 4) Set up automated workflows, 5) Customize notifications. Team admins have additional customization options for their entire team.",
      category: "customization",
      popularity: 76,
      helpful: 89,
      updated: "3 days ago",
    },
    {
      id: 4,
      question: "How do I share files securely?",
      answer:
        "You can share files securely by: 1) Generating a shareable link with password protection, 2) Setting expiration dates for shared links, 3) Restricting access to specific email addresses, 4) Enabling view-only mode, 5) Tracking who accessed your files and when. All shared files are encrypted in transit.",
      category: "sharing",
      popularity: 82,
      helpful: 91,
      updated: "5 days ago",
    },
    {
      id: 5,
      question: "What analytics are available?",
      answer:
        "We provide comprehensive analytics including: 1) Usage statistics and trends, 2) Team activity reports, 3) Storage analysis, 4) Performance metrics, 5) Custom report generation. Enterprise plans include advanced analytics with API access and real-time monitoring.",
      category: "analytics",
      popularity: 71,
      helpful: 84,
      updated: "1 month ago",
    },
    {
      id: 6,
      question: "How do I restore deleted items?",
      answer:
        "Deleted items go to the Trash folder and remain there for 30 days. To restore: 1) Go to Trash, 2) Select items to restore, 3) Click 'Restore'. Items will return to their original location. After 30 days, items are permanently deleted. Enterprise plans offer extended retention periods.",
      category: "recovery",
      popularity: 69,
      helpful: 87,
      updated: "2 weeks ago",
    },
    {
      id: 7,
      question: "Are there keyboard shortcuts?",
      answer:
        "Yes, we support numerous keyboard shortcuts: Ctrl/Cmd + K for command palette, Ctrl/Cmd + / to view all shortcuts, Ctrl/Cmd + N for new item, Ctrl/Cmd + F for search, Ctrl/Cmd + S to save. You can customize shortcuts in Settings > Keyboard Shortcuts.",
      category: "productivity",
      popularity: 63,
      helpful: 78,
      updated: "4 days ago",
    },
    {
      id: 8,
      question: "How do I manage notifications?",
      answer:
        "Manage notifications from Settings > Notifications. You can: 1) Enable/disable specific notification types, 2) Set quiet hours, 3) Choose delivery channels (email, push, in-app), 4) Create custom notification rules, 5) Set up escalation policies for critical alerts.",
      category: "notifications",
      popularity: 58,
      helpful: 82,
      updated: "1 week ago",
    },
  ];

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "popular", label: "Most Popular", icon: <TrendingUp size={18} /> },
    { id: "recent", label: "Recently Updated", icon: <Clock size={18} /> },
    { id: "featured", label: "Featured", icon: <Star size={18} /> },
    { id: "all", label: "All Questions", icon: <ChevronDown size={18} /> },
  ];

export default function FAQ3() {
  const [openItem, setOpenItem] = useState<number | null>(1);
  const [activeTab, setActiveTab] = useState<TabType>("popular");
  const [helpfulMap, setHelpfulMap] = useState<Record<number, boolean>>({});

  const filteredItems = useMemo(() => {
    const items = [...faqItems];

    switch (activeTab) {
      case "popular":
        return items.sort((a, b) => b.popularity - a.popularity);
      case "recent":
        return items.sort((a, b) => {
          const daysA = parseInt(a.updated);
          const daysB = parseInt(b.updated);
          return daysA - daysB;
        });
      case "featured":
        return items.filter((item) => item.helpful >= 85);
      default:
        return items;
    }
  }, [activeTab]);

  const handleHelpfulClick = (id: number) => {
    setHelpfulMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Help Center
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Find answers to common questions and learn how to get the most out
            of our platform.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {faqItems.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Articles
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              94%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Satisfaction
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              5min
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Avg. Response
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              24/7
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Support
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenItem(openItem === item.id ? null : item.id)
                }
                className="w-full p-6 flex items-start justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-4 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.category === "security"
                          ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
                          : item.category === "storage"
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400"
                          : item.category === "customization"
                          ? "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400"
                          : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                      }`}
                    >
                      {item.category.charAt(0).toUpperCase() +
                        item.category.slice(1)}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <TrendingUp size={14} />
                      <span>{item.popularity}% popularity</span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Updated {item.updated}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {item.question}
                  </h3>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <ThumbsUp size={14} />
                      <span>{item.helpful}% helpful</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <Star size={14} />
                      <span>{Math.floor(item.popularity / 20)}/5 rating</span>
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{ rotate: openItem === item.id ? 180 : 0 }}
                  className="ml-6"
                >
                  <ChevronDown size={20} className="text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openItem === item.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-gray-100 dark:border-gray-800">
                      <div className="prose prose-gray dark:prose-invert max-w-none">
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          {item.answer}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleHelpfulClick(item.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                              helpfulMap[item.id]
                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`}
                          >
                            <ThumbsUp size={16} />
                            {helpfulMap[item.id]
                              ? "Thank you!"
                              : "Was this helpful?"}
                          </button>
                          <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                            Share article
                          </button>
                          <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                            Suggest edit
                          </button>
                        </div>

                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Article ID: FAQ-{item.id.toString().padStart(3, "0")}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="mb-6 text-blue-100 max-w-2xl mx-auto">
            Our support team is here to help you with any questions or issues
            you might have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
              Contact Support
            </button>
            <button className="px-8 py-3 bg-blue-700 hover:bg-blue-800 font-semibold rounded-lg transition-colors">
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
