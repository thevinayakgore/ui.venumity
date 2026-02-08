"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Zap,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Product Manager",
    company: "TechVision Inc.",
    content:
      "This platform transformed how our team collaborates. The intuitive interface and powerful features saved us countless hours.",
    avatar: "👨‍💼",
    color: "from-blue-500 to-cyan-400",
    metrics: { projects: 42, efficiency: "+65%", team: 8 },
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Lead Designer",
    company: "CreativeStudio",
    content:
      "As a designer, I appreciate the attention to detail. The tools are both beautiful and incredibly functional.",
    avatar: "👩‍🎨",
    color: "from-purple-500 to-pink-400",
    metrics: { projects: 28, efficiency: "+48%", team: 5 },
  },
  {
    id: 3,
    name: "Marcus Rivera",
    role: "CTO",
    company: "InnovateLabs",
    content:
      "The scalability and performance exceeded our expectations. Our engineering team loves working with this platform.",
    avatar: "👨‍💻",
    color: "from-emerald-500 to-teal-400",
    metrics: { projects: 67, efficiency: "+82%", team: 12 },
  },
  {
    id: 4,
    name: "Priya Sharma",
    role: "Marketing Director",
    company: "GrowthHack",
    content:
      "Our campaign performance improved dramatically. The analytics and automation features are game-changers.",
    avatar: "👩‍💼",
    color: "from-amber-500 to-orange-400",
    metrics: { projects: 34, efficiency: "+57%", team: 6 },
  },
  {
    id: 5,
    name: "James Wilson",
    role: "Startup Founder",
    company: "Nexus Ventures",
    content:
      "As a small team, we needed tools that grow with us. This platform has been instrumental in our scaling journey.",
    avatar: "👨‍🚀",
    color: "from-violet-500 to-indigo-400",
    metrics: { projects: 19, efficiency: "+73%", team: 3 },
  },
];

export default function Carousel_3_4() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const extendedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];
  const totalItems = testimonials.length;
  const centerIndex = totalItems; // Start in the middle of extended array

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => prev + 1);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => prev - 1);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex(centerIndex + index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  useEffect(() => {
    // Reset to center when reaching edges
    if (activeIndex >= centerIndex + totalItems) {
      setTimeout(() => {
        setActiveIndex(centerIndex);
      }, 50);
    } else if (activeIndex < centerIndex - totalItems) {
      setTimeout(() => {
        setActiveIndex(centerIndex);
      }, 50);
    }
  }, [activeIndex, centerIndex, totalItems]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !isTransitioning) {
      interval = setInterval(nextSlide, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isTransitioning, nextSlide]);

  const getItemStyle = (index: number) => {
    const offset = index - activeIndex;
    const isCenter = offset === 0;
    const isVisible = Math.abs(offset) <= 2;

    if (!isVisible) return { opacity: 0, transform: "scale(0.8)" };

    const scale = isCenter ? 1 : 0.85;
    const xOffset = offset * 320;
    const opacity = isCenter ? 1 : 0.5;
    const zIndex = isCenter ? 50 : 40 - Math.abs(offset);

    return {
      transform: `translateX(${xOffset}px) scale(${scale})`,
      opacity,
      zIndex,
      transition: isTransitioning ? "all 0.5s ease-out" : "all 0.3s ease-out",
    };
  };

  const currentTestimonial =
    testimonials[(activeIndex - centerIndex + totalItems) % totalItems];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-linear-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-linear-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-full mb-4">
            <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              Customer Stories
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            See how teams across the globe are achieving remarkable results with
            our platform.
          </p>
        </div>

        <div className="relative h-[500px] overflow-hidden">
          <div
            ref={containerRef}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Infinite Carousel Items */}
            {extendedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="absolute transition-all duration-500"
                style={getItemStyle(index)}
              >
                <div
                  className={`w-96 rounded-2xl bg-linear-to-br ${testimonial.color} p-8 shadow-2xl`}
                >
                  {/* Avatar & Info */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="text-4xl">{testimonial.avatar}</div>
                    <div>
                      <div className="text-xl font-bold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-white/80">
                        {testimonial.role} • {testimonial.company}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <p className="text-white/90 text-lg leading-relaxed italic">
                      &quot;{testimonial.content}&ldquo;
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <TrendingUp className="w-4 h-4 text-white" />
                        <div className="text-2xl font-bold text-white">
                          {testimonial.metrics.efficiency}
                        </div>
                      </div>
                      <div className="text-white/80 text-sm">Efficiency</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Clock className="w-4 h-4 text-white" />
                        <div className="text-2xl font-bold text-white">
                          {testimonial.metrics.projects}
                        </div>
                      </div>
                      <div className="text-white/80 text-sm">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Users className="w-4 h-4 text-white" />
                        <div className="text-2xl font-bold text-white">
                          {testimonial.metrics.team}
                        </div>
                      </div>
                      <div className="text-white/80 text-sm">Team Size</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex items-center justify-between px-4">
            <button
              onClick={prevSlide}
              disabled={isTransitioning}
              className="w-14 h-14 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 shadow-2xl transition-all duration-300 flex items-center justify-center disabled:opacity-50"
            >
              <ChevronLeft className="w-7 h-7 text-gray-700 dark:text-gray-300" />
            </button>
            <button
              onClick={nextSlide}
              disabled={isTransitioning}
              className="w-14 h-14 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 shadow-2xl transition-all duration-300 flex items-center justify-center disabled:opacity-50"
            >
              <ChevronRight className="w-7 h-7 text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          {/* Play/Pause */}
          <div className="absolute top-6 right-6">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 shadow-lg transition-all duration-300"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Play className="w-5 h-5 text-gray-700 dark:text-gray-300 ml-0.5" />
              )}
            </button>
          </div>
        </div>

        {/* Active Testimonial Info */}
        <div className="mt-12 bg-linear-to-r from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Currently Viewing
              </div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {currentTestimonial.name}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {currentTestimonial.role} at {currentTestimonial.company}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-800 dark:text-white">
                  {currentTestimonial.metrics.efficiency}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Efficiency Gain
                </div>
              </div>
              <button className="px-8 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white font-bold rounded-full transition-all duration-300">
                Read Full Story
              </button>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-center space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className="relative group"
            >
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  (activeIndex - centerIndex + totalItems) % totalItems ===
                  index
                    ? "bg-linear-to-r from-blue-500 to-cyan-400 scale-125"
                    : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                }`}
              />
              <div className="absolute -inset-3 rounded-full group-hover:bg-gray-100 dark:group-hover:bg-gray-800/30 transition-opacity" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
