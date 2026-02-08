"use client";
import { useState } from "react";
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
  Clock,
  Sparkles,
  Send,
} from "lucide-react";

interface FeedItem {
  id: string;
  type: "post" | "story" | "event";
  platform: string;
  platformIcon: string;
  username: string;
  userAvatar: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
  color: string;
  trending: boolean;
}

interface Comment {
  id: string;
  user: string;
  avatar: string;
  content: string;
  time: string;
}

export default function InteractiveSocialFeed() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([
    {
      id: "1",
      type: "post",
      platform: "Twitter",
      platformIcon: "🐦",
      username: "@techinnovator",
      userAvatar: "TI",
      time: "2 hours ago",
      content:
        "Breaking: Our AI model just achieved state-of-the-art results in natural language processing!",
      likes: 1245,
      comments: 89,
      shares: 245,
      isLiked: false,
      isBookmarked: true,
      color: "bg-sky-500",
      trending: true,
    },
    {
      id: "2",
      type: "story",
      platform: "Instagram",
      platformIcon: "📸",
      username: "@creativedaily",
      userAvatar: "CD",
      time: "4 hours ago",
      content:
        "Just finished shooting our new campaign. The creative process is always magical!",
      image: "gradient-instagram",
      likes: 2890,
      comments: 156,
      shares: 89,
      isLiked: true,
      isBookmarked: false,
      color: "bg-linear-to-br from-pink-600 to-purple-600",
      trending: false,
    },
    {
      id: "3",
      type: "event",
      platform: "LinkedIn",
      platformIcon: "💼",
      username: "Tech Summit",
      userAvatar: "TS",
      time: "1 day ago",
      content:
        "Join us for the biggest tech conference of the year! Early bird tickets now available.",
      likes: 456,
      comments: 123,
      shares: 45,
      isLiked: false,
      isBookmarked: true,
      color: "bg-blue-700",
      trending: true,
    },
    {
      id: "4",
      type: "post",
      platform: "YouTube",
      platformIcon: "🎥",
      username: "Tech Education",
      userAvatar: "TE",
      time: "2 days ago",
      content:
        "New tutorial series: Master web development from zero to hero. Perfect for beginners!",
      likes: 5245,
      comments: 456,
      shares: 234,
      isLiked: false,
      isBookmarked: false,
      color: "bg-red-600",
      trending: true,
    },
  ]);

  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: "Alex Developer",
      avatar: "AD",
      content: "This is amazing! Can't wait to try it out.",
      time: "1 hour ago",
    },
    {
      id: "2",
      user: "Sarah Designer",
      avatar: "SD",
      content: "The design looks incredible. Great work!",
      time: "45 min ago",
    },
    {
      id: "3",
      user: "Mike Engineer",
      avatar: "ME",
      content: "Impressive results! The technical details are fascinating.",
      time: "30 min ago",
    },
  ]);

  const [reactions, setReactions] = useState<Record<string, string[]>>({
    "1": ["👍", "❤️", "🔥"],
    "2": ["❤️", "😂", "🎉"],
    "3": ["👍", "💡"],
    "4": ["🔥", "🚀", "💯"],
  });

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

  const handleReaction = (itemId: string, reaction: string) => {
    const currentReactions = reactions[itemId] || [];

    if (currentReactions.includes(reaction)) {
      setReactions((prev) => ({
        ...prev,
        [itemId]: currentReactions.filter((r) => r !== reaction),
      }));
    } else {
      setReactions((prev) => ({
        ...prev,
        [itemId]: [...currentReactions, reaction],
      }));
    }
  };

  const handleAddComment = (itemId: string) => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        user: "You",
        avatar: "ME",
        content: newComment,
        time: "Just now",
      };
      setComments([comment, ...comments]);
      setNewComment("");

      // Update comment count
      setFeedItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, comments: item.comments + 1 } : item
        )
      );
    }
  };

  const trendingItems = feedItems.filter((item) => item.trending);
  const totalEngagement = feedItems.reduce(
    (acc, item) => acc + item.likes + item.comments + item.shares,
    0
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
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Interactive Social Feed
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Engage with content from all your platforms
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {feedItems.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Active Posts
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {totalEngagement.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total Engagement
                    </div>
                  </div>
                </div>
                <button className="px-6 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700">
                  Create Post
                </button>
              </div>
            </div>

            {/* Trending */}
            {trendingItems.length > 0 && (
              <div className="mt-6 p-4 bg-linear-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                <div className="flex items-center gap-3">
                  <TrendingUp size={20} className="text-orange-600" />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      Trending Now
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {trendingItems.map((item) => item.platform).join(", ")}{" "}
                      trending content
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Feed */}
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {feedItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex gap-4">
                  {/* User Avatar */}
                  <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                    {item.userAvatar}
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
                            className={`px-2 py-1 text-xs rounded-full ${item.color} text-white`}
                          >
                            {item.platformIcon} {item.platform}
                          </div>
                          {item.trending && (
                            <div className="flex items-center gap-1 text-xs text-orange-600">
                              <TrendingUp size={12} />
                              Trending
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                          <Clock size={12} />
                          {item.time}
                          <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded">
                            {item.type.charAt(0).toUpperCase() +
                              item.type.slice(1)}
                          </span>
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
                        <div className="h-64 bg-linear-to-r from-blue-500 to-purple-600 rounded-xl"></div>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Heart size={16} />
                          <span>{item.likes.toLocaleString()} likes</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <MessageCircle size={16} />
                          <span>{item.comments.toLocaleString()} comments</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Share2 size={16} />
                          <span>{item.shares.toLocaleString()} shares</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {reactions[item.id]?.map((reaction, idx) => (
                          <span key={idx} className="text-lg">
                            {reaction}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 mb-4">
                      <button
                        onClick={() => handleLike(item.id)}
                        className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 ${
                          item.isLiked
                            ? "bg-red-50 text-red-600 dark:bg-red-900/20"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <Heart
                          size={18}
                          fill={item.isLiked ? "currentColor" : "none"}
                        />
                        {item.isLiked ? "Liked" : "Like"}
                      </button>

                      <button
                        onClick={() =>
                          setActiveItem(activeItem === item.id ? null : item.id)
                        }
                        className="flex-1 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2"
                      >
                        <MessageCircle size={18} />
                        Comment
                      </button>

                      <button className="flex-1 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2">
                        <Share2 size={18} />
                        Share
                      </button>

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

                    {/* Quick Reactions */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Quick react:
                      </span>
                      {["👍", "❤️", "🔥", "🎉", "😮", "🚀"].map((reaction) => (
                        <button
                          key={reaction}
                          onClick={() => handleReaction(item.id, reaction)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                        >
                          <span className="text-lg">{reaction}</span>
                        </button>
                      ))}
                    </div>

                    {/* Comments Section */}
                    <AnimatePresence>
                      {activeItem === item.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4"
                        >
                          <div className="space-y-4">
                            {/* Add Comment */}
                            <div className="flex gap-3">
                              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                                  ME
                                </span>
                              </div>
                              <div className="flex-1">
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={newComment}
                                    onChange={(e) =>
                                      setNewComment(e.target.value)
                                    }
                                    placeholder="Add a comment..."
                                    className="flex-1 p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
                                    onKeyPress={(e) =>
                                      e.key === "Enter" &&
                                      handleAddComment(item.id)
                                    }
                                  />
                                  <button
                                    onClick={() => handleAddComment(item.id)}
                                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                  >
                                    <Send size={18} />
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Comments List */}
                            <div className="space-y-3">
                              {comments.map((comment) => (
                                <div key={comment.id} className="flex gap-3">
                                  <div className="w-8 h-8 bg-linear-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-bold text-white">
                                      {comment.avatar}
                                    </span>
                                  </div>
                                  <div className="flex-1">
                                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="font-bold text-gray-900 dark:text-white">
                                          {comment.user}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                          {comment.time}
                                        </span>
                                      </div>
                                      <p className="text-gray-700 dark:text-gray-300">
                                        {comment.content}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-yellow-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {trendingItems.length} trending posts
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-blue-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {feedItems.length} active conversations
                  </span>
                </div>
              </div>

              <button className="px-6 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 flex items-center gap-2">
                <Sparkles size={16} />
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
