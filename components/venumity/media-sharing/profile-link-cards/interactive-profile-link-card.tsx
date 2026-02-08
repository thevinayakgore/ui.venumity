"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  Link as LinkIcon,
  Mail,
  Briefcase,
  Calendar,
  Award,
  BookOpen,
  Share2,
  Copy,
  Check,
} from "lucide-react";

export default function InteractiveProfileCard() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"about" | "links" | "stats">(
    "about"
  );

  const profile = {
    name: "Sarah Chen",
    title: "Product Design Lead",
    company: "DesignStudio",
    location: "New York, NY",
    website: "sarahchen.design",
    email: "sarah@designstudio.com",
    bio: "Design leader passionate about creating intuitive user experiences. 10+ years in product design.",
    experience: "12 years",
    projects: "48 completed",
    followers: "2.4K",
    avatar: "SC",
  };

  const links = [
    {
      name: "Portfolio",
      url: "https://sarahchen.design/portfolio",
      icon: "🎨",
    },
    { name: "Dribbble", url: "https://dribbble.com/sarahchen", icon: "🏀" },
    { name: "Behance", url: "https://behance.net/sarahchen", icon: "✨" },
    { name: "Medium", url: "https://medium.com/@sarahchen", icon: "✍️" },
    { name: "Figma", url: "https://figma.com/@sarahchen", icon: "🎯" },
  ];

  const copyProfileUrl = () => {
    navigator.clipboard.writeText("https://sarahchen.design/profile");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-lg">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
          {/* Profile Header with Gradient */}
          <div className="bg-linear-to-r from-purple-500 to-pink-600 p-8 text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-4 border-4 border-white">
                <span className="text-4xl font-bold text-gray-900">
                  {profile.avatar}
                </span>
              </div>
              <div className="absolute bottom-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                Online
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {profile.name}
            </h2>
            <p className="text-white/90 mb-4">{profile.title}</p>
            <div className="flex justify-center gap-4">
              <div className="flex items-center gap-1 text-white/80">
                <MapPin size={16} />
                {profile.location}
              </div>
              <div className="flex items-center gap-1 text-white/80">
                <Briefcase size={16} />
                {profile.company}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-800">
            <div className="flex">
              <button
                onClick={() => setActiveTab("about")}
                className={`flex-1 py-4 text-center font-medium ${
                  activeTab === "about"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab("links")}
                className={`flex-1 py-4 text-center font-medium ${
                  activeTab === "links"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                Links
              </button>
              <button
                onClick={() => setActiveTab("stats")}
                className={`flex-1 py-4 text-center font-medium ${
                  activeTab === "stats"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                Stats
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "about" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                    Bio
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {profile.bio}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Mail
                        size={18}
                        className="text-blue-600 dark:text-blue-300"
                      />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Email
                      </div>
                      <a
                        href={`mailto:${profile.email}`}
                        className="font-medium text-gray-900 dark:text-white"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                      <LinkIcon
                        size={18}
                        className="text-green-600 dark:text-green-300"
                      />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Website
                      </div>
                      <a
                        href={`https://${profile.website}`}
                        className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                      >
                        {profile.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "links" && (
              <div className="space-y-3">
                {links.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{link.icon}</span>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {link.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {link.url.replace("https://", "")}
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-400">→</div>
                  </a>
                ))}
              </div>
            )}

            {activeTab === "stats" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={18} className="text-blue-600" />
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {profile.experience}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Experience
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen size={18} className="text-green-600" />
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {profile.projects}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Projects
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <User size={18} className="text-purple-600" />
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {profile.followers}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Followers
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Award size={18} className="text-yellow-600" />
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        28
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Awards
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="p-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                Connect
              </button>
              <button
                onClick={copyProfileUrl}
                className="px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Copied" : "Copy Link"}
              </button>
              <button className="px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
