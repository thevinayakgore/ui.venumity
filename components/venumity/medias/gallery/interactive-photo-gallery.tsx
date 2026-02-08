"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Heart,
  Download,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const photos = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Nature Shot ${i + 1}`,
  category: ["Landscape", "Wildlife", "Macro", "Urban"][i % 4],
  likes: Math.floor(Math.random() * 1000) + 100,
  downloads: Math.floor(Math.random() * 500) + 50,
  color: [
    "from-blue-500 to-cyan-400",
    "from-emerald-500 to-teal-400",
    "from-amber-500 to-orange-400",
    "from-purple-500 to-pink-400",
    "from-rose-500 to-red-400",
    "from-violet-500 to-indigo-400",
  ][i % 6],
  featured: i % 4 === 0,
}));

export default function Gallery_5_1() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [layout, setLayout] = useState<"grid" | "masonry" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    "All",
    "Landscape",
    "Wildlife",
    "Macro",
    "Urban",
    "Featured",
  ];

  const filteredPhotos = photos.filter((photo) => {
    const matchesSearch = photo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory ||
      selectedCategory === "All" ||
      (selectedCategory === "Featured"
        ? photo.featured
        : photo.category === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const openLightbox = (id: number) => {
    setSelectedPhoto(id);
    setCurrentIndex(photos.findIndex((p) => p.id === id));
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const toggleLike = (id: number) => {
    setLikedPhotos((prev) =>
      prev.includes(id)
        ? prev.filter((photoId) => photoId !== id)
        : [...prev, id]
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhoto !== null) {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") nextPhoto();
        if (e.key === "ArrowLeft") prevPhoto();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Photo Gallery
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Explore stunning photography from around the world
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search photos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
              />
            </div>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              {(["grid", "masonry", "list"] as const).map((view) => (
                <button
                  key={view}
                  onClick={() => setLayout(view)}
                  className={`px-4 py-2 rounded-md transition-all ${
                    layout === view
                      ? "bg-white dark:bg-gray-700 shadow-sm"
                      : "hover:bg-white/50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <span className="capitalize text-sm font-medium text-gray-800 dark:text-white">
                    {view}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(
                  category === selectedCategory ? null : category
                )
              }
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === category
                  ? "bg-linear-to-r from-blue-600 to-cyan-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div
          className={`${
            layout === "grid"
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              : layout === "masonry"
              ? "columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
              : "space-y-4"
          }`}
        >
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
                layout === "list"
                  ? "flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800/50"
                  : "break-inside-avoid"
              }`}
            >
              {/* Photo Card */}
              <div
                onClick={() => openLightbox(photo.id)}
                className={`${
                  layout === "list" ? "w-24 h-24 shrink-0" : "aspect-square"
                } cursor-pointer relative`}
              >
                <div
                  className={`h-full rounded-lg bg-linear-to-br ${photo.color} flex items-center justify-center`}
                >
                  <div className="text-4xl opacity-80">📸</div>
                  {photo.featured && (
                    <div className="absolute top-2 right-2">
                      <div className="px-2 py-1 bg-linear-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded">
                        FEATURED
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Info Overlay */}
              <div
                className={`${
                  layout === "list"
                    ? "flex-1"
                    : "absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4"
                }`}
              >
                <div
                  className={`${
                    layout === "list" ? "" : "absolute bottom-4 left-4 right-4"
                  }`}
                >
                  <h3 className="font-bold text-white text-lg mb-1">
                    {photo.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs text-white">
                        {photo.category}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(photo.id);
                          }}
                          className="flex items-center space-x-1 hover:opacity-80"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              likedPhotos.includes(photo.id)
                                ? "fill-red-500 text-red-500"
                                : "text-white"
                            }`}
                          />
                          <span className="text-white text-sm">
                            {photo.likes}
                          </span>
                        </button>
                        <div className="flex items-center space-x-1">
                          <Download className="w-4 h-4 text-white" />
                          <span className="text-white text-sm">
                            {photo.downloads}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-1.5 hover:bg-white/20 rounded transition-colors">
                        <Download className="w-4 h-4 text-white" />
                      </button>
                      <button className="p-1.5 hover:bg-white/20 rounded transition-colors">
                        <Share2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-gray-800 dark:text-white">
              {photos.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Total Photos</div>
          </div>
          <div className="bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-gray-800 dark:text-white">
              {photos.filter((p) => p.featured).length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Featured</div>
          </div>
          <div className="bg-linear-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-gray-800 dark:text-white">
              {likedPhotos.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Liked</div>
          </div>
          <div className="bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-gray-800 dark:text-white">
              {categories.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Categories</div>
          </div>
        </div>

        {/* Lightbox */}
        {selectedPhoto !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-6xl w-full max-h-[90vh]">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Photo Display */}
              <div className="h-full flex flex-col lg:flex-row gap-6">
                {/* Main Image */}
                <div className="flex-1 relative rounded-xl overflow-hidden">
                  <div
                    className={`h-[60vh] bg-linear-to-br ${photos[currentIndex].color} flex items-center justify-center`}
                  >
                    <div className="text-8xl">📸</div>
                  </div>
                </div>

                {/* Photo Info */}
                <div className="lg:w-96 bg-gray-900/50 backdrop-blur-sm rounded-xl p-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {photos[currentIndex].title}
                      </h2>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white">
                          {photos[currentIndex].category}
                        </span>
                        {photos[currentIndex].featured && (
                          <span className="px-3 py-1 bg-linear-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-full">
                            FEATURED
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white">
                          {photos[currentIndex].likes}
                        </div>
                        <div className="text-gray-400">Likes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white">
                          {photos[currentIndex].downloads}
                        </div>
                        <div className="text-gray-400">Downloads</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => toggleLike(photos[currentIndex].id)}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            likedPhotos.includes(photos[currentIndex].id)
                              ? "fill-red-500 text-red-500"
                              : ""
                          }`}
                        />
                        <span>
                          {likedPhotos.includes(photos[currentIndex].id)
                            ? "Unlike"
                            : "Like"}{" "}
                          Photo
                        </span>
                      </button>
                      <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-lg transition-all">
                        <Download className="w-5 h-5" />
                        <span>Download HD</span>
                      </button>
                      <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                        <Share2 className="w-5 h-5" />
                        <span>Share</span>
                      </button>
                    </div>

                    {/* Thumbnails */}
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex space-x-2 overflow-x-auto pb-2">
                        {photos.map((photo, index) => (
                          <button
                            key={photo.id}
                            onClick={() => setCurrentIndex(index)}
                            className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden ${
                              index === currentIndex
                                ? "ring-2 ring-blue-500"
                                : "opacity-70 hover:opacity-100"
                            }`}
                          >
                            <div
                              className={`w-full h-full bg-linear-to-br ${photo.color}`}
                            />
                          </button>
                        ))}
                      </div>
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
