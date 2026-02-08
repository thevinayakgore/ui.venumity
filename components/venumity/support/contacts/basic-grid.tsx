"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Globe } from "lucide-react";

interface ContactItem {
  icon: React.ReactNode;
  title: string;
  value: string;
  link?: string;
}

export default function ContactInfo1() {
  const contactItems: ContactItem[] = [
    {
      icon: <Phone size={20} />,
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: <Mail size={20} />,
      title: "Email",
      value: "support@company.com",
      link: "mailto:support@company.com",
    },
    {
      icon: <MapPin size={20} />,
      title: "Address",
      value: "123 Business St, City, State 12345",
    },
    {
      icon: <Clock size={20} />,
      title: "Hours",
      value: "Mon-Fri: 9AM-6PM EST",
    },
    {
      icon: <Globe size={20} />,
      title: "Website",
      value: "www.company.com",
      link: "https://www.company.com",
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {contactItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-blue-600 dark:text-blue-400">
                  {item.icon}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                  {item.title}
                </h3>
                {item.link ? (
                  <a
                    href={item.link}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.value}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
