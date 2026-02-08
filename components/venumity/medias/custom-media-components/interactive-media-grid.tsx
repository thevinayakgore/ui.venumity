"use client";
import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Download,
  Grid3x3,
  List,
} from "lucide-react";

const mediaItems = [
  {
    id: 1,
    type: "video",
    title: "Mountain Adventure",
    duration: "2:45",
    views: "24K",
    color: "from-blue-500 to-cyan-400",
    thumbnail: "🏔️",
  },
  {
    id: 2,
    type: "audio",
    title: "Ambient Sounds",
    duration: "18:32",
    plays: "12K",
    color: "from-purple-500 to-pink-400",
    thumbnail: "🎵",
  },
  {
    id: 3,
    type: "gif",
    title: "Funny Cat",
    duration: "0:06",
    loops: "8.4K",
    color: "from-amber-500 to-orange-400",
    thumbnail: "🐱",
  },
  {
    id: 4,
    type: "video",
    title: "City Time-lapse",
    duration: "1:15",
    views: "18K",
    color: "from-emerald-500 to-teal-400",
    thumbnail: "🌆",
  },
  {
    id: 5,
    type: "audio",
    title: "Podcast: Tech Talk",
    duration: "45:20",
    plays: "6.3K",
    color: "from-violet-500 to-indigo-400",
    thumbnail: "🎙️",
  },
  {
    id: 6,
    type: "gif",
    title: "Reaction GIF",
    duration: "0:08",
    loops: "15K",
    color: "from-rose-500 to-red-400",
    thumbnail: "😂",
  },
  {
    id: 7,
    type: "video",
    title: "Ocean Waves",
    duration: "3:20",
    views: "32K",
    color: "from-cyan-500 to-blue-400",
    thumbnail: "🌊",
  },
  {
    id: 8,
    type: "audio",
    title: "Focus Music",
    duration: "25:10",
    plays: "9.7K",
    color: "from-green-500 to-emerald-400",
    thumbnail: "🎧",
  },
  {
    id: 9,
    type: "gif",
    title: "Loading Animation",
    duration: "0:05",
    loops: "11K",
    color: "from-orange-500 to-amber-400",
    thumbnail: "⏳",
  },
];

export default function CustomMediaComponent_4_1() {
  const [activeMedia, setActiveMedia] = useState<number | null>(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [currentTime, setCurrentTime] = useState(45);
  const duration = 165; // 2:45 in seconds

  const activeItem =
    mediaItems.find((item) => item.id === activeMedia) || mediaItems[0];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && activeItem.type === "video") {
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
  }, [isPlaying, activeItem.type, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getMediaIcon = (type: string) => {
    switch (type) {
      case "video":
        return "▶️";
      case "audio":
        return "🎵";
      case "gif":
        return "🔄";
      default:
        return "📁";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Media Library
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Browse and manage all your media files
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setLayout("grid")}
                className={`p-3 rounded-xl transition-all ${
                  layout === "grid"
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setLayout("list")}
                className={`p-3 rounded-xl transition-all ${
                  layout === "list"
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
            <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-full font-medium transition-all">
              Upload Media
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Media Player */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg">
              {/* Media Display */}
              <div
                className={`aspect-video bg-linear-to-br ${activeItem.color} relative`}
              >
                {/* Media Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-6 opacity-90">
                      {activeItem.thumbnail}
                    </div>
                    <div className="text-white text-2xl font-bold">
                      {activeItem.title}
                    </div>
                    <div className="text-white/80 mt-2">
                      {activeItem.type.charAt(0).toUpperCase() +
                        activeItem.type.slice(1)}{" "}
                      •{" "}
                      {activeItem.type === "video"
                        ? `${activeItem.views} views`
                        : activeItem.type === "audio"
                        ? `${activeItem.plays} plays`
                        : `${activeItem.loops} loops`}
                    </div>
                  </div>
                </div>

                {/* Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-6">
                  {/* Progress Bar */}
                  {activeItem.type === "video" && (
                    <div className="mb-4">
                      <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white rounded-full"
                          style={{
                            width: `${(currentTime / duration) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-white/80 text-sm mt-2">
                        <span>{formatTime(currentTime)}</span>
                        <span>{activeItem.duration}</span>
                      </div>
                    </div>
                  )}

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
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

                      {!isMuted && (
                        <div className="w-32">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={(e) =>
                              setVolume(parseInt(e.target.value))
                            }
                            className="w-full accent-white"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-3">
                      <button className="p-3 hover:bg-white/20 rounded-full transition-colors">
                        <Download className="w-5 h-5 text-white" />
                      </button>
                      <button className="p-3 hover:bg-white/20 rounded-full transition-colors">
                        <Maximize2 className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Media Info */}
            <div className="mt-6 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Type
                  </div>
                  <div className="font-medium text-gray-800 dark:text-white capitalize">
                    {activeItem.type}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Duration
                  </div>
                  <div className="font-medium text-gray-800 dark:text-white">
                    {activeItem.duration}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Status
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-medium text-gray-800 dark:text-white">
                      Ready to play
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Media Grid/List */}
          <div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                All Media ({mediaItems.length})
              </h3>

              {layout === "grid" ? (
                <div className="grid grid-cols-2 gap-3">
                  {mediaItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveMedia(item.id)}
                      className={`relative rounded-xl overflow-hidden transition-all duration-300 group ${
                        activeMedia === item.id
                          ? "ring-2 ring-blue-500 scale-105"
                          : "hover:scale-102"
                      }`}
                    >
                      <div
                        className={`aspect-square bg-linear-to-br ${item.color} relative`}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-3xl">{item.thumbnail}</div>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-medium truncate">
                          {item.title}
                        </div>
                        <div className="absolute top-2 right-2">
                          <div className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs text-white">
                            {item.type}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {mediaItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveMedia(item.id)}
                      className={`w-full p-3 rounded-xl flex items-center space-x-3 transition-all duration-300 ${
                        activeMedia === item.id
                          ? "bg-blue-50 dark:bg-blue-900/20"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800/50"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-lg bg-linear-to-br ${item.color} flex items-center justify-center`}
                      >
                        <div className="text-xl">{getMediaIcon(item.type)}</div>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-800 dark:text-white">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {item.type} • {item.duration}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {item.type === "video"
                          ? `${item.views} views`
                          : item.type === "audio"
                          ? `${item.plays} plays`
                          : `${item.loops} loops`}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors">
                <Download className="w-5 h-5" />
                <span className="font-medium">Download All</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-xl transition-all">
                <span className="font-medium">Share Library</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
