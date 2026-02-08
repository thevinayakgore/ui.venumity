"use client";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Mail,
  MapPin,
  Briefcase,
  Github,
  Twitter,
  Linkedin,
  Link as LinkIcon,
} from "lucide-react";

export default function MinimalProfileLinkCard() {
  const profile = {
    name: "David Kim",
    title: "UX Engineer",
    company: "DigitalStudio",
    location: "Seoul, South Korea",
    email: "david@digitalstudio.co",
    website: "davidkim.design",
    bio: "Building digital experiences that matter. Focused on accessibility and performance.",
    years: "8",
    availability: "Available for freelance",
    avatar: "DK",
  };

  const socialLinks = [
    {
      platform: "Twitter",
      icon: <Twitter size={18} />,
      url: "https://twitter.com/davidkim",
      handle: "@davidkim",
    },
    {
      platform: "GitHub",
      icon: <Github size={18} />,
      url: "https://github.com/davidkim",
      handle: "davidkim",
    },
    {
      platform: "LinkedIn",
      icon: <Linkedin size={18} />,
      url: "https://linkedin.com/in/davidkim",
      handle: "David Kim",
    },
  ];

  const projects = [
    { name: "Design System", status: "Active", color: "bg-blue-500" },
    { name: "E-commerce", status: "Completed", color: "bg-green-500" },
    { name: "Mobile App", status: "In Progress", color: "bg-yellow-500" },
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
          <div className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-20 h-20 bg-linear-to-br from-gray-900 to-gray-700 dark:from-gray-800 dark:to-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {profile.avatar}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {profile.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {profile.title}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Briefcase size={14} />
                  {profile.company}
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              {profile.bio}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="text-center p-3 border border-gray-200 dark:border-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profile.years}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Years
                </div>
              </div>
              <div className="text-center p-3 border border-gray-200 dark:border-gray-800 rounded-lg">
                <div className="text-lg font-bold text-green-600 dark:text-green-400">
                  {profile.availability.split(" ")[0]}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {profile.availability.split(" ").slice(1).join(" ")}
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  {profile.location}
                </span>
              </div>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Mail size={18} className="text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  {profile.email}
                </span>
              </a>
              <a
                href={`https://${profile.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <LinkIcon size={18} className="text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  {profile.website}
                </span>
                <ExternalLink size={14} className="text-gray-400" />
              </a>
            </div>

            {/* Current Projects */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                Current Projects
              </h3>
              <div className="space-y-2">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 ${project.color} rounded-full`}
                      ></div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {project.name}
                      </span>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        project.status === "Active"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : project.status === "Completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                Connect
              </h3>
              <div className="space-y-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <div className="flex items-center gap-3">
                      {link.icon}
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {link.platform}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {link.handle}
                        </div>
                      </div>
                    </div>
                    <ExternalLink size={16} className="text-gray-400" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-8 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600">
                Contact
              </button>
              <button className="flex-1 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
