import React, { useState } from "react";

export default function BasicPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const itemsPerPage = 5;
  const totalItems = 48;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    if (totalPages <= 7) return pages;

    if (currentPage <= 4) {
      return [...pages.slice(0, 5), "...", totalPages];
    } else if (currentPage >= totalPages - 3) {
      return [1, "...", ...pages.slice(totalPages - 5)];
    } else {
      return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      ];
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Search Results</h2>

      {/* Results info */}
      <div className="mb-6 text-gray-600">
        Showing {startItem} to {endItem} of {totalItems} results
      </div>

      {/* Sample items */}
      <div className="space-y-4 mb-8">
        {Array.from({ length: itemsPerPage }, (_, i) => (
          <div
            key={i}
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="font-medium">Result #{startItem + i}</div>
            <div className="text-sm text-gray-500">
              Sample description for result {startItem + i}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <div className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </div>

        <div className="flex items-center space-x-2">
          {/* Previous button */}
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-2 border rounded-lg flex items-center space-x-1 ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span>←</span>
            <span>Previous</span>
          </button>

          {/* Page numbers */}
          <div className="flex items-center space-x-1">
            {getVisiblePages().map((page, index) => (
              <React.Fragment key={index}>
                {page === "..." ? (
                  <span className="px-3 py-2 text-gray-400">...</span>
                ) : (
                  <button
                    onClick={() => setCurrentPage(page as number)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "border text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className={`px-3 py-2 border rounded-lg flex items-center space-x-1 ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span>Next</span>
            <span>→</span>
          </button>
        </div>

        {/* Items per page */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Show:</span>
          <select className="border rounded px-2 py-1 text-sm">
            <option>5</option>
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span className="text-sm text-gray-500">per page</span>
        </div>
      </div>
    </div>
  );
}
