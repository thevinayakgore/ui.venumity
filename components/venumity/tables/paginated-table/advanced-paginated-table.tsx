"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react";

const analytics = Array.from({ length: 75 }, (_, i) => ({
  id: i + 1,
  date: `2024-01-${String((i % 31) + 1).padStart(2, "0")}`,
  page: ["Home", "Products", "About", "Contact", "Blog"][i % 5],
  visits: Math.floor(Math.random() * 1000),
  uniqueVisitors: Math.floor(Math.random() * 800),
  bounceRate: `${(Math.random() * 50 + 20).toFixed(1)}%`,
  avgTime: `${Math.floor(Math.random() * 10)}m ${Math.floor(
    Math.random() * 60
  )}s`,
}));

export default function AdvancedPaginatedTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Filter data
  let filteredData = [...analytics];
  if (filter !== "all") {
    filteredData = filteredData.filter((item) => item.page === filter);
  }

  // Sort data
  filteredData.sort((a, b) => {
    if (sortBy === "date") {
      return sortOrder === "asc"
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date);
    } else if (sortBy === "visits") {
      return sortOrder === "asc" ? a.visits - b.visits : b.visits - a.visits;
    } else if (sortBy === "page") {
      return sortOrder === "asc"
        ? a.page.localeCompare(b.page)
        : b.page.localeCompare(a.page);
    }
    return 0;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  const resetFilters = () => {
    setFilter("all");
    setSortBy("date");
    setSortOrder("desc");
    setCurrentPage(1);
  };

  const exportData = () => {
    console.log("Exporting data:", filteredData);
    alert(`Exporting ${filteredData.length} rows of data`);
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-10 p-6 sm:p-10 md:py-14 max-w-7xl w-full h-full"
    >
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Advanced Paginated Table
        </h2>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Filter by:
              </span>
              <select
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-black text-gray-700 dark:text-gray-300"
              >
                <option value="all">All Pages</option>
                <option value="Home">Home</option>
                <option value="Products">Products</option>
                <option value="About">About</option>
                <option value="Contact">Contact</option>
                <option value="Blog">Blog</option>
              </select>
            </div>

            <button
              onClick={resetFilters}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset Filters</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={exportData}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              <Download className="w-4 h-4" />
              <span>Export Data</span>
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Show:
              </span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-black text-gray-700 dark:text-gray-300"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                entries
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th
                  onClick={() => handleSort("date")}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <div className="flex items-center">
                    Date
                    {sortBy === "date" && (
                      <ChevronRight
                        className={`w-4 h-4 ml-1 transform ${
                          sortOrder === "asc" ? "rotate-270" : "rotate-90"
                        }`}
                      />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("page")}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <div className="flex items-center">
                    Page
                    {sortBy === "page" && (
                      <ChevronRight
                        className={`w-4 h-4 ml-1 transform ${
                          sortOrder === "asc" ? "rotate-270" : "rotate-90"
                        }`}
                      />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("visits")}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <div className="flex items-center">
                    Visits
                    {sortBy === "visits" && (
                      <ChevronRight
                        className={`w-4 h-4 ml-1 transform ${
                          sortOrder === "asc" ? "rotate-270" : "rotate-90"
                        }`}
                      />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Unique Visitors
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Bounce Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Avg. Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-black divide-y divide-gray-200 dark:divide-gray-800">
              {currentData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {item.page}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {item.visits}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {Math.round((item.uniqueVisitors / item.visits) * 100)}%
                      unique
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {item.uniqueVisitors}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span
                      className={
                        parseFloat(item.bounceRate) > 50
                          ? "text-red-600 dark:text-red-400"
                          : "text-green-600 dark:text-green-400"
                      }
                    >
                      {item.bounceRate}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {item.avgTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Advanced Pagination */}
        <div className="flex flex-col lg:flex-row items-center justify-between mt-6 space-y-4 lg:space-y-0">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredData.length)} of {filteredData.length}{" "}
            entries
            {filter !== "all" &&
              ` (filtered from ${analytics.length} total entries)`}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 7) {
                  pageNumber = i + 1;
                } else if (currentPage <= 4) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 3) {
                  pageNumber = totalPages - 6 + i;
                } else {
                  pageNumber = currentPage - 3 + i;
                }

                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-9 h-9 text-sm font-medium rounded-lg ${
                      currentPage === pageNumber
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              {totalPages > 7 && currentPage < totalPages - 3 && (
                <>
                  <span className="text-gray-500 dark:text-gray-400">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="w-9 h-9 text-sm font-medium border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Go to page:
            </span>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                const page = Math.max(
                  1,
                  Math.min(totalPages, parseInt(e.target.value) || 1)
                );
                setCurrentPage(page);
              }}
              className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-black text-gray-700 dark:text-gray-300 text-center"
            />
          </div>
        </div>
      </div>
    </motion.main>
  );
}
