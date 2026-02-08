"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Clock } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  avatar: string;
}

export default function BasicCommentBox() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Alex Johnson",
      content: "This is really insightful! Thanks for sharing.",
      timestamp: "2 hours ago",
      avatar: "AJ",
    },
    {
      id: "2",
      author: "Sam Wilson",
      content: "I have a different perspective on this topic.",
      timestamp: "1 day ago",
      avatar: "SW",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: "You",
        content: newComment,
        timestamp: "Just now",
        avatar: "ME",
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-2xl">
        {/* Comment Input */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-4 pr-12 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-900 dark:text-white resize-none"
              rows={3}
            />
            <button
              type="submit"
              className="absolute right-3 bottom-3 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {comment.avatar}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-gray-500" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {comment.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock size={12} />
                      {comment.timestamp}
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.main>
  );
}
