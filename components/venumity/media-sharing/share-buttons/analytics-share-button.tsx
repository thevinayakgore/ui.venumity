"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  TrendingUp,
  Users,
  Target,
  Clock,
  Copy,
  Check,
  ExternalLink,
  Zap,
  Sparkles,
} from "lucide-react";

interface ShareData {
  hour: number;
  shares: number;
}

interface PlatformStats {
  id: string;
  name: string;
  icon: string;
  shares: number;
  growth: number;
  color: string;
}

export default function EnhancedShareButtonWithAnalytics() {
  const [copied, setCopied] = useState(false);
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("24h");
  const [shareData, setShareData] = useState<ShareData[]>([]);
  const [platformStats, setPlatformStats] = useState<PlatformStats[]>([
    {
      id: "twitter",
      name: "Twitter",
      icon: "🐦",
      shares: 1245,
      growth: 12.5,
      color: "bg-sky-500",
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: "📘",
      shares: 987,
      growth: 8.2,
      color: "bg-blue-600",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: "💼",
      shares: 654,
      growth: 15.3,
      color: "bg-blue-700",
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: "💚",
      shares: 432,
      growth: 21.7,
      color: "bg-green-600",
    },
    {
      id: "email",
      name: "Email",
      icon: "📧",
      shares: 321,
      growth: 5.4,
      color: "bg-gray-600",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const shareUrl = "https://example.com/premium-content";
  const shareTitle = "Exclusive: The Future of AI Revealed!";

  const generateShareData = useCallback(() => {
    setLoading(true);
    const points = timeRange === "24h" ? 24 : timeRange === "7d" ? 7 : 30;
    const data: ShareData[] = [];

    for (let i = 0; i < points; i++) {
      const baseShares = Math.floor(Math.random() * 50);
      const isPeak =
        timeRange === "24h" ? i >= 14 && i <= 18 : i === Math.floor(points / 2);
      const shares = isPeak ? baseShares + 100 : baseShares;

      data.push({
        hour: i,
        shares,
      });
    }

    setTimeout(() => {
      setShareData(data);
      setLoading(false);
    }, 300);
  }, [timeRange]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      generateShareData();
    }, 0); // run after current render
    return () => clearTimeout(timeout); // cleanup on unmount or timeRange change
  }, [generateShareData]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = (platformId: string) => {
    const platform = platformStats.find((p) => p.id === platformId);
    if (!platform) return;

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl
      )}&text=${encodeURIComponent(shareTitle)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(
        shareTitle
      )}%20${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(
        shareTitle
      )}&body=${encodeURIComponent(shareUrl)}`,
    };

    if (shareUrls[platformId]) {
      window.open(shareUrls[platformId], "_blank");
    }

    // Simulate share increment with animation
    setPlatformStats((prev) =>
      prev.map((p) =>
        p.id === platformId ? { ...p, shares: p.shares + 1 } : p
      )
    );
  };

  const totalShares = platformStats.reduce((acc, stat) => acc + stat.shares, 0);
  const todayShares = shareData.reduce((acc, data) => acc + data.shares, 0);
  const peakHour =
    shareData.length > 0
      ? shareData.reduce((prev, current) =>
          prev.shares > current.shares ? prev : current
        ).hour
      : 0;

  const topPlatform = platformStats.reduce((prev, current) =>
    prev.shares > current.shares ? prev : current
  );

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
          {/* Header with Stats */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Share Analytics Dashboard
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Track performance and share across multiple platforms
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {totalShares.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Shares
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {todayShares}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Today
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                    <Target
                      className="text-blue-600 dark:text-blue-300"
                      size={20}
                    />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {topPlatform.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Top Platform
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                    <TrendingUp
                      className="text-green-600 dark:text-green-300"
                      size={20}
                    />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      +24.5%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Growth Rate
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
                    <Clock
                      className="text-purple-600 dark:text-purple-300"
                      size={20}
                    />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {peakHour}:00
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Peak Hour
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-800 rounded-lg">
                    <Users
                      className="text-orange-600 dark:text-orange-300"
                      size={20}
                    />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {Math.round(totalShares / platformStats.length)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Avg per Platform
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8">
            {/* Time Range Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
                Share Performance
              </h3>
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                {(["24h", "7d", "30d"] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      timeRange === range
                        ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Share Chart */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <div className="h-64">
                  {loading ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : (
                    <div className="h-full flex items-end gap-1">
                      {shareData.map((data, index) => (
                        <div
                          key={index}
                          className="flex-1 flex flex-col items-center"
                        >
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{
                              height: `${(data.shares / 150) * 100}%`,
                            }}
                            transition={{ duration: 0.5, delay: index * 0.02 }}
                            className="w-full bg-linear-to-t from-blue-500 to-blue-600 rounded-t-lg hover:opacity-80 cursor-pointer transition-opacity"
                            title={`${data.shares} shares`}
                          />
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            {timeRange === "24h"
                              ? `${data.hour}:00`
                              : `Day ${data.hour + 1}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Platform Performance */}
              <div className="space-y-4">
                <h4 className="font-bold text-gray-900 dark:text-white">
                  Platform Performance
                </h4>
                {platformStats.map((platform) => (
                  <div key={platform.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 ${platform.color} rounded-lg flex items-center justify-center text-white text-lg`}
                        >
                          {platform.icon}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {platform.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {platform.shares.toLocaleString()} shares
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-sm font-medium ${
                            platform.growth >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {platform.growth >= 0 ? "+" : ""}
                          {platform.growth}%
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${platform.color}`}
                        style={{
                          width: `${(platform.shares / totalShares) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Share URL & Actions */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-gray-900 dark:text-white">
                  Share This Content
                </h4>
                <ExternalLink size={18} className="text-gray-500" />
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={shareUrl}
                      readOnly
                      className="w-full p-4 pr-12 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 truncate"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                    >
                      {copied ? (
                        <Check size={18} className="text-green-600" />
                      ) : (
                        <Copy size={18} className="text-gray-500" />
                      )}
                    </button>
                  </div>

                  <button
                    onClick={() => handleShare(topPlatform.id)}
                    className="px-6 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg flex items-center justify-center gap-2 font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    <Share2 size={20} />
                    Quick Share
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {platformStats.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => handleShare(platform.id)}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 ${platform.color} text-white hover:opacity-90 transition-opacity`}
                    >
                      <span className="text-lg">{platform.icon}</span>
                      <span className="text-sm">{platform.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Insights */}
            <div className="bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap size={20} className="text-blue-600" />
                <h4 className="font-bold text-gray-900 dark:text-white">
                  Quick Insights
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">
                      Best Time to Share
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {peakHour}:00
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">
                      Recommended Platform
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {topPlatform.name}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">
                      Expected Reach
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {(totalShares * 10).toLocaleString()}+
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">
                      Engagement Score
                    </span>
                    <span className="font-medium text-green-600">High</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Message */}
            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles size={20} className="text-green-600" />
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        Link Copied!
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        You can now paste the share link anywhere
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
