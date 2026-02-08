"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Star, 
  Award, 
  TrendingUp, 
  Users,
  Target,
  Zap,
  Sparkles,
  Check,
  ExternalLink,
  Share2
} from "lucide-react";

interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  handle: string;
  followers: number;
  rank: number;
  color: string;
  achievements: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  required: number;
}

export default function SocialBadgeWithAchievements() {
  const [activeTab, setActiveTab] = useState<"platforms" | "achievements">("platforms");

  const platforms: SocialPlatform[] = [
    {
      id: "twitter",
      name: "Twitter",
      icon: "🐦",
      handle: "@influencer",
      followers: 45200,
      rank: 1,
      color: "bg-sky-500",
      achievements: 5
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: "📸",
      handle: "@creative.influencer",
      followers: 68200,
      rank: 2,
      color: "bg-pink-600",
      achievements: 4
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: "🎥",
      handle: "Influencer Channel",
      followers: 125000,
      rank: 3,
      color: "bg-red-600",
      achievements: 6
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: "💼",
      handle: "Professional Influencer",
      followers: 24500,
      rank: 4,
      color: "bg-blue-700",
      achievements: 3
    },
    {
      id: "tiktok",
      name: "TikTok",
      icon: "🎵",
      handle: "@trending.influencer",
      followers: 89400,
      rank: 5,
      color: "bg-gray-900",
      achievements: 4
    }
  ];

  const achievements: Achievement[] = [
    {
      id: "1",
      title: "Social Prodigy",
      description: "Reach 100K total followers across all platforms",
      icon: <Star size={20} />,
      unlocked: true,
      progress: 350,
      required: 100
    },
    {
      id: "2",
      title: "Engagement Master",
      description: "Achieve 10% average engagement rate",
      icon: <TrendingUp size={20} />,
      unlocked: true,
      progress: 12.5,
      required: 10
    },
    {
      id: "3",
      title: "Platform Dominance",
      description: "Be in top 10% on 3+ platforms",
      icon: <Trophy size={20} />,
      unlocked: false,
      progress: 2,
      required: 3
    },
    {
      id: "4",
      title: "Growth Champion",
      description: "Grow followers by 25% in a month",
      icon: <Zap size={20} />,
      unlocked: true,
      progress: 32,
      required: 25
    },
    {
      id: "5",
      title: "Content King",
      description: "Publish 100 posts in a month",
      icon: <Award size={20} />,
      unlocked: false,
      progress: 68,
      required: 100
    },
    {
      id: "6",
      title: "Community Leader",
      description: "Get 1000+ comments across platforms",
      icon: <Users size={20} />,
      unlocked: true,
      progress: 1250,
      required: 1000
    }
  ];

  const totalFollowers = platforms.reduce((acc, platform) => acc + platform.followers, 0);
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  const totalAchievements = achievements.length;
  const topPlatform = platforms.reduce((prev, current) => 
    prev.followers > current.followers ? prev : current
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
          {/* Header */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-linear-to-br from-yellow-400 to-orange-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">CI</span>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-linear-to-br from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Elite
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      Chris Influencer
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">Award-Winning Content Creator</p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-blue-600" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {(totalFollowers / 1000).toLocaleString()}K followers
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy size={16} className="text-yellow-600" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {unlockedAchievements} achievements unlocked
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp size={16} className="text-green-600" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Top 5% Creator</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {Math.round((unlockedAchievements / totalAchievements) * 100)}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Achievement Progress</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Target size={18} className="text-blue-600" />
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">#{topPlatform.rank}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Platform Rank</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={18} className="text-green-600" />
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">+24.5%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Growth</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Award size={18} className="text-purple-600" />
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">{platforms.length}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Active Platforms</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Sparkles size={18} className="text-yellow-600" />
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">{unlockedAchievements}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Badges Earned</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-800">
            <div className="flex">
              <button
                onClick={() => setActiveTab("platforms")}
                className={`flex-1 py-4 text-center font-medium ${activeTab === "platforms" 
                  ? "text-blue-600 border-b-2 border-blue-600" 
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"}`}
              >
                Social Platforms
              </button>
              <button
                onClick={() => setActiveTab("achievements")}
                className={`flex-1 py-4 text-center font-medium ${activeTab === "achievements" 
                  ? "text-blue-600 border-b-2 border-blue-600" 
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"}`}
              >
                Achievements
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "platforms" ? (
              <div className="space-y-6">
                {/* Platform Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {platforms.map((platform) => (
                    <div
                      key={platform.id}
                      className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-800"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 ${platform.color} rounded-lg flex items-center justify-center text-white text-2xl`}>
                            {platform.icon}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 dark:text-white">{platform.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{platform.handle}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                            Rank #{platform.rank}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
                          <div className="font-bold text-gray-900 dark:text-white">
                            {(platform.followers / 1000).toLocaleString()}K
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600 dark:text-gray-400">Achievements</div>
                          <div className="flex items-center gap-1">
                            <Trophy size={14} className="text-yellow-600" />
                            <span className="font-bold text-gray-900 dark:text-white">{platform.achievements}</span>
                          </div>
                        </div>
                      </div>
                      
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 w-full py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-600"
                      >
                        <ExternalLink size={16} />
                        Visit Profile
                      </a>
                    </div>
                  ))}
                </div>

                {/* Platform Stats */}
                <div className="p-4 bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Platform Performance</h4>
                  <div className="space-y-2">
                    {platforms.map((platform) => (
                      <div key={platform.id} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 ${platform.color} rounded-full`}></div>
                            <span className="text-gray-700 dark:text-gray-300">{platform.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900 dark:text-white">
                              {(platform.followers / 1000).toLocaleString()}K
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {(platform.followers / totalFollowers * 100).toFixed(1)}% of total
                            </div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${platform.color}`}
                            style={{ width: `${(platform.followers / totalFollowers) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-xl border ${achievement.unlocked 
                        ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20" 
                        : "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800"}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${achievement.unlocked 
                            ? "bg-yellow-500 text-white" 
                            : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`}
                          >
                            {achievement.icon}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 dark:text-white">{achievement.title}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {achievement.unlocked ? "Unlocked" : "In Progress"}
                            </div>
                          </div>
                        </div>
                        {achievement.unlocked && (
                          <Check size={20} className="text-green-600" />
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{achievement.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Progress</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {achievement.progress}/{achievement.required}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${achievement.unlocked ? "bg-green-500" : "bg-blue-500"}`}
                            style={{ width: `${Math.min((achievement.progress / achievement.required) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Achievement Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{unlockedAchievements}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Unlocked</div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {totalAchievements - unlockedAchievements}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Remaining</div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {Math.round((unlockedAchievements / totalAchievements) * 100)}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Completion</div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">Elite</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Current Tier</div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 flex items-center justify-center gap-2">
                  <Share2 size={20} />
                  Share Profile Badge
                </button>
                <button className="flex-1 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  View Full Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}