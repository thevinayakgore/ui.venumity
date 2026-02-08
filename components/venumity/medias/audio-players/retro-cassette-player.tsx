"use client";
import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Volume2,
} from "lucide-react";

export default function AudioPlayer_2_3() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [tapePosition, setTapePosition] = useState(0);
  const [isRewinding, setIsRewinding] = useState(false);
  const duration = 240; // 4 minutes in seconds

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && !isRewinding) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          const newTime = prev + 1;
          setTapePosition((newTime / duration) * 100);
          return newTime;
        });
      }, 1000);
    } else if (isRewinding) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev <= 0) {
            setIsRewinding(false);
            return 0;
          }
          const newTime = prev - 2;
          setTapePosition((newTime / duration) * 100);
          return newTime;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying, isRewinding, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-linear-to-br from-amber-900/20 to-rose-900/20 dark:from-amber-950/30 dark:to-rose-950/30 rounded-3xl shadow-2xl p-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-amber-900 dark:text-amber-200 font-serif">
            Retro Cassette Player
          </h2>

          <div className="relative">
            {/* Cassette Body */}
            <div className="bg-linear-to-b from-amber-800 to-amber-900 dark:from-amber-900 dark:to-amber-950 rounded-3xl p-8 shadow-inner border-4 border-amber-700 dark:border-amber-800">
              {/* Cassette Window */}
              <div className="bg-gray-900 rounded-xl p-6 mb-8 border-2 border-amber-600">
                <div className="bg-linear-to-b from-gray-800 to-black rounded-lg p-6">
                  {/* Reels */}
                  <div className="flex items-center justify-center space-x-16 mb-6">
                    {/* Left Reel */}
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full border-4 border-amber-600 bg-linear-to-b from-gray-900 to-black">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full border-2 border-amber-500/50 bg-linear-to-b from-gray-800 to-black">
                            <div
                              className={`absolute inset-0 rounded-full border-2 border-amber-400/30 ${
                                isPlaying ? "animate-spin" : ""
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-amber-400">
                        SUPPLY
                      </div>
                    </div>

                    {/* Tape Path */}
                    <div className="relative">
                      <div className="w-48 h-1 bg-amber-900/50">
                        <div
                          className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-linear-to-r from-amber-500 to-amber-600 rounded-full"
                          style={{ left: `${tapePosition}%` }}
                        />
                      </div>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-4 border-t-2 border-amber-700" />
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-4 border-b-2 border-amber-700" />
                    </div>

                    {/* Right Reel */}
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full border-4 border-amber-600 bg-linear-to-b from-gray-900 to-black">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full border-2 border-amber-500/50 bg-linear-to-b from-gray-800 to-black">
                            <div
                              className={`absolute inset-0 rounded-full border-2 border-amber-400/30 ${
                                isPlaying ? "animate-spin-reverse" : ""
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-amber-400">
                        TAKE-UP
                      </div>
                    </div>
                  </div>

                  {/* Track Info */}
                  <div className="text-center">
                    <div className="font-mono text-amber-300 text-lg mb-1">
                      SIDE A
                    </div>
                    <div className="font-bold text-white text-xl mb-1">
                      RETRO WAVES
                    </div>
                    <div className="text-amber-400 text-sm">
                      01 - SYNTH DREAMS
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-6">
                {/* Progress & Time */}
                <div className="space-y-2">
                  <div className="h-2 bg-amber-900/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-300"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between font-mono text-amber-300 text-sm">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-center space-x-8">
                  <button
                    onMouseDown={() => setIsRewinding(true)}
                    onMouseUp={() => setIsRewinding(false)}
                    onMouseLeave={() => setIsRewinding(false)}
                    className={`p-4 rounded-full ${
                      isRewinding
                        ? "bg-linear-to-b from-amber-700 to-amber-800 shadow-inner"
                        : "bg-linear-to-b from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600"
                    } transition-all duration-200 shadow-lg border border-amber-500/30`}
                  >
                    <RotateCcw className="w-6 h-6 text-white" />
                  </button>

                  <button className="p-4 rounded-full bg-linear-to-b from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 transition-all duration-200 shadow-lg border border-amber-500/30">
                    <SkipBack className="w-6 h-6 text-white" />
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-20 h-20 rounded-full bg-linear-to-b from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 transition-all duration-200 shadow-2xl border-2 border-amber-400/50 flex items-center justify-center"
                  >
                    {isPlaying ? (
                      <Pause className="w-10 h-10 text-white" />
                    ) : (
                      <Play className="w-10 h-10 text-white ml-1" />
                    )}
                  </button>

                  <button className="p-4 rounded-full bg-linear-to-b from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 transition-all duration-200 shadow-lg border border-amber-500/30">
                    <SkipForward className="w-6 h-6 text-white" />
                  </button>

                  <div className="relative">
                    <div className="p-4 rounded-full bg-linear-to-b from-amber-600 to-amber-700 shadow-lg border border-amber-500/30">
                      <Volume2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-linear-to-b from-amber-500 to-amber-400 rounded-full" />
                  </div>
                </div>

                {/* Cassette Details */}
                <div className="flex justify-between items-center pt-4 border-t border-amber-700/50">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-amber-300 text-sm font-mono">
                      REC
                    </span>
                  </div>
                  <div className="text-amber-400/70 text-sm font-mono">
                    TDK SA-90
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-amber-300 text-sm font-mono">
                      DOLBY B
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cassette Label */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-linear-to-r from-amber-600 to-amber-500 px-6 py-1 rounded-full shadow-lg">
              <span className="text-amber-100 text-sm font-bold">
                AUTO-REVERSE
              </span>
            </div>
          </div>
        </div>
      </div>
      <style>{`
@keyframes spin-reverse {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

.animate-spin-reverse {
  animation: spin-reverse 3s linear infinite;
}
`}</style>
    </div>
  );
}
