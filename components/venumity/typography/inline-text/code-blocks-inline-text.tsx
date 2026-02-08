"use client";
import { motion } from "framer-motion";
import { Code, Copy, Check, Terminal, Brackets } from "lucide-react";
import { useState } from "react";

interface CodeExample {
  id: string;
  language: string;
  code: string;
  description: string;
}

const codeExamples: CodeExample[] = [
  {
    id: "html",
    language: "HTML",
    code: '<div class="container">Hello World</div>',
    description: "HTML element with class attribute",
  },
  {
    id: "css",
    language: "CSS",
    code: ".container { color: #3b82f6; }",
    description: "CSS class with color property",
  },
  {
    id: "js",
    language: "JavaScript",
    code: "const message = 'Hello World';",
    description: "JavaScript variable declaration",
  },
  {
    id: "ts",
    language: "TypeScript",
    code: "interface User { name: string; age: number; }",
    description: "TypeScript interface definition",
  },
  {
    id: "react",
    language: "React",
    code: "const Component = () => <div>Hello</div>;",
    description: "React functional component",
  },
  {
    id: "python",
    language: "Python",
    code: "def greet(name): return f'Hello {name}'",
    description: "Python function definition",
  },
];

const codeStyles = [
  {
    name: "Default",
    class: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200",
  },
  {
    name: "Dark",
    class: "bg-gray-800 dark:bg-gray-900 text-gray-100 dark:text-gray-300",
  },
  {
    name: "Blue",
    class: "bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300",
  },
  {
    name: "Green",
    class:
      "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300",
  },
  {
    name: "Purple",
    class:
      "bg-purple-50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300",
  },
  {
    name: "Red",
    class: "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300",
  },
];

export default function InlineTextCodeBlocks() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(false);

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(codeExamples[selectedExample].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleText = `In modern web development, you'll often use ${codeExamples[0].code} for structure, style it with ${codeExamples[1].code}, and add interactivity with ${codeExamples[2].code}. For type safety, consider using ${codeExamples[3].code}, and for building interfaces, ${codeExamples[4].code} is popular. Backend logic might be written in ${codeExamples[5].code}.`;

  const renderText = () => {
    const parts = sampleText.split(/(`[^`]+`)/g);

    return parts.map((part, index) => {
      if (part.startsWith("`") && part.endsWith("`")) {
        const code = part.slice(1, -1);
        const exampleIndex = codeExamples.findIndex((ex) => ex.code === code);

        if (exampleIndex !== -1) {
          return (
            <code
              key={index}
              className={`inline-flex items-center gap-1.5 font-mono text-sm px-2 py-1 rounded ${codeStyles[selectedStyle].class}`}
            >
              <Terminal className="w-3.5 h-3.5 opacity-70" />
              {code}
            </code>
          );
        }

        return (
          <code
            key={index}
            className={`font-mono text-sm px-2 py-1 rounded ${codeStyles[selectedStyle].class}`}
          >
            {code}
          </code>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 mb-2">
            <Code className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Inline Code Blocks
            </span>
          </div>

          {/* Example Text with Code */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Code in Context
              </h3>

              <div className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                {renderText()}
              </div>
            </div>

            {/* Code Preview */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Selected Code Example
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showLineNumbers}
                      onChange={(e) => setShowLineNumbers(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Line Numbers
                    </span>
                  </label>

                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="relative">
                {showLineNumbers && (
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-gray-900/10 dark:bg-gray-900/30 border-r border-gray-300 dark:border-gray-700">
                    <div className="py-2 pr-1 text-right">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        1
                      </div>
                    </div>
                  </div>
                )}

                <pre
                  className={`${
                    showLineNumbers ? "pl-10" : ""
                  } overflow-x-auto`}
                >
                  <code
                    className={`block font-mono text-sm p-3 rounded ${codeStyles[selectedStyle].class}`}
                  >
                    {codeExamples[selectedExample].code}
                  </code>
                </pre>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                {codeExamples[selectedExample].description}
              </p>
            </div>
          </div>

          {/* Code Examples Selection */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  Code Examples
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {codeExamples.length} programming languages
                </p>
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                Click to select
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {codeExamples.map((example, index) => (
                <button
                  key={example.id}
                  onClick={() => setSelectedExample(index)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedExample === index
                      ? "ring-2 ring-offset-2 ring-blue-500 border-transparent"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Brackets className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {example.language}
                    </span>
                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                      {example.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Style Selection */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Code Block Styles
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {codeStyles.map((style, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedStyle(index)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedStyle === index
                      ? "ring-2 ring-offset-2 ring-blue-500 border-transparent"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-full h-12 rounded flex items-center justify-center ${style.class}`}
                    >
                      <code className="text-xs font-mono">code</code>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {style.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Usage Examples */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Common Use Cases
            </h3>

            <div className="space-y-6">
              <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                <p className="text-gray-800 dark:text-gray-200">
                  To install a package, run{" "}
                  <code
                    className={`font-mono text-sm px-2 py-1 rounded ${codeStyles[selectedStyle].class}`}
                  >
                    npm install package-name
                  </code>{" "}
                  in your terminal.
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                <p className="text-gray-800 dark:text-gray-200">
                  The CSS property{" "}
                  <code
                    className={`font-mono text-sm px-2 py-1 rounded ${codeStyles[selectedStyle].class}`}
                  >
                    display: flex;
                  </code>{" "}
                  enables flexible box layout.
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                <p className="text-gray-800 dark:text-gray-200">
                  Use{" "}
                  <code
                    className={`font-mono text-sm px-2 py-1 rounded ${codeStyles[selectedStyle].class}`}
                  >
                    {`useEffect(() => {}, [])`}
                  </code>{" "}
                  for side effects in React.
                </p>
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
            <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-4">
              Best Practices for Inline Code
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Code className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Keep it Short
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Inline code should be brief - use code blocks for longer
                    snippets
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Terminal className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Clear Styling
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Use distinct background and monospace font for readability
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Copy className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Copy-Friendly
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Make code easy to select and copy for users
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Brackets className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Language Context
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Indicate programming language when relevant
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
