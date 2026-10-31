"use client";
import { cn } from "@/lib/utils";
import { Wand2, ArrowUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

//  TYPES
export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "assistant";
}

export interface SuggestionChip {
  text: string;
  label?: string;
}

//  SHARED — Message bubble
function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.sender === "user";
  return (
    <div className={cn("flex flex-col", isUser && "items-end")}>
      <div
        className={cn(
          "flex items-start gap-2 max-w-lg",
          isUser && "ml-auto justify-end",
        )}
      >
        {isUser ? (
          <p className="px-2.5 pt-1.5 pb-2 bg-primary text-white text-xs md:text-sm rounded-md rounded-tr-none max-w-md">
            {msg.text}
          </p>
        ) : (
          <p className="px-2.5 pt-1.5 pb-2 bg-foreground text-secondary text-xs md:text-sm rounded-md rounded-tl-none max-w-md">
            {msg.text}
          </p>
        )}
      </div>
    </div>
  );
}

//  MAIN COMPONENT
export interface ChatSuggestionsProps {
  autoReply?: string;
  className?: string;
  placeholder?: string;
  messages?: ChatMessage[];
  variant?: "floating" | "box";
  suggestions?: SuggestionChip[];
}

function TypewriterText({
  text,
  delay = 0,
  speed = 30,
}: {
  text: string;
  delay?: number;
  speed?: number;
}) {
  const [started, setStarted] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

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
      <div className="space-y-1 w-full">
        <div className="animate-pulse bg-accent rounded h-3 w-3/4" />
        <div className="animate-pulse bg-accent rounded h-3 w-full" />
      </div>
    );
  }

  return <span>{displayedText}</span>;
}

export function ChatSuggestions({
  className,
  messages = [],
  suggestions = [],
  variant = "floating",
  placeholder = "Type a message or ask anything",
  autoReply = "Got it — I'll get back to you shortly!",
}: ChatSuggestionsProps) {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<ChatMessage[]>(messages);

  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const prevMsgCountRef = useRef(messages.length);

  useEffect(() => {
    if (msgs.length > prevMsgCountRef.current) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }

    prevMsgCountRef.current = msgs.length;
  }, [msgs]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const send = (text?: string) => {
    const value = (text ?? input).trim();
    if (!value) return;

    setMsgs((prev) => [
      ...prev,
      {
        id: `u-${Date.now()}`,
        sender: "user",
        text: value,
      },
      {
        id: `a-${Date.now()}`,
        sender: "assistant",
        text: autoReply,
      },
    ]);
    setInput("");
    setOpen(false); // Close popover after sending
  };

  const handleSuggestionClick = (text: string) => {
    send(text);
  };

  return (
    <div className={cn("flex flex-col p-3 sm:p-5 md:p-10 w-full", className)}>
      <div className="relative md:aspect-square p-1.5 md:p-2 bg-foreground/5 border rounded-4xl md:rounded-[2rem] overflow-hidden max-w-2xl m-auto w-full h-full">
        <div className="relative flex flex-col justify-between bg-background border rounded-3xl md:rounded-4xl overflow-hidden w-full h-full">
          {/* Chat Messages Area */}
          <div className="p-5 space-y-5 overflow-y-auto w-full h-full">
            {msgs.map((m) => (
              <MessageBubble key={m.id} msg={m} />
            ))}
            <div ref={messagesEndRef} className="pb-10 md:pb-15" />
          </div>

          {/* INPUT & SUGGESTIONS CONTAINER */}
          <div ref={containerRef} className="relative w-full">
            {/* Floating suggestions */}
            {variant === "floating" && (
              <AnimatePresence>
                {open && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute z-50 bottom-10 md:bottom-15 left-2 right-2 grid grid-cols-2 gap-1.5"
                  >
                    {suggestions.slice(0, 4).map((chip, index) => (
                      <button
                        key={chip.text}
                        onClick={() => handleSuggestionClick(chip.text)}
                        className="group flex flex-col text-left p-2.5 text-xs bg-card border border-foreground/10 hover:border-primary/50 rounded-lg transition-all duration-300"
                      >
                        <span className="font-medium text-foreground line-clamp-3 leading-relaxed">
                          <TypewriterText
                            text={chip.text}
                            delay={1000 + index * 500}
                            speed={25}
                          />
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* Box suggestions */}
            {variant === "box" && (
              <AnimatePresence>
                {open && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute z-50 bottom-10 md:bottom-15 left-2 right-2 flex flex-col p-1 bg-card border border-foreground/10 rounded-xl"
                  >
                    {suggestions.map((chip, index) => (
                      <button
                        key={chip.text}
                        onClick={() => handleSuggestionClick(chip.text)}
                        className="text-left text-xs font-medium p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-all duration-200"
                      >
                        <TypewriterText
                          text={chip.text}
                          delay={1000 + index * 500}
                          speed={25}
                        />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Input */}
        <div className="sticky bottom-0 left-0 p-2 w-full">
          <div className="relative flex items-center justify-between bg-background p-1 border border-foreground/10 rounded-full w-full">
            <Input
              value={input}
              placeholder={placeholder}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              className="pr-0! bg-transparent! text-sm border-0! ring-0! shadow-none! w-full"
            />

            <div className="flex items-center gap-0.5">
              <Button
                size="icon"
                onClick={() => setOpen((o) => !o)}
                className={cn(
                  "bg-transparent! text-foreground/60! hover:bg-primary/15! hover:text-primary! transition-all duration-300 rounded-full",
                  open && "bg-primary/15! text-primary!",
                )}
              >
                <Wand2 />
              </Button>

              <Button
                size="icon"
                onClick={() => send()}
                className="text-white! rounded-full"
              >
                <ArrowUp />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatSuggestions;
