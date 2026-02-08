"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ThumbsUp, Star, Flame, PartyPopper } from "lucide-react";

type ReactionType = "like" | "love" | "star" | "fire" | "celebrate" | null;

interface Reaction {
  type: ReactionType;
  emoji: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  count: number;
}

export default function MultiReactionLikeButton() {
  const [userReaction, setUserReaction] = useState<ReactionType>(null);
  const [showReactions, setShowReactions] = useState(false);

  const reactions: Reaction[] = [
    {
      type: "like",
      emoji: "👍",
      label: "Like",
      icon: <ThumbsUp size={20} />,
      color: "text-blue-600",
      count: 124,
    },
    {
      type: "love",
      emoji: "❤️",
      label: "Love",
      icon: <Heart size={20} />,
      color: "text-red-600",
      count: 89,
    },
    {
      type: "star",
      emoji: "⭐",
      label: "Star",
      icon: <Star size={20} />,
      color: "text-yellow-600",
      count: 45,
    },
    {
      type: "fire",
      emoji: "🔥",
      label: "Fire",
      icon: <Flame size={20} />,
      color: "text-orange-600",
      count: 67,
    },
    {
      type: "celebrate",
      emoji: "🎉",
      label: "Celebrate",
      icon: <PartyPopper size={20} />,
      color: "text-purple-600",
      count: 32,
    },
  ];

  const totalReactions = reactions.reduce(
    (acc, reaction) => acc + reaction.count,
    0
  );
  const userReactionData = reactions.find((r) => r.type === userReaction);

  const handleReaction = (reactionType: ReactionType) => {
    if (userReaction === reactionType) {
      setUserReaction(null);
    } else {
      setUserReaction(reactionType);
    }
    setShowReactions(false);
  };

  const getReactionStats = () => {
    return reactions
      .filter((r) => r.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-lg">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
          {/* Content Preview */}
          <div className="mb-8">
            <div className="h-40 bg-linear-to-br from-green-400 to-blue-500 rounded-xl mb-4 flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                Innovative Tech
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Revolutionary AI Technology
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Discover how artificial intelligence is transforming industries
              and creating new opportunities.
            </p>
          </div>

          {/* Reaction Area */}
          <div className="relative">
            {/* Main Reaction Button */}
            <div className="flex items-center justify-between mb-6">
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setShowReactions(true)}
                  onMouseLeave={() =>
                    setTimeout(() => setShowReactions(false), 300)
                  }
                  onClick={() => {
                    if (!userReaction) handleReaction("like");
                    else setShowReactions(!showReactions);
                  }}
                  className={`px-6 py-3 rounded-full flex items-center gap-2 font-medium ${
                    userReaction
                      ? reactions.find((r) => r.type === userReaction)?.color +
                        " bg-opacity-10"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {userReaction ? (
                    <>
                      <span className="text-xl">{userReactionData?.emoji}</span>
                      <span>{userReactionData?.label}</span>
                    </>
                  ) : (
                    <>
                      <ThumbsUp size={20} />
                      <span>React</span>
                    </>
                  )}
                </motion.button>

                {/* Reaction Picker */}
                <AnimatePresence>
                  {showReactions && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      className="absolute bottom-14 left-0 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-2 flex gap-1 border border-gray-200 dark:border-gray-700 z-10"
                      onMouseEnter={() => setShowReactions(true)}
                      onMouseLeave={() =>
                        setTimeout(() => setShowReactions(false), 300)
                      }
                    >
                      {reactions.map((reaction) => (
                        <motion.button
                          key={reaction.type}
                          whileHover={{ scale: 1.2, y: -5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleReaction(reaction.type)}
                          className={`p-2 rounded-full ${reaction.color} ${
                            userReaction === reaction.type
                              ? "bg-opacity-20"
                              : "hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                          title={reaction.label}
                        >
                          <span className="text-xl">{reaction.emoji}</span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Total Reactions */}
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {totalReactions}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Reactions
                </div>
              </div>
            </div>

            {/* Reaction Breakdown */}
            <div className="mb-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                Reaction Breakdown
              </h4>
              <div className="space-y-2">
                {reactions.map((reaction) => (
                  <div
                    key={reaction.type}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{reaction.emoji}</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {reaction.label}
                      </span>
                      {userReaction === reaction.type && (
                        <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                          Your reaction
                        </span>
                      )}
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {reaction.count}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Reactions */}
            <div className="mb-8">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                Top Reactions
              </h4>
              <div className="flex items-center gap-4">
                {getReactionStats().map((reaction) => (
                  <div
                    key={reaction.type}
                    className="flex-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center"
                  >
                    <div className="text-2xl mb-1">{reaction.emoji}</div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {reaction.count}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {reaction.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Your Reaction
                </div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {userReaction ? userReactionData?.label : "None"}
                </div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Engagement Rate
                </div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {Math.round((totalReactions / 1000) * 100)}%
                </div>
              </div>
            </div>

            {/* Status Message */}
            <div className="mt-8 text-center">
              {userReaction ? (
                <p className="text-green-600">
                  🎉 You reacted with {userReactionData?.emoji}{" "}
                  {userReactionData?.label}!
                </p>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  Hover over the button to choose your reaction
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
