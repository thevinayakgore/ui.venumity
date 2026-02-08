"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export default function AnimatedLikeButton() {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(356);
  const [showParticles, setShowParticles] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikes((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikes((prev) => prev + 1);
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 2000);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
          {/* Content Preview */}
          <div className="mb-8">
            <div className="h-40 bg-linear-to-br from-pink-400 to-red-500 rounded-xl mb-4 flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                Beautiful Design
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Modern UI Design Principles
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Learn the principles that make modern user interfaces beautiful
              and functional.
            </p>
          </div>

          {/* Animated Like Button */}
          <div className="flex items-center justify-between mb-8">
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
                className="relative p-4 rounded-full bg-gray-100 dark:bg-gray-800"
              >
                {/* Heart Icon */}
                <motion.div
                  animate={{
                    scale: isLiked ? [1, 1.2, 1] : 1,
                    color: isLiked ? "#dc2626" : "#6b7280",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Heart size={28} fill={isLiked ? "currentColor" : "none"} />
                </motion.div>

                {/* Pulsing Ring */}
                <AnimatePresence>
                  {isLiked && (
                    <motion.div
                      className="absolute inset-0 border-2 border-red-500 rounded-full"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Particle Effects */}
              <AnimatePresence>
                {showParticles && (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ rotate: i * 45, scale: 0 }}
                        animate={{ rotate: i * 45 + 360, scale: [0, 1, 0] }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                      >
                        <motion.div
                          className="absolute w-2 h-2 bg-red-500 rounded-full"
                          animate={{
                            x: Math.cos((i * 45 * Math.PI) / 180) * 60,
                            y: Math.sin((i * 45 * Math.PI) / 180) * 60,
                          }}
                          transition={{ duration: 1 }}
                        />
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Like Counter */}
            <motion.div
              key={likes}
              initial={{ scale: 1.2, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              className="text-right"
            >
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {likes}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Likes
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {Math.round((likes / 1000) * 100)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Engagement
              </div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {isLiked ? "Liked" : "Not Liked"}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Your Status
              </div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                +24
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Today
              </div>
            </div>
          </div>

          {/* Status Message */}
          <AnimatePresence>
            {isLiked && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
              >
                <div className="flex items-center gap-2 text-red-600">
                  <Sparkles size={18} />
                  <span className="font-medium">You liked this content!</span>
                </div>
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  Your like helps others discover this amazing content.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.main>
  );
}
