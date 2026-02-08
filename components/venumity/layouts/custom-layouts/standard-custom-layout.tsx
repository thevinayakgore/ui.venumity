"use client";
import { motion } from "framer-motion";
import { Home, Settings, Bell, User, Search } from "lucide-react";

export default function StandardCustomLayout() {
  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: "Dashboard", active: true },
    { icon: <User className="w-5 h-5" />, label: "Profile" },
    { icon: <Bell className="w-5 h-5" />, label: "Notifications" },
    { icon: <Settings className="w-5 h-5" />, label: "Settings" },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                  Standard Custom Layout
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Professional layout with navigation, header, and customizable content areas
                </p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Side Navigation */}
            <div className="lg:w-1/5 border-r border-gray-200 dark:border-gray-700">
              <nav className="p-4">
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <li key={item.label}>
                      <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        item.active
                          ? "bg-blue-500 text-white"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}>
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Main Content */}
            <div className="lg:w-4/5">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {[
                    { title: "Analytics", value: "85%", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300" },
                    { title: "Growth", value: "+24%", color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300" },
                    { title: "Users", value: "1,248", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300" },
                  ].map((stat) => (
                    <div key={stat.title} className="bg-white dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-700 dark:text-gray-200">{stat.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${stat.color}`}>
                          {stat.value}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                        Detailed metrics and insights for better decision making
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Custom Content Area
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    This area is fully customizable. You can add any content here including forms,
                    tables, charts, or additional widgets based on your requirements.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      Primary Action
                    </button>
                    <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                      Secondary Action
                    </button>
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