"use client";
import { motion } from "framer-motion";
import {
  Crown,
  Star,
  ShieldCheck,
  Globe,
  Trophy,
  Check,
  Webhook,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LuxuryCard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  features: { text: string; included: boolean }[];
  tier: string;
  price: number;
  period: string;
  featuresIncluded: number;
  totalFeatures: number;
  exclusiveBenefits: string[];
}

export default function LuxuryCardLayout() {
  const card: LuxuryCard = {
    id: 1,
    title: "Platinum Elite",
    subtitle: "Executive Excellence",
    description:
      "Experience unparalleled luxury with our elite package designed for discerning individuals",
    icon: <Crown className="w-6 h-6" />,
    features: [
      { text: "24/7 Priority Concierge", included: true },
      { text: "Custom Bespoke Solutions", included: true },
      { text: "Advanced Predictive Analytics", included: true },
      { text: "Personal Executive Manager", included: true },
      { text: "Global Lounge Access", included: true },
      { text: "Private Event Invitations", included: true },
      { text: "Dedicated Security Team", included: false },
      { text: "Worldwide Coverage", included: false },
    ],
    tier: "platinum",
    price: 2999,
    period: "month",
    featuresIncluded: 6,
    totalFeatures: 8,
    exclusiveBenefits: [
      "Private Jet Access",
      "Art Curation",
      "Wine Collection",
    ],
  };

  const getTierStyles = (tier: string) => {
    switch (tier) {
      case "platinum":
        return {
          gradient: "from-gray-900 via-gray-800 to-black",
          accent: "bg-linear-to-r from-gray-600 to-gray-800",
          border: "border-gray-700/50",
          glow: "shadow-[0_0_80px_rgba(120,120,120,0.2)]",
          iconBg: "bg-linear-to-br from-gray-700 to-gray-900",
          badge: "bg-linear-to-r from-gray-600 to-gray-800",
        };
      default:
        return {
          gradient: "from-gray-900 to-black",
          accent: "bg-gray-800",
          border: "border-gray-700",
          glow: "",
          iconBg: "bg-gray-800",
          badge: "bg-gray-700",
        };
    }
  };

  const styles = getTierStyles(card.tier);

  return (
    <main className="p-6 md:p-10 overflow-auto w-full h-full">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-5 py-4 rounded-full bg-accent border-2 mb-6"
        >
          <Webhook className="size-5 text-primary animate-spin" />
          <span className="text-sm font-medium">EXCLUSIVE MEMBERSHIP</span>
        </motion.div>

        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Ultimate Luxury <br /> Experience
        </h1>

        <p className="opacity-50 max-w-xl mx-auto text-lg">
          Access world-class services and unparalleled exclusivity with our
          premium membership
        </p>
      </div>

      {/* Single Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative rounded-3xl overflow-hidden min-w-3xl mx-auto"
      >
        <Card
          className={cn(
            "p-0! gap-0! border-6 bg-foreground/5 backdrop-blur-lg rounded-4xl",
          )}
        >
          <CardHeader className="p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "p-4 rounded-xl text-white",
                    styles.iconBg,
                    styles.border,
                  )}
                >
                  {card.icon}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-bold">{card.title}</h2>
                    <Badge
                      className={cn(
                        "text-xs font-bold px-3 py-1 border-0",
                        styles.badge,
                      )}
                    >
                      {card.tier.toUpperCase()}
                    </Badge>
                  </div>
                  <p>{card.subtitle}</p>
                </div>
              </div>
              <Star className="size-6 text-yellow-400 fill-current" />
            </div>

            <p className="opacity-60 mt-6 leading-relaxed">
              {card.description}
            </p>
          </CardHeader>

          <CardContent className="p-8 pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {card.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center",
                      feature.included
                        ? "bg-linear-to-r from-green-500 to-emerald-500"
                        : "bg-gray-800",
                    )}
                  >
                    {feature.included ? (
                      <Check className="size-5 text-white" />
                    ) : (
                      <span className="text-gray-400 text-sm">×</span>
                    )}
                  </div>
                  <span className={cn("text-sm")}>{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Exclusive benefits */}
            <div className="bg-primary/20 border-2 border-primary/80 shadow-xl shadow-primary/30 rounded-xl p-6">
                <h3 className="text-2xl font-semibold mb-6 lead-nonoe">Exclusive Benefits</h3>
              <div className="flex flex-wrap gap-2">
                {card.exclusiveBenefits.map((benefit, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-primary text-white border-2 border-white shadow-lg px-3 py-2"
                  >
                    <Globe className="w-3 h-3 mr-2" />
                    {benefit}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-8">
            <div className="w-full">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-5xl font-bold ">
                      ${card.price.toLocaleString()}
                    </span>
                    <span className="opacity-60 text-lg">/{card.period}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2 opacity-60 mb-2">
                    <ShieldCheck className="size-5" />
                    <span className="text-sm">24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-60">
                    <Trophy className="size-5" />
                    <span className="text-sm">Priority Access</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-5">
                <Button
                  variant="outline"
                  className="flex-1 p-7 cursor-pointer border-2 text-lg font-medium rounded-lg"
                >
                  Learn More
                </Button>
                <Button
                  className={cn(
                    "flex-1 p-7 cursor-pointer text-lg font-medium rounded-lg",
                  )}
                >
                  <Crown className="size-5 mr-2" />
                  Enquire Now
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </main>
  );
}
