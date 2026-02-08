"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  X,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Share2,
  Download,
  Clock,
  TrendingUp,
  Star,
} from "lucide-react";

interface FAQArticle {
  id: number;
  title: string;
  content: string;
  category: string;
  tags: string[];
  helpfulCount: number;
  unhelpfulCount: number;
  views: number;
  lastUpdated: Date;
  readTime: number;
  difficulty: "beginner" | "intermediate" | "advanced";
}

type SortOption = "relevance" | "popular" | "recent" | "helpful";
type DifficultyFilter = "all" | "beginner" | "intermediate" | "advanced";

// Static data
const articles: FAQArticle[] = [
  {
    id: 1,
    title: "Getting Started: Complete Beginner's Guide",
    content:
      "Welcome to our platform! This comprehensive guide will walk you through everything you need to know to get started. First, create your account by clicking the sign-up button in the top right corner. You'll need to verify your email address. Once verified, complete your profile setup, including your preferences and notification settings. We recommend starting with our interactive tutorial to familiarize yourself with the interface.",
    category: "getting-started",
    tags: ["beginner", "tutorial", "onboarding"],
    helpfulCount: 245,
    unhelpfulCount: 12,
    views: 12500,
    lastUpdated: new Date("2024-01-15"),
    readTime: 8,
    difficulty: "beginner",
  },
  {
    id: 2,
    title: "Advanced Security Settings and Best Practices",
    content:
      "For maximum security, we recommend enabling two-factor authentication, setting up IP whitelisting, and regularly reviewing access logs. Enterprise customers should implement SAML SSO and configure role-based access controls. All data is encrypted at rest with AES-256 and in transit with TLS 1.3. Regular security audits and penetration testing are conducted to ensure compliance with industry standards.",
    category: "security",
    tags: ["security", "authentication", "enterprise"],
    helpfulCount: 189,
    unhelpfulCount: 8,
    views: 8900,
    lastUpdated: new Date("2024-01-20"),
    readTime: 12,
    difficulty: "advanced",
  },
  {
    id: 3,
    title: "API Integration: Complete Developer Guide",
    content:
      "Our REST API provides programmatic access to all platform features. Authenticate using OAuth 2.0 or API keys. Rate limits apply: 100 requests per minute for standard plans, 1000 for business plans. Webhooks are available for real-time notifications. All responses are in JSON format. Check our API documentation for endpoint specifications and code examples in multiple programming languages.",
    category: "api",
    tags: ["api", "developers", "integration"],
    helpfulCount: 156,
    unhelpfulCount: 15,
    views: 7500,
    lastUpdated: new Date("2024-01-18"),
    readTime: 15,
    difficulty: "intermediate",
  },
  {
    id: 4,
    title: "Automation Workflows: Save Time with Automation",
    content:
      "Create powerful automation workflows using our visual workflow builder. Trigger actions based on events, schedules, or conditions. Supported actions include data processing, notifications, API calls, and file operations. Use templates for common workflows or build custom ones. Monitor workflow execution and set up alerts for failures. Advanced users can write custom scripts for complex automation scenarios.",
    category: "automation",
    tags: ["automation", "workflows", "productivity"],
    helpfulCount: 201,
    unhelpfulCount: 9,
    views: 10200,
    lastUpdated: new Date("2024-01-12"),
    readTime: 10,
    difficulty: "intermediate",
  },
  {
    id: 5,
    title: "Data Analytics and Reporting Guide",
    content:
      "Access comprehensive analytics dashboards with real-time data visualization. Create custom reports using drag-and-drop builder. Export data in CSV, Excel, PDF, or JSON formats. Schedule automated report delivery via email. Advanced analytics features include predictive modeling, cohort analysis, and custom metrics. API access available for integrating analytics into external systems.",
    category: "analytics",
    tags: ["analytics", "reports", "data"],
    helpfulCount: 178,
    unhelpfulCount: 11,
    views: 9200,
    lastUpdated: new Date("2024-01-10"),
    readTime: 14,
    difficulty: "intermediate",
  },
  {
    id: 6,
    title: "Mobile App Setup and Features",
    content:
      "Download our mobile app from App Store or Google Play. Features include push notifications, offline access, biometric authentication, and camera integration. Sync data automatically across devices. Use voice commands for hands-free operation. Configure mobile-specific settings for data usage optimization. Enterprise customers can deploy custom mobile configurations.",
    category: "mobile",
    tags: ["mobile", "app", "ios", "android"],
    helpfulCount: 134,
    unhelpfulCount: 6,
    views: 6800,
    lastUpdated: new Date("2024-01-22"),
    readTime: 6,
    difficulty: "beginner",
  },
];

