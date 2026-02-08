"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  X,
  Book,
  Video,
  MessageSquare,
  Zap,
  Lightbulb,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

interface ContextualHelp {
  id: number;
  context: string;
  title: string;
  suggestions: string[];
  resources: Array<{
    title: string;
    type: "article" | "video" | "guide";
    duration: string;
  }>;
}

const contextualHelps: ContextualHelp[] = [
  {
    id: 1,
    context: "dashboard",
    title: "Dashboard Overview",
    suggestions: [
      "Customize your dashboard layout",
      "Add frequently used widgets",
      "Set up automated reports",
      "Create custom metrics",
    ],
    resources: [
      {
        title: "Dashboard Customization Guide",
        type: "article",
        duration: "5 min",
      },
      {
        title: "Widget Configuration Tutorial",
        type: "video",
        duration: "8 min",
      },
      {
        title: "Advanced Analytics Setup",
        type: "guide",
        duration: "15 min",
      },
    ],
  },
  {
    id: 2,
    context: "billing",
    title: "Billing & Subscription",
    suggestions: [
      "Update payment method",
      "View invoice history",
      "Change subscription plan",
      "Set up billing alerts",
    ],
    resources: [
      {
        title: "Billing Management Guide",
        type: "article",
        duration: "4 min",
      },
      { title: "Plan Comparison Tutorial", type: "video", duration: "6 min" },
      {
        title: "Invoice Automation Setup",
        type: "guide",
        duration: "10 min",
      },
    ],
  },
  {
    id: 3,
    context: "settings",
    title: "Account Settings",
    suggestions: [
      "Enable two-factor authentication",
      "Configure notification preferences",
      "Manage team permissions",
      "Set up API keys",
    ],
    resources: [
      {
        title: "Security Best Practices",
        type: "article",
        duration: "7 min",
      },
      {
        title: "Team Management Tutorial",
        type: "video",
        duration: "12 min",
      },
      { title: "API Integration Guide", type: "guide", duration: "20 min" },
    ],
  },
  {
    id: 4,
    context: "analytics",
    title: "Data Analytics",
    suggestions: [
      "Create custom reports",
      "Set up data exports",
      "Configure real-time alerts",
      "Use advanced filters",
    ],
    resources: [
      { title: "Report Builder Guide", type: "article", duration: "6 min" },
      {
        title: "Data Visualization Tutorial",
        type: "video",
        duration: "9 min",
      },
      {
        title: "Advanced Analytics Guide",
        type: "guide",
        duration: "18 min",
      },
    ],
  },
];

const tourSteps = [
  {
    title: "Welcome",
    description:
      "This is your contextual help widget. It provides relevant assistance based on where you are in the app.",
  },
  {
    title: "Context Detection",
    description:
      "The widget automatically detects your current page and shows relevant help content.",
  },
  {
    title: "Smart Suggestions",
    description:
      "Get personalized suggestions based on common tasks for this page.",
  },
  {
    title: "Quick Resources",
    description:
      "Access articles, videos, and guides without leaving your workflow.",
  },
];

