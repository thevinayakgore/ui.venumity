"use client";
import { motion } from "framer-motion";
import { FileText, Music, Video, File, Book, ImageIcon } from "lucide-react";

interface MasonryItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  height: string;
}

export default function StandardMasonryLayout() {
  const items: MasonryItem[] = [
    {
      id: 1,
      title: "Image Gallery",
      description: "Collection of high-resolution images with detailed descriptions and metadata",
      icon: <ImageIcon className="w-6 h-6" />,
      color: "bg-blue-100 dark:bg-blue-900/30",
      height: "h-64",
    },
    {
      id: 2,
      title: "Documents",
      description: "Important documents and files organized by category and priority",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-green-100 dark:bg-green-900/30",
      height: "h-48",
    },
    {
      id: 3,
      title: "Audio Files",
      description: "Music library with playlists and audio recordings",
      icon: <Music className="w-6 h-6" />,
      color: "bg-purple-100 dark:bg-purple-900/30",
      height: "h-56",
    },
    {
      id: 4,
      title: "Video Collection",
      description: "Video tutorials and recorded sessions for training purposes",
      icon: <Video className="w-6 h-6" />,
      color: "bg-orange-100 dark:bg-orange-900/30",
      height: "h-52",
    },
    {
      id: 5,
      title: "Archives",
      description: "Compressed files and backups stored for long-term preservation",
      icon: <File className="w-6 h-6" />,
      color: "bg-pink-100 dark:bg-pink-900/30",
      height: "h-44",
    },
    {
      id: 6,
      title: "E-books",
      description: "Digital books and reading materials organized by genre",
      icon: <Book className="w-6 h-6" />,
      color: "bg-teal-100 dark:bg-teal-900/30",
      height: "h-60",
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">
              Standard Masonry Layout
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Professional masonry layout with varied content heights and organized sections
            </p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            {items.map((item) => (
              <div
                key={item.id}
                className={`${item.color} ${item.height} rounded-xl p-6 break-inside-avoid border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {item.id === 1 && "24 items • 2.4 GB"}
                    {item.id === 2 && "156 items • 480 MB"}
                    {item.id === 3 && "89 items • 1.2 GB"}
                    {item.id === 4 && "42 items • 8.7 GB"}
                    {item.id === 5 && "18 items • 3.6 GB"}
                    {item.id === 6 && "67 items • 890 MB"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.main>
  );
}