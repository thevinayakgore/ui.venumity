"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Users, Zap, Shield, Globe } from "lucide-react";

export default function PricingCard6_5() {
  const [selectedTier, setSelectedTier] = useState<"starter" | "growth" | "scale">("growth");

  const tiers = {
    starter: {
      name: "Starter",
      price: "$99",
      period: "per month",
      description: "Perfect for small teams getting started",
      features: [
        { icon: Users, text: "Up to 10 users" },
        { icon: Zap, text: "Basic automation" },
        { icon: Check, text: "Email support" },
        { icon: Check, text: "5GB storage" }
      ],
      popular: false,
      cta: "Start Free Trial"
    },
    growth: {
      name: "Growth",
      price: "$299",
      period: "per month",
      description: "For growing businesses scaling fast",
      features: [
        { icon: Users, text: "Up to 50 users" },
        { icon: Zap, text: "Advanced automation" },
        { icon: Shield, text: "Priority support" },
        { icon: Globe, text: "Custom integrations" },
        { icon: Check, text: "100GB storage" },
        { icon: Check, text: "Analytics dashboard" }
      ],
      popular: true,
      cta: "Get Started"
    },
    scale: {
      name: "Scale",
      price: "$899",
      period: "per month",
      description: "Enterprise-grade for large organizations",
      features: [
        { icon: Users, text: "Unlimited users" },
        { icon: Zap, text: "Full automation suite" },
        { icon: Shield, text: "24/7 dedicated support" },
        { icon: Globe, text: "Custom development" },
        { icon: Check, text: "1TB storage" },
        { icon: Check, text: "Advanced analytics" },
        { icon: Check, text: "SLA guarantee" },
        { icon: Check, text: "Training & onboarding" }
      ],
      popular: false,
      cta: "Contact Sales"
    }
  };

  const currentTier = tiers[selectedTier];

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
          {/* Tier Selector */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Choose Your Plan
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Select the tier that fits your needs
                </p>
              </div>
              
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                {(["starter", "growth", "scale"] as const).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(tier)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                      selectedTier === tier
                        ? "bg-white dark:bg-gray-900 shadow text-gray-900 dark:text-white"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {tiers[tier].name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Tier Display */}
          <div className="p-6 md:p-8">
            <motion.div
              key={selectedTier}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Tier Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {currentTier.name}
                    </h3>
                    {currentTier.popular && (
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium rounded-full">
                        POPULAR
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {currentTier.description}
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="text-5xl font-bold text-gray-900 dark:text-white">
                    {currentTier.price}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {currentTier.period}
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentTier.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <feature.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {feature.text}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Section */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
                  {currentTier.cta} - {currentTier.price}
                </button>
                
                <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>14-day free trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}