"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Users,
  Share2,
  MessageCircle,
  TrendingUp,
  Zap,
  Crown,
} from "lucide-react";

interface UserLike {
  id: string;
  name: string;
  avatar: string;
  time: string;
  isInfluencer: boolean;
}

export default function SocialLikeNetwork() {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(1248);
  const [shared, setShared] = useState(45);
  const [comments, setComments] = useState(89);
  const [recentLikes, setRecentLikes] = useState<UserLike[]>([
    {
      id: "1",
      name: "Emma Watson",
      avatar: "EW",
      time: "2 min ago",
      isInfluencer: true,
    },
    {
      id: "2",
      name: "Chris Evans",
      avatar: "CE",
      time: "5 min ago",
      isInfluencer: true,
    },
    {
      id: "3",
      name: "Taylor Swift",
      avatar: "TS",
      time: "10 min ago",
      isInfluencer: true,
    },
    {
      id: "4",
      name: "Alex Johnson",
      avatar: "AJ",
      time: "15 min ago",
      isInfluencer: false,
    },
    {
      id: "5",
      name: "Sarah Miller",
      avatar: "SM",
      time: "20 min ago",
      isInfluencer: false,
    },
  ]);

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikes((prev) => prev - 1);
      setRecentLikes((prev) => prev.filter((user) => user.name !== "You"));
    } else {
      setIsLiked(true);
      setLikes((prev) => prev + 1);
      setRecentLikes([
        {
          id: "0",
          name: "You",
          avatar: "ME",
          time: "Just now",
          isInfluencer: false,
        },
        ...recentLikes.slice(0, 4),
      ]);
    }
  };

  const handleShare = () => {
    setShared((prev) => prev + 1);
  };

  const handleComment = () => {
    setComments((prev) => prev + 1);
  };

  const engagementRate = Math.round(
    ((likes + comments + shared) / 10000) * 100
  );
  const influencerLikes = recentLikes.filter(
    (user) => user.isInfluencer
  ).length;

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
          {/* Content Header */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Revolutionary AI Breakthrough
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Scientists achieve unprecedented results in AI research that
                  could change everything.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Crown size={20} className="text-yellow-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Trending
                </span>
              </div>
            </div>
          </div>

          {/* Content Stats */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {likes}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Likes
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {comments}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Comments
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {shared}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Shares
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {engagementRate}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Engagement
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                className={`px-6 py-3 rounded-full flex items-center gap-2 font-medium ${
                  isLiked
                    ? "bg-red-50 dark:bg-red-900/20 text-red-600"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                {isLiked ? "Liked" : "Like"}
                <span className="font-bold">{likes}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleComment}
                className="px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center gap-2 font-medium"
              >
                <MessageCircle size={20} />
                Comment
                <span className="font-bold">{comments}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center gap-2 font-medium"
              >
                <Share2 size={20} />
                Share
                <span className="font-bold">{shared}</span>
              </motion.button>
            </div>
          </div>

          {/* Recent Likes */}
          <div className="p-8">
            <h3 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Users size={20} className="text-blue-600" />
              Recent Likes ({recentLikes.length})
            </h3>

            <div className="space-y-4">
              {recentLikes.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          user.isInfluencer
                            ? "bg-linear-to-br from-purple-500 to-pink-600"
                            : "bg-linear-to-br from-blue-400 to-blue-600"
                        }`}
                      >
                        <span className="text-white font-bold">
                          {user.avatar}
                        </span>
                      </div>
                      {user.isInfluencer && (
                        <div className="absolute -top-1 -right-1">
                          <Crown
                            size={16}
                            className="text-yellow-500 fill-yellow-500"
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </span>
                        {user.isInfluencer && (
                          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs rounded-full">
                            Influencer
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Liked {user.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart size={16} className="text-red-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Liked
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                    <Zap
                      className="text-blue-600 dark:text-blue-300"
                      size={20}
                    />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      Influencer Impact
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {influencerLikes} influencer likes
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  +{(influencerLikes * 100).toLocaleString()} reach
                </div>
              </div>

              <div className="bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                    <TrendingUp
                      className="text-green-600 dark:text-green-300"
                      size={20}
                    />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      Growth Rate
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Last 24 hours
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  +24.5%
                </div>
              </div>

              <div className="bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
                    <Users
                      className="text-purple-600 dark:text-purple-300"
                      size={20}
                    />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      Community
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Active participants
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {(likes + comments + shared).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Status Message */}
            <div className="mt-8 text-center">
              {isLiked ? (
                <p className="text-green-600">
                  ✅ You are part of {likes.toLocaleString()} people who liked
                  this content!
                </p>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  Join {likes.toLocaleString()} people who already liked this
                  amazing content
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
