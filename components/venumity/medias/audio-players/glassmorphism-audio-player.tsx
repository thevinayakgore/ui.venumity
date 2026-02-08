"use client";
import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Music,
  Heart,
  MoreVertical,
} from "lucide-react";

export default function AudioPlayer_2_4() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(92);
  const [volume] = useState(75);
  const [isLiked, setIsLiked] = useState(false);
  const duration = 218; // 3:38 in seconds

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

  const songs = [
    {
      title: "Ocean Waves",
      artist: "Ambient Beats",
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Forest Echo",
      artist: "Nature Sounds",
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "Urban Pulse",
      artist: "City Vibes",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="relative">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-transparent to-blue-500/10 rounded-3xl blur-3xl" />

        {/* Main Container */}
        <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-cyan-500/10 dark:shadow-gray-900/50 border border-white/20 dark:border-gray-800/50 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-linear-to-br from-cyan-500/20 to-blue-500/20 rounded-xl backdrop-blur-sm">
                  <Music className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Ambient Player
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Relaxation & Focus
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-white/10 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Now Playing */}
              <div className="lg:col-span-2 space-y-8">
                <div className="relative">
                  {/* Wave Visualization */}
                  <div className="h-32 bg-linear-to-b from-white/10 to-transparent dark:from-gray-800/10 rounded-2xl p-6">
                    <div className="flex items-end justify-center space-x-1 h-full">
                      {Array.from({ length: 48 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 rounded-t transition-all duration-300 ${
                            isPlaying ? "animate-pulse" : ""
                          }`}
                          style={{
                            height: `${
                              20 +
                              Math.sin(i * 0.5) * 15 +
                              Math.sin(i * 0.2) * 8
                            }px`,
                            background: `linear-gradient(to top, ${
                              i % 3 === 0
                                ? "#06b6d4, #3b82f6"
                                : i % 3 === 1
                                ? "#0ea5e9, #1d4ed8"
                                : "#22d3ee, #2563eb"
                            })`,
                            animationDelay: `${i * 0.05}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Current Track */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
                            NOW PLAYING
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                          Ocean Waves
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Ambient Beats • 3:38
                        </p>
                      </div>
                      <button
                        onClick={() => setIsLiked(!isLiked)}
                        className="p-3 hover:bg-white/10 dark:hover:bg-gray-800/50 rounded-full transition-colors"
                      >
                        <Heart
                          className={`w-6 h-6 ${
                            isLiked
                              ? "fill-rose-500 text-rose-500"
                              : "text-gray-400"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Progress & Controls */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="h-1.5 bg-white/20 dark:bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                      <div
                        className="h-full bg-linear-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {formatTime(currentTime)}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {formatTime(duration)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Volume2 className="w-5 h-5 text-gray-400" />
                      <div className="w-32 h-1.5 bg-white/20 dark:bg-gray-800/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-gray-400 to-gray-600 dark:from-gray-300 dark:to-gray-500 rounded-full"
                          style={{ width: `${volume}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <button className="p-3 hover:bg-white/10 dark:hover:bg-gray-800/50 rounded-xl backdrop-blur-sm transition-colors">
                        <SkipBack className="w-6 h-6 text-gray-400" />
                      </button>

                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-16 h-16 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-2xl shadow-cyan-500/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 transform hover:scale-105"
                      >
                        {isPlaying ? (
                          <Pause className="w-8 h-8 text-white" />
                        ) : (
                          <Play className="w-8 h-8 text-white ml-1" />
                        )}
                      </button>

                      <button className="p-3 hover:bg-white/10 dark:hover:bg-gray-800/50 rounded-xl backdrop-blur-sm transition-colors">
                        <SkipForward className="w-6 h-6 text-gray-400" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Next Up
                      </div>
                      <div className="text-sm font-medium text-gray-800 dark:text-white">
                        Forest Echo
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Playlist */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-800 dark:text-white">
                  Playlist
                </h4>
                <div className="space-y-3">
                  {songs.map((song, index) => (
                    <div
                      key={index}
                      className="group relative p-4 rounded-xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm hover:bg-white/60 dark:hover:bg-gray-900/60 transition-all duration-300 cursor-pointer border border-white/20 dark:border-gray-800/50"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 rounded-lg bg-linear-to-br ${song.color} flex items-center justify-center`}
                        >
                          <Music className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-800 dark:text-white">
                            {song.title}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {song.artist}
                          </div>
                        </div>
                        {index === 0 && (
                          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                        )}
                      </div>

                      {index === 0 && (
                        <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-xl pointer-events-none" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Sound Details */}
                <div className="mt-6 p-4 rounded-xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm border border-white/20 dark:border-gray-800/50">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Frequency
                      </div>
                      <div className="font-medium text-gray-800 dark:text-white">
                        432 Hz
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Quality
                      </div>
                      <div className="font-medium text-gray-800 dark:text-white">
                        Lossless
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Binaural
                      </div>
                      <div className="font-medium text-gray-800 dark:text-white">
                        Enabled
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Duration
                      </div>
                      <div className="font-medium text-gray-800 dark:text-white">
                        11:24
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
