"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, UserCheck } from "lucide-react";

export default function BasicFollowButton() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(1245);

  const handleFollow = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowers((prev) => prev - 1);
    } else {
      setIsFollowing(true);
      setFollowers((prev) => prev + 1);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4 bg-linear-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-3xl font-bold">JD</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              John Doe
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Web Developer & Designer
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {followers}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Followers
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                342
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Following
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                56
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Posts
              </div>
            </div>
          </div>

          {/* Follow Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleFollow}
            className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-all ${
              isFollowing
                ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isFollowing ? (
              <>
                <UserCheck size={20} />
                Following
              </>
            ) : (
              <>
                <UserPlus size={20} />
                Follow
              </>
            )}
          </motion.button>

          {/* Status Message */}
          <div className="mt-6 text-center text-sm">
            {isFollowing ? (
              <p className="text-green-600">✓ You are now following John Doe</p>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                Follow to see John is updates
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.main>
  );
}
