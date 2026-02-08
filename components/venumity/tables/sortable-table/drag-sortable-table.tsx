"use client";
import {
  motion,
  Reorder,
  AnimatePresence,
  useDragControls,
} from "framer-motion";
import { useState } from "react";
import {
  GripVertical,
  Star,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

type App = {
  id: number;
  name: string;
  category: string;
  rating: number;
  downloads: string;
  revenue: string;
  growth: number;
  featured: boolean;
};

const initialApps: App[] = [
  {
    id: 1,
    name: "PhotoEditor Pro",
    category: "Productivity",
    rating: 4.8,
    downloads: "10M+",
    revenue: "$2.5M",
    growth: 25.4,
    featured: true,
  },
  {
    id: 2,
    name: "FitnessTracker",
    category: "Health",
    rating: 4.6,
    downloads: "5M+",
    revenue: "$1.2M",
    growth: 42.1,
    featured: true,
  },
  {
    id: 3,
    name: "Budget Planner",
    category: "Finance",
    rating: 4.3,
    downloads: "2M+",
    revenue: "$850K",
    growth: 18.7,
    featured: false,
  },
  {
    id: 4,
    name: "Language Learn",
    category: "Education",
    rating: 4.7,
    downloads: "8M+",
    revenue: "$1.8M",
    growth: 12.5,
    featured: true,
  },
  {
    id: 5,
    name: "Music Streamer",
    category: "Entertainment",
    rating: 4.4,
    downloads: "15M+",
    revenue: "$3.2M",
    growth: -3.2,
    featured: false,
  },
  {
    id: 6,
    name: "Recipe Master",
    category: "Lifestyle",
    rating: 4.2,
    downloads: "3M+",
    revenue: "$750K",
    growth: 8.9,
    featured: false,
  },
  {
    id: 7,
    name: "Travel Guide",
    category: "Travel",
    rating: 4.5,
    downloads: "6M+",
    revenue: "$1.5M",
    growth: 31.8,
    featured: true,
  },
  {
    id: 8,
    name: "Meditation App",
    category: "Health",
    rating: 4.9,
    downloads: "12M+",
    revenue: "$2.8M",
    growth: 55.3,
    featured: true,
  },
];

export default function DragSortableTable() {
  const [apps, setApps] = useState<App[]>(initialApps);
  const [sortField, setSortField] = useState<keyof App>("rating");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [isDragging, setIsDragging] = useState(false);
  const dragControls = useDragControls();

  const handleSort = (field: keyof App) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Sort apps based on current sort configuration
  const sortedApps = [...apps].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      const aNum = parseFloat(aValue.replace(/[^0-9.-]+/g, ""));
      const bNum = parseFloat(bValue.replace(/[^0-9.-]+/g, ""));

      if (!isNaN(aNum) && !isNaN(bNum)) {
        return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
      }

      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  const handleReorder = (newOrder: App[]) => {
    setApps(newOrder);
  };

  const getGrowthIcon = (growth: number) => {
    if (growth > 15) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (growth > 0) return <TrendingUp className="w-4 h-4 text-blue-500" />;
    if (growth < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                App Store Rankings
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
                Drag apps to reorder or click headers to sort. Your custom order
                is saved.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  High Growth
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Featured
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Custom Order Mode
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Drag the handle (<GripVertical className="w-4 h-4 inline" />) on
                the left to reorder apps manually
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setApps(initialApps)}
                className="px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Reset Order
              </button>
              <button
                onClick={() => handleSort("rating")}
                className="px-4 py-2 text-sm font-medium bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Sort by Rating
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-linear-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <tr>
                  <th className="w-12 px-4 sm:px-6 py-4">
                    <div className="flex items-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                      Order
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("name")}
                    className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center">
                      App Name
                      {sortField === "name" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="w-4 h-4 ml-1" />
                        ) : (
                          <ChevronDown className="w-4 h-4 ml-1" />
                        ))}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("category")}
                    className="hidden md:table-cell px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center">
                      Category
                      {sortField === "category" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="w-4 h-4 ml-1" />
                        ) : (
                          <ChevronDown className="w-4 h-4 ml-1" />
                        ))}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("rating")}
                    className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center">
                      Rating
                      {sortField === "rating" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="w-4 h-4 ml-1" />
                        ) : (
                          <ChevronDown className="w-4 h-4 ml-1" />
                        ))}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("downloads")}
                    className="hidden lg:table-cell px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center">
                      Downloads
                      {sortField === "downloads" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="w-4 h-4 ml-1" />
                        ) : (
                          <ChevronDown className="w-4 h-4 ml-1" />
                        ))}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("revenue")}
                    className="hidden sm:table-cell px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center">
                      Revenue
                      {sortField === "revenue" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="w-4 h-4 ml-1" />
                        ) : (
                          <ChevronDown className="w-4 h-4 ml-1" />
                        ))}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("growth")}
                    className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center">
                      Growth
                      {sortField === "growth" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="w-4 h-4 ml-1" />
                        ) : (
                          <ChevronDown className="w-4 h-4 ml-1" />
                        ))}
                    </div>
                  </th>
                </tr>
              </thead>
              <Reorder.Group
                as="tbody"
                axis="y"
                values={apps}
                onReorder={handleReorder}
                dragControls={dragControls}
                className="divide-y divide-gray-200 dark:divide-gray-800"
              >
                <AnimatePresence>
                  {sortedApps.map((app, index) => {
                    return (
                      <Reorder.Item
                        as="tr"
                        key={app.id}
                        value={app}
                        dragListener={false} // important
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={() => setIsDragging(false)}
                        className={`group hover:bg-linear-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800/50 dark:hover:to-gray-900/50 transition-all duration-300 ${
                          app.featured
                            ? "bg-yellow-50/50 dark:bg-yellow-900/10"
                            : ""
                        } ${isDragging ? "z-50" : ""}`}
                      >
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center">
                            <button
                              onPointerDown={(e) => {
                                dragControls.start(e);
                                setIsDragging(true);
                              }}
                              className="p-1 -ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-grab active:cursor-grabbing"
                            >
                              <GripVertical className="w-5 h-5" />
                            </button>
                            <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                              {index + 1}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center">
                            <div className="shrink-0 w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {app.name.charAt(0)}
                              </span>
                            </div>
                            <div className="ml-3 sm:ml-4">
                              <div className="flex items-center">
                                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                  {app.name}
                                </div>
                                {app.featured && (
                                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 ml-2" />
                                )}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 md:hidden">
                                {app.category}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="hidden md:table-cell px-4 sm:px-6 py-4">
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
                            {app.category}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex mr-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(app.rating)
                                      ? "text-yellow-500 fill-yellow-500"
                                      : "text-gray-300 dark:text-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                              {app.rating}
                            </span>
                          </div>
                        </td>
                        <td className="hidden lg:table-cell px-4 sm:px-6 py-4">
                          <div className="text-sm font-bold text-gray-900 dark:text-white">
                            {app.downloads}
                          </div>
                        </td>
                        <td className="hidden sm:table-cell px-4 sm:px-6 py-4">
                          <div className="text-sm font-bold text-gray-900 dark:text-white">
                            {app.revenue}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center">
                            {getGrowthIcon(app.growth)}
                            <span
                              className={`ml-2 text-sm font-bold ${
                                app.growth > 15
                                  ? "text-green-600 dark:text-green-400"
                                  : app.growth > 0
                                  ? "text-blue-600 dark:text-blue-400"
                                  : app.growth < 0
                                  ? "text-red-600 dark:text-red-400"
                                  : "text-gray-600 dark:text-gray-400"
                              }`}
                            >
                              {app.growth > 0 ? "+" : ""}
                              {app.growth}%
                            </span>
                          </div>
                        </td>
                      </Reorder.Item>
                    );
                  })}
                </AnimatePresence>
              </Reorder.Group>
            </table>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div>
            {isDragging ? "Dragging mode active • " : ""}
            Sorted by:{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {sortField === "name"
                ? "App Name"
                : sortField === "category"
                ? "Category"
                : sortField === "rating"
                ? "Rating"
                : sortField === "downloads"
                ? "Downloads"
                : sortField === "revenue"
                ? "Revenue"
                : "Growth"}
            </span>{" "}
            ({sortDirection === "asc" ? "Ascending" : "Descending"})
          </div>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
              <span>Featured App</span>
            </div>
            <div className="flex items-center">
              <GripVertical className="w-4 h-4 text-gray-400 mr-1" />
              <span>Drag to reorder</span>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
