"use client";
import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Trophy,
  Sparkles,
  Target,
  Zap,
  Crown,
  UserPlus,
  UserCheck,
} from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  followersRequired: number;
  achieved: boolean;
  icon: React.ReactNode;
}

export default function InteractiveFollowGame() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(892);
  const [streak, setStreak] = useState(3);
  const [level, setLevel] = useState(2);
  const [xp, setXp] = useState(45);
  const [showConfetti, setShowConfetti] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "1",
      name: "First Follower",
      description: "Gained your first follower",
      followersRequired: 1,
      achieved: true,
      icon: <Sparkles size={16} />,
    },
    {
      id: "2",
      name: "Social Butterfly",
      description: "Reach 100 followers",
      followersRequired: 100,
      achieved: true,
      icon: <Users size={16} />,
    },
    {
      id: "3",
      name: "Rising Star",
      description: "Reach 500 followers",
      followersRequired: 500,
      achieved: true,
      icon: <Zap size={16} />,
    },
    {
      id: "4",
      name: "Influencer",
      description: "Reach 1000 followers",
      followersRequired: 1000,
      achieved: false,
      icon: <Crown size={16} />,
    },
    {
      id: "5",
      name: "Celebrity",
      description: "Reach 5000 followers",
      followersRequired: 5000,
      achieved: false,
      icon: <Trophy size={16} />,
    },
  ]);

  const xpPerFollow = 10;
  const xpForNextLevel = level * 100;
  const xpProgress = (xp / xpForNextLevel) * 100;

  useEffect(() => {
    const t0 = setTimeout(() => {
      const newAchievements = achievements.map((achievement) => ({
        ...achievement,
        achieved: followers >= achievement.followersRequired,
      }));
      setAchievements(newAchievements);

      const newAchievement = newAchievements.find(
        (a) =>
          !achievements.find((old) => old.id === a.id)?.achieved && a.achieved
      );
      if (newAchievement) {
        setShowConfetti(true);
        const t = setTimeout(() => setShowConfetti(false), 3000);
        return () => clearTimeout(t);
      }
    }, 0);

    return () => clearTimeout(t0);
  }, [followers, achievements]);

  const handleFollow = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowers((prev) => prev - 1);
      setStreak(0);
    } else {
      setIsFollowing(true);
      setFollowers((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      setXp((prev) => {
        const newXp = prev + xpPerFollow;
        if (newXp >= xpForNextLevel) {
          setLevel((prevLevel) => prevLevel + 1);
          return newXp - xpForNextLevel;
        }
        return newXp;
      });
    }
  };

  const addFollowers = (count: number) => {
    if (!isFollowing) setIsFollowing(true);
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        setFollowers((prev) => prev + 1);
        setXp((prev) => {
          const newXp = prev + xpPerFollow;
          if (newXp >= xpForNextLevel) {
            setLevel((prevLevel) => prevLevel + 1);
            return newXp - xpForNextLevel;
          }
          return newXp;
        });
      }, i * 100);
    }
    setStreak((prev) => prev + count);
  };

  const [confettiPositions, setConfettiPositions] = useState<
    { initialX: number; animateX: number }[]
  >([]);

  useEffect(() => {
    const t = setTimeout(() => {
      setConfettiPositions(
        Array.from({ length: 50 }).map(() => ({
          initialX: Math.random() * 100 - 50,
          animateX: Math.random() * 200 - 100,
        }))
      );
    }, 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl">
        <div className="bg-linear-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl p-8">
          {/* Game Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">AJ</span>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Lvl {level}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Alex Johnson
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Gaming Streamer & Content Creator
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {followers}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Followers
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {streak}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Day Streak
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {xp}/{xpForNextLevel}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  XP
                </div>
              </div>
            </div>
          </div>

          {/* XP Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Target size={18} className="text-blue-600" />
                <span className="font-medium text-gray-900 dark:text-white">
                  Level Progress
                </span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">
                Level {level} • {Math.round(xpProgress)}%
              </span>
            </div>
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-linear-to-r from-blue-500 to-purple-600"
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span>{xp} XP</span>
              <span>{xpForNextLevel - xp} XP to next level</span>
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-8">
            <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Trophy size={20} className="text-yellow-500" />
              Achievements
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-3 rounded-lg border ${
                    achievement.achieved
                      ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                      : "border-gray-200 dark:border-gray-800 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`p-2 rounded ${
                        achievement.achieved
                          ? "bg-yellow-500 text-white"
                          : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {achievement.icon}
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {achievement.name}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {achievement.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Follow Action */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleFollow}
                className={`flex-1 py-4 rounded-xl flex items-center justify-center gap-3 font-medium text-lg ${
                  isFollowing
                    ? "bg-linear-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300"
                    : "bg-linear-to-r from-blue-600 to-purple-600 text-white"
                }`}
              >
                {isFollowing ? (
                  <>
                    <UserCheck size={24} />
                    <span>Following • {xpPerFollow} XP/day</span>
                  </>
                ) : (
                  <>
                    <UserPlus size={24} />
                    <span>Follow Alex • Earn {xpPerFollow} XP</span>
                  </>
                )}
              </motion.button>

              {/* Quick Follow Buttons */}
              <div className="flex gap-2">
                {[5, 10, 25].map((count) => (
                  <button
                    key={count}
                    onClick={() => addFollowers(count)}
                    className="px-4 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 font-medium"
                  >
                    +{count}
                  </button>
                ))}
              </div>
            </div>

            {/* Game Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={20} className="text-blue-600" />
                  <span className="font-bold text-gray-900 dark:text-white">
                    XP System
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Earn {xpPerFollow} XP per follower. Level up to unlock
                  rewards!
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={20} className="text-purple-600" />
                  <span className="font-bold text-gray-900 dark:text-white">
                    Streak Bonus
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {streak} day streak active. Keep it going for bonus rewards!
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Crown size={20} className="text-green-600" />
                  <span className="font-bold text-gray-900 dark:text-white">
                    Next Reward
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Level {level + 1} unlocks exclusive content
                </p>
              </div>
            </div>
          </div>

          {/* Confetti Effect */}
          <AnimatePresence>
            {showConfetti && (
              <div className="fixed inset-0 pointer-events-none">
                {[...Array(50)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{
                      y: "100vh",
                      x: confettiPositions[i].initialX,
                      rotate: 0,
                    }}
                    animate={{
                      y: "-100vh",
                      x: confettiPositions[i].animateX,
                      rotate: 360,
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeOut",
                    }}
                  >
                    <div
                      className={`w-4 h-4 ${
                        i % 3 === 0
                          ? "bg-yellow-400"
                          : i % 3 === 1
                          ? "bg-blue-400"
                          : "bg-pink-400"
                      } rounded-full`}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.main>
  );
}
