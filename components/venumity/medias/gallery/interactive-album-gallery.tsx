"use client";
import { useState } from "react";
import {
  Folder,
  Video,
  Music,
  File,
  ChevronRight,
  MoreVertical,
  Download,
  Share2,
  Edit,
  Trash2,
  Plus,
  ImageIcon,
} from "lucide-react";

const albums = [
  {
    id: 1,
    name: "Vacation 2024",
    description: "Photos from summer vacation in Hawaii",
    items: 42,
    size: "2.4 GB",
    type: "mixed",
    color: "from-blue-500 to-cyan-400",
    lastUpdated: "2 days ago",
  },
  {
    id: 2,
    name: "Wedding Collection",
    description: "Beautiful moments from the wedding",
    items: 156,
    size: "8.7 GB",
    type: "photos",
    color: "from-purple-500 to-pink-400",
    lastUpdated: "1 week ago",
    featured: true,
  },
  {
    id: 3,
    name: "Music Production",
    description: "Studio recordings and mixes",
    items: 23,
    size: "4.2 GB",
    type: "audio",
    color: "from-emerald-500 to-teal-400",
    lastUpdated: "3 days ago",
  },
  {
    id: 4,
    name: "Travel Vlogs",
    description: "Video diaries from around the world",
    items: 18,
    size: "12.5 GB",
    type: "videos",
    color: "from-amber-500 to-orange-400",
    lastUpdated: "Yesterday",
    featured: true,
  },
  {
    id: 5,
    name: "Design Assets",
    description: "UI kits, icons, and templates",
    items: 87,
    size: "3.8 GB",
    type: "documents",
    color: "from-violet-500 to-indigo-400",
    lastUpdated: "2 weeks ago",
  },
  {
    id: 6,
    name: "Nature Photography",
    description: "Landscape and wildlife photography",
    items: 124,
    size: "6.9 GB",
    type: "photos",
    color: "from-rose-500 to-red-400",
    lastUpdated: "4 days ago",
  },
  {
    id: 7,
    name: "Podcast Episodes",
    description: "Recorded podcast sessions",
    items: 32,
    size: "5.1 GB",
    type: "audio",
    color: "from-green-500 to-emerald-400",
    lastUpdated: "5 days ago",
  },
  {
    id: 8,
    name: "Client Projects",
    description: "All client work files",
    items: 65,
    size: "9.3 GB",
    type: "mixed",
    color: "from-cyan-500 to-blue-400",
    lastUpdated: "1 day ago",
    featured: true,
  },
];

export default function Gallery_5_3() {
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);
  const [viewMode] = useState<"grid" | "list">("grid");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "photos":
        return <ImageIcon className="w-5 h-5" />;
      case "videos":
        return <Video className="w-5 h-5" />;
      case "audio":
        return <Music className="w-5 h-5" />;
      case "documents":
        return <File className="w-5 h-5" />;
      default:
        return <Folder className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "photos":
        return "text-blue-500";
      case "videos":
        return "text-purple-500";
      case "audio":
        return "text-emerald-500";
      case "documents":
        return "text-amber-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Photo Albums
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Organize and manage your photo collections
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-full font-medium transition-all flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              New Album
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-gray-800 dark:text-white">
              {albums.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Albums</div>
          </div>
          <div className="bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-gray-800 dark:text-white">
              {albums.reduce((sum, album) => sum + album.items, 0)}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Total Items</div>
          </div>
          <div className="bg-linear-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-gray-800 dark:text-white">
              {albums.filter((a) => a.featured).length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Featured</div>
          </div>
          <div className="bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-gray-800 dark:text-white">
              {albums
                .reduce((sum, album) => {
                  const size = parseFloat(album.size);
                  return sum + size;
                }, 0)
                .toFixed(1)}{" "}
              GB
            </div>
            <div className="text-gray-600 dark:text-gray-400">Total Size</div>
          </div>
        </div>

        {/* Albums Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {albums.map((album) => (
              <div
                key={album.id}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                  selectedAlbum === album.id ? "ring-2 ring-blue-500" : ""
                }`}
              >
                {/* Album Cover */}
                <div className={`h-48 bg-linear-to-br ${album.color} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl opacity-80">📁</div>
                  </div>

                  {/* Featured Badge */}
                  {album.featured && (
                    <div className="absolute top-4 right-4">
                      <div className="px-3 py-1 bg-linear-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
                        FEATURED
                      </div>
                    </div>
                  )}

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex items-end">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                          <Download className="w-4 h-4 text-white" />
                        </button>
                        <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                          <Share2 className="w-4 h-4 text-white" />
                        </button>
                        <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                          <Edit className="w-4 h-4 text-white" />
                        </button>
                      </div>
                      <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                        <MoreVertical className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Album Info */}
                <div className="p-4 bg-white dark:bg-gray-800">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white text-lg">
                        {album.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        {album.description}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setSelectedAlbum(
                          album.id === selectedAlbum ? null : album.id
                        )
                      }
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                      <ChevronRight
                        className={`w-5 h-5 text-gray-400 transition-transform ${
                          selectedAlbum === album.id ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        {getTypeIcon(album.type)}
                        <span
                          className={`font-medium ${getTypeColor(album.type)}`}
                        >
                          {album.items} items
                        </span>
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        {album.size}
                      </div>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {album.lastUpdated}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {albums.map((album) => (
              <div
                key={album.id}
                className={`group flex items-center p-4 rounded-xl transition-all ${
                  selectedAlbum === album.id
                    ? "bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-lg bg-linear-to-br ${album.color} flex items-center justify-center shrink-0`}
                >
                  <div className="text-2xl">📁</div>
                </div>

                <div className="flex-1 ml-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white">
                        {album.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {album.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      {album.featured && (
                        <div className="px-3 py-1 bg-linear-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
                          FEATURED
                        </div>
                      )}
                      <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 mt-2 text-sm">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(album.type)}
                      <span
                        className={`font-medium ${getTypeColor(album.type)}`}
                      >
                        {album.type.charAt(0).toUpperCase() +
                          album.type.slice(1)}
                      </span>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {album.items} items
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {album.size}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      Updated {album.lastUpdated}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setSelectedAlbum(
                      album.id === selectedAlbum ? null : album.id
                    )
                  }
                  className="ml-4 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                >
                  <ChevronRight
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      selectedAlbum === album.id ? "rotate-90" : ""
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Selected Album Details */}
        {selectedAlbum !== null && (
          <div className="mt-8 bg-linear-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {albums.find((a) => a.id === selectedAlbum)?.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {albums.find((a) => a.id === selectedAlbum)?.description}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-lg transition-colors">
                  <Edit className="w-4 h-4 inline mr-2" />
                  Edit
                </button>
                <button className="px-4 py-2 bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4 inline mr-2" />
                  Delete
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-3">
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center"
                    >
                      <div className="text-2xl">📸</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Album Info
                  </div>
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Type
                      </span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        {albums.find((a) => a.id === selectedAlbum)?.type}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Items
                      </span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        {albums.find((a) => a.id === selectedAlbum)?.items}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Size
                      </span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        {albums.find((a) => a.id === selectedAlbum)?.size}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Updated
                      </span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        {
                          albums.find((a) => a.id === selectedAlbum)
                            ?.lastUpdated
                        }
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-lg transition-all">
                  View All Items
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
