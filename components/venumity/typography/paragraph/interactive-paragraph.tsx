"use client";
import { motion } from "framer-motion";
import { Type, Edit2, Palette, RotateCw, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface TextProperty {
  id: string;
  name: string;
  property: string;
  value: string;
  unit?: string;
  min: number;
  max: number;
  step: number;
}

const textProperties: TextProperty[] = [
  {
    id: "fontSize",
    name: "Font Size",
    property: "fontSize",
    value: "16",
    unit: "px",
    min: 12,
    max: 32,
    step: 1,
  },
  {
    id: "lineHeight",
    name: "Line Height",
    property: "lineHeight",
    value: "1.5",
    unit: "",
    min: 1,
    max: 2.5,
    step: 0.1,
  },
  {
    id: "letterSpacing",
    name: "Letter Spacing",
    property: "letterSpacing",
    value: "0",
    unit: "px",
    min: -1,
    max: 5,
    step: 0.1,
  },
  {
    id: "wordSpacing",
    name: "Word Spacing",
    property: "wordSpacing",
    value: "0",
    unit: "px",
    min: 0,
    max: 10,
    step: 0.5,
  },
];

const colorOptions = [
  { name: "Black", value: "#000000" },
  { name: "Gray", value: "#4b5563" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Green", value: "#10b981" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Red", value: "#ef4444" },
];

const fontFamilies = [
  { name: "Inter", value: "'Inter', sans-serif" },
  { name: "Roboto", value: "'Roboto', sans-serif" },
  { name: "Georgia", value: "Georgia, serif" },
  { name: "Courier", value: "'Courier New', monospace" },
  { name: "Arial", value: "Arial, sans-serif" },
  { name: "Times", value: "'Times New Roman', serif" },
];

const sampleText = `This is an interactive paragraph editor. Adjust the settings below to customize the typography properties in real-time. You can modify font size, spacing, colors, and other text properties to see how they affect readability and appearance.`;

export default function ParagraphInteractive() {
  const [properties, setProperties] = useState(textProperties);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedFont, setSelectedFont] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [customText, setCustomText] = useState(sampleText);

  const updateProperty = (id: string, value: string) => {
    setProperties(
      properties.map((prop) => (prop.id === id ? { ...prop, value } : prop))
    );
  };

  const resetProperties = () => {
    setProperties(textProperties);
    setSelectedColor(0);
    setSelectedFont(0);
    setCustomText(sampleText);
  };

  const getTextStyles = () => {
    const styles: React.CSSProperties = {};

    properties.forEach((prop) => {
      switch (prop.property) {
        case "fontSize":
          styles.fontSize = `${prop.value}${prop.unit}`;
          break;
        case "lineHeight":
          styles.lineHeight = prop.value;
          break;
        case "letterSpacing":
          styles.letterSpacing = `${prop.value}${prop.unit}`;
          break;
        case "wordSpacing":
          styles.wordSpacing = `${prop.value}${prop.unit}`;
          break;
      }
    });

    styles.color = colorOptions[selectedColor].value;
    styles.fontFamily = fontFamilies[selectedFont].value;

    return styles;
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
              <Edit2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Interactive Paragraph Editor
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowControls(!showControls)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {showControls ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    <span>Hide Controls</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    <span>Show Controls</span>
                  </>
                )}
              </button>

              <button
                onClick={resetProperties}
                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                <RotateCw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Text Preview */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Live Preview
              </h3>

              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full min-h-[150px] p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                style={getTextStyles()}
              />
            </div>

            {/* Preview in Context */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preview in context:
              </p>
              <div className="space-y-4">
                <p className="text-gray-800 dark:text-gray-200">
                  Regular text followed by custom styled text:{" "}
                  <span style={getTextStyles()}>
                    {customText.length > 40
                      ? customText.substring(0, 40) + "..."
                      : customText}
                  </span>
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  This shows how your text styling looks within regular content.
                </p>
              </div>
            </div>
          </div>

          {showControls && (
            <>
              {/* Typography Controls */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                  Typography Controls
                </h3>

                <div className="space-y-6">
                  {properties.map((prop) => (
                    <div key={prop.id}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {prop.name}: {prop.value}
                          {prop.unit}
                        </span>
                        <span className="text-xs text-gray-500">
                          {prop.min}
                          {prop.unit} - {prop.max}
                          {prop.unit}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={prop.min}
                        max={prop.max}
                        step={prop.step}
                        value={prop.value}
                        onChange={(e) =>
                          updateProperty(prop.id, e.target.value)
                        }
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Color & Font Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Color Selection */}
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Palette className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Text Color
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {colorOptions.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        className={`flex flex-col items-center p-4 rounded-lg border transition-all ${
                          selectedColor === index
                            ? "ring-2 ring-offset-2 ring-blue-500 border-transparent"
                            : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                        }`}
                      >
                        <div
                          className="w-8 h-8 rounded-full mb-2 border border-gray-300 dark:border-gray-600"
                          style={{ backgroundColor: color.value }}
                        />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {color.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Selection */}
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Type className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Font Family
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {fontFamilies.map((font, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedFont(index)}
                        className={`flex flex-col items-center p-4 rounded-lg border transition-all ${
                          selectedFont === index
                            ? "ring-2 ring-offset-2 ring-blue-500 border-transparent"
                            : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                        }`}
                        style={{ fontFamily: font.value }}
                      >
                        <span className="text-lg mb-2">Aa</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {font.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Current Styles Summary */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Current Styles
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {properties.map((prop) => (
                <div
                  key={prop.id}
                  className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                >
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {prop.name}
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {prop.value}
                    {prop.unit}
                  </p>
                </div>
              ))}
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Color
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {colorOptions[selectedColor].name}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Font
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {fontFamilies[selectedFont].name}
                </p>
              </div>
            </div>
          </div>

          {/* Export Styles */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-1">
                  Export Styles
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Copy CSS styles for your paragraph
                </p>
              </div>

              <button
                onClick={() => {
                  const styles = getTextStyles();
                  const css = Object.entries(styles)
                    .map(([key, value]) => `${key}: ${value};`)
                    .join("\n");
                  navigator.clipboard.writeText(css);
                }}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                Copy CSS
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
