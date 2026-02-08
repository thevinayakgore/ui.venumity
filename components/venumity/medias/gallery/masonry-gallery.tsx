"use client";
import { useState, useRef, useEffect } from "react";
import {
  Search,
  Filter,
  Heart,
  Download,
  Share2,
  Eye,
  Grid3x3,
  Rows,
  Zap,
} from "lucide-react";

const masonryItems = [
  {
    id: 1,
    height: 300,
    title: "Mountain Peak",
    category: "Nature",
    color: "from-blue-500 to-cyan-400",
    featured: true,
  },
  {
    id: 2,
    height: 200,
    title: "City Lights",
    category: "Urban",
    color: "from-purple-500 to-pink-400",
  },
  {
    id: 3,
    height: 250,
    title: "Forest Path",
    category: "Nature",
    color: "from-emerald-500 to-teal-400",
  },
  {
    id: 4,
    height: 180,
    title: "Desert Sunset",
    category: "Landscape",
    color: "from-amber-500 to-orange-400",
    featured: true,
  },
  {
    id: 5,
    height: 220,
    title: "Ocean Waves",
    category: "Nature",
    color: "from-cyan-500 to-blue-400",
  },
  {
    id: 6,
    height: 280,
    title: "Urban Architecture",
    category: "Urban",
    color: "from-gray-600 to-gray-800",
  },
  {
    id: 7,
    height: 190,
    title: "Northern Lights",
    category: "Sky",
    color: "from-violet-500 to-indigo-400",
    featured: true,
  },
  {
    id: 8,
    height: 240,
    title: "Wildlife",
    category: "Animals",
    color: "from-green-500 to-emerald-400",
  },
  {
    id: 9,
    height: 210,
    title: "Waterfall",
    category: "Nature",
    color: "from-blue-400 to-cyan-300",
  },
  {
    id: 10,
    height: 260,
    title: "Starry Night",
    category: "Sky",
    color: "from-indigo-500 to-purple-400",
  },
  {
    id: 11,
    height: 230,
    title: "Autumn Forest",
    category: "Nature",
    color: "from-orange-500 to-amber-400",
  },
  {
    id: 12,
    height: 170,
    title: "Beach Sunset",
    category: "Landscape",
    color: "from-rose-500 to-pink-400",
  },
];

export default function Gallery_5_2() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"masonry" | "grid">("masonry");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = [
    "All",
    "Nature",
    "Urban",
    "Landscape",
    "Sky",
    "Animals",
    "Featured",
  ];

  const filteredItems = masonryItems.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory ||
      selectedCategory === "All" ||
      (selectedCategory === "Featured"
        ? item.featured
        : item.category === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const loadMoreItems = () => {
    setLoading(true);
    setTimeout(() => {
      // Simulate loading more items
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || loading) return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        loadMoreItems();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loading]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Masonry Gallery
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Beautiful photos in a dynamic layout
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-full font-medium transition-all">
                <Zap className="w-5 h-5 inline mr-2" />
                Upload Photo
              </button>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search photos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("masonry")}
                  className={`px-4 py-2 rounded-md transition-all ${
                    viewMode === "masonry"
                      ? "bg-white dark:bg-gray-700 shadow-sm"
                      : "hover:bg-white/50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <Grid3x3 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-2 rounded-md transition-all ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-gray-700 shadow-sm"
                      : "hover:bg-white/50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <Rows className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
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

        {/* Gallery Container */}
        <div ref={containerRef} className="overflow-auto h-[600px] rounded-xl">
          {viewMode === "masonry" ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="break-inside-avoid mb-4 group relative"
                  style={{ height: `${item.height}px` }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div
                    className={`h-full rounded-xl bg-linear-to-br ${item.color} relative overflow-hidden transition-transform duration-300 group-hover:scale-105`}
                  >
                    {/* Content */}
                    <div className="h-full flex flex-col justify-between p-4">
                      <div>
                        {item.featured && (
                          <div className="inline-flex items-center px-3 py-1 bg-linear-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full mb-2">
                            FEATURED
                          </div>
                        )}
                        <h3 className="text-white font-bold text-lg">
                          {item.title}
                        </h3>
                        <div className="text-white/80 text-sm">
                          {item.category}
                        </div>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div
                      className={`absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end transition-opacity duration-300 ${
                        hoveredItem === item.id ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                            <Heart className="w-5 h-5 text-white" />
                          </button>
                          <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                            <Download className="w-5 h-5 text-white" />
                          </button>
                          <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                            <Share2 className="w-5 h-5 text-white" />
                          </button>
                        </div>
                        <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                          <Eye className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="aspect-square group relative"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div
                    className={`h-full rounded-xl bg-linear-to-br ${item.color} relative overflow-hidden transition-transform duration-300 group-hover:scale-105`}
                  >
                    {/* Content */}
                    <div className="h-full flex flex-col justify-between p-4">
                      <div>
                        {item.featured && (
                          <div className="inline-flex items-center px-3 py-1 bg-linear-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full mb-2">
                            FEATURED
                          </div>
                        )}
                        <h3 className="text-white font-bold text-lg">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div
                      className={`absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end transition-opacity duration-300 ${
                        hoveredItem === item.id ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-white">
                          <div className="font-bold">{item.title}</div>
                          <div className="text-sm opacity-80">
                            {item.category}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                            <Heart className="w-4 h-4 text-white" />
                          </button>
                          <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                            <Eye className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <div className="text-gray-600 dark:text-gray-400 mt-2">
                Loading more photos...
              </div>
            </div>
          )}
        </div>

        {/* Stats Footer */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-linear-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                <Grid3x3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                  {filteredItems.length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Photos</div>
              </div>
            </div>
          </div>
          <div className="bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-linear-to-r from-purple-500 to-pink-400 flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                  {masonryItems.filter((item) => item.featured).length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Featured</div>
              </div>
            </div>
          </div>
          <div className="bg-linear-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-linear-to-r from-emerald-500 to-teal-400 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                  2.4K
                </div>
                <div className="text-gray-600 dark:text-gray-400">Likes</div>
              </div>
            </div>
          </div>
          <div className="bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-linear-to-r from-amber-500 to-orange-400 flex items-center justify-center">
                <Download className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                  1.8K
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Downloads
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
