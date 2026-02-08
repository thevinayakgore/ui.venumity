"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Plus, X, Edit2, Copy, Check, Filter } from "lucide-react";
import { useState } from "react";

interface CustomLabel {
  id: string;
  text: string;
  color: string;
  textColor: string;
  category: string;
}

const colorOptions = [
  {
    name: "Blue",
    value: "bg-blue-500",
    text: "text-white",
    category: "Status",
  },
  {
    name: "Green",
    value: "bg-green-500",
    text: "text-white",
    category: "Status",
  },
  {
    name: "Yellow",
    value: "bg-yellow-500",
    text: "text-gray-900",
    category: "Warning",
  },
  { name: "Red", value: "bg-red-500", text: "text-white", category: "Error" },
  {
    name: "Purple",
    value: "bg-purple-500",
    text: "text-white",
    category: "Feature",
  },
  {
    name: "Pink",
    value: "bg-pink-500",
    text: "text-white",
    category: "Feature",
  },
  {
    name: "Gray",
    value: "bg-gray-500",
    text: "text-white",
    category: "Default",
  },
];

const defaultLabels: CustomLabel[] = [
  {
    id: "1",
    text: "New",
    color: "bg-blue-500",
    textColor: "text-white",
    category: "Status",
  },
  {
    id: "2",
    text: "Featured",
    color: "bg-purple-500",
    textColor: "text-white",
    category: "Feature",
  },
  {
    id: "3",
    text: "Sale",
    color: "bg-green-500",
    textColor: "text-white",
    category: "Status",
  },
  {
    id: "4",
    text: "Limited",
    color: "bg-yellow-500",
    textColor: "text-gray-900",
    category: "Warning",
  },
  {
    id: "5",
    text: "Popular",
    color: "bg-pink-500",
    textColor: "text-white",
    category: "Feature",
  },
  {
    id: "6",
    text: "Error",
    color: "bg-red-500",
    textColor: "text-white",
    category: "Error",
  },
  {
    id: "7",
    text: "Default",
    color: "bg-gray-500",
    textColor: "text-white",
    category: "Default",
  },
];

const categories = ["All", "Status", "Feature", "Warning", "Error", "Default"];

export default function LabelInteractive() {
  const [labels, setLabels] = useState<CustomLabel[]>(defaultLabels);
  const [newText, setNewText] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddLabel = () => {
    if (!newText.trim()) return;

    const newLabel: CustomLabel = {
      id: Date.now().toString(),
      text: newText.trim(),
      color: colorOptions[selectedColor].value,
      textColor: colorOptions[selectedColor].text,
      category: colorOptions[selectedColor].category,
    };

    setLabels([...labels, newLabel]);
    setNewText("");
  };

  const handleRemoveLabel = (id: string) => {
    setLabels(labels.filter((label) => label.id !== id));
  };

  const handleStartEdit = (label: CustomLabel) => {
    setEditingId(label.id);
    setEditText(label.text);
  };

  const handleSaveEdit = () => {
    if (!editingId || !editText.trim()) return;

    setLabels(
      labels.map((label) =>
        label.id === editingId ? { ...label, text: editText.trim() } : label
      )
    );
    setEditingId(null);
    setEditText("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleCopyLabel = async (label: CustomLabel) => {
    const labelCode = `<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${label.color} ${label.textColor}">${label.text}</span>`;

    await navigator.clipboard.writeText(labelCode);
    setCopiedId(label.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReset = () => {
    setLabels(defaultLabels);
    setNewText("");
    setSelectedColor(0);
    setEditingId(null);
    setSelectedCategory("All");
    setSearchTerm("");
  };

  const filteredLabels = labels.filter((label) => {
    const matchesCategory =
      selectedCategory === "All" || label.category === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      label.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      label.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                Interactive Label Manager
              </span>
            </div>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Reset to Default
            </button>
          </div>

          {/* Label Creator */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
              Create Custom Label
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Label Text
                  </label>
                  <input
                    type="text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddLabel()}
                    placeholder="Enter label text..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Color & Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        className={`flex flex-col items-center p-2 rounded-lg border transition-all ${
                          selectedColor === index
                            ? "ring-2 ring-offset-2 ring-blue-500 border-transparent"
                            : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                        }`}
                      >
                        <div
                          className="w-8 h-8 rounded-full mb-1 border border-gray-300 dark:border-gray-600"
                          style={{
                            backgroundColor: color.value.replace("bg-", ""),
                          }}
                        />
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          {color.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleAddLabel}
                  disabled={!newText.trim()}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                  Add Label
                </button>
              </div>

              {/* Preview */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preview
                </label>
                <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center gap-4">
                  {newText ? (
                    <>
                      <span
                        className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-medium ${colorOptions[selectedColor].value} ${colorOptions[selectedColor].text}`}
                      >
                        {newText}
                      </span>
                      <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Category: {colorOptions[selectedColor].category}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Color: {colorOptions[selectedColor].name}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      <p>Enter text to see preview</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Filter & Search */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search labels..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                      selectedCategory === category
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    {category} (
                    {category === "All"
                      ? labels.length
                      : labels.filter((l) => l.category === category).length}
                    )
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  Label Library
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {filteredLabels.length} of {labels.length} labels
                </p>
              </div>
            </div>

            <AnimatePresence>
              {filteredLabels.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 text-gray-500 dark:text-gray-400"
                >
                  <Tag className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No labels found matching your criteria</p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredLabels.map((label) => (
                    <motion.div
                      key={label.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                    >
                      {editingId === label.id ? (
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
                              className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${label.color} ${label.textColor}`}
                            >
                              {label.text}
                            </span>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleCopyLabel(label)}
                                className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                                title="Copy code"
                              >
                                {copiedId === label.id ? (
                                  <Check className="w-4 h-4 text-green-500" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>
                              <button
                                onClick={() => handleStartEdit(label)}
                                className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleRemoveLabel(label.id)}
                                className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                                title="Delete"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className="flex-1 h-2 rounded-full"
                                style={{
                                  backgroundColor: label.color.replace(
                                    "bg-",
                                    ""
                                  ),
                                }}
                              ></div>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {label.color.replace("bg-", "").split("-")[0]}
                              </span>
                            </div>
                            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
                              {label.category}
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

          {/* Category Summary */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Categories Summary
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {categories.slice(1).map((category) => {
                const categoryLabels = labels.filter(
                  (l) => l.category === category
                );
                const count = categoryLabels.length;

                return (
                  <div
                    key={category}
                    className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {category}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {count} labels
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {categoryLabels.slice(0, 3).map((label) => (
                        <span
                          key={label.id}
                          className={`inline-flex items-center px-2 py-0.5 text-xs rounded-full ${label.color} ${label.textColor}`}
                        >
                          {label.text}
                        </span>
                      ))}
                      {count > 3 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          +{count - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
