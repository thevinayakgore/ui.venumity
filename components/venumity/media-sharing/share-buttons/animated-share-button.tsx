"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, X, Copy, Check, ExternalLink, Sparkles } from "lucide-react";

export default function AnimatedShareButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPositions, setConfettiPositions] = useState<{ x: number }[]>([]);

  const shareUrl = "https://example.com/awesome-content";
  const shareTitle = "Amazing content you need to see!";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setShowConfetti(true);
      setTimeout(() => {
        setIsCopied(false);
        setShowConfetti(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    if (showConfetti) {
      setTimeout(() => {
      const positions = Array.from({ length: 20 }, () => ({ x: Math.random() * 100 - 50 }));
      setConfettiPositions(positions);
      const timer = setTimeout(() => { setConfettiPositions([]);
      }, 1500);
      return () => clearTimeout(timer);
    }, 0);
    }
  }, [showConfetti]);

  const shareOptions = [
    {
      platform: "Twitter",
      color: "bg-sky-500 hover:bg-sky-600",
      action: () =>
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            shareUrl
          )}&text=${encodeURIComponent(shareTitle)}`,
          "_blank"
        ),
    },
    {
      platform: "Facebook",
      color: "bg-blue-600 hover:bg-blue-700",
      action: () =>
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
          )}`,
          "_blank"
        ),
    },
    {
      platform: "LinkedIn",
      color: "bg-blue-700 hover:bg-blue-800",
      action: () =>
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            shareUrl
          )}`,
          "_blank"
        ),
    },
    {
      platform: "Copy",
      color: isCopied
        ? "bg-green-600 hover:bg-green-700"
        : "bg-gray-800 hover:bg-gray-900",
      action: copyToClipboard,
      icon: isCopied ? <Check size={20} /> : <Copy size={20} />,
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
          {/* Content Header */}
          <div className="mb-8">
            <div className="h-32 bg-linear-to-br from-purple-500 to-pink-600 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
              <span className="text-white text-xl font-bold z-10">
                Special Content
              </span>
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Revolutionary Technology Unveiled
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Discover the future of innovation with our latest breakthrough.
            </p>
          </div>

          {/* URL Display */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Share this link:
              </span>
              <ExternalLink size={16} className="text-gray-500" />
            </div>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="text-sm text-gray-700 dark:text-gray-300 truncate">
                {shareUrl}
              </div>
            </motion.div>
          </div>

          {/* Animated Share Button */}
          <div className="relative">
            {/* Main Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-medium text-lg ${
                isExpanded
                  ? "bg-linear-to-r from-purple-600 to-pink-600 text-white"
                  : "bg-linear-to-r from-blue-600 to-purple-600 text-white"
              }`}
            >
              {isExpanded ? (
                <>
                  <X size={24} />
                  <span>Close Options</span>
                </>
              ) : (
                <>
                  <Share2 size={24} />
                  <span>Share This Content</span>
                </>
              )}
            </motion.button>

            {/* Expanded Options */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  className="mt-4 space-y-2"
                >
                  {shareOptions.map((option, index) => (
                    <motion.button
                      key={option.platform}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={option.action}
                      className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-medium text-white ${option.color}`}
                    >
                      {option.icon || <span>{option.platform}</span>}
                      {option.icon ? (
                        <span>{isCopied ? "Copied!" : "Copy Link"}</span>
                      ) : (
                        <span>Share on {option.platform}</span>
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Confetti Effect */}
            <AnimatePresence>
              {showConfetti && (
                <div className="absolute inset-0 pointer-events-none">
                  {confettiPositions.map((pos, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      initial={{
                        y: 0,
                        x: pos.x,
                        opacity: 1,
                        rotate: 0,
                      }}
                      animate={{
                        y: -100,
                        x: pos.x,
                        opacity: 0,
                        rotate: 360,
                      }}
                      transition={{
                        duration: 1.5,
                        ease: "easeOut",
                      }}
                    >
                      <Sparkles size={20} className="text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Share Stats */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  2.4K
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Total Shares
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  156
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Today
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  +24%
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Growth
                </div>
              </div>
            </div>
          </div>

          {/* Status Message */}
          <AnimatePresence>
            {isCopied && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800"
              >
                <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <Check size={20} />
                  <span className="font-medium">Link copied to clipboard!</span>
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  You can now paste it anywhere
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.main>
  );
}
