"use client";
import { useState } from "react";
import {
  Wifi,
  WifiOff,
  Battery,
  BatteryCharging,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Bell,
  BellOff,
} from "lucide-react";

export default function MenuWithStatusIndicators() {
  const [settings, setSettings] = useState({
    wifi: true,
    battery: 85,
    charging: true,
    volume: 75,
    darkMode: false,
    notifications: true,
  });

  const toggleSetting = (setting: keyof typeof settings) => {
    if (setting === "battery" || setting === "volume") return;

    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const updateVolume = (value: number) => {
    setSettings((prev) => ({
      ...prev,
      volume: Math.max(0, Math.min(100, value)),
    }));
  };

  const statusItems = [
    {
      label: "Wi-Fi",
      icon: settings.wifi ? Wifi : WifiOff,
      value: settings.wifi ? "Connected" : "Disconnected",
      color: settings.wifi ? "text-green-500" : "text-red-500",
      action: () => toggleSetting("wifi"),
    },
    {
      label: "Battery",
      icon: settings.charging ? BatteryCharging : Battery,
      value: `${settings.battery}%${settings.charging ? " (Charging)" : ""}`,
      color: settings.battery > 20 ? "text-green-500" : "text-red-500",
      showProgress: true,
    },
    {
      label: "Volume",
      icon: settings.volume > 0 ? Volume2 : VolumeX,
      value: `${settings.volume}%`,
      color: "text-blue-500",
      showSlider: true,
    },
    {
      label: "Dark Mode",
      icon: settings.darkMode ? Moon : Sun,
      value: settings.darkMode ? "On" : "Off",
      color: settings.darkMode ? "text-purple-500" : "text-yellow-500",
      action: () => toggleSetting("darkMode"),
    },
    {
      label: "Notifications",
      icon: settings.notifications ? Bell : BellOff,
      value: settings.notifications ? "Enabled" : "Disabled",
      color: settings.notifications ? "text-green-500" : "text-gray-500",
      action: () => toggleSetting("notifications"),
    },
  ];

  return (
    <div className="w-80 p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
        Menu with Status Indicators
      </h3>

      <div className="space-y-4">
        {statusItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${item.color}`} />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {item.label}
                  </span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {item.value}
                </span>
              </div>

              {item.showProgress && (
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      settings.battery > 20 ? "bg-green-500" : "bg-red-500"
                    }`}
                    style={{ width: `${settings.battery}%` }}
                  />
                </div>
              )}

              {item.showSlider && (
                <div className="flex items-center space-x-3">
                  <VolumeX className="w-4 h-4 text-gray-400" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings.volume}
                    onChange={(e) => updateVolume(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                  />
                  <Volume2 className="w-4 h-4 text-gray-400" />
                </div>
              )}

              {item.action && (
                <button
                  onClick={item.action}
                  className={`w-full mt-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    item.label === "Dark Mode" && settings.darkMode
                      ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {item.label === "Dark Mode"
                    ? "Toggle Theme"
                    : `Turn ${
                        settings[
                          item.label
                            .toLowerCase()
                            .replace("-", "") as keyof typeof settings
                        ]
                          ? "Off"
                          : "On"
                      }`}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
