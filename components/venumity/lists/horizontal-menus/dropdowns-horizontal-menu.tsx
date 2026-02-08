"use client";
import { useState } from "react";
import {
  ChevronDown,
  Home,
  Briefcase,
  FileText,
  Users,
  Settings,
  Star,
  Calendar,
  PieChart,
} from "lucide-react";

export default function HorizontalMenuWithDropdowns() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
    },
    {
      id: "projects",
      label: "Projects",
      icon: Briefcase,
      dropdown: [
        { label: "All Projects", icon: Briefcase },
        { label: "Favorites", icon: Star },
        { label: "Archived", icon: FileText },
      ],
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: PieChart,
      dropdown: [
        { label: "Overview", icon: PieChart },
        { label: "Reports", icon: FileText },
        { label: "Export", icon: FileText },
      ],
    },
    {
      id: "calendar",
      label: "Calendar",
      icon: Calendar,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      dropdown: [
        { label: "General", icon: Settings },
        { label: "Team", icon: Users },
        { label: "Billing", icon: FileText },
      ],
    },
  ];

  const handleMouseEnter = (id: string) => {
    const item = menuItems.find((i) => i.id === id);
    if (item?.dropdown) {
      setOpenDropdown(id);
    }
  };

  const handleMouseLeave = () => {
    setTimeout(() => setOpenDropdown(null), 200);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Horizontal Menu with Dropdowns
      </h3>

      <div className="flex space-x-1 relative">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const hasDropdown = item.dropdown;
          const isDropdownOpen = openDropdown === item.id;

          return (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => {
                  setActiveTab(item.id);
                  if (!hasDropdown) setOpenDropdown(null);
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{item.label}</span>
                {hasDropdown && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {hasDropdown && isDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10"
                  onMouseEnter={() => setOpenDropdown(item.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <div className="py-1">
                    {item.dropdown!.map((dropdownItem, index) => (
                      <button
                        key={index}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <dropdownItem.icon className="w-4 h-4" />
                        <span>{dropdownItem.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
