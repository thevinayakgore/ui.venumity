"use client";
import { useState } from "react";
import { motion } from "framer-motion";

type EmojiReaction =
  | "👍"
  | "❤️"
  | "😂"
  | "😮"
  | "😢"
  | "🎉"
  | "🔥"
  | "⭐"
  | null;

interface Reaction {
  emoji: EmojiReaction;
  label: string;
  count: number;
  color: string;
}

export default function EmojiReactionPicker() {
  const [userReaction, setUserReaction] = useState<EmojiReaction>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [hoveredReaction, setHoveredReaction] = useState<EmojiReaction>(null);

  const reactions: Reaction[] = [
    { emoji: "👍", label: "Thumbs Up", count: 245, color: "text-blue-600" },
    { emoji: "❤️", label: "Red Heart", count: 189, color: "text-red-600" },
    {
      emoji: "😂",
      label: "Tears of Joy",
      count: 156,
      color: "text-yellow-600",
    },
    { emoji: "😮", label: "Surprised", count: 98, color: "text-orange-600" },
    { emoji: "😢", label: "Crying", count: 45, color: "text-purple-600" },
    { emoji: "🎉", label: "Celebration", count: 123, color: "text-pink-600" },
    { emoji: "🔥", label: "Fire", count: 167, color: "text-red-500" },
    { emoji: "⭐", label: "Star", count: 89, color: "text-yellow-500" },
  ];

  const handleReaction = (emoji: EmojiReaction) => {
    if (userReaction === emoji) {
      setUserReaction(null);
    } else {
      setUserReaction(emoji);
    }
    setShowPicker(false);
  };

  const totalReactions = reactions.reduce(
    (acc, reaction) => acc + reaction.count,
    0
  );
  const userReactionData = reactions.find((r) => r.emoji === userReaction);
  const hoveredReactionData = reactions.find(
    (r) => r.emoji === hoveredReaction
  );

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-2xl">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
          {/* Content Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Amazing Sunset Photography
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Captured this beautiful sunset during my trip to Hawaii. Nature
              never fails to amaze!
            </p>
          </div>

          {/* Image Preview */}
          <div className="h-64 bg-linear-to-r from-orange-400 to-pink-600 rounded-xl mb-8 flex items-center justify-center">
            <span className="text-white text-xl font-bold">
              🌅 Beautiful Sunset
            </span>
          </div>

          {/* Reaction Area */}
          <div className="relative">
            {/* Main Reaction Button */}
            <div className="flex items-center justify-between mb-8">
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPicker(!showPicker)}
                  onMouseEnter={() => setShowPicker(true)}
                  onMouseLeave={() =>
                    setTimeout(() => setShowPicker(false), 300)
                  }
                  className={`px-6 py-3 rounded-full flex items-center gap-2 font-medium text-lg ${
                    userReaction
                      ? "bg-gray-100 dark:bg-gray-800"
                      : "bg-gray-100 dark:bg-gray-800"
                  }`}
                >
                  {userReaction ? (
                    <>
                      <span className="text-2xl">{userReaction}</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {userReactionData?.label}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">😊</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        Add Reaction
                      </span>
                    </>
                  )}
                </motion.button>

                {/* Emoji Picker */}
                {showPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute bottom-14 left-0 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-gray-200 dark:border-gray-700 z-10"
                    onMouseEnter={() => setShowPicker(true)}
                    onMouseLeave={() =>
                      setTimeout(() => setShowPicker(false), 300)
                    }
                  >
                    <div className="grid grid-cols-4 gap-3 mb-4">
                      {reactions.map((reaction) => (
                        <motion.button
                          key={reaction.emoji}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleReaction(reaction.emoji)}
                          onMouseEnter={() =>
                            setHoveredReaction(reaction.emoji)
                          }
                          onMouseLeave={() => setHoveredReaction(null)}
                          className={`p-3 rounded-xl text-2xl flex items-center justify-center ${
                            userReaction === reaction.emoji
                              ? "bg-gray-100 dark:bg-gray-700 ring-2 ring-blue-500"
                              : "hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          {reaction.emoji}
                        </motion.button>
                      ))}
                    </div>

                    {/* Hover Preview */}
                    {hoveredReactionData && (
                      <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {hoveredReactionData.label}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {hoveredReactionData.count} reactions
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
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

            {/* Reaction Grid */}
            <div className="mb-8">
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                All Reactions
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {reactions.map((reaction) => (
                  <div
                    key={reaction.emoji}
                    className={`p-4 rounded-xl border ${
                      userReaction === reaction.emoji
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-800"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl">{reaction.emoji}</span>
                      {userReaction === reaction.emoji && (
                        <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded">
                          Yours
                        </span>
                      )}
                    </div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {reaction.count}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {reaction.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reaction Breakdown */}
            <div className="mb-8">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                Most Popular Reactions
              </h4>
              <div className="space-y-2">
                {reactions
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 3)
                  .map((reaction) => (
                    <div
                      key={reaction.emoji}
                      className="flex items-center gap-3"
                    >
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-2xl">
                        {reaction.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {reaction.label}
                          </span>
                          <span className="font-bold text-gray-900 dark:text-white">
                            {reaction.count}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-linear-to-r from-blue-500 to-purple-600"
                            style={{
                              width: `${
                                (reaction.count / totalReactions) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {reactions.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Emoji Types
                </div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {Math.round(totalReactions / reactions.length)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Avg per Emoji
                </div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {userReaction ? "👍" : "—"}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Your Reaction
                </div>
              </div>
            </div>

            {/* Status Message */}
            <div className="mt-8 text-center">
              {userReaction ? (
                <p className="text-green-600">
                  🎉 You reacted with {userReaction} - {userReactionData?.label}
                  !
                </p>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  Choose an emoji to express how this makes you feel
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
