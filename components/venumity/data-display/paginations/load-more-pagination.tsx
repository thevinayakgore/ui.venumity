import Image from "next/image";
import { useState, useEffect, useCallback, useMemo } from "react";

interface ImageItem {
  id: string;
  title: string;
  url: string;
  category: string;
  likes: number;
  views: number;
}

export default function LoadMorePagination() {
  const categories = useMemo(
    () => ["Nature", "Architecture", "Technology", "Travel", "Food", "Art"],
    []
  );

  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const generateImages = useCallback((): ImageItem[] => {
    return Array.from({ length: 8 }, (_) => {
      const id = crypto.randomUUID();
      const category =
        categories[Math.floor(Math.random() * categories.length)];
      return {
        id,
        title: `${category} Image ${id}`,
        url: "/card.png", // always use /card.png
        category,
        likes: Math.floor(Math.random() * 1000) + 100,
        views: Math.floor(Math.random() * 5000) + 1000,
      };
    });
  }, [categories]);

  const loadMore = () => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newImages = generateImages();

      if (page >= 5) {
        // Simulate reaching the end
        setHasMore(false);
      } else {
        setTimeout(() => {
          setImages((prev) => [...prev, ...newImages]);
          setPage((prev) => prev + 1);
          setLoading(false);
        }, 0);
      }

      if (page >= 5) {
        setLoading(false);
      }
    }, 1500);
  };

  useEffect(() => {
    // Load initial data
    const initialImages = generateImages();
    setTimeout(() => {
      setImages(initialImages);
      setPage(2);
    }, 0);
  }, [generateImages]);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Nature: "bg-green-100 text-green-800",
      Architecture: "bg-blue-100 text-blue-800",
      Technology: "bg-purple-100 text-purple-800",
      Travel: "bg-yellow-100 text-yellow-800",
      Food: "bg-red-100 text-red-800",
      Art: "bg-pink-100 text-pink-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border max-w-7xl w-full m-auto overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">Photo Gallery</h2>
        <p className="text-gray-500">
          Click &quot;Load More&ldquo; to see additional images
        </p>
      </div>

      {/* Image grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {images.map((image) => (
            <div
              key={image.id}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <Image
                  src="/card.png"
                  alt={image.title}
                  width={2000}
                  height={2000}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                      image.category
                    )}`}
                  >
                    {image.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">{image.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <span>❤️</span>
                      <span>{image.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>👁️</span>
                      <span>{image.views.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load more button */}
      <div className="p-6 border-t">
        <div className="flex flex-col items-center space-y-4">
          {hasMore ? (
            <>
              <button
                onClick={loadMore}
                disabled={loading}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <span>Load More Images</span>
                    <span>↓</span>
                  </>
                )}
              </button>

              <div className="text-sm text-gray-500">
                Showing {images.length} of{" "}
                {images.length + (hasMore ? "+" : "")} images
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-semibold mb-2">All images loaded!</h3>
              <p className="text-gray-500 mb-4">
                You have reached the end of the gallery
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to top ↑
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="p-4 border-t text-sm text-gray-500 flex justify-between">
        <div>
          Page {page - 1} • {images.length} images loaded
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(
                category
              )}`}
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
