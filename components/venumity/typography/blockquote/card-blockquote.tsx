"use client";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useState } from "react";

export default function BlockquoteCard() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="max-w-2xl w-full">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between mb-4">
            <Quote className="w-10 h-10 text-gray-300 dark:text-gray-700" />
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < 4
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 dark:fill-gray-700 text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg mb-6 leading-relaxed">
            {
              "This platform has transformed the way we work. Highly recommended!"
            }
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
            <div>
              <span className="font-semibold text-gray-900 dark:text-white block">
                {"John Doe"}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 block">
                {"Product Manager"}
              </span>
            </div>

            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full transition-colors ${
                isLiked
                  ? "bg-red-50 dark:bg-red-900/20 text-red-500"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill={isLiked ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
