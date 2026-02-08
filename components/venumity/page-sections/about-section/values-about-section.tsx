"use client";
import { Heart, Shield, Users, Zap, Target } from "lucide-react";

export default function AboutValuesSection() {
  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description: "We put our customers at the center of everything we do",
      color: "red",
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "Honest and transparent in all our dealings",
      color: "blue",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Teamwork makes the dream work",
      color: "green",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Constantly pushing boundaries and exploring new ideas",
      color: "yellow",
    },
    {
      icon: Target,
      title: "Excellence",
      description: "Striving for the highest quality in everything",
      color: "purple",
    },
  ];

  const colorClasses = {
    red: "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400",
    blue: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    green:
      "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    yellow:
      "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
    purple:
      "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
  };

  return (
    <section className="py-20 px-4 bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            The principles that guide our decisions and actions every day
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`p-3 rounded-lg ${
                    colorClasses[value.color as keyof typeof colorClasses]
                  }`}
                >
                  <value.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-linear-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Living Our Values Every Day
          </h3>
          <p className="text-blue-100 max-w-2xl mx-auto mb-6">
            These are not just words on a wall. They are the foundation of our
            company culture and the standard by which we measure our success.
          </p>
          <button className="px-6 py-3 bg-white text-blue-600 dark:text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition-colors">
            Join Our Team
          </button>
        </div>
      </div>
    </section>
  );
}
