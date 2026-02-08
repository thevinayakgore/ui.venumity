"use client";
import { Check, ArrowRight } from "lucide-react";

export default function HeroWithImageSection() {
  const features = [
    "No credit card required",
    "14-day free trial",
    "Cancel anytime",
    "24/7 customer support",
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-white dark:bg-gray-900">
      <div className="absolute inset-0">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/20"></div>

        {/* Geometric pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(30deg, #3b82f6 12%, transparent 12.5%, transparent 87%, #3b82f6 87.5%, #3b82f6),
                             linear-gradient(150deg, #3b82f6 12%, transparent 12.5%, transparent 87%, #3b82f6 87.5%, #3b82f6),
                             linear-gradient(30deg, #3b82f6 12%, transparent 12.5%, transparent 87%, #3b82f6 87.5%, #3b82f6),
                             linear-gradient(150deg, #3b82f6 12%, transparent 12.5%, transparent 87%, #3b82f6 87.5%, #3b82f6),
                             linear-gradient(60deg, #3b82f677 25%, transparent 25.5%, transparent 75%, #3b82f677 75%, #3b82f677),
                             linear-gradient(60deg, #3b82f677 25%, transparent 25.5%, transparent 75%, #3b82f677 75%, #3b82f677)`,
              backgroundSize: "80px 140px",
              backgroundPosition:
                "0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px",
            }}
          ></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium mb-8">
              🚀 Now with AI-powered features
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              The Future of
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                Digital Creation
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Build amazing digital experiences without writing code. Our
              platform combines powerful tools with intuitive design for
              creators of all skill levels.
            </p>

            {/* Features list */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="group px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                View Demo
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-linear-to-r from-blue-400 to-purple-400 border-2 border-white dark:border-gray-900"
                  ></div>
                ))}
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  Join 10,000+ creators
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Rated 4.9/5 stars
                </div>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="mt-12 lg:mt-0 relative">
            <div className="relative w-full h-96 lg:h-150 rounded-3xl overflow-hidden shadow-2xl">
              {/* Placeholder for image - in real app use next/image */}
              <div className="absolute inset-0 bg-linear-to-br from-blue-400 via-purple-400 to-pink-400">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="text-4xl font-bold mb-4">
                      Dashboard Preview
                    </div>
                    <p className="opacity-90">
                      Interactive dashboard with real-time analytics
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-8 left-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                <div className="text-sm font-bold text-gray-900 dark:text-white">
                  Active Users
                </div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  2,847
                </div>
              </div>
              <div className="absolute bottom-8 right-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                <div className="text-sm font-bold text-gray-900 dark:text-white">
                  Revenue
                </div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  $45.2K
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
