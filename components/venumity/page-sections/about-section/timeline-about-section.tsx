"use client";
import {Rocket, TrendingUp, Star, Globe, Award } from "lucide-react";

export default function AboutTimelineSection() {
  const milestones = [
    {
      year: "2015",
      title: "Company Founded",
      description: "Started with 5 team members in a small office",
      icon: Rocket,
    },
    {
      year: "2017",
      title: "First Major Client",
      description: "Secured partnership with Fortune 500 company",
      icon: Star,
    },
    {
      year: "2019",
      title: "International Expansion",
      description: "Opened offices in 3 new countries",
      icon: Globe,
    },
    {
      year: "2022",
      title: "Product Launch",
      description: "Launched our flagship SaaS product",
      icon: TrendingUp,
    },
    {
      year: "2024",
      title: "Industry Recognition",
      description: "Named one of the fastest growing companies",
      icon: Award,
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
            Our Journey
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Milestones & Achievements
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A timeline of our growth and accomplishments over the years
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200 dark:bg-blue-700"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "pr-12 text-right" : "pl-12"
                  }`}
                >
                  <div
                    className={`p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg ${
                      index % 2 === 0 ? "ml-auto" : "mr-auto"
                    } max-w-md`}
                  >
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                        <milestone.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          {milestone.year}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {milestone.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {milestone.description}
                    </p>
                  </div>
                </div>
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 dark:bg-blue-500 rounded-full border-4 border-white dark:border-gray-800"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
