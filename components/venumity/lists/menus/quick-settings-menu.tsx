"use client";
import { useState } from "react";
import {
  Zap,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Globe,
  Clock,
  Download,
  Upload,
  Cpu,
} from "lucide-react";

export default function MenuWithQuickSettings() {
  const [settings, setSettings] = useState({
    performanceMode: false,
    privacyMode: false,
    vpn: true,
    autoSave: true,
    sync: true,
    bandwidthLimit: false,
  });

  const toggleSetting = (setting: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const quickSettings = [
    {
      label: "Performance Mode",
      icon: Zap,
      description: "Boost system performance",
      enabled: settings.performanceMode,
      action: () => toggleSetting("performanceMode"),
      color: "bg-orange-500",
    },
    {
      label: "Privacy Mode",
      icon: Lock,
      description: "Enhance privacy protection",
      enabled: settings.privacyMode,
      action: () => toggleSetting("privacyMode"),
      color: "bg-purple-500",
    },
    {
      label: "VPN",
      icon: Shield,
      description: "Secure connection enabled",
      enabled: settings.vpn,
      action: () => toggleSetting("vpn"),
      color: "bg-green-500",
    },
    {
      label: "Auto Save",
      icon: Clock,
      description: "Automatically save changes",
      enabled: settings.autoSave,
      action: () => toggleSetting("autoSave"),
      color: "bg-blue-500",
    },
    {
      label: "Cloud Sync",
      icon: Globe,
      description: "Sync across devices",
      enabled: settings.sync,
      action: () => toggleSetting("sync"),
      color: "bg-indigo-500",
    },
    {
      label: "Bandwidth Limit",
      icon: settings.bandwidthLimit ? EyeOff : Eye,
      description: settings.bandwidthLimit
        ? "Bandwidth limited"
        : "Unlimited bandwidth",
      enabled: settings.bandwidthLimit,
      action: () => toggleSetting("bandwidthLimit"),
      color: settings.bandwidthLimit ? "bg-red-500" : "bg-gray-500",
    },
  ];

  const stats = [
    { label: "CPU Usage", value: "42%", icon: Cpu, color: "text-blue-500" },
    {
      label: "Download Speed",
      value: "2.4 MB/s",
      icon: Download,
      color: "text-green-500",
    },
    {
      label: "Upload Speed",
      value: "1.1 MB/s",
      icon: Upload,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="w-80 p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
        Menu with Quick Settings
      </h3>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="text-center">
              <Icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Settings Grid */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {quickSettings.map((setting) => {
          const Icon = setting.icon;

          return (
            <button
              key={setting.label}
              onClick={setting.action}
              className={`p-4 rounded-lg border transition-all ${
                setting.enabled
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`${setting.color} w-8 h-8 rounded-lg flex items-center justify-center`}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div
                  className={`w-8 h-5 rounded-full transition-colors ${
                    setting.enabled
                      ? "bg-primary"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full bg-white transform transition-transform ${
                      setting.enabled ? "translate-x-4" : "translate-x-1"
                    }`}
                  />
                </div>
              </div>

              <div className="text-left">
                <div className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                  {setting.label}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {setting.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* System Status */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium text-gray-900 dark:text-white">
            System Status
          </span>
          <span className="text-sm text-green-500">
            All Systems Operational
          </span>
        </div>

        <div className="space-y-2">
          {["Security", "Network", "Storage", "Backup"].map((system) => (
            <div key={system} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {system}
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs text-gray-500">Operational</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
