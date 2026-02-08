"use client";
import { useState, useEffect, useCallback } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Download,
  Share2,
  Heart,
  Grid,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

const images = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: `Fullscreen Image ${i + 1}`,
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
}));

export default function Lightbox_7_2() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showThumbnails, setShowThumbnails] = useState(true);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setIsFullscreen(false);
    setZoomLevel(1);
  };

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const toggleFullscreen = useCallback(() => {
    if (!isOpen) return;
    setIsFullscreen((prev) => !prev);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "f") toggleFullscreen();
      if (e.key === "+" || e.key === "=")
        setZoomLevel((prev) => Math.min(3, prev + 0.25));
      if (e.key === "-" || e.key === "_")
        setZoomLevel((prev) => Math.max(0.5, prev - 0.25));
      if (e.key === "0") setZoomLevel(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isFullscreen, toggleFullscreen]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Fullscreen Lightbox
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Experience images in fullscreen mode
            </p>
          </div>
          <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-full font-medium transition-all">
            Open Gallery
          </button>
        </div>

        {/* Preview Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.slice(0, 4).map((image, index) => (
            <button
              key={image.id}
              onClick={() => openLightbox(index)}
              className="aspect-square rounded-xl overflow-hidden cursor-pointer group"
            >
              <div
                className={`h-full bg-linear-to-br ${image.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
              >
                <div className="text-4xl">🖼️</div>
              </div>
            </button>
          ))}
        </div>

        {/* Fullscreen Lightbox */}
        {isOpen && (
          <div
            className={`fixed inset-0 bg-black z-50 ${
              isFullscreen ? "" : "p-4 flex items-center justify-center"
            }`}
          >
            <div
              className={`relative ${
                isFullscreen ? "h-screen" : "w-full max-w-6xl h-[90vh]"
              }`}
            >
              {/* Top Controls */}
              <div className="absolute top-0 left-0 right-0 z-20 p-6 flex items-center justify-between bg-linear-to-b from-black/50 to-transparent">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={closeLightbox}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center justify-center"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                  <div className="text-white font-medium">
                    {currentIndex + 1} / {images.length}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowThumbnails(!showThumbnails)}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                  >
                    <Grid className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={toggleFullscreen}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                  >
                    {isFullscreen ? (
                      <Minimize2 className="w-5 h-5 text-white" />
                    ) : (
                      <Maximize2 className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>
              </div>

              {/* Main Image */}
              <div className="h-full flex items-center justify-center relative">
                <div
                  className={`${
                    isFullscreen ? "max-w-[90vw] max-h-[90vh]" : "w-full h-full"
                  } transition-transform duration-300`}
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  <div
                    className={`${
                      isFullscreen ? "rounded-lg" : "rounded-xl"
                    } overflow-hidden h-full`}
                  >
                    <div
                      className={`h-full bg-linear-to-br ${images[currentIndex].color} flex items-center justify-center`}
                    >
                      <div className="text-9xl">✨</div>
                    </div>
                  </div>
                </div>

                {/* Navigation Arrows */}
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
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/50 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="text-white">
                    <div className="text-2xl font-bold">
                      {images[currentIndex].title}
                    </div>
                    <div className="text-white/80">
                      Fullscreen mode • Zoom: {zoomLevel.toFixed(1)}x
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Zoom Controls */}
                    <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                      <button
                        onClick={() =>
                          setZoomLevel((prev) => Math.max(0.5, prev - 0.25))
                        }
                        className="p-1 hover:bg-white/20 rounded-full"
                      >
                        <ZoomOut className="w-5 h-5 text-white" />
                      </button>
                      <div className="text-white font-medium w-16 text-center">
                        {zoomLevel.toFixed(1)}x
                      </div>
                      <button
                        onClick={() =>
                          setZoomLevel((prev) => Math.min(3, prev + 0.25))
                        }
                        className="p-1 hover:bg-white/20 rounded-full"
                      >
                        <ZoomIn className="w-5 h-5 text-white" />
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      <button className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
                        <Heart className="w-5 h-5 text-white" />
                      </button>
                      <button className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
                        <Download className="w-5 h-5 text-white" />
                      </button>
                      <button className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
                        <Share2 className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thumbnails Sidebar */}
              {showThumbnails && (
                <div
                  className={`absolute ${
                    isFullscreen
                      ? "top-24 right-6 bottom-24"
                      : "top-24 right-6 bottom-6"
                  } w-24 bg-black/50 backdrop-blur-sm rounded-xl p-2 overflow-y-auto`}
                >
                  <div className="space-y-2">
                    {images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-full aspect-square rounded-lg overflow-hidden transition-all ${
                          index === currentIndex
                            ? "ring-2 ring-white scale-105"
                            : "opacity-50 hover:opacity-100 hover:scale-102"
                        }`}
                      >
                        <div
                          className={`w-full h-full bg-linear-to-br ${image.color}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
