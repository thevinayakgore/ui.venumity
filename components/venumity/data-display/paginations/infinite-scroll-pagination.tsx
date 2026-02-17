import { useState, useEffect, useRef, useCallback, useMemo } from "react";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  readTime: string;
}

export default function InfiniteScrollPagination() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(
    () => ["Technology", "Business", "Science", "Health", "Entertainment"],
    []
  );

  const generateArticles = useCallback((): NewsArticle[] => {
    return Array.from({ length: 10 }, (_, i) => {
      const id = crypto.randomUUID(); // globally unique ID
      return {
        id,
        title: `Article Title ${id}: The Future of ${
          categories[i % categories.length]
        }`,
        summary: `This is a summary of article ${id} discussing important developments in the field.`,
        date: `April ${15 + (i % 15)}, 2024`,
        category: categories[i % categories.length],
        readTime: `${5 + (i % 10)} min read`,
      };
    });
  }, [categories]);

  const loadArticles = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newArticles = generateArticles();

      if (page >= 5) {
        // Simulate reaching the end
        setHasMore(false);
      } else {
        setArticles((prev) => [...prev, ...newArticles]);
        setPage((prev) => prev + 1);
      }

      setLoading(false);
    }, 1000);
  }, [page, loading, hasMore, generateArticles]);

  useEffect(() => {
    setTimeout(() => {
      loadArticles();
    }, 0);
  }, [loadArticles]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadArticles();
        }
      },
      { threshold: 0.5 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadArticles, hasMore, loading]);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Technology: "bg-blue-100 text-blue-800",
      Business: "bg-green-100 text-green-800",
      Science: "bg-purple-100 text-purple-800",
      Health: "bg-red-100 text-red-800",
      Entertainment: "bg-yellow-100 text-yellow-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border max-w-2xl mx-auto overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">News Feed</h2>
        <p className="text-gray-500">Scroll to load more articles</p>
      </div>

      <div className="h-[600px] overflow-y-auto">
        <div className="p-4 space-y-4">
          {articles.map((article) => (
            <div
              key={article.id}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                    article.category
                  )}`}
                >
                  {article.category}
                </span>
                <span className="text-sm text-gray-500">
                  {article.readTime}
                </span>
              </div>
              <h3 className="font-bold text-lg mb-2">{article.title}</h3>
              <p className="text-gray-600 mb-3">{article.summary}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{article.date}</span>
                <button className="text-blue-600 hover:text-blue-800">
                  Read more →
                </button>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-500">Loading more articles...</p>
            </div>
          )}

          {/* Load more trigger */}
          <div ref={loadMoreRef} className="h-10" />

          {/* End of content */}
          {!hasMore && !loading && (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-semibold mb-2">All caught up!</h3>
              <p className="text-gray-500">
                You have reached the end of the feed
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t flex items-center justify-between text-sm text-gray-500">
        <span>{articles.length} articles loaded</span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-blue-600 hover:text-blue-800"
        >
          Back to top ↑
        </button>
      </div>
    </div>
  );
}
