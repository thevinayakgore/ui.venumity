"use client";

import { motion } from "framer-motion";
import {
  Star,
  TrendingUp,
  Users,
  Zap,
  Target,
  BarChart,
  CheckCircle,
  ArrowRight,
  Quote,
} from "lucide-react";

interface CaseStudy {
  id: number;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: Array<{ metric: string; value: string; improvement: string }>;
  testimonial: string;
  author: string;
  role: string;
  rating: number;
  duration: string;
}

export default function Testimonials4() {
  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      company: "TechInnovate Inc.",
      industry: "SaaS Technology",
      challenge:
        "Rapid scaling led to support ticket overload, with average response times exceeding 48 hours during peak periods.",
      solution:
        "Implemented our dedicated support team with AI-powered triage, automated workflows, and 24/7 coverage across all time zones.",
      results: [
        { metric: "Response Time", value: "15 min", improvement: "-94%" },
        { metric: "Resolution Rate", value: "98%", improvement: "+32%" },
        {
          metric: "Customer Satisfaction",
          value: "4.9/5",
          improvement: "+45%",
        },
        { metric: "Support Costs", value: "-40%", improvement: "per ticket" },
      ],
      testimonial:
        "The transformation in our support operations has been phenomenal. What used to take days now takes minutes, and our customer satisfaction scores have never been higher.",
      author: "Sarah Johnson",
      role: "Chief Technology Officer",
      rating: 5,
      duration: "3 months",
    },
    {
      id: 2,
      company: "Global Retail Group",
      industry: "E-commerce",
      challenge:
        "International expansion created support complexity with language barriers and 24/7 coverage requirements across 12 time zones.",
      solution:
        "Deployed multilingual support team with regional experts, unified ticketing system, and AI translation support for real-time assistance.",
      results: [
        {
          metric: "Global Coverage",
          value: "24/7",
          improvement: "All regions",
        },
        {
          metric: "Language Support",
          value: "8 languages",
          improvement: "+6 languages",
        },
        {
          metric: "First Contact Resolution",
          value: "92%",
          improvement: "+28%",
        },
        {
          metric: "Support Scalability",
          value: "300%",
          improvement: "capacity increase",
        },
      ],
      testimonial:
        "Going global was daunting, but with their support team handling the complexity, we expanded to 8 new markets seamlessly. Their multilingual capabilities were game-changing.",
      author: "Emma Wilson",
      role: "Operations Director",
      rating: 4,
      duration: "6 months",
    },
    {
      id: 3,
      company: "FinSecure Bank",
      industry: "Financial Services",
      challenge:
        "Stringent security compliance requirements combined with the need for rapid, accurate support for critical banking systems.",
      solution:
        "Specialized security-cleared support team with banking expertise, compliance-focused workflows, and encrypted communication channels.",
      results: [
        {
          metric: "Security Compliance",
          value: "100%",
          improvement: "Audit passes",
        },
        {
          metric: "Critical Issue Resolution",
          value: "< 30 min",
          improvement: "-85%",
        },
        {
          metric: "Regulatory Reporting",
          value: "Automated",
          improvement: "100% accuracy",
        },
        { metric: "System Uptime", value: "99.99%", improvement: "+0.49%" },
      ],
      testimonial:
        "In banking, security and speed are non-negotiable. Their team delivered both, maintaining perfect compliance while dramatically improving our response times.",
      author: "David Kim",
      role: "Security Lead",
      rating: 5,
      duration: "9 months",
    },
  ];

  const overallStats = [
    {
      icon: <TrendingUp size={24} />,
      label: "Average Improvement",
      value: "42%",
    },
    { icon: <Users size={24} />, label: "Clients Supported", value: "500+" },
    { icon: <Zap size={24} />, label: "Response Time Reduction", value: "89%" },
    { icon: <Target size={24} />, label: "SLA Achievement", value: "99.7%" },
  ];

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
            Success Stories & Case Studies
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real results from companies that transformed their support
            operations with our services
          </p>
        </div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {overallStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center"
            >
              <div className="inline-flex p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-3">
                <div className="text-blue-600 dark:text-blue-400">
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left Column - Challenge & Solution */}
                  <div className="lg:w-2/3">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {study.company}
                          </div>
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-sm rounded-full">
                            {study.industry}
                          </span>
                          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                            {study.duration} implementation
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={
                                i < study.rating
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300 dark:text-gray-600"
                              }
                            />
                          ))}
                          <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                            {study.rating}.0 rating
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Case Study
                        </div>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          CS-{study.id.toString().padStart(3, "0")}
                        </div>
                      </div>
                    </div>

                    {/* Challenge & Solution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-linear-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                            <Target
                              size={20}
                              className="text-red-600 dark:text-red-400"
                            />
                          </div>
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            Challenge
                          </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                          {study.challenge}
                        </p>
                      </div>

                      <div className="bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <Zap
                              size={20}
                              className="text-green-600 dark:text-green-400"
                            />
                          </div>
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            Solution
                          </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                          {study.solution}
                        </p>
                      </div>
                    </div>

                    {/* Results */}
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                        Measurable Results
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {study.results.map((result, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center"
                          >
                            <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                              {result.value}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              {result.metric}
                            </div>
                            <div
                              className={`text-xs font-medium ${
                                result.improvement.startsWith("+")
                                  ? "text-green-600 dark:text-green-400"
                                  : result.improvement.startsWith("-")
                                  ? "text-red-600 dark:text-red-400"
                                  : "text-blue-600 dark:text-blue-400"
                              }`}
                            >
                              {result.improvement}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Testimonial */}
                  <div className="lg:w-1/3">
                    <div className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl p-6 h-full">
                      <div className="mb-4">
                        <Quote
                          size={24}
                          className="text-blue-600 dark:text-blue-400"
                        />
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 italic mb-6">
                        &quot;{study.testimonial}&ldquo;
                      </p>

                      <div className="border-t border-blue-200 dark:border-blue-800 pt-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                            {study.author.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white">
                              {study.author}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {study.role}
                            </p>
                            <p className="text-sm text-blue-600 dark:text-blue-400">
                              {study.company}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Verified Results</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <BarChart size={16} className="text-blue-500" />
                      <span>Data-backed Outcomes</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="px-6 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors">
                      View Full Case Study
                    </button>
                    <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                      Contact Similar Company
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-linear-to-r from-gray-900 to-black dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 text-white"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-3">
                Ready to Transform Your Support Operations?
              </h2>
              <p className="text-gray-300">
                Schedule a personalized consultation to see how we can deliver
                similar results for your business.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
                Schedule Consultation
              </button>
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 font-semibold rounded-xl transition-colors">
                Download Case Studies
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
