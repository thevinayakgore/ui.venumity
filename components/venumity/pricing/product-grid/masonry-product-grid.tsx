"use client";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";

export default function ProductGrid8_3() {
  const products = [
    {
      id: 1,
      name: "Tall Lamp",
      category: "Home",
      price: 89.99,
      height: "h-64",
      color: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      id: 2,
      name: "Wrist Watch",
      category: "Accessories",
      price: 249.99,
      height: "h-48",
      color: "bg-gray-100 dark:bg-gray-800",
    },
    {
      id: 3,
      name: "Plant Pot",
      category: "Home",
      price: 34.99,
      height: "h-56",
      color: "bg-green-100 dark:bg-green-900/30",
    },
    {
      id: 4,
      name: "Notebook Set",
      category: "Stationery",
      price: 29.99,
      height: "h-52",
      color: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 5,
      name: "Coffee Table",
      category: "Furniture",
      price: 199.99,
      height: "h-60",
      color: "bg-gray-200 dark:bg-gray-700",
    },
    {
      id: 6,
      name: "Desk Organizer",
      category: "Office",
      price: 49.99,
      height: "h-48",
      color: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      id: 7,
      name: "Wall Clock",
      category: "Decor",
      price: 79.99,
      height: "h-64",
      color: "bg-gray-100 dark:bg-gray-800",
    },
    {
      id: 8,
      name: "Throw Pillow",
      category: "Home",
      price: 39.99,
      height: "h-52",
      color: "bg-pink-100 dark:bg-pink-900/30",
    },
    {
      id: 9,
      name: "Desk Lamp",
      category: "Office",
      price: 64.99,
      height: "h-56",
      color: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      id: 10,
      name: "Bookend",
      category: "Decor",
      price: 44.99,
      height: "h-48",
      color: "bg-gray-200 dark:bg-gray-700",
    },
  ];

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="break-inside-avoid bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden"
          >
            {/* Product Image */}
            <div className={`${product.height} ${product.color} relative`}>
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
    </main>
  );
}
