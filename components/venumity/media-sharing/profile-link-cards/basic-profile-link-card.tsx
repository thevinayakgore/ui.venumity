"use client";
import { motion } from "framer-motion";
import { MapPin, Link as LinkIcon, Globe, Mail, Briefcase } from "lucide-react";

export default function BasicProfileLinkCard() {
  const profile = {
    name: "Alex Johnson",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    website: "alexjohnson.dev",
    email: "alex@example.com",
    bio: "Passionate about building beautiful, functional web experiences. React & TypeScript enthusiast.",
    avatar: "AJ",
  };

  const socialLinks = [
    {
      platform: "Twitter",
      url: "https://twitter.com/alexjohnson",
      handle: "@alexjohnson",
    },
    {
      platform: "GitHub",
      url: "https://github.com/alexjohnson",
      handle: "alexjohnson",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/alexjohnson",
      handle: "Alex Johnson",
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
          {/* Profile Header */}
          <div className="p-8 text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {profile.avatar}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {profile.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {profile.title}
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Briefcase size={14} />
              {profile.company}
            </div>
          </div>

          {/* Profile Info */}
          <div className="p-8 border-t border-gray-200 dark:border-gray-800">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <MapPin
                    size={18}
                    className="text-gray-600 dark:text-gray-400"
                  />
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Location
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {profile.location}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <Globe
                    size={18}
                    className="text-gray-600 dark:text-gray-400"
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

              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <Mail
                    size={18}
                    className="text-gray-600 dark:text-gray-400"
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
            </div>

            {/* Bio */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
              <p className="text-gray-700 dark:text-gray-300">{profile.bio}</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="p-8 bg-gray-50 dark:bg-gray-800">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              Connect
            </h3>
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <LinkIcon
                        size={16}
                        className="text-gray-600 dark:text-gray-400"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {link.platform}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {link.handle}
                      </div>
                    </div>
                  </div>
                  <div className="text-blue-600 dark:text-blue-400">→</div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-8 border-t border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-2 gap-3">
              <button className="py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Follow
              </button>
              <button className="py-3 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700">
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
