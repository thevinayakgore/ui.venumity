"use client";
import { useState, useEffect, useCallback } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Grid,
  Play,
  Pause,
  Download,
  Share2,
  Heart,
  Clock,
  Eye,
} from "lucide-react";

export default function Lightbox_7_3() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "slideshow">("grid");

  const [galleryItems, setGalleryItems] = useState<
    {
      id: number;
      title: string;
      type: "photo" | "video" | "gif";
      duration: string | null;
      color: string;
      views: number;
      likes: number;
    }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      title: `Gallery Item ${i + 1}`,
      type: i % 3 === 0 ? "photo" : i % 3 === 1 ? "video" : "gif" as "photo" | "video" | "gif",
      duration: i % 3 === 1 ? "2:45" : i % 3 === 2 ? "0:08" : null,
      color: [
        "from-blue-500 to-cyan-400",
        "from-purple-500 to-pink-400",
        "from-emerald-500 to-teal-400",
        "from-amber-500 to-orange-400",
        "from-rose-500 to-red-400",
        "from-violet-500 to-indigo-400",
      ][i % 6],
      views: Math.floor(Math.random() * 10000) + 1000,
      likes: Math.floor(Math.random() * 1000) + 100,
    }));

    const timer = setTimeout(() => {
      setGalleryItems(generated);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setIsPlaying(false);
  };

  const nextItem = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  }, [galleryItems.length]);

  const prevItem = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  }, [galleryItems.length]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(nextItem, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, nextItem]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextItem();
      if (e.key === "ArrowLeft") prevItem();
      if (e.key === " ") {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isPlaying, nextItem, prevItem]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Gallery Lightbox
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Photos, videos, and GIFs in one gallery
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-3 rounded-xl ${
                viewMode === "grid"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("slideshow")}
              className={`p-3 rounded-xl ${
                viewMode === "slideshow"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              }`}
            >
              <Play className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
            >
              <div
                className={`h-full bg-linear-to-br ${item.color} flex items-center justify-center`}
              >
                <div className="text-4xl">
                  {item.type === "photo"
                    ? "🖼️"
                    : item.type === "video"
                    ? "🎬"
                    : "🌀"}
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                <div className="text-white">
                  <div className="font-bold text-lg">{item.title}</div>
                  <div className="flex items-center space-x-3 mt-2 text-sm">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{item.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{item.likes}</span>
                    </div>
                    {item.duration && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{item.duration}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Type Badge */}
              <div className="absolute top-3 right-3">
                <div className="px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs text-white capitalize">
                  {item.type}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-6xl h-full max-h-[90vh]">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={prevItem}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextItem}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Main Display */}
              <div className="h-full flex flex-col">
                {/* Image/Video Area */}
                <div className="flex-1 relative rounded-xl overflow-hidden mb-6">
                  <div
                    className={`h-full bg-linear-to-br ${galleryItems[currentIndex].color} flex items-center justify-center`}
                  >
                    <div className="text-center">
                      <div className="text-9xl mb-6">
                        {galleryItems[currentIndex].type === "photo"
                          ? "🖼️"
                          : galleryItems[currentIndex].type === "video"
                          ? "🎬"
                          : "🌀"}
                      </div>
                      <div className="text-white text-3xl font-bold">
                        {galleryItems[currentIndex].title}
                      </div>
                      <div className="text-white/80 text-lg mt-2">
                        {galleryItems[currentIndex].type
                          .charAt(0)
                          .toUpperCase() +
                          galleryItems[currentIndex].type.slice(1)}
                        {galleryItems[currentIndex].duration &&
                          ` • ${galleryItems[currentIndex].duration}`}
                      </div>
                    </div>
                  </div>

                  {/* Play/Pause for Slideshow */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="absolute bottom-4 right-4 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center justify-center"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white ml-1" />
                    )}
                  </button>
                </div>

                {/* Info & Controls */}
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {galleryItems[currentIndex].title}
                      </h2>
                      <div className="flex items-center space-x-4 mt-2 text-gray-300">
                        <div className="flex items-center space-x-2">
                          <Eye className="w-4 h-4" />
                          <span>
                            {galleryItems[currentIndex].views.toLocaleString()}{" "}
                            views
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Heart className="w-4 h-4" />
                          <span>{galleryItems[currentIndex].likes} likes</span>
                        </div>
                        <div className="px-3 py-1 bg-white/10 rounded-full text-sm capitalize">
                          {galleryItems[currentIndex].type}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() =>
                          setLiked((prev) =>
                            prev.includes(galleryItems[currentIndex].id)
                              ? prev.filter(
                                  (id) => id !== galleryItems[currentIndex].id
                                )
                              : [...prev, galleryItems[currentIndex].id]
                          )
                        }
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            liked.includes(galleryItems[currentIndex].id)
                              ? "fill-red-500 text-red-500"
                              : "text-white"
                          }`}
                        />
                      </button>
                      <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                        <Download className="w-5 h-5 text-white" />
                      </button>
                      <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                        <Share2 className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  <div className="flex space-x-3 overflow-x-auto pb-2">
                    {galleryItems.map((item, index) => (
                      <button
                        key={item.id}
                        onClick={() => setCurrentIndex(index)}
                        className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                          index === currentIndex
                            ? "ring-2 ring-white scale-105"
                            : "opacity-50 hover:opacity-100"
                        }`}
                      >
                        <div
                          className={`w-full h-full bg-linear-to-br ${item.color} flex items-center justify-center`}
                        >
                          <div className="text-xl">
                            {item.type === "photo"
                              ? "🖼️"
                              : item.type === "video"
                              ? "🎬"
                              : "🌀"}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
