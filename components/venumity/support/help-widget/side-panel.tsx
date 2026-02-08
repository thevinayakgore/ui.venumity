"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronRight,
  Search,
  Book,
  Video,
  MessageSquare,
  X,
  Clock,
  Star,
  Download,
} from "lucide-react";
import { useState, useEffect } from "react";

interface HelpTopic {
  id: number;
  title: string;
  articles: number;
  icon: React.ReactNode;
  color: string;
}

interface RecentArticle {
  id: number;
  title: string;
  views: number;
  readTime: number;
}

export default function HelpWidgets2() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState<number | null>(null);

  const helpTopics: HelpTopic[] = [
    {
      id: 1,
      title: "Getting Started",
      articles: 15,
      icon: <Book size={20} />,
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: 2,
      title: "Account & Billing",
      articles: 8,
      icon: <HelpCircle size={20} />,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: 3,
      title: "Features Guide",
      articles: 25,
      icon: <Video size={20} />,
      color: "from-purple-500 to-pink-600",
    },
    {
      id: 4,
      title: "Troubleshooting",
      articles: 12,
      icon: <MessageSquare size={20} />,
      color: "from-orange-500 to-red-600",
    },
    {
      id: 5,
      title: "API & Development",
      articles: 18,
      icon: <ChevronRight size={20} />,
      color: "from-gray-500 to-gray-700",
    },
  ];

  const recentArticles: RecentArticle[] = [
    { id: 1, title: "How to reset your password", views: 1250, readTime: 3 },
    { id: 2, title: "Understanding billing cycles", views: 890, readTime: 5 },
    {
      id: 3,
      title: "Setting up two-factor authentication",
      views: 2100,
      readTime: 7,
    },
    { id: 4, title: "Mobile app troubleshooting", views: 750, readTime: 4 },
  ];

  const quickActions = [
    { id: 1, label: "Contact Support", icon: <MessageSquare size={16} /> },
    { id: 2, label: "Video Tutorials", icon: <Video size={16} /> },
    { id: 3, label: "Download Guides", icon: <Download size={16} /> },
    { id: 4, label: "Schedule Training", icon: <Clock size={16} /> },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      {/* Main Content */}
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Help & Support Panel
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Click the help button in the bottom right to open the support panel
          with instant access to resources.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature Cards */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Search
                    size={24}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Smart Search
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Instantly find answers with our intelligent search that
                understands natural language.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Book
                    size={24}
                    className="text-green-600 dark:text-green-400"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Knowledge Base
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Access hundreds of articles, guides, and tutorials organized by
                topic.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Video
                    size={24}
                    className="text-purple-600 dark:text-purple-400"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Video Tutorials
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Learn visually with step-by-step video guides and walkthroughs.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <MessageSquare
                    size={24}
                    className="text-orange-600 dark:text-orange-400"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Live Support
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Connect with our support team via chat, phone, or email for
                personalized help.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Side Panel Help Widget */}
      <div className="help-widget fixed bottom-6 right-6 z-50">
        {/* Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 bg-linear-to-br from-green-600 to-emerald-600 text-white rounded-full shadow-xl flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="help"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <HelpCircle size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Side Panel */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              />

              {/* Panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25 }}
                className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-linear-to-b from-green-600 to-emerald-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <HelpCircle size={28} />
                      <h2 className="text-2xl font-bold">Help Center</h2>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  {/* Search */}
                  <form onSubmit={handleSearch} className="relative">
                    <Search
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-200"
                      size={20}
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="How can we help?"
                      className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-green-200 hover:text-white"
                    >
                      →
                    </button>
                  </form>
                </div>

                {/* Content */}
                <div className="h-[calc(100vh-180px)] overflow-y-auto">
                  <div className="p-6 space-y-8">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          24/7
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Support
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          5min
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Avg. Response
                        </div>
                      </div>
                    </div>

                    {/* Help Topics */}
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                        Browse by Topic
                      </h3>
                      <div className="space-y-3">
                        {helpTopics.map((topic) => (
                          <motion.button
                            key={topic.id}
                            whileHover={{ x: 5 }}
                            onClick={() =>
                              setActiveTopic(
                                activeTopic === topic.id ? null : topic.id
                              )
                            }
                            className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                              activeTopic === topic.id
                                ? "bg-linear-to-r bg-gray-100 dark:bg-gray-800 ring-2 ring-green-500"
                                : "hover:bg-gray-50 dark:hover:bg-gray-800"
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-12 h-12 bg-linear-to-br ${topic.color} rounded-lg flex items-center justify-center text-white`}
                              >
                                {topic.icon}
                              </div>
                              <div className="text-left">
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {topic.title}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                  {topic.articles} articles
                                </div>
                              </div>
                            </div>
                            <ChevronRight size={20} className="text-gray-400" />
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Recent Articles */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          Recently Viewed
                        </h3>
                        <button className="text-sm text-green-600 dark:text-green-400">
                          See all
                        </button>
                      </div>
                      <div className="space-y-3">
                        {recentArticles.map((article) => (
                          <div
                            key={article.id}
                            className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <div className="font-medium text-gray-900 dark:text-white mb-1">
                              {article.title}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <span>{article.views} views</span>
                              <span>·</span>
                              <span>{article.readTime} min read</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                        Quick Actions
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {quickActions.map((action) => (
                          <button
                            key={action.id}
                            className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <div className="text-green-600 dark:text-green-400 mb-2">
                              {action.icon}
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {action.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Support Status */}
                    <div className="bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <Star
                          size={20}
                          className="text-green-600 dark:text-green-400"
                        />
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          Support Status
                        </h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Live Chat:
                          </span>
                          <span className="font-medium text-green-600 dark:text-green-400">
                            Available
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Phone Support:
                          </span>
                          <span className="font-medium text-green-600 dark:text-green-400">
                            Online
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Response Time:
                          </span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            &lt; 5 minutes
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                  <button className="w-full py-3 bg-linear-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                    Start Live Chat
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  );
}
