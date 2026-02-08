"use client";
import { motion } from "framer-motion";
import { Phone, Mail, MessageSquare, Clock, Globe, MapPin } from "lucide-react";

interface ContactInfo {
  icon: React.ReactNode;
  label: string;
  value: string;
  link?: string;
}

export default function SupportCard1() {
  const contactInfo: ContactInfo[] = [
    {
      icon: <Phone size={20} />,
      label: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: "support@company.com",
      link: "mailto:support@company.com",
    },
    {
      icon: <MessageSquare size={20} />,
      label: "Live Chat",
      value: "Available 24/7",
      link: "#chat",
    },
    {
      icon: <Clock size={20} />,
      label: "Hours",
      value: "Mon-Fri: 9AM-6PM EST",
    },
    {
      icon: <Globe size={20} />,
      label: "Website",
      value: "www.company.com",
      link: "https://www.company.com",
    },
    {
      icon: <MapPin size={20} />,
      label: "Location",
      value: "123 Business St, City",
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-3">Support Center</h1>
              <p className="text-blue-100">
                We are here to help you 24/7 with any questions or issues
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <div className="text-blue-600 dark:text-blue-400">
                        {info.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {info.label}
                      </div>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {info.value}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10 text-center"
            >
              <div className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Need Immediate Help?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                  Our support team is available around the clock to assist you
                  with any urgent issues or questions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
                    Start Live Chat
                  </button>
                  <button className="px-8 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-xl transition-colors">
                    Schedule a Call
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
