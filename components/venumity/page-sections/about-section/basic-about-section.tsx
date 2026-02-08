"use client";
import { Users, Target, Award, Globe } from "lucide-react";

export default function BasicAboutSection() {
  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Our Company
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We are a team of passionate individuals dedicated to creating
            amazing digital experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Our Story
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Founded in 2015, we started as a small team with big dreams.
              Today, we have grown into a leading digital agency serving clients
              worldwide.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our mission is to deliver exceptional digital solutions that drive
              business growth and create meaningful connections with customers.
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600">
              Learn More
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                50+ Employees
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Talented professionals
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
              <Target className="w-8 h-8 text-green-600 dark:text-green-400 mb-4" />
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                200+ Projects
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Successfully delivered
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
              <Award className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-4" />
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                15 Awards
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Industry recognition
              </p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl">
              <Globe className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-4" />
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                Global Reach
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                20+ countries served
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
