"use client";
import { useState } from "react";
import {
  Home,
  Briefcase,
  FileText,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Star,
} from "lucide-react";

export default function SidebarWithUserProfile() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "team", label: "Team", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-[500px] bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          collapsed ? "w-20" : "w-80"
        } flex flex-col transition-all duration-300 border-r border-gray-200 dark:border-gray-800`}
      >
        {/* User Profile Section */}
        <div
          className={`p-6 border-b border-gray-200 dark:border-gray-800 ${
            collapsed ? "text-center" : ""
          }`}
        >
          <div
            className={`flex ${
              collapsed ? "flex-col items-center" : "items-center space-x-4"
            }`}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-linear-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                JD
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
            </div>

            {!collapsed && (
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 dark:text-white">
                  John Doe
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Project Manager
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs text-gray-500">Premium User</span>
                </div>
              </div>
            )}
          </div>

          {!collapsed && (
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">
                  Verified
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">
                  Verified
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Collapse Button */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`w-full flex items-center ${
              collapsed ? "justify-center" : "justify-between"
            } px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800`}
          >
            {!collapsed && (
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Collapse Sidebar
              </span>
            )}
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Main Menu */}
        <div className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center ${
                  collapsed ? "justify-center" : "justify-start"
                } space-x-3 px-3 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Icon className="w-5 h-5" />
                {!collapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* User Stats */}
        {!collapsed && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  24
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Projects
                </div>
              </div>
              <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  128
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Tasks
                </div>
              </div>
              <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  89%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Done
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Sidebar with User Profile
        </h3>
        <div className="text-gray-600 dark:text-gray-400">
          <p>
            Current active item:{" "}
            <span className="font-medium text-primary">{activeItem}</span>
          </p>
          <p>Sidebar is {collapsed ? "collapsed" : "expanded"}</p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="font-medium text-gray-900 dark:text-white mb-2">
                Quick Stats
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Active Projects</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Team Members</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Upcoming Deadlines</span>
                  <span className="font-medium">3</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="font-medium text-gray-900 dark:text-white mb-2">
                Recent Activity
              </div>
              <div className="space-y-2 text-sm">
                <div>✓ Project Alpha updated</div>
                <div>✓ Team meeting scheduled</div>
                <div>✓ Document approved</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
