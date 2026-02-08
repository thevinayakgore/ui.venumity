"use client";
import { useState, useEffect, useCallback } from "react";

export default function InfiniteScroll() {
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadItems = useCallback(async () => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newItems = Array.from(
        { length: 10 },
        (_, i) => `Item ${(page - 1) * 10 + i + 1}`
      );

      setItems((prev) => [...prev, ...newItems]);
      setLoading(false);
    }, 1000);
  }, [page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadItems();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadItems]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                {index + 1}
              </div>
              <div className="font-medium text-gray-800 dark:text-gray-200">
                {item}
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Loading more items...
          </p>
        </div>
      )}
    </div>
  );
}
