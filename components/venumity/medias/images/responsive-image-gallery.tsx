"use client";
import { useState, useEffect } from "react";
import { Heart, Download, Share2, Grid, List, Eye } from "lucide-react";

export default function Image_6_1() {
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [liked, setLiked] = useState<number[]>([]);

  const [images, setImages] = useState<
    {
      id: number;
      title: string;
      category: string;
      views: number;
      likes: number;
      color: string;
      aspect: "square" | "portrait" | "landscape";
    }[]
  >([]);

  useEffect(() => {
    const generated: {
      id: number;
      title: string;
      category: string;
      views: number;
      likes: number;
      color: string;
      aspect: "square" | "portrait" | "landscape";
    }[] = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      title: `Nature Shot ${i + 1}`,
      category: ["Landscape", "Wildlife", "Macro", "Urban"][i % 4],
      views: Math.floor(Math.random() * 10000) + 1000,
      likes: Math.floor(Math.random() * 1000) + 100,
      color: [
        "from-blue-500 to-cyan-400",
        "from-emerald-500 to-teal-400",
        "from-amber-500 to-orange-400",
        "from-purple-500 to-pink-400",
        "from-rose-500 to-red-400",
        "from-violet-500 to-indigo-400",
      ][i % 6],
      aspect: i % 3 === 0 ? "square" : i % 3 === 1 ? "portrait" : "landscape",
    }));

    const timer = setTimeout(() => {
      setImages(generated);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const getAspectClass = (aspect: string) => {
    switch (aspect) {
      case "portrait":
        return "aspect-[3/4]";
      case "landscape":
        return "aspect-[4/3]";
      default:
        return "aspect-square";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Responsive Image Grid
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Perfectly responsive images in flexible layouts
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setLayout("grid")}
                className={`px-4 py-2 rounded-md transition-all ${
                  layout === "grid"
                    ? "bg-white dark:bg-gray-700 shadow-sm"
                    : "hover:bg-white/50 dark:hover:bg-gray-700/50"
                }`}
              >
                <Grid className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={() => setLayout("list")}
                className={`px-4 py-2 rounded-md transition-all ${
                  layout === "list"
                    ? "bg-white dark:bg-gray-700 shadow-sm"
                    : "hover:bg-white/50 dark:hover:bg-gray-700/50"
                }`}
              >
                <List className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {layout === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="group relative">
                <div
                  className={`${getAspectClass(
                    image.aspect
                  )} rounded-xl overflow-hidden cursor-pointer bg-linear-to-br ${
                    image.color
                  }`}
                >
                  <div className="h-full flex flex-col justify-between p-4">
                    <div className="flex justify-between">
                      <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                        <span className="text-white text-sm font-medium">
                          {image.category}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          setLiked((prev) =>
                            prev.includes(image.id)
                              ? prev.filter((id) => id !== image.id)
                              : [...prev, image.id]
                          )
                        }
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            liked.includes(image.id)
                              ? "fill-red-500 text-red-500"
                              : "text-white"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="text-white">
                      <h3 className="font-bold text-lg">{image.title}</h3>
                      <div className="flex items-center space-x-3 mt-2 text-sm opacity-90">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{image.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{image.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="flex items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div
                  className={`w-24 h-24 rounded-lg bg-linear-to-br ${image.color} flex items-center justify-center shrink-0`}
                >
                  <div className="text-2xl">🖼️</div>
                </div>

                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white text-lg">
                        {image.title}
                      </h3>
                      <div className="flex items-center space-x-3 mt-1 text-sm text-gray-600 dark:text-gray-400">
                        <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                          {image.category}
                        </span>
                        <span>{image.views.toLocaleString()} views</span>
                        <span>{image.likes} likes</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                        <Download className="w-5 h-5 text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                        <Share2 className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <button className="px-8 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white rounded-full font-medium transition-all">
            Load More Images
          </button>
        </div>
      </div>
    </div>
  );
}
