"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  MessageCircle,
  Mail,
  Link as LinkIcon,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";

interface SharePlatform {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  shareCount: number;
  growth: number;
}

export default function MultiPlatformShareButton() {
  const [copied, setCopied] = useState(false);
  const [activePlatform, setActivePlatform] = useState<string | null>(null);

  const shareUrl = "https://example.com/revolutionary-content";
  const shareTitle =
    "This will change everything you know about web development!";

  const platforms: SharePlatform[] = [
    {
      id: "twitter",
      name: "Twitter",
      icon: <Twitter size={20} />,
      color: "bg-sky-500",
      shareCount: 1245,
      growth: 12,
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: <Facebook size={20} />,
      color: "bg-blue-600",
      shareCount: 987,
      growth: 8,
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: <Linkedin size={20} />,
      color: "bg-blue-700",
      shareCount: 654,
      growth: 15,
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: <MessageCircle size={20} />,
      color: "bg-green-600",
      shareCount: 432,
      growth: 21,
    },
    {
      id: "email",
      name: "Email",
      icon: <Mail size={20} />,
      color: "bg-gray-600",
      shareCount: 321,
      growth: 5,
    },
  ];

  const totalShares = platforms.reduce(
    (acc, platform) => acc + platform.shareCount,
    0
  );
  const topPlatform = platforms.reduce((prev, current) =>
    prev.shareCount > current.shareCount ? prev : current
  );

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handlePlatformShare = (platform: SharePlatform) => {
    setActivePlatform(platform.id);

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl
      )}&text=${encodeURIComponent(shareTitle)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(
        shareTitle
      )}%20${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(
        shareTitle
      )}&body=${encodeURIComponent(shareUrl)}`,
    };

    if (shareUrls[platform.id]) {
      window.open(shareUrls[platform.id], "_blank");
    }

    setTimeout(() => setActivePlatform(null), 1000);
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Share Across Platforms
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Spread this amazing content everywhere
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {totalShares.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Shares
              </div>
            </div>
          </div>

          {/* Content Preview */}
          <div className="mb-8">
            <div className="h-48 bg-linear-to-r from-cyan-500 to-blue-600 rounded-xl mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                Innovative Content
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {shareTitle}
            </h3>
          </div>

          {/* URL Display */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <LinkIcon size={18} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Share this URL:
                </span>
              </div>
              <ExternalLink size={16} className="text-gray-500" />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 p-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
              />
              <button
                onClick={copyToClipboard}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
                  copied
                    ? "bg-green-600 text-white"
                    : "bg-gray-800 text-white hover:bg-gray-900"
                }`}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          {/* Platforms Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {platforms.map((platform) => (
              <motion.button
                key={platform.id}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePlatformShare(platform)}
                disabled={activePlatform === platform.id}
                className={`p-4 rounded-xl flex flex-col items-center gap-3 ${
                  platform.color
                } text-white ${
                  activePlatform === platform.id
                    ? "opacity-80"
                    : "hover:opacity-90"
                }`}
              >
                <div className="text-2xl">{platform.icon}</div>
                <div className="text-center">
                  <div className="font-bold">{platform.name}</div>
                  <div className="text-sm opacity-90">
                    {platform.shareCount.toLocaleString()}
                  </div>
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded-full ${
                    platform.growth >= 0 ? "bg-white/20" : "bg-red-500/50"
                  }`}
                >
                  {platform.growth >= 0 ? "+" : ""}
                  {platform.growth}%
                </div>
              </motion.button>
            ))}
          </div>

          {/* Share Stats */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              Platform Performance
            </h3>
            <div className="space-y-3">
              {platforms.map((platform) => (
                <div key={platform.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 ${platform.color} rounded-lg flex items-center justify-center text-white`}
                      >
                        {platform.icon}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {platform.name}
                      </span>
                      {platform.id === topPlatform.id && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 px-2 py-1 rounded">
                          Top
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900 dark:text-white">
                        {platform.shareCount.toLocaleString()}
                      </div>
                      <div
                        className={`text-sm ${
                          platform.growth >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {platform.growth >= 0 ? "+" : ""}
                        {platform.growth}%
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${platform.color}`}
                      style={{
                        width: `${(platform.shareCount / totalShares) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">
                  Quick Share All
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Share to all platforms at once
                </p>
              </div>
              <button
                onClick={() => {
                  platforms.forEach((platform) => {
                    handlePlatformShare(platform);
                  });
                }}
                className="px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg flex items-center gap-2 font-medium hover:from-blue-700 hover:to-purple-700"
              >
                <Share2 size={20} />
                Share to All Platforms
              </button>
            </div>
          </div>

          {/* Status Message */}
          <div className="mt-6 text-center">
            {activePlatform ? (
              <p className="text-blue-600">
                Sharing to{" "}
                {platforms.find((p) => p.id === activePlatform)?.name}...
              </p>
            ) : copied ? (
              <p className="text-green-600">✓ Link copied to clipboard!</p>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                Choose a platform to share this amazing content
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.main>
  );
}
