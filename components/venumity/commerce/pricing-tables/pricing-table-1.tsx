"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Check, Sparkles, Star, Zap, ChevronRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PricingPlan {
  id: string;
  name: string;
  price: {
    monthly: number;
    annually: number;
  };
  description: string;
  features: string[];
  extraFeatures: string[];
  isPopular?: boolean;
  cta: string;
  icon?: React.ReactNode;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Starter",
    price: {
      monthly: 9,
      annually: 90,
    },
    description: "Perfect for individuals getting started",
    features: [
      "1 Project",
      "5GB Storage",
      "Basic Analytics",
      "Email Support",
      "Up to 1,000 visitors/month",
      "Basic Templates",
    ],
    extraFeatures: [
      "Community Forum Access",
      "Weekly Webinars",
      "Basic Documentation",
    ],
    cta: "Get Started",
    icon: <Star className="w-full h-full" />,
  },
  {
    id: "pro",
    name: "Professional",
    price: {
      monthly: 29,
      annually: 290,
    },
    description: "For growing teams and businesses",
    features: [
      "10 Projects",
      "50GB Storage",
      "Advanced Analytics",
      "Priority Support",
      "API Access",
      "Up to 10,000 visitors/month",
      "Premium Templates",
      "Custom Domains",
    ],
    extraFeatures: [
      "Priority Feature Requests",
      "Monthly Strategy Sessions",
      "Advanced Documentation",
      "White-labeling Options",
    ],
    isPopular: true,
    cta: "Go Professional",
    icon: <Zap className="w-full h-full" />,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: {
      monthly: 99,
      annually: 990,
    },
    description: "For large scale applications",
    features: [
      "Unlimited Projects",
      "1TB Storage",
      "Advanced Analytics",
      "24/7 Support",
      "API Access",
      "Unlimited Visitors",
      "All Templates",
      "Custom Domains",
      "Dedicated Infrastructure",
    ],
    extraFeatures: [
      "Dedicated Account Manager",
      "Quarterly Business Reviews",
      "Custom Integrations",
      "Training Sessions",
      "SLA Guarantees",
      "Onboarding Assistance",
    ],
    cta: "Contact Sales",
    icon: <Sparkles className="w-full h-full" />,
  },
];

export default function PricingTable1() {
  const [isAnnual, setIsAnnual] = useState(true);
  const onToggle = () => setIsAnnual((prev) => !prev);

  const PricingFeature = ({ feature }: { feature: string }) => {
    return (
      <li className="flex items-start gap-3 py-2 text-base hover:text-foreground transition-colors">
        <div className="shrink-0 size-5 rounded-full bg-green-500 text-white flex items-center justify-center">
          <Check className="size-3" />
        </div>
        <span className="leading-relaxed">{feature}</span>
      </li>
    );
  };

  const PricingCard = ({
    plan,
    isAnnual: isAnnualValue,
    highlighted = false,
  }: {
    plan: PricingPlan;
    isAnnual: boolean;
    highlighted?: boolean;
  }) => {
    const price = isAnnualValue ? plan.price.annually : plan.price.monthly;
    const period = isAnnualValue ? "year" : "month";

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        {plan.isPopular && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
          >
            <Badge className="bg-background text-primary border-2 border-primary text-base font-semibold px-6 py-2 rounded-full shadow-lg">
              Most Popular
            </Badge>
          </motion.div>
        )}

        <Card
          className={cn(
            "group relative overflow-hidden border-6 transition-all duration-300 hover:shadow-xl rounded-3xl!",
            highlighted
              ? "border-primary/80 bg-linear-to-t from-primary/40 via-primary/10 to-background"
              : "border-border hover:border-primary/80",
          )}
        >
          <CardHeader className="text-center mt-6">
            <CardTitle className="text-xl sm:text-4xl font-medium">
              {plan.name}
            </CardTitle>
            <CardDescription className="text-sm">
              {plan.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="px-4 sm:px-6">
            <div className="text-center mb-6 p-10 rounded-xl bg-primary/5 border-2 border-primary">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl font-semibold">$</span>
                <span className="text-4xl sm:text-7xl font-bold">{price}</span>
                <span className="text-sm font-medium ml-1">/{period}</span>
              </div>
              {isAnnualValue && (
                <p className="text-xs mt-2">
                  <span className="line-through">${plan.price.monthly}/mo</span>
                  <span className="text-primary font-semibold ml-2">
                    ${Math.round(plan.price.annually / 12)}/mo
                  </span>
                </p>
              )}
            </div>

            <div className="space-y-6">
              <ul className="space-y-1">
                {plan.features.map((feature) => (
                  <PricingFeature key={feature} feature={feature} />
                ))}
              </ul>

              {plan.extraFeatures.length > 0 && (
                <div className="pt-6 border-t border-dashed border-primary/70">
                  <ul className="space-y-1">
                    {plan.extraFeatures.map((feature) => (
                      <PricingFeature key={feature} feature={feature} />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <Button
              size="lg"
              className={cn(
                "w-full p-8 cursor-pointer text-base font-semibold transition-all duration-500 rounded-xl",
                highlighted
                  ? "bg-green-500! text-white! shadow-lg hover:shadow-xl"
                  : "bg-foreground text-secondary hover:bg-primary hover:text-white",
              )}
            >
              <span className="flex items-center justify-center gap-2">
                {plan.cta}
                <ChevronRight className="size-5" />
              </span>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  };

  return (
    <main className="flex flex-col text-center p-6 md:p-10 overflow-auto w-full h-full">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
        <span className="bg-linear-to-br from-yellow-400 to-primary bg-clip-text text-transparent">
          Simple Pricing
        </span>
        <br />
        <span className="text-foreground">For Every Business</span>
      </h1>

      <div className="relative inline-flex items-center justify-center m-auto bg-muted/50 mt-5 mb-10 rounded-full w-fit">
        <button
          onClick={() => onToggle()}
          className={cn(
            "relative z-10 cursor-pointer px-6 py-4 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap",
            !isAnnual
              ? "text-primary"
              : "text-muted-foreground hover:text-primary",
          )}
        >
          Monthly
        </button>
        <button
          onClick={() => onToggle()}
          className={cn(
            "relative z-10 cursor-pointer sm:px-8 py-4 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap",
            isAnnual
              ? "text-primary"
              : "text-muted-foreground hover:text-primary",
          )}
        >
          Annually
        </button>

        <motion.div
          layoutId="toggle-bg"
          className={cn(
            "absolute inset-y-1 rounded-full bg-background shadow-lg shadow-primary/40 border-2 border-primary",
            isAnnual ? "left-1/2 right-1" : "left-1 right-1/2",
          )}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </div>

      <div
        key={isAnnual ? "annual" : "monthly"}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 w-full"
      >
        {pricingPlans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            isAnnual={isAnnual}
            highlighted={plan.isPopular}
          />
        ))}
      </div>
    </main>
  );
}
