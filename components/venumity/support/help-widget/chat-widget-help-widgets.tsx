"use client";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Minus, User, Bot } from "lucide-react";
import { useState } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function ChatWidgetHelpWidgets() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: "Thanks for your message! A support agent will be with you shortly.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="relative w-full min-h-[500px] bg-secondary/30 dark:bg-secondary/20 rounded-2xl flex items-center justify-center">
        <p className="text-muted-foreground">Click the chat button to open the widget</p>

        <div className="fixed bottom-6 right-6 z-50">
          <AnimatePresence>
            {isOpen && !isMinimized && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 25 }}
                className="absolute bottom-16 right-0 w-80 sm:w-96 bg-card dark:bg-card rounded-2xl shadow-2xl border border-border overflow-hidden"
              >
                <div className="bg-linear-to-r from-primary to-primary/80 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-foreground">Support</h3>
                      <p className="text-xs text-primary-foreground/70">Online</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsMinimized(true)}
                      className="p-1.5 hover:bg-primary-foreground/10 rounded-lg"
                    >
                      <Minus className="w-4 h-4 text-primary-foreground" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsOpen(false)}
                      className="p-1.5 hover:bg-primary-foreground/10 rounded-lg"
                    >
                      <X className="w-4 h-4 text-primary-foreground" />
                    </motion.button>
                  </div>
                </div>

                <div className="h-72 overflow-y-auto p-4 space-y-3">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex items-end gap-2 max-w-[80%] ${
                          message.sender === "user" ? "flex-row-reverse" : ""
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                            message.sender === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-foreground"
                          }`}
                        >
                          {message.sender === "user" ? (
                            <User className="w-3 h-3" />
                          ) : (
                            <Bot className="w-3 h-3" />
                          )}
                        </div>
                        <div
                          className={`px-4 py-2 rounded-2xl ${
                            message.sender === "user"
                              ? "bg-primary text-primary-foreground rounded-br-md"
                              : "bg-secondary dark:bg-secondary text-foreground rounded-bl-md"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2.5 bg-secondary/50 dark:bg-secondary/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSend}
                      disabled={!inputValue.trim()}
                      className="p-2.5 bg-primary text-primary-foreground rounded-xl disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => {
              if (isMinimized) {
                setIsMinimized(false);
              } else {
                setIsOpen(!isOpen);
              }
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-linear-to-br from-primary to-primary/80 text-primary-foreground rounded-full shadow-lg shadow-primary/30 flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              {isOpen && !isMinimized ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <MessageCircle className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {isMinimized && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold"
            >
              {messages.length}
            </motion.div>
          )}
        </div>
      </div>
    </motion.main>
  );
}
