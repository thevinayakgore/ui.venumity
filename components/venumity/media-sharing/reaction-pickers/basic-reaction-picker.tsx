"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  ThumbsUp,
  Star,
  Smile,
  Frown,
  PartyPopper,
  Check,
} from "lucide-react";

type ReactionType =
  | "like"
  | "love"
  | "star"
  | "happy"
  | "sad"
  | "celebrate"
  | null;

interface Reaction {
  type: ReactionType;
  icon: React.ReactNode;
  label: string;
  color: string;
  count: number;
}

export default function BasicReactionPicker() {
  const [userReaction, setUserReaction] = useState<ReactionType>(null);
  const [showPicker, setShowPicker] = useState(false);

  const reactions: Reaction[] = [
    {
      type: "like",
      icon: <ThumbsUp size={20} />,
      label: "Like",
      color: "text-blue-600",
      count: 124,
    },
    {
      type: "love",
      icon: <Heart size={20} />,
      label: "Love",
      color: "text-red-600",
      count: 89,
    },
    {
      type: "star",
      icon: <Star size={20} />,
      label: "Star",
      color: "text-yellow-600",
      count: 45,
    },
    {
      type: "happy",
      icon: <Smile size={20} />,
      label: "Happy",
      color: "text-green-600",
      count: 67,
    },
    {
      type: "sad",
      icon: <Frown size={20} />,
      label: "Sad",
      color: "text-purple-600",
      count: 12,
    },
    {
      type: "celebrate",
      icon: <PartyPopper size={20} />,
      label: "Celebrate",
      color: "text-pink-600",
      count: 34,
    },
  ];

  const handleReaction = (reactionType: ReactionType) => {
    if (userReaction === reactionType) {
      setUserReaction(null);
    } else {
      setUserReaction(reactionType);
    }
    setShowPicker(false);
  };

  const totalReactions = reactions.reduce(
    (acc, reaction) => acc + reaction.count,
    0
  );
  const userReactionData = reactions.find((r) => r.type === userReaction);

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
            <div className="h-40 bg-linear-to-br from-blue-400 to-purple-500 rounded-xl mb-4 flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                Amazing Content
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              How to Build Better Products
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Learn the principles of product development that lead to
              successful outcomes.
            </p>
          </div>

          {/* Reaction Picker */}
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              {/* Reaction Button */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPicker(!showPicker)}
                  className={`px-6 py-3 rounded-full flex items-center gap-2 font-medium ${
                    userReaction
                      ? `${userReactionData?.color} bg-opacity-10`
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {userReaction ? (
                    <>
                      {userReactionData?.icon}
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
                {showPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute bottom-12 left-0 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-3 grid grid-cols-3 gap-2 border border-gray-200 dark:border-gray-700 z-10"
                  >
                    {reactions.map((reaction) => (
                      <motion.button
                        key={reaction.type}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleReaction(reaction.type)}
                        className={`p-3 rounded-lg flex flex-col items-center gap-1 ${
                          reaction.color
                        } ${
                          userReaction === reaction.type
                            ? "bg-opacity-10"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {reaction.icon}
                        <span className="text-xs">{reaction.label}</span>
                      </motion.button>
                    ))}
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

            {/* Reaction Breakdown */}
            <div className="mb-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                Reactions
              </h4>
              <div className="space-y-2">
                {reactions.map((reaction) => (
                  <div
                    key={reaction.type}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-2 rounded-lg ${reaction.color} bg-opacity-10`}
                      >
                        {reaction.icon}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {reaction.label}
                      </span>
                      {userReaction === reaction.type && (
                        <Check size={14} className="text-green-600" />
                      )}
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {reaction.count}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Message */}
            <div className="mt-8 text-center">
              {userReaction ? (
                <p className="text-green-600">
                  ✓ You reacted with {userReactionData?.label}
                </p>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  Click the button to choose your reaction
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
