"use client";
import { CheckCircle, Zap, Shield, Users } from "lucide-react";

export default function CTAWithFeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed and performance",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security and compliance",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work seamlessly with your team",
    },
    {
      icon: CheckCircle,
      title: "99.9% Uptime",
      description: "Reliable and always available",
    },
  ];

  return (
    <section className="py-20 px-4 bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Packed with features designed to help your business grow
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group hover:scale-105 transition-transform"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-6 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="relative bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-800 rounded-3xl overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            ></div>
          </div>

          <div className="relative p-8 md:p-12 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start Your Free Trial Today
            </h3>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Get full access to all features for 14 days. No credit card
              required.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center space-x-2 text-white">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>Unlimited projects</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>Priority support</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>All integrations</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg">
                Get Started Free
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                Schedule a Demo
              </button>
            </div>

            <p className="text-blue-200 text-sm mt-6">
              Trusted by 10,000+ businesses worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
