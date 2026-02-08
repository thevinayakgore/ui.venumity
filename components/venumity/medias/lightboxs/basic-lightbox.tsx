"use client";
import { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  Heart,
} from "lucide-react";

export default function Lightbox_7_1() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    color: [
      "from-blue-500 to-cyan-400",
      "from-purple-500 to-pink-400",
      "from-emerald-500 to-teal-400",
      "from-amber-500 to-orange-400",
      "from-rose-500 to-red-400",
      "from-violet-500 to-indigo-400",
    ][i],
  }));

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);
  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Lightbox Gallery
        </h1>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => openLightbox(index)}
              className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
            >
              <div
                className={`h-full bg-linear-to-br ${image.color} flex items-center justify-center`}
              >
                <div className="text-4xl">🖼️</div>
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-6xl w-full max-h-[90vh]">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Image Display */}
              <div
                className={`h-[70vh] rounded-xl bg-linear-to-br ${images[currentIndex].color} flex items-center justify-center`}
              >
                <div className="text-8xl">🖼️</div>
              </div>

              {/* Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                <button className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
                  <Download className="w-5 h-5 text-white" />
                </button>
                <button className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
                  <Share2 className="w-5 h-5 text-white" />
                </button>
                <button className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
                  <Heart className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
