"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  Target, 
  Zap, 
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  ExternalLink,
  Award
} from "lucide-react";

interface SocialMetric {
  platform: string;
  icon: string;
  followers: number;
  growth: number;
  engagement: number;
  posts: number;
  color: string;
}

interface LiveUpdate {
  platform: string;
  action: string;
  change: number;
  time: string;
}

export default function DynamicSocialBadge() {
  const [metrics, setMetrics] = useState<SocialMetric[]>([
    { platform: "Twitter", icon: "🐦", followers: 28450, growth: 12.5, engagement: 4.2, posts: 245, color: "bg-sky-500" },
    { platform: "Instagram", icon: "📸", followers: 42500, growth: 21.7, engagement: 6.8, posts: 189, color: "bg-pink-600" },
    { platform: "YouTube", icon: "🎥", followers: 89200, growth: 18.4, engagement: 8.1, posts: 56, color: "bg-red-600" },
    { platform: "LinkedIn", icon: "💼", followers: 15600, growth: 15.3, engagement: 3.9, posts: 78, color: "bg-blue-700" },
    { platform: "TikTok", icon: "🎵", followers: 67200, growth: 32.8, engagement: 12.4, posts: 134, color: "bg-gray-900" }
  ]);

  const [liveUpdates, setLiveUpdates] = useState<LiveUpdate[]>([
    { platform: "Instagram", action: "New Follower", change: 1, time: "Just now" },
    { platform: "Twitter", action: "Post Liked", change: 24, time: "2 min ago" },
    { platform: "YouTube", action: "New Subscriber", change: 1, time: "5 min ago" },
    { platform: "TikTok", action: "Video Shared", change: 8, time: "10 min ago" }
  ]);

  const [selectedMetric, setSelectedMetric] = useState<string>("Twitter");
  const [totalFollowers, setTotalFollowers] = useState(0);
  const [totalEngagement, setTotalEngagement] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Calculate totals
      const followersTotal = metrics.reduce((acc, metric) => acc + metric.followers, 0);
      const engagementTotal = metrics.reduce((acc, metric) => acc + metric.engagement, 0) / metrics.length;
  
      setTotalFollowers(followersTotal);
      setTotalEngagement(engagementTotal);
    }, 0);
  
    // Simulate live updates
    const interval = setInterval(() => {
      const platforms = ["Twitter", "Instagram", "YouTube", "LinkedIn", "TikTok"];
      const actions = ["New Follower", "Post Liked", "Comment Added", "Video Shared", "New Subscriber"];
      const platform = platforms[Math.floor(Math.random() * platforms.length)];
      const action = actions[Math.floor(Math.random() * actions.length)];
  
      setLiveUpdates((prev) => [
        { platform, action, change: Math.floor(Math.random() * 10) + 1, time: "Just now" },
        ...prev.slice(0, 4),
      ]);
  
      // Update metrics
      setMetrics((prev) =>
        prev.map((metric) =>
          metric.platform === platform
            ? {
                ...metric,
                followers: metric.followers + Math.floor(Math.random() * 5),
                growth: metric.growth + (Math.random() * 0.5 - 0.25),
              }
            : metric
        )
      );
    }, 8000);
  
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [metrics]);

  const selectedMetricData = metrics.find(m => m.platform === selectedMetric);
  const topPlatform = metrics.reduce((prev, current) => 
    prev.followers > current.followers ? prev : current
  );
  const fastestGrowing = metrics.reduce((prev, current) => 
    current.growth > prev.growth ? current : prev
  );

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
                <div className="relative">
                  <div className="w-24 h-24 bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">SI</span>
                  </div>
                  <div className="absolute -bottom-2 -right-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    Sarah Influencer
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">Digital Creator & Brand Ambassador</p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-blue-600" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {(totalFollowers / 1000).toLocaleString()}K followers
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp size={16} className="text-green-600" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        +24.5% growth this month
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award size={16} className="text-yellow-600" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Verified Creator</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {(totalFollowers / 1000).toLocaleString()}K
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Audience</div>
                </div>
                <button className="px-6 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                  Follow All
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8">
            {/* Platform Selector */}
            <div className="flex flex-wrap gap-2 mb-8">
              {metrics.map((metric) => (
                <button
                  key={metric.platform}
                  onClick={() => setSelectedMetric(metric.platform)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${selectedMetric === metric.platform 
                    ? `${metric.color} text-white` 
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
                >
                  <span className="text-lg">{metric.icon}</span>
                  {metric.platform}
                </button>
              ))}
            </div>

            {/* Selected Platform Details */}
            {selectedMetricData && (
              <motion.div
                key={selectedMetric}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="p-6 bg-linear-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                      <div className={`w-16 h-16 ${selectedMetricData.color} rounded-xl flex items-center justify-center text-white text-3xl`}>
                        {selectedMetricData.icon}
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{selectedMetricData.platform}</div>
                        <div className="text-gray-600 dark:text-gray-400">
                          {(selectedMetricData.followers / 1000).toLocaleString()}K followers
                        </div>
                      </div>
                    </div>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white rounded-lg flex items-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <ExternalLink size={16} />
                      Visit Profile
                    </a>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-white dark:bg-gray-900 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Users size={18} className="text-blue-600" />
                        <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
                      </div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        {selectedMetricData.followers.toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-white dark:bg-gray-900 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp size={18} className="text-green-600" />
                        <div className="text-sm text-gray-600 dark:text-gray-400">Growth</div>
                      </div>
                      <div className="text-xl font-bold text-green-600">
                        +{selectedMetricData.growth.toFixed(1)}%
                      </div>
                    </div>
                    
                    <div className="p-3 bg-white dark:bg-gray-900 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart size={18} className="text-red-600" />
                        <div className="text-sm text-gray-600 dark:text-gray-400">Engagement</div>
                      </div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        {selectedMetricData.engagement.toFixed(1)}%
                      </div>
                    </div>
                    
                    <div className="p-3 bg-white dark:bg-gray-900 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageCircle size={18} className="text-purple-600" />
                        <div className="text-sm text-gray-600 dark:text-gray-400">Posts</div>
                      </div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        {selectedMetricData.posts}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Live Updates & Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Live Updates */}
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Zap size={20} className="text-yellow-600" />
                  Live Updates
                </h3>
                <div className="space-y-3">
                  {liveUpdates.map((update, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                            <span className="text-lg">
                              {metrics.find(m => m.platform === update.platform)?.icon}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{update.action}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{update.platform}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-green-600">+{update.change}</div>
                          <div className="text-xs text-gray-500">{update.time}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Target size={20} className="text-blue-600" />
                  Performance Overview
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Eye size={18} className="text-blue-600" />
                        <span className="text-gray-700 dark:text-gray-300">Total Reach</span>
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {(totalFollowers / 1000).toLocaleString()}K
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="w-4/5 h-2 bg-linear-to-r from-blue-500 to-purple-600 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp size={18} className="text-green-600" />
                        <span className="text-gray-700 dark:text-gray-300">Avg Engagement</span>
                      </div>
                      <span className="font-bold text-green-600">{totalEngagement.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="w-3/4 h-2 bg-linear-to-r from-green-500 to-green-600 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Clock size={18} className="text-purple-600" />
                        <span className="text-gray-700 dark:text-gray-300">Top Platform</span>
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">{topPlatform.platform}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="w-4/5 h-2 bg-linear-to-r from-purple-500 to-pink-600 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Zap size={18} className="text-yellow-600" />
                        <span className="text-gray-700 dark:text-gray-300">Fastest Growing</span>
                      </div>
                      <span className="font-bold text-yellow-600">{fastestGrowing.platform}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="w-full h-2 bg-linear-to-r from-yellow-500 to-orange-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 flex items-center justify-center gap-2">
                  <Share2 size={20} />
                  Share Profile
                </button>
                <button className="flex-1 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}