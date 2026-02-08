"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Share2,
  Copy,
  Check,
  Facebook,
  Twitter,
  Link,
  Mail,
} from "lucide-react";

export default function BasicShareComponent() {
  const [isCopied, setIsCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const url = "https://example.com/awesome-content";
  const title = "Check out this awesome content!";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareOptions = [
    {
      icon: <Facebook size={20} />,
      label: "Facebook",
      color: "bg-blue-600 hover:bg-blue-700",
      action: () =>
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        ),
    },
    {
      icon: <Twitter size={20} />,
      label: "Twitter",
      color: "bg-sky-500 hover:bg-sky-600",
      action: () =>
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(title)}`,
          "_blank"
        ),
    },
    {
      icon: <Mail size={20} />,
      label: "Email",
      color: "bg-gray-600 hover:bg-gray-700",
      action: () =>
        window.open(
          `mailto:?subject=${encodeURIComponent(
            title
          )}&body=${encodeURIComponent(url)}`
        ),
    },
    {
      icon: isCopied ? <Check size={20} /> : <Copy size={20} />,
      label: isCopied ? "Copied!" : "Copy Link",
      color: isCopied
        ? "bg-green-600 hover:bg-green-700"
        : "bg-gray-800 hover:bg-gray-900",
      action: copyToClipboard,
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-md">
        {/* Share Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
          {/* Share Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Share2
                  className="text-blue-600 dark:text-blue-300"
                  size={24}
                />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">
                  Share this content
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Spread the word with others
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <Link size={20} />
            </button>
          </div>

          {/* URL Display */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Share URL:
              </span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <Link size={16} className="text-gray-500" />
              <input
                type="text"
                value={url}
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

          {/* Share Options */}
          <div className="grid grid-cols-2 gap-3">
            {shareOptions.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={option.action}
                className={`p-4 rounded-xl text-white flex flex-col items-center justify-center gap-2 transition-all ${option.color}`}
              >
                {option.icon}
                <span className="text-sm font-medium">{option.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Share Stats */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
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
        </div>
      </div>
    </motion.main>
  );
}
