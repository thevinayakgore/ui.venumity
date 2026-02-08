"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  Brain,
  Target,
  Clock,
  Zap,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  BarChart3,
} from "lucide-react";

interface ShareRecommendation {
  platform: string;
  icon: string;
  reason: string;
  bestTime: string;
  successRate: number;
  color: string;
}

interface ShareSchedule {
  time: string;
  platforms: string[];
  description: string;
}

interface Analytics {
  optimalTime: string;
  recommendedPlatform: string;
  expectedReach: number;
  engagementScore: number;
}

export default function IntelligentShareAssistant() {
  const [copied, setCopied] = useState(false);
  const [activeRecommendation, setActiveRecommendation] = useState<
    string | null
  >(null);
  const [analytics] = useState<Analytics>({
    optimalTime: "14:00",
    recommendedPlatform: "LinkedIn",
    expectedReach: 24500,
    engagementScore: 87,
  });
  const [showTips, setShowTips] = useState(true);

  const shareUrl = "https://example.com/intelligent-content";
  const shareTitle = "The Intelligent Guide to Modern Web Development";

  const recommendations: ShareRecommendation[] = [
    {
      platform: "LinkedIn",
      icon: "💼",
      reason: "Professional audience, high B2B engagement",
      bestTime: "Weekdays 9AM-11AM",
      successRate: 92,
      color: "bg-blue-700",
    },
    {
      platform: "Twitter",
      icon: "🐦",
      reason: "Viral potential, tech community active",
      bestTime: "Weekdays 12PM-3PM",
      successRate: 88,
      color: "bg-sky-500",
    },
    {
      platform: "Facebook",
      icon: "📘",
      reason: "Broad reach, diverse demographics",
      bestTime: "Evenings 7PM-9PM",
      successRate: 85,
      color: "bg-blue-600",
    },
    {
      platform: "Email Newsletter",
      icon: "📧",
      reason: "High conversion, targeted audience",
      bestTime: "Tuesday 10AM",
      successRate: 95,
      color: "bg-gray-600",
    },
  ];

  const schedule: ShareSchedule[] = [
    {
      time: "Today 14:00",
      platforms: ["LinkedIn", "Twitter"],
      description: "Optimal time for professional audience",
    },
    {
      time: "Tomorrow 19:00",
      platforms: ["Facebook", "Instagram"],
      description: "Evening engagement peak",
    },
    {
      time: "Wednesday 10:00",
      platforms: ["Email", "LinkedIn"],
      description: "Mid-week professional focus",
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = (platform: string) => {
    const shareUrls: Record<string, string> = {
      LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,
      Twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl
      )}&text=${encodeURIComponent(shareTitle)}`,
      Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      "Email Newsletter": `mailto:?subject=${encodeURIComponent(
        shareTitle
      )}&body=${encodeURIComponent(shareUrl)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank");
      setActiveRecommendation(platform);
      setTimeout(() => setActiveRecommendation(null), 1500);
    }
  };

  const handleSmartShare = () => {
    const bestPlatform = recommendations.reduce((prev, current) =>
      current.successRate > prev.successRate ? current : prev
    );
    handleShare(bestPlatform.platform);
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
          {/* Header */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-linear-to-br from-purple-500 to-pink-600 rounded-xl">
                  <Brain className="text-white" size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Intelligent Share Assistant
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    AI-powered recommendations for maximum engagement
                  </p>
                </div>
              </div>

              <button
                onClick={handleSmartShare}
                className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg flex items-center gap-2 font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                <Zap size={20} />
                Smart Share
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Content Preview */}
            <div className="mb-8">
              <div className="h-48 bg-linear-to-r from-cyan-500 to-blue-600 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                <span className="text-white text-2xl font-bold z-10">
                  Premium Content
                </span>
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {shareTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Advanced techniques and strategies for modern web development
                success.
              </p>
            </div>

            {/* AI Recommendations */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Brain size={20} className="text-purple-600" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    AI Recommendations
                  </h3>
                </div>
                <button
                  onClick={() => setShowTips(!showTips)}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                >
                  {showTips ? "Hide Tips" : "Show Tips"}
                </button>
              </div>

              <AnimatePresence>
                {showTips && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
                  >
                    <div className="flex items-start gap-3">
                      <Sparkles size={20} className="text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white mb-1">
                          Pro Tip: Optimize Your Sharing
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Based on analytics, {analytics.recommendedPlatform} at{" "}
                          {analytics.optimalTime} will yield the highest
                          engagement. Add a personal message for 42% better
                          results.
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map((rec) => (
                  <motion.div
                    key={rec.platform}
                    whileHover={{ y: -4 }}
                    className={`p-4 rounded-xl border ${
                      activeRecommendation === rec.platform
                        ? "ring-2 ring-purple-500"
                        : "border-gray-200 dark:border-gray-800"
                    } bg-gray-50 dark:bg-gray-800`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 ${rec.color} rounded-lg flex items-center justify-center text-white text-xl`}
                        >
                          {rec.icon}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white">
                            {rec.platform}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {rec.successRate}% success rate
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Best at
                        </div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {rec.bestTime}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                      {rec.reason}
                    </p>
                    <button
                      onClick={() => handleShare(rec.platform)}
                      className={`w-full py-2 ${rec.color} text-white rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}
                    >
                      <Share2 size={16} />
                      Share on {rec.platform}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Analytics & Schedule */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Analytics */}
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <BarChart3 size={20} className="text-blue-600" />
                  Performance Analytics
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300">
                        Optimal Sharing Time
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {analytics.optimalTime}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="w-3/4 h-2 bg-linear-to-r from-blue-500 to-purple-600 rounded-full"></div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300">
                        Recommended Platform
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {analytics.recommendedPlatform}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="w-4/5 h-2 bg-linear-to-r from-green-500 to-green-600 rounded-full"></div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300">
                        Expected Reach
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {analytics.expectedReach.toLocaleString()}+
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="w-2/3 h-2 bg-linear-to-r from-orange-500 to-red-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Clock size={20} className="text-purple-600" />
                  Recommended Schedule
                </h3>
                <div className="space-y-3">
                  {schedule.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {item.time}
                        </div>
                        <div className="flex gap-1">
                          {item.platforms.map((platform) => (
                            <span
                              key={platform}
                              className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                            >
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Share URL & Actions */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    Share URL
                  </h4>
                  <ExternalLink size={18} className="text-gray-500" />
                </div>
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
                      title={copied ? "Copied!" : "Copy link"}
                    >
                      {copied ? (
                        <Check size={18} className="text-green-600" />
                      ) : (
                        <Copy size={18} className="text-gray-500" />
                      )}
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleSmartShare}
                      className="px-6 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg flex items-center gap-2 font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
                    >
                      <Brain size={20} />
                      Smart Share
                    </button>
                    <button className="px-6 py-4 bg-gray-800 text-white rounded-lg flex items-center gap-2 font-medium hover:bg-gray-900 transition-all">
                      <MessageSquare size={20} />
                      Schedule
                    </button>
                  </div>
                </div>
              </div>

              {/* Status Messages */}
              <AnimatePresence>
                {activeRecommendation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800"
                  >
                    <div className="flex items-center gap-3">
                      <Target size={20} className="text-green-600" />
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">
                          Sharing to {activeRecommendation}...
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Based on AI analysis for maximum engagement
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {copied && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles size={20} className="text-blue-600" />
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">
                          Link Copied to Clipboard!
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Ready to paste. Consider adding a personalized message
                          for better engagement.
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
