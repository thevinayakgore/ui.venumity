"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X, Home, User, Settings, Bell, Plus, ChevronRight } from "lucide-react";

export default function AnimatedCustomLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("dashboard");

  const sections = [
    { id: "dashboard", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { id: "profile", label: "Profile", icon: <User className="w-5 h-5" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-5 h-5" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  const widgets = [
    { id: 1, title: "Performance", value: "94%", change: "+5.2%" },
    { id: 2, title: "Users Online", value: "1.2k", change: "+12%" },
    { id: 3, title: "Revenue", value: "$24.8k", change: "+18%" },
    { id: 4, title: "Growth", value: "42%", change: "+7%" },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
          {/* Animated Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden p-2 bg-white/20 rounded-lg backdrop-blur-sm"
                >
                  {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
                </motion.button>
                <h1 className="text-2xl font-bold text-white">Animated Custom Layout</h1>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                New Widget
              </motion.button>
            </div>
          </motion.div>

          <div className="flex">
            {/* Animated Sidebar */}
            <AnimatePresence>
              {(isMenuOpen || window.innerWidth >= 1024) && (
                <motion.aside
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  className="lg:w-1/4 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 backdrop-blur-sm"
                >
                  <nav className="p-6">
                    <ul className="space-y-2">
                      {sections.map((section) => (
                        <motion.li
                          key={section.id}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <button
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                              activeSection === section.id
                                ? "bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {section.icon}
                              <span className="font-medium">{section.label}</span>
                            </div>
                            <ChevronRight className={`w-4 h-4 transition-transform ${
                              activeSection === section.id ? "rotate-90" : ""
                            }`} />
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1">
              <div className="p-6">
                {/* Animated Widget Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {widgets.map((widget, index) => (
                    <motion.div
                      key={widget.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, rotate: 1 }}
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                          {widget.title}
                        </h3>
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-10 h-10 rounded-full bg-linear-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center"
                        >
                          <span className="text-blue-600 dark:text-blue-300 font-bold">
                            {index + 1}
                          </span>
                        </motion.div>
                      </div>
                      <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                        {widget.value}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-500 text-sm font-medium">
                          {widget.change}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          from last month
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Animated Content Area */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center"
                      >
                        {sections.find(s => s.id === activeSection)?.icon}
                      </motion.div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                          {sections.find(s => s.id === activeSection)?.label} Section
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                          Interactive content area with smooth animations and transitions
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[1, 2, 3].map((item) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: item * 0.1 }}
                          className="p-4 bg-white dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-700 dark:text-gray-200">
                              Content Item {item}
                            </h4>
                            <motion.div
                              whileHover={{ scale: 1.2 }}
                              className="w-6 h-6 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center cursor-pointer"
                            >
                              <ChevronRight className="w-3 h-3 text-white" />
                            </motion.div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                            This content adapts based on the selected section with smooth animations.
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}