"use client";
import { useState } from "react";
import { Check, Users, Zap, Shield, Globe } from "lucide-react";

const TIERS_DATA = {
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

  const currentTier = TIERS_DATA[selectedTier];

  return (
    <div className="p-5 md:p-10 w-full">
      {/* Tier Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
        <div>
          <h2 className="text-3xl font-semibold">Choose Your Plan</h2>
          <p className="text-sm md:text-base text-foreground/50">
            Select the tier that fits your needs
          </p>
        </div>

        <div className="flex p-1 bg-foreground/10 rounded-lg">
          {(["starter", "growth", "scale"] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`px-4 py-2 text-sm font-semibold rounded-md ${
                selectedTier === tier ? "bg-background" : "text-foreground/50"
              }`}
            >
              {TIERS_DATA[tier].name}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Tier Display */}
      <div className="flex flex-col gap-5 py-5 mt-5 border-t border-dashed border-foreground/15 w-full">
        {/* Tier Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 w-full">
          <div>
            <div className="flex items-center gap-4 mb-1">
              <h3 className="text-3xl font-semibold">{currentTier.name}</h3>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 overflow-hidden w-full h-full">
          {currentTier.features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-1.5 bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-lg"
            >
              <div className="shrink-0 p-2 bg-blue-600 rounded-md">
                <feature.icon className="size-6 text-white" />
              </div>
              <span className="text-sm font-medium leading-4">
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="flex items-start justify-between m-auto mt-6 pt-6 border-t border-dashed border-foreground/15 w-full">
          <div className="flex items-center justify-center gap-6 text-sm text-foreground/50">
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

          <button className="py-3 px-5 bg-blue-600 text-white font-semibold rounded-lg">
            {currentTier.cta} at{" "}
            <span className="text-xl ml-1">{currentTier.price}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
