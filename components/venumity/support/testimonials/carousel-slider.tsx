"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";
import { useState, useEffect } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  industry: string;
  videoUrl?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Chief Technology Officer",
    company: "TechInnovate Inc.",
    content:
      "The support team's expertise in handling our complex migration was exceptional. They provided 24/7 assistance during critical phases and delivered solutions that exceeded our expectations. Their proactive approach saved us countless hours of troubleshooting.",
    rating: 5,
    industry: "Technology",
    videoUrl: "#video1",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "VP of Engineering",
    company: "CloudSystems Corp",
    content:
      "As a rapidly scaling startup, we needed a support partner that could grow with us. Their team not only solved immediate issues but also helped us optimize our infrastructure for future growth. The ROI has been tremendous.",
    rating: 5,
    industry: "SaaS",
  },
  {
    id: 3,
    name: "Emma Wilson",
    role: "Operations Director",
    company: "Global Retail Group",
    content:
      "International support coverage was crucial for our business. Their multilingual team provided seamless assistance across time zones, ensuring our operations never skipped a beat. Their documentation is also top-notch.",
    rating: 4,
    industry: "Retail",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Security Lead",
    company: "FinSecure Bank",
    content:
      "Security is paramount in banking. Their support team demonstrated deep expertise in security protocols and compliance requirements. Their rapid response to security inquiries gives us great confidence.",
    rating: 5,
    industry: "Finance",
  },
  {
    id: 5,
    name: "Lisa Rodriguez",
    role: "IT Director",
    company: "Healthcare Systems",
    content:
      "The HIPAA-compliant support and strict adherence to healthcare regulations impressed our compliance team. They handle sensitive data with the utmost care and professionalism.",
    rating: 5,
    industry: "Healthcare",
  },
];

export default function Testimonials2() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToTestimonial = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(nextTestimonial, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentIndex]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Customer Stories
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover how industry leaders transformed their operations with our
            support services
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Carousel */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Testimonial Content */}
              <div className="p-8 lg:p-12">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentTestimonial.id}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex flex-col"
                  >
                    {/* Quote Icon */}
                    <div className="mb-6">
                      <Quote
                        size={32}
                        className="text-blue-600 dark:text-blue-400"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                      &quot;{currentTestimonial.content}&ldquo;
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-8">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            size={20}
                            className={
                              index < currentTestimonial.rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300 dark:text-gray-600"
                            }
                          />
                        ))}
                        <span className="ml-3 text-lg font-bold text-gray-900 dark:text-white">
                          {currentTestimonial.rating}.0/5.0
                        </span>
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                          {currentTestimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {currentTestimonial.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {currentTestimonial.role}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-sm rounded-full">
                              {currentTestimonial.company}
                            </span>
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                              {currentTestimonial.industry}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Video/Image Section */}
              <div className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 lg:p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-64 h-64 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                      {currentTestimonial.videoUrl ? (
                        <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                          <Play size={32} className="text-blue-600" />
                        </button>
                      ) : (
                        <Quote size={64} className="text-white opacity-50" />
                      )}
                    </div>
                    <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-900 rounded-full p-3 shadow-lg">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {String(currentTestimonial.id).padStart(2, "0")}
                      </div>
                    </div>
                  </div>
                  <p className="mt-6 text-gray-600 dark:text-gray-400">
                    {currentTestimonial.videoUrl
                      ? "Watch the full customer story video"
                      : "Customer success story"}
                  </p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={prevTestimonial}
                    className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <ChevronLeft
                      size={20}
                      className="text-gray-700 dark:text-gray-300"
                    />
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause
                        size={20}
                        className="text-gray-700 dark:text-gray-300"
                      />
                    ) : (
                      <Play
                        size={20}
                        className="text-gray-700 dark:text-gray-300"
                      />
                    )}
                  </button>

                  <button
                    onClick={nextTestimonial}
                    className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <ChevronRight
                      size={20}
                      className="text-gray-700 dark:text-gray-300"
                    />
                  </button>
                </div>

                {/* Indicators */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentIndex
                          ? "bg-blue-600 w-8"
                          : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                4.9
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Average Rating
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                10K+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Testimonials
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                95%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Retention Rate
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                24/7
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Global Support
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
}
