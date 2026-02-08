"use client";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Star,
  Clock,
  Zap,
  TrendingUp,
  Truck,
} from "lucide-react";

export default function ProductCard7_5() {
  const products = [
    {
      id: 1,
      name: "Gaming Console",
      category: "Electronics",
      price: 499.99,
      rating: 4.9,
      status: "trending",
      stock: "In stock",
      delivery: "Free shipping",
      badge: "🔥 HOT",
    },
    {
      id: 2,
      name: "Running Shoes",
      category: "Sports",
      price: 129.99,
      rating: 4.7,
      status: "limited",
      stock: "Low stock",
      delivery: "2-day shipping",
      badge: "⚡ LIMITED",
    },
    {
      id: 3,
      name: "Coffee Machine",
      category: "Home",
      price: 349.99,
      rating: 4.8,
      status: "new",
      stock: "In stock",
      delivery: "Free shipping",
      badge: "🆕 NEW",
    },
    {
      id: 4,
      name: "Desk Chair",
      category: "Furniture",
      price: 299.99,
      rating: 4.6,
      status: "sale",
      stock: "In stock",
      delivery: "Free assembly",
      badge: "💰 SALE",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "trending":
        return "from-orange-500 to-red-500";
      case "limited":
        return "from-purple-500 to-pink-500";
      case "new":
        return "from-blue-500 to-cyan-500";
      case "sale":
        return "from-green-500 to-emerald-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "trending":
        return <TrendingUp className="w-4 h-4" />;
      case "limited":
        return <Clock className="w-4 h-4" />;
      case "new":
        return <Zap className="w-4 h-4" />;
      case "sale":
        return <TrendingUp className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden group"
          >
            {/* Status Badge */}
            <div
              className={`bg-linear-to-r ${getStatusColor(
                product.status
              )} text-white text-sm font-semibold py-2 px-4 flex items-center justify-between`}
            >
              <div className="flex items-center gap-2">
                {getStatusIcon(product.status)}
                <span>{product.badge}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-current" />
                <span>{product.rating}</span>
              </div>
            </div>

            {/* Product Image */}
            <div className="h-48 bg-linear-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 relative">
              {/* Delivery Badge */}
              <div className="absolute bottom-3 left-3">
                <div className="flex items-center gap-2 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm">
                  <Truck className="w-4 h-4" />
                  <span>{product.delivery}</span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {product.category}
              </div>

              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                {product.name}
              </h3>

              {/* Stock Status */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`flex items-center gap-2 ${
                    product.stock === "Low stock"
                      ? "text-orange-600 dark:text-orange-400"
                      : "text-green-600 dark:text-green-400"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      product.stock === "Low stock"
                        ? "bg-orange-500"
                        : "bg-green-500"
                    }`}
                  />
                  <span className="text-sm font-medium">{product.stock}</span>
                </div>

                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              {/* Add to Cart Button */}
              <button className="w-full py-3 bg-gray-900 dark:bg-gray-800 text-white font-medium rounded-lg flex items-center justify-center gap-3 hover:bg-black dark:hover:bg-gray-700 transition group-hover:scale-[1.02]">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
