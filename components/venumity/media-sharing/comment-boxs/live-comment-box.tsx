"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Clock, Zap, TrendingUp, Flame } from "lucide-react";

interface LiveComment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  avatar: string;
  isLive: boolean;
  reactions: {
    fire: number;
    heart: number;
    star: number;
  };
}

export default function LiveCommentBox() {
  const [comments, setComments] = useState<LiveComment[]>([
    {
      id: "1",
      author: "Alex Turner",
      content: "This is amazing! The live updates are smooth.",
      timestamp: "Live now",
      avatar: "AT",
      isLive: true,
      reactions: { fire: 12, heart: 45, star: 8 },
    },
    {
      id: "2",
      author: "Maya Rodriguez",
      content: "Can we get more details about the implementation?",
      timestamp: "2 min ago",
      avatar: "MR",
      isLive: false,
      reactions: { fire: 5, heart: 23, star: 3 },
    },
    {
      id: "3",
      author: "Jordan Smith",
      content: "The real-time interaction is next level!",
      timestamp: "1 min ago",
      avatar: "JS",
      isLive: true,
      reactions: { fire: 18, heart: 67, star: 12 },
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [liveUsers, setLiveUsers] = useState(142);
  const [isLive, setIsLive] = useState(true);

  // Simulate live comments
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const users = ["Taylor", "Chris", "Emma", "David", "Sophia"];
      const messages = [
        "Great discussion!",
        "I agree with this point",
        "Can we expand on this?",
        "This is revolutionary!",
        "The UX is amazing",
        "More details please",
        "Love the real-time updates",
        "Very insightful",
      ];

      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];

      const newLiveComment: LiveComment = {
        id: Date.now().toString(),
        author: randomUser,
        content: randomMessage,
        timestamp: "Live now",
        avatar: randomUser.charAt(0),
        isLive: true,
        reactions: {
          fire: Math.floor(Math.random() * 20),
          heart: Math.floor(Math.random() * 50),
          star: Math.floor(Math.random() * 15),
        },
      };

      setComments((prev) => [newLiveComment, ...prev.slice(0, 9)]);
      setLiveUsers((prev) => prev + Math.floor(Math.random() * 3));
    }, 8000);

    return () => clearInterval(interval);
  }, [isLive]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: LiveComment = {
        id: Date.now().toString(),
        author: "You",
        content: newComment,
        timestamp: "Just now",
        avatar: "ME",
        isLive: true,
        reactions: { fire: 0, heart: 0, star: 0 },
      };
      setComments([comment, ...comments]);
      setNewComment("");
      setLiveUsers((prev) => prev + 1);
    }
  };

  const addReaction = (
    commentId: string,
    reaction: keyof LiveComment["reactions"]
  ) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              reactions: {
                ...comment.reactions,
                [reaction]: comment.reactions[reaction] + 1,
              },
            }
          : comment
      )
    );
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl">
        {/* Live Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-ping absolute"></div>
                  <div className="w-3 h-3 bg-red-500 rounded-full relative"></div>
                </div>
                <span className="font-bold text-red-600">LIVE</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Zap size={18} />
                <span className="font-semibold">{liveUsers} users online</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <TrendingUp size={18} />
                <span className="font-semibold">
                  {comments.length} comments
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsLive(!isLive)}
              className={`px-4 py-2 rounded-lg font-medium ${
                isLive
                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              }`}
            >
              {isLive ? "Stop Live" : "Go Live"}
            </button>
          </div>

          {/* Comment Input */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Join the live discussion..."
                className="w-full p-4 pr-12 bg-gray-50 dark:bg-gray-900 border-2 border-blue-200 dark:border-blue-900 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:text-white"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700"
              >
                <Send size={20} />
              </button>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Your comment will appear live
              </span>
              <Flame className="text-orange-500 animate-pulse" size={16} />
            </div>
          </form>
        </div>

        {/* Live Comments Feed */}
        <div className="space-y-4">
          <AnimatePresence>
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  {/* Avatar with live indicator */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {comment.avatar}
                    </div>
                    {comment.isLive && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 dark:text-white">
                          {comment.author}
                        </span>
                        {comment.isLive && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                            LIVE
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock size={12} />
                        {comment.timestamp}
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      {comment.content}
                    </p>

                    {/* Reactions */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => addReaction(comment.id, "fire")}
                        className="flex items-center gap-1 text-gray-600 hover:text-orange-500"
                      >
                        <Flame size={16} />
                        <span className="text-sm">
                          {comment.reactions.fire}
                        </span>
                      </button>
                      <button
                        onClick={() => addReaction(comment.id, "heart")}
                        className="flex items-center gap-1 text-gray-600 hover:text-red-500"
                      >
                        <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-xs">❤️</span>
                        </div>
                        <span className="text-sm">
                          {comment.reactions.heart}
                        </span>
                      </button>
                      <button
                        onClick={() => addReaction(comment.id, "star")}
                        className="flex items-center gap-1 text-gray-600 hover:text-yellow-500"
                      >
                        <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-xs">⭐</span>
                        </div>
                        <span className="text-sm">
                          {comment.reactions.star}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Live Stats */}
        <div className="mt-8 p-4 bg-linear-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {liveUsers}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Active Users
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {comments.filter((c) => c.isLive).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Live Comments
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {comments.reduce((acc, c) => acc + c.reactions.heart, 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Reactions
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.floor(liveUsers / 10)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                New per minute
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
