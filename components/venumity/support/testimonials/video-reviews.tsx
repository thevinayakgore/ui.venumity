"use client";
import { motion } from "framer-motion";
import {
  Play,
  Star,
  Quote,
  ThumbsUp,
  MessageSquare,
  Share2,
  Calendar,
  Globe,
} from "lucide-react";
import { useState } from "react";

interface VideoTestimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  title: string;
  excerpt: string;
  duration: string;
  views: number;
  likes: number;
  comments: number;
  rating: number;
  date: string;
  location: string;
  industry: string;
  thumbnailColor: string;
}

export default function Testimonials3() {
  const [selectedVideo, setSelectedVideo] = useState<number>(1);
  const [likedVideos, setLikedVideos] = useState<number[]>([1, 3]);

  const videoTestimonials: VideoTestimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CTO",
      company: "TechInnovate Inc.",
      title: "How Our Migration Was Handled Flawlessly",
      excerpt:
        "Watch how our support team managed a complex system migration with zero downtime and exceptional coordination.",
      duration: "4:32",
      views: 12450,
      likes: 890,
      comments: 45,
      rating: 5,
      date: "Jan 15, 2024",
      location: "San Francisco, CA",
      industry: "Technology",
      thumbnailColor: "from-blue-500 to-indigo-600",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "VP Engineering",
      company: "CloudSystems Corp",
      title: "Scaling Support for Rapid Growth",
      excerpt:
        "Learn how our support services scaled alongside their explosive growth, maintaining quality and response times.",
      duration: "6:18",
      views: 8920,
      likes: 540,
      comments: 32,
      rating: 5,
      date: "Feb 3, 2024",
      location: "New York, NY",
      industry: "SaaS",
      thumbnailColor: "from-green-500 to-emerald-600",
    },
    {
      id: 3,
      name: "Emma Wilson",
      role: "Operations Director",
      company: "Global Retail Group",
      title: "24/7 International Support Success",
      excerpt:
        "See how our multilingual support team provided seamless assistance across different time zones and regions.",
      duration: "5:45",
      views: 7560,
      likes: 620,
      comments: 28,
      rating: 4,
      date: "Mar 10, 2024",
      location: "London, UK",
      industry: "Retail",
      thumbnailColor: "from-purple-500 to-pink-600",
    },
    {
      id: 4,
      name: "David Kim",
      role: "Security Lead",
      company: "FinSecure Bank",
      title: "Bank-Grade Security Support",
      excerpt:
        "Discover how our security-focused support team helped maintain compliance and protect sensitive financial data.",
      duration: "7:22",
      views: 5430,
      likes: 420,
      comments: 19,
      rating: 5,
      date: "Jan 28, 2024",
      location: "Seoul, South Korea",
      industry: "Finance",
      thumbnailColor: "from-orange-500 to-red-600",
    },
  ];

  const selectedTestimonial =
    videoTestimonials.find((v) => v.id === selectedVideo) ||
    videoTestimonials[0];

  const handleVideoSelect = (id: number) => {
    setSelectedVideo(id);
  };

  const handleLikeToggle = (id: number) => {
    setLikedVideos((prev) =>
      prev.includes(id)
        ? prev.filter((videoId) => videoId !== id)
        : [...prev, id]
    );
  };

  const handlePlayVideo = () => {
    alert(`Playing video: ${selectedTestimonial.title}`);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={16}
        className={
          index < rating
            ? "text-yellow-500 fill-yellow-500"
            : "text-gray-300 dark:text-gray-600"
        }
      />
    ));
  };

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
            Video Testimonials
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Watch real customers share their experiences with our support
            services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {/* Video Thumbnail */}
              <div className="relative">
                <div
                  className={`h-64 sm:h-80 bg-linear-to-br ${selectedTestimonial.thumbnailColor} relative overflow-hidden`}
                >
                  <button
                    onClick={handlePlayVideo}
                    className="absolute inset-0 flex items-center justify-center group"
                  >
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play size={32} className="text-blue-600" />
                    </div>
                  </button>

                  {/* Duration Badge */}
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {selectedTestimonial.duration}
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedTestimonial.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{selectedTestimonial.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe size={14} />
                        <span>{selectedTestimonial.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {renderStars(selectedTestimonial.rating)}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {selectedTestimonial.excerpt}
                </p>

                {/* Stats & Actions */}
                <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        {selectedTestimonial.views.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Views
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        {selectedTestimonial.likes}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Likes
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        {selectedTestimonial.comments}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Comments
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleLikeToggle(selectedTestimonial.id)}
                      className={`p-3 rounded-xl flex items-center gap-2 ${
                        likedVideos.includes(selectedTestimonial.id)
                          ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      <ThumbsUp size={18} />
                      <span className="font-medium">Like</span>
                    </button>
                    <button className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      <MessageSquare
                        size={18}
                        className="text-gray-700 dark:text-gray-300"
                      />
                    </button>
                    <button className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      <Share2
                        size={18}
                        className="text-gray-700 dark:text-gray-300"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Customer Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 bg-linear-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {selectedTestimonial.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedTestimonial.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedTestimonial.role} at {selectedTestimonial.company}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-sm rounded-full">
                      {selectedTestimonial.industry}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                      Verified Customer
                    </span>
                  </div>
                </div>
                <Quote size={32} className="text-gray-300 dark:text-gray-700" />
              </div>
            </motion.div>
          </div>

          {/* Video List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              More Testimonials
            </h3>

            {videoTestimonials.map((video) => (
              <motion.button
                key={video.id}
                whileHover={{ x: 5 }}
                onClick={() => handleVideoSelect(video.id)}
                className={`w-full text-left p-4 rounded-xl transition-all ${
                  selectedVideo === video.id
                    ? "bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 ring-2 ring-blue-500"
                    : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-md"
                }`}
              >
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative shrink-0">
                    <div
                      className={`w-20 h-20 bg-linear-to-br ${video.thumbnailColor} rounded-lg overflow-hidden`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <Play size={12} className="text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                      {video.duration}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                      {video.title}
                    </h4>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        {renderStars(video.rating)}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {video.rating}.0
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span>{video.views.toLocaleString()} views</span>
                      <span>•</span>
                      <span>{video.date}</span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6"
            >
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Testimonial Stats
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">
                      Total Videos
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      50+
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full w-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">
                      Avg. Rating
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      4.8/5
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full w-[96%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">
                      Total Views
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      250K+
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full w-[85%]"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
