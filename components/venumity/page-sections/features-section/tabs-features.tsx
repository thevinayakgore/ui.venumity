"use client";
import { useState } from "react";
import {
  Layout,
  Smartphone,
  BarChart3,
  Users,
  Shield,
} from "lucide-react";

export default function FeaturesTabSection() {
  const [activeTab, setActiveTab] = useState("design");

  const tabs = [
    {
      id: "design",
      label: "Design",
      icon: Layout,
      title: "Beautiful & Intuitive Design",
      description:
        "Carefully crafted user interfaces that are both beautiful and intuitive. Our design system ensures consistency across all platforms.",
      features: [
        "Responsive design that works on all devices",
        "Customizable themes and color schemes",
        "Accessibility compliant (WCAG 2.1)",
        "Smooth animations and transitions",
      ],
      imageColor: "from-purple-500 to-pink-500",
    },
    {
      id: "mobile",
      label: "Mobile",
      icon: Smartphone,
      title: "Mobile-First Approach",
      description:
        "Optimized for mobile devices with native-like performance. Progressive Web App capabilities included.",
      features: [
        "Native mobile app performance",
        "Offline capabilities",
        "Push notifications",
        "Camera and location integration",
      ],
      imageColor: "from-blue-500 to-cyan-500",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Comprehensive insights into user behavior and system performance. Make data-driven decisions with confidence.",
      features: [
        "Real-time analytics dashboard",
        "Custom report builder",
        "Predictive analytics",
        "Export to multiple formats",
      ],
      imageColor: "from-green-500 to-emerald-500",
    },
    {
      id: "collaboration",
      label: "Collaboration",
      icon: Users,
      title: "Team Collaboration",
      description:
        "Built-in tools for seamless team collaboration. Work together in real-time from anywhere in the world.",
      features: [
        "Real-time document editing",
        "Team chat and video calls",
        "Task management and assignment",
        "Version control and history",
      ],
      imageColor: "from-orange-500 to-red-500",
    },
    {
      id: "security",
      label: "Security",
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Military-grade security measures to protect your data. Regular security audits and compliance certifications.",
      features: [
        "End-to-end encryption",
        "Two-factor authentication",
        "GDPR and CCPA compliant",
        "Regular security audits",
      ],
      imageColor: "from-indigo-500 to-blue-500",
    },
  ];

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features for Every Need
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore the comprehensive set of features designed to solve your
            business challenges.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTabData && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 p-8">
              <div>
                <div
                  className={`inline-flex p-3 rounded-xl bg-linear-to-r ${activeTabData.imageColor} mb-6`}
                >
                  <activeTabData.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {activeTabData.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {activeTabData.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {activeTabData.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600">
                  Learn More
                </button>
              </div>
              <div className="flex items-center justify-center">
                <div
                  className={`w-full h-64 rounded-xl bg-linear-to-r ${activeTabData.imageColor} flex items-center justify-center`}
                >
                  <div className="text-white text-center">
                    <activeTabData.icon className="w-16 h-16 mx-auto mb-4" />
                    <div className="text-lg font-medium">Feature Preview</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            All features available in every plan
          </p>
          <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors font-medium">
            Compare All Features
          </button>
        </div>
      </div>
    </section>
  );
}
