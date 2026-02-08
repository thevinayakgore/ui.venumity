"use client";
import { motion } from "framer-motion";
import { Link, ExternalLink, Copy, Check, Eye } from "lucide-react";
import { useState } from "react";

interface LinkStyle {
  id: string;
  name: string;
  style: string;
  hoverStyle: string;
  description: string;
}

const linkStyles: LinkStyle[] = [
  {
    id: "default",
    name: "Default",
    style: "text-blue-600 dark:text-blue-400",
    hoverStyle: "underline",
    description: "Standard blue link with underline on hover",
  },
  {
    id: "bold",
    name: "Bold",
    style: "text-blue-700 dark:text-blue-300 font-semibold",
    hoverStyle: "underline decoration-2",
    description: "Bolder text with thicker underline",
  },
  {
    id: "subtle",
    name: "Subtle",
    style: "text-gray-600 dark:text-gray-400",
    hoverStyle: "text-gray-900 dark:text-gray-200 underline",
    description: "Subtle gray that darkens on hover",
  },
  {
    id: "accent",
    name: "Accent",
    style: "text-purple-600 dark:text-purple-400",
    hoverStyle:
      "text-purple-700 dark:text-purple-300 underline decoration-dotted",
    description: "Purple link with dotted underline",
  },
  {
    id: "button",
    name: "Button-like",
    style:
      "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded",
    hoverStyle: "bg-blue-100 dark:bg-blue-900/40",
    description: "Link with background that changes on hover",
  },
  {
    id: "icon",
    name: "With Icon",
    style: "text-emerald-600 dark:text-emerald-400",
    hoverStyle: "text-emerald-700 dark:text-emerald-300 underline",
    description: "Link with external link icon",
  },
];

const sampleLinks = [
  { id: 1, text: "Documentation", url: "https://example.com/docs" },
  { id: 2, text: "Getting Started", url: "https://example.com/start" },
  { id: 3, text: "API Reference", url: "https://example.com/api" },
  { id: 4, text: "Community Forum", url: "https://example.com/forum" },
  { id: 5, text: "Contact Support", url: "https://example.com/support" },
];

export default function InlineTextLinks() {
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [showIcons, setShowIcons] = useState(true);
  const [showUnderline, setShowUnderline] = useState(true);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleCopyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const renderLink = (link: (typeof sampleLinks)[0]) => {
    const style = linkStyles[selectedStyle];
    const isIconStyle = style.id === "icon";

    return (
      <motion.a
        key={link.id}
        href="#"
        onClick={(e) => e.preventDefault()}
        className={`inline-flex items-center gap-1 mx-1 transition-all duration-200 ${
          style.style
        } ${
          showUnderline && style.hoverStyle.includes("underline")
            ? "hover:" + style.hoverStyle
            : ""
        } ${
          style.hoverStyle.includes("bg-") ? "hover:" + style.hoverStyle : ""
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {link.text}
        {(isIconStyle || showIcons) && <ExternalLink className="w-3 h-3" />}
      </motion.a>
    );
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-5xl">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 mb-2">
            <Link className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Inline Links
            </span>
          </div>

          {/* Links Preview */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Links in Context
              </h3>

              <div className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                <p className="mb-4">
                  Here are some useful resources for learning web development.
                  Check out the {renderLink(sampleLinks[0])} for detailed
                  guides, or start with {renderLink(sampleLinks[1])} for
                  beginners. For advanced topics, refer to the{" "}
                  {renderLink(sampleLinks[2])}. Join our{" "}
                  {renderLink(sampleLinks[3])} to connect with other developers,
                  and if you need help, do not hesitate to{" "}
                  {renderLink(sampleLinks[4])}.
                </p>
              </div>
            </div>

            {/* Link List */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                All Links
              </h4>
              <div className="flex flex-wrap gap-3">
                {sampleLinks.map((link) => (
                  <div
                    key={link.id}
                    className="flex items-center gap-2 bg-white dark:bg-gray-700 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    {renderLink(link)}
                    <button
                      onClick={() => handleCopyUrl(link.url)}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400"
                      title="Copy URL"
                    >
                      {copiedUrl === link.url ? (
                        <Check className="w-3 h-3 text-green-500" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Link Style Selection */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  Link Styles
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {linkStyles.length} different styles
                </p>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showIcons}
                    onChange={(e) => setShowIcons(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Show Icons
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showUnderline}
                    onChange={(e) => setShowUnderline(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Underline on Hover
                  </span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {linkStyles.map((style, index) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(index)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedStyle === index
                      ? "ring-2 ring-offset-2 ring-blue-500 border-transparent"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className={`text-sm transition-all ${style.style} ${
                        showUnderline && style.hoverStyle.includes("underline")
                          ? "hover:" + style.hoverStyle
                          : ""
                      }`}
                    >
                      {style.name}
                    </a>
                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                      {style.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Current Style Details */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Current Style Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tailwind Classes
                  </p>
                  <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4">
                    <code className="text-sm text-gray-300 font-mono">
                      {linkStyles[selectedStyle].style}
                    </code>
                    <div className="mt-2">
                      <code className="text-sm text-gray-400 font-mono">
                        hover: {linkStyles[selectedStyle].hoverStyle}
                      </code>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const classes = `${linkStyles[selectedStyle].style} hover:${linkStyles[selectedStyle].hoverStyle}`;
                    navigator.clipboard.writeText(classes);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy Classes
                </button>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Live Preview
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Hover over the link to see the effect:
                  </p>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className={`text-lg transition-all inline-block ${
                      linkStyles[selectedStyle].style
                    } ${
                      showUnderline
                        ? "hover:" + linkStyles[selectedStyle].hoverStyle
                        : ""
                    }`}
                  >
                    Example Link Preview
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Accessibility Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
            <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-4">
              Accessibility Guidelines
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Eye className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Color Contrast
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Ensure links have sufficient color contrast against
                    background (4.5:1 ratio)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Link className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Underline on Hover
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Always provide visual feedback when hovering over links
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <ExternalLink className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    External Links
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Indicate external links with icons for better user
                    experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
