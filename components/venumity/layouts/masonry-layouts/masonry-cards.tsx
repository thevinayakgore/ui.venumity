"use client";
import { motion } from "framer-motion";
import { Heart, Bookmark, Clock, Zap } from "lucide-react";
import { useState, useEffect } from "react";

const items = [
  {
    id: 1,
    height: 320,
    span: 3,
    border: "border-blue-500/50",
    title: "Golden Hour",
    author: "Alex",
    time: "2h ago",
    likes: 245,
  },
  {
    id: 2,
    height: 320,
    span: 3,
    border: "border-green-500/50",
    title: "Urban Lines",
    author: "Sofia",
    time: "1d ago",
    likes: 189,
  },
  {
    id: 3,
    height: 320,
    span: 3,
    border: "border-red-500/50",
    title: "Abstract Flow",
    author: "Marcus",
    time: "3h ago",
    likes: 342,
  },
  {
    id: 4,
    height: 360,
    span: 4,
    border: "border-pink-500/50",
    title: "Minimal Space",
    author: "Elena",
    time: "2d ago",
    likes: 156,
  },
  {
    id: 5,
    height: 360,
    span: 4,
    border: "border-yellow-400/50",
    title: "Ocean Waves",
    author: "David",
    time: "5h ago",
    likes: 298,
  },
  {
    id: 6,
    height: 320,
    span: 3,
    border: "border-blue-500/50",
    title: "Botanical",
    author: "Green",
    time: "1d ago",
    likes: 234,
  },
  {
    id: 7,
    height: 320,
    span: 3,
    border: "border-green-500/50",
    title: "Morning Brew",
    author: "Cafe",
    time: "3d ago",
    likes: 187,
  },
  {
    id: 8,
    height: 320,
    span: 3,
    border: "border-red-500/50",
    title: "Neon Dreams",
    author: "Night",
    time: "4h ago",
    likes: 412,
  },
  {
    id: 9,
    height: 320,
    span: 3,
    border: "border-sky-500/50",
    title: "Sunset View",
    author: "Sky",
    time: "6h ago",
    likes: 278,
  },
  {
    id: 10,
    height: 320,
    span: 3,
    border: "border-green-500/50",
    title: "Forest Trail",
    author: "Willow",
    time: "8h ago",
    likes: 312,
  },
  {
    id: 11,
    height: 360,
    span: 4,
    border: "border-purple-500/50",
    title: "Night Sparks",
    author: "Orion",
    time: "12h ago",
    likes: 198,
  },
  {
    id: 12,
    height: 320,
    span: 3,
    border: "border-yellow-400/50",
    title: "Mountain Echo",
    author: "Ridge",
    time: "30m ago",
    likes: 521,
  },
];

export default function MinimalMasonryLayout() {
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [bookmarkedItems, setBookmarkedItems] = useState<number[]>([]);

  const [pendingLike, setPendingLike] = useState<number | null>(null);
  const [pendingBookmark, setPendingBookmark] = useState<number | null>(null);

  const handleLike = (id: number) => {
    setPendingLike(id);
  };

  const handleBookmark = (id: number) => {
    setPendingBookmark(id);
  };

  useEffect(() => {
    if (pendingLike !== null) {
      setTimeout(() => {
        setLikedItems((prev) =>
          prev.includes(pendingLike)
            ? prev.filter((itemId) => itemId !== pendingLike)
            : [...prev, pendingLike]
        );
        setPendingLike(null);
      }, 0);
    }
  }, [pendingLike]);

  useEffect(() => {
    if (pendingBookmark !== null) {
      setTimeout(() => {
        setBookmarkedItems((prev) =>
          prev.includes(pendingBookmark)
            ? prev.filter((itemId) => itemId !== pendingBookmark)
            : [...prev, pendingBookmark]
        );
        setPendingBookmark(null);
      }, 0);
    }
  }, [pendingBookmark]);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-10 p-6 sm:p-10 md:py-14 max-w-7xl w-full h-full"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full columns-1 md:columns-2 lg:columns-3 gap-8"
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="mb-8 break-inside-avoid hover:scale-105 transition-all duration-500"
            style={{ height: item.height }}
          >
            {/* Card */}
            <div
              className={`relative h-full bg-card border ${item.border} rounded-lg overflow-hidden group`}
            >
              {/* Content */}
              <div className="relative h-full p-6 flex flex-col">
                {/* Title */}
                <div
                  className={`flex items-center gap-3 pb-3 mb-3 uppercase border-b ${item.border} w-full`}
                >
                  <div className="size-10 p-2 rounded-full bg-muted flex items-center justify-center">
                    <Zap className="w-full h-full" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-medium">
                    {item.title}
                  </h3>
                </div>

                {/* Author & Time */}
                <div className="flex items-center justify-between text-base md:text-lg font-medium w-full">
                  {item.author}
                  <div className="flex items-center gap-1">
                    <Clock className="size-5" />
                    <span className="">{item.time}</span>
                  </div>
                </div>

                {/* Spacer */}
                <div className="grow space-y-3 mt-2">
                  {Array.from({ length: item.span }).map((_, i) => (
                    <div key={i} className="h-6 bg-muted rounded w-full" />
                  ))}
                </div>

                {/* Action Buttons */}
                <div
                  className={`flex items-center justify-between pt-4 border-t ${item.border}`}
                >
                  <button
                    onClick={() => handleLike(item.id)}
                    className={`flex items-center gap-2 px-3 py-2 cursor-pointer rounded-sm bg-muted text-muted-foreground border ${item.border} hover:scale-105 transition-all duration-500`}
                  >
                    <Heart
                      className={`size-5 ${
                        likedItems.includes(item.id)
                          ? "fill-rose-500 text-rose-500"
                          : ""
                      }`}
                    />
                    <span className="text-sm md:text-base leading-none">
                      {item.likes}
                    </span>
                  </button>

                  <button
                    onClick={() => handleBookmark(item.id)}
                    className={`p-2 cursor-pointer bg-muted text-muted-foreground border ${item.border} rounded-sm hover:scale-105 transition-all duration-500`}
                  >
                    <Bookmark
                      className={`size-5 ${
                        bookmarkedItems.includes(item.id)
                          ? "fill-blue-500 text-blue-500"
                          : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.main>
  );
}
