import React, { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  user: string;
  text: string;
  timestamp: string;
  avatar: string;
}

export default function VirtualScrollList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [visibleItems, setVisibleItems] = useState<Message[]>([]);
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const ITEM_HEIGHT = 80;
  const VISIBLE_COUNT = 10;
  const TOTAL_ITEMS = 1000;

  // Generate sample data
  useEffect(() => {
    const users = [
      "John",
      "Sarah",
      "Mike",
      "Emma",
      "Alex",
      "Lisa",
      "David",
      "Anna",
    ];
    const sampleMessages = [
      "Hello there!",
      "How are you doing?",
      "Meeting at 3 PM today",
      "Please review the document",
      "Lunch tomorrow?",
      "Check out this article",
      "Can you help with this?",
      "Great work on the project!",
      "Let me know your thoughts",
      "Looking forward to it",
    ];

    const generatedMessages: Message[] = [];
    for (let i = 0; i < TOTAL_ITEMS; i++) {
      generatedMessages.push({
        id: i + 1,
        user: users[i % users.length],
        text: sampleMessages[i % sampleMessages.length],
        timestamp: `${(i % 12) + 1}:${i % 60 < 10 ? "0" : ""}${i % 60} ${
          i % 2 === 0 ? "AM" : "PM"
        }`,
        avatar: ["👤", "👩", "👨", "🧑", "👱", "👴", "👵", "👲"][i % 8],
      });
    }

    setTimeout(() => {
      setMessages(generatedMessages);
    }, 0);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
    const endIndex = Math.min(startIndex + VISIBLE_COUNT, messages.length);

    setTimeout(() => {
      setVisibleItems(messages.slice(startIndex, endIndex));
    }, 0);
  }, [scrollTop, messages]);

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border max-w-md mx-auto overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">Messages</h2>
        <p className="text-gray-500">
          Virtual scroll for {TOTAL_ITEMS.toLocaleString()} items
        </p>
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-[600px] overflow-y-auto relative"
        style={{ contain: "strict" }}
      >
        {/* Spacer for items above */}
        <div
          style={{
            height: `${Math.floor(scrollTop / ITEM_HEIGHT) * ITEM_HEIGHT}px`,
          }}
        />

        {/* Visible items */}
        <div className="space-y-2 px-4 py-2">
          {visibleItems.map((message) => (
            <div
              key={message.id}
              className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              style={{ height: `${ITEM_HEIGHT}px` }}
            >
              <div className="shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                {message.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold truncate">{message.user}</h3>
                  <span className="text-sm text-gray-500">
                    {message.timestamp}
                  </span>
                </div>
                <p className="text-gray-600 truncate mt-1">{message.text}</p>
                <div className="text-xs text-gray-400 mt-2">
                  Message #{message.id}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Spacer for items below */}
        <div
          style={{
            height: `${Math.max(
              0,
              (messages.length -
                Math.floor(scrollTop / ITEM_HEIGHT) -
                VISIBLE_COUNT) *
                ITEM_HEIGHT
            )}px`,
          }}
        />
      </div>

      <div className="p-4 border-t text-sm text-gray-500">
        Showing {visibleItems.length} of {TOTAL_ITEMS.toLocaleString()} messages
        • Scroll position: {Math.floor(scrollTop / ITEM_HEIGHT)} items
      </div>
    </div>
  );
}
