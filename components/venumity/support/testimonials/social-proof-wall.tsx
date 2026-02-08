"use client";
import { motion } from "framer-motion";
import {
  Star,
  ThumbsUp,
  MessageSquare,
  Share2,
  Filter,
  TrendingUp,
  Users,
  Award,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

interface SocialProof {
  id: number;
  platform: "trustpilot" | "g2" | "capterra" | "google" | "gartner";
  rating: number;
  reviews: number;
  rank: string;
  badge: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  platform: string;
  date: string;
  likes: number;
  comments: number;
  verified: boolean;
  helpful: number;
}

export default function Testimonials5() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [helpfulMap, setHelpfulMap] = useState<Record<number, boolean>>({});

  const socialProofs: SocialProof[] = [
    {
      id: 1,
      platform: "trustpilot",
      rating: 4.9,
      reviews: 2450,
      rank: "Excellent",
      badge: "Top Rated",
    },
    {
      id: 2,
      platform: "g2",
      rating: 4.8,
      reviews: 1890,
      rank: "Leader",
      badge: "Best Support",
    },
    {
      id: 3,
      platform: "capterra",
      rating: 4.7,
      reviews: 1560,
      rank: "Top Performer",
      badge: "Easiest to Use",
    },
    {
      id: 4,
      platform: "google",
      rating: 4.9,
      reviews: 3250,
      rank: "5 Stars",
      badge: "Editor's Choice",
    },
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CTO",
      company: "TechInnovate Inc.",
      content:
        "Hands down the best support experience we've had. The team is not only responsive but also proactive in identifying potential issues before they become problems. Their technical depth is impressive.",
      rating: 5,
      platform: "Trustpilot",
      date: "2 days ago",
      likes: 89,
      comments: 12,
      verified: true,
      helpful: 95,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "VP Engineering",
      company: "CloudSystems Corp",
      content:
        "We migrated from another provider and the difference is night and day. The onboarding was seamless, and ongoing support has been exceptional. 24/7 availability with actual experts, not just scripts.",
      rating: 5,
      platform: "G2",
      date: "1 week ago",
      likes: 76,
      comments: 8,
      verified: true,
      helpful: 92,
    },
    {
      id: 3,
      name: "Emma Wilson",
      role: "Operations Director",
      company: "Global Retail Group",
      content:
        "International support done right. The multilingual team handles our global operations flawlessly. Response times are consistently under 5 minutes, even during off-hours.",
      rating: 4,
      platform: "Capterra",
      date: "3 days ago",
      likes: 54,
      comments: 5,
      verified: true,
      helpful: 88,
    },
    {
      id: 4,
      name: "David Kim",
      role: "Security Lead",
      company: "FinSecure Bank",
      content:
        "As a financial institution, we have strict security and compliance requirements. Their support team not only meets but exceeds these standards. The audit trails and reporting are impeccable.",
      rating: 5,
      platform: "Google",
      date: "2 weeks ago",
      likes: 102,
      comments: 15,
      verified: true,
      helpful: 98,
    },
    {
      id: 5,
      name: "Lisa Rodriguez",
      role: "IT Director",
      company: "Healthcare Systems",
      content:
        "HIPAA compliance was a major concern for us. Their team demonstrated deep understanding of healthcare regulations and implemented support protocols that satisfied our compliance team.",
      rating: 5,
      platform: "Trustpilot",
      date: "1 month ago",
      likes: 67,
      comments: 9,
      verified: true,
      helpful: 94,
    },
    {
      id: 6,
      name: "Alex Thompson",
      role: "Development Lead",
      company: "CodeMasters",
      content:
        "The API support is outstanding. As developers, we appreciate technical conversations with experts who actually understand our codebase. The documentation and examples are also top-notch.",
      rating: 4,
      platform: "G2",
      date: "3 weeks ago",
      likes: 45,
      comments: 6,
      verified: true,
      helpful: 86,
    },
  ];

  const filters = [
    { id: "all", label: "All Reviews" },
    { id: "5-star", label: "5 Stars" },
    { id: "trustpilot", label: "Trustpilot" },
    { id: "g2", label: "G2" },
    { id: "verified", label: "Verified" },
  ];

  const filteredTestimonials =
    activeFilter === "all"
      ? testimonials
      : activeFilter === "5-star"
      ? testimonials.filter((t) => t.rating === 5)
      : activeFilter === "verified"
      ? testimonials.filter((t) => t.verified)
      : testimonials.filter((t) => t.platform.toLowerCase() === activeFilter);

  const handleHelpfulClick = (id: number) => {
    setHelpfulMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "trustpilot":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400";
      case "g2":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400";
      case "capterra":
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400";
      case "google":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400";
    }
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
            Social Proof & Reviews
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See what customers are saying about us across review platforms
          </p>
        </div>

        {/* Social Proof Bars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {socialProofs.map((proof) => (
            <div
              key={proof.id}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {proof.rating}
                </div>
                <div className="flex items-center gap-1">
                  {renderStars(proof.rating)}
                </div>
              </div>

              <div className="mb-3">
                <div className="font-semibold text-gray-900 dark:text-white">
                  {proof.platform.charAt(0).toUpperCase() +
                    proof.platform.slice(1)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {proof.reviews.toLocaleString()} reviews
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-sm rounded-full">
                  {proof.rank}
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {proof.badge}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Overall Stats */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">4.9/5</div>
              <div className="text-blue-200">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">10K+</div>
              <div className="text-blue-200">Total Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-blue-200">Recommend</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">#1</div>
              <div className="text-blue-200">Customer Support</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Customer Reviews
            </h2>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Filter size={16} />
              <span>Filter by:</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  activeFilter === filter.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {filteredTestimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    {renderStars(testimonial.rating)}
                  </div>
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${getPlatformColor(
                      testimonial.platform
                    )}`}
                  >
                    {testimonial.platform}
                  </span>
                </div>
              </div>

              {/* Content */}
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                &quot;{testimonial.content}&ldquo;
              </p>

              {/* Stats & Verification */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <TrendingUp size={14} />
                    <span>{testimonial.helpful}% helpful</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp size={14} />
                    <span>{testimonial.likes} likes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare size={14} />
                    <span>{testimonial.comments} comments</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {testimonial.verified && (
                    <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                      <CheckCircle size={14} />
                      <span>Verified</span>
                    </div>
                  )}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.date}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
                <button
                  onClick={() => handleHelpfulClick(testimonial.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    helpfulMap[testimonial.id]
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <ThumbsUp size={16} />
                  {helpfulMap[testimonial.id] ? "Helpful ✓" : "Helpful?"}
                </button>

                <div className="flex gap-2">
                  <button className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <MessageSquare
                      size={18}
                      className="text-gray-600 dark:text-gray-400"
                    />
                  </button>
                  <button className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <Share2
                      size={18}
                      className="text-gray-600 dark:text-gray-400"
                    />
                  </button>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    Reply
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Awards & Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-linear-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Awards & Recognition
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <Award
                  size={24}
                  className="text-yellow-600 dark:text-yellow-400"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Best Support 2024
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  G2 Crowd Awards
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <TrendingUp
                  size={24}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Fastest Growing
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Capterra Recognition
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Users
                  size={24}
                  className="text-green-600 dark:text-green-400"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Customer Choice
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Trustpilot Awards
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
