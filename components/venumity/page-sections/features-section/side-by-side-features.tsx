"use client";
import { Smartphone, Cpu, Database, Cloud, Code, Server } from "lucide-react";

export default function SideBySideFeaturesSection() {
  const features = [
    {
      title: "Mobile First Design",
      description: "Responsive design that works perfectly on all devices.",
      icon: Smartphone,
      align: "left",
      color: "text-blue-500",
    },
    {
      title: "High Performance",
      description: "Optimized for speed with advanced caching and CDN.",
      icon: Cpu,
      align: "right",
      color: "text-green-500",
    },
    {
      title: "Scalable Database",
      description: "Handles millions of records without performance issues.",
      icon: Database,
      align: "left",
      color: "text-purple-500",
    },
    {
      title: "Cloud Infrastructure",
      description: "Built on reliable cloud platforms with auto-scaling.",
      icon: Cloud,
      align: "right",
      color: "text-orange-500",
    },
    {
      title: "Developer Friendly",
      description: "Clean APIs and comprehensive documentation.",
      icon: Code,
      align: "left",
      color: "text-pink-500",
    },
    {
      title: "Enterprise Ready",
      description: "Meets the highest standards for security and reliability.",
      icon: Server,
      align: "right",
      color: "text-cyan-500",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Built for Modern Businesses
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with intuitive design.
          </p>
        </div>

        <div className="relative">
          {/* Center line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-linear-to-b from-blue-500 to-purple-500"></div>

          <div className="space-y-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  feature.align === "left"
                    ? "lg:justify-start"
                    : "lg:justify-end"
                }`}
              >
                <div
                  className={`w-full lg:w-1/2 ${
                    feature.align === "left" ? "lg:pr-12" : "lg:pl-12"
                  }`}
                >
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start">
                      <div
                        className={`p-3 rounded-lg ${feature.color} bg-opacity-10 dark:bg-opacity-20 mr-4`}
                      >
                        <feature.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-800 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Experience All Features?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
              Start Free Trial
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
