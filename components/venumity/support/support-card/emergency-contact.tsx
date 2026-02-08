"use client";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Phone,
  MessageSquare,
  Clock,
  Shield,
  Download,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface EmergencyContact {
  id: number;
  name: string;
  description: string;
  phone: string;
  available: boolean;
  priority: "critical" | "high" | "medium";
}

interface EmergencyProcedure {
  id: number;
  title: string;
  steps: string[];
  icon: React.ReactNode;
}

export default function SupportCard3() {
  const [emergencyMode, setEmergencyMode] = useState(false);

  const emergencyContacts: EmergencyContact[] = [
    {
      id: 1,
      name: "Critical Support Line",
      description: "For system outages and critical business issues",
      phone: "+1 (555) 999-8888",
      available: true,
      priority: "critical",
    },
    {
      id: 2,
      name: "Security Incident Response",
      description: "Security breaches and data protection incidents",
      phone: "+1 (555) 777-6666",
      available: true,
      priority: "critical",
    },
    {
      id: 3,
      name: "Technical Emergency",
      description: "Production system failures and technical crises",
      phone: "+1 (555) 666-5555",
      available: true,
      priority: "high",
    },
    {
      id: 4,
      name: "Billing Emergency",
      description: "Payment processing and financial emergencies",
      phone: "+1 (555) 555-4444",
      available: true,
      priority: "medium",
    },
  ];

  const emergencyProcedures: EmergencyProcedure[] = [
    {
      id: 1,
      title: "System Outage",
      steps: [
        "Check system status dashboard",
        "Contact critical support line",
        "Follow incident response protocol",
        "Communicate with affected users",
      ],
      icon: <Zap size={20} />,
    },
    {
      id: 2,
      title: "Security Breach",
      steps: [
        "Isolate affected systems",
        "Contact security team immediately",
        "Preserve evidence and logs",
        "Notify compliance officer",
      ],
      icon: <Shield size={20} />,
    },
    {
      id: 3,
      title: "Data Loss",
      steps: [
        "Stop all data operations",
        "Contact data recovery team",
        "Restore from latest backup",
        "Initiate recovery protocol",
      ],
      icon: <Download size={20} />,
    },
  ];

  const handleEmergencyCall = (contact: EmergencyContact) => {
    if (contact.available) {
      alert(`Calling emergency contact: ${contact.name}\n${contact.phone}`);
      setEmergencyMode(true);
    } else {
      alert(
        `${contact.name} is currently unavailable. Please try another contact.`
      );
    }
  };

  const handleEmergencyToggle = () => {
    setEmergencyMode(!emergencyMode);
    if (!emergencyMode) {
      alert("Emergency mode activated. Priority routing enabled.");
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          {/* Emergency Header */}
          <div
            className={`p-8 text-white ${
              emergencyMode
                ? "bg-linear-to-r from-red-600 to-orange-600"
                : "bg-linear-to-r from-orange-600 to-amber-600"
            }`}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <AlertTriangle size={32} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    {emergencyMode
                      ? "🚨 EMERGENCY MODE ACTIVE 🚨"
                      : "Emergency Support"}
                  </h1>
                  <p className="text-orange-100">
                    {emergencyMode
                      ? "Priority routing enabled. All agents alerted."
                      : "Critical support for urgent situations requiring immediate attention"}
                  </p>
                </div>
              </div>

              <button
                onClick={handleEmergencyToggle}
                className={`px-6 py-3 font-semibold rounded-xl transition-all ${
                  emergencyMode
                    ? "bg-white text-red-600 hover:bg-red-50"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                {emergencyMode
                  ? "Deactivate Emergency"
                  : "Activate Emergency Mode"}
              </button>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="p-8">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Emergency Contacts
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {emergencyContacts.map((contact) => (
                  <motion.div
                    key={contact.id}
                    whileHover={{ scale: 1.02 }}
                    className={`rounded-xl p-6 border-2 transition-all ${
                      contact.priority === "critical"
                        ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/30"
                        : contact.priority === "high"
                        ? "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800/30"
                        : "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800/30"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={`p-2 rounded-lg ${
                              contact.priority === "critical"
                                ? "bg-red-100 dark:bg-red-900/30"
                                : contact.priority === "high"
                                ? "bg-orange-100 dark:bg-orange-900/30"
                                : "bg-yellow-100 dark:bg-yellow-900/30"
                            }`}
                          >
                            <Phone
                              size={20}
                              className={
                                contact.priority === "critical"
                                  ? "text-red-600 dark:text-red-400"
                                  : contact.priority === "high"
                                  ? "text-orange-600 dark:text-orange-400"
                                  : "text-yellow-600 dark:text-yellow-400"
                              }
                            />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              {contact.name}
                            </h3>
                            <div
                              className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${
                                contact.priority === "critical"
                                  ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
                                  : contact.priority === "high"
                                  ? "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400"
                                  : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400"
                              }`}
                            >
                              {contact.priority.toUpperCase()} PRIORITY
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                          {contact.description}
                        </p>
                      </div>

                      <div
                        className={`w-3 h-3 rounded-full ${
                          contact.available ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {contact.phone}
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEmergencyCall(contact)}
                          className={`px-6 py-2 font-medium rounded-lg transition-colors ${
                            contact.available
                              ? "bg-red-600 hover:bg-red-700 text-white"
                              : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                          }`}
                          disabled={!contact.available}
                        >
                          Call Now
                        </button>
                        <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg transition-colors">
                          <MessageSquare size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Emergency Procedures */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Emergency Procedures
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {emergencyProcedures.map((procedure) => (
                  <motion.div
                    key={procedure.id}
                    whileHover={{ y: -5 }}
                    className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                        <div className="text-red-600 dark:text-red-400">
                          {procedure.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {procedure.title}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {procedure.steps.map((step, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                            {index + 1}
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>

                    <button className="w-full mt-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors">
                      Execute Protocol
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Emergency Information */}
            <div className="bg-linear-to-r from-gray-900 to-black dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 text-white">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-3">
                    Emergency Response Team
                  </h3>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Users size={20} className="text-red-400" />
                      <span>12 Dedicated Agents</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={20} className="text-red-400" />
                      <span>24/7 Availability</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield size={20} className="text-red-400" />
                      <span>SLA: 5-min Response</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
                    Download Emergency Handbook
                  </button>
                  <button className="px-8 py-3 bg-red-600 hover:bg-red-700 font-semibold rounded-xl transition-colors">
                    Request Emergency Training
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
