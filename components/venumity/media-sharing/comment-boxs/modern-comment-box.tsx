"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
  User,
  Star,
} from "lucide-react";

interface Comment {
  id: string;
  author: string;
  role: string;
  content: string;
  likes: number;
  timestamp: string;
  isLiked: boolean;
  isStarred: boolean;
  avatarColor: string;
}

export default function ModernCommentBox() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Sarah Chen",
      role: "Design Lead",
      content:
        "The minimalist approach here is exactly what modern interfaces need. Clean and functional!",
      likes: 128,
      timestamp: "3 hours ago",
      isLiked: false,
      isStarred: true,
      avatarColor: "bg-pink-500",
    },
    {
      id: "2",
      author: "Marcus Lee",
      role: "Developer",
      content:
        "Could use more accessibility considerations in the color choices.",
      likes: 42,
      timestamp: "5 hours ago",
      isLiked: false,
      isStarred: false,
      avatarColor: "bg-blue-500",
    },
    {
      id: "3",
      author: "Priya Sharma",
      role: "Product Manager",
      content:
        "This aligns perfectly with our Q4 roadmap. Excellent execution!",
      likes: 89,
      timestamp: "1 day ago",
      isLiked: false,
      isStarred: true,
      avatarColor: "bg-purple-500",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleLike = (id: string) => {
    setComments(
      comments.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              isLiked: !comment.isLiked,
            }
          : comment
      )
    );
  };

  const handleStar = (id: string) => {
    setComments(
      comments.map((comment) =>
        comment.id === id
          ? { ...comment, isStarred: !comment.isStarred }
          : comment
      )
    );
  };

  const addComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: "You",
        role: "Commenter",
        content: newComment,
        likes: 0,
        timestamp: "Just now",
        isLiked: false,
        isStarred: false,
        avatarColor: "bg-gray-600",
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
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Community Discussion
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Join the conversation with {comments.length} comments
          </p>
        </div>

        {/* Comment Input */}
        <div className="mb-10">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <User size={28} className="text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white resize-none"
                  rows={3}
                />
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                  <button
                    onClick={addComment}
                    className="px-6 py-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl flex items-center gap-2 font-medium"
                  >
                    <Send size={18} />
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800"
            >
              {/* Comment Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 ${comment.avatarColor} rounded-full flex items-center justify-center text-white font-bold`}
                    >
                      {comment.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        {comment.author}
                      </h4>
                      <p className="text-sm text-gray-500">{comment.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleStar(comment.id)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <Star
                      size={20}
                      className={
                        comment.isStarred
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-400"
                      }
                    />
                  </button>
                </div>

                {/* Comment Content */}
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {comment.content}
                </p>

                {/* Comment Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                      comment.isLiked
                        ? "bg-red-50 dark:bg-red-900/20 text-red-600"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <Heart
                      size={18}
                      fill={comment.isLiked ? "currentColor" : "none"}
                    />
                    {comment.likes}
                  </button>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600">
                      <MessageCircle size={18} />
                      Reply
                    </button>
                    <span className="text-sm text-gray-500">
                      {comment.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.main>
  );
}
