"use client";
import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize2,
  X,
  Heart,
  Music,
} from "lucide-react";

export default function AudioPlayer_2_5() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(45);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const duration = 180; // 3 minutes in seconds
  const [miniTimings] = useState(() =>
    Array.from({ length: 16 }).map(() => 1 + Math.random() * 0.5)
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 rounded-3xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Floating Mini Player
        </h2>

        {/* Floating Player */}
        <div
          className={`fixed ${
            isExpanded ? "ins-4 md:ins-24" : "bottom-8 right-8"
          } transition-all duration-500 z-50 max-w-4xl mx-auto`}
        >
          <div
            className={`relative ${
              isExpanded ? "w-full" : "w-96"
            } transition-all duration-500`}
          >
            {/* Main Player */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl shadow-black/20 dark:shadow-black/50 border border-gray-200 dark:border-gray-800 overflow-hidden backdrop-blur-xl">
              {/* Header */}
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Music className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 dark:text-white">
                      Chill Vibes
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Radio Station
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isLiked
                          ? "fill-rose-500 text-rose-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  >
                    {isExpanded ? (
                      <X className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Maximize2 className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Content */}
              <div
                className={`${
                  isExpanded ? "p-8" : "p-6"
                } transition-all duration-300`}
              >
                {isExpanded ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Album Art */}
                    <div className="relative">
                      <div className="aspect-square rounded-2xl overflow-hidden bg-linear-to-br from-purple-900/20 to-pink-900/20">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative">
                            <div className="w-64 h-64 rounded-full bg-linear-to-r from-purple-600 to-pink-600 animate-spin-slow">
                              <div className="absolute inset-8 rounded-full bg-gray-900 flex items-center justify-center">
                                <div className="text-4xl">🎶</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Controls */}
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                          Midnight City
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          M83 • 4:04 • Electronic
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                            style={{
                              width: `${(currentTime / duration) * 100}%`,
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                          <span>{formatTime(currentTime)}</span>
                          <span>{formatTime(duration)}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-center space-x-8">
                        <button className="p-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                          <SkipBack className="w-6 h-6 text-gray-400" />
                        </button>

                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="w-16 h-16 rounded-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105"
                        >
                          {isPlaying ? (
                            <Pause className="w-8 h-8 text-white" />
                          ) : (
                            <Play className="w-8 h-8 text-white ml-1" />
                          )}
                        </button>

                        <button className="p-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                          <SkipForward className="w-6 h-6 text-gray-400" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Volume2 className="w-5 h-5 text-gray-400" />
                          <div className="w-32 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className="w-3/4 h-full bg-linear-to-r from-gray-400 to-gray-600 dark:from-gray-300 dark:to-gray-500 rounded-full" />
                          </div>
                        </div>

                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Up next:{" "}
                          <span className="font-medium text-gray-800 dark:text-white">
                            Sunset Dreams
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Mini Controls */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-800 dark:text-white">
                          Midnight City
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          M83 • {formatTime(currentTime)}
                        </div>
                      </div>

                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-12 h-12 rounded-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-md flex items-center justify-center transition-all duration-300"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6 text-white" />
                        ) : (
                          <Play className="w-6 h-6 text-white ml-1" />
                        )}
                      </button>
                    </div>

                    {/* Mini Progress */}
                    <div className="space-y-2">
                      <div className="h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                          style={{
                            width: `${(currentTime / duration) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center justify-center space-x-6">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                        <SkipBack className="w-5 h-5 text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                        <SkipForward className="w-5 h-5 text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                        <Volume2 className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Visualizer for Mini Mode */}
              {!isExpanded && isPlaying && (
                <div className="px-6 pb-6">
                  <div className="flex items-end justify-center space-x-1 h-8">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 bg-linear-to-t from-purple-500/50 to-pink-500/50 rounded-t"
                        style={{
                          height: `${8 + Math.sin(i * 0.8) * 6}px`,
                          animation: `mini-wave ${miniTimings[i]}s infinite ${
                            i * 0.1
                          }s alternate`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Drag Handle (Visual Only) */}
            {!isExpanded && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
              </div>
            )}
          </div>
        </div>

        {/* Demo Content */}
        <div className="mt-96 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              Interactive Demo
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              The player floats above content. Try expanding it or playing with
              the controls.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white rounded-full font-medium transition-all"
              >
                {isExpanded ? "Minimize Player" : "Expand Player"}
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-full font-medium transition-all"
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
@keyframes mini-wave {
  0% { height: 40%; }
  100% { height: 100%; }
}
`}</style>
    </div>
  );
}
