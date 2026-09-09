"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { Wand2, ArrowUp } from "lucide-react";

const MESSAGES = [
  {
    id: "1",
    sender: "user1",
    text: "Hello Alex, Tell me about yourself",
  },
  {
    id: "2",
    sender: "user2",
    text: "Good Moring ! Heres your daily brief",
  },
  {
    id: "3",
    sender: "user1",
    text: "Perfect! Lets focus on finishing the homepage design and preparing for the meeting",
  },
  {
    id: "4",
    sender: "user2",
    text: "Hey what are you doing right now ?",
  },
];

const SUGGESTIONS = [
  {
    text: "Can you summarize today's conversation and key points?",
  },
  {
    text: "Help me create a task based on this discussion.",
  },
  {
    text: "What are the main action items from this chat?",
  },
  {
    text: "Draft a follow-up message for this conversation.",
  },
];

const USER1_AUTO_REPLY = "I'll get back to you on this shortly!";

function TypewriterText({
  text,
  delay = 0,
  speed = 30,
}: {
  text: string;
  delay?: number;
  speed?: number;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, started, speed]);

  if (!started) {
    return (
      <div className="space-y-1.5 w-full">
        <div className="h-3 bg-foreground/10 rounded animate-pulse w-3/4" />
        <div className="h-3 bg-foreground/10 rounded animate-pulse w-full" />
      </div>
    );
  }

  return <span>{displayedText}</span>;
}

export default function ChatSuggestion() {
  const [messages, setMessages] = useState(MESSAGES);
  const [inputPrompt, setInputPrompt] = useState("");
  const [showGlobalSuggestions, setShowGlobalSuggestions] = useState(false);

  const handleSendMessage = (text?: string) => {
    const msgText = text || inputPrompt;
    if (!msgText.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: String(prev.length + 1), sender: "user1", text: msgText },
      {
        id: String(prev.length + 2),
        sender: "user2",
        text: USER1_AUTO_REPLY,
      },
    ]);
    setInputPrompt("");
    setShowGlobalSuggestions(false);
  };

  const handleEnhanceClick = () => {
    setShowGlobalSuggestions(!showGlobalSuggestions);
  };

  const handleGlobalSuggestionSelect = (suggestionText: string) => {
    setMessages((prev) => [
      ...prev,
      { id: String(prev.length + 1), sender: "user1", text: suggestionText },
      {
        id: String(prev.length + 2),
        sender: "user2",
        text: USER1_AUTO_REPLY,
      },
    ]);
    setShowGlobalSuggestions(false);
  };

  return (
    <div className="flex flex-col p-5 md:p-10 overflow-auto w-full h-full">
      {/* Chat Interface Panel */}
      <div className="aspect-5/4 p-1.5 bg-foreground/5 border rounded-[2rem] overflow-hidden max-w-3xl m-auto w-full h-full">
        <div className="relative flex flex-col justify-between bg-background border rounded-4xl overflow-auto m-auto w-full h-full">
          {/* Chat Messages */}
          <div className="flex-1 p-5 space-y-5 overflow-y-auto w-full h-full">
            {messages.map((msg) => (
              <div key={msg.id} className="flex flex-col">
                {msg.sender === "user1" ? (
                  <div className="flex items-start gap-2 ml-auto max-w-lg justify-end">
                    {msg.text && (
                      <p className="px-3 pt-2 pb-2.5 bg-primary text-white text-sm rounded-xl rounded-tr-none max-w-md">
                        {msg.text}
                      </p>
                    )}
                    <div className="shrink-0 size-9 border rounded-md overflow-hidden">
                      <Image
                        src="/vinu.jpeg"
                        alt="User Avatar"
                        width={1000}
                        height={1000}
                        priority
                        unoptimized
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2 max-w-lg">
                    <div className="shrink-0 size-9 border rounded-md overflow-hidden">
                      <Image
                        src="/vinu.jpeg"
                        alt="User Avatar"
                        width={1000}
                        height={1000}
                        priority
                        unoptimized
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {msg.text && (
                      <p className="px-3 pt-2 pb-2.5 bg-foreground text-secondary text-sm rounded-xl rounded-tl-none max-w-md">
                        {msg.text}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Suggestion Chips */}
          <AnimatePresence>
            {showGlobalSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="flex gap-2 px-2 overflow-x-auto overflow-y-hidden w-full scrollbar-hide"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {SUGGESTIONS.map((chip, index) => (
                  <button
                    key={chip.text}
                    onClick={() => handleGlobalSuggestionSelect(chip.text)}
                    className="group shrink-0 flex flex-col items-start text-left text-xs font-semibold bg-foreground/5 backdrop-blur-lg border text-foreground/60 hover:bg-primary/10 border-foreground/10 hover:border-primary/30 transition-all duration-300 rounded-xl overflow-hidden w-50 h-full"
                  >
                    <span className="px-2.5 py-1.5 text-sm font-semibold text-primary border-b border-foreground/20 group-hover:border-primary/40 border-dashed w-full">
                      Option - {index + 1}
                    </span>
                    <span className="p-2.5 w-full">
                      <TypewriterText
                        text={chip.text}
                        delay={700 + index * 700}
                        speed={35}
                      />
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Box with Glow Shadow */}
          <div className="p-2 w-full">
            <div className="relative flex items-center justify-between bg-foreground/5 backdrop-blur-lg p-1 border border-foreground/10 rounded-full w-full">
              <Input
                type="text"
                value={inputPrompt}
                placeholder="Type a message or ask anything"
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="pr-0! bg-transparent! text-sm border-0! ring-0! shadow-none! w-full"
              />
              <div className="flex items-center gap-0.5">
                <Button
                  size="icon"
                  onClick={handleEnhanceClick}
                  className={`bg-transparent! text-foreground/60! hover:bg-foreground/7! ${showGlobalSuggestions && "bg-primary/15! text-primary!"} hover:text-foreground! transition-all duration-300 rounded-full`}
                >
                  <Wand2 />
                </Button>
                <Button
                  size="icon"
                  onClick={() => handleSendMessage()}
                  className="text-white! rounded-full"
                >
                  <ArrowUp />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
