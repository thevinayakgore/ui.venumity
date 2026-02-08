"use client";
import { motion } from "framer-motion";
import { Star, Quote, Building, MapPin } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  location: string;
  content: string;
  rating: number;
  date: string;
  avatarColor: string;
}

export default function Testimonials1() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CTO",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      content:
        "The support team exceeded our expectations. They were responsive, knowledgeable, and went above and beyond to solve our complex technical issues.",
      rating: 5,
      date: "2 weeks ago",
      avatarColor: "from-blue-500 to-indigo-600",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Manager",
      company: "InnovateCo",
      location: "New York, NY",
      content:
        "Outstanding customer service! The team helped us integrate their platform seamlessly with our existing systems. The documentation was excellent.",
      rating: 5,
      date: "1 month ago",
      avatarColor: "from-green-500 to-emerald-600",
    },
    {
      id: 3,
      name: "Emma Wilson",
      role: "Operations Director",
      company: "Global Solutions",
      location: "London, UK",
      content:
        "We've been using their support services for over a year. Consistently excellent response times and effective solutions. Highly recommend!",
      rating: 4,
      date: "3 days ago",
      avatarColor: "from-purple-500 to-pink-600",
    },
    {
      id: 4,
      name: "David Kim",
      role: "CEO",
      company: "StartUpXYZ",
      location: "Seoul, South Korea",
      content:
        "The 24/7 support has been invaluable for our global operations. Quick resolutions and professional service every time.",
      rating: 5,
      date: "2 months ago",
      avatarColor: "from-orange-500 to-red-600",
    },
    {
      id: 5,
      name: "Lisa Rodriguez",
      role: "IT Director",
      company: "Enterprise Systems",
      location: "Miami, FL",
      content:
        "Their technical support team is exceptional. They not only fix issues but provide insights to prevent future problems.",
      rating: 5,
      date: "1 week ago",
      avatarColor: "from-yellow-500 to-amber-600",
    },
    {
      id: 6,
      name: "Alex Thompson",
      role: "Development Lead",
      company: "CodeMasters",
      location: "Austin, TX",
      content:
        "As a developer, I appreciate the technical depth of their support team. They understand complex systems and provide practical solutions.",
      rating: 4,
      date: "3 weeks ago",
      avatarColor: "from-gray-500 to-gray-700",
    },
  ];

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6"
          >
            <Quote size={32} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Customers Say
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust our support services
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote size={24} className="text-gray-300 dark:text-gray-700" />
              </div>

              {/* Content */}
              <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-4">
                &quot;{testimonial.content}&ldquo;
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {renderStars(testimonial.rating)}
                <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                  {testimonial.rating}.0
                </span>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 bg-linear-to-br ${testimonial.avatarColor} rounded-full flex items-center justify-center text-white font-bold text-lg`}
                >
                  {testimonial.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {testimonial.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <Building size={12} />
                      <span>{testimonial.company}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin size={12} />
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              4.9/5
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Average Rating
            </div>
          </div>
          <div className="bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              10K+
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Happy Customers
            </div>
          </div>
          <div className="bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              99%
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Satisfaction Rate
            </div>
          </div>
          <div className="bg-linear-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              5min
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Avg Response Time
            </div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
