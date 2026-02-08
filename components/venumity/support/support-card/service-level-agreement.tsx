"use client";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Shield,
  Zap,
  BarChart,
  Target,
} from "lucide-react";

interface SLAFeature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  metrics: string[];
}

interface ServiceTier {
  id: number;
  name: string;
  level: "basic" | "professional" | "enterprise";
  price: string;
  features: string[];
  sla: {
    responseTime: string;
    resolutionTime: string;
    availability: string;
    uptime: string;
  };
}

export default function SupportCard4() {
  const slaFeatures: SLAFeature[] = [
    {
      id: 1,
      title: "Guaranteed Response Time",
      description:
        "We commit to responding to your support requests within specified timeframes",
      icon: <Clock size={24} />,
      metrics: [
        "< 5 min for Critical",
        "< 30 min for High",
        "< 4 hours for Normal",
      ],
    },
    {
      id: 2,
      title: "Resolution Time Commitment",
      description:
        "Clear timelines for issue resolution based on priority levels",
      icon: <Zap size={24} />,
      metrics: [
        "2 hours for Critical",
        "8 hours for High",
        "48 hours for Normal",
      ],
    },
    {
      id: 3,
      title: "Service Availability",
      description:
        "Guaranteed uptime and availability for all critical services",
      icon: <Shield size={24} />,
      metrics: ["99.9% Uptime SLA", "24/7 Monitoring", "Automated Failover"],
    },
    {
      id: 4,
      title: "Performance Metrics",
      description:
        "Transparent reporting on all SLA metrics and performance indicators",
      icon: <BarChart size={24} />,
      metrics: [
        "Monthly Reports",
        "Real-time Dashboards",
        "Performance Analytics",
      ],
    },
  ];

  const serviceTiers: ServiceTier[] = [
    {
      id: 1,
      name: "Basic Support",
      level: "basic",
      price: "Included",
      features: [
        "Email Support",
        "Business Hours",
        "Community Forum",
        "Knowledge Base",
      ],
      sla: {
        responseTime: "24 hours",
        resolutionTime: "5 business days",
        availability: "99.5%",
        uptime: "Standard",
      },
    },
    {
      id: 2,
      name: "Professional Support",
      level: "professional",
      price: "$99/month",
      features: [
        "Priority Email & Chat",
        "24/7 Support",
        "Phone Support",
        "SLA Guarantee",
        "Monthly Reports",
      ],
      sla: {
        responseTime: "1 hour",
        resolutionTime: "24 hours",
        availability: "99.9%",
        uptime: "High",
      },
    },
    {
      id: 3,
      name: "Enterprise Support",
      level: "enterprise",
      price: "Custom",
      features: [
        "Dedicated Support Manager",
        "15-min Response SLA",
        "24/7 Phone & Chat",
        "Custom SLA Terms",
        "Quarterly Reviews",
        "On-site Training",
      ],
      sla: {
        responseTime: "15 minutes",
        resolutionTime: "4 hours",
        availability: "99.99%",
        uptime: "Maximum",
      },
    },
  ];

  const slaMetrics = [
    { label: "First Response Time", value: "98.7%", target: "99%" },
    { label: "Resolution Time", value: "95.2%", target: "96%" },
    { label: "Customer Satisfaction", value: "96.8%", target: "95%" },
    { label: "Service Availability", value: "99.94%", target: "99.9%" },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-3">
                Service Level Agreement
              </h1>
              <p className="text-blue-100 max-w-3xl mx-auto">
                Our commitment to providing reliable, timely, and effective
                support with guaranteed performance metrics
              </p>
            </div>
          </div>

          {/* SLA Features */}
          <div className="p-8">
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Our SLA Guarantees
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {slaFeatures.map((feature) => (
                  <motion.div
                    key={feature.id}
                    whileHover={{ y: -5 }}
                    className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <div className="text-blue-600 dark:text-blue-400">
                          {feature.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {feature.metrics.map((metric, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle size={16} className="text-green-500" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {metric}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Service Tiers */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Support Tiers & SLAs
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {serviceTiers.map((tier) => (
                  <motion.div
                    key={tier.id}
                    whileHover={{ scale: 1.02 }}
                    className={`rounded-2xl overflow-hidden border-2 ${
                      tier.level === "enterprise"
                        ? "border-blue-500 dark:border-blue-500 shadow-xl"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <div
                      className={`p-6 text-white ${
                        tier.level === "basic"
                          ? "bg-gray-600"
                          : tier.level === "professional"
                          ? "bg-blue-600"
                          : "bg-linear-to-r from-blue-600 to-indigo-600"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold">{tier.name}</h3>
                        <div className="text-3xl font-bold">{tier.price}</div>
                      </div>
                      <div className="text-sm opacity-90">
                        {tier.level.charAt(0).toUpperCase() +
                          tier.level.slice(1)}{" "}
                        Support Level
                      </div>
                    </div>

                    <div className="p-6">
                      {/* SLA Metrics */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                          SLA Commitments
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              Response Time
                            </span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {tier.sla.responseTime}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              Resolution Time
                            </span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {tier.sla.resolutionTime}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              Availability
                            </span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {tier.sla.availability}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              Uptime
                            </span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {tier.sla.uptime}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                          Included Features
                        </h4>
                        <div className="space-y-2">
                          {tier.features.map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3"
                            >
                              <CheckCircle
                                size={16}
                                className="text-green-500"
                              />
                              <span className="text-gray-700 dark:text-gray-300 text-sm">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        className={`w-full mt-8 py-3 rounded-xl font-semibold transition-all ${
                          tier.level === "enterprise"
                            ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        {tier.level === "basic"
                          ? "Get Started"
                          : tier.level === "professional"
                          ? "Upgrade Now"
                          : "Contact Sales"}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Performance Metrics
              </h2>
              <div className="bg-linear-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {slaMetrics.map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {metric.value}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {metric.label}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Target: {metric.target}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <span>Current Performance</span>
                      <span>96.8%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "96.8%" }}
                        transition={{ duration: 1 }}
                        className="bg-linear-to-r from-green-500 to-emerald-600 h-3 rounded-full"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <span>SLA Target</span>
                      <span>95.0%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div className="w-[95%] bg-blue-600 h-3 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SLA Commitment */}
            <div className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Target
                      size={24}
                      className="text-blue-600 dark:text-blue-400"
                    />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Our Commitment to You
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                    We stand behind our SLA with transparent reporting, regular
                    performance reviews, and financial credits for any SLA
                    misses. Your satisfaction is our top priority.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
                    Download SLA PDF
                  </button>
                  <button className="px-8 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-xl transition-colors">
                    Schedule SLA Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
