"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Target, Clock, Zap, Award } from "lucide-react";

type ReactionType = "like" | "love" | "wow" | "haha" | "sad" | "angry";

interface ReactionData {
  type: ReactionType;
  emoji: string;
  label: string;
  count: number;
  trend: number;
  color: string;
  hourlyData: number[];
}

interface Analytics {
  totalReactions: number;
  engagementRate: number;
  peakHour: number;
  averagePerHour: number;
}

export default function ReactionPickerWithAnalytics() {
  const [userReaction, setUserReaction] = useState<ReactionType | null>(null);
  const [analytics, setAnalytics] = useState<Analytics>({
    totalReactions: 0,
    engagementRate: 0,
    peakHour: 0,
    averagePerHour: 0,
  });
  const [reactions, setReactions] = useState<ReactionData[]>([
    {
      type: "like",
      emoji: "👍",
      label: "Like",
      count: 245,
      trend: 12,
      color: "text-blue-600",
      hourlyData: [
        10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
        100, 105, 110, 115, 120, 125,
      ],
    },
    {
      type: "love",
      emoji: "❤️",
      label: "Love",
      count: 189,
      trend: 8,
      color: "text-red-600",
      hourlyData: [
        5, 8, 12, 15, 18, 22, 25, 28, 32, 35, 38, 42, 45, 48, 52, 55, 58, 62,
        65, 68, 72, 75, 78, 82,
      ],
    },
    {
      type: "wow",
      emoji: "😮",
      label: "Wow",
      count: 156,
      trend: 15,
      color: "text-yellow-600",
      hourlyData: [
        2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38,
        40, 42, 44, 46, 48,
      ],
    },
    {
      type: "haha",
      emoji: "😂",
      label: "Haha",
      count: 123,
      trend: 5,
      color: "text-green-600",
      hourlyData: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24,
      ],
    },
    {
      type: "sad",
      emoji: "😢",
      label: "Sad",
      count: 45,
      trend: -2,
      color: "text-purple-600",
      hourlyData: [
        0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11,
        12,
      ],
    },
    {
      type: "angry",
      emoji: "😠",
      label: "Angry",
      count: 23,
      trend: 3,
      color: "text-orange-600",
      hourlyData: [
        0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8,
      ],
    },
  ]);

  useEffect(() => {
    // Calculate analytics
    const totalReactions = reactions.reduce((acc, r) => acc + r.count, 0);
    const maxHourlyData = reactions.flatMap((r) => r.hourlyData);
    const peakHour = maxHourlyData.indexOf(Math.max(...maxHourlyData)) % 24;
    const averagePerHour = Math.round(totalReactions / 24);
    const engagementRate = Math.round((totalReactions / 10000) * 100);

    // Use setTimeout to defer state update
    const timeout = setTimeout(() => {
      setAnalytics({
        totalReactions,
        engagementRate,
        peakHour,
        averagePerHour,
      });
    }, 0);

    // Cleanup
    return () => clearTimeout(timeout);
  }, [reactions]);

  const handleReaction = (type: ReactionType) => {
    if (userReaction === type) {
      setUserReaction(null);
      setReactions((prev) =>
        prev.map((r) => (r.type === type ? { ...r, count: r.count - 1 } : r))
      );
    } else {
      if (userReaction) {
        // Remove previous reaction
        setReactions((prev) =>
          prev.map((r) =>
            r.type === userReaction ? { ...r, count: r.count - 1 } : r
          )
        );
      }
      setUserReaction(type);
      setReactions((prev) =>
        prev.map((r) => (r.type === type ? { ...r, count: r.count + 1 } : r))
      );
    }
  };

  const getTopReactions = () => {
    return [...reactions].sort((a, b) => b.count - a.count).slice(0, 3);
  };

  const getHourlyDataForType = (type: ReactionType) => {
    const reaction = reactions.find((r) => r.type === type);
    return reaction?.hourlyData || [];
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Reaction Analytics
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Real-time engagement metrics
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {analytics.totalReactions}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Reactions
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Engagement Rate
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analytics.engagementRate}%
                  </div>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <TrendingUp
                    className="text-blue-600 dark:text-blue-300"
                    size={24}
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Peak Hour
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analytics.peakHour}:00
                  </div>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Target
                    className="text-green-600 dark:text-green-300"
                    size={24}
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Avg/Hour
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analytics.averagePerHour}
                  </div>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Clock
                    className="text-purple-600 dark:text-purple-300"
                    size={24}
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Top Reaction
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {getTopReactions()[0]?.emoji}
                  </div>
                </div>
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                  <Award
                    className="text-yellow-600 dark:text-yellow-300"
                    size={24}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Reaction Picker & Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Reaction Picker */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                Your Reaction
              </h3>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {reactions.map((reaction) => (
                  <motion.button
                    key={reaction.type}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleReaction(reaction.type)}
                    className={`p-4 rounded-xl flex flex-col items-center gap-2 ${
                      userReaction === reaction.type
                        ? "bg-gray-100 dark:bg-gray-800 ring-2 ring-blue-500"
                        : "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <span className="text-3xl">{reaction.emoji}</span>
                    <div className="text-center">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {reaction.label}
                      </div>
                      <div
                        className={`text-sm ${
                          reaction.trend >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {reaction.trend >= 0 ? "+" : ""}
                        {reaction.trend}%
                      </div>
                    </div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {reaction.count}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Hourly Chart */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">
                  Hourly Distribution
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={16} />
                  <span>Last 24 hours</span>
                </div>
              </div>
              <div className="h-48 bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <div className="h-full flex items-end gap-1">
                  {getHourlyDataForType(userReaction || "like").map(
                    (value, hour) => (
                      <div
                        key={hour}
                        className="flex-1 flex flex-col items-center"
                      >
                        <div
                          className="w-full bg-linear-to-t from-blue-500 to-blue-600 rounded-t-lg transition-all hover:opacity-80"
                          style={{ height: `${(value / 150) * 100}%` }}
                          title={`${value} reactions at ${hour}:00`}
                        ></div>
                        <div className="text-xs text-gray-500 mt-2">
                          {hour}:00
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Top Reactions */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              Top Reactions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {getTopReactions().map((reaction, index) => (
                <div
                  key={reaction.type}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{reaction.emoji}</span>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">
                          {reaction.label}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          #{index + 1} in ranking
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        {reaction.count}
                      </div>
                      <div
                        className={`text-sm ${
                          reaction.trend >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {reaction.trend >= 0 ? "+" : ""}
                        {reaction.trend}%
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${reaction.color}`}
                      style={{
                        width: `${
                          (reaction.count / analytics.totalReactions) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status & Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <Zap size={20} className="text-blue-600" />
                <span className="font-bold text-gray-900 dark:text-white">
                  Insights
                </span>
              </div>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• Peak engagement occurs at {analytics.peakHour}:00</li>
                <li>
                  • {getTopReactions()[0]?.label} is the most popular reaction
                </li>
                <li>
                  • Average of {analytics.averagePerHour} reactions per hour
                </li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <Users size={20} className="text-green-600" />
                <span className="font-bold text-gray-900 dark:text-white">
                  Your Status
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    Your Reaction
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {userReaction
                      ? reactions.find((r) => r.type === userReaction)?.label
                      : "None"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    Engagement Score
                  </span>
                  <span className="font-medium text-green-600">
                    {userReaction ? "+15" : "+0"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
