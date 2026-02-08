"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  Clock,
  Calendar,
  Download,
  Share2,
  Zap,
  Target
} from "lucide-react";

interface FeedItem {
  id: string;
  platform: string;
  platformIcon: string;
  username: string;
  time: string;
  content: string;
  impressions: number;
  engagement: number;
  reach: number;
  clicks: number;
  color: string;
}

interface Analytics {
  totalImpressions: number;
  totalEngagement: number;
  avgEngagementRate: number;
  topPlatform: string;
  peakHour: string;
}

export default function SocialFeedWithAnalytics() {
  const [feedItems] = useState<FeedItem[]>([
    {
      id: "1",
      platform: "Twitter",
      platformIcon: "🐦",
      username: "@analyticspro",
      time: "2 hours ago",
      content: "New analytics dashboard released! Track your social media performance in real-time.",
      impressions: 12450,
      engagement: 8.2,
      reach: 24500,
      clicks: 456,
      color: "bg-sky-500"
    },
    {
      id: "2",
      platform: "Instagram",
      platformIcon: "📸",
      username: "@datainsights",
      time: "4 hours ago",
      content: "Visualizing engagement data from our latest campaign. The results are impressive!",
      impressions: 28900,
      engagement: 12.5,
      reach: 45600,
      clicks: 789,
      color: "bg-linear-to-br from-pink-600 to-purple-600"
    },
    {
      id: "3",
      platform: "LinkedIn",
      platformIcon: "💼",
      username: "Analytics Team",
      time: "1 day ago",
      content: "Quarterly performance report: Our engagement grew by 45% this quarter.",
      impressions: 15600,
      engagement: 6.8,
      reach: 28900,
      clicks: 234,
      color: "bg-blue-700"
    },
    {
      id: "4",
      platform: "Facebook",
      platformIcon: "📘",
      username: "Data Insights",
      time: "2 days ago",
      content: "Understanding audience demographics for better targeting strategies.",
      impressions: 34500,
      engagement: 9.4,
      reach: 67800,
      clicks: 567,
      color: "bg-blue-600"
    }
  ]);

  const [analytics, setAnalytics] = useState<Analytics>({
    totalImpressions: 0,
    totalEngagement: 0,
    avgEngagementRate: 0,
    topPlatform: "",
    peakHour: "14:00"
  });

  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("7d");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Update analytics with setTimeout to avoid cascading renders
  useEffect(() => {
    const timeout = setTimeout(() => {
      const totalImpressions = feedItems.reduce((acc, item) => acc + item.impressions, 0);
      const totalEngagement = feedItems.reduce((acc, item) => acc + item.engagement, 0);
      const avgEngagementRate = feedItems.length ? totalEngagement / feedItems.length : 0;

      // Find top platform by impressions
      const topPlatformItem = feedItems.reduce((prev, current) =>
        current.impressions > prev.impressions ? current : prev
      );

      setAnalytics({
        totalImpressions,
        totalEngagement,
        avgEngagementRate,
        topPlatform: topPlatformItem.platform,
        peakHour: "14:00"
      });
    }, 0);

    return () => clearTimeout(timeout);
  }, [feedItems]);

  const selectedItemData = feedItems.find(item => item.id === selectedItem);

  const handleTimeRangeChange = (range: "24h" | "7d" | "30d") => {
    setTimeRange(range);
    // fetch data for the selected time range if needed
  };

  const exportData = () => {
    const dataStr = JSON.stringify(feedItems, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `social-feed-data-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
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
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Social Feed Analytics</h2>
                <p className="text-gray-600 dark:text-gray-400">Performance insights across all platforms</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {analytics.totalImpressions.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Impressions</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {analytics.avgEngagementRate.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Avg Engagement</div>
                  </div>
                </div>
                
                <button
                  onClick={exportData}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <Download size={16} />
                  Export
                </button>
              </div>
            </div>

            {/* Analytics Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Impressions</div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      {analytics.totalImpressions.toLocaleString()}
                    </div>
                  </div>
                  <Eye size={20} className="text-blue-600" />
                </div>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Engagement Rate</div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      {analytics.avgEngagementRate.toFixed(1)}%
                    </div>
                  </div>
                  <TrendingUp size={20} className="text-green-600" />
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Top Platform</div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">{analytics.topPlatform}</div>
                  </div>
                  <Target size={20} className="text-purple-600" />
                </div>
              </div>
              
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Peak Hour</div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">{analytics.peakHour}</div>
                  </div>
                  <Zap size={20} className="text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Time Range Filter */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-gray-500" />
                <span className="font-medium text-gray-900 dark:text-white">Time Range</span>
              </div>
              
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                {(["24h", "7d", "30d"] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => handleTimeRangeChange(range)}
                    className={`px-4 py-2 rounded-md text-sm ${timeRange === range 
                      ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm" 
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"}`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Feed List */}
            <div className="lg:col-span-2 border-r border-gray-200 dark:border-gray-800">
              <div className="p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Recent Posts</h3>
                
                <div className="space-y-4">
                  {feedItems.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ y: -2 }}
                      onClick={() => setSelectedItem(item.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedItem === item.id 
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                        : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center text-white`}>
                          {item.platformIcon}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-bold text-gray-900 dark:text-white">{item.username}</div>
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <span>{item.platform}</span>
                                <span>•</span>
                                <span>{item.time}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-sm text-green-600 font-medium">
                                {item.engagement}% engagement
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 dark:text-gray-300 mb-3">{item.content}</p>
                          
                          <div className="grid grid-cols-3 gap-2">
                            <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                              <div className="text-sm font-bold text-gray-900 dark:text-white">
                                {item.impressions.toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">Impressions</div>
                            </div>
                            <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                              <div className="text-sm font-bold text-gray-900 dark:text-white">
                                {item.reach.toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">Reach</div>
                            </div>
                            <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                              <div className="text-sm font-bold text-gray-900 dark:text-white">{item.clicks}</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">Clicks</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Analytics Sidebar */}
            <div className="lg:col-span-1">
              <div className="p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Performance Analytics</h3>
                
                {selectedItemData ? (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Post Details</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Platform</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {selectedItemData.platform}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Posted</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {selectedItemData.time}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Engagement Rate</span>
                          <span className="font-medium text-green-600">{selectedItemData.engagement}%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Metrics</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Impressions</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {selectedItemData.impressions.toLocaleString()}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                            <div 
                              className="h-2 bg-blue-500 rounded-full"
                              style={{ width: `${Math.min((selectedItemData.impressions / 50000) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Reach</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {selectedItemData.reach.toLocaleString()}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                            <div 
                              className="h-2 bg-green-500 rounded-full"
                              style={{ width: `${Math.min((selectedItemData.reach / 100000) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Clicks</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {selectedItemData.clicks}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                            <div 
                              className="h-2 bg-purple-500 rounded-full"
                              style={{ width: `${Math.min((selectedItemData.clicks / 1000) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Engagement Breakdown</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Likes</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {Math.round(selectedItemData.impressions * selectedItemData.engagement / 1000)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Comments</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {Math.round(selectedItemData.impressions * selectedItemData.engagement / 2000)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Shares</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {Math.round(selectedItemData.impressions * selectedItemData.engagement / 4000)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BarChart3 size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">Select a post to view detailed analytics</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-blue-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {feedItems.length} active posts analyzed
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-green-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Updated in real-time
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
                  View Report
                </button>
                <button className="px-4 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 flex items-center gap-2">
                  <Share2 size={16} />
                  Share Insights
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}