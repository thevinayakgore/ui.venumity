"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Share2,
  Copy,
  Check,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Image as ImageIcon,
  Globe,
  Eye,
  Download,
} from "lucide-react";

interface ShareContent {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}

export default function ShareWithPreviewComponent() {
  const [isCopied, setIsCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const shareContent: ShareContent = {
    title: "The Future of Web Development",
    description:
      "Discover how modern frameworks and tools are shaping the future of web development with amazing innovations.",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
    url: "https://example.com/future-of-web-dev",
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareContent.url);
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
      color: "hover:bg-blue-100 dark:hover:bg-blue-900/30",
      textColor: "text-blue-600 dark:text-blue-400",
      action: () =>
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareContent.url
          )}`,
          "_blank"
        ),
    },
    {
      icon: <Twitter size={20} />,
      label: "Twitter",
      color: "hover:bg-sky-100 dark:hover:bg-sky-900/30",
      textColor: "text-sky-600 dark:text-sky-400",
      action: () =>
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            shareContent.url
          )}&text=${encodeURIComponent(shareContent.title)}`,
          "_blank"
        ),
    },
    {
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      color: "hover:bg-blue-100 dark:hover:bg-blue-900/30",
      textColor: "text-blue-700 dark:text-blue-300",
      action: () =>
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            shareContent.url
          )}`,
          "_blank"
        ),
    },
    {
      icon: <Mail size={20} />,
      label: "Email",
      color: "hover:bg-gray-100 dark:hover:bg-gray-800",
      textColor: "text-gray-700 dark:text-gray-300",
      action: () =>
        window.open(
          `mailto:?subject=${encodeURIComponent(
            shareContent.title
          )}&body=${encodeURIComponent(
            shareContent.description + "\n\n" + shareContent.url
          )}`
        ),
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Share2
                    className="text-blue-600 dark:text-blue-300"
                    size={24}
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Share Content
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Preview how it will look when shared
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
              >
                <Eye size={18} />
                {showPreview ? "Hide" : "Show"} Preview
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Preview Section */}
            {showPreview && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:border-r lg:border-gray-200 lg:dark:border-gray-800 lg:pr-8"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    Preview
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Globe size={14} />
                    Web Preview
                  </div>
                </div>

                {/* Link Preview Card */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                  {/* Image */}
                  <div className="h-48 bg-linear-to-r from-blue-500 to-purple-600 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageIcon size={48} className="text-white/50" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="px-2 py-1 bg-black/50 text-white text-xs rounded">
                        example.com
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Website
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                      {shareContent.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {shareContent.description}
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {shareContent.url}
                    </div>
                  </div>
                </div>

                {/* Image Preview */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      Image Preview
                    </h4>
                    <button className="flex items-center gap-1 text-sm text-blue-600">
                      <Download size={14} />
                      Download
                    </button>
                  </div>
                  <div className="h-32 bg-linear-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <ImageIcon size={32} className="text-white/50" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Share Options */}
            <div className={showPreview ? "" : "lg:col-span-2"}>
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                  Share Options
                </h3>

                {/* URL Box */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Share URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={shareContent.url}
                      readOnly
                      className="flex-1 p-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
                    />
                    <button
                      onClick={copyToClipboard}
                      className={`px-4 py-3 rounded-lg flex items-center gap-2 ${
                        isCopied
                          ? "bg-green-600 text-white"
                          : "bg-gray-800 text-white hover:bg-gray-900"
                      }`}
                    >
                      {isCopied ? <Check size={18} /> : <Copy size={18} />}
                      {isCopied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* Social Platforms */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Share on Social Media
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {shareOptions.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={option.action}
                        className={`p-4 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center gap-2 ${option.color}`}
                      >
                        <div className={option.textColor}>{option.icon}</div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {option.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Customization Options */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    Customize Share
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Custom Message
                      </label>
                      <textarea
                        placeholder="Add a personal message..."
                        className="w-full p-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg resize-none"
                        rows={2}
                      />
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg">
                        Cancel
                      </button>
                      <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg">
                        Share Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Stats */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-6">
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    1.5K
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Total Shares
                  </div>
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    89%
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Click Rate
                  </div>
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    2.3K
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">Views</div>
                </div>
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Last shared: 2 hours ago
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
