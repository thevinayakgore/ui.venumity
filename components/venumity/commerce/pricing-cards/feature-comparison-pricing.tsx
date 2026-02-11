"use client";
import { Check, X, Star } from "lucide-react";

export default function PricingCard6_3() {
  const plans = [
    {
      name: "Basic",
      price: "$0",
      period: "Forever free",
      buttonText: "Get Started",
      features: [
        { name: "Up to 5 projects", included: true },
        { name: "Basic templates", included: true },
        { name: "Community support", included: true },
        { name: "1GB storage", included: true },
        { name: "Custom domains", included: false },
        { name: "Advanced analytics", included: false },
        { name: "API access", included: false },
        { name: "Priority support", included: false },
      ],
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      buttonText: "Try Pro Free",
      popular: true,
      features: [
        { name: "Up to 50 projects", included: true },
        { name: "Premium templates", included: true },
        { name: "Email support", included: true },
        { name: "50GB storage", included: true },
        { name: "Custom domains", included: true },
        { name: "Advanced analytics", included: true },
        { name: "API access", included: false },
        { name: "Priority support", included: false },
      ],
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      buttonText: "Contact Sales",
      features: [
        { name: "Unlimited projects", included: true },
        { name: "All templates", included: true },
        { name: "24/7 phone support", included: true },
        { name: "500GB storage", included: true },
        { name: "Custom domains", included: true },
        { name: "Advanced analytics", included: true },
        { name: "API access", included: true },
        { name: "Priority support", included: true },
      ],
    },
  ];

  const features = [
    "Projects",
    "Templates",
    "Support",
    "Storage",
    "Custom Domains",
    "Analytics",
    "API Access",
    "Priority Support",
  ];

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Choose the right plan
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Compare features and pick the perfect plan for your needs
            </p>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Plans Header */}
              <div className="grid grid-cols-4">
                <div className="p-6 border-r border-gray-200 dark:border-gray-800">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Features
                  </h3>
                </div>

                {plans.map((plan, index) => (
                  <div
                    key={plan.name}
                    className={`p-6 text-center border-r border-gray-200 dark:border-gray-800 ${
                      plan.popular ? "bg-blue-50 dark:bg-blue-900/20" : ""
                    } ${index === plans.length - 1 ? "border-r-0" : ""}`}
                  >
                    {plan.popular && (
                      <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm mb-4">
                        <Star className="w-3 h-3" />
                        POPULAR
                      </div>
                    )}

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>

                    <div className="mb-4">
                      <div className="text-4xl font-bold text-gray-900 dark:text-white">
                        {plan.price}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {plan.period}
                      </div>
                    </div>

                    <button
                      className={`w-full py-3 rounded-lg font-semibold transition ${
                        plan.popular
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "border-2 border-gray-900 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-gray-800"
                      }`}
                    >
                      {plan.buttonText}
                    </button>
                  </div>
                ))}
              </div>

              {/* Features Comparison */}
              {features.map((feature, featureIndex) => (
                <div
                  key={feature}
                  className={`grid grid-cols-4 ${
                    featureIndex % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-800/50"
                      : ""
                  }`}
                >
                  <div className="p-4 border-r border-gray-200 dark:border-gray-800 flex items-center">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {feature}
                    </span>
                  </div>

                  {plans.map((plan, planIndex) => (
                    <div
                      key={`${plan.name}-${feature}`}
                      className={`p-4 border-r border-gray-200 dark:border-gray-800 text-center flex items-center justify-center ${
                        plan.popular ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
                      } ${planIndex === plans.length - 1 ? "border-r-0" : ""}`}
                    >
                      {plan.features[featureIndex].included ? (
                        <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <X className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 md:p-8 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <div className="text-center text-gray-600 dark:text-gray-400">
              All plans include a 14-day free trial. No credit card required.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
