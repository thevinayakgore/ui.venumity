"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Target,
  TrendingUp,
  Trophy,
  UserPlus,
  UserCheck,
} from "lucide-react";

interface Milestone {
  followers: number;
  label: string;
  achieved: boolean;
}

export default function FollowButtonWithProgress() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(1245);
  const [progress, setProgress] = useState(0);

  const milestones: Milestone[] = [
    { followers: 1000, label: "1K Followers", achieved: true },
    { followers: 2500, label: "2.5K Followers", achieved: false },
    { followers: 5000, label: "5K Followers", achieved: false },
    { followers: 10000, label: "10K Followers", achieved: false },
  ];

  const nextMilestone =
    milestones.find((m) => !m.achieved) || milestones[milestones.length - 1];
  const progressPercentage = Math.min(
    (followers / nextMilestone.followers) * 100,
    100
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(progressPercentage);
    }, 0);

    return () => clearTimeout(timeout);
  }, [followers, progressPercentage]);

  const handleFollow = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowers((prev) => Math.max(0, prev - 1));
    } else {
      setIsFollowing(true);
      setFollowers((prev) => prev + 1);
    }
  };

  const addMultipleFollowers = (count: number) => {
    setIsFollowing(true);
    setFollowers((prev) => prev + count);
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-2xl">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-linear-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white text-3xl font-bold">TJ</span>
              </div>
              <div className="absolute -bottom-2 -right-2 p-2 bg-blue-600 rounded-full">
                <Trophy size={20} className="text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Taylor Johnson
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Fitness Coach & Influencer
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Users size={20} className="text-blue-600" />
                  <div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      {followers.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Followers
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={20} className="text-green-600" />
                  <div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      +24%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Growth
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Target size={18} className="text-blue-600" />
                <span className="font-medium text-gray-900 dark:text-white">
                  Next Milestone: {nextMilestone.label}
                </span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">
                {followers.toLocaleString()} /{" "}
                {nextMilestone.followers.toLocaleString()}
              </span>
            </div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-linear-to-r from-blue-500 to-purple-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span>{Math.round(progress)}% Complete</span>
              <span>{nextMilestone.followers - followers} to go</span>
            </div>
          </div>

          {/* Milestones */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  milestone.achieved
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-gray-200 dark:border-gray-800"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      milestone.achieved
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {milestone.achieved ? "✓" : index + 1}
                  </div>
                  {milestone.achieved && (
                    <Trophy size={16} className="text-yellow-500" />
                  )}
                </div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {milestone.followers.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {milestone.label}
                </div>
              </div>
            ))}
          </div>

          {/* Follow Action */}
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleFollow}
              className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-medium text-lg ${
                isFollowing
                  ? "bg-linear-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300"
                  : "bg-linear-to-r from-blue-600 to-purple-600 text-white"
              }`}
            >
              {isFollowing ? (
                <>
                  <UserCheck size={24} />
                  <span>Following</span>
                </>
              ) : (
                <>
                  <UserPlus size={24} />
                  <span>Follow Taylor</span>
                </>
              )}
            </motion.button>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-3">
              {[10, 25, 50].map((count) => (
                <button
                  key={count}
                  onClick={() => addMultipleFollowers(count)}
                  className="py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  +{count} Followers
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Today is Followers
                  </div>
                  <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    +{followers % 100}
                  </div>
                </div>
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Monthly Goal
                  </div>
                  <div className="text-xl font-bold text-green-600 dark:text-green-400">
                    {Math.round((followers / 5000) * 100)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
