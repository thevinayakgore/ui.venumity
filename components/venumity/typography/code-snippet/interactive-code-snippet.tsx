"use client";
import { motion } from "framer-motion";
import { Copy, Check, Play, RotateCcw, Terminal } from "lucide-react";
import { useState, useEffect } from "react";

const exampleCode = `// Interactive TypeScript example
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

function calculateSum(numbers: number[]): number {
  return numbers.reduce((sum, num) => sum + num, 0);
}

// Try editing the values below
const userName = "Developer";
const numbers = [1, 2, 3, 4, 5];

console.log(greet(userName));
console.log("Sum:", calculateSum(numbers));`;

export default function CodeSnippetInteractive() {
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [code, setCode] = useState(exampleCode);
  const [isRunning, setIsRunning] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [tempCode, setTempCode] = useState(code);

  useEffect(() => {
    if (editMode) {
      const id = setTimeout(() => {
        setTempCode(code);
      }, 0);
      return () => clearTimeout(id);
    }
  }, [editMode, code]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput([]);

    // Simulate code execution
    setTimeout(() => {
      const mockOutput = [
        "Hello, Developer!",
        "Sum: 15",
        "Code executed successfully!",
      ];
      setOutput(mockOutput);
      setIsRunning(false);
    }, 1000);
  };

  const handleReset = () => {
    setCode(exampleCode);
    setTempCode(exampleCode);
    setOutput([]);
    setEditMode(false);
  };

  const handleSave = () => {
    setCode(tempCode);
    setEditMode(false);
    setOutput([]);
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <div className="bg-gray-900 dark:bg-gray-950 rounded-xl overflow-hidden border border-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-gray-800/50 dark:bg-gray-800/30">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-300">
                  editor.ts
                </span>
                <span className="text-xs text-gray-500">TypeScript</span>
              </div>

              <div className="flex items-center gap-2">
                {editMode ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-3 py-1.5 text-sm rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="px-3 py-1.5 text-sm rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setEditMode(true)}
                      className="px-3 py-1.5 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleCopy}
                      className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {copied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="p-4 sm:p-6">
              {editMode ? (
                <textarea
                  value={tempCode}
                  onChange={(e) => setTempCode(e.target.value)}
                  className="w-full h-64 bg-gray-800 text-gray-100 font-mono text-sm p-4 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                  spellCheck="false"
                />
              ) : (
                <pre className="overflow-x-auto">
                  <code className="text-sm text-gray-100 font-mono">
                    {code.split("\n").map((line, index) => (
                      <div key={index} className="py-0.5">
                        {line}
                      </div>
                    ))}
                  </code>
                </pre>
              )}
            </div>
          </div>

          {/* Output Panel */}
          <div className="bg-gray-900 dark:bg-gray-950 rounded-xl overflow-hidden border border-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-gray-800/50 dark:bg-gray-800/30">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-gray-300">
                  Output
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    isRunning
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  <Play className="w-4 h-4" />
                  {isRunning ? "Running..." : "Run Code"}
                </button>

                <button
                  onClick={handleReset}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="bg-gray-800 rounded-lg p-4 h-64 overflow-y-auto">
                {output.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Terminal className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                      <p className="text-sm">
                        Click &quot;Run Code&ldquo; to see output
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {output.map((line, index) => (
                      <div
                        key={index}
                        className="text-gray-100 font-mono text-sm py-1 border-b border-gray-700 last:border-0"
                      >
                        <span className="text-green-400 mr-3">$</span>
                        {line}
                      </div>
                    ))}
                  </div>
                )}

                {isRunning && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-300"></div>
                    </div>
                    <span className="text-sm">Executing code...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
