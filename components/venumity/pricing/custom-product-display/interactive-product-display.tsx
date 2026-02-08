"use client";
import { useState } from "react";
import {
  Star,
  Heart,
  ShoppingCart,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Package,
  Shield,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";

export default function CustomProductDisplay2_1() {
  const [selectedColor, setSelectedColor] = useState("space-gray");
  const [selectedSize, setSelectedSize] = useState("m");
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const product = {
    name: "Premium Wireless Headphones",
    description:
      "Experience immersive sound with our noise-cancelling wireless headphones. Perfect for music lovers and professionals alike.",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 1247,
    colors: [
      { id: "space-gray", name: "Space Gray", class: "bg-gray-800" },
      { id: "midnight-blue", name: "Midnight Blue", class: "bg-blue-900" },
      { id: "arctic-white", name: "Arctic White", class: "bg-gray-100" },
      { id: "forest-green", name: "Forest Green", class: "bg-green-800" },
    ],
    sizes: [
      { id: "s", name: "S" },
      { id: "m", name: "M" },
      { id: "l", name: "L" },
      { id: "xl", name: "XL" },
    ],
    features: [
      { icon: Package, text: "Free shipping worldwide" },
      { icon: Shield, text: "2-year warranty included" },
      { icon: Truck, text: "Delivery in 3-5 days" },
    ],
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w-800",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800",
    ],
  };

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-xl bg-linear-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
                    }`}
                  />
                </button>
              </div>

              <div className="absolute bottom-4 right-4 z-10">
                <button className="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg">
                  <ZoomIn className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() =>
                  setCurrentImage(
                    (prev) =>
                      (prev - 1 + product.images.length) % product.images.length
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>

              <button
                onClick={() =>
                  setCurrentImage((prev) => (prev + 1) % product.images.length)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg"
              >
                <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>

              {/* Image Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-2 h-2 rounded-full transition ${
                      currentImage === index
                        ? "bg-blue-600"
                        : "bg-gray-300 dark:bg-gray-700"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-3">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`flex-1 aspect-square rounded-lg bg-gray-200 dark:bg-gray-800 overflow-hidden transition ${
                    currentImage === index ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <div className="w-full h-full bg-linear-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 dark:text-gray-700"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    {product.rating}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({product.reviews.toLocaleString()} reviews)
                  </span>
                </div>
                <div className="px-3 py-1 bg-red-100 dark:bg-red-900/30 rounded-full">
                  <span className="text-red-600 dark:text-red-400 font-semibold">
                    {discount}% OFF
                  </span>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xl text-gray-400 dark:text-gray-600 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Color:{" "}
                <span className="font-normal capitalize">
                  {selectedColor.replace("-", " ")}
                </span>
              </h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`relative p-1 rounded-full ${
                      selectedColor === color.id ? "ring-2 ring-blue-500" : ""
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full ${color.class}`} />
                    <span className="sr-only">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Size
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size.id)}
                    className={`px-6 py-3 rounded-lg border-2 font-medium transition ${
                      selectedSize === size.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 text-gray-900 dark:text-white font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    +
                  </button>
                </div>

                <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-3 transition">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </button>
              </div>

              <button className="w-full py-3 border-2 border-gray-900 dark:border-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-900 hover:text-white dark:hover:bg-gray-800 transition">
                Buy Now
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              {product.features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex p-3 bg-gray-100 dark:bg-gray-800 rounded-lg mb-2">
                    <feature.icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
