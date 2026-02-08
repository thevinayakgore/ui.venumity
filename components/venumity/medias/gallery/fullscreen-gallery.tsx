"use client";
import { useState, useEffect } from "react";
import {
  Maximize2,
  Minimize2,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  Heart,
  Info,
} from "lucide-react";

const fullscreenItems = [
  {
    id: 1,
    title: "Ocean Sunset",
    description: "Beautiful sunset over the Pacific Ocean",
    type: "photo",
    color: "from-orange-500 to-red-500",
    likes: 1242,
    downloads: 543,
    location: "California, USA",
  },
  {
    id: 2,
    title: "Mountain Range",
    description: "Snow-capped peaks at dawn",
    type: "photo",
    color: "from-blue-500 to-cyan-400",
    likes: 892,
    downloads: 321,
    location: "Swiss Alps",
  },
  {
    id: 3,
    title: "Forest Trail",
    description: "Sunlight filtering through dense forest",
    type: "photo",
    color: "from-emerald-500 to-green-500",
    likes: 967,
    downloads: 432,
    location: "Black Forest, Germany",
  },
  {
    id: 4,
    title: "Northern Lights",
    description: "Aurora borealis over frozen lake",
    type: "photo",
    color: "from-purple-500 to-pink-500",
    likes: 2103,
    downloads: 876,
    location: "Norway",
  },
];

export default function Gallery_5_4() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [liked, setLiked] = useState<number[]>([]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % fullscreenItems.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % fullscreenItems.length);
  };

  const prevItem = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + fullscreenItems.length) % fullscreenItems.length
    );
  };

  const toggleLike = (id: number) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === "Escape") setIsFullscreen(false);
        if (e.key === "ArrowRight") nextItem();
        if (e.key === "ArrowLeft") prevItem();
        if (e.key === " ") {
          e.preventDefault();
          setIsPlaying(!isPlaying);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, isPlaying]);

  return (
    <div
      className={`${
        isFullscreen ? "fixed inset-0 z-50 bg-black" : "max-w-7xl mx-auto p-6"
      }`}
    >
      <div
        className={`${
          isFullscreen ? "h-screen" : "rounded-3xl shadow-2xl"
        } bg-white dark:bg-gray-900 overflow-hidden`}
      >
        {/* Top Controls */}
        <div
          className={`absolute top-0 left-0 right-0 z-20 p-6 flex items-center justify-between ${
            isFullscreen ? "bg-linear-to-b from-black/50 to-transparent" : ""
          }`}
        >
          <div className="flex items-center space-x-4">
            {!isFullscreen && (
              <button
                onClick={() => setIsFullscreen(true)}
                className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                <Maximize2 className="w-5 h-5 text-white" />
              </button>
            )}
            {isFullscreen && (
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                <Minimize2 className="w-5 h-5 text-white" />
              </button>
            )}
            <div className="text-white font-medium">
              {currentIndex + 1} / {fullscreenItems.length}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" />
              )}
            </button>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <Info className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Main Display */}
        <div className={`relative ${isFullscreen ? "h-screen" : "h-[600px]"}`}>
          {/* Background */}
          <div
            className={`absolute inset-0 bg-linear-to-br ${fullscreenItems[currentIndex].color} transition-all duration-500`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-9xl opacity-20">🌄</div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevItem}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            <ChevronLeft className="w-7 h-7 text-white" />
          </button>
          <button
            onClick={nextItem}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            <ChevronRight className="w-7 h-7 text-white" />
          </button>

          {/* Image Info Overlay */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-8 transition-transform duration-300 ${
              showInfo ? "translate-y-0" : "translate-y-full"
            } bg-linear-to-t from-black/80 to-transparent`}
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-2">
                {fullscreenItems[currentIndex].title}
              </h2>
              <p className="text-white/80 mb-4">
                {fullscreenItems[currentIndex].description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-white" />
                    <span className="text-white">
                      {fullscreenItems[currentIndex].location}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() =>
                        toggleLike(fullscreenItems[currentIndex].id)
                      }
                      className="flex items-center space-x-2 hover:opacity-80"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          liked.includes(fullscreenItems[currentIndex].id)
                            ? "fill-red-500 text-red-500"
                            : "text-white"
                        }`}
                      />
                      <span className="text-white">
                        {fullscreenItems[currentIndex].likes}
                      </span>
                    </button>
                    <div className="flex items-center space-x-2">
                      <Download className="w-5 h-5 text-white" />
                      <span className="text-white">
                        {fullscreenItems[currentIndex].downloads}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                    <Download className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                    <Share2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        {!isFullscreen && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {fullscreenItems[currentIndex].title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {fullscreenItems[currentIndex].description}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => toggleLike(fullscreenItems[currentIndex].id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      liked.includes(fullscreenItems[currentIndex].id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    {fullscreenItems[currentIndex].likes}
                  </span>
                </button>
                <button className="px-4 py-2 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-full transition-all">
                  Download
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {fullscreenItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`shrink-0 w-32 rounded-xl overflow-hidden transition-all ${
                    index === currentIndex
                      ? "ring-2 ring-blue-500 scale-105"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <div
                    className={`aspect-video bg-linear-to-br ${item.color} relative`}
                  >
                    {index === currentIndex && (
                      <div className="absolute inset-0 bg-white/10" />
                    )}
                    <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-medium truncate">
                      {item.title}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
