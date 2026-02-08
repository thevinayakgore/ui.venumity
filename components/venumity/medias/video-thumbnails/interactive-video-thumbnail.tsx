"use client";
import { useState } from "react";
import { Play, Eye, Heart, Clock, MoreVertical } from "lucide-react";

export default function VideoThumbnail_10_1() {
  const [isHovered, setIsHovered] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Video Thumbnails
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="group relative rounded-2xl overflow-hidden bg-linear-to-br from-blue-500 to-cyan-400 cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="aspect-video relative">
                {/* Thumbnail Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-5xl">🎬</div>
                </div>

                {/* Play Button */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 text-white ml-1" />
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
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <div className="text-white">
                    <h3 className="font-bold text-lg">Video Title {item}</h3>
                    <p className="text-white/80 text-sm mt-1">
                      Channel Name • 24K views
                    </p>
                  </div>
                </div>
              </div>

              {/* Info Bar */}
              <div className="p-3 bg-white dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white">
                      Video Title {item}
                    </h4>
                    <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <span>Channel Name</span>
                      <span>•</span>
                      <span>2 days ago</span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-4 mt-3">
                  <button
                    onClick={() => setLiked(!liked)}
                    className="flex items-center space-x-1 hover:opacity-80 transition-opacity"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        liked ? "fill-red-500 text-red-500" : "text-gray-400"
                      }`}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      1.2K
                    </span>
                  </button>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      24K
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
