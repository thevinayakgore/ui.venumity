"use client";
import { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Heart,
  Download,
  Share2,
  Grid,
} from "lucide-react";

const galleryItems = [
  {
    id: 1,
    title: "Mountain Sunrise",
    category: "Landscape",
    likes: 1242,
    downloads: 543,
    color: "from-amber-500 to-orange-500",
    tags: ["nature", "sunrise", "mountains"],
  },
  {
    id: 2,
    title: "Urban Architecture",
    category: "Cityscape",
    likes: 892,
    downloads: 321,
    color: "from-blue-500 to-indigo-500",
    tags: ["architecture", "city", "modern"],
  },
  {
    id: 3,
    title: "Ocean Waves",
    category: "Seascape",
    likes: 1567,
    downloads: 678,
    color: "from-cyan-500 to-teal-500",
    tags: ["ocean", "waves", "beach"],
  },
  {
    id: 4,
    title: "Forest Path",
    category: "Nature",
    likes: 987,
    downloads: 432,
    color: "from-emerald-500 to-green-500",
    tags: ["forest", "path", "trees"],
  },
  {
    id: 5,
    title: "Desert Dunes",
    category: "Desert",
    likes: 765,
    downloads: 298,
    color: "from-yellow-500 to-amber-500",
    tags: ["desert", "dunes", "sand"],
  },
  {
    id: 6,
    title: "Northern Lights",
    category: "Sky",
    likes: 2103,
    downloads: 876,
    color: "from-purple-500 to-pink-500",
    tags: ["aurora", "lights", "sky"],
  },
  {
    id: 7,
    title: "Waterfall Mist",
    category: "Water",
    likes: 1432,
    downloads: 654,
    color: "from-blue-400 to-cyan-400",
    tags: ["waterfall", "mist", "nature"],
  },
  {
    id: 8,
    title: "City Lights",
    category: "Night",
    likes: 1789,
    downloads: 765,
    color: "from-violet-500 to-purple-500",
    tags: ["night", "city", "lights"],
  },
];

export default function Carousel_3_5() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("carousel");
  const [isLiked, setIsLiked] = useState<number[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + galleryItems.length) % galleryItems.length
    );
  }, []);

  const toggleLike = (id: number) => {
    setIsLiked((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (viewMode === "carousel") {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [viewMode, nextSlide]);

  const getGridPosition = (index: number) => {
    const row = Math.floor(index / 4);
    const col = index % 4;
    return { row, col };
  };

  const currentItem = galleryItems[currentIndex];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div
        className={`bg-white dark:bg-gray-900 rounded-3xl shadow-2xl transition-all duration-300 ${
          isFullscreen ? "fixed inset-0 z-50 m-0 rounded-none" : ""
        }`}
      >
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                Photo Gallery
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Beautiful photography from around the world
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-xl transition-all ${
                    viewMode === "grid"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("carousel")}
                  className={`p-3 rounded-xl transition-all ${
                    viewMode === "carousel"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <ChevronRight className="w-5 h-5 -ml-2" />
                </button>
              </div>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Maximize2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {viewMode === "carousel" ? (
            <>
              {/* Carousel View */}
              <div className="relative rounded-2xl overflow-hidden mb-8">
                <div className="aspect-21/9 relative">
                  {/* Main Image */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${currentItem.color} transition-all duration-500`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-8xl mb-6 opacity-80">📸</div>
                        <div className="text-4xl font-bold text-white">
                          {currentItem.title}
                        </div>
                      </div>
                    </div>

                    {/* Overlay Info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white text-2xl font-bold">
                            {currentItem.title}
                          </div>
                          <div className="text-white/80">
                            {currentItem.category}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => toggleLike(currentItem.id)}
                            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                          >
                            <Heart
                              className={`w-6 h-6 ${
                                isLiked.includes(currentItem.id)
                                  ? "fill-red-500 text-red-500"
                                  : "text-white"
                              }`}
                            />
                            <span className="text-white font-medium">
                              {currentItem.likes}
                            </span>
                          </button>
                          <button className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                            <Download className="w-6 h-6 text-white" />
                            <span className="text-white font-medium">
                              {currentItem.downloads}
                            </span>
                          </button>
                          <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                            <Share2 className="w-5 h-5 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex space-x-4 overflow-x-auto pb-4">
                {galleryItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`shrink-0 w-32 rounded-xl overflow-hidden transition-all duration-300 ${
                      index === currentIndex
                        ? "ring-2 ring-blue-500 scale-105"
                        : "opacity-70 hover:opacity-100 hover:scale-102"
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
            </>
          ) : (
            /* Grid View */
            <div className="grid grid-cols-4 gap-4">
              {galleryItems.map((item, index) => {
                const { row, col } = getGridPosition(index);
                const delay = (row * 4 + col) * 100;

                return (
                  <div
                    key={item.id}
                    className={`group relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-102 animate-fade-up`}
                    style={{ animationDelay: `${delay}ms` }}
                  >
                    <div
                      className={`aspect-square bg-linear-to-br ${item.color}`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-4xl opacity-80">📸</div>
                      </div>

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                        <div className="text-white font-bold text-lg mb-2">
                          {item.title}
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs text-white"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => toggleLike(item.id)}
                            className="flex items-center space-x-1 hover:opacity-80 transition-opacity"
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                isLiked.includes(item.id)
                                  ? "fill-red-500 text-red-500"
                                  : "text-white"
                              }`}
                            />
                            <span className="text-white text-sm">
                              {item.likes}
                            </span>
                          </button>
                          <button className="p-1 hover:bg-white/20 rounded transition-colors">
                            <Download className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Current Item Details */}
          <div
            className={`mt-8 p-6 rounded-2xl bg-linear-to-r ${
              viewMode === "carousel"
                ? currentItem.color
                : "from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
            } transition-all duration-500`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {currentItem.title}
                </h3>
                <div className="text-white/90 mt-1">{currentItem.category}</div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {currentItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">
                      {currentItem.likes}
                    </div>
                    <div className="text-white/80 text-sm">Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">
                      {currentItem.downloads}
                    </div>
                    <div className="text-white/80 text-sm">Downloads</div>
                  </div>
                </div>
                <button className="mt-4 px-6 py-2 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all duration-300">
                  Download HD
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fade-up 0.6s ease-out forwards;
}
`}</style>
    </div>
  );
}
