// app/components/social-links/10.3-animated-social-links/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Copy,
  Check,
  Share2,
  Zap,
  Sparkles,
  TrendingUp,
  Users,
  Target,
} from "lucide-react";

interface SocialLink {
  id: string;
  platform: string;
  icon: string;
  url: string;
  color: string;
  gradient: string;
  clicks: number;
  growth: number;
  status: "active" | "hot" | "new";
}

export default function AnimatedSocialLinks() {
  const [copied, setCopied] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [links, setLinks] = useState<SocialLink[]>([
    {
      id: "1",
      platform: "Twitter",
      icon: "🐦",
      url: "https://twitter.com/dev",
      color: "text-sky-500",
      gradient: "from-sky-400 to-sky-600",
      clicks: 1567,
      growth: 12.5,
      status: "hot",
    },
    {
      id: "2",
      platform: "GitHub",
      icon: "💻",
      url: "https://github.com/dev",
      color: "text-gray-800 dark:text-gray-300",
      gradient: "from-gray-700 to-gray-900",
      clicks: 892,
      growth: 8.2,
      status: "active",
    },
    {
      id: "3",
      platform: "LinkedIn",
      icon: "💼",
      url: "https://linkedin.com/in/dev",
      color: "text-blue-700",
      gradient: "from-blue-600 to-blue-800",
      clicks: 1245,
      growth: 15.3,
      status: "active",
    },
    {
      id: "4",
      platform: "Instagram",
      icon: "📸",
      url: "https://instagram.com/dev",
      color: "text-pink-600",
      gradient: "from-pink-500 to-rose-600",
      clicks: 2345,
      growth: 21.7,
      status: "hot",
    },
    {
      id: "5",
      platform: "YouTube",
      icon: "🎥",
      url: "https://youtube.com/@dev",
      color: "text-red-600",
      gradient: "from-red-500 to-red-700",
      clicks: 5678,
      growth: 18.4,
      status: "hot",
    },
    {
      id: "6",
      platform: "Portfolio",
      icon: "🎨",
      url: "https://portfolio.dev",
      color: "text-purple-600",
      gradient: "from-purple-500 to-purple-700",
      clicks: 3456,
      growth: 9.8,
      status: "new",
    },
  ]);

  const [stats, setStats] = useState({
    totalClicks: 0,
    avgGrowth: 0,
    hotLinks: 0,
    activeLinks: 0,
  });

  useEffect(() => {
    const totalClicks = links.reduce((acc, link) => acc + link.clicks, 0);
    const avgGrowth =
      links.reduce((acc, link) => acc + link.growth, 0) / links.length;
    const hotLinks = links.filter((link) => link.status === "hot").length;
    const activeLinks = links.filter(
      (link) => link.status === "active" || link.status === "hot"
    ).length;

    const timeout = setTimeout(() => {
      setStats({
        totalClicks,
        avgGrowth,
        hotLinks,
        activeLinks,
      });
    }, 0);
    return () => clearTimeout(timeout);
  }, [links]);

  const copyToClipboard = async (url: string, id: string) => {
    await navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const simulateClick = (id: string) => {
    setLinks((prev) =>
      prev.map((link) =>
        link.id === id
          ? {
              ...link,
              clicks: link.clicks + 1,
              growth: link.growth + (Math.random() * 2 - 1),
            }
          : link
      )
    );
  };

  const getStatusBadge = (status: SocialLink["status"]) => {
    switch (status) {
      case "hot":
        return {
          text: "Hot",
          color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
        };
      case "new":
        return {
          text: "New",
          color:
            "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        };
      default:
        return {
          text: "Active",
          color:
            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        };
    }
  };

  const totalClicks = links.reduce((acc, link) => acc + link.clicks, 0);
  const mostClicked = links.reduce((prev, current) =>
    current.clicks > prev.clicks ? current : prev
  );

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
          {/* Header */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Animated Social Links
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Interactive links with real-time analytics
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.totalClicks.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Clicks
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    +{stats.avgGrowth.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Avg Growth
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <Zap size={20} className="text-blue-600" />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {stats.hotLinks}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Hot Links
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <TrendingUp size={20} className="text-green-600" />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {stats.activeLinks}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Active
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <Target size={20} className="text-purple-600" />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {mostClicked.platform}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Top Platform
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <Users size={20} className="text-orange-600" />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {Math.round(totalClicks / links.length)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Avg Clicks
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Animated Links Grid */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {links.map((link) => {
                const statusBadge = getStatusBadge(link.status);
                return (
                  <motion.div
                    key={link.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setHoveredLink(link.id)}
                    onHoverEnd={() => setHoveredLink(null)}
                    className="relative"
                  >
                    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 overflow-hidden">
                      {/* Background Gradient Animation */}
                      <motion.div
                        className="absolute inset-0 opacity-0"
                        animate={{
                          opacity: hoveredLink === link.id ? 0.1 : 0,
                          scale: hoveredLink === link.id ? 1 : 0.8,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className={`w-full h-full bg-linear-to-br ${link.gradient}`}
                        ></div>
                      </motion.div>

                      <div className="relative z-10">
                        {/* Link Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`text-3xl ${link.color}`}>
                              {link.icon}
                            </div>
                            <div>
                              <div className="font-bold text-gray-900 dark:text-white">
                                {link.platform}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {link.clicks.toLocaleString()} clicks
                              </div>
                            </div>
                          </div>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${statusBadge.color}`}
                          >
                            {statusBadge.text}
                          </span>
                        </div>

                        {/* Growth Indicator */}
                        <div className="flex items-center gap-2 mb-4">
                          <TrendingUp size={14} className="text-green-600" />
                          <span className="text-sm text-green-600">
                            +{link.growth.toFixed(1)}%
                          </span>
                          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                            <div
                              className={`h-2 rounded-full bg-linear-to-r ${link.gradient}`}
                              style={{ width: `${Math.min(link.growth, 30)}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => copyToClipboard(link.url, link.id)}
                              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                              title="Copy link"
                            >
                              {copied === link.id ? (
                                <Check size={16} className="text-green-600" />
                              ) : (
                                <Copy size={16} className="text-gray-500" />
                              )}
                            </button>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => simulateClick(link.id)}
                              className={`px-4 py-2 bg-linear-to-r ${link.gradient} text-white rounded-lg hover:opacity-90 flex items-center gap-2`}
                            >
                              Visit
                              <ExternalLink size={14} />
                            </a>
                          </div>

                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900 dark:text-white">
                              {link.clicks}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              Clicks
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Click Animation */}
            <AnimatePresence>
              {hoveredLink && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
                >
                  <div className="relative">
                    <Sparkles size={64} className="text-yellow-400" />
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0, 1],
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0"
                    >
                      <Sparkles
                        size={64}
                        className="text-yellow-400 opacity-50"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Performance Chart */}
            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                Link Performance
              </h3>
              <div className="space-y-3">
                {links.map((link) => (
                  <div key={link.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{link.icon}</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {link.platform}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900 dark:text-white">
                          {link.clicks.toLocaleString()}
                        </div>
                        <div className="text-sm text-green-600">
                          +{link.growth.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-linear-to-r ${link.gradient}`}
                        style={{
                          width: `${(link.clicks / totalClicks) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="flex-1 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 flex items-center justify-center gap-2">
                <Share2 size={20} />
                Share All Links
              </button>
              <button className="flex-1 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
