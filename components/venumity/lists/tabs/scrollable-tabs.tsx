"use client";
import { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Briefcase,
  FileText,
  Users,
  Settings,
  Calendar,
  PieChart,
  Bell,
  HelpCircle,
  Star,
  Download,
  Upload,
  Share2,
} from "lucide-react";

export default function ScrollableTabs() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "team", label: "Team", icon: Users },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "analytics", label: "Analytics", icon: PieChart },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "favorites", label: "Favorites", icon: Star },
    { id: "import", label: "Import", icon: Download },
    { id: "export", label: "Export", icon: Upload },
    { id: "share", label: "Share", icon: Share2 },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "help", label: "Help", icon: HelpCircle },
  ];

  const scrollLeft = () => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const tabContent = {
    dashboard: "Overview of all your activities and statistics.",
    projects: "Manage and track all your ongoing projects.",
    documents: "Access and organize all your documents.",
    team: "Collaborate with your team members.",
    calendar: "Schedule and manage your events.",
    analytics: "View detailed analytics and reports.",
    notifications: "Manage your notification preferences.",
    favorites: "Access your starred and favorite items.",
    import: "Import data from various sources.",
    export: "Export your data in different formats.",
    share: "Share content with others.",
    settings: "Configure application settings.",
    help: "Get help and support.",
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
        Scrollable Tabs
      </h3>

      {/* Scrollable Tabs Container */}
      <div className="relative">
        {/* Scroll Buttons */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Tabs */}
        <div
          ref={tabsContainerRef}
          className="flex space-x-1 overflow-x-auto scrollbar-hide py-2 px-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium whitespace-nowrap">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            {(() => {
              const Icon = tabs.find((t) => t.id === activeTab)?.icon;
              return Icon ? <Icon className="w-6 h-6 text-primary" /> : null;
            })()}
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">
              {activeTab}
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              {tabContent[activeTab as keyof typeof tabContent]}
            </p>
          </div>
        </div>

        {/* Content Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="font-medium text-gray-900 dark:text-white mb-2">
              Tab Information
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>
                Active Tab:{" "}
                <span className="font-medium text-primary">{activeTab}</span>
              </div>
              <div>
                Total Tabs: <span className="font-medium">{tabs.length}</span>
              </div>
              <div>
                Position:{" "}
                <span className="font-medium">
                  {tabs.findIndex((t) => t.id === activeTab) + 1}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="font-medium text-gray-900 dark:text-white mb-2">
              Quick Actions
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1.5 text-sm bg-primary text-white rounded hover:bg-primary/90">
                Action 1
              </button>
              <button className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                Action 2
              </button>
              <button className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                Action 3
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Help */}
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
        Use the arrow buttons or scroll horizontally to navigate through all
        tabs
      </div>
    </div>
  );
}
