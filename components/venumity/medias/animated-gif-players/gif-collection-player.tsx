"use client";
import { Play, Pause, ChevronLeft, ChevronRight, Grid } from "lucide-react";
import { useState } from "react";

const gifs = [
  { id: 1, name: "Funny Cat", color: "from-orange-400 to-red-500" },
  { id: 2, name: "Dancing Dog", color: "from-blue-400 to-purple-500" },
  { id: 3, name: "Reaction", color: "from-green-400 to-teal-500" },
  { id: 4, name: "Celebration", color: "from-pink-400 to-rose-500" },
  { id: 5, name: "Work Mood", color: "from-yellow-400 to-orange-500" },
];

export default function AnimatedGifPlayer_1_4() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("carousel");

  const nextGif = () => {
    setCurrentIndex((prev) => (prev + 1) % gifs.length);
  };

  const prevGif = () => {
    setCurrentIndex((prev) => (prev - 1 + gifs.length) % gifs.length);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            GIF Collection Player
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg ${
                viewMode === "grid"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("carousel")}
              className={`p-2 rounded-lg ${
                viewMode === "carousel"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <ChevronRight className="w-5 h-5 -ml-2" />
            </button>
          </div>
        </div>

        {viewMode === "carousel" ? (
          <div className="space-y-8">
            {/* Main GIF Display */}
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
              <div className="aspect-video bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 relative">
                <div
                  className={`absolute inset-0 bg-linear-to-r ${
                    gifs[currentIndex].color
                  } ${isPlaying ? "animate-pulse" : ""}`}
                >
                  <div className="h-full flex flex-col items-center justify-center text-white">
                    <div className="text-6xl mb-4">🎬</div>
                    <div className="text-2xl font-bold mb-2">
                      {gifs[currentIndex].name}
                    </div>
                    <div className="text-lg opacity-90">
                      #{currentIndex + 1} of {gifs.length}
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                  <button
                    onClick={prevGif}
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" />
                    )}
                  </button>
                  <button
                    onClick={nextGif}
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-3">
              {gifs.map((gif, index) => (
                <button
                  key={gif.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative rounded-xl overflow-hidden aspect-square transition-all duration-300 ${
                    currentIndex === index
                      ? "ring-2 ring-blue-500 scale-105"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${gif.color}`}
                  >
                    {index === currentIndex && isPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-white animate-ping" />
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-medium truncate text-center">
                    {gif.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {gifs.map((gif) => (
              <div
                key={gif.id}
                className="group relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800"
              >
                <div
                  className={`aspect-square bg-linear-to-br ${gif.color} relative`}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white ml-1" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                    {gif.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    .gif • 2.4 MB
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
