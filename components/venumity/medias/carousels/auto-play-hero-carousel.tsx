"use client";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const slides = [
  {
    id: 1,
    title: "Innovation Summit 2024",
    description:
      "Join the future of technology with industry leaders and innovators.",
    color: "from-blue-600 to-purple-600",
    image: "🌌",
    category: "Technology",
  },
  {
    id: 2,
    title: "Creative Design Workshop",
    description:
      "Master the art of modern UI/UX design with hands-on sessions.",
    color: "from-pink-500 to-rose-600",
    image: "🎨",
    category: "Design",
  },
  {
    id: 3,
    title: "Business Growth Conference",
    description: "Strategies for scaling your business in the digital age.",
    color: "from-emerald-500 to-teal-600",
    image: "📈",
    category: "Business",
  },
  {
    id: 4,
    title: "Sustainability Forum",
    description: "Building a greener future with sustainable solutions.",
    color: "from-amber-500 to-orange-600",
    image: "🌿",
    category: "Environment",
  },
  {
    id: 5,
    title: "Health & Wellness Expo",
    description: "Latest advancements in healthcare and wellness technology.",
    color: "from-violet-500 to-indigo-600",
    image: "💊",
    category: "Health",
  },
];

export default function Carousel_3_1() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !isTransitioning) {
      interval = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isTransitioning, nextSlide]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 rounded-3xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Featured Events
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Discover upcoming conferences and workshops
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Play className="w-5 h-5 text-gray-600 dark:text-gray-400 ml-0.5" />
              )}
            </button>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-bold text-gray-800 dark:text-white">
                {currentIndex + 1}
              </span>
              <span className="mx-1">/</span>
              <span>{slides.length}</span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl">
          {/* Main Carousel */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                  index === currentIndex
                    ? "translate-x-0 opacity-100"
                    : index < currentIndex
                    ? "-translate-x-full opacity-0"
                    : "translate-x-full opacity-0"
                }`}
              >
                <div
                  className={`h-full bg-linear-to-br ${slide.color} relative overflow-hidden`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-grid-pattern" />
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex items-center p-12">
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                        <span className="text-white font-medium text-sm">
                          {slide.category}
                        </span>
                      </div>
                      <h3 className="text-5xl font-bold text-white mb-6 leading-tight">
                        {slide.title}
                      </h3>
                      <p className="text-xl text-white/90 mb-8 leading-relaxed">
                        {slide.description}
                      </p>
                      <div className="flex items-center space-x-4">
                        <button className="px-8 py-3 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                          Register Now
                        </button>
                        <button className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30">
                          Learn More
                        </button>
                      </div>
                    </div>

                    {/* Decorative Image */}
                    <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                      <div className="text-[200px] opacity-20">
                        {slide.image}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-7 h-7 text-white" />
          </button>
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-7 h-7 text-white" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className="relative group"
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                />
                <div className="absolute -inset-3 rounded-full group-hover:bg-white/10 transition-opacity" />
              </button>
            ))}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="mt-8 grid grid-cols-5 gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                index === currentIndex
                  ? "ring-2 ring-offset-2 ring-blue-500 scale-105"
                  : "opacity-70 hover:opacity-100 hover:scale-102"
              }`}
            >
              <div
                className={`aspect-4/3 bg-linear-to-br ${slide.color} relative`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-3xl opacity-80">{slide.image}</div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-3">
                  <div className="text-white text-sm font-medium truncate">
                    {slide.title}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
