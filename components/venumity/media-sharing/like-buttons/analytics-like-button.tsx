"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  TrendingUp,
  Users,
  Target,
  BarChart3,
  Clock,
} from "lucide-react";

interface LikeData {
  hour: number;
  likes: number;
}

export default function LikeButtonWithAnalytics() {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(2458);
  const [peakHour, setPeakHour] = useState<number>(0);
  const [likeData, setLikeData] = useState<LikeData[]>([]);
  const [loading, setLoading] = useState(false);

  const generateLikeData = () => {
    setLoading(true);
    const data: LikeData[] = [];

    for (let hour = 0; hour < 24; hour++) {
      const baseLikes = Math.floor(Math.random() * 100);
      const isPeak = hour >= 14 && hour <= 18;
      const likes = isPeak ? baseLikes + 150 : baseLikes;
      data.push({ hour, likes });
    }

    const peak = data.reduce((prev, current) =>
      prev.likes > current.likes ? prev : current
    );

    setTimeout(() => {
      setLikeData(data);
      setPeakHour(peak.hour);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    setTimeout(() => {
      generateLikeData();
    }, 0);
  }, []);

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikes((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikes((prev) => prev + 1);
    }
  };

  const dailyGrowth = 12.5;
  const engagementRate = Math.round((likes / 10000) * 100);
  const averageLikes = Math.round(likes / 24);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Like Analytics
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Track and analyze engagement metrics
              </p>
            </div>
            <button
              onClick={generateLikeData}
              disabled={loading}
              className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
            >
              {loading ? "Generating..." : "Refresh Data"}
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Likes
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {likes}
                  </div>
                </div>
                <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                  <Heart className="text-red-600 dark:text-red-300" size={24} />
                </div>
              </div>
              <div className="mt-3 flex items-center text-green-600">
                <TrendingUp size={16} />
                <span className="ml-2">+{dailyGrowth}% today</span>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Engagement Rate
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {engagementRate}%
                  </div>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Users
                    className="text-blue-600 dark:text-blue-300"
                    size={24}
                  />
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                High engagement
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Peak Hour
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {peakHour}:00
                  </div>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Target
                    className="text-green-600 dark:text-green-300"
                    size={24}
                  />
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                Best time to post
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Avg. Likes/Hour
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {averageLikes}
                  </div>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <BarChart3
                    className="text-purple-600 dark:text-purple-300"
                    size={24}
                  />
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                Consistent engagement
              </div>
            </div>
          </div>

          {/* Like Chart */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white">
                Likes by Hour
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={16} />
                <span>24-hour distribution</span>
              </div>
            </div>

            {loading ? (
              <div className="h-48 flex items-center justify-center">
                <div className="text-gray-500">Loading chart...</div>
              </div>
            ) : (
              <div className="h-48 flex items-end gap-1 bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                {likeData.map((data) => (
                  <div
                    key={data.hour}
                    className="flex-1 flex flex-col items-center"
                  >
                    <motion.div
                      className={`w-full rounded-t-lg ${
                        data.hour === peakHour
                          ? "bg-linear-to-t from-red-500 to-pink-600"
                          : "bg-linear-to-t from-blue-400 to-blue-500"
                      }`}
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.likes / 300) * 100}%` }}
                      transition={{ duration: 1, delay: data.hour * 0.02 }}
                      title={`${data.likes} likes at ${data.hour}:00`}
                    />
                    <div className="text-xs text-gray-500 mt-2">
                      {data.hour}:00
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Like Action Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Like Button */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                Like This Content
              </h3>
              <div className="flex items-center justify-between">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleLike}
                  className={`p-4 rounded-full ${
                    isLiked
                      ? "bg-red-50 dark:bg-red-900/20 text-red-600"
                      : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <Heart size={32} fill={isLiked ? "currentColor" : "none"} />
                </motion.button>
                <div className="text-right">
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">
                    {likes}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Total Likes
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300">
                    Your Status
                  </span>
                  <span
                    className={`font-medium ${
                      isLiked ? "text-green-600" : "text-gray-600"
                    }`}
                  >
                    {isLiked ? "Liked" : "Not Liked"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    Today is Likes
                  </span>
                  <span className="font-medium text-green-600">
                    +{Math.floor(likes * 0.125)}
                  </span>
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                Insights
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target size={16} className="text-blue-600" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Peak Engagement
                    </span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {peakHour}:00 - {peakHour + 1}:00
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-green-600" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Growth Rate
                    </span>
                  </div>
                  <span className="font-bold text-green-600">
                    +{dailyGrowth}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-purple-600" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Estimated Reach
                    </span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {(likes * 10).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-yellow-600" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Best Time to Like
                    </span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">
                    Now
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
