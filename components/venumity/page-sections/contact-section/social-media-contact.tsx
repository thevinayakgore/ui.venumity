"use client";
import {
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  MessageSquare,
} from "lucide-react";

export default function ContactSocialSection() {
  const socialPlatforms = [
    {
      icon: Twitter,
      name: "Twitter",
      handle: "@company",
      followers: "25.4K",
      description: "Latest updates and announcements",
      color:
        "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
      iconColor: "text-blue-500 dark:text-blue-400",
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      handle: "company",
      followers: "18.7K",
      description: "Company news and career opportunities",
      color:
        "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
      iconColor: "text-blue-700 dark:text-blue-500",
    },
    {
      icon: Instagram,
      name: "Instagram",
      handle: "@company",
      followers: "42.1K",
      description: "Behind the scenes and culture",
      color:
        "bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800",
      iconColor: "text-pink-600 dark:text-pink-400",
    },
    {
      icon: Facebook,
      name: "Facebook",
      handle: "company",
      followers: "35.8K",
      description: "Community and events",
      color:
        "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
      iconColor: "text-blue-600 dark:text-blue-500",
    },
    {
      icon: Youtube,
      name: "YouTube",
      handle: "company",
      followers: "12.3K",
      description: "Tutorials and webinars",
      color: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
      iconColor: "text-red-600 dark:text-red-500",
    },
    {
      icon: MessageSquare,
      name: "Discord",
      handle: "company",
      members: "8.5K",
      description: "Community discussions",
      color:
        "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <section className="py-20 px-4 bg-linear-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Connect With Us
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join our growing community across social platforms
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {socialPlatforms.map((platform, index) => (
            <a
              key={index}
              href="#"
              className={`block p-6 border rounded-xl ${platform.color} hover:scale-105 transition-all duration-300`}
            >
              <div className="flex items-center mb-4">
                <div
                  className={`p-3 rounded-lg ${platform.iconColor} bg-white/50 dark:bg-white/10`}
                >
                  <platform.icon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {platform.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {platform.handle}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {platform.followers || platform.members}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {platform.followers ? "Followers" : "Members"}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-right">
                  {platform.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Stay Updated
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Subscribe to our newsletter for the latest news, updates, and
                exclusive offers.
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Subscribe
                </button>
              </form>
            </div>
            <div className="bg-linear-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-xl p-6 text-white">
              <h4 className="text-xl font-bold mb-3">Join Our Community</h4>
              <p className="mb-4 opacity-90">
                Connect with like-minded professionals and stay ahead of
                industry trends.
              </p>
              <div className="flex space-x-3">
                <button className="flex-1 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                  Join Discord
                </button>
                <button className="flex-1 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                  LinkedIn Group
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
