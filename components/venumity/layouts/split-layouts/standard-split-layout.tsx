"use client";
import { motion } from "framer-motion";
import { FileText, Users, Settings, ImageIcon } from "lucide-react";

export default function StandardSplitLayout() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Content */}
            <div className="lg:w-1/2 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-12">
              <div className="max-w-md mx-auto">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <ImageIcon className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                      Content Management
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">Primary section</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Documents</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Organized file system</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Manage all your documents in one place with advanced search and categorization.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <Users className="w-6 h-6 text-green-600 dark:text-green-300" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Team</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">Collaboration hub</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Work together with your team in real-time with shared documents and communication.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:w-1/2 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 p-12">
              <div className="max-w-md mx-auto">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Settings className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                      Configuration
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">Settings & Preferences</p>
                  </div>
                </div>

                <div className="mb-10">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                    Quick Settings
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: "Dark Mode", enabled: true },
                      { label: "Notifications", enabled: true },
                      { label: "Auto-save", enabled: false },
                      { label: "Two-factor Auth", enabled: true },
                    ].map((setting, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-200">{setting.label}</span>
                        <div className={`w-12 h-6 rounded-full transition-colors ${setting.enabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                          <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${setting.enabled ? 'translate-x-7' : 'translate-x-1'}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Statistics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">1.2K</div>
                      <div className="text-gray-600 dark:text-gray-300 text-sm">Active Users</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">98%</div>
                      <div className="text-gray-600 dark:text-gray-300 text-sm">Satisfaction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">24/7</div>
                      <div className="text-gray-600 dark:text-gray-300 text-sm">Support</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">A+</div>
                      <div className="text-gray-600 dark:text-gray-300 text-sm">Security</div>
                    </div>
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