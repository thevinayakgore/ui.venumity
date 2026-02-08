"use client";
import { useState } from "react";
import {
  Eye,
  Heart,
  Download,
  Share2,
  Calendar,
  User,
  MoreVertical,
  Play,
  Image as ImageIcon,
  Music,
} from "lucide-react";

export default function MediaCard_8_2() {
  const [activeFilter, setActiveFilter] = useState("all");

  const mediaItems = [
    {
      id: 1,
      title: "Mountain Sunrise",
      type: "image",
      views: 12420,
      likes: 1242,
      downloads: 543,
      date: "2024-01-15",
      author: "Nature Photos",
      tags: ["landscape", "sunrise", "mountains"],
      color: "from-amber-500 to-orange-400",
    },
    {
      id: 2,
      title: "City Time-lapse",
      type: "video",
      views: 8420,
      likes: 892,
      downloads: 321,
      date: "2024-01-14",
      author: "Urban Videos",
      tags: ["timelapse", "city", "night"],
      color: "from-blue-500 to-cyan-400",
    },
    {
      id: 3,
      title: "Forest Ambience",
      type: "audio",
      views: 5670,
      likes: 967,
      downloads: 432,
      date: "2024-01-13",
      author: "Nature Sounds",
      tags: ["ambience", "forest", "relaxation"],
      color: "from-emerald-500 to-teal-400",
    },
    {
      id: 4,
      title: "Abstract Art",
      type: "image",
      views: 3210,
      likes: 456,
      downloads: 198,
      date: "2024-01-12",
      author: "Art Gallery",
      tags: ["abstract", "art", "digital"],
      color: "from-purple-500 to-pink-400",
    },
    {
      id: 5,
      title: "Documentary Film",
      type: "video",
      views: 15670,
      likes: 2103,
      downloads: 876,
      date: "2024-01-11",
      author: "Film Studio",
      tags: ["documentary", "education", "film"],
      color: "from-rose-500 to-red-400",
    },
    {
      id: 6,
      title: "Meditation Music",
      type: "audio",
      views: 7890,
      likes: 1134,
      downloads: 567,
      date: "2024-01-10",
      author: "Wellness Audio",
      tags: ["meditation", "music", "calm"],
      color: "from-violet-500 to-indigo-400",
    },
  ];

  const filters = [
    { id: "all", label: "All Media" },
    { id: "image", label: "Images" },
    { id: "video", label: "Videos" },
    { id: "audio", label: "Audio" },
  ];

  const filteredItems = mediaItems.filter(
    (item) => activeFilter === "all" || item.type === activeFilter
  );

  const getIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-5 h-5" />;
      case "video":
        return <Play className="w-5 h-5" />;
      case "audio":
        return <Music className="w-5 h-5" />;
      default:
        return <ImageIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Media Cards with Stats
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Detailed statistics and analytics
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-full font-medium transition-all">
              Export Stats
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full transition-all ${
                activeFilter === filter.id
                  ? "bg-linear-to-r from-blue-600 to-cyan-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-gray-800 dark:text-white">
              {filteredItems
                .reduce((sum, item) => sum + item.views, 0)
                .toLocaleString()}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Total Views</div>
          </div>
          <div className="bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-gray-800 dark:text-white">
              {filteredItems
                .reduce((sum, item) => sum + item.likes, 0)
                .toLocaleString()}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Total Likes</div>
          </div>
          <div className="bg-linear-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-gray-800 dark:text-white">
              {filteredItems
                .reduce((sum, item) => sum + item.downloads, 0)
                .toLocaleString()}
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Total Downloads
            </div>
          </div>
          <div className="bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-gray-800 dark:text-white">
              {filteredItems.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Media Items</div>
          </div>
        </div>

        {/* Media Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              {/* Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      item.type === "image"
                        ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                        : item.type === "video"
                        ? "bg-purple-500/20 text-purple-600 dark:text-purple-400"
                        : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    {getIcon(item.type)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 dark:text-white">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {item.type}
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Preview */}
              <div className={`h-48 bg-linear-to-br ${item.color} relative`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-5xl opacity-80">
                    {item.type === "image"
                      ? "🖼️"
                      : item.type === "video"
                      ? "🎬"
                      : "🎵"}
                  </div>
                </div>

                {/* Stats Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-white text-lg font-bold">
                        {item.views.toLocaleString()}
                      </div>
                      <div className="text-white/80 text-xs">Views</div>
                    </div>
                    <div>
                      <div className="text-white text-lg font-bold">
                        {item.likes}
                      </div>
                      <div className="text-white/80 text-xs">Likes</div>
                    </div>
                    <div>
                      <div className="text-white text-lg font-bold">
                        {item.downloads}
                      </div>
                      <div className="text-white/80 text-xs">Downloads</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{item.author}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-1 hover:opacity-80">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {item.views.toLocaleString()}
                      </span>
                    </button>
                    <button className="flex items-center space-x-1 hover:opacity-80">
                      <Heart className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {item.likes}
                      </span>
                    </button>
                    <button className="flex items-center space-x-1 hover:opacity-80">
                      <Download className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {item.downloads}
                      </span>
                    </button>
                  </div>
                  <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                    <Share2 className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
