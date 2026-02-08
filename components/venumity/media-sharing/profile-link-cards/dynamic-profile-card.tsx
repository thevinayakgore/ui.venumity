"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Briefcase,
  TrendingUp,
  Users,
  Star,
  Eye,
  Download,
  Share2,
  Copy,
  Check,
} from "lucide-react";

interface ProfileView {
  id: string;
  name: string;
  platform: string;
  count: number;
  change: number;
}

export default function DynamicProfileCard() {
  const [activeTab, setActiveTab] = useState<"overview" | "stats" | "links">(
    "overview"
  );
  const [copied, setCopied] = useState(false);
  const [profileViews, setProfileViews] = useState<ProfileView[]>([
    {
      id: "1",
      name: "LinkedIn",
      platform: "LinkedIn",
      count: 1245,
      change: 12,
    },
    {
      id: "2",
      name: "Portfolio",
      platform: "Portfolio",
      count: 876,
      change: 8,
    },
    { id: "3", name: "Twitter", platform: "Twitter", count: 2109, change: 24 },
    { id: "4", name: "GitHub", platform: "GitHub", count: 1567, change: 15 },
  ]);
  const [totalViews, setTotalViews] = useState(0);

  const profile = {
    name: "Jessica Wilson",
    title: "Digital Marketing Director",
    company: "GrowthHack Inc.",
    location: "London, UK",
    experience: "10+ years",
    clients: "150+",
    successRate: "94%",
    availability: "Accepting new clients",
    bio: "Helping brands grow through data-driven marketing strategies. Specialized in social media and content marketing.",
    avatar: "JW",
  };

  const links = [
    {
      name: "Marketing Portfolio",
      url: "https://jessicawilson.com/portfolio",
      visits: 245,
    },
    {
      name: "Case Studies",
      url: "https://jessicawilson.com/cases",
      visits: 189,
    },
    { name: "Blog", url: "https://jessicawilson.com/blog", visits: 567 },
    {
      name: "Resources",
      url: "https://jessicawilson.com/resources",
      visits: 123,
    },
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const updateViews = () => {
      setProfileViews((prev) =>
        prev.map((view) => ({
          ...view,
          count: view.count + Math.floor(Math.random() * 5),
        }))
      );

      // Update total views after profileViews update
      setTotalViews(() =>
        profileViews.reduce((sum, view) => sum + view.count, 0)
      );

      timeout = setTimeout(updateViews, 5000); // Schedule next update
    };

    timeout = setTimeout(updateViews, 5000); // Start initial update

    return () => clearTimeout(timeout); // Cleanup
  }, [profileViews]);

  const copyProfileUrl = () => {
    navigator.clipboard.writeText("https://jessicawilson.com/profile");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
          {/* Header with Stats */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {profile.avatar}
                  </span>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Pro
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      {profile.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {profile.title}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Briefcase size={16} />
                        {profile.company}
                      </div>
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <MapPin size={16} />
                        {profile.location}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {totalViews.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total Views
                    </div>
                  </div>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {profile.experience}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Experience
                    </div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {profile.clients}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Clients
                    </div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {profile.successRate}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Success Rate
                    </div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      {profile.availability.split(" ")[0]}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {profile.availability.split(" ").slice(1).join(" ")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-800">
            <div className="flex">
              <button
                onClick={() => setActiveTab("overview")}
                className={`flex-1 py-4 text-center font-medium ${
                  activeTab === "overview"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("stats")}
                className={`flex-1 py-4 text-center font-medium ${
                  activeTab === "stats"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                }`}
              >
                Stats
              </button>
              <button
                onClick={() => setActiveTab("links")}
                className={`flex-1 py-4 text-center font-medium ${
                  activeTab === "links"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                }`}
              >
                Links
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                      About
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {profile.bio}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                      Recent Activity
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Eye size={18} className="text-blue-600" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Profile viewed by Google Recruiter
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          2 hours ago
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Star size={18} className="text-yellow-600" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Featured in Marketing Weekly
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">1 day ago</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "stats" && (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    Profile Views by Platform
                  </h3>
                  <div className="space-y-4">
                    {profileViews.map((view) => (
                      <div key={view.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                              <Users size={16} className="text-gray-600" />
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {view.platform}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900 dark:text-white">
                              {view.count.toLocaleString()}
                            </div>
                            <div
                              className={`text-sm ${
                                view.change > 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              <TrendingUp size={14} className="inline mr-1" />
                              {view.change}%
                            </div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                          <div
                            className="h-2 bg-linear-to-r from-blue-500 to-purple-600 rounded-full"
                            style={{
                              width: `${(view.count / totalViews) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "links" && (
                <motion.div
                  key="links"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  {links.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white mb-1">
                          {link.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {link.url.replace("https://", "")}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-bold text-gray-900 dark:text-white">
                            {link.visits}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Visits
                          </div>
                        </div>
                        <div className="text-gray-400">→</div>
                      </div>
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Bar */}
          <div className="p-8 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                Book Consultation
              </button>
              <div className="flex gap-3">
                <button
                  onClick={copyProfileUrl}
                  className="px-4 py-3 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700 flex items-center gap-2"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  {copied ? "Copied" : "Copy Link"}
                </button>
                <button className="px-4 py-3 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700">
                  <Share2 size={18} />
                </button>
                <button className="px-4 py-3 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700">
                  <Download size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
