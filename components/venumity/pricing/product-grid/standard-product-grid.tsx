"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star, Filter } from "lucide-react";

export default function ProductGrid8_1() {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const products = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    category: ["Electronics", "Fashion", "Home", "Sports"][i % 4],
    price: 29.99 + i * 10,
    rating: 4.0 + (i % 5) * 0.2,
    reviews: 50 + i * 10,
    isNew: i % 4 === 0,
    isSale: i % 3 === 0,
    color: ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-amber-500"][
      i % 4
    ],
  }));

  const categories = ["all", "Electronics", "Fashion", "Home", "Sports"];
  const sortOptions = [
    { id: "popular", label: "Most Popular" },
    { id: "price-low", label: "Price: Low to High" },
    { id: "price-high", label: "Price: High to Low" },
    { id: "rating", label: "Highest Rated" },
    { id: "new", label: "Newest" },
  ];

  const filteredProducts = products.filter(
    (product) => filter === "all" || product.category === filter
  );

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Our Products
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover our carefully curated collection
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === category
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-gray-900 dark:text-white focus:outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden"
          >
            {/* Product Image */}
            <div className="relative h-48">
              <div
                className={`absolute inset-0 ${product.color} flex items-center justify-center`}
              >
                <div className="text-4xl">
                  {product.category === "Electronics" && "📱"}
                  {product.category === "Fashion" && "👕"}
                  {product.category === "Home" && "🏠"}
                  {product.category === "Sports" && "⚽"}
                </div>
              </div>

              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                {product.isNew && (
                  <span className="px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded">
                    NEW
                  </span>
                )}
                {product.isSale && (
                  <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded">
                    SALE
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="absolute top-3 right-3 space-y-2">
                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                  <ShoppingCart className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {product.category}
              </div>

              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 dark:text-gray-700"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ({product.reviews})
                </span>
              </div>

              {/* Price & Add to Cart */}
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  ${product.price.toFixed(2)}
                </span>

                <button className="px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-black dark:hover:bg-gray-700 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                page === 1
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
            →
          </button>
        </div>
      </div>
    </main>
  );
}
