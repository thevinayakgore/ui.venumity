"use client";
import { motion } from "framer-motion";
import { ChevronRight, FileText, Users, Settings, Bell } from "lucide-react";

export default function StandardStack() {
  const stackItems = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Document Management",
      description: "Organize and manage all your documents in one place",
      count: "24 files",
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description: "Work together with your team in real-time",
      count: "8 members",
      color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300",
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "System Configuration",
      description: "Customize settings and preferences",
      count: "12 settings",
      color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300",
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Notifications",
      description: "Stay updated with real-time alerts",
      count: "3 new",
      color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300",
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">
              Standard Stack Layout
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Professional stack layout with organized items and clear hierarchy
            </p>
          </div>

          <div className="space-y-6">
            {stackItems.map((item, index) => (
              <div
                key={index}
                className="bg-linear-to-r from-white to-gray-50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-colors group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${item.color}`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${item.color}`}>
                      {item.count}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.main>
  );
}