"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Shield, Globe } from "lucide-react";

export default function PricingCard6_2() {
  const [isYearly, setIsYearly] = useState(true);

  const plans = [
    {
      name: "Starter",
      monthly: "$29",
      yearly: "$290",
      period: "per year",
      description: "For individuals and small teams",
      features: [
        { text: "Up to 10 projects", icon: Zap },
        { text: "Basic analytics", icon: Check },
        { text: "Email support", icon: Check },
        { text: "5GB storage", icon: Check },
      ],
      color: "gray",
    },
    {
      name: "Professional",
      monthly: "$79",
      yearly: "$790",
      period: "per year",
      description: "For growing businesses",
      features: [
        { text: "Up to 50 projects", icon: Zap },
        { text: "Advanced analytics", icon: Check },
        { text: "Priority support", icon: Shield },
        { text: "50GB storage", icon: Check },
        { text: "API access", icon: Check },
        { text: "Custom domains", icon: Globe },
      ],
      popular: true,
      color: "blue",
    },
    {
      name: "Enterprise",
      monthly: "$199",
      yearly: "$1990",
      period: "per year",
      description: "For large organizations",
      features: [
        { text: "Unlimited projects", icon: Zap },
        { text: "Enterprise analytics", icon: Check },
        { text: "24/7 phone support", icon: Shield },
        { text: "500GB storage", icon: Check },
        { text: "Custom integrations", icon: Check },
        { text: "Dedicated manager", icon: Check },
        { text: "SSO & SAML", icon: Globe },
      ],
      color: "purple",
    },
  ];

  const savings = [
    { plan: "Starter", save: "$58" },
    { plan: "Professional", save: "$158" },
    { plan: "Enterprise", save: "$398" },
  ];

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Toggle Switch */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className="text-gray-900 dark:text-white font-medium">
            Monthly
          </span>

          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative w-14 h-7 bg-gray-300 dark:bg-gray-700 rounded-full"
          >
            <motion.div
              animate={{ x: isYearly ? 28 : 0 }}
              className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-lg"
            />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-gray-900 dark:text-white font-medium">
              Yearly
            </span>
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm rounded-full">
              Save 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden ${
                plan.popular ? "ring-2 ring-blue-500" : ""
              }`}
            >
              {plan.popular && (
                <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
                  RECOMMENDED
                </div>
              )}

              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                      {isYearly ? plan.yearly : plan.monthly}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">
                      {isYearly ? plan.period : "per month"}
                    </span>
                  </div>

                  {isYearly && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        Save {savings[index].save}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        ${parseInt(plan.monthly.replace("$", "")) * 12}
                      </span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="mb-8">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <feature.icon className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "border-2 border-gray-900 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-gray-800"
                  }`}
                >
                  Get Started
                </button>

                {/* Note */}
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                  No credit card required
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
