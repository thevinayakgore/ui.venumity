"use client";
import { Check, X } from "lucide-react";

export default function CTAWithComparisonSection() {
  const comparisonData = [
    {
      feature: "Unlimited Projects",
      withUs: true,
      others: "Limited",
    },
    {
      feature: "24/7 Support",
      withUs: true,
      others: false,
    },
    {
      feature: "Advanced Analytics",
      withUs: true,
      others: "Basic",
    },
    {
      feature: "Custom Integrations",
      withUs: true,
      others: false,
    },
    {
      feature: "Team Collaboration",
      withUs: true,
      others: "Limited",
    },
    {
      feature: "Security & Compliance",
      withUs: "Enterprise",
      others: "Standard",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Us Over Others?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how we compare to traditional solutions
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Feature Comparison
                    </h3>
                  </th>
                  <th className="text-center p-6">
                    <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg p-4">
                      <div className="text-xl font-bold">With Us</div>
                      <div className="text-sm opacity-90">Premium Solution</div>
                    </div>
                  </th>
                  <th className="text-center p-6">
                    <div className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg p-4">
                      <div className="text-xl font-bold">Others</div>
                      <div className="text-sm">Standard Solutions</div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="p-6">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {item.feature}
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      {item.withUs === true ? (
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full">
                          <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                      ) : item.withUs === false ? (
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full">
                          <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                        </div>
                      ) : (
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                          {item.withUs}
                        </span>
                      )}
                    </td>
                    <td className="p-6 text-center">
                      {item.others === true ? (
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full">
                          <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                      ) : item.others === false ? (
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full">
                          <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                        </div>
                      ) : (
                        <span className="text-gray-600 dark:text-gray-400">
                          {item.others}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-800 rounded-2xl p-8 inline-block">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-blue-100 mb-6 max-w-xl">
              Join the thousands who have already switched to our superior
              solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors">
                Start Free Trial
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                Compare All Features
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
