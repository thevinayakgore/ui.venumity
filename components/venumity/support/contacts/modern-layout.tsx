"use client";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Video,
  FileText,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";

interface ContactMethod {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: string;
  color: string;
  onClick: () => void;
}

interface OfficeLocation {
  id: number;
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
}

export default function ContactInfo4() {
  const [selectedMethod, setSelectedMethod] = useState<number>(1);

  const contactMethods: ContactMethod[] = [
    {
      id: 1,
      title: "Live Chat",
      description: "Instant messaging with our support team",
      icon: <MessageSquare size={24} />,
      action: "Start Chat",
      color: "from-green-500 to-emerald-600",
      onClick: () => console.log("Opening live chat..."),
    },
    {
      id: 2,
      title: "Video Call",
      description: "Face-to-face video consultation",
      icon: <Video size={24} />,
      action: "Schedule Call",
      color: "from-blue-500 to-indigo-600",
      onClick: () => console.log("Scheduling video call..."),
    },
    {
      id: 3,
      title: "Phone Call",
      description: "Speak directly with our experts",
      icon: <Phone size={24} />,
      action: "Call Now",
      color: "from-purple-500 to-violet-600",
      onClick: () => console.log("Initiating phone call..."),
    },
    {
      id: 4,
      title: "Email Support",
      description: "Send us a detailed message",
      icon: <Mail size={24} />,
      action: "Compose Email",
      color: "from-orange-500 to-red-600",
      onClick: () => console.log("Opening email composer..."),
    },
  ];

  const officeLocations: OfficeLocation[] = [
    {
      id: 1,
      city: "New York",
      address: "123 Business Ave, NY 10001",
      phone: "+1 (555) 111-2222",
      email: "ny.support@company.com",
      hours: "9AM-6PM EST",
    },
    {
      id: 2,
      city: "London",
      address: "456 Corporate St, London EC1A",
      phone: "+44 20 1234 5678",
      email: "london.support@company.com",
      hours: "9AM-5PM GMT",
    },
    {
      id: 3,
      city: "Tokyo",
      address: "789 Shinjuku, Tokyo 160-0022",
      phone: "+81 3 1234 5678",
      email: "tokyo.support@company.com",
      hours: "9AM-5PM JST",
    },
  ];

  const handleQuickAction = (action: string) => {
    alert(`Action triggered: ${action}`);
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {contactMethods.map((method) => (
                <motion.div
                  key={method.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedMethod(method.id);
                    method.onClick();
                  }}
                  className={`relative cursor-pointer rounded-xl p-6 transition-all duration-300 ${
                    selectedMethod === method.id
                      ? "ring-2 ring-offset-2 ring-blue-500 shadow-lg"
                      : "bg-white dark:bg-gray-900 hover:shadow-md"
                  } border border-gray-100 dark:border-gray-800`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-lg bg-linear-to-br ${method.color}`}
                    >
                      <div className="text-white">{method.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                        {method.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {method.description}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          method.onClick();
                        }}
                        className={`px-4 py-2 rounded-lg font-medium text-sm ${
                          selectedMethod === method.id
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {method.action}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-linear-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => handleQuickAction("Download Docs")}
                  className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
                >
                  <FileText
                    size={20}
                    className="text-blue-600 dark:text-blue-400 mb-2"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Download Docs
                  </span>
                </button>
                <button
                  onClick={() => handleQuickAction("FAQ")}
                  className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
                >
                  <HelpCircle
                    size={20}
                    className="text-green-600 dark:text-green-400 mb-2"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    View FAQ
                  </span>
                </button>
                <button
                  onClick={() => handleQuickAction("Callback")}
                  className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
                >
                  <Phone
                    size={20}
                    className="text-purple-600 dark:text-purple-400 mb-2"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Request Callback
                  </span>
                </button>
                <button
                  onClick={() => handleQuickAction("Status")}
                  className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
                >
                  <Clock
                    size={20}
                    className="text-orange-600 dark:text-orange-400 mb-2"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Check Status
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Office Locations */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <MapPin size={20} />
                Our Offices
              </h3>
              <div className="space-y-4">
                {officeLocations.map((office) => (
                  <motion.div
                    key={office.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: office.id * 0.1 }}
                    className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {office.city}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-600 dark:text-gray-400">
                        {office.address}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        📞 {office.phone}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        ✉️ {office.email}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        🕐 {office.hours}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-linear-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-red-100 dark:border-red-800/30">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                Emergency Contact
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                For critical issues requiring immediate attention
              </p>
              <div className="space-y-2">
                <p className="font-semibold text-red-600 dark:text-red-400">
                  📞 +1 (555) 999-8888
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Available 24/7 for emergency support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
