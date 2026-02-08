"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Heart, MessageCircle, MoreVertical, User } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  content: string;
  likes: number;
  replies: Comment[];
  isLiked: boolean;
  avatar: string;
}

export default function InteractiveCommentBox() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Taylor Swift",
      content: "Great content! Really enjoyed reading this.",
      likes: 42,
      replies: [],
      isLiked: false,
      avatar: "TS",
    },
    {
      id: "2",
      author: "John Doe",
      content: "Could you elaborate more on the second point?",
      likes: 15,
      replies: [
        {
          id: "2.1",
          author: "Author",
          content: "Sure! I'll update the article with more details.",
          likes: 8,
          replies: [],
          isLiked: false,
          avatar: "AU",
        },
      ],
      isLiked: false,
      avatar: "JD",
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const toggleLike = (commentId: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked,
          };
        }
        return comment;
      })
    );
  };

  const handleReply = (commentId: string) => {
    if (replyingTo === commentId) {
      if (replyContent.trim()) {
        setComments(
          comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: [
                  ...comment.replies,
                  {
                    id: `${commentId}.${comment.replies.length + 1}`,
                    author: "You",
                    content: replyContent,
                    likes: 0,
                    replies: [],
                    isLiked: false,
                    avatar: "ME",
                  },
                ],
              };
            }
            return comment;
          })
        );
        setReplyContent("");
      }
      setReplyingTo(null);
    } else {
      setReplyingTo(commentId);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-2xl">
        {/* Main Comment Input */}
        <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <div className="flex gap-3">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <User className="text-blue-600 dark:text-blue-300" size={24} />
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="What are your thoughts?"
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white resize-none"
                rows={2}
              />
              <div className="flex justify-between items-center mt-3">
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                    <MoreVertical size={18} />
                  </button>
                </div>
                <button
                  onClick={() => {
                    if (newComment.trim()) {
                      const comment: Comment = {
                        id: Date.now().toString(),
                        author: "You",
                        content: newComment,
                        likes: 0,
                        replies: [],
                        isLiked: false,
                        avatar: "ME",
                      };
                      setComments([comment, ...comments]);
                      setNewComment("");
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
                >
                  <Send size={16} />
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id}>
              {/* Main Comment */}
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      {comment.avatar}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {comment.author}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <button
                        onClick={() => toggleLike(comment.id)}
                        className={`flex items-center gap-1 ${
                          comment.isLiked ? "text-red-500" : "text-gray-500"
                        }`}
                      >
                        <Heart
                          size={18}
                          fill={comment.isLiked ? "currentColor" : "none"}
                        />
                        {comment.likes}
                      </button>
                      <button
                        onClick={() => handleReply(comment.id)}
                        className="flex items-center gap-1 text-gray-500 hover:text-blue-600"
                      >
                        <MessageCircle size={18} />
                        Reply
                      </button>
                    </div>
                  </div>
                </div>

                {/* Reply Input */}
                {replyingTo === comment.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 ml-12"
                  >
                    <div className="flex gap-2">
                      <input
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write a reply..."
                        className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white"
                      />
                      <button
                        onClick={() => handleReply(comment.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                      >
                        Send
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="mt-4 ml-12 space-y-4">
                    {comment.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex gap-2">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-300">
                              {reply.avatar}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900 dark:text-white">
                                {reply.author}
                              </span>
                              <button
                                onClick={() => toggleLike(reply.id)}
                                className={`text-xs ${
                                  reply.isLiked
                                    ? "text-red-500"
                                    : "text-gray-500"
                                }`}
                              >
                                <Heart
                                  size={12}
                                  fill={reply.isLiked ? "currentColor" : "none"}
                                />
                                {reply.likes}
                              </button>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                              {reply.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.main>
  );
}
