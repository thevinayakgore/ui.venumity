"use client";
import { useState, useRef, useEffect } from "react";
import { Download, GitCompare, Share2, ZoomIn, ZoomOut } from "lucide-react";

export default function Image_6_3() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, percent)));
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Image Comparison
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Drag to compare before/after edits
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-full font-medium transition-all">
              <GitCompare className="w-5 h-5 inline mr-2" />
              Compare Mode
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Comparison Container */}
          <div
            ref={containerRef}
            className="relative h-[500px] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 cursor-col-resize"
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
          >
            {/* Before Image */}
            <div className="absolute inset-0">
              <div className="h-full bg-linear-to-br from-blue-500 to-cyan-400 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-7xl mb-4">📸</div>
                    <div className="text-white text-2xl font-bold">
                      Original
                    </div>
                    <div className="text-white/80">Unedited version</div>
                  </div>
                </div>
                <div className="absolute top-4 left-4 px-4 py-2 bg-black/70 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  BEFORE
                </div>
              </div>
            </div>

            {/* After Image (Clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="h-full bg-linear-to-br from-purple-600 to-pink-500 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-7xl mb-4">✨</div>
                    <div className="text-white text-2xl font-bold">Edited</div>
                    <div className="text-white/80">Enhanced version</div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 px-4 py-2 bg-linear-to-r from-purple-600 to-pink-500 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  AFTER
                </div>
              </div>
            </div>

            {/* Slider Control */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize flex items-center justify-center"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-12 h-12 rounded-full bg-white shadow-2xl flex items-center justify-center transform -translate-x-1/2">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-1 bg-gray-400 mb-1"></div>
                  <div className="w-6 h-1 bg-gray-400"></div>
                </div>
              </div>
            </div>

            {/* Zoom Overlay */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-4">
              <button
                onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.25))}
                className="p-1 hover:bg-white/20 rounded-full"
                disabled={zoomLevel <= 0.5}
              >
                <ZoomOut className="w-5 h-5 text-white" />
              </button>
              <div className="text-white font-medium">
                {zoomLevel.toFixed(1)}x
              </div>
              <button
                onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.25))}
                className="p-1 hover:bg-white/20 rounded-full"
                disabled={zoomLevel >= 3}
              >
                <ZoomIn className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
              <h3 className="font-bold text-gray-800 dark:text-white mb-4">
                Comparison Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Difference
                  </span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    42%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Edit Time
                  </span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    1.5 hours
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    File Size
                  </span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    24.5 MB → 18.2 MB
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
              <h3 className="font-bold text-gray-800 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-lg transition-all">
                  <Download className="w-5 h-5" />
                  <span>Download Both</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-lg transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>Share Comparison</span>
                </button>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
              <h3 className="font-bold text-gray-800 dark:text-white mb-4">
                Edit Details
              </h3>
              <div className="space-y-2">
                {[
                  { name: "Color Correction", value: "+35%" },
                  { name: "Sharpness", value: "+28%" },
                  { name: "Noise Reduction", value: "-42%" },
                  { name: "Exposure", value: "+15%" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      {item.name}
                    </span>
                    <span
                      className={`font-medium ${
                        item.value.startsWith("+")
                          ? "text-emerald-600 dark:text-emerald-400"
                          : item.value.startsWith("-")
                          ? "text-rose-600 dark:text-rose-400"
                          : "text-gray-800 dark:text-white"
                      }`}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
