"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Check } from "lucide-react";

export default function WishlistButton10_1() {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setIsWishlisted(!isWishlisted);

    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Add to Wishlist
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Save items for later
          </p>
        </div>

        {/* Wishlist Button */}
        <motion.button
          onClick={handleClick}
          whileTap={{ scale: 0.95 }}
          className={`relative p-4 rounded-full flex items-center gap-3 transition ${
            isWishlisted
              ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {/* Heart Icon */}
          <motion.div
            animate={{
              scale: isAnimating ? [1, 1.3, 1] : 1,
              rotate: isAnimating ? [0, -10, 10, 0] : 0,
            }}
            transition={{ duration: 0.6 }}
          >
            <Heart
              className={`w-6 h-6 ${
                isWishlisted ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </motion.div>

          {/* Button Text */}
          <span className="font-semibold">
            {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
          </span>

          {/* Checkmark Animation */}
          {isWishlisted && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
            >
              <Check className="w-3 h-3 text-white" />
            </motion.div>
          )}

          {/* Floating Hearts */}
          {isAnimating && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 1, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [1, 0.5, 0],
                    y: -50 - i * 20,
                  }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="absolute"
                >
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                </motion.div>
              ))}
            </>
          )}
        </motion.button>

        {/* Status Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isWishlisted ? 1 : 0, y: isWishlisted ? 0 : 10 }}
          className="mt-4 text-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Item saved to your wishlist
          </p>
        </motion.div>
      </div>
    </main>
  );
}
