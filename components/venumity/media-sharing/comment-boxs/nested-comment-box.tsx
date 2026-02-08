"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  MessageSquare,
  User,
  Send,
} from "lucide-react";

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  avatar: string;
  replies: Comment[];
  isExpanded: boolean;
}

export default function NestedCommentsBox() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Emma Watson",
      content: "This discussion is absolutely brilliant!",
      timestamp: "5 hours ago",
      avatar: "EW",
      replies: [
        {
          id: "1.1",
          author: "Daniel Radcliffe",
          content: "I completely agree with you, Emma!",
          timestamp: "4 hours ago",
          avatar: "DR",
          replies: [
            {
              id: "1.1.1",
              author: "Rupert Grint",
              content: "Me too! Great insights here.",
              timestamp: "3 hours ago",
              avatar: "RG",
              replies: [],
              isExpanded: true,
            },
          ],
          isExpanded: true,
        },
      ],
      isExpanded: true,
    },
    {
      id: "2",
      author: "Chris Evans",
      content: "Has anyone considered the alternative perspective?",
      timestamp: "1 day ago",
      avatar: "CE",
      replies: [],
      isExpanded: true,
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const toggleReply = (commentId: string) => {
    const toggleRecursive = (comments: Comment[]): Comment[] => {
      return comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, isExpanded: !comment.isExpanded };
        }
        if (comment.replies.length > 0) {
          return {
            ...comment,
            replies: toggleRecursive(comment.replies),
          };
        }
        return comment;
      });
    };
    setComments(toggleRecursive(comments));
  };

  const addReply = (
    parentId: string,
    content: string,
    replies: Comment[]
  ): Comment[] => {
    return replies.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: `${parentId}.${comment.replies.length + 1}`,
              author: "You",
              content,
              timestamp: "Just now",
              avatar: "ME",
              replies: [],
              isExpanded: true,
            },
          ],
        };
      }
      return {
        ...comment,
        replies: addReply(parentId, content, comment.replies),
      };
    });
  };

  const handleSubmitReply = (parentId: string, content: string) => {
    if (content.trim()) {
      setComments(addReply(parentId, content, comments));
    }
  };

  const renderComments = (comments: Comment[], depth = 0) => {
    return comments.map((comment) => (
      <div key={comment.id} className={depth > 0 ? "mt-4" : ""}>
        <div
          className={`p-4 rounded-xl ${
            depth === 0
              ? "border border-gray-200 dark:border-gray-800"
              : "bg-gray-50 dark:bg-gray-900"
          }`}
          style={{ marginLeft: depth * 24 }}
        >
          <div className="flex gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                depth === 0
                  ? "bg-blue-100 dark:bg-blue-900"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              <span
                className={`font-bold ${
                  depth === 0
                    ? "text-blue-600 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {comment.avatar}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <User size={14} />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {comment.author}
                  </span>
                  <span className="text-sm text-gray-500">
                    {comment.timestamp}
                  </span>
                </div>
                {comment.replies.length > 0 && (
                  <button
                    onClick={() => toggleReply(comment.id)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  >
                    {comment.isExpanded ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                )}
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {comment.content}
              </p>
              <div className="mt-3 flex items-center gap-4">
                <button
                  onClick={() => {
                    const reply = prompt("Write your reply:");
                    if (reply) handleSubmitReply(comment.id, reply);
                  }}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                >
                  <MessageSquare size={14} />
                  Reply
                </button>
                <span className="text-sm text-gray-500">
                  {comment.replies.length}{" "}
                  {comment.replies.length === 1 ? "reply" : "replies"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {comment.isExpanded && comment.replies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {renderComments(comment.replies, depth + 1)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ));
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-3xl">
        {/* New Comment Input */}
        <div className="mb-8">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <User size={24} className="text-gray-600 dark:text-gray-400" />
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Start a new discussion..."
                className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-900 dark:text-white resize-none"
                rows={3}
              />
              <div className="flex justify-end mt-3">
                <button
                  onClick={() => {
                    if (newComment.trim()) {
                      const comment: Comment = {
                        id: Date.now().toString(),
                        author: "You",
                        content: newComment,
                        timestamp: "Just now",
                        avatar: "ME",
                        replies: [],
                        isExpanded: true,
                      };
                      setComments([comment, ...comments]);
                      setNewComment("");
                    }
                  }}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
                >
                  <Send size={16} />
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Tree */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Discussion ({comments.length})
          </h3>
          {renderComments(comments)}
        </div>
      </div>
    </motion.main>
  );
}
