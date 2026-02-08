"use client";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Video,
  Calendar,
  Download,
  Share2,
  Bookmark,
  Copy,
} from "lucide-react";
import { useState } from "react";

interface ContactDetail {
  id: number;
  label: string;
  value: string;
  icon: React.ReactNode;
  copyable: boolean;
  action?: () => void;
}

interface SupportAgent {
  id: number;
  name: string;
  role: string;
  status: "online" | "busy" | "offline";
  responseTime: string;
  languages: string[];
}

export default function ContactInfo5() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const contactDetails: ContactDetail[] = [
    {
      id: 1,
      label: "Primary Phone",
      value: "+1 (555) 123-4567",
      icon: <Phone size={18} />,
      copyable: true,
      action: () => window.open("tel:+15551234567"),
    },
    {
      id: 2,
      label: "Support Email",
      value: "support@company.com",
      icon: <Mail size={18} />,
      copyable: true,
      action: () => window.open("mailto:support@company.com"),
    },
    {
      id: 3,
      label: "Office Address",
      value: "123 Business Street, Suite 100",
      icon: <MapPin size={18} />,
      copyable: true,
    },
    {
      id: 4,
      label: "Business Hours",
      value: "Mon-Fri: 9AM-6PM EST",
      icon: <Clock size={18} />,
      copyable: false,
    },
    {
      id: 5,
      label: "Support ID",
      value: "SUP-2024-00123",
      icon: <MessageSquare size={18} />,
      copyable: true,
    },
  ];

  const supportAgents: SupportAgent[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Support Specialist",
      status: "online",
      responseTime: "2-5 mins",
      languages: ["EN", "ES"],
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Technical Support Engineer",
      status: "busy",
      responseTime: "10-15 mins",
      languages: ["EN", "ZH"],
    },
    {
      id: 3,
      name: "Emma Wilson",
      role: "Customer Success Manager",
      status: "online",
      responseTime: "5-10 mins",
      languages: ["EN", "FR"],
    },
  ];

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleAction = (action: string) => {
    alert(`Action: ${action}`);
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Contact Card */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-linear-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Contact Information
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Reach out to our support team
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction("Share")}
                    className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Share2
                      size={20}
                      className="text-gray-600 dark:text-gray-400"
                    />
                  </button>
                  <button
                    onClick={() => handleAction("Save")}
                    className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Bookmark
                      size={20}
                      className="text-gray-600 dark:text-gray-400"
                    />
                  </button>
                  <button
                    onClick={() => handleAction("Download")}
                    className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Download
                      size={20}
                      className="text-gray-600 dark:text-gray-400"
                    />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {contactDetails.map((detail) => (
                  <motion.div
                    key={detail.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="text-blue-600 dark:text-blue-400">
                            {detail.icon}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-700 dark:text-gray-300">
                            {detail.label}
                          </h3>
                          <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                            {detail.value}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {detail.copyable && (
                          <button
                            onClick={() =>
                              handleCopy(detail.value, detail.label)
                            }
                            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            <Copy
                              size={16}
                              className="text-gray-600 dark:text-gray-400"
                            />
                          </button>
                        )}
                        {detail.action && (
                          <button
                            onClick={detail.action}
                            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                          >
                            {detail.label.includes("Phone") ? (
                              <Phone size={16} />
                            ) : (
                              <Mail size={16} />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                    {copiedField === detail.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-green-600 dark:text-green-400"
                      >
                        Copied to clipboard!
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => handleAction("Schedule Call")}
                  className="flex flex-col items-center justify-center p-4 bg-linear-to-br from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  <Calendar size={24} className="mb-2" />
                  <span className="font-medium">Schedule</span>
                </button>
                <button
                  onClick={() => handleAction("Video Call")}
                  className="flex flex-col items-center justify-center p-4 bg-linear-to-br from-purple-500 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  <Video size={24} className="mb-2" />
                  <span className="font-medium">Video Call</span>
                </button>
                <button
                  onClick={() => handleAction("Live Chat")}
                  className="flex flex-col items-center justify-center p-4 bg-linear-to-br from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  <MessageSquare size={24} className="mb-2" />
                  <span className="font-medium">Live Chat</span>
                </button>
                <button
                  onClick={() => handleAction("Callback")}
                  className="flex flex-col items-center justify-center p-4 bg-linear-to-br from-orange-500 to-red-600 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  <Phone size={24} className="mb-2" />
                  <span className="font-medium">Callback</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Support Team Status */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-6">
                Support Team Status
              </h3>
              <div className="space-y-4">
                {supportAgents.map((agent) => (
                  <motion.div
                    key={agent.id}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-linear-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {agent.name.charAt(0)}
                        </div>
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                            agent.status === "online"
                              ? "bg-green-500"
                              : agent.status === "busy"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                          }`}
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {agent.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {agent.role}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {agent.responseTime}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {agent.languages.join(", ")}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={() => handleAction("View All Agents")}
                className="w-full mt-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-xl transition-colors"
              >
                View All Support Agents
              </button>
            </div>

            {/* Stats */}
            <div className="bg-linear-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800/30">
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                Support Statistics
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    24/7
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Availability
                  </div>
                </div>
                <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    98%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Satisfaction
                  </div>
                </div>
                <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    15m
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Avg Response
                  </div>
                </div>
                <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    50+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Languages
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
