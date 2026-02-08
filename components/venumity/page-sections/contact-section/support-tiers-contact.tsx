"use client";
import { useState } from "react";
import { Check, Star, Clock, Shield, Zap, Headphones } from "lucide-react";

export default function ContactSupportTiersSection() {
  const [selectedTier, setSelectedTier] = useState("basic");

  const supportTiers = [
    {
      id: "basic",
      name: "Basic Support",
      description: "For small projects and startups",
      price: "Free",
      features: [
        "Email support (48hr response)",
        "Access to knowledge base",
        "Community forum access",
        "Basic documentation",
      ],
      icon: Headphones,
      color: "border-blue-200 dark:border-blue-800",
    },
    {
      id: "pro",
      name: "Professional Support",
      description: "For growing businesses",
      price: "$99/month",
      popular: true,
      features: [
        "Priority email support (24hr response)",
        "Phone support",
        "Live chat during business hours",
        "Dedicated account manager",
        "Monthly check-ins",
      ],
      icon: Shield,
      color: "border-purple-200 dark:border-purple-800",
    },
    {
      id: "enterprise",
      name: "Enterprise Support",
      description: "For large organizations",
      price: "Custom",
      features: [
        "24/7 phone and chat support",
        "Dedicated technical account manager",
        "Same-day emergency response",
        "Custom SLAs",
        "On-site support available",
        "Quarterly business reviews",
      ],
      icon: Zap,
      color: "border-orange-200 dark:border-orange-800",
    },
  ];

  const responseTimes = [
    {
      tier: "Basic",
      time: "48 hours",
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
    },
    {
      tier: "Professional",
      time: "24 hours",
      color:
        "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
    },
    {
      tier: "Enterprise",
      time: "4 hours",
      color:
        "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
    },
  ];

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Support Plans
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the support level that matches your needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {supportTiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative border-2 rounded-2xl p-8 ${tier.color} ${
                selectedTier === tier.id
                  ? "ring-2 ring-blue-500 dark:ring-blue-400"
                  : ""
              } ${tier.popular ? "shadow-xl dark:shadow-gray-900/50" : ""}`}
              onClick={() => setSelectedTier(tier.id)}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="px-4 py-1 bg-linear-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded-full flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                  <tier.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {tier.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {tier.description}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {tier.price}
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  {tier.price === "Custom"
                    ? "Contact for pricing"
                    : "per month"}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  selectedTier === tier.id
                    ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    : "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/20"
                }`}
              >
                {tier.id === "enterprise" ? "Contact Sales" : "Get Started"}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Response Time Comparison
              </h3>
              <div className="space-y-4">
                {responseTimes.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-lg"
                  >
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {item.tier} Support
                      </span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${item.color}`}
                    >
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-linear-to-r from-blue-500 to-purple-600 rounded-full mb-6">
                <Shield className="w-16 h-16 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                99.9% Uptime SLA
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Guaranteed reliability across all support tiers
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
