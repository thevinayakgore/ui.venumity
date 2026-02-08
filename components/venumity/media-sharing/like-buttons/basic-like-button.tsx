"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function BasicLikeButton() {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(124);

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikes((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikes((prev) => prev + 1);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
          {/* Content Preview */}
          <div className="mb-8">
            <div className="h-48 bg-linear-to-br from-blue-400 to-purple-500 rounded-xl mb-4 flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                Awesome Content
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              The Future of Web Development
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Discover the latest trends and technologies shaping the future of
              web development.
            </p>
          </div>

          {/* Like Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
                className={`p-3 rounded-full ${
                  isLiked
                    ? "bg-red-50 dark:bg-red-900/20 text-red-600"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
              </motion.button>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {likes}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Likes
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Liked by
              </div>
              <div className="flex items-center">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-linear-to-br from-yellow-400 to-orange-500 border-2 border-white dark:border-gray-900"
                    style={{ marginLeft: i > 1 ? "-8px" : "0" }}
                  ></div>
                ))}
                <div className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  +{Math.floor(likes / 10)} others
                </div>
              </div>
            </div>
          </div>

          {/* Status Message */}
          <div className="mt-8 text-center">
            {isLiked ? (
              <p className="text-red-600">❤️ You liked this content</p>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                Click the heart to like this content
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.main>
  );
}
