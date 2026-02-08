"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown,
  Trophy,
  TrendingUp,
  Users,
  Target,
  Zap,
  Globe,
  Share2,
  ExternalLink,
  Award,
  Star,
  Check,
  Sparkles,
} from "lucide-react";

interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  handle: string;
  followers: number;
  growth: number;
  engagement: number;
  tier: string;
  color: string;
  verified: boolean;
}

interface Milestone {
  title: string;
  description: string;
  achieved: boolean;
  date?: string;
  icon: React.ReactNode;
}

export default function PremiumSocialBadge() {
  const [platforms] = useState<SocialPlatform[]>([
    {
      id: "twitter",
      name: "Twitter",
      icon: "🐦",
      handle: "@premium",
      followers: 125400,
      growth: 15.2,
      engagement: 6.8,
      tier: "Diamond",
      color: "bg-linear-to-br from-sky-500 to-blue-600",
      verified: true,
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: "📸",
      handle: "@premium.creator",
      followers: 245800,
      growth: 28.4,
      engagement: 8.2,
      tier: "Diamond",
      color: "bg-linear-to-br from-pink-600 to-rose-600",
      verified: true,
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: "🎥",
      handle: "Premium Content",
      followers: 452100,
      growth: 22.7,
      engagement: 9.1,
      tier: "Platinum",
      color: "bg-linear-to-br from-red-600 to-orange-600",
      verified: true,
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: "💼",
      handle: "Premium Pro",
      followers: 89200,
      growth: 18.9,
      engagement: 4.5,
      tier: "Gold",
      color: "bg-linear-to-br from-blue-700 to-blue-900",
      verified: true,
    },
    {
      id: "tiktok",
      name: "TikTok",
      icon: "🎵",
      handle: "@premium.trends",
      followers: 325600,
      growth: 42.3,
      engagement: 12.8,
      tier: "Diamond",
      color: "bg-linear-to-br from-gray-900 to-black",
      verified: true,
    },
  ]);

  const [milestones] = useState<Milestone[]>([
    {
      title: "First 10K",
      description: "Reached 10K followers",
      achieved: true,
      date: "Jan 2023",
      icon: <Star size={16} />,
    },
    {
      title: "Verified",
      description: "Got verified on 3 platforms",
      achieved: true,
      date: "Mar 2023",
      icon: <Check size={16} />,
    },
    {
      title: "100K Club",
      description: "Hit 100K total followers",
      achieved: true,
      date: "Jun 2023",
      icon: <Trophy size={16} />,
    },
    {
      title: "1M Views",
      description: "Single video reached 1M views",
      achieved: true,
      date: "Sep 2023",
      icon: <TrendingUp size={16} />,
    },
    {
      title: "500K Total",
      description: "500K total followers",
      achieved: false,
      icon: <Target size={16} />,
    },
    {
      title: "Top 1%",
      description: "Enter top 1% of creators",
      achieved: false,
      icon: <Crown size={16} />,
    },
  ]);

  const [selectedPlatform, setSelectedPlatform] = useState<string>("twitter");
  const [showSparkles, setShowSparkles] = useState(false);
  const [totalFollowers] = useState(0);
  const [averageEngagement] = useState(0);
  const [sparklePositions, setSparklePositions] = useState<
    { x: number; y: number }[]
  >([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // Generate random positions
        const positions = Array.from({ length: 15 }, () => ({
          x: Math.random() * 100,
          y: Math.random() * 100,
        }));
        setSparklePositions(positions);
        setShowSparkles(true);
        setTimeout(() => setShowSparkles(false), 1000);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [platforms]);

  const selectedPlatformData = platforms.find((p) => p.id === selectedPlatform);
  const unlockedMilestones = milestones.filter((m) => m.achieved).length;

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Diamond":
        return "text-purple-600";
      case "Platinum":
        return "text-gray-600";
      case "Gold":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const getTierBg = (tier: string) => {
    switch (tier) {
      case "Diamond":
        return "bg-linear-to-br from-purple-100 to-purple-50 dark:from-purple-900/20 dark:to-purple-800/20";
      case "Platinum":
        return "bg-linear-to-br from-gray-100 to-gray-50 dark:from-gray-900/20 dark:to-gray-800/20";
      case "Gold":
        return "bg-linear-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900/20 dark:to-yellow-800/20";
      default:
        return "bg-gray-100 dark:bg-gray-900";
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
          {/* Premium Header */}
          <div className="relative p-8 bg-linear-to-r from-purple-600 to-pink-600">
            <AnimatePresence>
              {showSparkles &&
                sparklePositions.map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{ y: "100%", x: pos.x, opacity: 0 }}
                    animate={{ y: "-100%", x: pos.x, opacity: [0, 1, 0] }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <Sparkles size={20} className="text-white" />
                  </motion.div>
                ))}
            </AnimatePresence>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex items-start gap-6">
                  <div className="relative">
                    <div className="w-28 h-28 bg-linear-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                      <span className="text-white text-4xl font-bold">PC</span>
                    </div>
                    <div className="absolute -bottom-3 -right-3 bg-linear-to-br from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <Crown size={14} />
                      Premium
                    </div>
                  </div>

                  <div className="text-white">
                    <h2 className="text-3xl font-bold mb-2">Premium Creator</h2>
                    <p className="text-white/90 mb-4">
                      Award-winning digital influencer
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <Users size={18} className="text-white/90" />
                        <span className="text-sm">
                          {(totalFollowers / 1000000).toFixed(1)}M followers
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp size={18} className="text-white/90" />
                        <span className="text-sm">+24.5% monthly growth</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award size={18} className="text-white/90" />
                        <span className="text-sm">Verified Creator</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right text-white">
                  <div className="text-4xl font-bold">
                    {(totalFollowers / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-white/90">Total Reach</div>
                  <button className="mt-4 px-6 py-2 bg-white text-purple-700 rounded-lg font-medium hover:bg-white/90 transition-all">
                    <Share2 size={16} className="inline mr-2" />
                    Share Badge
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8">
            {/* Platform Selector */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Globe size={20} className="text-blue-600" />
                Social Platforms
              </h3>

              <div className="flex flex-wrap gap-3 mb-6">
                {platforms.map((platform) => (
                  <motion.button
                    key={platform.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`px-4 py-3 rounded-xl flex items-center gap-3 ${
                      selectedPlatform === platform.id
                        ? "ring-2 ring-offset-2 ring-purple-500 bg-white dark:bg-gray-800"
                        : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 ${platform.color} rounded-lg flex items-center justify-center text-white text-xl`}
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
                  </motion.button>
                ))}
              </div>

              {/* Selected Platform Details */}
              {selectedPlatformData && (
                <motion.div
                  key={selectedPlatform}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <div
                    className={`p-6 rounded-xl ${getTierBg(
                      selectedPlatformData.tier
                    )} border border-gray-200 dark:border-gray-800`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                      <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <div
                          className={`w-16 h-16 ${selectedPlatformData.color} rounded-xl flex items-center justify-center text-white text-3xl`}
                        >
                          {selectedPlatformData.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              {selectedPlatformData.name}
                            </div>
                            {selectedPlatformData.verified && (
                              <div className="text-blue-500" title="Verified">
                                ✓
                              </div>
                            )}
                          </div>
                          <div className="text-gray-600 dark:text-gray-400">
                            {selectedPlatformData.handle}
                          </div>
                          <div
                            className={`text-sm font-medium ${getTierColor(
                              selectedPlatformData.tier
                            )}`}
                          >
                            {selectedPlatformData.tier} Tier
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <a
                          href="#"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white rounded-lg flex items-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-700"
                        >
                          <ExternalLink size={16} />
                          Visit
                        </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Followers
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {(selectedPlatformData.followers / 1000).toFixed(0)}K
                        </div>
                      </div>

                      <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Growth
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          +{selectedPlatformData.growth.toFixed(1)}%
                        </div>
                      </div>

                      <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Engagement
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {selectedPlatformData.engagement.toFixed(1)}%
                        </div>
                      </div>

                      <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Platform Rank
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          Top 5%
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Milestones & Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Milestones */}
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Trophy size={20} className="text-yellow-600" />
                  Creator Milestones
                </h3>

                <div className="space-y-3">
                  {milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border ${
                        milestone.achieved
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                          : "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              milestone.achieved
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                            }`}
                          >
                            {milestone.icon}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 dark:text-white">
                              {milestone.title}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {milestone.description}
                            </div>
                          </div>
                        </div>
                        <div>
                          {milestone.achieved ? (
                            <div className="flex items-center gap-2">
                              <Check size={16} className="text-green-600" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {milestone.date}
                              </span>
                            </div>
                          ) : (
                            <div className="text-sm text-gray-500">
                              In progress
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Overview */}
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Target size={20} className="text-blue-600" />
                  Performance Overview
                </h3>

                <div className="space-y-4">
                  <div className="p-4 bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Users size={18} className="text-blue-600" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Total Audience
                        </span>
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {(totalFollowers / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="w-4/5 h-2 bg-linear-to-r from-blue-500 to-cyan-600 rounded-full"></div>
                    </div>
                  </div>

                  <div className="p-4 bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp size={18} className="text-green-600" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Avg Engagement
                        </span>
                      </div>
                      <span className="font-bold text-green-600">
                        {averageEngagement.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="w-3/4 h-2 bg-linear-to-r from-green-500 to-emerald-600 rounded-full"></div>
                    </div>
                  </div>

                  <div className="p-4 bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Zap size={18} className="text-purple-600" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Platforms
                        </span>
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {platforms.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="w-full h-2 bg-linear-to-r from-purple-500 to-pink-600 rounded-full"></div>
                    </div>
                  </div>

                  <div className="p-4 bg-linear-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Crown size={18} className="text-yellow-600" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Milestones
                        </span>
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {unlockedMilestones}/{milestones.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="h-2 bg-linear-to-r from-yellow-500 to-orange-600 rounded-full"
                        style={{
                          width: `${
                            (unlockedMilestones / milestones.length) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Comparison */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                Platform Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <th className="text-left py-3 text-gray-600 dark:text-gray-400">
                        Platform
                      </th>
                      <th className="text-left py-3 text-gray-600 dark:text-gray-400">
                        Followers
                      </th>
                      <th className="text-left py-3 text-gray-600 dark:text-gray-400">
                        Growth
                      </th>
                      <th className="text-left py-3 text-gray-600 dark:text-gray-400">
                        Engagement
                      </th>
                      <th className="text-left py-3 text-gray-600 dark:text-gray-400">
                        Tier
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {platforms.map((platform) => (
                      <tr
                        key={platform.id}
                        className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 ${platform.color} rounded-lg flex items-center justify-center text-white`}
                            >
                              {platform.icon}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {platform.name}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {platform.handle}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="font-bold text-gray-900 dark:text-white">
                            {(platform.followers / 1000).toFixed(0)}K
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <TrendingUp size={14} className="text-green-600" />
                            <span className="text-green-600 font-medium">
                              +{platform.growth.toFixed(1)}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {platform.engagement.toFixed(1)}%
                          </div>
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getTierBg(
                              platform.tier
                            )} ${getTierColor(platform.tier)}`}
                          >
                            {platform.tier}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <div className="inline-flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all">
                  Follow All Platforms
                </button>
                <button className="px-8 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                  Download Media Kit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
