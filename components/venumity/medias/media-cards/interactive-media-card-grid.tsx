"use client";
import { useState } from "react";
import {
  Play,
  Heart,
  Share2,
  Download,
  Eye,
  Grid,
  List,
  Calendar,
  Sparkles,
} from "lucide-react";

export default function MediaCard_8_5() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [liked, setLiked] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [mediaItems] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      title: `Media Item ${i + 1}`,
      description: "This is a detailed description of the media content",
      type: i % 3 === 0 ? "video" : i % 3 === 1 ? "image" : "audio",
      category: ["Nature", "Technology", "Art", "Music", "Sports", "Travel"][
        i % 6
      ],
      views: Math.floor(Math.random() * 10000) + 1000,
      likes: Math.floor(Math.random() * 1000) + 100,
      downloads: Math.floor(Math.random() * 500) + 50,
      date: `2024-01-${15 + (i % 15)}`,
      author: `Author ${i + 1}`,
      color: [
        "from-blue-500 to-cyan-400",
        "from-purple-500 to-pink-400",
        "from-emerald-500 to-teal-400",
        "from-amber-500 to-orange-400",
        "from-rose-500 to-red-400",
        "from-violet-500 to-indigo-400",
      ][i % 6],
      featured: i % 4 === 0,
    }))
  );

  const categories = [
    "all",
    "Nature",
    "Technology",
    "Art",
    "Music",
    "Sports",
    "Travel",
    "Featured",
  ];

  const filteredItems = mediaItems.filter((item) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "Featured") return item.featured;
    return item.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Interactive Media Grid
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Filterable media cards with multiple views
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-full font-medium transition-all">
              Upload Media
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? "bg-linear-to-r from-blue-600 to-cyan-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {category === "all" ? "All" : category}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-3">
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded-md transition-all ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-gray-700 shadow-sm"
                    : "hover:bg-white/50 dark:hover:bg-gray-700/50"
                }`}
              >
                <Grid className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-md transition-all ${
                  viewMode === "list"
                    ? "bg-white dark:bg-gray-700 shadow-sm"
                    : "hover:bg-white/50 dark:hover:bg-gray-700/50"
                }`}
              >
                <List className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Media Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-gray-50 dark:bg-gray-800/50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Header */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        item.type === "video"
                          ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                          : item.type === "image"
                          ? "bg-purple-500/20 text-purple-600 dark:text-purple-400"
                          : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {item.type === "video"
                        ? "🎬"
                        : item.type === "image"
                        ? "🖼️"
                        : "🎵"}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800 dark:text-white">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {item.category}
                      </div>
                    </div>
                  </div>
                  {item.featured && (
                    <div className="px-3 py-1 bg-linear-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
                      <Sparkles className="w-3 h-3 inline mr-1" />
                      FEATURED
                    </div>
                  )}
                </div>

                {/* Preview */}
                <div className={`h-48 bg-linear-to-br ${item.color} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-5xl">✨</div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                    <div className="text-white">
                      <div className="text-lg font-bold">{item.title}</div>
                      <div className="text-sm opacity-80 mt-1">
                        {item.description}
                      </div>
                    </div>
                  </div>

                  {/* Play Button */}
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Stats & Actions */}
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-gray-800 dark:text-white">
                        {item.views.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Views
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-800 dark:text-white">
                        {item.likes}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Likes
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-800 dark:text-white">
                        {item.downloads}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Downloads
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          setLiked((prev) =>
                            prev.includes(item.id)
                              ? prev.filter((id) => id !== item.id)
                              : [...prev, item.id]
                          )
                        }
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            liked.includes(item.id)
                              ? "fill-red-500 text-red-500"
                              : "text-gray-400"
                          }`}
                        />
                      </button>
                      <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                        <Share2 className="w-5 h-5 text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                        <Download className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group flex items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div
                  className={`w-20 h-20 rounded-lg bg-linear-to-br ${item.color} flex items-center justify-center shrink-0`}
                >
                  <div className="text-3xl">
                    {item.type === "video"
                      ? "🎬"
                      : item.type === "image"
                      ? "🖼️"
                      : "🎵"}
                  </div>
                </div>

                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white text-lg">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      {item.featured && (
                        <div className="px-3 py-1 bg-linear-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
                          FEATURED
                        </div>
                      )}
                      <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
                        <Share2 className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 mt-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <Eye className="w-4 h-4" />
                      <span>{item.views.toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <Heart className="w-4 h-4" />
                      <span>{item.likes} likes</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {item.category}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {item.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        <div className="mt-8 p-6 bg-linear-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {filteredItems.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Showing</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {filteredItems.filter((item) => item.featured).length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Featured</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {filteredItems
                  .reduce((sum, item) => sum + item.views, 0)
                  .toLocaleString()}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Total Views
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {filteredItems
                  .reduce((sum, item) => sum + item.likes, 0)
                  .toLocaleString()}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Total Likes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
