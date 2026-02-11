"use client";
import { motion } from "framer-motion";
import { Star, TrendingUp, Zap } from "lucide-react";

export default function ProductGrid8_4() {
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Headphones",
      category: "Electronics",
      price: 299.99,
      rating: 4.9,
      featured: true,
      color: "from-blue-600 to-cyan-500",
    },
    {
      id: 2,
      name: "Smart Watch Pro",
      category: "Wearables",
      price: 399.99,
      rating: 4.8,
      featured: false,
      color: "from-gray-800 to-gray-600",
    },
    {
      id: 3,
      name: "Wireless Speaker",
      category: "Audio",
      price: 199.99,
      rating: 4.7,
      featured: false,
      color: "from-purple-600 to-pink-500",
    },
    {
      id: 4,
      name: "Gaming Console",
      category: "Gaming",
      price: 499.99,
      rating: 4.9,
      featured: true,
      color: "from-green-600 to-emerald-500",
    },
  ];

  const regularProducts = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 5,
    name: `Product ${i + 5}`,
    category: ["Tech", "Home", "Sports", "Fashion"][i % 4],
    price: 49.99 + i * 20,
    rating: 4.0 + (i % 5) * 0.2,
    featured: false,
    color: ["bg-blue-100", "bg-green-100", "bg-purple-100", "bg-amber-100"][
      i % 4
    ],
  }));

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Featured Products
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Handpicked selection of our best products
        </p>
      </div>

      {/* Featured Products */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {featuredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-linear-to-r ${
              product.color
            } rounded-2xl overflow-hidden shadow-xl ${
              product.featured ? "md:row-span-2" : ""
            }`}
          >
            <div className="p-6 md:p-8 text-white h-full flex flex-col">
              {/* Badge */}
              {product.featured && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-4 self-start">
                  <TrendingUp className="w-4 h-4" />
                  <span>FEATURED</span>
                </div>
              )}

              {/* Product Info */}
              <div className="mb-4">
                <div className="text-white/80 text-sm mb-1">
                  {product.category}
                </div>
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-white text-white"
                            : "text-white/40"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white/80">({product.rating})</span>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="mt-auto">
                <div className="text-4xl font-bold mb-4">
                  ${product.price.toFixed(2)}
                </div>
                <button className="w-full py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition">
                  Shop Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Regular Products Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          More Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {regularProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden"
            >
              {/* Product Image */}
              <div className={`h-48 ${product.color} dark:opacity-80`} />

              {/* Product Info */}
              <div className="p-4">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {product.category}
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h3>

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
      </div>
    </main>
  );
}
