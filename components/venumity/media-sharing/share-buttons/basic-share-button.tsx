"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Copy, Check, ExternalLink } from "lucide-react";

export default function BasicShareButton() {
  const [isCopied, setIsCopied] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const shareUrl = "https://example.com/amazing-content";
  const shareTitle = "Check out this amazing content!";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: shareTitle,
          text: "I found this amazing content!",
          url: shareUrl,
        })
        .then(() => setIsShared(true))
        .catch(console.error);
    } else {
      copyToClipboard();
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
            <div className="h-40 bg-linear-to-br from-green-400 to-blue-500 rounded-xl mb-4 flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                Featured Content
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              The Art of Modern Web Design
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Discover the principles and techniques behind beautiful,
              functional web design.
            </p>
          </div>

          {/* URL Display */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Share URL:
              </span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <ExternalLink size={16} className="text-gray-500" />
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 bg-transparent text-gray-700 dark:text-gray-300 text-sm truncate"
              />
              <button
                onClick={copyToClipboard}
                className={`px-3 py-1 text-sm rounded-lg flex items-center gap-1 ${
                  isCopied
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30"
                    : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                {isCopied ? <Check size={14} /> : <Copy size={14} />}
                {isCopied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          {/* Share Button */}
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleShare}
              className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-medium ${
                isShared
                  ? "bg-green-600 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <Share2 size={20} />
              {isShared ? "Shared Successfully!" : "Share This Content"}
            </motion.button>

            {/* Alternative Share Options */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={copyToClipboard}
                className={`py-2 rounded-lg flex items-center justify-center gap-2 ${
                  isCopied
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {isCopied ? <Check size={16} /> : <Copy size={16} />}
                {isCopied ? "Copied!" : "Copy Link"}
              </button>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  shareUrl
                )}&text=${encodeURIComponent(shareTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 bg-sky-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-sky-600"
              >
                <span className="text-sm">Tweet</span>
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  1.2K
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Shares
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  45
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Copies
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  89%
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Engagement
                </div>
              </div>
            </div>
          </div>

          {/* Status Message */}
          <div className="mt-6 text-center">
            {isShared ? (
              <p className="text-green-600">✓ Successfully shared!</p>
            ) : isCopied ? (
              <p className="text-green-600">✓ Link copied to clipboard!</p>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                Share this content with others
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.main>
  );
}