// Relevance scoring function
function getRelevanceScore(article: FAQArticle, query: string): number {
  let score = 0;
  const lowerQuery = query.toLowerCase();

  if (article.title.toLowerCase().includes(lowerQuery)) score += 3;
  if (article.content.toLowerCase().includes(lowerQuery)) score += 1;
  if (article.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)))
    score += 2;

  return score;
}

// Filter function extracted outside component for memoization
function filterArticles(
  articles: FAQArticle[],
  searchQuery: string,
  selectedCategory: string,
  selectedTags: string[],
  difficulty: DifficultyFilter,
  sortBy: SortOption
): FAQArticle[] {
  let filtered = [...articles];

  // Search
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (a) =>
        a.title.toLowerCase().includes(query) ||
        a.content.toLowerCase().includes(query) ||
        a.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  // Category
  if (selectedCategory !== "all") {
    filtered = filtered.filter((a) => a.category === selectedCategory);
  }

  // Tags
  if (selectedTags.length > 0) {
    filtered = filtered.filter((a) =>
      selectedTags.some((tag) => a.tags.includes(tag))
    );
  }

  // Difficulty
  if (difficulty !== "all") {
    filtered = filtered.filter((a) => a.difficulty === difficulty);
  }

  // Sorting
  switch (sortBy) {
    case "popular":
      filtered.sort((a, b) => b.views - a.views);
      break;
    case "recent":
      filtered.sort(
        (a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime()
      );
      break;
    case "helpful":
      filtered.sort((a, b) => {
        const aRatio = a.helpfulCount / (a.helpfulCount + a.unhelpfulCount);
        const bRatio = b.helpfulCount / (b.helpfulCount + b.unhelpfulCount);
        return bRatio - aRatio;
      });
      break;
    default:
      if (searchQuery) {
        filtered.sort(
          (a, b) =>
            getRelevanceScore(b, searchQuery) -
            getRelevanceScore(a, searchQuery)
        );
      }
  }

  return filtered;
}

export default function FAQ5() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);
  const [interactionMap, setInteractionMap] = useState<
    Record<number, "helpful" | "unhelpful" | null>
  >({});

  const filteredArticles = useMemo(
    () =>
      filterArticles(
        articles,
        searchQuery,
        selectedCategory,
        selectedTags,
        difficulty,
        sortBy
      ),
    [searchQuery, selectedCategory, selectedTags, difficulty, sortBy]
  );

  const allTags = [...new Set(articles.flatMap((article) => article.tags))];
  const difficultyOptions: { id: DifficultyFilter; label: string }[] = [
    { id: "all", label: "All Levels" },
    { id: "beginner", label: "Beginner" },
    { id: "intermediate", label: "Intermediate" },
    { id: "advanced", label: "Advanced" },
  ];

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleInteraction = (
    articleId: number,
    type: "helpful" | "unhelpful"
  ) => {
    setInteractionMap((prev) => ({
      ...prev,
      [articleId]: prev[articleId] === type ? null : type,
    }));
  };

  const formatDate = (date: Date): string =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Knowledge Base
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Search, filter, and find exactly what you need from our
            comprehensive documentation.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, guides, and tutorials..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="w-full lg:w-auto">
              <div className="flex items-center gap-2 mb-2">
                <Filter size={16} className="text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Sort by
                </span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full lg:w-48 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="relevance">Relevance</option>
                <option value="popular">Most Popular</option>
                <option value="recent">Recently Updated</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="w-full lg:w-auto">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Level
                </span>
              </div>
              <select
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(e.target.value as DifficultyFilter)
                }
                className="w-full lg:w-48 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {difficultyOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory !== "all" ||
            selectedTags.length > 0 ||
            difficulty !== "all") && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Active filters:
                </span>
                {selectedCategory !== "all" && (
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-sm rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50"
                  >
                    Category: {selectedCategory}
                    <X size={14} />
                  </button>
                )}
                {selectedTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    {tag}
                    <X size={14} />
                  </button>
                ))}
                {difficulty !== "all" && (
                  <button
                    onClick={() => setDifficulty("all")}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-sm rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50"
                  >
                    {difficultyOptions.find((d) => d.id === difficulty)?.label}
                    <X size={14} />
                  </button>
                )}
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedTags([]);
                    setDifficulty("all");
                  }}
                  className="ml-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tags Cloud */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Popular Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <div className="text-gray-600 dark:text-gray-400">
            Showing {filteredArticles.length} of {articles.length} articles
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Sorted by {sortBy}
          </div>
        </div>

        {/* Articles List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredArticles.map((article) => (
              <motion.div
                key={article.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    {/* Article Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            article.difficulty === "beginner"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                              : article.difficulty === "intermediate"
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400"
                              : "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400"
                          }`}
                        >
                          {article.difficulty.charAt(0).toUpperCase() +
                            article.difficulty.slice(1)}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                          <Clock size={14} />
                          <span>{article.readTime} min read</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                          <TrendingUp size={14} />
                          <span>{article.views.toLocaleString()} views</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {article.title}
                      </h3>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm rounded-lg"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <ThumbsUp size={14} />
                          <span>{article.helpfulCount} helpful</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsDown size={14} />
                          <span>{article.unhelpfulCount} unhelpful</span>
                        </div>
                        <div>Updated {formatDate(article.lastUpdated)}</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                      <button
                        onClick={() =>
                          setExpandedArticle(
                            expandedArticle === article.id ? null : article.id
                          )
                        }
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                      >
                        {expandedArticle === article.id
                          ? "Show Less"
                          : "Read Article"}
                      </button>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleInteraction(article.id, "helpful")
                          }
                          className={`flex-1 px-3 py-2 rounded-lg transition-colors ${
                            interactionMap[article.id] === "helpful"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                        >
                          <ThumbsUp size={16} />
                        </button>
                        <button
                          onClick={() =>
                            handleInteraction(article.id, "unhelpful")
                          }
                          className={`flex-1 px-3 py-2 rounded-lg transition-colors ${
                            interactionMap[article.id] === "unhelpful"
                              ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                        >
                          <ThumbsDown size={16} />
                        </button>
                        <button className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                          <Bookmark
                            size={16}
                            className="text-gray-600 dark:text-gray-400"
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedArticle === article.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                          <div className="prose prose-gray dark:prose-invert max-w-none">
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                              {article.content}
                            </p>
                          </div>

                          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Article ID: KB-
                              {article.id.toString().padStart(4, "0")}
                            </div>
                            <div className="flex gap-3">
                              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <Share2
                                  size={16}
                                  className="text-gray-600 dark:text-gray-400"
                                />
                                Share
                              </button>
                              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <Download
                                  size={16}
                                  className="text-gray-600 dark:text-gray-400"
                                />
                                PDF
                              </button>
                              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                                Contact Author
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              No articles found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Try adjusting your search terms or filters to find what you are
              looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedTags([]);
                setDifficulty("all");
              }}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Clear all filters
            </button>
          </motion.div>
        )}

        {/* Bottom Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Star size={20} className="text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Quality Score
              </h3>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              4.8/5
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Based on user feedback
            </p>
          </div>

          <div className="bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp
                size={20}
                className="text-green-600 dark:text-green-400"
              />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Monthly Readers
              </h3>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              50K+
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Active knowledge base users
            </p>
          </div>

          <div className="bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Clock
                size={20}
                className="text-purple-600 dark:text-purple-400"
              />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Avg. Resolution
              </h3>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              92%
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Questions resolved by articles
            </p>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
