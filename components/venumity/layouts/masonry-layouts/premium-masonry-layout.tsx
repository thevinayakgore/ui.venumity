"use client";
import { motion } from "framer-motion";
import { Shield, Zap, Globe, Users, BarChart3, Award, TrendingUp, Clock } from "lucide-react";

interface PremiumCard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  stats: { label: string; value: string }[];
  height: string;
}

export default function PremiumMasonryLayout() {
  const cards: PremiumCard[] = [
    {
      id: 1,
      title: "Security Dashboard",
      subtitle: "Advanced Protection",
      description: "Real-time monitoring and threat detection with automated response systems",
      icon: <Shield className="w-8 h-8" />,
      gradient: "from-blue-500 to-cyan-500",
      stats: [
        { label: "Threats Blocked", value: "24,856" },
        { label: "Response Time", value: "<50ms" },
      ],
      height: "h-80",
    },
    {
      id: 2,
      title: "Performance Center",
      subtitle: "Optimization Tools",
      description: "Comprehensive performance analytics and optimization recommendations",
      icon: <Zap className="w-8 h-8" />,
      gradient: "from-green-500 to-emerald-500",
      stats: [
        { label: "Uptime", value: "99.99%" },
        { label: "Load Time", value: "0.8s" },
      ],
      height: "h-72",
    },
    {
      id: 3,
      title: "Global Analytics",
      subtitle: "Worldwide Coverage",
      description: "Real-time data from multiple regions with detailed geographical insights",
      icon: <Globe className="w-8 h-8" />,
      gradient: "from-purple-500 to-pink-500",
      stats: [
        { label: "Regions", value: "186" },
        { label: "Users", value: "2.4M" },
      ],
      height: "h-76",
    },
    {
      id: 4,
      title: "Team Management",
      subtitle: "Collaboration Hub",
      description: "Advanced team coordination tools with productivity tracking and reporting",
      icon: <Users className="w-8 h-8" />,
      gradient: "from-orange-500 to-red-500",
      stats: [
        { label: "Active Teams", value: "48" },
        { label: "Members", value: "1.2K" },
      ],
      height: "h-68",
    },
    {
      id: 5,
      title: "Business Intelligence",
      subtitle: "Data Insights",
      description: "Advanced analytics and predictive modeling for strategic decision making",
      icon: <BarChart3 className="w-8 h-8" />,
      gradient: "from-teal-500 to-green-500",
      stats: [
        { label: "Reports", value: "156" },
        { label: "Accuracy", value: "98.7%" },
      ],
      height: "h-84",
    },
    {
      id: 6,
      title: "Achievement Center",
      subtitle: "Recognition System",
      description: "Track accomplishments and milestones with reward systems and badges",
      icon: <Award className="w-8 h-8" />,
      gradient: "from-indigo-500 to-purple-500",
      stats: [
        { label: "Badges", value: "24" },
        { label: "Level", value: "Expert" },
      ],
      height: "h-64",
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-8xl mx-auto">
        <div className="bg-linear-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-8 border border-gray-700">
          {/* Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Premium Masonry Dashboard
              </h2>
              <p className="text-gray-400 max-w-2xl">
                Advanced masonry layout with premium cards, detailed metrics, and professional design
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex items-center gap-4">
              <Clock className="w-6 h-6 text-blue-400" />
              <span className="text-gray-300">Real-time Updates</span>
            </div>
          </div>

          {/* Premium Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8">
            {cards.map((card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: card.id * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`${card.height} mb-8 break-inside-avoid relative group`}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl rounded-2xl"
                  style={(() => {
                    const parts = card.gradient?.split(" ") || [];
                    const from = parts[0]?.replace("from-", "#") || "#000";
                    const to = parts[1]?.replace("to-", "#") || "#000";
                    return {
                      background: `linear-gradient(to bottom right, ${from}, ${to})`
                    };
                  })()}
                />
                
                <div className="relative bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 group-hover:border-gray-600 transition-all h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 rounded-xl bg-linear-to-br ${card.gradient} shadow-lg`}>
                      {card.icon}
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">{card.subtitle}</p>
                      <TrendingUp className="w-5 h-5 text-green-400 mt-1" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">{card.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {card.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {card.stats.map((stat, index) => (
                      <div key={index} className="bg-gray-800/50 rounded-lg p-3">
                        <p className="text-gray-400 text-xs">{stat.label}</p>
                        <p className="text-white font-bold text-lg">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                  
                  <motion.div
                    className="h-1 w-0 group-hover:w-full bg-linear-to-r opacity-50 rounded-full transition-all duration-500"
                    style={(() => {
                      const parts = card.gradient?.split(" ") || [];
                      const from = parts[0]?.replace("from-", "") || "";
                      const to = parts[1]?.replace("to-", "") || "";
                      return {
                        background: `linear-gradient(to right, ${from}, ${to})`
                      };
                    })()}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Footer */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Total Cards", value: "6", icon: <BarChart3 className="w-5 h-5" /> },
                { label: "Active Users", value: "2.4K", icon: <Users className="w-5 h-5" /> },
                { label: "Response Time", value: "<100ms", icon: <Zap className="w-5 h-5" /> },
                { label: "Uptime", value: "99.9%", icon: <Shield className="w-5 h-5" /> },
              ].map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gray-800">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-white font-bold">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}