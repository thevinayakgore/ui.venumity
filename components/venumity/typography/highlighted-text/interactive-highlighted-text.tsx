
"use client";
import { motion } from "framer-motion";
import { Highlighter, Search, Edit2, Trash2, Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface HighlightedPhrase {
  id: string;
  text: string;
  color: string;
}

const colorOptions = [
  {
    name: "Yellow",
    value:
      "bg-yellow-200 dark:bg-yellow-900/30 text-yellow-900 dark:text-yellow-200",
  },
  {
    name: "Blue",
    value: "bg-blue-200 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200",
  },
  {
    name: "Green",
    value:
      "bg-green-200 dark:bg-green-900/30 text-green-900 dark:text-green-200",
  },
  {
    name: "Pink",
    value: "bg-pink-200 dark:bg-pink-900/30 text-pink-900 dark:text-pink-200",
  },
  {
    name: "Purple",
    value:
      "bg-purple-200 dark:bg-purple-900/30 text-purple-900 dark:text-purple-200",
  },
];

const initialText = `Interactive highlighting allows you to select and highlight specific phrases in real-time. 
You can add custom highlights, change their colors, or remove them. 
This feature is perfect for annotating text, studying, or emphasizing key information. 
Try highlighting different parts of this text to see how it works!`;

export default function HighlightedTextInteractive() {
  const [text] = useState(initialText);
  const [highlights, setHighlights] = useState<HighlightedPhrase[]>([
    { id: "1", text: "Interactive highlighting", color: colorOptions[0].value },
    { id: "2", text: "real-time", color: colorOptions[1].value },
    { id: "3", text: "annotating text", color: colorOptions[2].value },
    { id: "4", text: "key information", color: colorOptions[3].value },
  ]);
  const [selectedText, setSelectedText] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        setSelectedText(selection.toString().trim());
      }
    };

    document.addEventListener("selectionchange", handleSelection);
    return () =>
      document.removeEventListener("selectionchange", handleSelection);
  }, []);

  const handleAddHighlight = () => {
    if (!selectedText || selectedText.length < 2) return;

    const newHighlight: HighlightedPhrase = {
      id: Date.now().toString(),
      text: selectedText,
      color: colorOptions[selectedColor].value,
    };

    setHighlights([...highlights, newHighlight]);
    setSelectedText("");

    // Clear selection
    window.getSelection()?.removeAllRanges();
  };

  const handleRemoveHighlight = (id: string) => {
    setHighlights(highlights.filter((h) => h.id !== id));
  };

  const handleStartEdit = (highlight: HighlightedPhrase) => {
    setIsEditing(highlight.id);
    setEditText(highlight.text);
  };

  const handleSaveEdit = (id: string) => {
    setHighlights(
      highlights.map((h) => (h.id === id ? { ...h, text: editText } : h))
    );
    setIsEditing(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setEditText("");
  };

  const renderText = () => {
    const result: React.ReactNode[] = [];
    const words = text.split(/(\s+)/);

    words.forEach((word, wordIndex) => {
      let highlighted = false;

      for (const highlight of highlights) {
        if (word.toLowerCase().includes(highlight.text.toLowerCase())) {
          const parts = word.split(new RegExp(`(${highlight.text})`, "i"));

          parts.forEach((part, partIndex) => {
            if (part.toLowerCase() === highlight.text.toLowerCase()) {
              result.push(
                <mark
                  key={`${wordIndex}-${partIndex}`}
                  className={`${highlight.color} px-1 py-0.5 rounded relative group`}
                >
                  {part}
                  <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleRemoveHighlight(highlight.id)}
                      className="bg-red-500 text-white p-1 rounded-full"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </mark>
              );
            } else if (part) {
              result.push(
                <span key={`${wordIndex}-${partIndex}`}>{part}</span>
              );
            }
          });

          highlighted = true;
          break;
        }
      }

      if (!highlighted) {
        result.push(<span key={wordIndex}>{word}</span>);
      }
    });

    return result;
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
              <Highlighter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Interactive Highlighter
              </span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {highlights.length} highlights
            </div>
          </div>

          {/* Text Area */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select text to highlight:
              </p>
              <div
                ref={textRef}
                className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed p-4 bg-gray-50 dark:bg-gray-800 rounded-lg min-h-[150px] selection:bg-blue-200 dark:selection:bg-blue-800"
              >
                {renderText()}
              </div>
            </div>

            {/* Selection Controls */}
            {selectedText && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      Selected: &quot;{selectedText}&ldquo;
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      Choose color and add highlight
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {colorOptions.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedColor(index)}
                          className={`w-6 h-6 rounded-full border-2 transition-all ${
                            selectedColor === index
                              ? "border-gray-900 dark:border-white scale-110"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                          style={{
                            backgroundColor:
                              color.value
                                .split(" ")[0]
                                .replace("bg-", "")
                                .split("-")[0] === "yellow"
                                ? "#fef3c7"
                                : color.value
                                    .split(" ")[0]
                                    .replace("bg-", "")
                                    .split("-")[0] === "blue"
                                ? "#dbeafe"
                                : color.value
                                    .split(" ")[0]
                                    .replace("bg-", "")
                                    .split("-")[0] === "green"
                                ? "#d1fae5"
                                : color.value
                                    .split(" ")[0]
                                    .replace("bg-", "")
                                    .split("-")[0] === "pink"
                                ? "#fce7f3"
                                : "#f3e8ff",
                          }}
                          title={color.name}
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleAddHighlight}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Highlight</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Highlights Management */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Manage Highlights
                </h3>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Click to edit, hover to delete
              </span>
            </div>

            {highlights.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Highlighter className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No highlights yet. Select text above to add highlights.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((highlight) => (
                  <div
                    key={highlight.id}
                    className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                  >
                    {isEditing === highlight.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveEdit(highlight.id)}
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
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              highlight.color.split(" ")[0]
                            }`}
                          ></div>
                          <span
                            className={`px-2 py-1 rounded text-sm ${highlight.color}`}
                          >
                            {highlight.text}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleStartEdit(highlight)}
                            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleRemoveHighlight(highlight.id)}
                            className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
            <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-3">
              How to Use
            </h3>
            <ul className="space-y-2 text-sm text-blue-600 dark:text-blue-400">
              <li className="flex items-start gap-2">
                <span className="mt-1">1.</span>
                <span>Select any text in the paragraph above</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">2.</span>
                <span>Choose a highlight color from the color picker</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">3.</span>
                <span>Click &ldquo;Add Highlight&ldquo; to save your selection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">4.</span>
                <span>
                  Manage highlights in the list below (edit or delete)
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
