"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  TrendingUp,
  Target,
  Zap,
  ExternalLink,
  Share2,
  Copy,
  Check,
  Globe,
  Award,
} from "lucide-react";

interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  handle: string;
  followers: number;
  growth: number;
  color: string;
  url: string;
  verified: boolean;
}

export default function InteractiveSocialBadge() {
  const [activePlatform, setActivePlatform] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const platforms: SocialPlatform[] = [
    {
      id: "twitter",
      name: "Twitter",
      icon: "🐦",
      handle: "@techinnovator",
      followers: 28450,
      growth: 12.5,
      color: "bg-sky-500",
      url: "https://twitter.com/techinnovator",
      verified: true,
    },
    {
      id: "github",
      name: "GitHub",
      icon: "💻",
      handle: "techinnovator",
      followers: 8450,
      growth: 8.2,
      color: "bg-gray-800",
      url: "https://github.com/techinnovator",
      verified: true,
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: "💼",
      handle: "alex-tech",
      followers: 15600,
      growth: 15.3,
      color: "bg-blue-700",
      url: "https://linkedin.com/in/alex-tech",
      verified: true,
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: "📸",
      handle: "@tech.daily",
      followers: 42500,
      growth: 21.7,
      color: "bg-pink-600",
      url: "https://instagram.com/tech.daily",
      verified: true,
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: "🎥",
      handle: "Tech Insights",
      followers: 89200,
      growth: 18.4,
      color: "bg-red-600",
      url: "https://youtube.com/c/techinsights",
      verified: true,
    },
  ];

  const totalFollowers = platforms.reduce(
    (acc, platform) => acc + platform.followers,
    0
  );
  const averageGrowth =
    platforms.reduce((acc, platform) => acc + platform.growth, 0) /
    platforms.length;
  const topPlatform = platforms.reduce((prev, current) =>
    prev.followers > current.followers ? prev : current
  );

  const copyProfileUrl = () => {
    navigator.clipboard.writeText("https://techinnovator.com/profile");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPlatformDetails = (platformId: string) => {
    return platforms.find((p) => p.id === platformId);
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
          {/* Header */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">AI</span>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Pro
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      Alex Innovator
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Tech Influencer & Educator
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Globe size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          techinnovator.com
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award size={16} className="text-yellow-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Verified Creator
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {(totalFollowers / 1000).toLocaleString()}K
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total Followers
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Users size={18} className="text-blue-600" />
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">
                          {platforms.length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Platforms
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={18} className="text-green-600" />
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">
                          {averageGrowth.toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Avg Growth
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Target size={18} className="text-purple-600" />
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

                  <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Zap size={18} className="text-orange-600" />
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">
                          Active
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Status
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Cards */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {platforms.map((platform) => (
                <motion.button
                  key={platform.id}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    setActivePlatform(
                      platform.id === activePlatform ? null : platform.id
                    )
                  }
                  className={`p-4 rounded-xl border ${
                    activePlatform === platform.id
                      ? "ring-2 ring-blue-500"
                      : "border-gray-200 dark:border-gray-800"
                  } bg-gray-50 dark:bg-gray-800`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 ${platform.color} rounded-lg flex items-center justify-center text-white text-2xl`}
                      >
                        {platform.icon}
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-gray-900 dark:text-white">
                          {platform.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {platform.handle}
                        </div>
                      </div>
                    </div>
                    {platform.verified && (
                      <div className="text-blue-500" title="Verified">
                        ✓
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {(platform.followers / 1000).toLocaleString()}K
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Followers
                      </div>
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        platform.growth >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {platform.growth >= 0 ? "+" : ""}
                      {platform.growth}%
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Active Platform Details */}
            <AnimatePresence>
              {activePlatform && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-8"
                >
                  {(() => {
                    const platform = getPlatformDetails(activePlatform);
                    if (!platform) return null;

                    return (
                      <div className="p-6 bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-12 h-12 ${platform.color} rounded-lg flex items-center justify-center text-white text-2xl`}
                            >
                              {platform.icon}
                            </div>
                            <div>
                              <div className="font-bold text-gray-900 dark:text-white">
                                {platform.name}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {platform.handle}
                              </div>
                            </div>
                          </div>
                          <a
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white rounded-lg flex items-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-700"
                          >
                            <ExternalLink size={16} />
                            Visit
                          </a>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-white dark:bg-gray-900 rounded-lg">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Followers
                            </div>
                            <div className="text-xl font-bold text-gray-900 dark:text-white">
                              {platform.followers.toLocaleString()}
                            </div>
                          </div>
                          <div className="p-3 bg-white dark:bg-gray-900 rounded-lg">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Growth
                            </div>
                            <div
                              className={`text-xl font-bold ${
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
                      </div>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={copyProfileUrl}
                className="flex-1 py-3 bg-gray-900 dark:bg-gray-800 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 flex items-center justify-center gap-2"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Copied!" : "Copy Profile Link"}
              </button>
              <button className="flex-1 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center gap-2">
                <Share2 size={18} />
                Share Badge
              </button>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {(totalFollowers / 1000).toLocaleString()}K
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Reach
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {platforms.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Active Platforms
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {averageGrowth.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Monthly Growth
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    Top 1%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Influencer Rank
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
