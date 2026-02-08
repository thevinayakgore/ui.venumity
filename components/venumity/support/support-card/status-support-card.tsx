"use client";
import { motion } from "framer-motion";
import { Clock, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatusMetric {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  status: "good" | "warning" | "critical";
}

interface SystemStatus {
  name: string;
  status: "operational" | "degraded" | "outage";
  uptime: string;
}

export default function StatusSupportCard() {
  const metrics: StatusMetric[] = [
    { label: "Response Time", value: "1.2h", change: "-15%", trend: "down", status: "good" },
    { label: "Resolution Rate", value: "94%", change: "+3%", trend: "up", status: "good" },
    { label: "Open Tickets", value: "23", change: "+5", trend: "up", status: "warning" },
    { label: "Satisfaction", value: "4.8/5", change: "+0.2", trend: "up", status: "good" },
  ];

  const systems: SystemStatus[] = [
    { name: "API Services", status: "operational", uptime: "99.99%" },
    { name: "Web Application", status: "operational", uptime: "99.95%" },
    { name: "Database", status: "operational", uptime: "99.99%" },
    { name: "Email Service", status: "degraded", uptime: "98.50%" },
  ];

  const getStatusConfig = (status: SystemStatus["status"]) => {
    switch (status) {
      case "operational":
        return { color: "bg-emerald-500", text: "text-emerald-500", label: "Operational" };
      case "degraded":
        return { color: "bg-amber-500", text: "text-amber-500", label: "Degraded" };
      case "outage":
        return { color: "bg-destructive", text: "text-destructive", label: "Outage" };
    }
  };

  const getMetricStatusColor = (status: StatusMetric["status"]) => {
    switch (status) {
      case "good": return "text-emerald-500";
      case "warning": return "text-amber-500";
      case "critical": return "text-destructive";
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card dark:bg-card rounded-2xl border border-border p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="font-display font-semibold text-foreground">All Systems Operational</h3>
            </div>
            <span className="text-sm text-muted-foreground">Updated 2 min ago</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-secondary/50 dark:bg-secondary/30 rounded-xl"
              >
                <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
                <div className="flex items-end justify-between">
                  <span className={`text-2xl font-display font-bold ${getMetricStatusColor(metric.status)}`}>
                    {metric.value}
                  </span>
                  <div className={`flex items-center gap-0.5 text-xs ${
                    metric.trend === "up" && metric.status === "good" ? "text-emerald-500" :
                    metric.trend === "down" && metric.status === "good" ? "text-emerald-500" :
                    "text-amber-500"
                  }`}>
                    {metric.trend === "up" ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {metric.change}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card dark:bg-card rounded-2xl border border-border p-6 shadow-lg"
        >
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            System Status
          </h3>

          <div className="space-y-3">
            {systems.map((system, index) => {
              const statusConfig = getStatusConfig(system.status);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 dark:hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      className={`w-2.5 h-2.5 rounded-full ${statusConfig.color}`}
                    />
                    <span className="font-medium text-foreground">{system.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{system.uptime} uptime</span>
                    <span className={`text-sm font-medium ${statusConfig.text}`}>
                      {statusConfig.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 pt-4 border-t border-border flex items-center justify-between"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Last incident: 14 days ago</span>
            </div>
            <motion.a
              href="#"
              whileHover={{ x: 4 }}
              className="text-sm font-medium text-primary hover:underline"
            >
              View incident history →
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </motion.main>
  );
}
