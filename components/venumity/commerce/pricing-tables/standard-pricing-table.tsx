"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
}

const PLANS_DATA: PricingPlan[] = [
  {
    id: "basic",
    name: "Starter",
    price: {
      monthly: 9,
      annually: 90,
    },
    description: "Everything you need to start building.",
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
  },
  {
    id: "pro",
    name: "Professional",
    price: {
      monthly: 29,
      annually: 290,
    },
    description: "Powerful tools for growing teams.",
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
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: {
      monthly: 99,
      annually: 990,
    },
    description: "Flexible infrastructure for scale.",
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
  },
];

function AnimatedPrice({
  value,
  period,
  isAnnual,
}: {
  value: number;
  period: string;
  isAnnual: boolean;
}) {
  return (
    <div className="flex items-end gap-1 overflow-hidden">
      <span className="mb-1 text-3xl font-bold text-current/50">$</span>

      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={`${value}-${isAnnual}`}
          initial={{ opacity: 0, y: 22, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -22, filter: "blur(5px)" }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-6xl font-bold tracking-tighter"
        >
          {value}
        </motion.span>
      </AnimatePresence>

      <span className="mb-1 text-sm md:text-base lg:text-lg text-current/50">
        /{period}
      </span>
    </div>
  );
}

function PricingFeature({
  feature,
  highlighted,
}: {
  feature: string;
  highlighted?: boolean;
}) {
  return (
    <li className="flex items-start gap-3 py-2 text-sm">
      <span
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
          highlighted
            ? "bg-foreground text-secondary"
            : "bg-secondary text-secondary-foreground",
        )}
      >
        <Check className="size-3.5" />
      </span>

      <span className="leading-relaxed text-foreground/75">{feature}</span>
    </li>
  );
}

function PricingCard({
  plan,
  isAnnual,
}: {
  plan: PricingPlan;
  isAnnual: boolean;
}) {
  const price = isAnnual ? plan.price.annually : plan.price.monthly;
  const period = isAnnual ? "year" : "month";
  const monthlyEquivalent = Math.round(plan.price.annually / 12);

  return (
    <Card
      className={cn(
        "flex flex-col p-0! gap-0! ring-foreground/15! backdrop-blur-sm transition-all duration-500 rounded-[2rem] overflow-hidden w-full h-fit",
        plan.isPopular
          ? "bg-foreground/10 shadow-xl"
          : "bg-foreground/5 shadow-none hover:shadow-xl",
      )}
    >
      <CardHeader className="p-6!">
        <div className="flex items-center justify-between w-full">
          <CardTitle className="text-3xl font-semibold tracking-tight">
            {plan.name}
          </CardTitle>
          {plan.isPopular && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge className="border border-foreground bg-foreground px-3 py-4 text-xs font-bold uppercase text-secondary shadow-lg/15">
                Most Popular
              </Badge>
            </motion.div>
          )}
        </div>

        <p className="text-sm md:text-base leading-relaxed text-foreground/55">
          {plan.description}
        </p>
      </CardHeader>

      <CardContent className="relative z-30 flex-1 space-y-5 p-6 bg-background border-y border-foreground/15 rounded-4xl">
        {/* Animated price */}
        <div>
          <AnimatedPrice value={price} period={period} isAnnual={isAnnual} />

          <AnimatePresence initial={false} mode="wait">
            {isAnnual ? (
              <motion.p
                key="annual-note"
                initial={{ opacity: 0, height: 0, y: -5 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -5 }}
                transition={{ duration: 0.25 }}
                className="mt-2 overflow-hidden text-xs md:text-sm lg:text-base text-foreground/70"
              >
                <span className="line-through">
                  ${plan.price.monthly}/month
                </span>

                <span className="ml-2 font-semibold">
                  ${monthlyEquivalent}/month billed annually
                </span>
              </motion.p>
            ) : (
              <motion.p
                key="monthly-note"
                initial={{ opacity: 0, height: 0, y: -5 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -5 }}
                transition={{ duration: 0.25 }}
                className="mt-2 overflow-hidden text-xs md:text-sm lg:text-base text-foreground/70"
              >
                Billed monthly. Cancel anytime.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Main features */}
        <div className="py-5 border-y border-dashed border-foreground/15">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-foreground/45">
            Includes
          </p>

          <ul>
            {plan.features.map((feature) => (
              <PricingFeature
                key={feature}
                feature={feature}
                highlighted={plan.isPopular}
              />
            ))}
          </ul>
        </div>

        {/* Extra features */}
        {plan.extraFeatures.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-foreground/45">
              Plus
            </p>

            <ul>
              {plan.extraFeatures.map((feature) => (
                <PricingFeature
                  key={feature}
                  feature={feature}
                  highlighted={plan.isPopular}
                />
              ))}
            </ul>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-3">
        <Button
          className={cn(
            "group p-6 text-base font-semibold border transition-all duration-300 rounded-full w-full",
            plan.isPopular
              ? "bg-foreground text-secondary hover:bg-foreground/90"
              : "bg-background text-foreground hover:bg-foreground hover:text-secondary border-foreground/10!",
          )}
        >
          {plan.cta}
          <ChevronRight className="ml-1 size-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function StandardPricingTable() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="p-5 lg:p-10 space-y-5 lg:space-y-10 w-full">
      {/* Header */}

      <header className="flex flex-col md:flex-row items-end justify-between w-full">
        <div className="flex flex-col text-start w-full">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Simple pricing
          </h1>
          <span className="text-xl md:text-2xl text-foreground/40">
            for every business
          </span>

          <p className="mt-3 text-sm sm:text-base text-foreground/50 max-w-md">
            Start small, grow confidently, and upgrade whenever your workflow
            needs more power.
          </p>
        </div>

        {/* Billing switcher */}
        <div className="flex flex-col items-end gap-3 w-full">
          <p className="text-sm font-bold">SAVE 17% (ANNUAL)</p>
          <div className="relative flex items-center rounded-full border border-foreground/10 bg-secondary p-1">
            <motion.div
              animate={{
                x: isAnnual ? "100%" : "0%",
              }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 28,
              }}
              className="absolute left-1 top-1 bg-foreground shadow-lg h-[calc(100%-0.5rem)] w-[calc(50%-0.25rem)] rounded-full"
            />

            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={cn(
                "relative z-10 flex-1 rounded-full py-2 px-5 text-sm md:text-base font-bold transition-all duration-500 w-fit",
                !isAnnual
                  ? "text-secondary"
                  : "text-foreground/55 hover:text-foreground",
              )}
            >
              Monthly
            </button>

            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={cn(
                "relative z-10 flex-1 rounded-full py-2 px-5 text-sm md:text-base font-bold transition-all duration-500 w-fit",
                isAnnual
                  ? "text-secondary"
                  : "text-foreground/55 hover:text-foreground",
              )}
            >
              Annually
            </button>
          </div>
        </div>
      </header>

      {/* Pricing table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 w-full">
        {PLANS_DATA.map((plan) => (
          <PricingCard key={plan.id} plan={plan} isAnnual={isAnnual} />
        ))}
      </div>
    </div>
  );
}
