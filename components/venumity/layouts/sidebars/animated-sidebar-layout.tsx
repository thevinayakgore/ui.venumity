"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X, Home, User, Settings, Bell, FileText, HelpCircle, ChevronRight, LogOut } from "lucide-react";

export default function AnimatedSidebarLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("dashboard");

  const navItems = [
    { id: "dashboard", icon: <Home className="w-6 h-6" />, label: "Dashboard" },
    { id: "profile", icon: <User className="w-6 h-6" />, label: "Profile" },
    { id: "documents", icon: <FileText className="w-6 h-6" />, label: "Documents" },
    { id: "notifications", icon: <Bell className="w-6 h-6" />, label: "Notifications", badge: 3 },
    { id: "settings", icon: <Settings className="w-6 h-6" />, label: "Settings" },
    { id: "help", icon: <HelpCircle className="w-6 h-6" />, label: "Help" },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 bg-white/20 rounded-lg backdrop-blur-sm"
                >
                  {isSidebarOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
                </motion.button>
                <h1 className="text-2xl font-bold text-white">Animated Sidebar Layout</h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex">
            {/* Animated Sidebar */}
            <AnimatePresence>
              {(isSidebarOpen || window.innerWidth >= 1024) && (
                <motion.aside
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  className="lg:w-1/5 bg-white dark:bg-gray-800/50 backdrop-blur-sm border-r border-gray-200 dark:border-gray-700"
                >
                  <div className="p-6">
                    {/* User Profile */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-8 text-center"
                    >
                      <div className="w-20 h-20 rounded-full bg-linear-to-r from-blue-500 to-purple-500 mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">AJ</span>
                      </div>
                      <h3 className="font-bold text-gray-800 dark:text-gray-100">Alex Johnson</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Premium User</p>
                    </motion.div>

                    {/* Navigation */}
                    <nav>
                      <ul className="space-y-2">
                        {navItems.map((item) => (
                          <motion.li
                            key={item.id}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <button
                              onClick={() => {
                                setActiveItem(item.id);
                                if (window.innerWidth < 1024) setIsSidebarOpen(false);
                              }}
                              className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                                activeItem === item.id
                                  ? "bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                {item.icon}
                                <span className="font-medium">{item.label}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {item.badge && (
                                  <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                                    {item.badge}
                                  </span>
                                )}
                                <ChevronRight className={`w-4 h-4 transition-transform ${
                                  activeItem === item.id ? "rotate-90" : ""
                                }`} />
                              </div>
                            </button>
                          </motion.li>
                        ))}
                      </ul>
                    </nav>

                    {/* Logout Button */}
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="w-full flex items-center gap-3 p-4 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors mt-8"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Logout</span>
                    </motion.button>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 p-6 lg:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full"
                >
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                      {navItems.find(item => item.id === activeItem)?.label}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Interactive content area with smooth animations and transitions
                    </p>
                  </div>

                  {/* Content Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: item * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                            Content Item {item}
                          </h3>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center"
                          >
                            <span className="text-white font-bold">{item}</span>
                          </motion.div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Interactive content with animations and hover effects
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                      Performance Metrics
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: "Speed", value: 95 },
                        { label: "Uptime", value: 99.9 },
                        { label: "Users", value: "2.4K" },
                        { label: "Growth", value: "24%" },
                      ].map((stat, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center"
                        >
                          <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                            {stat.value}
                          </div>
                          <div className="text-gray-600 dark:text-gray-300 text-sm">
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}