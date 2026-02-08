"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, UserCheck, Users, Sparkles } from "lucide-react";

export default function AnimatedFollowButton() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(2847);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPositions, setConfettiPositions] = useState<{ xInitial: number; xFinal: number }[]>([]);

  useEffect(() => {
    if (showConfetti) {
      const timeout = setTimeout(() => {
        const positions = Array.from({ length: 20 }, () => ({
          xInitial: Math.random() * 100 - 50,
          xFinal: Math.random() * 100 - 50,
        }));
        setConfettiPositions(positions);
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [showConfetti]);

  const handleFollow = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowers((prev) => prev - 1);
    } else {
      setIsFollowing(true);
      setFollowers((prev) => prev + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-lg">
        <div className="bg-linear-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl p-8">
          {/* Profile Card */}
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">SR</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Sarah Reynolds
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Digital Creator
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
                  <Users size={16} />
                  <span className="font-medium">
                    {followers.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">followers</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full bg-linear-to-br from-yellow-400 to-orange-500 border border-white dark:border-gray-900"
                      style={{ marginLeft: i > 1 ? "-8px" : "0" }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Animated Follow Button */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFollow}
              className={`relative w-full py-4 rounded-xl flex items-center justify-center gap-3 font-medium overflow-hidden ${
                isFollowing
                  ? "bg-linear-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300"
                  : "bg-linear-to-r from-blue-500 to-purple-600 text-white"
              }`}
            >
              {/* Background Animation */}
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />

              {/* Button Content */}
              <AnimatePresence mode="wait">
                {isFollowing ? (
                  <motion.div
                    key="following"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="flex items-center gap-2"
                  >
                    <UserCheck size={22} />
                    <span>Following</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="follow"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="flex items-center gap-2"
                  >
                    <UserPlus size={22} />
                    <span>Follow Sarah</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Hover Effect */}
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-transparent pointer-events-none"
              animate={{
                boxShadow: isFollowing
                  ? "0 0 0 0px rgba(156, 163, 175, 0)"
                  : "0 0 0 4px rgba(59, 130, 246, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Confetti Effect */}
          <AnimatePresence>
            {showConfetti && (
              <div className="absolute inset-0 pointer-events-none">
                {confettiPositions.map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{
                      y: 0,
                      x: pos.xInitial,
                      opacity: 1,
                      scale: 0.5,
                    }}
                    animate={{
                      y: -100,
                      x: pos.xFinal,
                      opacity: 0,
                      scale: 1,
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeOut",
                    }}
                  >
                    <Sparkles size={20} className="text-yellow-400" />
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Status Updates */}
          <div className="mt-8 space-y-4">
            <AnimatePresence>
              {isFollowing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                >
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                    <Sparkles size={18} />
                    <span className="font-medium">
                      You are now following Sarah!
                    </span>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    You will see her posts in your feed. Welcome to the community!
                    🎉
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isFollowing
                  ? "Sarah posts about design, technology, and creative processes"
                  : "Follow to see Sarah's latest designs and insights"}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Users className="text-blue-600 dark:text-blue-300" size={18} />
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white">
                  +{followers}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Followers
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Sparkles
                  className="text-green-600 dark:text-green-300"
                  size={18}
                />
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white">
                  Active
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Online now
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <UserCheck
                  className="text-purple-600 dark:text-purple-300"
                  size={18}
                />
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {isFollowing ? "Following" : "Not Following"}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Status
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
