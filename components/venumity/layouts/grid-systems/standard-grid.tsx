"use client";
import { motion } from "framer-motion";

export default function StandardGrid() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">
              Standard Grid System
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Professional grid layout with responsive columns and modern spacing
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { title: "Revenue", value: "$48,560", change: "+12.5%", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300" },
              { title: "Users", value: "8,426", change: "+24.3%", color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300" },
              { title: "Orders", value: "1,248", change: "+8.7%", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300" },
              { title: "Growth", value: "94.2%", change: "+5.1%", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-linear-to-br from-white to-gray-50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-200">{item.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${item.color}`}>
                    {item.change}
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  {item.value}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Updated in real-time
                </p>
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  Main Content Area
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  This area spans two columns on larger screens and provides ample space for primary content,
                  charts, or detailed information displays.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Feature A</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Detailed description</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Feature B</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Additional information</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-linear-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl p-8 h-full">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  Side Panel
                </h3>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Recent Activity</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Latest updates and changes</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Quick Actions</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Common tasks and shortcuts</p>
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