export default function HelpWidgets3() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeContext, setActiveContext] = useState<string>("dashboard");
  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  // Simulate context detection based on URL or state
  useEffect(() => {
    const contexts = ["dashboard", "billing", "settings", "analytics"];
    const randomContext = contexts[Math.floor(Math.random() * contexts.length)];

    const timeout = setTimeout(() => {
      setActiveContext(randomContext);
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  const activeHelp =
    contextualHelps.find((h) => h.context === activeContext) ||
    contextualHelps[0];

  const handleSuggestionClick = (suggestion: string) => {
    alert(`Implementing: ${suggestion}`);
  };

  const startTour = () => {
    setShowTour(true);
    setTourStep(0);
  };

  const nextTourStep = () => {
    if (tourStep < tourSteps.length - 1) {
      setTourStep(tourStep + 1);
    } else {
      setShowTour(false);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      {/* Main Content */}
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Contextual Help Widget
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The help widget adapts to your current page and provides relevant
          assistance. Try switching contexts below.
        </p>

        {/* Context Switcher */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Simulate Page Context
          </h3>
          <div className="flex flex-wrap gap-3">
            {contextualHelps.map((help) => (
              <button
                key={help.id}
                onClick={() => setActiveContext(help.context)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeContext === help.context
                    ? "bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:shadow-md"
                }`}
              >
                {help.title}
              </button>
            ))}
          </div>
        </div>

        {/* Demo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <Zap
                  size={24}
                  className="text-purple-600 dark:text-purple-400"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Smart Assistance
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The widget automatically detects what you are working on and
              provides relevant help content, reducing the time spent searching
              for answers.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  Context-aware suggestions
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  Personalized resources
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  In-app guidance
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <TrendingUp
                  size={24}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Performance Impact
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Users who engage with contextual help complete tasks 40% faster
              and report 95% satisfaction rates.
            </p>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Task Completion
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    +40%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    User Satisfaction
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    95%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-[95%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Support Tickets
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    -60%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full w-2/5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contextual Help Widget */}
      <div className="help-widget fixed bottom-6 right-6 z-50">
        {/* Main Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 bg-linear-to-br from-purple-600 to-pink-600 text-white rounded-full shadow-xl flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="help"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <HelpCircle size={24} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Context Indicator */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"
          />
        </motion.button>

        {/* Widget Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Context Header */}
              <div className="bg-linear-to-r from-purple-600 to-pink-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <HelpCircle size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-purple-200">
                        Context Detected
                      </div>
                      <h2 className="text-xl font-bold">{activeHelp.title}</h2>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-sm text-purple-200">
                  <Lightbulb size={14} />
                  <span>Smart suggestions based on your current activity</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Smart Suggestions */}
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Zap size={18} className="text-yellow-500" />
                    Smart Suggestions
                  </h3>
                  <div className="space-y-3">
                    {activeHelp.suggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ x: 5 }}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                      >
                        <div className="font-medium text-gray-900 dark:text-white">
                          {suggestion}
                        </div>
                        <div className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                          Click to implement
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Relevant Resources */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Relevant Resources
                  </h3>
                  <div className="space-y-3">
                    {activeHelp.resources.map((resource, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              resource.type === "article"
                                ? "bg-blue-100 dark:bg-blue-900/30"
                                : resource.type === "video"
                                ? "bg-red-100 dark:bg-red-900/30"
                                : "bg-green-100 dark:bg-green-900/30"
                            }`}
                          >
                            {resource.type === "article" && (
                              <Book
                                size={16}
                                className="text-blue-600 dark:text-blue-400"
                              />
                            )}
                            {resource.type === "video" && (
                              <Video
                                size={16}
                                className="text-red-600 dark:text-red-400"
                              />
                            )}
                            {resource.type === "guide" && (
                              <MessageSquare
                                size={16}
                                className="text-green-600 dark:text-green-400"
                              />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {resource.title}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {resource.type} • {resource.duration} read
                            </div>
                          </div>
                        </div>
                        <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
                          →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-3">
                    <button
                      onClick={startTour}
                      className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors"
                    >
                      Take Tour
                    </button>
                    <button className="flex-1 py-2.5 bg-linear-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:shadow-lg transition-all">
                      Live Help
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tour Overlay */}
      <AnimatePresence>
        {showTour && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowTour(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-50 p-6"
            >
              <div className="text-center mb-6">
                <div className="inline-flex p-3 bg-linear-to-br from-purple-500 to-pink-500 rounded-full mb-4">
                  <HelpCircle size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {tourSteps[tourStep].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {tourSteps[tourStep].description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {tourSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === tourStep
                          ? "bg-purple-600"
                          : "bg-gray-300 dark:bg-gray-700"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-3">
                  {tourStep > 0 && (
                    <button
                      onClick={() => setTourStep(tourStep - 1)}
                      className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                      Back
                    </button>
                  )}
                  <button
                    onClick={nextTourStep}
                    className="px-6 py-2 bg-linear-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:shadow-lg transition-all"
                  >
                    {tourStep === tourSteps.length - 1 ? "Finish" : "Next"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
