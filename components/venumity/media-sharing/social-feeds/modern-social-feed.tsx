"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreVertical,
  Filter,
  Clock,
  Eye,
} from "lucide-react";

interface FeedItem {
  id: string;
  platform: string;
  platformIcon: string;
  username: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
  color: string;
}

export default function ModernSocialFeed() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([
    {
      id: "1",
      platform: "Twitter",
      platformIcon: "🐦",
      username: "@techleader",
      time: "2 hours ago",
      content:
        "Just launched our new AI-powered design tool! Early access is now available for our community.",
      likes: 245,
      comments: 42,
      shares: 18,
      isLiked: false,
      isBookmarked: false,
      color: "bg-sky-500",
    },
    {
      id: "2",
      platform: "Instagram",
      platformIcon: "📸",
      username: "@creativedesign",
      time: "4 hours ago",
      content:
        "Behind the scenes of our latest photoshoot. The attention to detail makes all the difference!",
      image: "gradient-blue-purple",
      likes: 1892,
      comments: 156,
      shares: 45,
      isLiked: true,
      isBookmarked: true,
      color: "bg-pink-600",
    },
    {
      id: "3",
      platform: "LinkedIn",
      platformIcon: "💼",
      username: "Professional Network",
      time: "1 day ago",
      content:
        "Excited to announce our Series B funding round! This will accelerate our mission to democratize design tools.",
      likes: 456,
      comments: 89,
      shares: 23,
      isLiked: false,
      isBookmarked: false,
      color: "bg-blue-700",
    },
    {
      id: "4",
      platform: "YouTube",
      platformIcon: "🎥",
      username: "Tech Tutorials",
      time: "2 days ago",
      content:
        "New tutorial: Learn how to build modern web applications with React and TypeScript in 2024.",
      likes: 3245,
      comments: 234,
      shares: 167,
      isLiked: false,
      isBookmarked: true,
      color: "bg-red-600",
    },
    {
      id: "5",
      platform: "TikTok",
      platformIcon: "🎵",
      username: "@quicktech",
      time: "3 days ago",
      content:
        "60-second breakdown of the latest web development trends. Which one are you most excited about?",
      likes: 12456,
      comments: 789,
      shares: 2345,
      isLiked: true,
      isBookmarked: false,
      color: "bg-gray-900",
    },
  ]);

  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filters = [
    { id: "all", label: "All Platforms" },
    { id: "twitter", label: "Twitter" },
    { id: "instagram", label: "Instagram" },
    { id: "linkedin", label: "LinkedIn" },
    { id: "youtube", label: "YouTube" },
    { id: "tiktok", label: "TikTok" },
  ];

  const filteredItems =
    activeFilter === "all"
      ? feedItems
      : feedItems.filter(
          (item) => item.platform.toLowerCase() === activeFilter
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

  const totalLikes = feedItems.reduce((acc, item) => acc + item.likes, 0);
  const totalComments = feedItems.reduce((acc, item) => acc + item.comments, 0);
  const totalShares = feedItems.reduce((acc, item) => acc + item.shares, 0);
  const totalEngagement = Math.round(
    (totalLikes + totalComments + totalShares) / feedItems.length
  );

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
          {/* Header */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Social Feed
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Latest updates from all your platforms
                </p>
              </div>

              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {feedItems.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Posts
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {totalEngagement}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Avg Engagement
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total Likes
                    </div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      {totalLikes.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                    <Heart
                      className="text-blue-600 dark:text-blue-300"
                      size={20}
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total Comments
                    </div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      {totalComments.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                    <MessageCircle
                      className="text-green-600 dark:text-green-300"
                      size={20}
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total Shares
                    </div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      {totalShares.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
                    <Share2
                      className="text-purple-600 dark:text-purple-300"
                      size={20}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                  {filter.id !== "all" && (
                    <span className="text-lg">
                      {
                        feedItems.find(
                          (item) => item.platform.toLowerCase() === filter.id
                        )?.platformIcon
                      }
                    </span>
                  )}
                  {filter.label}
                </button>
              ))}
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                <Filter size={16} />
              </button>
            </div>
          </div>

          {/* Feed Items */}
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex gap-4">
                  {/* Platform Icon */}
                  <div
                    className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-white text-xl`}
                  >
                    {item.platformIcon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">
                          {item.username}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <span>{item.platform}</span>
                          <span>•</span>
                          <span>{item.time}</span>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                        <MoreVertical size={18} className="text-gray-500" />
                      </button>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {item.content}
                    </p>

                    {/* Image Preview */}
                    {item.image && (
                      <div className="mb-4">
                        <div className="h-48 bg-linear-to-r from-blue-500 to-purple-600 rounded-xl"></div>
                      </div>
                    )}

                    {/* Actions */}
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
                          fill={item.isBookmarked ? "currentColor" : "none"}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Stats */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Eye size={16} className="text-blue-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {(
                      totalLikes +
                      totalComments +
                      totalShares
                    ).toLocaleString()}{" "}
                    total engagements
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-green-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Updated just now
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
                  Load More
                </button>
                <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Post Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
