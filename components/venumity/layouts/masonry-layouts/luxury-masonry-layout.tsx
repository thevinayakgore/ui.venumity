"use client";
import { motion } from "framer-motion";
import { Crown, Gem, Sparkles, Zap, Users, Award, Globe, Shield, BarChart3 } from "lucide-react";

interface LuxuryCard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  accentColor: string;
  features: string[];
  stats: { label: string; value: string; change: string }[];
  height: string;
}

export default function LuxuryMasonryLayout() {
  const cards: LuxuryCard[] = [
    {
      id: 1,
      title: "Executive Portfolio",
      subtitle: "Wealth Management",
      description: "Premium investment portfolio with real-time market analysis and automated trading",
      icon: <Crown className="w-10 h-10" />,
      gradient: "from-yellow-400 via-orange-400 to-yellow-600",
      accentColor: "text-yellow-300",
      features: ["AI-Powered Insights", "Risk Assessment", "Automated Trading", "Tax Optimization"],
      stats: [
        { label: "Current Value", value: "$2.48M", change: "+12.4%" },
        { label: "Monthly Growth", value: "8.7%", change: "+2.1%" },
      ],
      height: "h-96",
    },
    {
      id: 2,
      title: "Diamond Security",
      subtitle: "Maximum Protection",
      description: "Military-grade security suite with biometric authentication and quantum encryption",
      icon: <Gem className="w-10 h-10" />,
      gradient: "from-blue-400 via-purple-400 to-blue-600",
      accentColor: "text-blue-300",
      features: ["Biometric Access", "Quantum Encryption", "24/7 Monitoring", "Zero Trust"],
      stats: [
        { label: "Threats Blocked", value: "48.7K", change: "+5.2%" },
        { label: "Response Time", value: "<10ms", change: "-2ms" },
      ],
      height: "h-88",
    },
    {
      id: 3,
      title: "Global Network",
      subtitle: "Worldwide Presence",
      description: "Exclusive global network with priority access and premium connectivity",
      icon: <Globe className="w-10 h-10" />,
      gradient: "from-green-400 via-emerald-400 to-green-600",
      accentColor: "text-green-300",
      features: ["Priority Routing", "Edge Computing", "Global CDN", "Low Latency"],
      stats: [
        { label: "Countries", value: "186", change: "+24" },
        { label: "Data Centers", value: "248", change: "+12" },
      ],
      height: "h-84",
    },
    {
      id: 4,
      title: "Performance Suite",
      subtitle: "Elite Optimization",
      description: "Advanced performance monitoring and optimization tools for maximum efficiency",
      icon: <Zap className="w-10 h-10" />,
      gradient: "from-red-400 via-pink-400 to-red-600",
      accentColor: "text-pink-300",
      features: ["Real-time Analytics", "Predictive Scaling", "Load Balancing", "Cache Optimization"],
      stats: [
        { label: "Uptime", value: "99.99%", change: "+0.09%" },
        { label: "Speed Index", value: "0.8s", change: "-0.2s" },
      ],
      height: "h-80",
    },
    {
      id: 5,
      title: "VIP Community",
      subtitle: "Exclusive Network",
      description: "Premium community of elite professionals with exclusive networking opportunities",
      icon: <Users className="w-10 h-10" />,
      gradient: "from-teal-400 via-cyan-400 to-teal-600",
      accentColor: "text-cyan-300",
      features: ["Private Events", "Expert Sessions", "Networking", "Mentorship"],
      stats: [
        { label: "Members", value: "2.4K", change: "+18%" },
        { label: "Countries", value: "89", change: "+7" },
      ],
      height: "h-92",
    },
    {
      id: 6,
      title: "Achievement Hall",
      subtitle: "Recognition System",
      description: "Prestigious achievement tracking with exclusive rewards and recognition",
      icon: <Award className="w-10 h-10" />,
      gradient: "from-indigo-400 via-purple-400 to-indigo-600",
      accentColor: "text-purple-300",
      features: ["Exclusive Badges", "Milestone Rewards", "Leaderboards", "Recognition"],
      stats: [
        { label: "Achievements", value: "156", change: "+24" },
        { label: "Level", value: "Diamond", change: "↑" },
      ],
      height: "h-76",
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-8xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border-2 border-transparent">
          {/* Luxury animated border */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'conic-gradient(from 0deg, transparent, #FFD700, #FFA500, #FFD700, transparent)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-[2px] rounded-3xl bg-linear-to-br from-gray-900 via-black to-gray-900" />

          <div className="relative z-10 p-8">
            {/* Luxury Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12">
              <div className="flex items-center gap-4 mb-6 lg:mb-0">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 rounded-full bg-linear-to-r from-yellow-400 via-orange-400 to-yellow-600 flex items-center justify-center shadow-2xl shadow-yellow-500/30"
                  >
                    <Crown className="w-10 h-10 text-white" />
                  </motion.div>
                  <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-300" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold bg-linear-to-r from-yellow-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
                    Luxury Masonry Suite
                  </h2>
                  <p className="text-gray-400 mt-2">Exclusive premium cards with advanced features for elite users</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Shield className="w-8 h-8 text-blue-400" />
                <span className="text-gray-300">VIP Access Active</span>
              </div>
            </div>

            {/* Luxury Masonry Grid */}
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
                    style={{
                      background: (() => {
                        const parts = card.gradient?.split(' ') || [];
                        const from = parts[1]?.replace('from-', '#') || '#ffffff';
                        const to = parts[3]?.replace('to-', '#') || '#000000';
                        return `linear-gradient(to bottom right, ${from}, ${to})`;
                      })()
                    }}
                  />
                  
                  <div className="relative bg-linear-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 group-hover:border-gray-700 transition-all h-full">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-4 rounded-xl bg-linear-to-br ${card.gradient} shadow-2xl`}>
                        {card.icon}
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${card.accentColor}`}>{card.subtitle}</p>
                        <BarChart3 className="w-5 h-5 text-green-400 mt-1 ml-auto" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3">{card.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {card.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="text-gray-300 text-sm font-medium mb-3">Key Features</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {card.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-linear-to-r from-yellow-400 to-orange-400" />
                            <span className="text-gray-400 text-xs">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {card.stats.map((stat, index) => (
                        <div key={index} className="bg-gray-900/50 rounded-lg p-3">
                          <p className="text-gray-400 text-xs">{stat.label}</p>
                          <div className="flex items-end justify-between">
                            <p className="text-white font-bold text-lg">{stat.value}</p>
                            <span className="text-green-400 text-xs font-medium">{stat.change}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <motion.div
                      className="h-1 w-0 group-hover:w-full bg-linear-to-r opacity-50 rounded-full transition-all duration-500"
                      style={{
                        background: (() => {
                          const parts = card.gradient?.split(' ') || [];
                          const from = parts[1]?.replace('from-', '') || '#ffffff';
                          const to = parts[3]?.replace('to-', '') || '#000000';
                          return `linear-gradient(to right, ${from}, ${to})`;
                        })()
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Luxury Footer */}
            <div className="mt-12 pt-8 border-t border-gray-800">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 rounded-full bg-linear-to-r from-yellow-400 to-orange-400 flex items-center justify-center"
                  >
                    <Sparkles className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-gray-300 font-medium">Premium Luxury Suite</p>
                    <p className="text-gray-500 text-sm">Exclusive access to all premium features</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  {[
                    { value: "6", label: "Premium Cards" },
                    { value: "24", label: "Features" },
                    { value: "99.9%", label: "Uptime" },
                    { value: "VIP", label: "Access" },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-gray-500 text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}