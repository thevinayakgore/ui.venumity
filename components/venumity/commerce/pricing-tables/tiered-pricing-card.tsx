"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Users, Zap, Shield, Globe } from "lucide-react";

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
      { icon: Check, text: "5GB storage" },
    ],
    popular: false,
    cta: "Start Free Trial",
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
      { icon: Check, text: "Analytics dashboard" },
    ],
    popular: true,
    cta: "Get Started",
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
      { icon: Check, text: "Training & onboarding" },
    ],
    popular: false,
    cta: "Contact Sales",
  },
};

export default function TieredPricingCard() {
  const [selectedTier, setSelectedTier] = useState<
    "starter" | "growth" | "scale"
  >("growth");

  const currentTier = tiers[selectedTier];

  return (
    <main className="flex items-center justify-center m-auto w-full h-screen">
      <div className="bg-card border-2 rounded-2xl shadow-xl/10 overflow-hidden max-w-3xl m-auto w-full">
        {/* Tier Selector */}
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Choose Your Plan</h2>
              <p className="text-foreground/50">
                Select the tier that fits your needs
              </p>
            </div>

            <div className="flex bg-accent rounded-lg p-1">
              {(["starter", "growth", "scale"] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`px-4 py-2 cursor-pointer rounded-md text-sm font-medium transition ${
                    selectedTier === tier
                      ? "bg-card shadow"
                      : "text-foreground/50 hover:text-foreground"
                  }`}
                >
                  {tiers[tier].name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Tier Display */}
        <div className="w-full">
          <motion.div
            key={selectedTier}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Tier Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 pb-0">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-3xl font-bold">{currentTier.name}</h3>
                  {currentTier.popular && (
                    <span className="px-2 py-0.5 bg-blue-500 text-white text-[0.65rem] font-medium rounded-full">
                      POPULAR
                    </span>
                  )}
                </div>
                <p className="text-foreground/50">{currentTier.description}</p>
              </div>

              <div className="text-right">
                <div className="text-5xl font-bold">{currentTier.price}</div>
                <div className="text-foreground/50">{currentTier.period}</div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 overflow-hidden w-full h-full">
              {currentTier.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="p-2 bg-accent border hover:scale-105 hover:shadow-lg/10 rounded-md transition-all duration-500"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-500 rounded-sm">
                      <feature.icon className="size-4 text-white" />
                    </div>
                    <span className="text-sm font-medium leading-4">
                      {feature.text}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="p-6 border-t flex flex-col items-center justify-center m-auto w-full">
              <button className="w-fit cursor-pointer py-4 px-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
                {currentTier.cta} at {currentTier.price}
              </button>

              <div className="flex items-center justify-center gap-6 mt-6 text-sm text-foreground/50">
                <div className="flex items-center gap-2">
                  <Check className="size-5 text-green-500" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-5 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-5 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
