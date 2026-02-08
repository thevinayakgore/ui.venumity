"use client";
import { useState, useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Heart,
  Minus,
  Plus,
} from "lucide-react";

export default function Lightbox_7_4() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [showControls, setShowControls] = useState(true);

  const images = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    color: [
      "from-gray-800 to-gray-900",
      "from-gray-700 to-gray-800",
      "from-gray-600 to-gray-700",
      "from-gray-500 to-gray-600",
      "from-gray-400 to-gray-500",
      "from-gray-300 to-gray-400",
    ][i],
  }));

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setZoom(1);
  };

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen, showControls]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Minimal Lightbox
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Clean and distraction-free viewing experience
          </p>
        </div>

        {/* Preview Grid */}
        <div className="grid grid-cols-3 gap-2 max-w-2xl mx-auto">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => openLightbox(index)}
              className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div
                className={`h-full bg-linear-to-br ${image.color} flex items-center justify-center`}
              >
                <div className="text-2xl text-white/50">📷</div>
              </div>
            </button>
          ))}
        </div>

        {/* Minimal Lightbox */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            onClick={() => setShowControls(!showControls)}
          >
            {/* Image Container */}
            <div
              className="relative transition-transform duration-300"
              style={{ transform: `scale(${zoom})` }}
            >
              <div className={`${images[currentIndex].color} rounded-lg`}>
                <div className="w-[90vw] h-[90vh] max-w-4xl max-h-[80vh] flex items-center justify-center">
                  <div className="text-8xl text-white/20">🖼️</div>
                </div>
              </div>

              {/* Controls Overlay */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  showControls ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Top Bar */}
                <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between">
                  <button
                    onClick={closeLightbox}
                    className="w-10 h-10 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-white/70" />
                  </button>
                  <div className="text-white/70 text-sm">
                    {currentIndex + 1} / {images.length}
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5 text-white/70" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
                >
                  <ChevronRight className="w-5 h-5 text-white/70" />
                </button>

                {/* Bottom Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setZoom(Math.max(0.5, zoom - 0.25));
                      }}
                      className="w-8 h-8 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
                      disabled={zoom <= 0.5}
                    >
                      <Minus className="w-4 h-4 text-white/70" />
                    </button>
                    <div className="text-white/70 text-sm w-12 text-center">
                      {zoom.toFixed(1)}x
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setZoom(Math.min(3, zoom + 0.25));
                      }}
                      className="w-8 h-8 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
                      disabled={zoom >= 3}
                    >
                      <Plus className="w-4 h-4 text-white/70" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Like action
                      }}
                      className="w-8 h-8 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
                    >
                      <Heart className="w-4 h-4 text-white/70" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Download action
                      }}
                      className="w-8 h-8 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
                    >
                      <Download className="w-4 h-4 text-white/70" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Strip (Only shows on hover) */}
            {showControls && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-2">
                  {images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIndex(index);
                      }}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentIndex
                          ? "bg-white"
                          : "bg-white/30 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
