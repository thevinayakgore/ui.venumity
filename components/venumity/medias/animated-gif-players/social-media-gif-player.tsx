"use client";
import {
  Play,
  Pause,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
} from "lucide-react";
import { useState } from "react";

export default function AnimatedGifPlayer_1_3() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [comment, setComment] = useState("");

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Social Media GIF Player
        </h2>

        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-r from-orange-400 to-pink-500" />
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white">
                  Creative Memes
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  2 hours ago
                </p>
              </div>
            </div>
            <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              ···
            </button>
          </div>

          {/* GIF Container */}
          <div className="relative rounded-xl overflow-hidden mb-6">
            <div className="aspect-9/16 bg-linear-to-b from-gray-900 to-black relative">
              {/* Simulated GIF */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full relative">
                  {/* Animated frames */}
                  {isPlaying && (
                    <>
                      <div className="absolute inset-0 bg-linear-to-tr from-red-500/20 to-yellow-500/20 animate-pulse" />
                      <div className="absolute top-4 left-4 text-white font-bold text-lg">
                        😂
                      </div>
                      <div className="absolute bottom-4 right-4 text-white font-bold text-lg">
                        💀
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-3xl font-bold">
                          MEME OF THE DAY
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Play/Pause Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all duration-300 flex items-center justify-center"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white ml-1" />
                )}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isLiked ? "fill-red-500 text-red-500" : "text-gray-500"
                  }`}
                />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  2.4K
                </span>
              </button>
              <button className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <MessageCircle className="w-6 h-6 text-gray-500" />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  148
                </span>
              </button>
              <button className="hover:opacity-80 transition-opacity">
                <Send className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="hover:opacity-80 transition-opacity"
            >
              <Bookmark
                className={`w-6 h-6 ${
                  isSaved ? "fill-blue-500 text-blue-500" : "text-gray-500"
                }`}
              />
            </button>
          </div>

          {/* Comments */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-linear-to-r from-blue-400 to-teal-400" />
              <div className="flex-1">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-bold">Alex Johnson</span> This is
                  hilarious! 😂
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  1 hour ago
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-linear-to-r from-purple-400 to-pink-400" />
              <div className="flex-1">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-bold">Sam Rivera</span> Perfect reaction
                  GIF! 🙌
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  45 min ago
                </p>
              </div>
            </div>
          </div>

          {/* Comment Input */}
          <div className="mt-6 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700" />
            <div className="flex-1 relative">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
