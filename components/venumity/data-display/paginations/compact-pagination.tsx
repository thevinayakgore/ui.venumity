import React, { useState } from "react";

export default function CompactPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 25;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageRange = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Compact Pagination</h2>

      <div className="space-y-6">
        {/* Page indicator */}
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {currentPage}
          </div>
          <div className="text-gray-500">of {totalPages} pages</div>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center justify-center space-x-2">
          {/* First page */}
          <button
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            className="p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            ⇤
          </button>

          {/* Previous page */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            ←
          </button>

          {/* Page numbers */}
          <div className="flex items-center space-x-1">
            {getPageRange().map((page, index) => (
              <React.Fragment key={index}>
                {page === "..." ? (
                  <span className="px-2 py-1">...</span>
                ) : (
                  <button
                    onClick={() => goToPage(page as number)}
                    className={`w-8 h-8 flex items-center justify-center rounded ${
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

          {/* Next page */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            →
          </button>

          {/* Last page */}
          <button
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
            className="p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            ⇥
          </button>
        </div>

        {/* Quick jump */}
        <div className="flex items-center justify-center space-x-2">
          <span className="text-sm text-gray-500">Go to:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              const page = parseInt(e.target.value);
              if (!isNaN(page)) {
                goToPage(Math.max(1, Math.min(totalPages, page)));
              }
            }}
            className="w-20 px-3 py-1 border rounded text-center"
          />
          <button
            onClick={() => goToPage(currentPage)}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Go
          </button>
        </div>

        {/* Progress indicator */}
        <div className="pt-4">
          <div className="text-sm text-gray-500 mb-2">Progress</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentPage / totalPages) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Page 1</span>
            <span>{Math.round((currentPage / totalPages) * 100)}%</span>
            <span>Page {totalPages}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
