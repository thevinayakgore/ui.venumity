"use client";
import { Play, Pause, Maximize2, Download, Share2 } from "lucide-react";
import { useState } from "react";

export default function AnimatedGifPlayer_1_2() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Compact GIF Player
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* GIF Preview */}
          <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 group">
            <div className="aspect-square bg-linear-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`w-48 h-48 rounded-xl ${
                    isPlaying ? "animate-pulse" : ""
                  } bg-linear-to-r from-blue-400 to-purple-500`}
                >
                  {isPlaying ? (
                    <div className="h-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        🎉 GIF Playing
                      </span>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Overlay Controls */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 transform scale-0 group-hover:scale-100 flex items-center justify-center shadow-lg"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-gray-800" />
                ) : (
                  <Play className="w-8 h-8 text-gray-800 ml-1" />
                )}
              </button>
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Holiday Celebration
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Animated celebration GIF perfect for holiday greetings and
                festive moments.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-linear-to-r from-blue-400 to-purple-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Shared by 3 friends
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-sm font-medium ${
                      isLiked
                        ? "text-pink-600"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    2.5K
                  </span>
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <svg
                      className={`w-5 h-5 ${
                        isLiked
                          ? "fill-pink-500 text-pink-500"
                          : "text-gray-400"
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Maximize2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Expand</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium">Download</span>
                </button>
              </div>

              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-linear-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white rounded-lg transition-all">
                <Share2 className="w-4 h-4" />
                <span className="font-medium">Share GIF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
