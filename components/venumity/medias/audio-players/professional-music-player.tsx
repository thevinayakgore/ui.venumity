"use client";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  Share2,
  ListMusic,
  Shuffle,
  Repeat,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function AudioPlayer_2_1() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume] = useState(80);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"none" | "one" | "all">("none");
  const progressRef = useRef<HTMLDivElement>(null);

  const duration = 180; // 3 minutes in seconds

  const [eqTimings] = useState(() =>
    Array.from({ length: 24 }).map(() => 1 + Math.random() * 0.5)
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

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    setCurrentTime(percent * duration);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-linear-to-br from-gray-900 to-black rounded-3xl shadow-2xl shadow-black/50 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Album Art */}
          <div className="lg:col-span-1">
            <div className="relative group">
              <div className="aspect-square rounded-2xl overflow-hidden bg-linear-to-br from-purple-900/30 to-pink-900/30 border border-white/10 shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-48 h-48 rounded-full bg-linear-to-r from-purple-600 to-pink-600 animate-spin-slow">
                      <div className="absolute inset-4 rounded-full bg-gray-900 flex items-center justify-center">
                        <div className="text-4xl text-white">🎵</div>
                      </div>
                    </div>
                    <div className="absolute -inset-4 bg-linear-to-r from-purple-600/20 to-pink-600/20 blur-2xl rounded-full" />
                  </div>
                </div>
              </div>

              {/* Animated Waves */}
              {isPlaying && (
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-center space-x-1 h-16">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div
                      key={i}
                      className="w-2 bg-linear-to-t from-purple-400 to-pink-400 rounded-full animate-wave"
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        height: `${20 + Math.sin(i) * 15}px`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Player Controls */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* Track Info */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-sm font-medium text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full">
                      Now Playing
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isLiked
                            ? "fill-pink-500 text-pink-500"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                      <Share2 className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-white mb-2">
                  Midnight Dreams
                </h1>
                <p className="text-gray-400">Electronic Vibes • 3:00 • 2024</p>

                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-gray-900 bg-linear-to-r from-purple-400 to-pink-400"
                      />
                    ))}
                  </div>
                  <span className="text-gray-400">
                    Produced by SoundCraft Studio
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div
                  ref={progressRef}
                  onClick={handleProgressClick}
                  className="h-2 bg-white/10 rounded-full overflow-hidden cursor-pointer group"
                >
                  <div
                    className="h-full bg-linear-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300 relative"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  >
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Main Controls */}
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-8">
                  <button
                    onClick={() => setIsShuffle(!isShuffle)}
                    className={`p-3 rounded-full transition-all ${
                      isShuffle
                        ? "text-purple-400 bg-purple-400/10"
                        : "text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Shuffle className="w-5 h-5" />
                  </button>

                  <button className="p-3 hover:bg-white/10 rounded-full transition-colors">
                    <SkipBack className="w-6 h-6 text-gray-400" />
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-4 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-600/30"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" />
                    )}
                  </button>

                  <button className="p-3 hover:bg-white/10 rounded-full transition-colors">
                    <SkipForward className="w-6 h-6 text-gray-400" />
                  </button>

                  <button
                    onClick={() =>
                      setRepeatMode(
                        repeatMode === "none"
                          ? "all"
                          : repeatMode === "all"
                          ? "one"
                          : "none"
                      )
                    }
                    className={`p-3 rounded-full transition-all ${
                      repeatMode !== "none"
                        ? "text-purple-400 bg-purple-400/10"
                        : "text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Repeat className="w-5 h-5" />
                    {repeatMode === "one" && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-purple-400" />
                    )}
                  </button>
                </div>

                {/* Volume & Extra Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Volume2 className="w-5 h-5 text-gray-400" />
                    <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-gray-400 to-white rounded-full"
                        style={{ width: `${volume}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-400 w-8">{volume}%</span>
                  </div>

                  <button className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                    <ListMusic className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-400">Playlist (12)</span>
                  </button>
                </div>
              </div>

              {/* Equalizer Visualization */}
              {isPlaying && (
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-end justify-center space-x-1 h-12">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 bg-linear-to-t from-purple-500/50 to-pink-500/50 rounded-t"
                        style={{
                          height: `${20 + Math.sin(i * 0.8) * 15}px`,
                          animation: `equalizer ${eqTimings[i]}s infinite ${
                            i * 0.05
                          }s alternate`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes wave {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(1.5); }
}

@keyframes equalizer {
  0% { height: 20%; }
  100% { height: 100%; }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.animate-wave {
  animation: wave 1.5s ease-in-out infinite;
}
`}
      </style>
    </div>
  );
}
