"use client";
import { motion } from "framer-motion";
import { Check, X, AlertCircle } from "lucide-react";

export default function CustomTable1_4() {
  const features = [
    { name: "Storage", basic: "10 GB", pro: "100 GB", enterprise: "1 TB" },
    { name: "Users", basic: "1", pro: "10", enterprise: "Unlimited" },
    { name: "Bandwidth", basic: "100 GB", pro: "1 TB", enterprise: "10 TB" },
    {
      name: "Support",
      basic: "Email",
      pro: "Priority Email",
      enterprise: "24/7 Phone",
    },
    { name: "API Access", basic: false, pro: true, enterprise: true },
    { name: "Custom Domain", basic: false, pro: true, enterprise: true },
    { name: "SSL Certificate", basic: true, pro: true, enterprise: true },
    { name: "Backups", basic: "Weekly", pro: "Daily", enterprise: "Real-time" },
  ];

  const plans = [
    {
      name: "Basic",
      price: "$9",
      period: "/month",
      description: "For personal projects",
      color: "from-gray-400 to-gray-600",
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "For growing businesses",
      color: "from-blue-500 to-cyan-400",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For large organizations",
      color: "from-purple-500 to-pink-400",
    },
  ];

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Compare features and select the perfect plan for your needs
          </p>
        </div>

        {/* Plans Header */}
        <div className="grid grid-cols-4 border-t border-gray-200 dark:border-gray-800">
          <div className="p-6 border-r border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Features
            </h3>
          </div>
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`p-6 text-center relative ${
                index < plans.length - 1
                  ? "border-r border-gray-200 dark:border-gray-800"
                  : ""
              } ${
                plan.popular
                  ? "bg-linear-to-b from-blue-50 to-white dark:from-blue-900/10 dark:to-gray-900"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1 bg-linear-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold rounded-full">
                    MOST POPULAR
                  </div>
                </div>
              )}

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {plan.name}
              </h3>
              <div className="flex items-baseline justify-center mb-2">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  {plan.price}
                </span>
                <span className="text-gray-600 dark:text-gray-400 ml-1">
                  {plan.period}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {plan.description}
              </p>

              <button
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  plan.popular
                    ? "bg-linear-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700"
                    : "border-2 border-gray-900 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-gray-800"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {features.map((feature, featureIndex) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: featureIndex * 0.05 }}
              className="grid grid-cols-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
            >
              <div className="p-4 border-r border-gray-200 dark:border-gray-800 flex items-center">
                <span className="font-medium text-gray-900 dark:text-white">
                  {feature.name}
                </span>
              </div>

              <div className="p-4 border-r border-gray-200 dark:border-gray-800 flex items-center justify-center">
                {typeof feature.basic === "boolean" ? (
                  feature.basic ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-gray-400" />
                  )
                ) : (
                  <span className="text-gray-900 dark:text-white">
                    {feature.basic}
                  </span>
                )}
              </div>

              <div className="p-4 border-r border-gray-200 dark:border-gray-800 flex items-center justify-center">
                {typeof feature.pro === "boolean" ? (
                  feature.pro ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-gray-400" />
                  )
                ) : (
                  <span className="text-gray-900 dark:text-white font-medium">
                    {feature.pro}
                  </span>
                )}
              </div>

              <div className="p-4 flex items-center justify-center">
                {typeof feature.enterprise === "boolean" ? (
                  feature.enterprise ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-gray-400" />
                  )
                ) : (
                  <span className="text-gray-900 dark:text-white font-bold">
                    {feature.enterprise}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">
              All plans include a 14-day free trial
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
