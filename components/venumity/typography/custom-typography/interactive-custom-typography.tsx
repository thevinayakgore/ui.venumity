"use client";
import { motion } from "framer-motion";
import {
  Type,
  Sliders,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Palette,
  Type as TypeIcon,
} from "lucide-react";
import { useState } from "react";

interface FontOption {
  name: string;
  family: string;
  category: string;
}

const fontOptions: FontOption[] = [
  { name: "Inter", family: "'Inter', sans-serif", category: "Sans-serif" },
  { name: "Georgia", family: "Georgia, serif", category: "Serif" },
  {
    name: "Roboto Mono",
    family: "'Roboto Mono', monospace",
    category: "Monospace",
  },
  {
    name: "Playfair Display",
    family: "'Playfair Display', serif",
    category: "Display",
  },
  {
    name: "Open Sans",
    family: "'Open Sans', sans-serif",
    category: "Sans-serif",
  },
];

const colors = [
  { name: "Slate", value: "text-gray-800 dark:text-gray-200" },
  { name: "Blue", value: "text-blue-600 dark:text-blue-400" },
  { name: "Emerald", value: "text-emerald-600 dark:text-emerald-400" },
  { name: "Rose", value: "text-rose-600 dark:text-rose-400" },
  { name: "Purple", value: "text-purple-600 dark:text-purple-400" },
];

export default function CustomTypographyInteractive() {
  const [text, setText] = useState("Edit this text");
  const [selectedFont, setSelectedFont] = useState(0);
  const [fontSize, setFontSize] = useState(24);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [alignment, setAlignment] = useState<"left" | "center" | "right">(
    "left"
  );
  const [selectedColor, setSelectedColor] = useState(0);

  const handleExport = () => {
    const styles = {
      fontFamily: fontOptions[selectedFont].family,
      fontSize: `${fontSize}px`,
      lineHeight: lineHeight,
      letterSpacing: `${letterSpacing}px`,
      fontWeight: bold ? "bold" : "normal",
      fontStyle: italic ? "italic" : "normal",
      textDecoration: underline ? "underline" : "none",
      textAlign: alignment,
      color: colors[selectedColor].value.replace(/text-|dark:text-/g, ""),
    };

    console.log("Typography Styles:", styles);
    alert("Check console for export styles!");
  };

  const handleReset = () => {
    setText("Edit this text");
    setSelectedFont(0);
    setFontSize(24);
    setLineHeight(1.5);
    setLetterSpacing(0);
    setBold(false);
    setItalic(false);
    setUnderline(false);
    setAlignment("left");
    setSelectedColor(0);
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preview Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Type className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Interactive Typography Editor
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleExport}
                    className="px-4 py-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                  >
                    Export Styles
                  </button>
                </div>
              </div>

              {/* Text Preview */}
              <div className="mb-8">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full min-h-[150px] p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"
                  style={{
                    fontFamily: fontOptions[selectedFont].family,
                    fontSize: `${fontSize}px`,
                    lineHeight: lineHeight,
                    letterSpacing: `${letterSpacing}px`,
                    fontWeight: bold ? "bold" : "normal",
                    fontStyle: italic ? "italic" : "normal",
                    textDecoration: underline ? "underline" : "none",
                    textAlign: alignment,
                  }}
                />
              </div>

              {/* Live Preview */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Live Preview
                </h3>
                <div
                  className={`${colors[selectedColor].value}`}
                  style={{
                    fontFamily: fontOptions[selectedFont].family,
                    fontSize: `${fontSize}px`,
                    lineHeight: lineHeight,
                    letterSpacing: `${letterSpacing}px`,
                    fontWeight: bold ? "bold" : "normal",
                    fontStyle: italic ? "italic" : "normal",
                    textDecoration: underline ? "underline" : "none",
                    textAlign: alignment,
                  }}
                >
                  {text}
                </div>
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <Sliders className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Font Settings
                </h3>
              </div>

              {/* Font Selection */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Font Family
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {fontOptions.map((font, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedFont(index)}
                      className={`p-3 rounded-lg border transition-all ${
                        selectedFont === index
                          ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 ring-2 ring-blue-500/20"
                          : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                      }`}
                    >
                      <div
                        className="text-center mb-1"
                        style={{ fontFamily: font.family }}
                      >
                        {font.name}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {font.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Style Controls */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Font Size: {fontSize}px
                    </p>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="72"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Line Height: {lineHeight}
                    </p>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.1"
                    value={lineHeight}
                    onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Letter Spacing: {letterSpacing}px
                    </p>
                  </div>
                  <input
                    type="range"
                    min="-2"
                    max="10"
                    value={letterSpacing}
                    onChange={(e) => setLetterSpacing(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Style Controls */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <TypeIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Text Styles
                </h3>
              </div>

              {/* Text Style Buttons */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Text Style
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setBold(!bold)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                      bold
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300"
                        : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                  >
                    <Bold className="w-4 h-4" />
                    Bold
                  </button>

                  <button
                    onClick={() => setItalic(!italic)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                      italic
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300"
                        : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                  >
                    <Italic className="w-4 h-4" />
                    Italic
                  </button>

                  <button
                    onClick={() => setUnderline(!underline)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                      underline
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300"
                        : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                  >
                    <Underline className="w-4 h-4" />
                    Underline
                  </button>
                </div>
              </div>

              {/* Alignment */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Alignment
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setAlignment("left")}
                    className={`flex-1 py-3 rounded-lg border transition-all ${
                      alignment === "left"
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300"
                        : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                  >
                    <AlignLeft className="w-5 h-5 mx-auto" />
                  </button>

                  <button
                    onClick={() => setAlignment("center")}
                    className={`flex-1 py-3 rounded-lg border transition-all ${
                      alignment === "center"
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300"
                        : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                  >
                    <AlignCenter className="w-5 h-5 mx-auto" />
                  </button>

                  <button
                    onClick={() => setAlignment("right")}
                    className={`flex-1 py-3 rounded-lg border transition-all ${
                      alignment === "right"
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300"
                        : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                  >
                    <AlignRight className="w-5 h-5 mx-auto" />
                  </button>
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Palette className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Text Color
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                        selectedColor === index
                          ? "ring-2 ring-offset-2 ring-blue-500"
                          : "hover:border-gray-300 dark:hover:border-gray-500"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full ${color.value}`}
                      ></div>
                      <span className="text-sm">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
