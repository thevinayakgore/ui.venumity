"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, SkipForward, SkipBack } from "lucide-react";

export default function PaginationWithJumpToPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpToPage, setJumpToPage] = useState("");

  const totalPages = 20;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleJump = () => {
    const pageNum = parseInt(jumpToPage);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      goToPage(pageNum);
      setJumpToPage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleJump();
    }
  };

  const getPageRange = () => {
    const range = [];
    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);

    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Pagination with Jump To Page
      </h3>

      <div className="flex flex-col space-y-6">
        {/* Quick Navigation */}
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <SkipBack className="w-4 h-4" />
            <span className="text-sm">First</span>
          </button>

          <button
            onClick={() => goToPage(Math.max(1, currentPage - 5))}
            disabled={currentPage <= 5}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            -5
          </button>

          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {getPageRange().map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-9 h-9 rounded-lg text-sm font-medium ${
                  currentPage === page
                    ? "bg-primary text-white"
                    : "border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
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

          <button
            onClick={() => goToPage(Math.min(totalPages, currentPage + 5))}
            disabled={currentPage >= totalPages - 4}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            +5
          </button>

          <button
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span className="text-sm">Last</span>
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Jump to Page */}
        <div className="flex items-center justify-center space-x-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Jump to page:
          </span>

          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="1"
              max={totalPages}
              value={jumpToPage}
              onChange={(e) => setJumpToPage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-20 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center"
              placeholder="Page #"
            />

            <button
              onClick={handleJump}
              className="px-4 py-1.5 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Go
            </button>
          </div>
        </div>

        {/* Page Info */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          Page{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            {currentPage}
          </span>{" "}
          of{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            {totalPages}
          </span>
        </div>
      </div>
    </div>
  );
}
