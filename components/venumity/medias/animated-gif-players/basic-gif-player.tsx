"use client";
import { useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function AnimatedGifPlayer_1_1() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 50);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl shadow-gray-200/50 dark:shadow-gray-900/50 p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Basic GIF Player
        </h2>

        <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
          {/* GIF Display */}
          <div className="aspect-video bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {isPlaying ? (
                <div className="relative">
                  <div className="w-64 h-36 bg-linear-to-r from-orange-500 to-pink-500 rounded-lg animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      🎬 GIF Playing
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-linear-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-full flex items-center justify-center">
                    <Play className="w-16 h-16 text-gray-600 dark:text-gray-300" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">
                    Click Play to start
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center group"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  ) : (
                    <Play className="w-6 h-6 text-white group-hover:scale-110 transition-transform ml-1" />
                  )}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-white text-sm font-medium">
                  funny-cat.gif
                </span>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-orange-500 to-pink-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-white/80 text-xs">0:00</span>
                <span className="text-white/80 text-xs">0:10</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          {["cat-meme", "funny-dog", "reaction"].map((tag) => (
            <div
              key={tag}
              className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                #{tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
