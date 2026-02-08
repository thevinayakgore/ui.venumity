"use client";
import { useState } from "react";
import {
  Play,
  Heart,
  MoreVertical,
  Eye,
  Download,
  Calendar,
  User,
} from "lucide-react";

export default function MediaCard_8_4() {
  const [liked, setLiked] = useState<number[]>([]);

  const [mediaItems] = useState(() =>
    Array.from({ length: 9 }, (_, i) => ({
      id: i + 1,
      title: `Compact Media ${i + 1}`,
      type: i % 3 === 0 ? "video" : i % 3 === 1 ? "image" : "audio",
      duration: i % 3 === 0 ? "2:45" : i % 3 === 1 ? null : "18:32",
      views: Math.floor(Math.random() * 10000) + 1000,
      likes: Math.floor(Math.random() * 1000) + 100,
      date: `Jan ${15 + i}`,
      author: `Author ${i + 1}`,
      color: [
        "from-blue-500 to-cyan-400",
        "from-purple-500 to-pink-400",
        "from-emerald-500 to-teal-400",
        "from-amber-500 to-orange-400",
        "from-rose-500 to-red-400",
        "from-violet-500 to-indigo-400",
        "from-green-500 to-emerald-400",
        "from-cyan-500 to-blue-400",
        "from-gray-600 to-gray-800",
      ][i],
    }))
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Compact Media Cards
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Space-efficient cards for dense layouts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mediaItems.map((item) => (
            <div
              key={item.id}
              className="group bg-gray-50 dark:bg-gray-800/50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="flex">
                {/* Thumbnail */}
                <div className="w-24 h-24 relative shrink-0">
                  <div
                    className={`h-full bg-linear-to-br ${item.color} flex items-center justify-center`}
                  >
                    <div className="text-2xl">
                      {item.type === "video"
                        ? "🎬"
                        : item.type === "image"
                        ? "🖼️"
                        : "🎵"}
                    </div>
                  </div>

                  {/* Play Button */}
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play className="w-5 h-5 text-white ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Duration Badge */}
                  {item.duration && (
                    <div className="absolute bottom-1 right-1">
                      <div className="px-1.5 py-0.5 bg-black/70 backdrop-blur-sm rounded text-xs text-white">
                        {item.duration}
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 dark:text-white text-sm line-clamp-2">
                        {item.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1 text-xs text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{item.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() =>
                          setLiked((prev) =>
                            prev.includes(item.id)
                              ? prev.filter((id) => id !== item.id)
                              : [...prev, item.id]
                          )
                        }
                        className="flex items-center space-x-1 hover:opacity-80"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            liked.includes(item.id)
                              ? "fill-red-500 text-red-500"
                              : "text-gray-400"
                          }`}
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {item.likes}
                        </span>
                      </button>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {item.views.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                      <Download className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 p-4 bg-linear-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-gray-800 dark:text-white">
                {mediaItems.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Items
              </div>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-800 dark:text-white">
                {mediaItems.filter((m) => m.type === "video").length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Videos
              </div>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-800 dark:text-white">
                {mediaItems.filter((m) => m.type === "image").length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Images
              </div>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-800 dark:text-white">
                {mediaItems.filter((m) => m.type === "audio").length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Audio
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
