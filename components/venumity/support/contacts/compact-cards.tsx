"use client";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Clock,
  MessageSquare,
  Globe,
  Users,
  Briefcase,
} from "lucide-react";
import { useState } from "react";

type ContactType = "general" | "sales" | "technical" | "billing";

interface ContactCard {
  id: number;
  type: ContactType;
  icon: React.ReactNode;
  title: string;
  phone: string;
  email: string;
  hours: string;
  description: string;
}

export default function ContactInfo3() {
  const [activeCard, setActiveCard] = useState<ContactType>("general");

  const contactCards: ContactCard[] = [
    {
      id: 1,
      type: "general",
      icon: <Users size={24} />,
      title: "General Support",
      phone: "+1 (555) 123-4567",
      email: "support@company.com",
      hours: "24/7 Available",
      description: "For general inquiries and assistance",
    },
    {
      id: 2,
      type: "sales",
      icon: <Briefcase size={24} />,
      title: "Sales Team",
      phone: "+1 (555) 234-5678",
      email: "sales@company.com",
      hours: "Mon-Fri, 9AM-6PM",
      description: "For product inquiries and purchases",
    },
    {
      id: 3,
      type: "technical",
      icon: <MessageSquare size={24} />,
      title: "Technical Support",
      phone: "+1 (555) 345-6789",
      email: "tech@company.com",
      hours: "Mon-Sun, 8AM-10PM",
      description: "For technical issues and troubleshooting",
    },
    {
      id: 4,
      type: "billing",
      icon: <Briefcase size={24} />,
      title: "Billing Department",
      phone: "+1 (555) 456-7890",
      email: "billing@company.com",
      hours: "Mon-Fri, 8AM-5PM",
      description: "For billing and payment questions",
    },
  ];

  const activeContact = contactCards.find((card) => card.type === activeCard);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          {contactCards.map((card) => (
            <motion.button
              key={card.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCard(card.type)}
              className={`p-4 rounded-xl text-left transition-all duration-300 ${
                activeCard === card.type
                  ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    activeCard === card.type
                      ? "bg-white/20"
                      : "bg-blue-50 dark:bg-blue-900/20"
                  }`}
                >
                  <div
                    className={
                      activeCard === card.type
                        ? "text-white"
                        : "text-blue-600 dark:text-blue-400"
                    }
                  >
                    {card.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">{card.title}</h3>
                  <p className="text-sm opacity-80">{card.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {activeContact && (
          <motion.div
            key={activeContact.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-800"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <Phone size={18} />
                  <span className="text-sm font-medium">Phone</span>
                </div>
                <a
                  href={`tel:${activeContact.phone}`}
                  className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {activeContact.phone}
                </a>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <Mail size={18} />
                  <span className="text-sm font-medium">Email</span>
                </div>
                <a
                  href={`mailto:${activeContact.email}`}
                  className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {activeContact.email}
                </a>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <Clock size={18} />
                  <span className="text-sm font-medium">Hours</span>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {activeContact.hours}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <Globe size={18} />
                  <span className="text-sm font-medium">Response Time</span>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  Within 2 hours
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h4>
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300">
                  Call Now
                </button>
                <button className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors duration-300">
                  Send Email
                </button>
                <button className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors duration-300">
                  Schedule Call
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.main>
  );
}
