"use client";
import { motion } from "framer-motion";
import { Check, X, Minus, Star, TrendingUp, Award } from "lucide-react";

const planData = [
  {
    id: 1,
    name: "Basic",
    price: "$19",
    period: "per month",
    features: {
      users: "Up to 5 users",
      storage: "10GB storage",
      support: "Email support",
      api: "Basic API access",
      analytics: "Basic analytics",
      ssl: "SSL certificate",
      backups: "Weekly backups",
      customDomain: false,
      prioritySupport: false,
      whiteLabel: false,
    },
    popular: false,
    recommended: false,
  },
  {
    id: 2,
    name: "Professional",
    price: "$49",
    period: "per month",
    features: {
      users: "Up to 20 users",
      storage: "50GB storage",
      support: "Priority email & chat",
      api: "Full API access",
      analytics: "Advanced analytics",
      ssl: "SSL certificate",
      backups: "Daily backups",
      customDomain: true,
      prioritySupport: false,
      whiteLabel: false,
    },
    popular: true,
    recommended: true,
  },
  {
    id: 3,
    name: "Enterprise",
    price: "$99",
    period: "per month",
    features: {
      users: "Unlimited users",
      storage: "200GB storage",
      support: "24/7 phone support",
      api: "Full API + Webhooks",
      analytics: "Advanced + Custom",
      ssl: "Extended SSL",
      backups: "Real-time backups",
      customDomain: true,
      prioritySupport: true,
      whiteLabel: true,
    },
    popular: false,
    recommended: false,
  },
];

const featureList = [
  { key: "users", label: "Number of users" },
  { key: "storage", label: "Storage space" },
  { key: "support", label: "Customer support" },
  { key: "api", label: "API access" },
  { key: "analytics", label: "Analytics dashboard" },
  { key: "ssl", label: "SSL certificate" },
  { key: "backups", label: "Backup frequency" },
  { key: "customDomain", label: "Custom domain" },
  { key: "prioritySupport", label: "Priority support" },
  { key: "whiteLabel", label: "White-label solution" },
];

export default function ComparisonTable() {
  const getFeatureIcon = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-green-500" />
      ) : (
        <X className="w-5 h-5 text-gray-300 dark:text-gray-700" />
      );
    }

    if (value === "Basic API access")
      return <Minus className="w-5 h-5 text-blue-500" />;
    if (value === "Full API access")
      return <Check className="w-5 h-5 text-green-500" />;
    if (value === "Full API + Webhooks")
      return <Star className="w-5 h-5 text-purple-500" />;

    return (
      <span className="text-sm text-gray-700 dark:text-gray-300">{value}</span>
    );
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Compare features and find the plan that is right for your business
            needs
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800">
          {/* Plan Headers */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200 dark:border-gray-800">
            {planData.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: plan.id * 0.1 }}
                className={`p-6 sm:p-8 text-center ${
                  plan.popular
                    ? "bg-linear-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900 border-x border-gray-200 dark:border-gray-800 relative"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold bg-linear-to-r from-blue-600 to-purple-600 text-white">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {plan.recommended && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold bg-linear-to-r from-green-600 to-emerald-600 text-white">
                      <Award className="w-3 h-3 mr-1" />
                      RECOMMENDED
                    </span>
                  </div>
                )}

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>

                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">
                    {plan.period}
                  </span>
                </div>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-linear-to-r from-blue-600 to-purple-600 text-white hover:opacity-90"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>

          {/* Features Comparison */}
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {featureList.map((feature, idx) => (
              <motion.div
                key={feature.key}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="grid grid-cols-1 md:grid-cols-3 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
              >
                <div className="p-4 md:p-6 border-r border-gray-200 dark:border-gray-800">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {feature.label}
                  </div>
                </div>

                {planData.map((plan) => (
                  <div
                    key={`${plan.id}-${feature.key}`}
                    className={`p-4 md:p-6 text-center ${
                      plan.popular
                        ? "border-x border-gray-200 dark:border-gray-800 bg-blue-50/50 dark:bg-blue-900/10"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      {getFeatureIcon(
                        plan.features[feature.key as keyof typeof plan.features]
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Plan Footers */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-200 dark:border-gray-800">
            {planData.map((plan) => (
              <div
                key={plan.id}
                className={`p-6 sm:p-8 text-center ${
                  plan.popular
                    ? "bg-linear-to-t from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900 border-x border-gray-200 dark:border-gray-800"
                    : ""
                }`}
              >
                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-linear-to-r from-blue-600 to-purple-600 text-white hover:opacity-90"
                      : "border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  Select Plan
                </button>

                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  {plan.id === 1 && "14-day money back guarantee"}
                  {plan.id === 2 && "30-day free trial • Cancel anytime"}
                  {plan.id === 3 &&
                    "Custom solutions available • Contact sales"}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              <span>Included</span>
            </div>
            <div className="flex items-center">
              <X className="w-4 h-4 text-gray-400 mr-2" />
              <span>Not included</span>
            </div>
          </div>
          <div className="mt-4 sm:mt-0">
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
              Need a custom plan? Contact us →
            </button>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
