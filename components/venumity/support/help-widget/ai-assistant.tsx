"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Bot,
  Sparkles,
  Zap,
  Lightbulb,
  Brain,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface QuickQuestion {
  id: number;
  question: string;
}

export default function HelpWidgets4() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    },
    {
      id: 2,
      text: "How do I reset my password?",
      sender: "user",
      timestamp: new Date(Date.now() - 180000), // 3 minutes ago
    },
    {
      id: 3,
      text: "To reset your password: 1) Click 'Forgot Password' on login page 2) Enter your email 3) Check inbox for reset link 4) Create new password. The link expires in 24 hours.",
      sender: "ai",
      timestamp: new Date(Date.now() - 120000), // 2 minutes ago
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [aiConfidence, setAiConfidence] = useState(92);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions: QuickQuestion[] = [
    { id: 1, question: "How to update billing info?" },
    { id: 2, question: "Where are my invoices?" },
    { id: 3, question: "Can I export my data?" },
    { id: 4, question: "How do I enable 2FA?" },
    { id: 5, question: "What's the API rate limit?" },
    { id: 6, question: "Is there a mobile app?" },
  ];

  const aiCapabilities = [
    { icon: <Zap size={16} />, text: "Instant answers" },
    { icon: <Brain size={16} />, text: "Context understanding" },
    { icon: <Lightbulb size={16} />, text: "Smart suggestions" },
    { icon: <TrendingUp size={16} />, text: "Learning from feedback" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "I understand you're asking about that. Let me check our documentation and provide you with the most accurate information.",
        "Based on your question, here's what I found in our knowledge base. Let me know if you need more details!",
        "I've analyzed your question and here are the steps to resolve this. Would you like me to elaborate on any specific step?",
        "Great question! Here's the information you're looking for, along with some related resources that might help.",
      ];

      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
      setAiConfidence((prev) => Math.min(prev + 2, 98));
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
  };

  const handleFeedback = (helpful: boolean) => {
    alert(
      `Thank you for your feedback! ${
        helpful ? "Glad I could help!" : "I'll try to improve!"
      }`
    );
    if (helpful) {
      setAiConfidence((prev) => Math.min(prev + 1, 100));
    } else {
      setAiConfidence((prev) => Math.max(prev - 3, 50));
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
          AI Assistant Widget
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Experience intelligent, conversational support with our AI assistant.
          Get instant answers to your questions.
        </p>

        {/* Stats & Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl">
                  <Bot size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    AI Capabilities
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Powered by advanced machine learning
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {aiCapabilities.map((capability, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800"
                  >
                    <div className="text-blue-600 dark:text-blue-400">
                      {capability.icon}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {capability.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
              <div className="text-4xl font-bold mb-2">{aiConfidence}%</div>
              <div className="text-blue-100">Confidence Score</div>
              <div className="text-sm text-blue-200 mt-2">
                Accuracy of AI responses based on user feedback
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  Performance
                </div>
                <Sparkles size={20} className="text-yellow-500" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Response Time
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    &lt; 2s
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Questions Resolved
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    89%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    User Satisfaction
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    94%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Try asking about:
          </h3>
          <div className="flex flex-wrap gap-3">
            {quickQuestions.map((q) => (
              <button
                key={q.id}
                onClick={() => handleQuickQuestion(q.question)}
                className="px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all"
              >
                {q.question}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Assistant Widget */}
      <div className="help-widget fixed bottom-6 right-6 z-50">
        {/* Main Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 bg-linear-to-br from-blue-600 to-indigo-600 text-white rounded-full shadow-xl flex items-center justify-center"
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
                <Bot size={24} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Activity Indicator */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"
          />
        </motion.button>

        {/* Chat Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Bot size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">AI Assistant</h2>
                      <div className="text-sm text-blue-200">
                        {isTyping ? "Typing..." : "Online • Ready to help"}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-yellow-300" />
                  <span className="text-sm text-blue-200">
                    Ask me anything about our platform
                  </span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-4">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl p-4 ${
                          message.sender === "user"
                            ? "bg-blue-600 text-white rounded-br-none"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {message.sender === "ai" && (
                            <Bot size={12} className="text-blue-500" />
                          )}
                          <span className="text-xs opacity-75">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm">{message.text}</p>

                        {message.sender === "ai" &&
                          message.id === messages[messages.length - 1].id && (
                            <div className="flex gap-2 mt-3">
                              <button
                                onClick={() => handleFeedback(true)}
                                className="text-xs flex items-center gap-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                              >
                                <ThumbsUp size={12} />
                                Helpful
                              </button>
                              <button
                                onClick={() => handleFeedback(false)}
                                className="text-xs flex items-center gap-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                              >
                                <ThumbsDown size={12} />
                                Not helpful
                              </button>
                            </div>
                          )}
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-none p-4">
                        <div className="flex items-center gap-2">
                          <Bot size={12} className="text-blue-500" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            AI Assistant is typing
                          </span>
                        </div>
                        <div className="flex gap-1 mt-2">
                          <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                          <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              delay: 0.2,
                            }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                          <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              delay: 0.4,
                            }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type your question..."
                    className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isTyping}
                    className={`px-4 py-3 rounded-xl flex items-center justify-center ${
                      inputText.trim() && !isTyping
                        ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                    } transition-all`}
                  >
                    <Send size={20} />
                  </button>
                </div>

                <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
                  AI responses are generated based on our knowledge base and may
                  vary in accuracy
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  );
}
