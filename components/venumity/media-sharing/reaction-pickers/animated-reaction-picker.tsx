"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ThumbsUp,
  Star,
  Smile,
  Frown,
  PartyPopper,
  Sparkles,
  Zap,
} from "lucide-react";

type ReactionType =
  | "like"
  | "love"
  | "star"
  | "happy"
  | "sad"
  | "celebrate"
  | "shock"
  | null;

interface Reaction {
  type: ReactionType;
  icon: React.ReactNode;
  label: string;
  color: string;
  bgColor: string;
  count: number;
}

export default function AnimatedReactionPicker() {
  const [userReaction, setUserReaction] = useState<ReactionType>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const reactions: Reaction[] = [
    {
      type: "like",
      icon: <ThumbsUp size={24} />,
      label: "Like",
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      count: 156,
    },
    {
      type: "love",
      icon: <Heart size={24} />,
      label: "Love",
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900/30",
      count: 98,
    },
    {
      type: "star",
      icon: <Star size={24} />,
      label: "Star",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
      count: 56,
    },
    {
      type: "happy",
      icon: <Smile size={24} />,
      label: "Happy",
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      count: 78,
    },
    {
      type: "sad",
      icon: <Frown size={24} />,
      label: "Sad",
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      count: 23,
    },
    {
      type: "celebrate",
      icon: <PartyPopper size={24} />,
      label: "Celebrate",
      color: "text-pink-600",
      bgColor: "bg-pink-100 dark:bg-pink-900/30",
      count: 45,
    },
    {
      type: "shock",
      icon: <Zap size={24} />,
      label: "Shock",
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
      count: 32,
    },
  ];

  const handleReaction = (reactionType: ReactionType) => {
    if (userReaction === reactionType) {
      setUserReaction(null);
    } else {
      setUserReaction(reactionType);
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 1000);
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
      <div className="w-full max-w-lg">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
          {/* Content Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Exciting Tech Announcement!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Major breakthrough in quantum computing announced today. Read the
              full story below.
            </p>
          </div>

          {/* Animated Reaction Area */}
          <div className="relative">
            {/* Reaction Animation */}
            <AnimatePresence>
              {showAnimation && userReactionData && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div className={`text-6xl ${userReactionData.color}`}>
                    {userReactionData.icon}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Reaction Button */}
            <div className="flex items-center justify-between mb-8">
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setShowPicker(true)}
                  onMouseLeave={() =>
                    setTimeout(() => setShowPicker(false), 300)
                  }
                  onClick={() => {
                    if (!userReaction) handleReaction("like");
                    else setShowPicker(!showPicker);
                  }}
                  className={`px-6 py-3 rounded-full flex items-center gap-2 font-medium ${
                    userReaction
                      ? `${userReactionData?.bgColor} ${userReactionData?.color}`
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
                      <span>Add Reaction</span>
                    </>
                  )}
                  <Sparkles
                    size={16}
                    className={
                      userReaction ? userReactionData?.color : "text-gray-400"
                    }
                  />
                </motion.button>

                {/* Floating Reaction Picker */}
                <AnimatePresence>
                  {showPicker && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.8 }}
                      className="absolute bottom-14 left-0 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 border border-gray-200 dark:border-gray-700 z-10"
                      onMouseEnter={() => setShowPicker(true)}
                      onMouseLeave={() =>
                        setTimeout(() => setShowPicker(false), 300)
                      }
                    >
                      <div className="grid grid-cols-4 gap-2">
                        {reactions.map((reaction) => (
                          <motion.button
                            key={reaction.type}
                            whileHover={{ scale: 1.2, y: -5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleReaction(reaction.type)}
                            className={`p-3 rounded-xl flex flex-col items-center gap-1
                                ${reaction.bgColor} ${reaction.color}
                                ${
                                  userReaction === reaction.type
                                    ? `ring-2 ring-offset-2 ${reaction.color.replace(
                                        "text-",
                                        "ring-"
                                      )}`
                                    : ""
                                }`}
                          >
                            {reaction.icon}
                            <span className="text-xs font-medium">
                              {reaction.label}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Stats */}
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {totalReactions}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Reactions
                </div>
              </div>
            </div>

            {/* Reaction Progress Bars */}
            <div className="space-y-3 mb-8">
              <h4 className="font-bold text-gray-900 dark:text-white">
                Reaction Distribution
              </h4>
              {reactions.map((reaction) => (
                <div key={reaction.type} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded ${reaction.color}`}>
                        {reaction.icon}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {reaction.label}
                      </span>
                      {userReaction === reaction.type && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {reaction.count}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${reaction.bgColor}`}
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(reaction.count / totalReactions) * 100}%`,
                      }}
                      transition={{ duration: 1, delay: 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {reactions.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Reactions
                </div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {userReaction ? "Reacted" : "No Reaction"}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Your Status
                </div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {Math.round((totalReactions / 1000) * 100)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Engagement
                </div>
              </div>
            </div>

            {/* Status Message */}
            <AnimatePresence>
              {userReaction && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 p-4 bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 ${userReactionData?.bgColor} rounded-lg`}
                    >
                      {userReactionData?.icon}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        You reacted with {userReactionData?.label}!
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Your reaction has been recorded. Thank you for your
                        feedback!
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
