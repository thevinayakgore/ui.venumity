"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, ArrowLeft, Filter } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface SearchResult {
  id: number;
  text: string;
  position: number;
  color: string;
}

const sampleText = `Searchable highlighting allows you to find and highlight specific terms throughout text. 
This feature is useful for research, studying, or content analysis. 
You can search for multiple keywords and see all instances highlighted. 
Navigate through search results using the navigation controls. 
Highlighting important information makes it easier to review and understand content. 
Try searching for terms like "highlighting", "search", or "content" to see how it works.`;

const initialKeywords = ["highlighting", "search", "content", "information"];

const highlightColors = [
  "bg-yellow-200 dark:bg-yellow-900/30 text-yellow-900 dark:text-yellow-200",
  "bg-blue-200 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200",
  "bg-green-200 dark:bg-green-900/30 text-green-900 dark:text-green-200",
  "bg-pink-200 dark:bg-pink-900/30 text-pink-900 dark:text-pink-200",
];

export default function HighlightedTextSearchable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [keywords, setKeywords] = useState<string[]>(initialKeywords);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [currentResultIndex, setCurrentResultIndex] = useState(0);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [matchWholeWord, setMatchWholeWord] = useState(false);

  // inside your component
  const performSearch = useCallback(() => {
    if (!searchTerm.trim()) {
      const results: SearchResult[] = [];
      keywords.forEach((keyword, keywordIndex) => {
        const regex = new RegExp(
          matchWholeWord ? `\\b${keyword}\\b` : keyword,
          caseSensitive ? "g" : "gi"
        );
        let match;
        while ((match = regex.exec(sampleText)) !== null) {
          results.push({
            id: results.length,
            text: keyword,
            position: match.index,
            color: highlightColors[keywordIndex % highlightColors.length],
          });
        }
      });

      // Wrap in setTimeout to avoid synchronous state update in effect
      setTimeout(() => {
        setSearchResults(results);
        setCurrentResultIndex(0);
      }, 0);
    } else {
      const results: SearchResult[] = [];
      const regex = new RegExp(
        matchWholeWord ? `\\b${searchTerm}\\b` : searchTerm,
        caseSensitive ? "g" : "gi"
      );
      let match;
      let resultId = 0;
      while ((match = regex.exec(sampleText)) !== null) {
        results.push({
          id: resultId++,
          text: match[0],
          position: match.index,
          color: highlightColors[0],
        });
      }

      setTimeout(() => {
        setSearchResults(results);
        setCurrentResultIndex(0);
      }, 0);
    }
  }, [keywords, searchTerm, caseSensitive, matchWholeWord]);

  useEffect(() => {
    // Wrap performSearch in setTimeout to avoid synchronous state update in effect
    const timer = setTimeout(() => performSearch(), 0);
    return () => clearTimeout(timer);
  }, [performSearch]);

  const handleAddKeyword = () => {
    if (searchTerm.trim() && !keywords.includes(searchTerm.toLowerCase())) {
      setKeywords([...keywords, searchTerm.toLowerCase()]);
      setSearchTerm("");
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      performSearch();
    }
  };

  const navigateToResult = (direction: "prev" | "next") => {
    if (searchResults.length === 0) return;

    if (direction === "prev") {
      setCurrentResultIndex((prev) =>
        prev === 0 ? searchResults.length - 1 : prev - 1
      );
    } else {
      setCurrentResultIndex((prev) =>
        prev === searchResults.length - 1 ? 0 : prev + 1
      );
    }
  };

  const renderText = () => {
    if (searchResults.length === 0) {
      return <span>{sampleText}</span>;
    }

    const parts = [];
    let lastIndex = 0;
    const sortedResults = [...searchResults].sort(
      (a, b) => a.position - b.position
    );

    sortedResults.forEach((result, index) => {
      // Add text before highlight
      if (result.position > lastIndex) {
        parts.push(
          <span key={`text-${lastIndex}`}>
            {sampleText.slice(lastIndex, result.position)}
          </span>
        );
      }

      // Add highlighted text
      const highlightLength = result.text.length;
      parts.push(
        <mark
          key={`highlight-${result.id}`}
          className={`${result.color} px-1 py-0.5 rounded relative ${
            index === currentResultIndex
              ? "ring-2 ring-blue-500 ring-offset-2"
              : ""
          }`}
        >
          {sampleText.slice(result.position, result.position + highlightLength)}
          {index === currentResultIndex && (
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Result {index + 1} of {searchResults.length}
            </div>
          )}
        </mark>
      );

      lastIndex = result.position + highlightLength;
    });

    // Add remaining text
    if (lastIndex < sampleText.length) {
      parts.push(
        <span key={`text-${lastIndex}`}>{sampleText.slice(lastIndex)}</span>
      );
    }

    return parts;
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
              <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Search & Highlight
              </span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {searchResults.length} results found
            </div>
          </div>

          {/* Search Controls */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Search for text to highlight..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddKeyword}
                  disabled={
                    !searchTerm.trim() ||
                    keywords.includes(searchTerm.toLowerCase())
                  }
                  className="px-4 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  Add Keyword
                </button>
                <button
                  onClick={handleSearch}
                  disabled={!searchTerm.trim()}
                  className="px-4 py-3 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  Search Text
                </button>
              </div>
            </div>

            {/* Search Options */}
            <div className="flex flex-wrap gap-4 mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={caseSensitive}
                  onChange={(e) => setCaseSensitive(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Case Sensitive
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={matchWholeWord}
                  onChange={(e) => setMatchWholeWord(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Match Whole Word
                </span>
              </label>
            </div>

            {/* Keywords */}
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Active Keywords ({keywords.length})
              </p>
              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {keywords.map((keyword, index) => (
                    <motion.span
                      key={keyword}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className={`inline-flex items-center gap-2 ${
                        highlightColors[index % highlightColors.length]
                      } px-3 py-1.5 rounded-full text-sm font-medium`}
                    >
                      {keyword}
                      <button
                        onClick={() => handleRemoveKeyword(keyword)}
                        className="hover:opacity-70"
                      >
                        ×
                      </button>
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Text Display with Highlights */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Highlighted Text
              </h3>

              {searchResults.length > 0 && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigateToResult("prev")}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {currentResultIndex + 1} / {searchResults.length}
                  </span>

                  <button
                    onClick={() => navigateToResult("next")}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed p-4 bg-gray-50 dark:bg-gray-800 rounded-lg min-h-[200px]">
              {renderText()}
            </div>
          </div>

          {/* Results Summary */}
          {searchResults.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Search Results
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((result, index) => (
                  <button
                    key={result.id}
                    onClick={() => setCurrentResultIndex(index)}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      index === currentResultIndex
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 ring-2 ring-blue-500/20"
                        : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          result.color.split(" ")[0]
                        }`}
                      ></div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Result {index + 1}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      &quot;{result.text}&ldquo;
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Position: {result.position}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Legend */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Color Legend
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {keywords.slice(0, 4).map((keyword, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded ${
                      highlightColors[index].split(" ")[0]
                    }`}
                  ></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {keyword}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {
                        searchResults.filter(
                          (r) => r.text.toLowerCase() === keyword.toLowerCase()
                        ).length
                      }{" "}
                      matches
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
