// app/components/social-links/10.1-minimal-social-links/page.tsx
"use client";

import { motion } from "framer-motion";
import { 
  ExternalLink, 
  Copy, 
  Check, 
  Share2,
  Globe
} from "lucide-react";
import { useState } from "react";

interface SocialLink {
  platform: string;
  icon: string;
  url: string;
  username: string;
  color: string;
}

export default function MinimalSocialLinks() {
  const [copied, setCopied] = useState(false);

  const socialLinks: SocialLink[] = [
    { platform: "Website", icon: "🌐", url: "https://portfolio.dev", username: "portfolio.dev", color: "text-blue-600" },
    { platform: "GitHub", icon: "💻", url: "https://github.com/dev", username: "@dev", color: "text-gray-800 dark:text-gray-300" },
    { platform: "Twitter", icon: "🐦", url: "https://twitter.com/dev", username: "@dev", color: "text-sky-500" },
    { platform: "LinkedIn", icon: "💼", url: "https://linkedin.com/in/dev", username: "dev", color: "text-blue-700" },
    { platform: "Instagram", icon: "📸", url: "https://instagram.com/dev", username: "@dev", color: "text-pink-600" },
    { platform: "YouTube", icon: "🎥", url: "https://youtube.com/@dev", username: "dev", color: "text-red-600" },
  ];

  const copyToClipboard = async () => {
    const linksText = socialLinks.map(link => `${link.platform}: ${link.url}`).join('\n');
    await navigator.clipboard.writeText(linksText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
          {/* Header */}
          <div className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Globe className="text-white" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Connect With Me</h2>
            <p className="text-gray-600 dark:text-gray-400">Find me on these platforms</p>
          </div>

          {/* Social Links */}
          <div className="p-6 space-y-3">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{link.icon}</span>
                  <div>
                    <div className={`font-medium ${link.color}`}>{link.platform}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{link.username}</div>
                  </div>
                </div>
                <ExternalLink size={16} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              </motion.a>
            ))}
          </div>

          {/* Actions */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
            <div className="flex gap-3">
              <button
                onClick={copyToClipboard}
                className="flex-1 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 flex items-center justify-center gap-2"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Copied!" : "Copy All"}
              </button>
              <button className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center gap-2">
                <Share2 size={18} />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}