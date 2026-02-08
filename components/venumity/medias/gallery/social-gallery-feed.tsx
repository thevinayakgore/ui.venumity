"use client";
import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreVertical,
  TrendingUp,
  Users,
  Eye,
  Download,
} from "lucide-react";

const socialPosts = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      avatar: "👨‍💼",
      verified: true,
    },
    title: "Morning Hike Views",
    description:
      "Nothing beats starting the day with these mountain views! #nature #hiking",
    image: {
      color: "from-blue-500 to-cyan-400",
      type: "photo",
    },
    likes: 1242,
    comments: 89,
    shares: 42,
    time: "2 hours ago",
    trending: true,
  },
  {
    id: 2,
    user: {
      name: "Sarah Chen",
      avatar: "👩‍🎨",
      verified: true,
    },
    title: "New Art Collection",
    description:
      "Just released my latest digital art collection. Available for download!",
    image: {
      color: "from-purple-500 to-pink-400",
      type: "art",
    },
    likes: 892,
    comments: 156,
    shares: 67,
    time: "5 hours ago",
  },
  {
    id: 3,
    user: {
      name: "Marcus Rivera",
      avatar: "👨‍💻",
      verified: false,
    },
    title: "Code & Coffee",
    description:
      "Perfect setup for a productive coding session. What's your workspace look like?",
    image: {
      color: "from-emerald-500 to-teal-400",
      type: "workspace",
    },
    likes: 567,
    comments: 43,
    shares: 21,
    time: "1 day ago",
    trending: true,
  },
  {
    id: 4,
    user: {
      name: "Creative Studio",
      avatar: "🏢",
      verified: true,
    },
    title: "Brand Identity Project",
    description:
      "Latest brand identity we created for a tech startup. Thoughts?",
    image: {
      color: "from-amber-500 to-orange-400",
      type: "design",
    },
    likes: 2103,
    comments: 234,
    shares: 124,
    time: "2 days ago",
  },
  {
    id: 5,
    user: {
      name: "Travel Diaries",
      avatar: "✈️",
      verified: true,
    },
    title: "Japanese Temple",
    description:
      "The serenity of this ancient temple was absolutely breathtaking.",
    image: {
      color: "from-rose-500 to-red-400",
      type: "travel",
    },
    likes: 1897,
    comments: 178,
    shares: 89,
    time: "3 days ago",
    trending: true,
  },
  {
    id: 6,
    user: {
      name: "Food Blogger",
      avatar: "👨‍🍳",
      verified: false,
    },
    title: "Homemade Pizza",
    description: "Friday night pizza making session! Recipe in comments.",
    image: {
      color: "from-yellow-500 to-amber-400",
      type: "food",
    },
    likes: 743,
    comments: 98,
    shares: 32,
    time: "4 days ago",
  },
];

export default function Gallery_5_5() {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [savedPosts, setSavedPosts] = useState<number[]>([]);
  const [filter, setFilter] = useState<"all" | "trending" | "following">("all");

  const toggleLike = (id: number) => {
    setLikedPosts((prev) =>
      prev.includes(id) ? prev.filter((postId) => postId !== id) : [...prev, id]
    );
  };

  const toggleSave = (id: number) => {
    setSavedPosts((prev) =>
      prev.includes(id) ? prev.filter((postId) => postId !== id) : [...prev, id]
    );
  };

  const filteredPosts = socialPosts.filter((post) => {
    if (filter === "trending") return post.trending;
    if (filter === "following") return post.user.verified;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Social Gallery
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Discover amazing content from creators
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-full font-medium transition-all">
                Post Content
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-linear-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">
                    24.5K
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">Views</div>
                </div>
              </div>
            </div>
            <div className="bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-linear-to-r from-purple-500 to-pink-400 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">
                    7.4K
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">Likes</div>
                </div>
              </div>
            </div>
            <div className="bg-linear-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-linear-to-r from-emerald-500 to-teal-400 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">
                    1.2K
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Followers
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-linear-to-r from-amber-500 to-orange-400 flex items-center justify-center">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">
                    3.8K
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Downloads
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full transition-all ${
                filter === "all"
                  ? "bg-linear-to-r from-blue-600 to-cyan-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              All Posts
            </button>
            <button
              onClick={() => setFilter("trending")}
              className={`px-4 py-2 rounded-full transition-all ${
                filter === "trending"
                  ? "bg-linear-to-r from-blue-600 to-cyan-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <TrendingUp className="w-4 h-4 inline mr-2" />
              Trending
            </button>
            <button
              onClick={() => setFilter("following")}
              className={`px-4 py-2 rounded-full transition-all ${
                filter === "following"
                  ? "bg-linear-to-r from-blue-600 to-cyan-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Following
            </button>
          </div>
        </div>

        {/* Social Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl overflow-hidden group"
            >
              {/* Post Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-linear-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center text-2xl">
                    {post.user.avatar}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-800 dark:text-white">
                        {post.user.name}
                      </span>
                      {post.user.verified && (
                        <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {post.time}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {post.trending && (
                    <div className="px-3 py-1 bg-linear-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
                      TRENDING
                    </div>
                  )}
                  <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Post Image */}
              <div
                className={`h-64 bg-linear-to-br ${post.image.color} relative overflow-hidden`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-80">📸</div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-white/80">{post.description}</p>
                  </div>
                </div>
              </div>

              {/* Post Info */}
              <div className="p-4">
                <div className="mb-4">
                  <h3 className="font-bold text-gray-800 dark:text-white text-lg">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {post.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          likedPosts.includes(post.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400"
                        }`}
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        {post.likes}
                      </span>
                    </button>
                    <button className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                      <MessageCircle className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {post.comments}
                      </span>
                    </button>
                    <button className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                      <Share2 className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {post.shares}
                      </span>
                    </button>
                  </div>
                  <button
                    onClick={() => toggleSave(post.id)}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <Bookmark
                      className={`w-5 h-5 ${
                        savedPosts.includes(post.id)
                          ? "fill-blue-500 text-blue-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trending Tags */}
        <div className="mt-8 bg-linear-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Trending Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "#photography",
              "#nature",
              "#art",
              "#design",
              "#travel",
              "#food",
              "#tech",
              "#inspiration",
            ].map((tag) => (
              <button
                key={tag}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
