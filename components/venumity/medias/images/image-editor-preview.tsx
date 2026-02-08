"use client";
import { useState } from "react";
import { Save, Download } from "lucide-react";

export default function Image_6_2() {
  const [edits, setEdits] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    rotation: 0,
  });

  const updateEdit = (key: string, value: number) => {
    setEdits((prev) => ({ ...prev, [key]: value }));
  };

  const filters = [
    { name: "Original", value: "" },
    { name: "Vintage", value: "sepia(0.5)" },
    { name: "Black & White", value: "grayscale(1)" },
    { name: "Cool", value: "hue-rotate(180deg)" },
    { name: "Warm", value: "hue-rotate(-30deg)" },
    { name: "High Contrast", value: "contrast(150%)" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Image Editor
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview */}
          <div className="lg:col-span-2">
            <div className="bg-linear-to-br from-gray-900 to-black rounded-2xl p-6">
              <div
                className="aspect-square rounded-xl overflow-hidden relative"
                style={{
                  filter: `
                    brightness(${edits.brightness}%)
                    contrast(${edits.contrast}%)
                    saturate(${edits.saturation}%)
                    blur(${edits.blur}px)
                  `,
                  transform: `rotate(${edits.rotation}deg)`,
                }}
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-6xl">🖼️</div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            {/* Basic Controls */}
            <div className="space-y-4">
              <div>
                <label className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>Brightness</span>
                  <span>{edits.brightness}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={edits.brightness}
                  onChange={(e) =>
                    updateEdit("brightness", parseInt(e.target.value))
                  }
                  className="w-full"
                />
              </div>

              <div>
                <label className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>Contrast</span>
                  <span>{edits.contrast}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={edits.contrast}
                  onChange={(e) =>
                    updateEdit("contrast", parseInt(e.target.value))
                  }
                  className="w-full"
                />
              </div>

              <div>
                <label className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>Saturation</span>
                  <span>{edits.saturation}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={edits.saturation}
                  onChange={(e) =>
                    updateEdit("saturation", parseInt(e.target.value))
                  }
                  className="w-full"
                />
              </div>
            </div>

            {/* Filters */}
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white mb-3">
                Filters
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.name}
                    className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <div className="text-sm font-medium text-gray-800 dark:text-white">
                      {filter.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button className="w-full py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-lg font-medium transition-all">
                <Save className="w-5 h-5 inline mr-2" />
                Save Edits
              </button>
              <button className="w-full py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-medium transition-colors">
                <Download className="w-5 h-5 inline mr-2" />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
