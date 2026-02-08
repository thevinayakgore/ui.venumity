"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MessageSquare, Star, Clock } from "lucide-react";

interface SupportAgent {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: "available" | "busy" | "offline";
  rating: number;
  responseTime: string;
  expertise: string[];
}

export default function SupportCard2() {
  const supportAgents: SupportAgent[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Support Specialist",
      email: "sarah@company.com",
      phone: "+1 (555) 111-2222",
      status: "available",
      rating: 4.9,
      responseTime: "< 5 min",
      expertise: ["Billing", "Account", "Technical"],
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Technical Support Engineer",
      email: "michael@company.com",
      phone: "+1 (555) 222-3333",
      status: "available",
      rating: 4.8,
      responseTime: "< 10 min",
      expertise: ["API", "Integrations", "Security"],
    },
    {
      id: 3,
      name: "Emma Wilson",
      role: "Customer Success Manager",
      email: "emma@company.com",
      phone: "+1 (555) 333-4444",
      status: "busy",
      rating: 4.7,
      responseTime: "15-30 min",
      expertise: ["Onboarding", "Training", "Enterprise"],
    },
    {
      id: 4,
      name: "David Kim",
      role: "Billing Specialist",
      email: "david@company.com",
      phone: "+1 (555) 444-5555",
      status: "available",
      rating: 4.9,
      responseTime: "< 5 min",
      expertise: ["Payments", "Invoices", "Refunds"],
    },
  ];

  const handleContactAgent = (
    agent: SupportAgent,
    method: "email" | "phone" | "chat"
  ) => {
    alert(`Contacting ${agent.name} via ${method}...`);
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
          {/* Header */}
          <div className="bg-linear-to-r from-green-600 to-emerald-600 p-8 text-white">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Meet Our Support Team
                </h1>
                <p className="text-green-100">
                  Connect directly with our expert support agents
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-sm text-green-200">Availability</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">95%</div>
                  <div className="text-sm text-green-200">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Agents Grid */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supportAgents.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Agent Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-linear-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                              {agent.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                {agent.name}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400">
                                {agent.role}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1">
                              <Star
                                size={16}
                                className="text-yellow-500 fill-yellow-500"
                              />
                              <span className="font-medium text-gray-900 dark:text-white">
                                {agent.rating}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock
                                size={16}
                                className="text-green-600 dark:text-green-400"
                              />
                              <span className="text-gray-600 dark:text-gray-400">
                                {agent.responseTime}
                              </span>
                            </div>
                            <div
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                agent.status === "available"
                                  ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                                  : agent.status === "busy"
                                  ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400"
                                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400"
                              }`}
                            >
                              {agent.status}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expertise */}
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Expertise
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {agent.expertise.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-sm rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Mail size={16} className="text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {agent.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone size={16} className="text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {agent.phone}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => handleContactAgent(agent, "chat")}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        <MessageSquare size={18} />
                        Chat Now
                      </button>
                      <button
                        onClick={() => handleContactAgent(agent, "phone")}
                        className="px-6 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        <Phone size={18} />
                        Call
                      </button>
                      <button
                        onClick={() => handleContactAgent(agent, "email")}
                        className="px-6 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        <Mail size={18} />
                        Email
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-10"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    50+
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Support Agents
                  </div>
                </div>
                <div className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    5 min
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Avg Response Time
                  </div>
                </div>
                <div className="bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    98%
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Satisfaction Rate
                  </div>
                </div>
                <div className="bg-linear-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    24/7
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Availability
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
