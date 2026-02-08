"use client";
import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function VideoPlayer_9_2() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(45);
  const [isMinimized, setIsMinimized] = useState(false);
  const [volume, setVolume] = useState(70);
  const duration = 180;

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
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Mini Video Player
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Compact player that can minimize to corner
          </p>
        </div>

        {/* Floating Player */}
        <div
          className={`relative ${
            isMinimized ? "fixed bottom-6 right-6 z-50 w-80" : "w-full"
          }`}
        >
          <div
            className={`${
              isMinimized ? "rounded-xl" : "rounded-2xl"
            } overflow-hidden bg-linear-to-br from-blue-500 to-cyan-400 shadow-2xl`}
          >
            {/* Player Header */}
            {!isMinimized && (
              <div className="p-4 flex items-center justify-between bg-white/10 backdrop-blur-sm">
                <div className="text-white font-medium">
                  Playing: Mountain Adventure
                </div>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            )}

            {/* Video Area */}
            <div className={`${isMinimized ? "aspect-video" : "aspect-video"}`}>
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div
                    className={`${isMinimized ? "text-4xl" : "text-6xl"} mb-4`}
                  >
                    🎬
                  </div>
                  {!isPlaying && (
                    <button
                      onClick={() => setIsPlaying(true)}
                      className={`${
                        isMinimized ? "w-10 h-10" : "w-16 h-16"
                      } rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors flex items-center justify-center`}
                    >
                      <Play
                        className={`${
                          isMinimized ? "w-5 h-5" : "w-8 h-8"
                        } text-white ml-0.5`}
                      />
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              {!isMinimized && (
                <div className="absolute bottom-16 left-4 right-4">
                  <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-white/80 text-xs mt-2">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              )}

              {/* Controls */}
              <div
                className={`absolute ${
                  isMinimized ? "inset-0" : "bottom-4 left-4 right-4"
                } flex items-center ${
                  isMinimized ? "justify-center" : "justify-between"
                }`}
              >
                {isMinimized ? (
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors flex items-center justify-center"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white ml-1" />
                    )}
                  </button>
                ) : (
                  <>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors flex items-center justify-center"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5 text-white" />
                        ) : (
                          <Play className="w-5 h-5 text-white ml-0.5" />
                        )}
                      </button>
                      <div className="flex items-center space-x-2">
                        <Volume2 className="w-4 h-4 text-white" />
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volume}
                          onChange={(e) => setVolume(parseInt(e.target.value))}
                          className="w-20 accent-white"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                        <ChevronLeft className="w-5 h-5 text-white" />
                      </button>
                      <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                        <ChevronRight className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={() => setIsMinimized(true)}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                      >
                        <Maximize2 className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Minimized Info */}
            {isMinimized && (
              <div className="p-3 bg-white/10 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="text-white text-sm truncate">
                    Mountain Adventure
                  </div>
                  <button
                    onClick={() => setIsMinimized(false)}
                    className="p-1 hover:bg-white/20 rounded"
                  >
                    <Maximize2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Demo Content */}
        {!isMinimized && (
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              Video Information
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="text-lg font-bold text-gray-800 dark:text-white">
                  {formatTime(currentTime)}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Current Time
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="text-lg font-bold text-gray-800 dark:text-white">
                  {volume}%
                </div>
                <div className="text-gray-600 dark:text-gray-400">Volume</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="text-lg font-bold text-gray-800 dark:text-white">
                  {isPlaying ? "Playing" : "Paused"}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Status</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
