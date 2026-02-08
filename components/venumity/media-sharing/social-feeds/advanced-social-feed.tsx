"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreVertical,
  TrendingUp,
  Users,
  Zap,
  Filter,
  RefreshCw,
  ExternalLink,
  Calendar,
  BarChart3,
} from "lucide-react";

interface FeedPost {
  id: string;
  user: {
    name: string;
    handle: string;
    avatar: string;
    verified: boolean;
  };
  platform: string;
  platformIcon: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  bookmarks: number;
  time: string;
  trending: boolean;
  engagement: number;
  liked: boolean;
  bookmarked: boolean;
}

interface FeedFilter {
  id: string;
  label: string;
  icon: React.ReactNode;
  count: number;
}

export default function AdvancedSocialFeed() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [posts, setPosts] = useState<FeedPost[]>([
    {
      id: "1",
      user: {
        name: "Sarah Chen",
        handle: "@sarahdesign",
        avatar: "SC",
        verified: true,
      },
      platform: "Twitter",
      platformIcon: "🐦",
      content:
        "Just launched my new design system! Open source and available for everyone. Built with accessibility in mind from day one.",
      likes: 1245,
      comments: 89,
      shares: 245,
      bookmarks: 156,
      time: "2 hours ago",
      trending: true,
      engagement: 8.2,
      liked: false,
      bookmarked: false,
    },
    {
      id: "2",
      user: {
        name: "Alex Johnson",
        handle: "@alexdev",
        avatar: "AJ",
        verified: true,
      },
      platform: "LinkedIn",
      platformIcon: "💼",
      content:
        "How we scaled our infrastructure to handle 1M+ concurrent users. Technical deep dive with code examples and architecture diagrams.",
      image: "tech-article",
      likes: 892,
      comments: 124,
      shares: 189,
      bookmarks: 234,
      time: "4 hours ago",
      trending: true,
      engagement: 12.5,
      liked: true,
      bookmarked: true,
    },
    {
      id: "3",
      user: {
        name: "Maria Garcia",
        handle: "@mariacreative",
        avatar: "MG",
        verified: false,
      },
      platform: "Instagram",
      platformIcon: "📸",
      content:
        "Behind the scenes of our latest photoshoot. Exploring minimalism in digital art. Swipe for process breakdown!",
      likes: 2456,
      comments: 156,
      shares: 89,
      bookmarks: 345,
      time: "6 hours ago",
      trending: false,
      engagement: 6.8,
      liked: false,
      bookmarked: false,
    },
    {
      id: "4",
      user: {
        name: "Tech News",
        handle: "@techupdates",
        avatar: "TN",
        verified: true,
      },
      platform: "Twitter",
      platformIcon: "🐦",
      content:
        "BREAKING: Major AI breakthrough announced today. New model achieves human-level reasoning in specific tasks. Full paper released.",
      likes: 15489,
      comments: 2456,
      shares: 8923,
      bookmarks: 4567,
      time: "8 hours ago",
      trending: true,
      engagement: 24.7,
      liked: false,
      bookmarked: true,
    },
    {
      id: "5",
      user: {
        name: "David Kim",
        handle: "@davidux",
        avatar: "DK",
        verified: true,
      },
      platform: "Medium",
      platformIcon: "✍️",
      content:
        "The future of UX design: How AI is changing the way we think about user interfaces and interaction patterns.",
      likes: 678,
      comments: 45,
      shares: 123,
      bookmarks: 189,
      time: "1 day ago",
      trending: false,
      engagement: 4.3,
      liked: true,
      bookmarked: false,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalEngagement: 0,
    trendingPosts: 0,
    avgEngagement: 0,
  });

  const filters: FeedFilter[] = [
    {
      id: "all",
      label: "All Posts",
      icon: <BarChart3 size={16} />,
      count: posts.length,
    },
    {
      id: "trending",
      label: "Trending",
      icon: <TrendingUp size={16} />,
      count: posts.filter((p) => p.trending).length,
    },
    {
      id: "twitter",
      label: "Twitter",
      icon: <span>🐦</span>,
      count: posts.filter((p) => p.platform === "Twitter").length,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: <span>💼</span>,
      count: posts.filter((p) => p.platform === "LinkedIn").length,
    },
    {
      id: "instagram",
      label: "Instagram",
      icon: <span>📸</span>,
      count: posts.filter((p) => p.platform === "Instagram").length,
    },
  ];

  const filteredPosts =
    activeFilter === "all"
      ? posts
      : activeFilter === "trending"
      ? posts.filter((p) => p.trending)
      : posts.filter((p) => p.platform.toLowerCase() === activeFilter);

  // Wrap calculateStats in useCallback
  const calculateStats = useCallback(() => {
    const totalPosts = posts.length;
    const totalEngagement = posts.reduce(
      (acc, post) => acc + post.engagement,
      0
    );
    const trendingPosts = posts.filter((p) => p.trending).length;
    const avgEngagement = totalPosts === 0 ? 0 : totalEngagement / totalPosts;

    setStats({
      totalPosts,
      totalEngagement,
      trendingPosts,
      avgEngagement,
    });
  }, [posts]); // only depends on posts

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      calculateStats();
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [calculateStats]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      calculateStats();
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [posts, calculateStats]);

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleBookmark = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              bookmarked: !post.bookmarked,
              bookmarks: post.bookmarked
                ? post.bookmarks - 1
                : post.bookmarks + 1,
            }
          : post
      )
    );
  };

  const refreshFeed = () => {
    setLoading(true);
    setTimeout(() => {
      // Simulate new posts
      const newPost: FeedPost = {
        id: Date.now().toString(),
        user: {
          name: ["Emma", "James", "Lisa", "Tom"][Math.floor(Math.random() * 4)],
          handle: ["@newuser", "@freshcontent", "@latestpost"][
            Math.floor(Math.random() * 3)
          ],
          avatar: "NP",
          verified: Math.random() > 0.5,
        },
        platform: ["Twitter", "LinkedIn", "Instagram"][
          Math.floor(Math.random() * 3)
        ],
        platformIcon: ["🐦", "💼", "📸"][Math.floor(Math.random() * 3)],
        content:
          "New content just published! Check out the latest updates and insights.",
        likes: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 200),
        shares: Math.floor(Math.random() * 300),
        bookmarks: Math.floor(Math.random() * 150),
        time: "Just now",
        trending: Math.random() > 0.7,
        engagement: Math.random() * 20,
        liked: false,
        bookmarked: false,
      };
      setPosts((prev) => [newPost, ...prev]);
      setLoading(false);
    }, 1000);
  };

  const getEngagementColor = (engagement: number) => {
    if (engagement > 15) return "text-green-600";
    if (engagement > 8) return "text-yellow-600";
    return "text-gray-600";
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
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Advanced Social Feed
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Real-time updates from across platforms
                </p>
              </div>
              <button
                onClick={refreshFeed}
                disabled={loading}
                className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50"
              >
                <RefreshCw
                  size={18}
                  className={loading ? "animate-spin" : ""}
                />
                {loading ? "Refreshing..." : "Refresh Feed"}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total Posts
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.totalPosts}
                    </div>
                  </div>
                  <BarChart3 size={24} className="text-blue-600" />
                </div>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Avg Engagement
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.avgEngagement.toFixed(1)}%
                    </div>
                  </div>
                  <TrendingUp size={24} className="text-green-600" />
                </div>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Trending Posts
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.trendingPosts}
                    </div>
                  </div>
                  <Zap size={24} className="text-purple-600" />
                </div>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total Reach
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {(
                        posts.reduce(
                          (acc, post) =>
                            acc + post.likes + post.comments + post.shares,
                          0
                        ) / 1000
                      ).toFixed(1)}
                      K
                    </div>
                  </div>
                  <Users size={24} className="text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    activeFilter === filter.id
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {filter.icon}
                  {filter.label}
                  <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                    {filter.count}
                  </span>
                </button>
              ))}
              <button className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg flex items-center gap-2">
                <Filter size={16} />
                More Filters
              </button>
            </div>
          </div>

          {/* Feed Posts */}
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            <AnimatePresence>
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex gap-4">
                    {/* User Info */}
                    <div className="shrink-0">
                      <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {post.user.avatar}
                        </span>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900 dark:text-white">
                              {post.user.name}
                            </span>
                            {post.user.verified && (
                              <span className="text-blue-500" title="Verified">
                                ✓
                              </span>
                            )}
                            <span className="text-gray-600 dark:text-gray-400">
                              {post.user.handle}
                            </span>
                            <span className="text-gray-500">·</span>
                            <span className="text-gray-500 text-sm">
                              {post.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-lg">{post.platformIcon}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {post.platform}
                            </span>
                            {post.trending && (
                              <span className="text-xs bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 px-2 py-1 rounded">
                                Trending
                              </span>
                            )}
                          </div>
                        </div>
                        <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                          <MoreVertical size={18} className="text-gray-500" />
                        </button>
                      </div>

                      {/* Post Text */}
                      <p className="text-gray-800 dark:text-gray-200 mb-4">
                        {post.content}
                      </p>

                      {/* Post Image (if available) */}
                      {post.image && (
                        <div className="h-48 bg-linear-to-r from-cyan-500 to-blue-600 rounded-xl mb-4 flex items-center justify-center">
                          <span className="text-white font-bold">
                            Featured Image
                          </span>
                        </div>
                      )}

                      {/* Post Stats */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <button
                            onClick={() => handleLike(post.id)}
                            className={`flex items-center gap-2 ${
                              post.liked
                                ? "text-red-600"
                                : "text-gray-600 hover:text-red-600"
                            }`}
                          >
                            <Heart
                              size={18}
                              fill={post.liked ? "currentColor" : "none"}
                            />
                            <span className="font-medium">{post.likes}</span>
                          </button>

                          <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                            <MessageCircle size={18} />
                            <span className="font-medium">{post.comments}</span>
                          </button>

                          <button className="flex items-center gap-2 text-gray-600 hover:text-green-600">
                            <Share2 size={18} />
                            <span className="font-medium">{post.shares}</span>
                          </button>

                          <button
                            onClick={() => handleBookmark(post.id)}
                            className={`flex items-center gap-2 ${
                              post.bookmarked
                                ? "text-blue-600"
                                : "text-gray-600 hover:text-blue-600"
                            }`}
                          >
                            <Bookmark
                              size={18}
                              fill={post.bookmarked ? "currentColor" : "none"}
                            />
                            <span className="font-medium">
                              {post.bookmarks}
                            </span>
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <div
                            className={`text-sm font-medium ${getEngagementColor(
                              post.engagement
                            )}`}
                          >
                            {post.engagement.toFixed(1)}% engagement
                          </div>
                          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                            <ExternalLink size={16} className="text-gray-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Feed Controls */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredPosts.length} of {posts.length} posts
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  Load More
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <Calendar size={16} />
                  Schedule Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
