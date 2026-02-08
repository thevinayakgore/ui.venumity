"use client";
import { useState } from "react";
import {
  Camera,
  MapPin,
  Calendar,
  Settings,
  Download,
  Share2,
  Heart,
  ZoomIn,
} from "lucide-react";

export default function Image_6_4() {
  const [activeTab, setActiveTab] = useState<"details" | "exif" | "tags">(
    "details"
  );
  const [liked, setLiked] = useState(false);

  const metadata = {
    basic: {
      title: "Mountain Sunrise",
      description: "Beautiful sunrise over the Swiss Alps captured at dawn",
      camera: "Sony A7III",
      lens: "24-70mm f/2.8 GM",
      location: "Swiss Alps, Switzerland",
      date: "2024-01-15",
      resolution: "7952 × 5304",
      size: "24.5 MB",
      format: "RAW + JPEG",
    },
    exif: {
      aperture: "f/8",
      shutter: "1/250s",
      iso: "100",
      focalLength: "35mm",
      exposure: "0 EV",
      whiteBalance: "Daylight",
      flash: "No Flash",
      metering: "Matrix",
    },
    tags: [
      "mountains",
      "sunrise",
      "alps",
      "landscape",
      "nature",
      "dawn",
      "switzerland",
      "photography",
    ],
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Image Metadata
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Detailed information and EXIF data
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-full font-medium transition-all">
              <Download className="w-5 h-5 inline mr-2" />
              Download Metadata
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Preview */}
          <div className="lg:col-span-2">
            <div className="bg-linear-to-br from-amber-500 to-orange-600 rounded-2xl overflow-hidden relative">
              <div className="aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-6">🌄</div>
                  <div className="text-white text-2xl font-bold">
                    {metadata.basic.title}
                  </div>
                  <div className="text-white/80">
                    {metadata.basic.description}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="absolute top-4 right-4 flex items-center space-x-2">
                <button
                  onClick={() => setLiked(!liked)}
                  className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      liked ? "fill-red-500 text-red-500" : "text-white"
                    }`}
                  />
                </button>
                <button className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
                  <ZoomIn className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Image Stats */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                  42MP
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  Resolution
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                  RAW
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  Format
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                  24.5 MB
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  File Size
                </div>
              </div>
            </div>
          </div>

          {/* Metadata Panel */}
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-800">
              {["details", "exif", "tags"].map((tab) => (
                <button
                  key={tab}
                  onClick={() =>
                    setActiveTab(tab as "details" | "exif" | "tags")
                  }
                  className={`flex-1 px-4 py-3 text-center font-medium transition-colors ${
                    activeTab === tab
                      ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-500"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
              {activeTab === "details" && (
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Camera className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Camera
                      </div>
                      <div className="font-medium text-gray-800 dark:text-white">
                        {metadata.basic.camera}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Location
                      </div>
                      <div className="font-medium text-gray-800 dark:text-white">
                        {metadata.basic.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Date & Time
                      </div>
                      <div className="font-medium text-gray-800 dark:text-white">
                        {metadata.basic.date} • 06:42 AM
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Settings className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Resolution
                      </div>
                      <div className="font-medium text-gray-800 dark:text-white">
                        {metadata.basic.resolution}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "exif" && (
                <div className="space-y-4">
                  {Object.entries(metadata.exif).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between"
                    >
                      <div className="text-gray-600 dark:text-gray-400 capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </div>
                      <div className="font-medium text-gray-800 dark:text-white">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "tags" && (
                <div>
                  <div className="flex flex-wrap gap-2">
                    {metadata.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Add new tag..."
                      className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
                    />
                    <button className="px-4 py-2 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-lg">
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-xl transition-all">
                <Download className="w-5 h-5" />
                <span className="font-medium">Download Original</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-xl transition-colors">
                <Share2 className="w-5 h-5" />
                <span className="font-medium">Share Metadata</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
