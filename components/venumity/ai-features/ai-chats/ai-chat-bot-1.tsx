"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  User,
  Paperclip,
  Mic,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Bot,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface QuickAction {
  id: string;
  text: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "1",
    text: "What is Venumity UI ? Exlpain in short points",
  },
  {
    id: "2",
    text: "How is Venumity UI different from shadcn/ui ?",
  },
  {
    id: "3",
    text: "Does Venumity UI support AI components ?",
  },
  {
    id: "4",
    text: "How do I use a Venumity component in my project ?",
  },
];

const AI_RESPONSES: Record<string, string> = {
  "What is Venumity UI ? Exlpain in short points":
    "• Modern UI component library for SaaS and AI products\n• Built with React, TypeScript, and Tailwind CSS\n• Includes AI-ready components like chat, forms, and generators\n• Follows shadcn-style, scalable design patterns\n• Helps teams build faster with consistent, production-ready UI",

  "How is Venumity UI different from shadcn/ui ?":
    "While shadcn/ui focuses on low-level primitives, Venumity UI offers higher-level, opinionated components like AI chat widgets, generators, dashboards, and SaaS-ready layouts. It’s designed to reduce boilerplate and accelerate real-world product development.",

  "Does Venumity UI support AI components ?":
    "Yes. Venumity UI includes AI-focused components such as chat widgets, AI forms, content generators, search dialogs, and suggestion systems. These components are optimized for AI-driven SaaS products and can be easily connected to APIs like OpenAI.",

  "How do I use a Venumity component in my project ?":
    "You can import Venumity components directly into your React or Next.js project. Each component is built with Tailwind CSS and TypeScript, making it easy to customize styles, extend behavior, and integrate with your existing design system.",
};

