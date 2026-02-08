"use client";
import { motion } from "framer-motion";
import { Home, User, Settings, Bell, FileText, HelpCircle, LogOut } from "lucide-react";

export default function StandardSidebarLayout() {
  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: "Dashboard", active: true },
    { icon: <User className="w-5 h-5" />, label: "Profile" },
    { icon: <FileText className="w-5 h-5" />, label: "Documents" },
    { icon: <Bell className="w-5 h-5" />, label: "Notifications", badge: 3 },
    { icon: <Settings className="w-5 h-5" />, label: "Settings" },
    { icon: <HelpCircle className="w-5 h-5" />, label: "Help" },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="lg:w-1/5 bg-linear-to-b from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-6 border-r border-gray-200 dark:border-gray-700">
              <div className="mb-8">
                <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <h3 className="font-bold text-gray-800 dark:text-gray-100">Admin Panel</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Standard Dashboard</p>
              </div>

              <nav>
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        item.active
                          ? "bg-blue-500 text-white"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}>
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-4/5 p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                  Standard Sidebar Layout
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Professional sidebar layout with navigation, user profile, and organized content areas
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { title: "Active Users", value: "1,248", change: "+12.5%", color: "bg-blue-100 dark:bg-blue-900/30" },
                  { title: "Revenue", value: "$48,560", change: "+8.7%", color: "bg-green-100 dark:bg-green-900/30" },
                  { title: "Tasks", value: "42", change: "Completed", color: "bg-purple-100 dark:bg-purple-900/30" },
                ].map((stat, index) => (
                  <div key={index} className={`${stat.color} rounded-xl p-6`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-700 dark:text-gray-200">{stat.title}</h3>
                      <span className="text-green-600 dark:text-green-300 text-sm font-medium">
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-8">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-700 dark:text-gray-200">
                            Activity Item {item}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Detailed description of recent activity
                          </p>
                        </div>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          {item}h ago
                        </span>
                      </div>
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