"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Share2,
  ExternalLink,
  TrendingUp,
  Users,
} from "lucide-react";

type Platform = {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  shares: number;
  growth: number;
  url: string;
};

export default function SocialMediaShareComponent() {
  const [activePlatform, setActivePlatform] = useState<string>("all");
  const [shared, setShared] = useState(false);

  const platforms: Platform[] = [
    {
      id: "facebook",
      name: "Facebook",
      icon: <Facebook size={24} />,
      color: "bg-blue-600",
      shares: 1245,
      growth: 12,
      url: "https://facebook.com/sharer/sharer.php?u=",
    },
    {
      id: "twitter",
      name: "Twitter",
      icon: <Twitter size={24} />,
      color: "bg-sky-500",
      shares: 876,
      growth: 8,
      url: "https://twitter.com/intent/tweet?url=",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: <Linkedin size={24} />,
      color: "bg-blue-700",
      shares: 543,
      growth: 15,
      url: "https://www.linkedin.com/sharing/share-offsite/?url=",
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: <Instagram size={24} />,
      color: "bg-pink-600",
      shares: 2109,
      growth: 23,
      url: "https://instagram.com/",
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: <Youtube size={24} />,
      color: "bg-red-600",
      shares: 1876,
      growth: 18,
      url: "https://www.youtube.com/",
    },
  ];

  const contentUrl = "https://example.com/amazing-content";
  const contentTitle = "Amazing Content You Should See!";
  const totalShares = platforms.reduce(
    (acc, platform) => acc + platform.shares,
    0
  );

  const handleShare = (platform: Platform) => {
    const shareUrl = `${platform.url}${encodeURIComponent(
      contentUrl
    )}&text=${encodeURIComponent(contentTitle)}`;
    window.open(shareUrl, "_blank");
    setShared(true);
    setTimeout(() => setShared(false), 1500);
  };

  const filteredPlatforms =
    activePlatform === "all"
      ? platforms
      : platforms.filter((p) => p.id === activePlatform);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Share Across Social Platforms
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Spread this amazing content across all social networks
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Total Shares</p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {totalShares.toLocaleString()}
                </h3>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                <Share2
                  className="text-blue-600 dark:text-blue-300"
                  size={24}
                />
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-600">
              <TrendingUp size={16} />
              <span className="ml-2">+15% from last month</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400">
                  Active Platforms
                </p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {platforms.length}
                </h3>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
                <Users
                  className="text-green-600 dark:text-green-300"
                  size={24}
                />
              </div>
            </div>
            <div className="mt-4 text-gray-600 dark:text-gray-400">
              All major networks supported
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400">
                  Engagement Rate
                </p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  89%
                </h3>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
                <TrendingUp
                  className="text-purple-600 dark:text-purple-300"
                  size={24}
                />
              </div>
            </div>
            <div className="mt-4 text-gray-600 dark:text-gray-400">
              High user interaction
            </div>
          </div>
        </div>

        {/* Platform Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <button
            onClick={() => setActivePlatform("all")}
            className={`px-4 py-2 rounded-lg ${
              activePlatform === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
          >
            All Platforms
          </button>
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setActivePlatform(platform.id)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                activePlatform === platform.id
                  ? `${platform.color} text-white`
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              {platform.icon}
              {platform.name}
            </button>
          ))}
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlatforms.map((platform) => (
            <motion.div
              key={platform.id}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              {/* Platform Header */}
              <div className={`p-6 ${platform.color} text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      {platform.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{platform.name}</h3>
                      <p className="text-sm opacity-90">Social Network</p>
                    </div>
                  </div>
                  <ExternalLink size={20} />
                </div>
              </div>

              {/* Platform Stats */}
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Total Shares
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {platform.shares.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${platform.color}`}
                      style={{
                        width: `${(platform.shares / totalShares) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-green-500" />
                    <span className="text-green-600">+{platform.growth}%</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Growth this month
                  </span>
                </div>

                {/* Share Button */}
                <button
                  onClick={() => handleShare(platform)}
                  disabled={shared}
                  className={`w-full py-3 ${platform.color} text-white rounded-lg flex items-center justify-center gap-2 font-medium hover:opacity-90 transition-opacity`}
                >
                  {shared ? "Shared!" : `Share on ${platform.name}`}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Share Bar */}
        <div className="mt-10 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white">
                Quick Share
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Share to all platforms at once
              </p>
            </div>
            <button
              onClick={() => {
                platforms.forEach((platform) => {
                  handleShare(platform);
                });
              }}
              className="px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg flex items-center gap-2 font-medium"
            >
              <Share2 size={20} />
              Share to All
            </button>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
