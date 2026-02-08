"use client";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Heart,
  Share2,
  Download,
  Eye,
  Calendar,
  Sparkles,
} from "lucide-react";

export default function MediaCard_8_3() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<number[]>([]);

  const [mediaItems] = useState(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      title: `Featured Media ${i + 1}`,
      description: "This is an amazing piece of content that you'll love",
      type: i % 3 === 0 ? "video" : i % 3 === 1 ? "image" : "audio",
      views: Math.floor(Math.random() * 10000) + 1000,
      likes: Math.floor(Math.random() * 1000) + 100,
      date: `2024-01-${15 + i}`,
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
      featured: i % 2 === 0,
    }))
  );

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const prevCard = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + mediaItems.length) % mediaItems.length
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Media Card Carousel
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Swipe through featured media cards
            </p>
          </div>
          <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-full font-medium transition-all">
            <Sparkles className="w-5 h-5 inline mr-2" />
            Featured
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevCard}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={nextCard}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>

          {/* Carousel Cards */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {mediaItems.map((item) => (
                <div key={item.id} className="w-full shrink-0 px-4">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl overflow-hidden shadow-xl group hover:shadow-2xl transition-all duration-300">
                    {/* Media Preview */}
                    <div className="relative">
                      <div
                        className={`h-64 bg-linear-to-br ${item.color} flex items-center justify-center`}
                      >
                        <div className="text-center">
                          <div className="text-7xl mb-4">
                            {item.type === "video"
                              ? "🎬"
                              : item.type === "image"
                              ? "🖼️"
                              : "🎵"}
                          </div>
                          {item.featured && (
                            <div className="inline-flex items-center px-4 py-2 bg-linear-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full">
                              <Sparkles className="w-4 h-4 mr-2" />
                              FEATURED
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Play Button for Videos */}
                      {item.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Play className="w-10 h-10 text-white ml-2" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mt-2">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
                            <Share2 className="w-5 h-5 text-gray-400" />
                          </button>
                          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
                            <Download className="w-5 h-5 text-gray-400" />
                          </button>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800 dark:text-white">
                            {item.views.toLocaleString()}
                          </div>
                          <div className="text-gray-600 dark:text-gray-400 text-sm">
                            Views
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800 dark:text-white">
                            {item.likes}
                          </div>
                          <div className="text-gray-600 dark:text-gray-400 text-sm">
                            Likes
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800 dark:text-white capitalize">
                            {item.type}
                          </div>
                          <div className="text-gray-600 dark:text-gray-400 text-sm">
                            Type
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() =>
                              setLiked((prev) =>
                                prev.includes(item.id)
                                  ? prev.filter((id) => id !== item.id)
                                  : [...prev, item.id]
                              )
                            }
                            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                          >
                            <Heart
                              className={`w-5 h-5 ${
                                liked.includes(item.id)
                                  ? "fill-red-500 text-red-500"
                                  : "text-gray-400"
                              }`}
                            />
                            <span className="text-gray-700 dark:text-gray-300">
                              {item.likes}
                            </span>
                          </button>
                          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                            <Eye className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-300">
                              View
                            </span>
                          </button>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div className="flex items-center justify-center space-x-2 mt-8">
            {mediaItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-blue-500 w-8"
                    : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