export default function AIChatBot1() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showHiSuggestion, setShowHiSuggestion] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const idCounterRef = useRef(0);

  const getNextId = () => {
    idCounterRef.current += 1;
    return idCounterRef.current.toString();
  };

  // Show "AI is thinking" for 5 seconds, then welcome message
  useEffect(() => {
    if (hasUserInteracted) return;

    const thinkingTimer = setTimeout(() => {
      const thinkingMessage: Message = {
        id: "thinking",
        content: "AI Assistant is thinking...",
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages([thinkingMessage]);
      setIsTyping(true);
    }, 0);

    const welcomeTimer = setTimeout(() => {
      const welcomeMessage: Message = {
        id: "welcome",
        content:
          "Hello ! 👋 I'm the AI assistant for you. Feel free to ask questios and use suggestions below to get started !",
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages([welcomeMessage]);
      setIsTyping(false);
      setShowWelcome(true);

      const hiTimer = setTimeout(() => {
        setShowHiSuggestion(true);
      }, 200);

      return () => clearTimeout(hiTimer);
    }, 3000);

    return () => {
      clearTimeout(thinkingTimer);
      clearTimeout(welcomeTimer);
    };
  }, [hasUserInteracted]);

  // Handle sending messages
  const handleSend = (value?: string) => {
    const text = (value ?? input).trim();
    if (!text) return;

    if (!hasUserInteracted) {
      setHasUserInteracted(true);
      setShowHiSuggestion(false);
    }

    const userMessage: Message = {
      id: getNextId(),
      content: text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const aiResponse =
        AI_RESPONSES[text] ||
        `I understand you're asking about "${text}". I can help with that! Here's some information: This is a simulated response to show how the chat works. In a real implementation, this would connect to an AI API like OpenAI or Claude.`;

      const aiMessage: Message = {
        id: getNextId(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 300);
  };

  // Handle quick action click
  const handleQuickAction = (action: QuickAction) => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
      setShowHiSuggestion(false);
    }
    handleSend(action.text);
  };

  // Handle "Hi!" suggestion click
  const handleHiClick = () => {
    setHasUserInteracted(true);
    setShowHiSuggestion(false);
    handleSend("Hi");
  };

  // Handle file upload
  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Handle voice input (simulated)
  const handleVoiceInput = () => {
    setTimeout(() => {
      setInput("This is a simulated voice input command");
    }, 300);
  };

  // Format message content with basic markdown
  const formatMessageContent = (content: string) => {
    return content.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        {index < content.split("\n").length - 1 && <br />}
      </span>
    ));
  };

  return (
    <main className="flex items-center justify-center m-auto p-6 md:p-10 w-full">
      <Card className="gap-0! p-3! bg-background! border-8 shadow-xl/5 rounded-[1.7rem] overflow-hidden w-xl h-auto">
        {/* Header */}
        <CardHeader className="flex items-center justify-between p-3! gap-0! bg-accent dark:bg-popover border-4 rounded-2xl w-full">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center m-auto p-1 size-10 rounded-md overflow-hidden">
              <Bot className="p-1.5 z-10 bg-white text-primary rounded-sm w-full h-full" />
              <span className="absolute inset-0 z-0 bg-linear-to-tl from-primary to-yellow-400 animate-spin rounded-xl scale-150 w-full h-full" />
            </div>
            <div>
              <CardTitle className="text-lg font-medium leading-none">
                AI Assistant
              </CardTitle>
              <p className="text-xs italic text-primary/80">
                Ask me anything...
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="border-green-500/50 bg-green-500/10 text-green-500"
          >
            <span className="relative size-2 z-10 rounded-full bg-green-500 mr-0.5">
              <span className="absolute inset-0 -z-10 size-2 bg-green-500 rounded-full animate-ping" />
            </span>
            Online
          </Badge>
        </CardHeader>

        {/* Main chat area */}
        <CardContent className="flex flex-col py-4! px-1! overflow-auto max-h-80 w-full">
          {/* Messages */}
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
            >
              <Avatar
                className={`size-10 ${message.sender === "ai" ? "border border-foreground/15" : ""}`}
              >
                <AvatarFallback
                  className={`${message.sender === "ai" ? "bg-secondary" : "bg-linear-to-tl from-primary to-yellow-400"}`}
                >
                  {message.sender === "ai" ? (
                    <Bot className="size-4 text-foreground" />
                  ) : (
                    <User className="size-4 text-white" />
                  )}
                </AvatarFallback>
              </Avatar>

              <div
                className={`font-medium mb-4 max-w-[75%] ${message.sender === "user" ? "text-right" : ""}`}
              >
                <div
                  className={`rounded-lg px-4 py-3 ${
                    message.sender === "ai"
                      ? "bg-background border-2"
                      : "bg-linear-to-tl from-primary to-yellow-400 text-white"
                  }`}
                >
                  <div
                    className={`text-sm ${message.sender === "ai" && "opacity-80"}`}
                  >
                    {formatMessageContent(message.content)}
                  </div>
                  <div
                    className={`text-xs mt-2 ${message.sender === "ai" ? "opacity-50" : "opacity-80"}`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>

                {/* Message actions for AI messages */}
                {message.sender === "ai" && message.id !== "thinking" && (
                  <div className="flex items-center mt-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 p-1.5 cursor-pointer hover:bg-foreground/10! text-foreground/40 hover:text-foreground! transition-all duration-500 rounded-sm"
                    >
                      <Copy className="size-3.5!" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 p-1.5 cursor-pointer hover:bg-foreground/10! text-foreground/40 hover:text-foreground! transition-all duration-500 rounded-sm"
                    >
                      <ThumbsUp className="size-3.5!" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 p-1.5 cursor-pointer hover:bg-foreground/10! text-foreground/40 hover:text-foreground! transition-all duration-500 rounded-sm"
                    >
                      <ThumbsDown className="size-3.5!" />
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* "Hi!" suggestion button */}
          <AnimatePresence>
            {showHiSuggestion && !hasUserInteracted && (
              <div className="flex justify-center mb-5">
                <Button
                  variant="outline"
                  onClick={handleHiClick}
                  className="relative border-2 p-5 cursor-pointer rounded-full w-45"
                >
                  Say Hi 👋 to started
                </Button>
              </div>
            )}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && messages[messages.length - 1]?.sender === "user" && (
            <div className="flex items-center gap-3">
              <Avatar className="size-10 border border-foreground/15">
                <AvatarFallback className="bg-secondary">
                  <Bot className="size-4 text-foreground" />
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2 px-3 py-2 bg-accent dark:bg-popover border-2 rounded-full">
                <div className="flex space-x-1">
                  <div
                    className="h-2 w-2 rounded-full bg-primary animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="h-2 w-2 rounded-full bg-primary animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="h-2 w-2 rounded-full bg-primary animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
                <span className="text-sm italic opacity-60 ml-2">
                  AI is thinking...
                </span>
              </div>
            </div>
          )}

          {/* Quick actions grid - only show after welcome message */}
          {showWelcome && (
            <div className="w-full">
              <div className="text-sm font-medium italic opacity-40 mb-3">
                Try asking about
              </div>
              <div className="grid grid-cols-2 gap-2 w-full">
                {QUICK_ACTIONS.map((action) => (
                  <Button
                    key={action.id}
                    variant="outline"
                    onClick={() => handleQuickAction(action)}
                    className="px-3! whitespace-pre-wrap text-left cursor-pointer bg-background! hover:bg-primary/10! hover:border-primary/60! text-xs line-clamp-2 transition-all duration-500 w-full h-full"
                  >
                    {action.text}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </CardContent>

        {/* Input area */}
        <CardFooter className="relative flex items-center gap-2 z-10 p-3! rounded-2xl! bg-accent dark:bg-popover border-4 w-full">
          {/* Attachment buttons */}
          <div className="flex items-center gap-1">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) =>
                console.log("File uploaded:", e.target.files?.[0])
              }
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFileUpload}
              className="size-10 cursor-pointer"
            >
              <Paperclip className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleVoiceInput}
              className="size-10 cursor-pointer"
            >
              <Mic className="size-4" />
            </Button>
          </div>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message here..."
            disabled={!showWelcome} // Disable input until welcome message shows
            className="border-2 h-11"
          />
          <Button
            variant="outline"
            onClick={() => handleSend()}
            disabled={!input.trim() || !showWelcome}
            className="p-5 border-2 hover:shadow-lg cursor-pointer rounded-sm transition-all duration-500"
          >
            <Send />
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
