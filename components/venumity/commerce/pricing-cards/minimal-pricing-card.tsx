"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function PricingCard6_4() {
  const plans = [
    {
      name: "Personal",
      price: "$9",
      period: "/month",
      description: "Perfect for individual creators",
      features: ["1 Website", "5GB Storage", "Basic Support", "Free SSL"],
      color: "gray",
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "For growing businesses",
      features: [
        "5 Websites",
        "50GB Storage",
        "Priority Support",
        "Free Domain",
        "Advanced Analytics",
      ],
      popular: true,
      color: "blue",
    },
    {
      name: "Business",
      price: "$99",
      period: "/month",
      description: "For large organizations",
      features: [
        "Unlimited Websites",
        "500GB Storage",
        "24/7 Support",
        "Free Domain",
        "Advanced Analytics",
        "Custom Solutions",
      ],
      color: "purple",
    },
  ];

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white dark:bg-gray-900 rounded-xl border ${
                plan.popular
                  ? "border-blue-500 shadow-xl"
                  : "border-gray-200 dark:border-gray-800"
              }`}
            >
              <div className="p-6">
                {/* Plan Name */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 ml-1">
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 rounded-lg text-sm font-medium transition ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-gray-600 dark:text-gray-400 text-sm">
          All plans include a 30-day money-back guarantee. No hidden fees.
        </div>
      </div>
    </main>
  );
}
