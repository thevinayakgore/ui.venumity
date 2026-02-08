"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X } from "lucide-react";

export default function ProductGrid8_5() {
  const [filters, setFilters] = useState({
    category: [] as string[],
    priceRange: [0, 500] as [number, number],
    rating: 0,
  });
  const [showFilters, setShowFilters] = useState(false);

  const products = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    category: ["Electronics", "Fashion", "Home", "Sports"][i % 4],
    price: 29.99 + i * 40,
    rating: 3 + (i % 5),
    inStock: i % 3 !== 0,
  }));

  const categories = ["Electronics", "Fashion", "Home", "Sports"];
  const priceRanges = [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "Over $200", min: 200, max: 1000 },
  ];

  const filteredProducts = products.filter((product) => {
    // Category filter
    if (
      filters.category.length > 0 &&
      !filters.category.includes(product.category)
    ) {
      return false;
    }

    // Price range filter
    if (
      product.price < filters.priceRange[0] ||
      product.price > filters.priceRange[1]
    ) {
      return false;
    }

    // Rating filter
    if (product.rating < filters.rating) {
      return false;
    }

    return true;
  });

  const clearFilters = () => {
    setFilters({
      category: [],
      priceRange: [0, 500],
      rating: 0,
    });
  };

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Product Collection
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredProducts.length} products found
          </p>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Filter Products
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Category
                </h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.category.includes(category)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters((prev) => ({
                              ...prev,
                              category: [...prev.category, category],
                            }));
                          } else {
                            setFilters((prev) => ({
                              ...prev,
                              category: prev.category.filter(
                                (c) => c !== category
                              ),
                            }));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Price Range
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      ${filters.priceRange[0]}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      ${filters.priceRange[1]}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        priceRange: [
                          prev.priceRange[0],
                          parseInt(e.target.value),
                        ],
                      }))
                    }
                    className="w-full"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.label}
                        onClick={() =>
                          setFilters((prev) => ({
                            ...prev,
                            priceRange: [range.min, range.max],
                          }))
                        }
                        className={`px-3 py-2 text-sm rounded-lg border ${
                          filters.priceRange[0] === range.min &&
                          filters.priceRange[1] === range.max
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                            : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Minimum Rating
                </h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((stars) => (
                    <button
                      key={stars}
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          rating: prev.rating === stars ? 0 : stars,
                        }))
                      }
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg w-full ${
                        filters.rating === stars
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-4 h-4 ${
                              i < stars
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300 dark:text-gray-700"
                            }`}
                          >
                            ★
                          </div>
                        ))}
                      </div>
                      <span>& above</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={clearFilters}
                className="flex-1 py-2 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters */}
      {(filters.category.length > 0 || filters.rating > 0) && (
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.category.map((category) => (
            <button
              key={category}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  category: prev.category.filter((c) => c !== category),
                }))
              }
              className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm"
            >
              {category}
              <X className="w-3 h-3" />
            </button>
          ))}
          {filters.rating > 0 && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, rating: 0 }))}
              className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm"
            >
              Rating: {filters.rating}+ stars
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden"
            >
              {/* Product Image */}
              <div className="h-48 bg-linear-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900" />

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {product.category}
                  </div>
                  <div
                    className={`text-xs px-2 py-1 rounded ${
                      product.inStock
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      ${product.price.toFixed(2)}
                    </span>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-4 h-4 ${
                            i < product.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 dark:text-gray-700"
                          }`}
                        >
                          ★
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    disabled={!product.inStock}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                      product.inStock
                        ? "bg-gray-900 dark:bg-gray-800 text-white hover:bg-black dark:hover:bg-gray-700"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {product.inStock ? "Add to Cart" : "Sold Out"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No products found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Try adjusting your filters to find what you are looking for
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </main>
  );
}
