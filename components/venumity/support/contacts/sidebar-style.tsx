"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare, ExternalLink } from "lucide-react";

interface ContactChannel {
  id: number;
  name: string;
  icon: React.ReactNode;
  value: string;
  description: string;
  action: string;
  href: string;
}

export default function ContactInfo2() {
  const channels: ContactChannel[] = [
    {
      id: 1,
      name: "Live Chat",
      icon: <MessageSquare size={24} />,
      value: "Available 24/7",
      description: "Instant response from our team",
      action: "Start Chat",
      href: "#chat",
    },
    {
      id: 2,
      name: "Phone Support",
      icon: <Phone size={24} />,
      value: "+1 (555) 987-6543",
      description: "Mon-Fri, 9AM-8PM EST",
      action: "Call Now",
      href: "tel:+15559876543",
    },
    {
      id: 3,
      name: "Email",
      icon: <Mail size={24} />,
      value: "help@company.com",
      description: "Response within 2 hours",
      action: "Send Email",
      href: "mailto:help@company.com",
    },
    {
      id: 4,
      name: "Visit Office",
      icon: <MapPin size={24} />,
      value: "456 Corporate Ave",
      description: "By appointment only",
      action: "Get Directions",
      href: "#directions",
    },
  ];

  const handleContactClick = (href: string) => {
    console.log(`Contact action triggered: ${href}`);
    // In real implementation, this would navigate or open modal
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Channels */}
          <div className="space-y-4">
            {channels.map((channel) => (
              <motion.div
                key={channel.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: channel.id * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                      <div className="text-blue-600 dark:text-blue-400">
                        {channel.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {channel.name}
                      </h3>
                      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-1">
                        {channel.value}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {channel.description}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleContactClick(channel.href)}
                  className="mt-4 w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  {channel.action}
                  <ExternalLink size={16} />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send us a Message
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
}
