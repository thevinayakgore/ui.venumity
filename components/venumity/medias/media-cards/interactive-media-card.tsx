"use client";
import { useState } from "react";
import {
  Play,
  Heart,
  Share2,
  MoreVertical,
  Eye,
  Download,
  Clock,
} from "lucide-react";

export default function MediaCard_8_1() {
  const [liked, setLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Interactive Media Cards
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Cards with hover effects and quick actions
            </p>
          </div>
          <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-full font-medium transition-all">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 - Video */}
          <div
            className="group relative rounded-2xl overflow-hidden bg-linear-to-br from-blue-500 to-cyan-400 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="aspect-video relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl opacity-80">🎬</div>
              </div>

              {/* Play Button */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>

              {/* Duration Badge */}
              <div className="absolute bottom-3 right-3">
                <div className="px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs text-white flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  2:45
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent p-6 flex flex-col justify-end">
                <div className="text-white">
                  <h3 className="text-xl font-bold">Mountain Adventure</h3>
                  <p className="text-white/80 text-sm mt-1">4K Video • 2:45</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 bg-white/10 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setLiked(!liked)}
                    className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        liked ? "fill-red-500 text-red-500" : "text-white"
                      }`}
                    />
                    <span className="text-white text-sm">1.2K</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                    <Eye className="w-5 h-5 text-white" />
                    <span className="text-white text-sm">24K</span>
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                    <Download className="w-4 h-4 text-white" />
                  </button>
                  <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                    <Share2 className="w-4 h-4 text-white" />
                  </button>
                  <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                    <MoreVertical className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Image */}
          <div className="group relative rounded-2xl overflow-hidden bg-linear-to-br from-purple-500 to-pink-400 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="aspect-square relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl opacity-80">🖼️</div>
              </div>

              {/* Tags */}
              <div className="absolute top-4 left-4">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
                    Nature
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
                    Landscape
                  </span>
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                <div className="text-white">
                  <h3 className="text-xl font-bold">Sunset Photography</h3>
                  <p className="text-white/80 text-sm mt-1">
                    High resolution • 42MP
                  </p>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="p-4 bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">
                    Golden Hour
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    Photography • 42MP
                  </p>
                </div>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 - Audio */}
          <div className="group relative rounded-2xl overflow-hidden bg-linear-to-br from-emerald-500 to-teal-400 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20">
            <div className="aspect-square relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl opacity-80">🎵</div>
              </div>

              {/* Wave Visualization */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-center space-x-1 h-12">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-linear-to-t from-white/40 to-white/20 rounded-t transition-all duration-300 group-hover:animate-wave"
                    style={{
                      height: `${20 + Math.sin(i) * 15}px`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent p-6 flex flex-col justify-end">
                <div className="text-white">
                  <h3 className="text-xl font-bold">Ambient Sounds</h3>
                  <p className="text-white/80 text-sm mt-1">Audio • 18:32</p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="p-4 bg-white/10 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Play className="w-5 h-5 text-white ml-1" />
                  </button>
                  <div>
                    <div className="text-white font-medium">Now Playing</div>
                    <div className="text-white/80 text-sm">18:32 remaining</div>
                  </div>
                </div>
                <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                  <MoreVertical className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
