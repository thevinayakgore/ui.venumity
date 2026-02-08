"use client";
import { Zap, Shield, Users, BarChart, Globe, Lock } from "lucide-react";

export default function GridFeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Optimized performance for instant loading and seamless user experience.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Bank-level security with end-to-end encryption and compliance certifications.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Real-time collaboration tools for distributed teams to work together efficiently.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: BarChart,
      title: "Advanced Analytics",
      description:
        "Comprehensive insights and data visualization for informed decision-making.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Globe,
      title: "Global Scale",
      description:
        "Built to handle millions of users worldwide with 99.9% uptime guarantee.",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: Lock,
      title: "Data Privacy",
      description:
        "Full control over your data with privacy-first architecture and GDPR compliance.",
      color: "from-teal-500 to-green-500",
    },
  ];

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Packed with powerful features designed to help your business grow
            and succeed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Gradient border effect */}
              <div
                className="absolute inset-0 rounded-2xl bg-linear-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(to right, var(--tw-gradient-stops))`,
                }}
              />

              <div className="relative">
                <div
                  className={`inline-flex p-3 rounded-xl bg-linear-to-r ${feature.color} mb-6`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  );
}
