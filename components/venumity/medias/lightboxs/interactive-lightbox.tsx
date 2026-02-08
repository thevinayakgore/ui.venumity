"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  Share2,
  Heart,
  Maximize2,
  Sparkles,
} from "lucide-react";

const effects = [
  { id: "none", name: "None", icon: "🔄" },
  { id: "blur", name: "Blur", icon: "🌀" },
  { id: "glow", name: "Glow", icon: "✨" },
  { id: "vintage", name: "Vintage", icon: "📻" },
  { id: "neon", name: "Neon", icon: "💡" },
  { id: "grayscale", name: "B&W", icon: "⚫" },
];

export default function Lightbox_7_5() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState(0);
  const [showEffects, setShowEffects] = useState(false);
  const [activeEffect, setActiveEffect] = useState("none");
  const progressBarRef = useRef<HTMLDivElement>(null);

  const mediaItems = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `Media ${i + 1}`,
    type: i % 3 === 0 ? "video" : i % 3 === 1 ? "gif" : "image",
    duration: i % 3 === 0 ? 180 : i % 3 === 1 ? 8 : null,
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
    description: "Interactive media with special effects",
  }));

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
    setIsPlaying(mediaItems[index].type === "video");
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setIsPlaying(false);
    setCurrentTime(0);
    setActiveEffect("none");
  };

  const nextItem = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  }, [mediaItems.length]);

  const prevItem = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + mediaItems.length) % mediaItems.length
    );
  }, [mediaItems.length]);

  const handleProgressClick = (e: React.MouseEvent) => {
    if (!progressBarRef.current || !mediaItems[currentIndex].duration) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    setCurrentTime(percent * (mediaItems[currentIndex].duration || 0));
  };

  useEffect(() => {
    if (
      isPlaying &&
      mediaItems[currentIndex].type === "video" &&
      mediaItems[currentIndex].duration
    ) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= (mediaItems[currentIndex].duration || 0)) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentIndex, mediaItems]);

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
      if (e.key === "m") setIsMuted(!isMuted);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isPlaying, isMuted, nextItem, prevItem]);

  const getEffectStyle = () => {
    switch (activeEffect) {
      case "blur":
        return "blur(4px)";
      case "glow":
        return "drop-shadow(0 0 20px rgba(255,255,255,0.5))";
      case "vintage":
        return "sepia(0.7) contrast(1.2)";
      case "neon":
        return "brightness(1.3) saturate(1.5)";
      case "grayscale":
        return "grayscale(1)";
      default:
        return "";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Interactive Lightbox
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Media viewer with special effects and controls
            </p>
          </div>
          <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-full font-medium transition-all">
            <Sparkles className="w-5 h-5 inline mr-2" />
            Interactive Mode
          </button>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mediaItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
            >
              <div
                className={`h-full bg-linear-to-br ${item.color} flex items-center justify-center`}
              >
                <div className="text-4xl">
                  {item.type === "video"
                    ? "🎬"
                    : item.type === "gif"
                    ? "🌀"
                    : "🖼️"}
                </div>
              </div>

              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                <div className="text-white">
                  <div className="font-bold text-lg">{item.title}</div>
                  <div className="text-sm opacity-80 capitalize">
                    {item.type}
                  </div>
                </div>
              </div>

              {item.type === "video" && (
                <div className="absolute top-3 right-3">
                  <div className="px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs text-white">
                    {item.duration}s
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Interactive Lightbox */}
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

              {/* Navigation */}
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

              {/* Main Content */}
              <div className="h-full flex flex-col">
                {/* Media Display */}
                <div className="flex-1 relative rounded-xl overflow-hidden mb-6">
                  <div
                    className={`h-full bg-linear-to-br ${mediaItems[currentIndex].color} flex items-center justify-center transition-all duration-300`}
                    style={{ filter: getEffectStyle() }}
                  >
                    <div className="text-center">
                      <div className="text-9xl mb-6">
                        {mediaItems[currentIndex].type === "video"
                          ? "🎬"
                          : mediaItems[currentIndex].type === "gif"
                          ? "🌀"
                          : "🖼️"}
                      </div>
                      <div className="text-white text-3xl font-bold">
                        {mediaItems[currentIndex].title}
                      </div>
                      <div className="text-white/80 text-lg mt-2 capitalize">
                        {mediaItems[currentIndex].type}
                      </div>
                    </div>
                  </div>

                  {/* Play/Pause Button */}
                  {mediaItems[currentIndex].type === "video" && (
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
                  )}

                  {/* Progress Bar for Videos */}
                  {mediaItems[currentIndex].type === "video" &&
                    mediaItems[currentIndex].duration && (
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div
                          ref={progressBarRef}
                          onClick={handleProgressClick}
                          className="h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer"
                        >
                          <div
                            className="h-full bg-white rounded-full"
                            style={{
                              width: `${
                                (currentTime /
                                  (mediaItems[currentIndex].duration || 1)) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-white/80 text-sm mt-2">
                          <span>
                            {Math.floor(currentTime / 60)}:
                            {String(Math.floor(currentTime % 60)).padStart(
                              2,
                              "0"
                            )}
                          </span>
                          <span>
                            {Math.floor(
                              (mediaItems[currentIndex].duration || 0) / 60
                            )}
                            :
                            {String(
                              Math.floor(
                                (mediaItems[currentIndex].duration || 0) % 60
                              )
                            ).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    )}
                </div>

                {/* Controls Panel */}
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {mediaItems[currentIndex].title}
                      </h2>
                      <p className="text-gray-300 mt-1">
                        {mediaItems[currentIndex].description}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setShowEffects(!showEffects)}
                        className={`p-3 rounded-xl ${
                          showEffects
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-white/10 hover:bg-white/20 text-white"
                        }`}
                      >
                        <Sparkles className="w-5 h-5" />
                      </button>
                      <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                        <Maximize2 className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Effects Panel */}
                  {showEffects && (
                    <div className="mb-6 p-4 bg-black/50 rounded-xl">
                      <div className="text-white font-medium mb-3">Effects</div>
                      <div className="flex space-x-3 overflow-x-auto pb-2">
                        {effects.map((effect) => (
                          <button
                            key={effect.id}
                            onClick={() => setActiveEffect(effect.id)}
                            className={`flex flex-col items-center p-3 rounded-lg shrink-0 transition-all ${
                              activeEffect === effect.id
                                ? "bg-linear-to-r from-blue-500 to-cyan-400 text-white"
                                : "bg-white/10 hover:bg-white/20 text-white"
                            }`}
                          >
                            <div className="text-2xl mb-1">{effect.icon}</div>
                            <div className="text-xs">{effect.name}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bottom Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {mediaItems[currentIndex].type === "video" && (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="p-2 hover:bg-white/10 rounded-full"
                          >
                            {isMuted ? (
                              <VolumeX className="w-5 h-5 text-white" />
                            ) : (
                              <Volume2 className="w-5 h-5 text-white" />
                            )}
                          </button>
                          {!isMuted && (
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={volume}
                              onChange={(e) =>
                                setVolume(parseInt(e.target.value))
                              }
                              className="w-24 accent-white"
                            />
                          )}
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-white/10 rounded-full">
                          <Heart className="w-5 h-5 text-white" />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-full">
                          <Download className="w-5 h-5 text-white" />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-full">
                          <Share2 className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>

                    {/* Thumbnail Navigation */}
                    <div className="flex space-x-2">
                      {mediaItems.map((item, index) => (
                        <button
                          key={item.id}
                          onClick={() => setCurrentIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            index === currentIndex
                              ? "bg-white"
                              : "bg-white/30 hover:bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
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
