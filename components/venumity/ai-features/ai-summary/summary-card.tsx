"use client";
import { motion, spring } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  TrendingUp,
  Users,
  Brain,
  Clock,
  Download,
  Share2,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SummaryCard {
  id: string;
  title: string;
  description: string;
  content: string;
  accuracy: number;
  sentiment: "positive" | "neutral" | "negative";
  tokens: number;
  duration: string;
  tags: string[];
  icon: React.ReactNode;
}

export default function AISummaryCards() {
  const summaries: SummaryCard[] = [
    {
      id: "1",
      title: "Q3 Financial Report",
      description: "AI-generated analysis of quarterly earnings",
      content:
        "Revenue increased by 24% compared to last quarter, with SaaS products showing strongest growth. Customer acquisition cost decreased by 15% through optimized marketing channels.",
      accuracy: 94,
      sentiment: "positive",
      tokens: 1247,
      duration: "Generated 2 min ago",
      tags: ["Finance", "Analysis", "Earnings"],
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      id: "2",
      title: "Customer Feedback Digest",
      description: "Sentiment analysis from 1,500+ reviews",
      content:
        "Overall positive sentiment at 82%. Top concerns: onboarding complexity (23 mentions), feature requests for mobile app (45 mentions). Highest praise: customer support (89% satisfaction).",
      accuracy: 89,
      sentiment: "positive",
      tokens: 892,
      duration: "Generated 15 min ago",
      tags: ["Support", "Sentiment", "Reviews"],
      icon: <Users className="h-6 w-6" />,
    },
    {
      id: "3",
      title: "Technical Documentation",
      description: "API reference condensed from 50+ pages",
      content:
        "Core endpoints summarized with usage examples. Authentication section reduced by 70% while maintaining clarity. Common errors and troubleshooting added.",
      accuracy: 97,
      sentiment: "neutral",
      tokens: 2105,
      duration: "Generated 1 hour ago",
      tags: ["Documentation", "API", "Technical"],
      icon: <FileText className="h-6 w-6" />,
    },
    {
      id: "4",
      title: "Market Research",
      description: "Competitor analysis across 20 companies",
      content:
        "Emerging trends: AI integration in 60% of competitors, mobile-first approach gaining traction. Recommendation: Accelerate mobile development and invest in AI features.",
      accuracy: 91,
      sentiment: "neutral",
      tokens: 1563,
      duration: "Generated 3 hours ago",
      tags: ["Research", "Competitor", "Strategy"],
      icon: <Brain className="h-6 w-6" />,
    },
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-500";
      case "negative":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: spring,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-2"
    >
      {summaries.map((summary) => (
        <motion.div
          key={summary.id}
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
          <Card className="h-full border-2 border-transparent hover:border-primary/20 transition-all duration-300 overflow-hidden group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {summary.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{summary.title}</CardTitle>
                      <Badge
                        className={`${getSentimentColor(summary.sentiment)} text-white`}
                        variant="default"
                      >
                        {summary.sentiment}
                      </Badge>
                    </div>
                    <CardDescription>{summary.description}</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" /> Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share2 className="mr-2 h-4 w-4" /> Share
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {summary.content}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Accuracy</span>
                    <span className="font-medium">{summary.accuracy}%</span>
                  </div>
                  <Progress value={summary.accuracy} className="h-2" />

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Brain className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {summary.tokens} tokens
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {summary.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {summary.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Regenerate
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
