"use client";
import { motion } from "framer-motion";
import { Shield, Clock, Zap, Check, ArrowRight, Sparkles } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  text: string;
}

interface PlanCard {
  name: string;
  price: string;
  period: string;
  description: string;
  features: Feature[];
  popular: boolean;
  color: string;
}

export default function PricingSupportCard() {
  const plans: PlanCard[] = [
    {
      name: "Basic",
      price: "$9",
      period: "/month",
      description: "Essential support for individuals",
      features: [
        { icon: <Clock className="w-4 h-4" />, text: "Email support within 48h" },
        { icon: <Check className="w-4 h-4" />, text: "Knowledge base access" },
        { icon: <Check className="w-4 h-4" />, text: "Community forums" },
      ],
      popular: false,
      color: "from-slate-500 to-slate-600",
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "Priority support for teams",
      features: [
        { icon: <Zap className="w-4 h-4" />, text: "Priority email support" },
        { icon: <Clock className="w-4 h-4" />, text: "Response within 4 hours" },
        { icon: <Check className="w-4 h-4" />, text: "Live chat support" },
        { icon: <Check className="w-4 h-4" />, text: "Phone support" },
      ],
      popular: true,
      color: "from-primary to-primary/80",
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "Dedicated support for organizations",
      features: [
        { icon: <Shield className="w-4 h-4" />, text: "Dedicated account manager" },
        { icon: <Zap className="w-4 h-4" />, text: "1-hour response SLA" },
        { icon: <Check className="w-4 h-4" />, text: "24/7 phone support" },
        { icon: <Check className="w-4 h-4" />, text: "Custom integrations" },
        { icon: <Check className="w-4 h-4" />, text: "On-site training" },
      ],
      popular: false,
      color: "from-violet-500 to-violet-600",
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full grid md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className={`relative bg-card dark:bg-card rounded-2xl border ${
              plan.popular ? "border-primary shadow-xl shadow-primary/10" : "border-border"
            } p-6 shadow-lg`}
          >
            {plan.popular && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-linear-to-r from-primary to-primary/80 text-primary-foreground text-xs font-semibold rounded-full flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                Most Popular
              </motion.div>
            )}

            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br ${plan.color} text-white mb-4`}>
              <Shield className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-display font-semibold text-foreground">{plan.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-display font-bold text-foreground">{plan.price}</span>
              <span className="text-muted-foreground">{plan.period}</span>
            </div>

            <div className="space-y-3 mb-6">
              {plan.features.map((feature, fIndex) => (
                <motion.div
                  key={fIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + fIndex * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className={`text-${plan.popular ? "primary" : "accent"}`}>
                    {feature.icon}
                  </div>
                  <span className="text-sm text-foreground">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${
                plan.popular
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
