"use client";
import { motion } from "framer-motion";
import { User, MapPin, Briefcase, Award } from "lucide-react";

export default function MinimalProfileAbout() {
  const stats = [
    { icon: <Briefcase className="w-5 h-5" />, label: "Experience", value: "8+ Years" },
    { icon: <Award className="w-5 h-5" />, label: "Projects", value: "150+" },
    { icon: <User className="w-5 h-5" />, label: "Clients", value: "85+" },
    { icon: <MapPin className="w-5 h-5" />, label: "Location", value: "San Francisco" },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Image */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mx-auto">
            <div className="absolute inset-0 bg-linear-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-600 rounded-full" />
            <div className="absolute inset-4 bg-linear-to-tr from-blue-50 to-white dark:from-gray-900 dark:to-black rounded-full flex items-center justify-center">
              <User className="w-32 h-32 text-gray-400 dark:text-gray-600" />
            </div>
          </div>
        </motion.div>

        {/* Right Column - Content */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              About Me
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              I am a passionate designer and developer with over 8 years of experience creating
              digital experiences that blend aesthetics with functionality. My approach combines
              technical expertise with creative vision.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}