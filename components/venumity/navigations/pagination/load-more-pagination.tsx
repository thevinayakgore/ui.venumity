"use client";
import { useState } from "react";

interface Item {
  id: number;
  title: string;
  description: string;
}

export default function LoadMorePagination() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, title: "Item 1", description: "Description for item 1" },
    { id: 2, title: "Item 2", description: "Description for item 2" },
    { id: 3, title: "Item 3", description: "Description for item 3" },
  ]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = () => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newItems = Array.from({ length: 3 }, (_, i) => ({
        id: items.length + i + 1,
        title: `Item ${items.length + i + 1}`,
        description: `Description for item ${items.length + i + 1}`,
      }));

      setItems([...items, ...newItems]);
      setLoading(false);

      // Stop loading after 15 items
      if (items.length + newItems.length >= 15) {
        setHasMore(false);
      }
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary transition-colors"
          >
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {hasMore ? (
        <div className="text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Loading...
              </span>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400 py-4">
          You have reached the end! 🎉
        </div>
      )}
    </div>
  );
}
