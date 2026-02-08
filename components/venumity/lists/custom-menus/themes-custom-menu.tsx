"use client";
import { useState } from "react";
import { Sun, Moon, Monitor, Palette, Contrast, Droplets } from "lucide-react";

export default function CustomMenuWithThemes() {
  const [selectedTheme, setSelectedTheme] = useState("system");

  const themes = [
    {
      id: "light",
      name: "Light",
      icon: Sun,
      color: "bg-white border-gray-300",
    },
    {
      id: "dark",
      name: "Dark",
      icon: Moon,
      color: "bg-gray-900 border-gray-700",
    },
    {
      id: "system",
      name: "System",
      icon: Monitor,
      color: "bg-gradient-to-r from-white to-gray-900 border-gray-400",
    },
  ];

  const colorThemes = [
    {
      id: "blue",
      name: "Ocean",
      color: "bg-gradient-to-br from-blue-500 to-teal-400",
    },
    {
      id: "purple",
      name: "Royal",
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
    },
    {
      id: "green",
      name: "Forest",
      color: "bg-gradient-to-br from-green-500 to-emerald-400",
    },
    {
      id: "orange",
      name: "Sunset",
      color: "bg-gradient-to-br from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="w-80 p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
        Custom Menu with Themes
      </h3>

      {/* Mode Selection */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Palette className="w-5 h-5 text-primary" />
          <h4 className="font-medium text-gray-900 dark:text-white">
            Appearance Mode
          </h4>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {themes.map((theme) => {
            const Icon = theme.icon;
            const isSelected = selectedTheme === theme.id;

            return (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-lg border ${theme.color} flex items-center justify-center mb-2`}
                >
                  <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </div>
                <span
                  className={`text-sm font-medium ${
                    isSelected
                      ? "text-primary"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {theme.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Themes */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Droplets className="w-5 h-5 text-primary" />
          <h4 className="font-medium text-gray-900 dark:text-white">
            Color Themes
          </h4>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {colorThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => alert(`Selected ${theme.name} theme`)}
              className="group relative overflow-hidden rounded-lg"
            >
              <div
                className={`${theme.color} h-20 rounded-lg transition-transform group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <span className="absolute bottom-3 left-3 text-white font-medium drop-shadow">
                {theme.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Contrast Settings */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Contrast className="w-5 h-5 text-primary" />
          <h4 className="font-medium text-gray-900 dark:text-white">
            Contrast Settings
          </h4>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">
              Increase Contrast
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">
              Reduce Motion
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
