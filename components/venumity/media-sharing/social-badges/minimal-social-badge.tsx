"use client";
import { motion } from "framer-motion";
import {
  Twitter,
  Github,
  Linkedin,
  Instagram,
  Youtube,
  ExternalLink,
  Globe,
} from "lucide-react";

interface SocialProfile {
  platform: string;
  icon: React.ReactNode;
  username: string;
  followers: string;
  color: string;
  url: string;
}

export default function MinimalSocialBadge() {
  const profiles: SocialProfile[] = [
    {
      platform: "Twitter",
      icon: <Twitter size={18} />,
      username: "@designer",
      followers: "12.4K",
      color: "text-sky-500",
      url: "https://twitter.com/designer",
    },
    {
      platform: "GitHub",
      icon: <Github size={18} />,
      username: "devdesigner",
      followers: "2.8K",
      color: "text-gray-800 dark:text-gray-300",
      url: "https://github.com/devdesigner",
    },
    {
      platform: "LinkedIn",
      icon: <Linkedin size={18} />,
      username: "designer-pro",
      followers: "5.6K",
      color: "text-blue-700",
      url: "https://linkedin.com/in/designer-pro",
    },
    {
      platform: "Instagram",
      icon: <Instagram size={18} />,
      username: "@creative.design",
      followers: "18.9K",
      color: "text-pink-600",
      url: "https://instagram.com/creative.design",
    },
    {
      platform: "YouTube",
      icon: <Youtube size={18} />,
      username: "Design Tutorials",
      followers: "45.2K",
      color: "text-red-600",
      url: "https://youtube.com/c/designtutorials",
    },
  ];

  const totalFollowers = profiles.reduce((acc, profile) => {
    const num =
      parseFloat(profile.followers) *
      (profile.followers.includes("K") ? 1000 : 1);
    return acc + num;
  }, 0);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-2xl">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
          {/* Header */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">JD</span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  John Designer
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Digital Creator & UI/UX Designer
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Globe size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      designerportfolio.com
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {(totalFollowers / 1000).toLocaleString()}K total followers
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="p-8">
            <div className="space-y-4">
              {profiles.map((profile, index) => (
                <motion.a
                  key={profile.platform}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-800 ${profile.color}`}
                    >
                      {profile.icon}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        {profile.platform}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {profile.username}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold text-gray-900 dark:text-white">
                        {profile.followers}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Followers
                      </div>
                    </div>
                    <ExternalLink
                      size={16}
                      className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                    />
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {profiles.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Platforms
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {(totalFollowers / 1000).toLocaleString()}K
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Followers
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    Active
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Status
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    100%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Engagement
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-8 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors">
                Follow All
              </button>
              <button className="flex-1 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
