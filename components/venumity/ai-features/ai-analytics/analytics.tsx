"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  Zap,
  Brain,
  BarChart3,
  Target,
  AlertCircle,
  Eye,
} from "lucide-react";

interface Metric {
  id: string;
  title: string;
  value: number;
  change: number;
  target: number;
  unit: string;
  trend: "up" | "down";
  insights: string[];
}

interface Insight {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  confidence: number;
  action: string;
}

export default function AIAnalytics() {
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedMetric, setSelectedMetric] = useState<string>("engagement");

  const metrics: Metric[] = [
    {
      id: "engagement",
      title: "User Engagement",
      value: 78,
      change: 12,
      target: 85,
      unit: "%",
      trend: "up",
      insights: ["Peak usage: 10 AM - 2 PM", "Mobile engagement up 15%"],
    },
    {
      id: "accuracy",
      title: "AI Accuracy",
      value: 94,
      change: 3,
      target: 95,
      unit: "%",
      trend: "up",
      insights: [
        "Best performing: Image recognition",
        "Lowest: Text summarization",
      ],
    },
    {
      id: "response",
      title: "Response Time",
      value: 145,
      change: -8,
      target: 100,
      unit: "ms",
      trend: "down",
      insights: ["Optimized model loading", "Caching improved by 40%"],
    },
    {
      id: "adoption",
      title: "Feature Adoption",
      value: 63,
      change: 21,
      target: 75,
      unit: "%",
      trend: "up",
      insights: ["New users: 85% adoption", "Most used: Chat assistant"],
    },
  ];

  const insights: Insight[] = [
    {
      id: "1",
      title: "Mobile optimization needed",
      description: "Bounce rate 35% higher on mobile vs desktop",
      impact: "high",
      confidence: 92,
      action: "Optimize mobile UI",
    },
    {
      id: "2",
      title: "Peak usage detected",
      description: "Server load spikes at 11 AM daily",
      impact: "medium",
      confidence: 87,
      action: "Scale resources",
    },
    {
      id: "3",
      title: "New feature trending",
      description: "AI suggestions used 3x more than expected",
      impact: "high",
      confidence: 95,
      action: "Promote to all users",
    },
    {
      id: "4",
      title: "API latency increasing",
      description: "Response time growing 2ms/day",
      impact: "medium",
      confidence: 78,
      action: "Monitor & optimize",
    },
  ];

  const getMetricById = (id: string) =>
    metrics.find((m) => m.id === id) || metrics[0];

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>AI Performance Analytics</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Real-time insights and predictive analytics
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {["24h", "7d", "30d", "90d"].map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer transition-all hover:border-primary/30 ${
                    selectedMetric === metric.id
                      ? "border-2 border-primary"
                      : ""
                  }`}
                  onClick={() => setSelectedMetric(metric.id)}
                >
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-2 rounded-lg ${
                              metric.trend === "up"
                                ? "bg-green-500/10"
                                : "bg-red-500/10"
                            }`}
                          >
                            {metric.trend === "up" ? (
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            ) : (
                              <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
                            )}
                          </div>
                          <span className="font-medium">{metric.title}</span>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            metric.trend === "up"
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {metric.trend === "up" ? "+" : ""}
                          {metric.change}%
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold">
                            {metric.value}
                          </span>
                          <span className="text-muted-foreground">
                            {metric.unit}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Progress
                            </span>
                            <span className="font-medium">
                              {Math.round((metric.value / metric.target) * 100)}
                              %
                            </span>
                          </div>
                          <Progress
                            value={(metric.value / metric.target) * 100}
                          />
                          <div className="text-xs text-muted-foreground">
                            Target: {metric.target}
                            {metric.unit}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-2 border-primary/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-primary" />
                <CardTitle>Detailed Analysis</CardTitle>
              </div>
              <Badge variant="outline">
                <Target className="h-3 w-3 mr-1" />
                {getMetricById(selectedMetric).title}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">AI Insights</h4>
                </div>
                <div className="space-y-2">
                  {getMetricById(selectedMetric).insights.map(
                    (insight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                          <span className="text-xs font-medium">
                            {index + 1}
                          </span>
                        </div>
                        <p className="text-sm">{insight}</p>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Predictive Forecast</h4>
                  <Badge variant="outline" className="gap-1">
                    <Brain className="h-3 w-3" />
                    AI Projection
                  </Badge>
                </div>
                <div className="h-48 rounded-lg border flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-2">+15% Growth</div>
                    <p className="text-sm text-muted-foreground">
                      Predicted for next {timeRange}
                    </p>
                    <Button variant="outline" size="sm" className="mt-4">
                      <Eye className="h-4 w-4 mr-2" />
                      View Forecast Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-primary" />
              <CardTitle>Actionable Insights</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.map((insight) => (
                <div key={insight.id} className="p-4 rounded-lg border">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{insight.title}</h4>
                    <Badge
                      className={`${
                        insight.impact === "high"
                          ? "bg-red-500/10 text-red-700"
                          : insight.impact === "medium"
                            ? "bg-yellow-500/10 text-yellow-700"
                            : "bg-green-500/10 text-green-700"
                      }`}
                    >
                      {insight.impact} impact
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {insight.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${insight.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs">
                        {insight.confidence}% confidence
                      </span>
                    </div>
                    <Button size="sm" variant="outline">
                      {insight.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
