"use client";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";

export default function ProductCard7_2() {
  const products = [
    {
      id: 1,
      name: "Leather Notebook",
      category: "Stationery",
      price: 29.99,
      color: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      id: 2,
      name: "Desk Lamp",
      category: "Home Office",
      price: 89.99,
      color: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 3,
      name: "Water Bottle",
      category: "Fitness",
      price: 24.99,
      color: "bg-green-100 dark:bg-green-900/30",
    },
    {
      id: 4,
      name: "Canvas Tote Bag",
      category: "Accessories",
      price: 39.99,
      color: "bg-gray-100 dark:bg-gray-800",
    },
  ];

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            {/* Product Image */}
            <div
              className={`h-48 ${product.color} flex items-center justify-center`}
            >
              <div className="text-4xl">
                {product.category === "Stationery" && "📓"}
                {product.category === "Home Office" && "💡"}
                {product.category === "Fitness" && "💧"}
                {product.category === "Accessories" && "👜"}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {product.category}
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </h3>
                </div>

                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                  <Heart className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  ${product.price.toFixed(2)}
                </span>

                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
