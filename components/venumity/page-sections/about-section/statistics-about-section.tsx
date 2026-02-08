"use client";
import { useEffect, useState } from "react";
import { Users, Briefcase, Globe, Trophy, Heart } from "lucide-react";

export default function AboutStatisticsSection() {
  const [counts, setCounts] = useState({
    clients: 0,
    projects: 0,
    countries: 0,
    awards: 0,
    satisfaction: 0,
  });

  const stats = [
    {
      icon: Users,
      value: counts.clients,
      suffix: "+",
      label: "Happy Clients",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      target: 500,
    },
    {
      icon: Briefcase,
      value: counts.projects,
      suffix: "+",
      label: "Projects Delivered",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      target: 1200,
    },
    {
      icon: Globe,
      value: counts.countries,
      suffix: "+",
      label: "Countries Served",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      target: 40,
    },
    {
      icon: Trophy,
      value: counts.awards,
      suffix: "",
      label: "Industry Awards",
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
      target: 25,
    },
    {
      icon: Heart,
      value: counts.satisfaction,
      suffix: "%",
      label: "Client Satisfaction",
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-900/20",
      target: 98,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) => ({
        clients: prev.clients < 500 ? prev.clients + 10 : 500,
        projects: prev.projects < 1200 ? prev.projects + 20 : 1200,
        countries: prev.countries < 40 ? prev.countries + 1 : 40,
        awards: prev.awards < 25 ? prev.awards + 1 : 25,
        satisfaction: prev.satisfaction < 98 ? prev.satisfaction + 2 : 98,
      }));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 bg-linear-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            By The Numbers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our impact and achievements in measurable terms
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div
                className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
                {stat.suffix}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Making a Real Impact
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              These numbers represent real businesses transformed, real problems
              solved, and real value created for our clients around the world.
            </p>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Project Success Rate
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    95%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-[95%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Client Retention
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    88%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-[88%]"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-linear-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-2xl p-8 text-white">
            <h4 className="text-xl font-bold mb-4">
              Want to add to our success story?
            </h4>
            <p className="mb-6 opacity-90">
              Partner with us and become part of our growing list of success
              stories.
            </p>
            <button className="px-6 py-3 bg-white text-blue-600 dark:text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition-colors">
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
