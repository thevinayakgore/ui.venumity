"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  X,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  Mail,
  MessageCircle,
  Check,
} from "lucide-react";

export default function FloatingShareComponent() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const shareOptions = [
    {
      icon: <Facebook size={20} />,
      label: "Facebook",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      delay: 0,
    },
    {
      icon: <Twitter size={20} />,
      label: "Twitter",
      color: "bg-sky-500",
      hoverColor: "hover:bg-sky-600",
      delay: 0.1,
    },
    {
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      color: "bg-blue-700",
      hoverColor: "hover:bg-blue-800",
      delay: 0.2,
    },
    {
      icon: <MessageCircle size={20} />,
      label: "WhatsApp",
      color: "bg-green-600",
      hoverColor: "hover:bg-green-700",
      delay: 0.3,
    },
    {
      icon: <Mail size={20} />,
      label: "Email",
      color: "bg-gray-600",
      hoverColor: "hover:bg-gray-700",
      delay: 0.4,
    },
  ];

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check this out!");

    const shareUrls: Record<string, string> = {
      Facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      Twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      WhatsApp: `https://wa.me/?text=${text}%20${url}`,
      Email: `mailto:?subject=${text}&body=${url}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank");
    }

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="relative w-full max-w-4xl min-h-[500px] flex items-center justify-center">
        {/* Content Area */}
        <div className="text-center max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Amazing Content Worth Sharing
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Discover something incredible that you will want to share with
            everyone. Click the floating button to spread the word!
          </p>
        </div>

        {/* Floating Share Button */}
        <div className="fixed bottom-8 right-8 z-50">
          {/* Share Options */}
          <AnimatePresence>
            {isExpanded && (
              <div className="absolute bottom-16 right-0 mb-4">
                {shareOptions.map((option, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20, scale: 0.3 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.3 }}
                    transition={{ delay: option.delay }}
                    onClick={() => handleShare(option.label)}
                    className={`mb-2 w-12 h-12 ${option.color} ${option.hoverColor} rounded-full text-white flex items-center justify-center shadow-lg`}
                  >
                    {option.icon}
                  </motion.button>
                ))}
                {/* Copy Link Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20, scale: 0.3 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.3 }}
                  transition={{ delay: 0.5 }}
                  onClick={copyToClipboard}
                  className="w-12 h-12 bg-gray-800 hover:bg-gray-900 rounded-full text-white flex items-center justify-center shadow-lg"
                >
                  <Link2 size={20} />
                </motion.button>
              </div>
            )}
          </AnimatePresence>

          {/* Main Floating Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-16 h-16 ${
              isExpanded
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-600 hover:bg-blue-700"
            } rounded-full text-white flex items-center justify-center shadow-xl`}
          >
            {isExpanded ? <X size={24} /> : <Share2 size={24} />}
          </motion.button>
        </div>

        {/* Notification */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-32 right-8 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-2"
            >
              <Check size={20} />
              <span>Link copied to clipboard!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  );
}
