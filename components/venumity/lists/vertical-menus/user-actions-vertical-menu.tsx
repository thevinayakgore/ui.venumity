"use client";
import { useState } from "react";
import {
  User,
  Settings,
  Bell,
  LogOut,
  HelpCircle,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Share2,
  Star,
} from "lucide-react";

export default function VerticalMenuWithUserActions() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Administrator",
    avatar: "JD",
  };

  const mainMenu = [
    { id: "dashboard", label: "Dashboard", icon: User },
    { id: "projects", label: "Projects", icon: Settings },
    { id: "analytics", label: "Analytics", icon: Bell },
    { id: "team", label: "Team", icon: User },
  ];

  const actionsMenu = [
    {
      id: "new",
      label: "New Project",
      icon: Plus,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      id: "search",
      label: "Search",
      icon: Search,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: "filter",
      label: "Filter",
      icon: Filter,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      id: "export",
      label: "Export",
      icon: Download,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
    },
  ];

  const secondaryActions = [
    { id: "import", label: "Import", icon: Upload },
    { id: "share", label: "Share", icon: Share2 },
    { id: "favorite", label: "Favorites", icon: Star },
  ];

  const userMenu = [
    { id: "profile", label: "Profile Settings", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "help", label: "Help Center", icon: HelpCircle },
    { id: "logout", label: "Log Out", icon: LogOut, variant: "danger" },
  ];

  return (
    <div className="w-80 p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
        Vertical Menu with User Actions
      </h3>

      {/* User Profile */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-linear-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {user.avatar}
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 dark:text-white">
              {user.name}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
            <div className="text-xs text-primary font-medium mt-1">
              {user.role}
            </div>
          </div>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="p-2 text-gray-500 hover:text-primary bg-white dark:bg-gray-700 rounded-lg"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* User Menu Dropdown */}
        {showUserMenu && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-1">
              {userMenu.map((item) => {
                const Icon = item.icon;
                const isDanger = item.variant === "danger";

                return (
                  <button
                    key={item.id}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all ${
                      isDanger
                        ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 px-2">
          Navigation
        </h4>
        <div className="space-y-1">
          {mainMenu.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all ${
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

      {/* Quick Actions */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 px-2">
          Quick Actions
        </h4>
        <div className="space-y-2">
          {actionsMenu.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.id}
                onClick={() => alert(`Action: ${action.label}`)}
                className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className={`${action.bgColor} p-2 rounded-lg`}>
                  <Icon className={`w-4 h-4 ${action.color}`} />
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Actions */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 px-2">
          More Actions
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {secondaryActions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.id}
                onClick={() => alert(`Action: ${action.label}`)}
                className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg mb-2">
                  <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Status Bar */}
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-600 dark:text-gray-400">
            Active:{" "}
            <span className="font-medium text-primary">{activeItem}</span>
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            {mainMenu.length} items
          </div>
        </div>
      </div>
    </div>
  );
}
