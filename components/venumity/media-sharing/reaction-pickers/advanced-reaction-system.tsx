"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Zap,
  Trophy,
  TrendingUp,
  Target,
  Clock,
  BarChart3,
  Crown,
  Award,
} from "lucide-react";

type ReactionCategory = "positive" | "emotional" | "creative" | "surprise";
type ReactionType =
  | "fire"
  | "star"
  | "heart"
  | "mindblown"
  | "clap"
  | "laugh"
  | "cry"
  | "shocked"
  | "rocket"
  | "trophy";

interface Reaction {
  id: string;
  type: ReactionType;
  emoji: string;
  label: string;
  category: ReactionCategory;
  points: number;
  count: number;
  color: string;
  users: string[];
}

interface UserStats {
  level: number;
  xp: number;
  streak: number;
  totalReactions: number;
  badges: string[];
}

export default function AdvancedReactionSystem() {
  const [userReaction, setUserReaction] = useState<ReactionType | null>(null);
  const [activeCategory, setActiveCategory] =
    useState<ReactionCategory>("positive");
  const [userStats, setUserStats] = useState<UserStats>({
    level: 3,
    xp: 245,
    streak: 7,
    totalReactions: 42,
    badges: ["Quick Reactor", "Diverse Reactor", "Top Contributor"],
  });
  const [showAnimation, setShowAnimation] = useState(false);

  const reactions: Reaction[] = [
    // Positive Reactions
    {
      id: "1",
      type: "fire",
      emoji: "🔥",
      label: "Fire",
      category: "positive",
      points: 10,
      count: 245,
      color: "text-orange-600",
      users: ["Alex", "Sam", "Taylor"],
    },
    {
      id: "2",
      type: "star",
      emoji: "⭐",
      label: "Star",
      category: "positive",
      points: 8,
      count: 189,
      color: "text-yellow-600",
      users: ["Jordan", "Casey"],
    },
    {
      id: "3",
      type: "clap",
      emoji: "👏",
      label: "Clap",
      category: "positive",
      points: 6,
      count: 156,
      color: "text-blue-600",
      users: ["Riley"],
    },

    // Emotional Reactions
    {
      id: "4",
      type: "heart",
      emoji: "❤️",
      label: "Heart",
      category: "emotional",
      points: 12,
      count: 278,
      color: "text-red-600",
      users: ["Morgan", "Alex", "Sam", "Taylor"],
    },
    {
      id: "5",
      type: "laugh",
      emoji: "😂",
      label: "Laugh",
      category: "emotional",
      points: 7,
      count: 198,
      color: "text-green-600",
      users: ["Jordan", "Casey"],
    },
    {
      id: "6",
      type: "cry",
      emoji: "😢",
      label: "Cry",
      category: "emotional",
      points: 5,
      count: 87,
      color: "text-purple-600",
      users: ["Riley"],
    },

    // Creative Reactions
    {
      id: "7",
      type: "mindblown",
      emoji: "🤯",
      label: "Mind Blown",
      category: "creative",
      points: 15,
      count: 134,
      color: "text-pink-600",
      users: ["Morgan", "Alex"],
    },
    {
      id: "8",
      type: "rocket",
      emoji: "🚀",
      label: "Rocket",
      category: "creative",
      points: 10,
      count: 112,
      color: "text-cyan-600",
      users: ["Sam"],
    },

    // Surprise Reactions
    {
      id: "9",
      type: "shocked",
      emoji: "😮",
      label: "Shocked",
      category: "surprise",
      points: 8,
      count: 98,
      color: "text-yellow-500",
      users: ["Taylor", "Jordan"],
    },
    {
      id: "10",
      type: "trophy",
      emoji: "🏆",
      label: "Trophy",
      category: "surprise",
      points: 20,
      count: 45,
      color: "text-amber-600",
      users: ["Casey"],
    },
  ];

  const categories = [
    {
      id: "positive",
      label: "Positive",
      icon: <Sparkles size={18} />,
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    },
    {
      id: "emotional",
      label: "Emotional",
      icon: <Zap size={18} />,
      color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    },
    {
      id: "creative",
      label: "Creative",
      icon: <Trophy size={18} />,
      color:
        "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    },
    {
      id: "surprise",
      label: "Surprise",
      icon: <Award size={18} />,
      color:
        "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    },
  ];

  const filteredReactions = reactions.filter(
    (r) => r.category === activeCategory
  );
  const totalReactions = reactions.reduce((acc, r) => acc + r.count, 0);
  const userReactionData = reactions.find((r) => r.type === userReaction);

  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => setShowAnimation(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

  const handleReaction = (type: ReactionType) => {
    if (userReaction === type) {
      setUserReaction(null);
      setUserStats((prev) => ({
        ...prev,
        totalReactions: prev.totalReactions - 1,
      }));
    } else {
      const reaction = reactions.find((r) => r.type === type);
      if (reaction) {
        setUserReaction(type);
        setShowAnimation(true);
        setUserStats((prev) => ({
          ...prev,
          totalReactions: prev.totalReactions + 1,
          xp: prev.xp + reaction.points,
        }));
      }
    }
  };

  const getTopReactions = () => {
    return [...reactions].sort((a, b) => b.count - a.count).slice(0, 3);
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Advanced Reaction System
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Express yourself with advanced reactions and earn rewards
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {totalReactions}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total Reactions
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {reactions.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Reaction Types
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                    <Trophy
                      className="text-blue-600 dark:text-blue-300"
                      size={20}
                    />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      Level {userStats.level}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {userStats.xp} XP
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                    <TrendingUp
                      className="text-green-600 dark:text-green-300"
                      size={20}
                    />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {userStats.streak} days
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Streak
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
                    <Target
                      className="text-purple-600 dark:text-purple-300"
                      size={20}
                    />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {userStats.totalReactions}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Your Reactions
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-800 rounded-lg">
                    <Crown
                      className="text-yellow-600 dark:text-yellow-300"
                      size={20}
                    />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {userStats.badges.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Badges
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() =>
                    setActiveCategory(category.id as ReactionCategory)
                  }
                  className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                    activeCategory === category.id
                      ? `${category.color} ring-2 ring-offset-2 ring-opacity-50`
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {category.icon}
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reaction Grid */}
          <div className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {filteredReactions.map((reaction) => (
                <motion.button
                  key={reaction.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleReaction(reaction.type)}
                  className={`p-4 rounded-xl flex flex-col items-center gap-2 ${
                    userReaction === reaction.type
                      ? "bg-gray-100 dark:bg-gray-800 ring-2 ring-blue-500"
                      : "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="text-4xl">{reaction.emoji}</span>
                  <div className="text-center">
                    <div className="font-bold text-gray-900 dark:text-white">
                      {reaction.label}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {reaction.points} XP
                    </div>
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {reaction.count}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Reaction Animation */}
            <AnimatePresence>
              {showAnimation && userReactionData && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
                >
                  <div className="text-8xl">{userReactionData.emoji}</div>
                  <motion.div
                    initial={{ y: 0, opacity: 1 }}
                    animate={{ y: -100, opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute text-2xl font-bold text-green-600"
                  >
                    +{userReactionData.points} XP!
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Top Reactions */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                Most Popular Reactions
              </h3>
              <div className="space-y-3">
                {getTopReactions().map((reaction) => (
                  <div
                    key={reaction.id}
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{reaction.emoji}</div>
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white">
                            {reaction.label}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {reaction.users.length} people reacted
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                          {reaction.count}
                        </div>
                        <div className="text-sm text-green-600">
                          {reaction.points} XP each
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 size={20} className="text-blue-600" />
                  <span className="font-bold text-gray-900 dark:text-white">
                    Your Stats
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">
                      Current Reaction
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {userReactionData?.label || "None"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">
                      XP Earned
                    </span>
                    <span className="font-medium text-green-600">
                      {userStats.xp}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">
                      Reaction Streak
                    </span>
                    <span className="font-medium text-blue-600">
                      {userStats.streak} days
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Clock size={20} className="text-purple-600" />
                  <span className="font-bold text-gray-900 dark:text-white">
                    Recent Reactors
                  </span>
                </div>
                <div className="space-y-2">
                  {reactions
                    .flatMap((r) => r.users)
                    .slice(0, 5)
                    .map((user, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-700 dark:text-gray-300">
                          {user}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          2 min ago
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Award size={20} className="text-yellow-600" />
                  <span className="font-bold text-gray-900 dark:text-white">
                    Your Badges
                  </span>
                </div>
                <div className="space-y-2">
                  {userStats.badges.map((badge, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
