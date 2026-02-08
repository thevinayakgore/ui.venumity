// app/components/social-links/10.2-interactive-social-links/page.tsx
"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Copy,
  Check,
  Share2,
  QrCode,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

interface SocialLink {
  id: string;
  platform: string;
  icon: string;
  url: string;
  username: string;
  color: string;
  active: boolean;
  clicks: number;
}

export default function InteractiveSocialLinks() {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [links, setLinks] = useState<SocialLink[]>([
    {
      id: "1",
      platform: "Portfolio",
      icon: "🎨",
      url: "https://portfolio.dev",
      username: "portfolio.dev",
      color: "text-blue-600",
      active: true,
      clicks: 1245,
    },
    {
      id: "2",
      platform: "GitHub",
      icon: "💻",
      url: "https://github.com/dev",
      username: "@dev",
      color: "text-gray-800 dark:text-gray-300",
      active: true,
      clicks: 892,
    },
    {
      id: "3",
      platform: "Twitter",
      icon: "🐦",
      url: "https://twitter.com/dev",
      username: "@dev",
      color: "text-sky-500",
      active: true,
      clicks: 1567,
    },
    {
      id: "4",
      platform: "LinkedIn",
      icon: "💼",
      url: "https://linkedin.com/in/dev",
      username: "dev",
      color: "text-blue-700",
      active: false,
      clicks: 0,
    },
    {
      id: "5",
      platform: "Instagram",
      icon: "📸",
      url: "https://instagram.com/dev",
      username: "@dev",
      color: "text-pink-600",
      active: true,
      clicks: 2345,
    },
    {
      id: "6",
      platform: "YouTube",
      icon: "🎥",
      url: "https://youtube.com/@dev",
      username: "dev",
      color: "text-red-600",
      active: true,
      clicks: 5678,
    },
  ]);

  const activeLinks = links.filter((link) => link.active);
  const totalClicks = links.reduce((acc, link) => acc + link.clicks, 0);
  const mostClicked = links.reduce((prev, current) =>
    current.clicks > prev.clicks ? current : prev
  );

  const copyToClipboard = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleLink = (id: string) => {
    setLinks((prev) =>
      prev.map((link) =>
        link.id === id ? { ...link, active: !link.active } : link
      )
    );
  };

  const handleLinkClick = (id: string) => {
    setActiveLink(id);
    setLinks((prev) =>
      prev.map((link) =>
        link.id === id ? { ...link, clicks: link.clicks + 1 } : link
      )
    );
    setTimeout(() => setActiveLink(null), 1000);
  };

  const qrPattern = useMemo(
    () => {
      // deterministic pseudo pattern without random
      const arr: boolean[] = [];
      for (let i = 0; i < 64; i++) {
        // simple deterministic formula based on index
        arr.push((i * 7) % 13 > 6);
      }
      return arr;
    },
    []
  );

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-2xl">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
          {/* Header */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Social Links Hub
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {activeLinks.length} active links
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {totalClicks}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Clicks
                  </div>
                </div>
                <button
                  onClick={() => setShowQR(!showQR)}
                  className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <QrCode size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* QR Code View */}
          <AnimatePresence>
            {showQR && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-8 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800"
              >
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto mb-4 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl p-4">
                    <div className="w-full h-full bg-white rounded-lg flex items-center justify-center">
                      <div className="grid grid-cols-8 gap-1">
                        {qrPattern.map((filled, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 ${
                              filled ? "bg-gray-900" : "bg-transparent"
                            } rounded-sm`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Scan to visit my social hub
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Social Links Grid */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {links.map((link) => (
                <motion.div
                  key={link.id}
                  whileHover={{ y: -4 }}
                  className={`p-4 rounded-xl border ${
                    link.active
                      ? "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800"
                      : "border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 opacity-60"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`text-2xl ${
                          link.active ? link.color : "text-gray-400"
                        }`}
                      >
                        {link.icon}
                      </div>
                      <div>
                        <div
                          className={`font-bold ${
                            link.active
                              ? "text-gray-900 dark:text-white"
                              : "text-gray-500"
                          }`}
                        >
                          {link.platform}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {link.username}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleLink(link.id)}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                      title={link.active ? "Hide link" : "Show link"}
                    >
                      {link.active ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {link.clicks} clicks
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(link.url)}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                        title="Copy link"
                      >
                        <Copy size={16} className="text-gray-500" />
                      </button>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleLinkClick(link.id)}
                        className="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 flex items-center gap-2"
                      >
                        Visit
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Click Animation */}
            <AnimatePresence>
              {activeLink && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
                >
                  <Sparkles size={48} className="text-yellow-400" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stats */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {activeLinks.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Active Links
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {totalClicks}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Clicks
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {mostClicked.platform}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Most Clicked
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {Math.round(totalClicks / links.length)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Avg per Link
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() =>
                  copyToClipboard(links.map((l) => l.url).join("\n"))
                }
                className="flex-1 py-3 bg-gray-900 dark:bg-gray-800 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 flex items-center justify-center gap-2"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Copied All!" : "Copy All Links"}
              </button>
              <button className="flex-1 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center gap-2">
                <Share2 size={18} />
                Share Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
