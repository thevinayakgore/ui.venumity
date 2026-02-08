"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  HelpCircle,
  Search,
  Book,
  Video,
  Mail,
} from "lucide-react";
import { useState, useEffect } from "react";

interface HelpOption {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  color: string;
}

export default function HelpWidgets1() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState<"main" | "search" | "contact">(
    "main"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const helpOptions: HelpOption[] = [
    {
      id: 1,
      title: "Search Articles",
      description: "Find answers in our knowledge base",
      icon: <Search size={20} />,
      action: () => setActiveView("search"),
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Browse Guides",
      description: "Step-by-step tutorials",
      icon: <Book size={20} />,
      action: () => alert("Opening guides..."),
      color: "bg-green-500",
    },
    {
      id: 3,
      title: "Video Tutorials",
      description: "Watch and learn visually",
      icon: <Video size={20} />,
      action: () => alert("Opening video tutorials..."),
      color: "bg-purple-500",
    },
    {
      id: 4,
      title: "Contact Support",
      description: "Get personalized help",
      icon: <Mail size={20} />,
      action: () => setActiveView("contact"),
      color: "bg-orange-500",
    },
  ];

  const popularSearches = [
    "How to reset password",
    "Billing questions",
    "Account settings",
    "API documentation",
    "Mobile app setup",
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
    }
  };

  // Close widget when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest(".help-widget")) {
        setIsOpen(false);
        setActiveView("main");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      {/* Main Content */}
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Need Help?
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Click the help button in the bottom right corner to access support
          resources.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="inline-flex p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4">
              <HelpCircle
                size={24}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Instant Help
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Get answers immediately with our smart help widget
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="inline-flex p-3 bg-green-100 dark:bg-green-900/30 rounded-lg mb-4">
              <Book size={24} className="text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Knowledge Base
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Browse articles and guides anytime
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="inline-flex p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg mb-4">
              <MessageSquare
                size={24}
                className="text-purple-600 dark:text-purple-400"
              />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Live Support
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Chat with our support team in real-time
            </p>
          </div>
        </div>
      </div>

      {/* Floating Help Widget */}
      <div className="help-widget fixed bottom-6 right-6 z-50">
        {/* Main Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 bg-linear-to-br from-blue-600 to-indigo-600 text-white rounded-full shadow-xl flex items-center justify-center"
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
                <MessageSquare size={24} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notification Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold"
          >
            3
          </motion.div>
        </motion.button>

        {/* Widget Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <MessageSquare size={24} />
                    <h2 className="text-xl font-bold">Help Center</h2>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <p className="text-blue-100 text-sm">
                  How can we help you today?
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeView === "main" && (
                    <motion.div
                      key="main"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      {helpOptions.map((option) => (
                        <motion.button
                          key={option.id}
                          whileHover={{ x: 5 }}
                          onClick={option.action}
                          className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                        >
                          <div
                            className={`w-10 h-10 ${option.color} rounded-lg flex items-center justify-center text-white`}
                          >
                            {option.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {option.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {option.description}
                            </p>
                          </div>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}

                  {activeView === "search" && (
                    <motion.div
                      key="search"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <button
                          onClick={() => setActiveView("main")}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                        >
                          ←
                        </button>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          Search Knowledge Base
                        </h3>
                      </div>

                      <div className="relative">
                        <Search
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                          placeholder="What are you looking for?"
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Popular searches
                        </h4>
                        <div className="space-y-2">
                          {popularSearches.map((search, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setSearchQuery(search);
                                handleSearch();
                              }}
                              className="w-full text-left p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-600 dark:text-gray-400"
                            >
                              {search}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeView === "contact" && (
                    <motion.div
                      key="contact"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <button
                          onClick={() => setActiveView("main")}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                        >
                          ←
                        </button>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          Contact Support
                        </h3>
                      </div>

                      <div className="space-y-4">
                        <button className="w-full p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                          <div className="font-semibold text-blue-700 dark:text-blue-400 mb-1">
                            Live Chat
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Chat with support agent
                          </div>
                        </button>

                        <button className="w-full p-4 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                          <div className="font-semibold text-green-700 dark:text-green-400 mb-1">
                            Schedule Call
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Book a callback
                          </div>
                        </button>

                        <button className="w-full p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                          <div className="font-semibold text-purple-700 dark:text-purple-400 mb-1">
                            Send Email
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            support@company.com
                          </div>
                        </button>
                      </div>

                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          Current wait time: &lt; 5 minutes
                        </p>
                        <button className="w-full py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                          Start Live Chat
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Always here to help</span>
                  <span>24/7 Support</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  );
}
