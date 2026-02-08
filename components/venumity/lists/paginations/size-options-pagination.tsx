"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Grid, List, Settings } from "lucide-react";

export default function PaginationWithSizeOptions() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const totalItems = 96;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pageSizes = [12, 24, 48, 96];
  const viewModes = [
    { id: "grid", label: "Grid", icon: Grid },
    { id: "list", label: "List", icon: List },
  ];

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (size: number) => {
    setItemsPerPage(size);
    setCurrentPage(1); // Reset to first page when changing size
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
      const end = Math.min(totalPages, start + maxVisible - 1);

      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }

      for (let i = start; i <= end; i++) pages.push(i);

      if (start > 1) pages.unshift("...");
      if (end < totalPages) pages.push("...");
    }

    return pages;
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
        Pagination with Size Options
      </h3>

      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        {/* View Mode */}
        <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
          {viewModes.map((mode) => {
            const Icon = mode.icon;
            const isActive = viewMode === mode.id;

            return (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id as "grid" | "list")}
                className={`p-2 rounded flex items-center space-x-2 ${
                  isActive
                    ? "bg-white dark:bg-gray-900 text-primary"
                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* Items Per Page */}
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Show:
          </span>
          <div className="flex items-center space-x-1">
            {pageSizes.map((size) => (
              <button
                key={size}
                onClick={() => handleItemsPerPageChange(size)}
                className={`px-3 py-1.5 rounded text-sm font-medium ${
                  itemsPerPage === size
                    ? "bg-primary text-white"
                    : "border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Total Items */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Total:{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            {totalItems}
          </span>{" "}
          items
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Page Info */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Page{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            {currentPage}
          </span>{" "}
          of{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            {totalPages}
          </span>{" "}
          •{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, totalItems)}
          </span>{" "}
          of{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            {totalItems}
          </span>{" "}
          items
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === "number" && goToPage(page)}
                className={`min-w-10 h-10 rounded-lg text-sm font-medium ${
                  page === currentPage
                    ? "bg-primary text-white"
                    : page === "..."
                    ? "text-gray-400 cursor-default"
                    : "border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                disabled={page === "..."}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Settings */}
        <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-primary">
          <Settings className="w-4 h-4" />
          <span className="text-sm font-medium">Settings</span>
        </button>
      </div>

      {/* View Mode Preview */}
      <div
        className={`mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700`}
      >
        <div
          className={`flex items-center justify-center ${
            viewMode === "grid" ? "grid grid-cols-3 gap-3" : "space-y-2"
          }`}
        >
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`p-3 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 ${
                viewMode === "grid" ? "" : "flex items-center space-x-3"
              }`}
            >
              <div
                className={`${
                  viewMode === "grid" ? "w-full h-16" : "w-12 h-12"
                } bg-gray-100 dark:bg-gray-800 rounded mb-2`}
              />
              <div className={viewMode === "grid" ? "" : "flex-1"}>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  Item {num}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {viewMode === "grid"
                    ? "Description"
                    : "Full description text here"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
