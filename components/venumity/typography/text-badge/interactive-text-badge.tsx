"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Plus, X, Edit2, Copy, Check } from "lucide-react";
import { useState } from "react";

interface CustomBadge {
  id: string;
  text: string;
  color: string;
  textColor: string;
}

const colorOptions = [
  { name: "Blue", value: "bg-blue-500", text: "text-white" },
  { name: "Green", value: "bg-green-500", text: "text-white" },
  { name: "Yellow", value: "bg-yellow-500", text: "text-gray-900" },
  { name: "Red", value: "bg-red-500", text: "text-white" },
  { name: "Purple", value: "bg-purple-500", text: "text-white" },
  { name: "Pink", value: "bg-pink-500", text: "text-white" },
  { name: "Gray", value: "bg-gray-500", text: "text-white" },
];

const shapeOptions = [
  { name: "Rounded", value: "rounded-md" },
  { name: "Pill", value: "rounded-full" },
  { name: "Square", value: "rounded-none" },
];

const defaultBadges: CustomBadge[] = [
  { id: "1", text: "New", color: "bg-blue-500", textColor: "text-white" },
  {
    id: "2",
    text: "Featured",
    color: "bg-purple-500",
    textColor: "text-white",
  },
  { id: "3", text: "Sale", color: "bg-green-500", textColor: "text-white" },
  {
    id: "4",
    text: "Limited",
    color: "bg-yellow-500",
    textColor: "text-gray-900",
  },
  { id: "5", text: "Popular", color: "bg-pink-500", textColor: "text-white" },
];

export default function TextBadgeInteractive() {
  const [badges, setBadges] = useState<CustomBadge[]>(defaultBadges);
  const [newText, setNewText] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedShape, setSelectedShape] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleAddBadge = () => {
    if (!newText.trim()) return;

    const newBadge: CustomBadge = {
      id: Date.now().toString(),
      text: newText.trim(),
      color: colorOptions[selectedColor].value,
      textColor: colorOptions[selectedColor].text,
    };

    setBadges([...badges, newBadge]);
    setNewText("");
  };

  const handleRemoveBadge = (id: string) => {
    setBadges(badges.filter((badge) => badge.id !== id));
  };

  const handleStartEdit = (badge: CustomBadge) => {
    setEditingId(badge.id);
    setEditText(badge.text);
  };

  const handleSaveEdit = () => {
    if (!editingId || !editText.trim()) return;

    setBadges(
      badges.map((badge) =>
        badge.id === editingId ? { ...badge, text: editText.trim() } : badge
      )
    );
    setEditingId(null);
    setEditText("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleCopyBadge = async (badge: CustomBadge) => {
    const badgeCode = `<span class="inline-flex items-center px-3 py-1 ${shapeOptions[selectedShape].value} text-sm font-medium ${badge.color} ${badge.textColor}">${badge.text}</span>`;

    await navigator.clipboard.writeText(badgeCode);
    setCopiedId(badge.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReset = () => {
    setBadges(defaultBadges);
    setNewText("");
    setSelectedColor(0);
    setSelectedShape(0);
    setEditingId(null);
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Tag className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Interactive Badge Builder
              </span>
            </div>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Reset to Default
            </button>
          </div>

          {/* Badge Creator */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
              Create Custom Badge
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Badge Text
                  </label>
                  <input
                    type="text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddBadge()}
                    placeholder="Enter badge text..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        className={`w-10 h-10 rounded-lg border-2 transition-all ${
                          selectedColor === index
                            ? "border-gray-900 dark:border-white scale-110"
                            : "border-gray-300 dark:border-gray-600 hover:scale-105"
                        }`}
                        style={{
                          backgroundColor: color.value.replace("bg-", ""),
                        }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleAddBadge}
                  disabled={!newText.trim()}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                  Add Badge
                </button>
              </div>

              {/* Preview */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preview
                </label>
                <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 flex items-center justify-center">
                  {newText ? (
                    <span
                      className={`inline-flex items-center px-4 py-2 text-lg font-medium ${shapeOptions[selectedShape].value} ${colorOptions[selectedColor].value} ${colorOptions[selectedColor].text}`}
                    >
                      {newText}
                    </span>
                  ) : (
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      <p>Enter text to see preview</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Badge Library */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  Badge Library
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {badges.length} badges • Click to manage
                </p>
              </div>

              <div className="flex items-center gap-3">
                {shapeOptions.map((shape, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedShape(index)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      selectedShape === index
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    {shape.name}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {badges.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 text-gray-500 dark:text-gray-400"
                >
                  <Tag className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No badges yet. Create your first badge above!</p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {badges.map((badge) => (
                    <motion.div
                      key={badge.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                    >
                      {editingId === badge.id ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={handleSaveEdit}
                              className="flex-1 px-3 py-1.5 text-sm rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="flex-1 px-3 py-1.5 text-sm rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center justify-between">
                            <span
                              className={`inline-flex items-center px-3 py-1.5 text-sm font-medium ${shapeOptions[selectedShape].value} ${badge.color} ${badge.textColor}`}
                            >
                              {badge.text}
                            </span>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleCopyBadge(badge)}
                                className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                                title="Copy code"
                              >
                                {copiedId === badge.id ? (
                                  <Check className="w-4 h-4 text-green-500" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>
                              <button
                                onClick={() => handleStartEdit(badge)}
                                className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleRemoveBadge(badge.id)}
                                className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                                title="Delete"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div
                              className="flex-1 h-2 rounded-full"
                              style={{
                                backgroundColor: badge.color.replace("bg-", ""),
                              }}
                            ></div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {badge.color.replace("bg-", "").split("-")[0]}
                            </span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Example Usage */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Example Usage
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-800 dark:text-gray-200">
                  This product is{" "}
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 ${
                      shapeOptions[selectedShape].value
                    } text-sm font-medium ${
                      badges[0]?.color || "bg-blue-500"
                    } ${badges[0]?.textColor || "text-white"}`}
                  >
                    {badges[0]?.text || "New"}
                  </span>
                  {" and "}
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 ${
                      shapeOptions[selectedShape].value
                    } text-sm font-medium ${
                      badges[2]?.color || "bg-green-500"
                    } ${badges[2]?.textColor || "text-white"}`}
                  >
                    {badges[2]?.text || "Sale"}
                  </span>
                  {" for a limited time!"}
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-800 dark:text-gray-200">
                  This article is{" "}
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 ${
                      shapeOptions[selectedShape].value
                    } text-sm font-medium ${
                      badges[1]?.color || "bg-purple-500"
                    } ${badges[1]?.textColor || "text-white"}`}
                  >
                    {badges[1]?.text || "Featured"}
                  </span>
                  {" and "}
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 ${
                      shapeOptions[selectedShape].value
                    } text-sm font-medium ${
                      badges[4]?.color || "bg-pink-500"
                    } ${badges[4]?.textColor || "text-white"}`}
                  >
                    {badges[4]?.text || "Popular"}
                  </span>
                  {" among our readers."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
