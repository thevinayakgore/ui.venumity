"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  X,
  Search,
  Book,
  Video,
  MessageSquare,
  Phone,
  Mail,
  Download,
  Star,
  TrendingUp,
  Users,
  Clock,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface SupportChannel {
  id: number;
  name: string;
  status: "online" | "busy" | "offline";
  waitTime: string;
  icon: React.ReactNode;
  color: string;
}

interface Resource {
  id: number;
  title: string;
  type: "guide" | "video" | "article";
  duration: string;
  views: number;
}

interface Agent {
  id: number;
  name: string;
  role: string;
  status: "available" | "busy";
  rating: number;
  languages: string[];
}

export default function HelpWidgets5() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "resources" | "support" | "agents"
  >("resources");
  const [searchQuery, setSearchQuery] = useState("");

  const supportChannels: SupportChannel[] = [
    {
      id: 1,
      name: "Live Chat",
      status: "online",
      waitTime: "< 2 min",
      icon: <MessageSquare size={20} />,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: 2,
      name: "Phone Support",
      status: "online",
      waitTime: "< 5 min",
      icon: <Phone size={20} />,
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: 3,
      name: "Email Support",
      status: "online",
      waitTime: "2-4 hours",
      icon: <Mail size={20} />,
      color: "from-purple-500 to-pink-600",
    },
    {
      id: 4,
      name: "Video Call",
      status: "busy",
      waitTime: "15-30 min",
      icon: <Video size={20} />,
      color: "from-orange-500 to-red-600",
    },
  ];

  const resources: Resource[] = [
    {
      id: 1,
      title: "Getting Started Guide",
      type: "guide",
      duration: "10 min",
      views: 12500,
    },
    {
      id: 2,
      title: "Advanced Features Tutorial",
      type: "video",
      duration: "18 min",
      views: 8900,
    },
    {
      id: 3,
      title: "Troubleshooting Common Issues",
      type: "article",
      duration: "8 min",
      views: 15200,
    },
    {
      id: 4,
      title: "API Integration Handbook",
      type: "guide",
      duration: "25 min",
      views: 6300,
    },
    {
      id: 5,
      title: "Security Best Practices",
      type: "article",
      duration: "12 min",
      views: 11200,
    },
    {
      id: 6,
      title: "Mobile App Setup",
      type: "video",
      duration: "14 min",
      views: 7400,
    },
  ];

  const agents: Agent[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Support",
      status: "available",
      rating: 4.9,
      languages: ["EN", "ES"],
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Technical Expert",
      status: "available",
      rating: 4.8,
      languages: ["EN", "ZH"],
    },
    {
      id: 3,
      name: "Emma Wilson",
      role: "Customer Success",
      status: "busy",
      rating: 4.7,
      languages: ["EN", "FR"],
    },
    {
      id: 4,
      name: "David Kim",
      role: "Billing Specialist",
      status: "available",
      rating: 4.9,
      languages: ["EN", "KO"],
    },
  ];

  const stats = [
    { label: "Avg. Response", value: "2.4 min", icon: <Clock size={16} /> },
    { label: "Satisfaction", value: "96%", icon: <Star size={16} /> },
    { label: "First Contact", value: "89%", icon: <TrendingUp size={16} /> },
    { label: "Active Users", value: "2.4K", icon: <Users size={16} /> },
  ];

  const handleChannelClick = (channel: SupportChannel) => {
    alert(`Connecting to ${channel.name}...`);
  };

  const handleResourceClick = (resource: Resource) => {
    alert(`Opening ${resource.title}...`);
  };

  const handleAgentClick = (agent: Agent) => {
    if (agent.status === "available") {
      alert(`Connecting to ${agent.name}...`);
    } else {
      alert(`${agent.name} is currently busy. Please try another agent.`);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      {/* Main Content */}
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Comprehensive Help Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Access all support resources, live assistance, and analytics in one
          unified widget.
        </p>

        {/* Feature Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl">
                <Zap size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                All-in-One
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Everything you need in one place: resources, live support, agent
              availability, and real-time stats.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  Unified interface
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  Real-time updates
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  Smart routing
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-linear-to-br from-green-500 to-emerald-600 rounded-xl">
                <TrendingUp size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Live Analytics
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Monitor support metrics in real-time with interactive charts and
              performance indicators.
            </p>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">
                    Today is Volume
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    247 tickets
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">
                    Resolution Rate
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    94%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-[94%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-linear-to-br from-purple-500 to-pink-600 rounded-xl">
                <Users size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Team Collaboration
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              See which support agents are available and choose based on
              expertise, rating, or language.
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Online Agents
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  3/4 available
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Avg. Rating
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  4.8/5.0
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Languages
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  5+ supported
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Help Widget */}
      <div className="help-widget fixed bottom-6 right-6 z-50">
        {/* Main Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 bg-linear-to-br from-purple-600 to-pink-600 text-white rounded-full shadow-xl flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="help"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <HelpCircle size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Dashboard Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-linear-to-r from-purple-600 to-pink-600 p-6 text-white">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <HelpCircle size={24} />
                    <div>
                      <h2 className="text-xl font-bold">Support Dashboard</h2>
                      <div className="text-sm text-purple-200">
                        All help resources in one place
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab("resources")}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === "resources"
                        ? "bg-white text-purple-600"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    Resources
                  </button>
                  <button
                    onClick={() => setActiveTab("support")}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === "support"
                        ? "bg-white text-purple-600"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    Support
                  </button>
                  <button
                    onClick={() => setActiveTab("agents")}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === "agents"
                        ? "bg-white text-purple-600"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    Agents
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="h-96 overflow-y-auto">
                {/* Stats */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-4 gap-2">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1">
                          {stat.icon}
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4">
                  <AnimatePresence mode="wait">
                    {/* Resources Tab */}
                    {activeTab === "resources" && (
                      <motion.div
                        key="resources"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                      >
                        <div className="relative mb-4">
                          <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search resources..."
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 text-sm"
                          />
                        </div>

                        {resources.map((resource) => (
                          <button
                            key={resource.id}
                            onClick={() => handleResourceClick(resource)}
                            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-lg ${
                                  resource.type === "guide"
                                    ? "bg-blue-100 dark:bg-blue-900/30"
                                    : resource.type === "video"
                                    ? "bg-red-100 dark:bg-red-900/30"
                                    : "bg-green-100 dark:bg-green-900/30"
                                }`}
                              >
                                {resource.type === "guide" && (
                                  <Book
                                    size={16}
                                    className="text-blue-600 dark:text-blue-400"
                                  />
                                )}
                                {resource.type === "video" && (
                                  <Video
                                    size={16}
                                    className="text-red-600 dark:text-red-400"
                                  />
                                )}
                                {resource.type === "article" && (
                                  <HelpCircle
                                    size={16}
                                    className="text-green-600 dark:text-green-400"
                                  />
                                )}
                              </div>
                              <div className="text-left">
                                <div className="font-medium text-gray-900 dark:text-white text-sm">
                                  {resource.title}
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                  {resource.duration} •{" "}
                                  {resource.views.toLocaleString()} views
                                </div>
                              </div>
                            </div>
                            <Download size={16} className="text-gray-400" />
                          </button>
                        ))}
                      </motion.div>
                    )}

                    {/* Support Channels Tab */}
                    {activeTab === "support" && (
                      <motion.div
                        key="support"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                      >
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                            Contact Support
                          </h3>
                          <div className="space-y-3">
                            {supportChannels.map((channel) => (
                              <button
                                key={channel.id}
                                onClick={() => handleChannelClick(channel)}
                                className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-10 h-10 bg-linear-to-br ${channel.color} rounded-lg flex items-center justify-center text-white`}
                                  >
                                    {channel.icon}
                                  </div>
                                  <div className="text-left">
                                    <div className="font-medium text-gray-900 dark:text-white">
                                      {channel.name}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                      Wait time: {channel.waitTime}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-2 h-2 rounded-full ${
                                      channel.status === "online"
                                        ? "bg-green-500"
                                        : channel.status === "busy"
                                        ? "bg-yellow-500"
                                        : "bg-gray-400"
                                    }`}
                                  />
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {channel.status}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Agents Tab */}
                    {activeTab === "agents" && (
                      <motion.div
                        key="agents"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                      >
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                            Available Agents
                          </h3>
                          <div className="space-y-3">
                            {agents.map((agent) => (
                              <button
                                key={agent.id}
                                onClick={() => handleAgentClick(agent)}
                                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                                  agent.status === "available"
                                    ? "bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30"
                                    : "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-linear-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-semibold">
                                    {agent.name.charAt(0)}
                                  </div>
                                  <div className="text-left">
                                    <div className="font-medium text-gray-900 dark:text-white">
                                      {agent.name}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                      {agent.role}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="flex items-center gap-1 mb-1">
                                    <Star
                                      size={14}
                                      className="text-yellow-500 fill-yellow-500"
                                    />
                                    <span className="font-medium text-gray-900 dark:text-white">
                                      {agent.rating}
                                    </span>
                                  </div>
                                  <div
                                    className={`text-xs px-2 py-1 rounded-full ${
                                      agent.status === "available"
                                        ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                                        : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400"
                                    }`}
                                  >
                                    {agent.status}
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex gap-3">
                  <button className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-xl transition-colors">
                    Feedback
                  </button>
                  <button className="flex-1 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                    Emergency
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  );
}
