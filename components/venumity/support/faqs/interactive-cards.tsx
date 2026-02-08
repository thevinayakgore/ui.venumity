"use client";
import { motion } from "framer-motion";
import {
  HelpCircle,
  ExternalLink,
  Book,
  Video,
  MessageSquare,
  Share2,
  Bookmark,
} from "lucide-react";
import { useState } from "react";

interface FAQCard {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  articles: number;
  popularQuestions: string[];
  action: string;
}

interface QuickLink {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  url: string;
}

export default function FAQ4() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [bookmarkedCards, setBookmarkedCards] = useState<number[]>([]);

  const faqCategories: FAQCard[] = [
    {
      id: 1,
      title: "Getting Started",
      description: "Learn the basics and set up your account",
      icon: <Book size={24} />,
      color: "from-blue-500 to-indigo-600",
      articles: 12,
      popularQuestions: [
        "How do I create an account?",
        "What are the system requirements?",
        "How do I invite team members?",
        "Where can I find tutorials?",
      ],
      action: "View Guides",
    },
    {
      id: 2,
      title: "Account & Billing",
      description: "Manage your subscription and payments",
      icon: <HelpCircle size={24} />,
      color: "from-purple-500 to-pink-600",
      articles: 8,
      popularQuestions: [
        "How do I update my payment method?",
        "Can I change my plan?",
        "Where can I find invoices?",
        "What's your refund policy?",
      ],
      action: "Billing Help",
    },
    {
      id: 3,
      title: "Security & Privacy",
      description: "Keep your data safe and secure",
      icon: <Bookmark size={24} />,
      color: "from-green-500 to-emerald-600",
      articles: 15,
      popularQuestions: [
        "How secure is my data?",
        "How do I enable 2FA?",
        "What compliance standards do you meet?",
        "Can I export my data?",
      ],
      action: "Security Center",
    },
    {
      id: 4,
      title: "Features & Usage",
      description: "Master all platform features",
      icon: <Video size={24} />,
      color: "from-orange-500 to-red-600",
      articles: 20,
      popularQuestions: [
        "How do I create custom reports?",
        "Can I automate workflows?",
        "How do I set up integrations?",
        "Are there mobile apps?",
      ],
      action: "Feature Guides",
    },
    {
      id: 5,
      title: "Troubleshooting",
      description: "Solve common issues and errors",
      icon: <MessageSquare size={24} />,
      color: "from-yellow-500 to-amber-600",
      articles: 18,
      popularQuestions: [
        "Why is my upload failing?",
        "How do I reset my password?",
        "Why can't I access certain features?",
        "How do I contact support?",
      ],
      action: "Troubleshoot",
    },
    {
      id: 6,
      title: "API & Developers",
      description: "Technical documentation and API guides",
      icon: <ExternalLink size={24} />,
      color: "from-gray-500 to-gray-700",
      articles: 25,
      popularQuestions: [
        "Where is the API documentation?",
        "How do I generate API keys?",
        "What are the rate limits?",
        "Are webhooks supported?",
      ],
      action: "API Docs",
    },
  ];

  const quickLinks: QuickLink[] = [
    {
      id: 1,
      title: "Video Tutorials",
      description: "Watch step-by-step guides",
      icon: <Video size={20} />,
      url: "#tutorials",
    },
    {
      id: 2,
      title: "Documentation",
      description: "Complete technical docs",
      icon: <Book size={20} />,
      url: "#docs",
    },
    {
      id: 3,
      title: "Release Notes",
      description: "Latest updates & features",
      icon: <MessageSquare size={20} />,
      url: "#releases",
    },
    {
      id: 4,
      title: "Community Forum",
      description: "Connect with other users",
      icon: <HelpCircle size={20} />,
      url: "#forum",
    },
  ];

  const toggleBookmark = (id: number) => {
    setBookmarkedCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );
  };

  const handleCardAction = (action: string) => {
    alert(`Action: ${action}`);
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Help & Resources
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore our comprehensive help center with guides, tutorials, and
            answers to frequently asked questions.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-5 text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              98+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Articles
            </div>
          </div>
          <div className="bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-5 text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              24/7
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Support
            </div>
          </div>
          <div className="bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-5 text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              95%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Satisfaction
            </div>
          </div>
          <div className="bg-linear-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-5 text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              5min
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Avg. Response
            </div>
          </div>
        </div>

        {/* FAQ Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {faqCategories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: category.id * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden ${
                expandedCard === category.id ? "ring-2 ring-blue-500" : ""
              }`}
            >
              {/* Card Header */}
              <div
                className={`bg-linear-to-br ${category.color} p-6 text-white`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    {category.icon}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleBookmark(category.id)}
                      className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                    >
                      <Bookmark
                        size={18}
                        className={
                          bookmarkedCards.includes(category.id)
                            ? "fill-white"
                            : ""
                        }
                      />
                    </button>
                    <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                <p className="text-white/80">{category.description}</p>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {category.articles} articles
                  </span>
                  <button
                    onClick={() =>
                      setExpandedCard(
                        expandedCard === category.id ? null : category.id
                      )
                    }
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    {expandedCard === category.id ? "Show Less" : "Show More"}
                  </button>
                </div>

                {/* Popular Questions */}
                <div className="space-y-3">
                  {category.popularQuestions
                    .slice(0, expandedCard === category.id ? 4 : 2)
                    .map((question, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded">
                          <HelpCircle
                            size={14}
                            className="text-blue-600 dark:text-blue-400"
                          />
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {question}
                        </span>
                      </div>
                    ))}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleCardAction(category.action)}
                  className={`mt-6 w-full py-3 bg-linear-to-r ${category.color} text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2`}
                >
                  {category.action}
                  <ExternalLink size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link) => (
              <motion.a
                key={link.id}
                href={link.url}
                whileHover={{ scale: 1.05 }}
                className="group bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30">
                    <div className="text-blue-600 dark:text-blue-400">
                      {link.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {link.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {link.description}
                </p>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-linear-to-r from-gray-900 to-black dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Need personalized help?
              </h2>
              <p className="text-gray-300">
                Our support team is available 24/7 to assist you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                <MessageSquare size={18} />
                Start Live Chat
              </button>
              <button className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
