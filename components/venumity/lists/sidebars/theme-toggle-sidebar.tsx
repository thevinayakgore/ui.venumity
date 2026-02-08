"use client";
import { useState } from "react";
import {
  Moon,
  Sun,
  Monitor,
  Palette,
  Home,
  Briefcase,
  FileText,
  Users,
  Settings,
  Bell,
  User,
  LogOut,
} from "lucide-react";

export default function SidebarWithThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [activeItem, setActiveItem] = useState("dashboard");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "team", label: "Team", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const themes = [
    { id: "light", label: "Light", icon: Sun, color: "bg-white" },
    { id: "dark", label: "Dark", icon: Moon, color: "bg-gray-900" },
    {
      id: "system",
      label: "System",
      icon: Monitor,
      color: "bg-linear-to-r from-white to-gray-900",
    },
  ];

  const notifications = [
    {
      id: 1,
      title: "Project Update",
      message: "Project Alpha has been updated",
      time: "5 min ago",
      read: false,
    },
    {
      id: 2,
      title: "Team Message",
      message: "Sarah sent you a message",
      time: "1 hour ago",
      read: true,
    },
    {
      id: 3,
      title: "Deadline Reminder",
      message: "Report due tomorrow",
      time: "2 hours ago",
      read: false,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex h-[500px] bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 flex flex-col border-r border-gray-200 dark:border-gray-800">
        {/* User Profile */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-linear-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              JD
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 dark:text-white">
                John Doe
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Administrator
              </p>
            </div>
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg relative"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-gray-900 dark:text-white">
                        Notifications
                      </h5>
                      <button className="text-sm text-primary">
                        Mark all as read
                      </button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                          !notification.read
                            ? "bg-blue-50 dark:bg-blue-900/20"
                            : ""
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                          )}
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 dark:text-white">
                              {notification.title}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {notification.message}
                            </p>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                              {notification.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Theme Selector */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Palette className="w-5 h-5 text-primary" />
              <span className="font-medium text-gray-900 dark:text-white">
                Theme
              </span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
              {theme}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon;
              const isSelected = theme === themeOption.id;

              return (
                <button
                  key={themeOption.id}
                  onClick={() => setTheme(themeOption.id as "light" | "dark" | "system")}
                  className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full border ${themeOption.color} flex items-center justify-center mb-2`}
                  >
                    <Icon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      isSelected
                        ? "text-primary"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {themeOption.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Menu */}
        <div className="flex-1 p-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
          <button className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
            <User className="w-5 h-5" />
            <span className="font-medium">Profile Settings</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
          Sidebar with Theme Toggle
        </h3>

        <div className="space-y-6">
          {/* Theme Preview */}
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  Current Theme
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Preview of selected theme
                </div>
              </div>
              <div className="px-3 py-1.5 bg-primary text-white rounded-full text-sm font-medium capitalize">
                {theme} Mode
              </div>
            </div>

            <div
              className={`p-4 rounded-lg ${
                theme === "dark"
                  ? "bg-gray-900 text-white"
                  : theme === "light"
                  ? "bg-white text-gray-900 border"
                  : "bg-linear-to-r from-white to-gray-900 text-gray-900"
              }`}
            >
              <div className="font-medium mb-2">Theme Preview Card</div>
              <div className="text-sm opacity-80">
                This is how content appears in {theme} mode. You can see the
                background and text color differences.
              </div>
            </div>
          </div>

          {/* Active Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="font-medium text-gray-900 dark:text-white mb-2">
                Active Menu Item
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                <span className="font-medium text-primary">{activeItem}</span>
              </div>
            </div>

            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="font-medium text-gray-900 dark:text-white mb-2">
                Notifications
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                <span className="font-medium text-primary">{unreadCount}</span>{" "}
                unread notifications
              </div>
            </div>
          </div>

          {/* Theme Info */}
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="font-medium text-gray-900 dark:text-white mb-2">
              Theme Information
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <p>
                <span className="font-medium">Light Mode:</span> Bright
                background with dark text
              </p>
              <p>
                <span className="font-medium">Dark Mode:</span> Dark background
                with light text
              </p>
              <p>
                <span className="font-medium">System Mode:</span> Follows your
                device is theme setting
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
