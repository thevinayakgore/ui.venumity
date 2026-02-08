"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Zap,
  TrendingUp,
  Users,
  Eye,
  Clock,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RefreshCw,
  Filter,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface LiveFeedItem {
  id: string;
  type: "post" | "live" | "update" | "trending";
  platform: string;
  platformIcon: string;
  username: string;
  userAvatar: string;
  time: string;
  content: string;
  viewers?: number;
  duration?: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
  color: string;
  isLive: boolean;
}

interface LiveUpdate {
  id: string;
  type: "like" | "comment" | "share" | "viewer";
  user: string;
  action: string;
  time: string;
  emoji?: string;
}

export default function LiveSocialFeed() {
  const [feedItems, setFeedItems] = useState<LiveFeedItem[]>([
    {
      id: "1",
      type: "live",
      platform: "YouTube",
      platformIcon: "🎥",
      username: "Tech Live",
      userAvatar: "TL",
      time: "LIVE NOW",
      content: "Live coding session: Building a real-time chat application",
      viewers: 2450,
      duration: "1:24:36",
      likes: 1245,
      comments: 89,
      shares: 45,
      isLiked: false,
      isBookmarked: false,
      color: "bg-red-600",
      isLive: true,
    },
    {
      id: "2",
      type: "trending",
      platform: "Twitter",
      platformIcon: "🐦",
      username: "@trendingtech",
      userAvatar: "TT",
      time: "2 min ago",
      content:
        "Breaking: New AI model achieves human-level reasoning capabilities",
      likes: 4567,
      comments: 234,
      shares: 890,
      isLiked: true,
      isBookmarked: true,
      color: "bg-sky-500",
      isLive: false,
    },
    {
      id: "3",
      type: "post",
      platform: "Instagram",
      platformIcon: "📸",
      username: "@designlive",
      userAvatar: "DL",
      time: "5 min ago",
      content:
        "Live design critique session - join and get feedback on your designs!",
      viewers: 1200,
      likes: 2890,
      comments: 156,
      shares: 89,
      isLiked: false,
      isBookmarked: true,
      color: "bg-linear-to-br from-pink-600 to-purple-600",
      isLive: true,
    },
    {
      id: "4",
      type: "update",
      platform: "LinkedIn",
      platformIcon: "💼",
      username: "Tech Updates",
      userAvatar: "TU",
      time: "10 min ago",
      content:
        "Major platform update released with new features and improvements",
      likes: 456,
      comments: 123,
      shares: 45,
      isLiked: false,
      isBookmarked: false,
      color: "bg-blue-700",
      isLive: false,
    },
    {
      id: "5",
      type: "live",
      platform: "Twitch",
      platformIcon: "🎮",
      username: "DevStream",
      userAvatar: "DS",
      time: "LIVE NOW",
      content:
        "24-hour hackathon live stream - building an entire app from scratch",
      viewers: 5600,
      duration: "3:45:12",
      likes: 8900,
      comments: 456,
      shares: 234,
      isLiked: true,
      isBookmarked: false,
      color: "bg-purple-600",
      isLive: true,
    },
  ]);

  const [liveUpdates, setLiveUpdates] = useState<LiveUpdate[]>([
    {
      id: "1",
      type: "viewer",
      user: "Alex",
      action: "joined the stream",
      time: "Just now",
      emoji: "👤",
    },
    {
      id: "2",
      type: "like",
      user: "Sarah",
      action: "liked your post",
      time: "15 sec ago",
      emoji: "❤️",
    },
    {
      id: "3",
      type: "comment",
      user: "Mike",
      action: "commented: 'Amazing work!'",
      time: "30 sec ago",
      emoji: "💬",
    },
    {
      id: "4",
      type: "share",
      user: "Taylor",
      action: "shared to Twitter",
      time: "1 min ago",
      emoji: "🔁",
    },
    {
      id: "5",
      type: "viewer",
      user: "Chris",
      action: "joined the stream",
      time: "2 min ago",
      emoji: "👤",
    },
  ]);

  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [totalViewers, setTotalViewers] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);

  useEffect(() => {
    // Wrap the totals calculation in a timeout
    const timeout = setTimeout(() => {
      const viewers = feedItems.reduce(
        (acc, item) => acc + (item.viewers || 0),
        0
      );
      const likes = feedItems.reduce((acc, item) => acc + item.likes, 0);
  
      setTotalViewers(viewers);
      setTotalLikes(likes);
    }, 0);
  
    // Simulate live updates
    const updateInterval = setInterval(() => {
      if (isPlaying) {
        setLiveUpdates((prevUpdates) => {
          const users = ["Alex","Sarah","Mike","Taylor","Chris","Jordan","Morgan"];
          const actions = [
            "liked your post",
            "commented: 'Great content!'",
            "shared to followers",
            "joined the stream",
            "reacted with 🔥",
          ];
          const types: LiveUpdate["type"][] = ["like","comment","share","viewer"];
          const newUpdate: LiveUpdate = {
            id: Date.now().toString(),
            type: types[Math.floor(Math.random() * types.length)],
            user: users[Math.floor(Math.random() * users.length)],
            action: actions[Math.floor(Math.random() * actions.length)],
            time: "Just now",
            emoji: ["❤️","🔥","🎉","👏","🚀"][Math.floor(Math.random() * 5)],
          };
          return [newUpdate, ...prevUpdates.slice(0, 7)];
        });
  
        setFeedItems((prevItems) =>
          prevItems.map((item) => {
            if (item.isLive) {
              return {
                ...item,
                viewers: item.viewers ? item.viewers + Math.floor(Math.random() * 5) : 0,
                likes: item.likes + Math.floor(Math.random() * 3),
                comments: item.comments + Math.floor(Math.random() * 2),
              };
            }
            return item;
          })
        );
      }
    }, 3000);
  
    return () => {
      clearInterval(updateInterval);
      clearTimeout(timeout);
    };
  }, [isPlaying, feedItems]);

  const filters = [
    { id: "all", label: "All Content" },
    { id: "live", label: "Live Now" },
    { id: "trending", label: "Trending" },
    { id: "post", label: "Posts" },
  ];

  const filteredItems =
    activeFilter === "all"
      ? feedItems
      : feedItems.filter((item) =>
          activeFilter === "live"
            ? item.isLive
            : activeFilter === "trending"
            ? item.type === "trending"
            : item.type === activeFilter
        );

  const liveItems = feedItems.filter((item) => item.isLive);
  const activeViewers = liveItems.reduce(
    (acc, item) => acc + (item.viewers || 0),
    0
  );

  const handleLike = (id: string) => {
    setFeedItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              likes: item.isLiked ? item.likes - 1 : item.likes + 1,
              isLiked: !item.isLiked,
            }
          : item
      )
    );
  };

  const handleBookmark = (id: string) => {
    setFeedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
      )
    );
  };

  const handleJoinLive = (id: string) => {
    const item = feedItems.find((item) => item.id === id);
    if (item?.isLive) {
      setFeedItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, viewers: (item.viewers || 0) + 1 } : item
        )
      );
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
          {/* Live Header */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-800 bg-linear-to-r from-gray-900 to-gray-800 dark:from-gray-900 dark:to-gray-800">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-ping absolute"></div>
                    <div className="w-4 h-4 bg-red-500 rounded-full relative"></div>
                  </div>
                  <h2 className="text-2xl font-bold">Live Social Feed</h2>
                  <span className="px-3 py-1 bg-red-600 text-white text-sm rounded-full">
                    LIVE
                  </span>
                </div>
                <p className="text-white/80">
                  Real-time updates from all your social platforms
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {activeViewers.toLocaleString()}
                    </div>
                    <div className="text-sm text-white/80">Active Viewers</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {liveItems.length}
                    </div>
                    <div className="text-sm text-white/80">Live Streams</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30"
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30"
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <button className="px-4 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700">
                    <RefreshCw size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Live Updates Sidebar */}
            <div className="lg:col-span-1 border-r border-gray-200 dark:border-gray-800">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Zap size={20} className="text-yellow-600" />
                  Live Activity
                </h3>

                <div className="space-y-3">
                  {liveUpdates.map((update, index) => (
                    <motion.div
                      key={update.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                          {update.user.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-900 dark:text-white">
                            <span className="font-medium">{update.user}</span>{" "}
                            {update.action}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <Clock size={10} />
                            {update.time}
                          </div>
                        </div>
                        {update.emoji && (
                          <span className="text-lg">{update.emoji}</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Live Stats */}
              <div className="p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                  Live Stats
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Total Viewers
                        </div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                          {totalViewers.toLocaleString()}
                        </div>
                      </div>
                      <Eye size={20} className="text-blue-600" />
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Total Likes
                        </div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                          {totalLikes.toLocaleString()}
                        </div>
                      </div>
                      <Heart size={20} className="text-green-600" />
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Live Streams
                        </div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                          {liveItems.length}
                        </div>
                      </div>
                      <TrendingUp size={20} className="text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Feed */}
            <div className="lg:col-span-2">
              {/* Filters */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                        activeFilter === filter.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {filter.label}
                      {filter.id === "live" && liveItems.length > 0 && (
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      )}
                    </button>
                  ))}
                  <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                    <Filter size={16} />
                  </button>
                </div>
              </div>

              {/* Feed Items */}
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                <AnimatePresence>
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex gap-4">
                        {/* User Avatar */}
                        <div className="relative">
                          <div
                            className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center text-white font-bold text-lg`}
                          >
                            {item.userAvatar}
                          </div>
                          {item.isLive && (
                            <div className="absolute -top-2 -right-2">
                              <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  LIVE
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="font-bold text-gray-900 dark:text-white">
                                  {item.username}
                                </div>
                                <div
                                  className={`px-2 py-1 text-xs rounded-full ${item.color} text-white flex items-center gap-1`}
                                >
                                  {item.platformIcon} {item.platform}
                                </div>
                                {item.type === "trending" && (
                                  <div className="flex items-center gap-1 text-xs text-orange-600">
                                    <TrendingUp size={12} />
                                    Trending
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                                <Clock size={12} />
                                {item.time}
                                {item.viewers && (
                                  <>
                                    <span>•</span>
                                    <div className="flex items-center gap-1">
                                      <Eye size={12} />
                                      {item.viewers.toLocaleString()} viewers
                                    </div>
                                  </>
                                )}
                                {item.duration && (
                                  <>
                                    <span>•</span>
                                    <span>{item.duration}</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                              <ExternalLink
                                size={18}
                                className="text-gray-500"
                              />
                            </button>
                          </div>

                          <p className="text-gray-700 dark:text-gray-300 mb-4">
                            {item.content}
                          </p>

                          {/* Video/Live Preview */}
                          {item.isLive && (
                            <div className="mb-4 relative">
                              <div className="h-48 bg-linear-to-r from-blue-500 to-purple-600 rounded-xl relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="text-white text-center">
                                    <div className="text-lg font-bold mb-2">
                                      LIVE STREAM
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                      <span>Streaming Now</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full">
                                  {item.duration}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Stats & Actions */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                              <button
                                onClick={() => handleLike(item.id)}
                                className={`flex items-center gap-2 ${
                                  item.isLiked
                                    ? "text-red-600"
                                    : "text-gray-600 dark:text-gray-400"
                                }`}
                              >
                                <Heart
                                  size={18}
                                  fill={item.isLiked ? "currentColor" : "none"}
                                />
                                <span>{item.likes.toLocaleString()}</span>
                              </button>

                              <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                <MessageCircle size={18} />
                                <span>{item.comments.toLocaleString()}</span>
                              </button>

                              <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                <Share2 size={18} />
                                <span>{item.shares.toLocaleString()}</span>
                              </button>
                            </div>

                            <div className="flex items-center gap-3">
                              {item.isLive && (
                                <button
                                  onClick={() => handleJoinLive(item.id)}
                                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                                >
                                  <Play size={16} />
                                  Join Live
                                </button>
                              )}

                              <button
                                onClick={() => handleBookmark(item.id)}
                                className={`p-2 ${
                                  item.isBookmarked
                                    ? "text-yellow-500"
                                    : "text-gray-600 dark:text-gray-400"
                                }`}
                              >
                                <Bookmark
                                  size={18}
                                  fill={
                                    item.isBookmarked ? "currentColor" : "none"
                                  }
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-yellow-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {liveUpdates.length} recent activities
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-blue-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {filteredItems.length} active feeds
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
                  Load More
                </button>
                <button className="px-6 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 flex items-center gap-2">
                  <Zap size={16} />
                  Go Live
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
