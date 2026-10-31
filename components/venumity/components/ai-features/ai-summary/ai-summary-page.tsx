"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence, easeOut } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sparkles,
  Bot,
  Loader2,
  CheckCircle2,
  FileText,
  Wand2,
  Copy,
  Download,
  RefreshCw,
  Share2,
  Bookmark,
  Clock,
  Target,
  Layers,
  Network,
  Cpu,
  LineChart,
  Lightbulb,
  ArrowUpRight,
  MessageSquareText,
  Tags,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ─────────────────────────────
   DATA
   ───────────────────────────── */

const originalText = `Artificial intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning, reasoning, and self-correction. Particular applications of AI include expert systems, speech recognition, and machine vision.

Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. ML algorithms build mathematical models based on training data to make predictions or decisions without human intervention. Deep learning uses neural networks with multiple layers to progressively extract higher-level features from raw input.

Natural Language Processing (NLP) deals with the interaction between computers and humans using natural language. Its objective is to read, understand, and make sense of human languages in a valuable way.

Computer vision enables computers to understand the visual world. Using digital images, videos, and deep learning models, machines can identify and classify objects and react to what they see.

The ethical implications of AI include privacy, algorithmic bias, job displacement, and autonomous weapons. As AI systems become more capable, ethical guidelines and regulatory frameworks become increasingly important.`;

const shortSummary =
  "This document explains the foundations of Artificial Intelligence, including machine learning, deep learning, NLP, and computer vision. It also covers practical applications and important ethical considerations such as privacy, bias, and regulation.";

const metrics = [
  { label: "Key Topics", value: "4", icon: Layers },
  { label: "Read Time", value: "3 min", icon: Clock },
  { label: "Confidence", value: "94%", icon: Target },
  { label: "Tokens", value: "1,847", icon: Cpu },
];

const insights = [
  {
    title: "Artificial Intelligence",
    description:
      "AI simulates human intelligence through learning, reasoning, and self-correction.",
    tag: "Foundation",
  },
  {
    title: "Machine Learning",
    description:
      "Systems learn patterns from data and improve without explicit programming.",
    tag: "Core Concept",
  },
  {
    title: "Deep Learning",
    description:
      "Multi-layer neural networks extract high-level features from complex data.",
    tag: "Advanced",
  },
  {
    title: "Natural Language Processing",
    description:
      "Enables machines to understand, interpret, and generate human language.",
    tag: "Application",
  },
  {
    title: "Computer Vision",
    description:
      "Allows systems to analyze images and video for detection and classification.",
    tag: "Application",
  },
  {
    title: "AI Ethics",
    description:
      "Covers privacy, algorithmic bias, job displacement, and responsible regulation.",
    tag: "Consideration",
  },
];

const topicScores = [
  { label: "Machine Learning", value: 92 },
  { label: "Deep Learning", value: 78 },
  { label: "NLP", value: 71 },
  { label: "Computer Vision", value: 66 },
  { label: "AI Ethics", value: 58 },
];

const relatedTopics = [
  "Generative AI",
  "Reinforcement Learning",
  "Explainable AI",
  "Multimodal Models",
  "AI Safety",
];

const AI_MODELS = [
  { value: "gpt-4", label: "GPT-4 Turbo" },
  { value: "claude-3", label: "Claude 3" },
  { value: "gemini-pro", label: "Gemini Pro" },
  { value: "venumity-ai", label: "Venumity AI" },
];

/* ─────────────────────────────
   ANIMATION
   ───────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: easeOut },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

/* ─────────────────────────────
   MINI COMPONENTS
   ───────────────────────────── */

function MetricCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="border-foreground/10 bg-background/70 shadow-none">
      <CardContent className="flex items-center gap-3 p-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="size-4 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-xs text-muted-foreground">{label}</p>
          <p className="text-sm font-semibold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function InsightTimeline() {
  return (
    <div className="relative space-y-4 pl-6">
      <div className="absolute top-1 bottom-1 left-1.75 w-px bg-border" />

      {insights.map((item) => (
        <motion.div key={item.title} variants={fadeUp} className="relative">
          <span className="absolute top-1.5 -left-6 size-3.5 rounded-full border-2 border-background bg-primary" />

          <div className="rounded-xl border bg-background p-4">
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <h4 className="text-sm font-semibold">{item.title}</h4>
              <Badge variant="secondary" className="text-[10px]">
                {item.tag}
              </Badge>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function TopicRadar() {
  return (
    <div className="space-y-3">
      {topicScores.map((topic) => (
        <div key={topic.label}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{topic.label}</span>
            <span className="font-medium">{topic.value}%</span>
          </div>
          <Progress value={topic.value} className="h-1.5" />
        </div>
      ))}
    </div>
  );
}

function ActionRail() {
  const actions = [
    { icon: Copy, label: "Copy summary" },
    { icon: Download, label: "Download report" },
    { icon: Share2, label: "Share insight" },
    { icon: Bookmark, label: "Save for later" },
    { icon: MessageSquareText, label: "Ask a question" },
  ];

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex flex-col gap-1 rounded-xl border bg-background p-1.5 shadow-sm">
        {actions.map(({ icon: Icon, label }) => (
          <Tooltip key={label}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <Icon className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">{label}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

/* ─────────────────────────────
   MAIN COMPONENT
   ───────────────────────────── */

export default function AISummaryPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [includeEthics, setIncludeEthics] = useState(true);
  const [selectedModel, setSelectedModel] = useState("venumity-ai");

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowSummary(true);
    }, 1800);
  };

  const handleReset = () => {
    setShowSummary(false);
    setIsGenerating(false);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-muted/30 text-foreground">
      {/* Command bar */}
      <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Bot className="size-4.5" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">
                AI Document Studio
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Summarize, analyze, and extract insights
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="h-9 w-40 text-xs">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {AI_MODELS.map((model) => (
                  <SelectItem key={model.value} value={model.value}>
                    {model.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {showSummary ? (
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RefreshCw className="size-4" />
                New Summary
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                <Wand2 className="size-4" />
                Generate
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="relative flex-1">
        <AnimatePresence mode="wait">
          {/* Loading state */}
          {isGenerating && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm"
            >
              <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                <Loader2 className="size-7 animate-spin text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Analyzing document</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Extracting concepts, insights, and key topics...
              </p>
            </motion.div>
          )}

          {/* Source document */}
          {!showSummary && !isGenerating && (
            <motion.div
              key="source"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12"
            >
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <Badge variant="secondary" className="mb-3">
                    <FileText className="size-3" />
                    Source document
                  </Badge>
                  <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                    Artificial Intelligence Overview
                  </h1>
                  <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                    Review the source material, choose your preferences, and
                    generate a structured AI summary.
                  </p>
                </div>

                <div className="flex items-center gap-3 rounded-xl border bg-background p-3">
                  <div className="space-y-1">
                    <p className="text-xs font-medium">Include ethics</p>
                    <p className="text-[11px] text-muted-foreground">
                      Add responsible-AI insights
                    </p>
                  </div>
                  <Switch
                    checked={includeEthics}
                    onCheckedChange={setIncludeEthics}
                  />
                </div>
              </div>

              <Card className="overflow-hidden border-foreground/10">
                <CardContent className="p-6 md:p-8">
                  <div className="mb-5 flex items-center gap-2 text-xs text-muted-foreground">
                    <Sparkles className="size-3.5 text-primary" />
                    {originalText.split(/\s+/).length} words · 5 sections
                  </div>

                  <div className="space-y-4">
                    {originalText.split("\n\n").map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-sm leading-relaxed text-muted-foreground"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Summary workspace */}
          {showSummary && !isGenerating && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10"
            >
              {/* Summary hero */}
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
              >
                {metrics.map((metric) => (
                  <motion.div key={metric.label} variants={fadeUp}>
                    <MetricCard
                      label={metric.label}
                      value={metric.value}
                      icon={metric.icon}
                    />
                  </motion.div>
                ))}
              </motion.div>

              <div className="grid gap-6 lg:grid-cols-12">
                {/* Main workspace */}
                <div className="space-y-6 lg:col-span-8">
                  <Card className="border-foreground/10">
                    <CardContent className="p-5 md:p-6">
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <Sparkles className="size-4 text-primary" />
                          <h2 className="text-base font-semibold">
                            Executive Summary
                          </h2>
                        </div>
                        <Badge variant="secondary">
                          {AI_MODELS.find((m) => m.value === selectedModel)
                            ?.label ?? "AI Model"}
                        </Badge>
                      </div>

                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {shortSummary}
                      </p>

                      <Separator className="my-5" />

                      <Tabs defaultValue="insights">
                        <TabsList className="w-full justify-start overflow-x-auto">
                          <TabsTrigger value="insights">Insights</TabsTrigger>
                          <TabsTrigger value="topics">Topics</TabsTrigger>
                          <TabsTrigger value="ethics">Ethics</TabsTrigger>
                        </TabsList>

                        <TabsContent value="insights" className="mt-5">
                          <motion.div
                            variants={stagger}
                            initial="hidden"
                            animate="visible"
                          >
                            <InsightTimeline />
                          </motion.div>
                        </TabsContent>

                        <TabsContent value="topics" className="mt-5">
                          <TopicRadar />
                        </TabsContent>

                        <TabsContent value="ethics" className="mt-5">
                          <div className="space-y-3">
                            {[
                              {
                                title: "Privacy",
                                description:
                                  "AI systems can collect and process sensitive personal data at scale.",
                              },
                              {
                                title: "Algorithmic Bias",
                                description:
                                  "Biased training data can lead to unfair or discriminatory outcomes.",
                              },
                              {
                                title: "Job Displacement",
                                description:
                                  "Automation may reshape roles and require workforce reskilling.",
                              },
                              {
                                title: "Responsible Regulation",
                                description:
                                  "Clear guidelines are needed for safe and accountable AI deployment.",
                              },
                            ].map((item) => (
                              <div
                                key={item.title}
                                className="flex items-start gap-3 rounded-xl border bg-background p-3"
                              >
                                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                                <div>
                                  <p className="text-sm font-medium">
                                    {item.title}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </div>

                {/* Right analysis rail */}
                <div className="space-y-5 lg:col-span-4">
                  <Card className="border-foreground/10">
                    <CardContent className="p-5">
                      <div className="mb-4 flex items-center gap-2">
                        <Network className="size-4 text-muted-foreground" />
                        <h3 className="text-sm font-semibold">
                          Topic Coverage
                        </h3>
                      </div>
                      <TopicRadar />
                    </CardContent>
                  </Card>

                  <Card className="border-foreground/10">
                    <CardContent className="p-5">
                      <div className="mb-4 flex items-center gap-2">
                        <Tags className="size-4 text-muted-foreground" />
                        <h3 className="text-sm font-semibold">Concept Map</h3>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {["AI", "ML", "DL", "NLP", "CV", "Ethics"].map(
                          (topic) => (
                            <Badge key={topic} variant="secondary">
                              {topic}
                            </Badge>
                          ),
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-foreground/10">
                    <CardContent className="p-5">
                      <div className="mb-4 flex items-center gap-2">
                        <LineChart className="size-4 text-muted-foreground" />
                        <h3 className="text-sm font-semibold">
                          Related Topics
                        </h3>
                      </div>
                      <div className="space-y-2">
                        {relatedTopics.map((topic) => (
                          <div
                            key={topic}
                            className="flex items-center justify-between rounded-lg border px-3 py-2 text-xs transition-colors hover:bg-muted/50"
                          >
                            <span className="text-muted-foreground">
                              {topic}
                            </span>
                            <ArrowUpRight className="size-3.5 text-muted-foreground" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="p-5">
                      <div className="mb-3 flex items-center gap-2">
                        <Lightbulb className="size-4 text-primary" />
                        <h3 className="text-sm font-semibold">AI Insight</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        This document provides a strong foundation across core
                        AI domains. It is best suited for intermediate learners
                        who want both technical concepts and real-world context.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating action rail */}
        {showSummary && !isGenerating && (
          <div className="fixed inset-y-0 right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
            <ActionRail />
          </div>
        )}
      </main>
    </div>
  );
}
