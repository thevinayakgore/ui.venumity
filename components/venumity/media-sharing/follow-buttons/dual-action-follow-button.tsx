"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  UserMinus,
  Bell,
  BellOff,
  Check,
  MoreVertical,
} from "lucide-react";

type FollowStatus = "not-following" | "following" | "notifications-muted";

export default function DualActionFollowButton() {
  const [followStatus, setFollowStatus] =
    useState<FollowStatus>("not-following");
  const [followers, setFollowers] = useState(1542);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleFollow = () => {
    if (followStatus === "not-following") {
      setFollowStatus("following");
      setFollowers((prev) => prev + 1);
    } else {
      setFollowStatus("not-following");
      setFollowers((prev) => prev - 1);
    }
  };

  const toggleNotifications = () => {
    setFollowStatus((prev) =>
      prev === "following" ? "notifications-muted" : "following"
    );
  };

  const getButtonConfig = (status: FollowStatus) => {
    switch (status) {
      case "following":
        return {
          text: "Following",
          icon: <Check size={18} />,
          color:
            "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
          hoverColor: "hover:bg-gray-200 dark:hover:bg-gray-700",
          secondaryText: "Mute notifications",
          secondaryIcon: <Bell size={16} />,
        };
      case "notifications-muted":
        return {
          text: "Notifications off",
          icon: <BellOff size={18} />,
          color:
            "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300",
          hoverColor: "hover:bg-yellow-200 dark:hover:bg-yellow-800",
          secondaryText: "Turn on notifications",
          secondaryIcon: <Bell size={16} />,
        };
      default:
        return {
          text: "Follow",
          icon: <UserPlus size={18} />,
          color: "bg-blue-600 text-white",
          hoverColor: "hover:bg-blue-700",
          secondaryText: "",
          secondaryIcon: null,
        };
    }
  };

  const config = getButtonConfig(followStatus);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-lg">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
          {/* Profile Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-linear-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">MR</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Michael Reed
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  @michaelreed • Tech Influencer
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-bold">
                      {followers.toLocaleString()}
                    </span>{" "}
                    followers
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-bold">245</span> following
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <MoreVertical size={20} />
            </button>
          </div>

          {/* Follow Action Area */}
          <div className="space-y-4">
            {/* Main Follow Button */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleFollow}
                className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-all ${config.color} ${config.hoverColor}`}
              >
                {config.icon}
                {config.text}
              </motion.button>

              {/* Secondary Action Button */}
              {followStatus !== "not-following" && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={toggleNotifications}
                  className="px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  {config.secondaryIcon}
                </motion.button>
              )}
            </div>

            {/* Action Menu */}
            {followStatus === "following" && isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-lg"
              >
                <button
                  onClick={toggleNotifications}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center gap-2"
                >
                  <Bell size={16} />
                  {config.secondaryText}
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center gap-2">
                  <UserMinus size={16} />
                  Unfollow
                </button>
              </motion.div>
            )}

            {/* Status Indicators */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="font-bold text-gray-900 dark:text-white">
                    Active
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Last seen: 2h ago
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="font-bold text-gray-900 dark:text-white">
                    {followStatus === "not-following"
                      ? "Not Following"
                      : "Following"}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Status
                  </div>
                </div>
              </div>
            </div>

            {/* Status Message */}
            <div className="text-center">
              {followStatus === "not-following" ? (
                <p className="text-gray-600 dark:text-gray-400">
                  Follow Michael to see his tech insights and updates
                </p>
              ) : followStatus === "following" ? (
                <p className="text-green-600 dark:text-green-400">
                  ✓ Following Michael. You will see his posts in your feed.
                </p>
              ) : (
                <p className="text-yellow-600 dark:text-yellow-400">
                  🔕 Notifications muted. You are still following but would not
                  get notifications.
                </p>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {followStatus === "not-following" ? "Follow" : "Following"}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Action
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {followStatus === "notifications-muted" ? "Off" : "On"}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Notifications
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {followers}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Followers
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
