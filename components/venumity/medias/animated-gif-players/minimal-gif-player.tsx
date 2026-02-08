"use client";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { useState, useEffect } from "react";

export default function AnimatedGifPlayer_1_5() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(1);
  const frames = 8;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentFrame((prev) => (prev === frames ? 1 : prev + 1));
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying, frames]);

  const nextFrame = () => {
    setCurrentFrame((prev) => (prev === frames ? 1 : prev + 1));
  };

  const prevFrame = () => {
    setCurrentFrame((prev) => (prev === 1 ? frames : prev - 1));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Minimal GIF Player
        </h2>

        <div className="max-w-md mx-auto space-y-8">
          {/* GIF Display */}
          <div className="relative rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-lg">
            <div className="aspect-square bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
              {/* Animated Grid Background */}
              <div className="absolute inset-0 opacity-5">
                <div className="h-full grid grid-cols-4 grid-rows-4 gap-px">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="bg-gray-400 dark:bg-gray-600" />
                  ))}
                </div>
              </div>

              {/* GIF Frame */}
              <div className="absolute inset-4 rounded-lg overflow-hidden">
                <div className="h-full bg-linear-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🎨</div>
                    <div className="text-white font-bold text-lg">
                      Frame {currentFrame}
                    </div>
                    <div className="text-white/80 text-sm mt-2">/{frames}</div>
                  </div>
                </div>
              </div>

              {/* Frame Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                  {Array.from({ length: frames }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        currentFrame === i + 1 ? "bg-white w-4" : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Minimal Controls */}
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-8">
              <button
                onClick={prevFrame}
                className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <SkipBack className="w-6 h-6" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-4 bg-linear-to-r from-emerald-500 to-cyan-500 hover:opacity-90 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" />
                )}
              </button>

              <button
                onClick={nextFrame}
                className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <SkipForward className="w-6 h-6" />
              </button>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-emerald-400 to-cyan-500 rounded-full transition-all duration-300"
                  style={{ width: `${(currentFrame / frames) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>00:00</span>
                <span>00:08</span>
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Size
                </div>
                <div className="font-medium text-gray-800 dark:text-white">
                  2.1 MB
                </div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Frames
                </div>
                <div className="font-medium text-gray-800 dark:text-white">
                  {frames}
                </div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Duration
                </div>
                <div className="font-medium text-gray-800 dark:text-white">
                  0.8s
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
