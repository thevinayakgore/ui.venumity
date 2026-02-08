"use client";
import { useState } from "react";
import { Loader, ChevronDown, RefreshCw } from "lucide-react";

export default function PaginationWithLoadMore() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const totalPages = 5;
  const itemsPerPage = 8;

  const initialItems = Array.from({ length: itemsPerPage }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    description: `Description for item ${i + 1}`,
  }));

  const [items, setItems] = useState(initialItems);

  const loadMoreItems = () => {
    if (currentPage >= totalPages || isLoading) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newItems = Array.from({ length: itemsPerPage }, (_, i) => ({
        id: items.length + i + 1,
        name: `Item ${items.length + i + 1}`,
        description: `Description for item ${items.length + i + 1}`,
      }));

      setItems((prev) => [...prev, ...newItems]);
      setCurrentPage((prev) => prev + 1);

      if (currentPage + 1 >= totalPages) {
        setHasMore(false);
      }

      setIsLoading(false);
    }, 1000);
  };

  const resetPagination = () => {
    setItems(initialItems);
    setCurrentPage(1);
    setHasMore(true);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Pagination with Load More
      </h3>

      {/* Items List */}
      <div className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 dark:text-white mb-1">
                {item.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {item.description}
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore ? (
          <button
            onClick={loadMoreItems}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                <span>Load More ({itemsPerPage} items)</span>
              </>
            )}
          </button>
        ) : (
          <div className="text-center py-4">
            <div className="text-gray-500 dark:text-gray-400 mb-2">
              No more items to load
            </div>
            <button
              onClick={resetPagination}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset & Load Again</span>
            </button>
          </div>
        )}
      </div>

      {/* Progress Info */}
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <div>
          Showing{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            {items.length}
          </span>{" "}
          items
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${(currentPage / totalPages) * 100}%` }}
              />
            </div>
            <span>
              Page {currentPage}/{totalPages}
            </span>
          </div>

          <div>
            {hasMore
              ? `${totalPages - currentPage} pages remaining`
              : "All pages loaded"}
          </div>
        </div>
      </div>
    </div>
  );
}
