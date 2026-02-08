"use client";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

export default function PricingCard6_1() {
  const plans = [
    {
      name: "Basic",
      price: "$19",
      period: "per month",
      description: "Perfect for getting started",
      features: [
        "Up to 5 projects",
        "Basic analytics",
        "Email support",
        "1GB storage",
        "Community access",
      ],
      popular: false,
      color: "gray",
    },
    {
      name: "Pro",
      price: "$49",
      period: "per month",
      description: "Best for professionals",
      features: [
        "Up to 20 projects",
        "Advanced analytics",
        "Priority support",
        "10GB storage",
        "API access",
        "Custom domains",
      ],
      popular: true,
      color: "blue",
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "For large organizations",
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "24/7 phone support",
        "100GB storage",
        "Custom integrations",
        "Dedicated account manager",
        "SSO & SAML",
      ],
      popular: false,
      color: "purple",
    },
  ];

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className={`bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden ${
              plan.popular ? "ring-2 ring-blue-500" : ""
            }`}
          >
            {plan.popular && (
              <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
                <div className="flex items-center justify-center gap-2">
                  <Star className="w-4 h-4" />
                  MOST POPULAR
                </div>
              </div>
            )}

            <div className="p-6 md:p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2">
                    {plan.period}
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "border-2 border-gray-900 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-gray-800"
                }`}
              >
                Get Started
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
