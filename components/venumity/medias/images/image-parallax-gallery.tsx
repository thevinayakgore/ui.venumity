"use client";
import { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Heart,
  Download,
  Share2,
  Grid,
  Eye,
  Sparkles,
} from "lucide-react";

export default function Image_6_5() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [liked, setLiked] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const images = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `Gallery Image ${i + 1}`,
    description: "Beautiful photography with parallax effect",
    color: [
      "from-blue-500 to-cyan-400",
      "from-purple-500 to-pink-400",
      "from-emerald-500 to-teal-400",
      "from-amber-500 to-orange-400",
      "from-rose-500 to-red-400",
      "from-violet-500 to-indigo-400",
      "from-green-500 to-emerald-400",
      "from-cyan-500 to-blue-400",
    ][i],
    layer: i % 3, // 0: background, 1: middle, 2: foreground
  }));

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;

    const offsetX = (e.clientX - centerX) / rect.width;

    setParallaxOffset(offsetX * 50); // Max 50px offset
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Parallax Gallery
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Move cursor for interactive parallax effect
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-full font-medium transition-all">
              <Sparkles className="w-5 h-5 inline mr-2" />
              Interactive Mode
            </button>
          </div>
        </div>

        {/* Parallax Gallery */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative h-[600px] rounded-2xl overflow-hidden bg-linear-to-br from-gray-900 to-black cursor-pointer"
        >
          {/* Parallax Layers */}
          {[2, 1, 0].map((layer) => (
            <div
              key={layer}
              className="absolute inset-0 transition-transform duration-300"
              style={{
                transform: `translateX(${
                  parallaxOffset * (layer + 1) * 0.3
                }px)`,
                opacity: 0.7 + layer * 0.15,
              }}
            >
              <div
                className={`h-full bg-linear-to-br ${images[currentIndex].color} flex items-center justify-center`}
              >
                <div className="text-center">
                  <div className="text-8xl mb-6">✨</div>
                  <div className="text-white text-4xl font-bold">
                    {images[currentIndex].title}
                  </div>
                  <div className="text-white/80 text-xl mt-2">
                    {images[currentIndex].description}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Controls */}
          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent">
            {/* Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center justify-center"
            >
              <ChevronLeft className="w-7 h-7 text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center justify-center"
            >
              <ChevronRight className="w-7 h-7 text-white" />
            </button>

            {/* Bottom Controls */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <div className="text-2xl font-bold">
                    {images[currentIndex].title}
                  </div>
                  <div className="text-white/80">
                    Image {currentIndex + 1} of {images.length}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() =>
                      setLiked((prev) =>
                        prev.includes(images[currentIndex].id)
                          ? prev.filter((id) => id !== images[currentIndex].id)
                          : [...prev, images[currentIndex].id]
                      )
                    }
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        liked.includes(images[currentIndex].id)
                          ? "fill-red-500 text-red-500"
                          : "text-white"
                      }`}
                    />
                  </button>
                  <button className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
                    <Download className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
                    <Share2 className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
                    <Maximize2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="mt-6 flex space-x-4 overflow-x-auto pb-4">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentIndex(index)}
              className={`shrink-0 w-32 rounded-xl overflow-hidden transition-all ${
                index === currentIndex
                  ? "ring-2 ring-blue-500 scale-105"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <div
                className={`aspect-square bg-linear-to-br ${image.color} relative`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-2xl">🖼️</div>
                </div>
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-white/10" />
                )}
              </div>
              <div className="p-2 bg-gray-100 dark:bg-gray-800">
                <div className="text-sm font-medium text-gray-800 dark:text-white truncate">
                  {image.title}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-linear-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                  24.5K
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Total Views
                </div>
              </div>
            </div>
          </div>
          <div className="bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-linear-to-r from-purple-500 to-pink-400 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                  1.2K
                </div>
                <div className="text-gray-600 dark:text-gray-400">Likes</div>
              </div>
            </div>
          </div>
          <div className="bg-linear-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-linear-to-r from-emerald-500 to-teal-400 flex items-center justify-center">
                <Download className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                  843
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Downloads
                </div>
              </div>
            </div>
          </div>
          <div className="bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-linear-to-r from-amber-500 to-orange-400 flex items-center justify-center">
                <Grid className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                  {images.length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Images</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
