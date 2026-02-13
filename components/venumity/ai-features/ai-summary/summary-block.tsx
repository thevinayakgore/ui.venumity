"use client";
import { useState } from "react";
import { motion, spring } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Brain,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Bookmark,
  Lightbulb,
  Zap,
  Telescope,
  SearchCheck,
  Network,
  Gauge,
  Layers,
  Cpu,
  LineChart,
  FileText,
  FlaskConical,
  Sparkle,
  Bot,
  Check,
  Loader,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface SummaryCard {
  title: string;
  value: string;
  icon: string;
  trend?: string;
}

interface SummarySection {
  title: string;
  points: string[];
}

const originalText = `Artificial intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning (the acquisition of information and rules for using the information), reasoning (using rules to reach approximate or definite conclusions) and self-correction. Particular applications of AI include expert systems, speech recognition and machine vision.

Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. ML algorithms build mathematical models based on training data to make predictions or decisions without human intervention. Deep learning, a subset of machine learning, uses neural networks with multiple layers to progressively extract higher-level features from raw input.

Natural Language Processing (NLP) is another crucial aspect of AI that deals with the interaction between computers and humans using natural language. The ultimate objective of NLP is to read, decipher, understand, and make sense of human languages in a valuable way. NLP draws from many disciplines including computer science and computational linguistics.

Computer vision enables computers to understand the visual world. Using digital images from cameras and videos and deep learning models, machines can accurately identify and classify objects, and then react to what they "see". This technology is used in applications from facial recognition systems to self-driving cars.

The ethical implications of AI are significant and include concerns about privacy, algorithmic bias, job displacement, and the potential for autonomous weapons. As AI systems become more capable, the importance of developing ethical guidelines and regulatory frameworks becomes increasingly critical.`;

const summaryStats: SummaryCard[] = [
  {
    title: "Key Topics",
    value: "4",
    icon: "/assets/key.png",
    trend: "ML, NLP, CV, Ethics",
  },
  {
    title: "Complexity",
    value: "Advanced",
    icon: "/assets/growth.png",
    trend: "Technical content",
  },
  {
    title: "Read Time",
    value: "3 min",
    icon: "/assets/time.png",
    trend: "Summary: 45 sec",
  },
  {
    title: "Confidence",
    value: "94%",
    icon: "/assets/star.png",
    trend: "High accuracy",
  },
];

const keyInsights: SummarySection[] = [
  {
    title: "Core Concepts",
    points: [
      "AI simulates human intelligence through learning, reasoning, and self-correction",
      "Machine learning enables systems to learn from data without explicit programming",
      "Deep learning uses multi-layer neural networks for feature extraction",
      "NLP bridges human-computer communication through natural language",
      "Computer vision processes visual data for object identification and reaction",
    ],
  },
  {
    title: "Key Applications",
    points: [
      "Expert systems for decision-making",
      "Speech recognition and processing",
      "Machine vision and facial recognition",
      "Autonomous vehicles",
      "Predictive analytics",
    ],
  },
];

const importantNotes = [
  "ML requires large amounts of quality training data",
  "Neural networks can have hundreds of layers",
  "NLP combines CS and computational linguistics",
  "CV systems need diverse training datasets to avoid bias",
  "Ethical frameworks are lagging behind technological advancement",
];

const rememberPoints = [
  "AI ≠ AGI - Current AI is narrow/task-specific",
  "Deep learning is a subset of ML, which is a subset of AI",
  "Training vs Inference are distinct phases",
  "Bias in = bias out - Data quality matters",
  "Ethics must be built-in, not bolted-on",
];

const shortSummary =
  "This document explains the core concepts of Artificial Intelligence, including machine learning, deep learning, natural language processing, and computer vision. It highlights real-world applications, technical foundations, and ethical considerations such as bias, privacy, and regulation.";

const AI_TOOLS = [
  {
    value: "gpt-4",
    label: "GPT-4 Turbo",
    icon: Brain,
  },
  {
    value: "claude-3",
    label: "Claude 3",
    icon: Sparkles,
  },
  {
    value: "gemini-pro",
    label: "Gemini Pro",
    icon: SearchCheck,
  },
  {
    value: "deepseek",
    label: "DeepSeek",
    icon: Telescope,
  },
  {
    value: "venumity-ai",
    label: "Venumity AI",
    icon: Zap,
  },
];

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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: spring,
      stiffness: 100,
      damping: 12,
    },
  },
};

// Exported function containing all mini components
export function SummarySidebarComponents() {
  return {
    TopicMaturityScore: () => (
      <Card className="gap-2 border-2 border-purple-500/50 bg-linear-to-br from-purple-500/10 via-background to-background hover:shadow-xl transition-all duration-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Gauge className="size-4 text-purple-500" />
            Topic Maturity Score
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs">AI Understanding</span>
            <span className="text-sm font-bold">82/100</span>
          </div>
          <Progress
            value={82}
            className="my-4 h-1 bg-purple-500/20 **:data-[slot=progress-indicator]:bg-purple-500"
          />
          <div className="flex items-center justify-between text-xs text-accent-foreground/60">
            <span>ML 78%</span>
            <span>NLP 85%</span>
            <span>CV 73%</span>
            <span>Ethics 92%</span>
          </div>
        </CardContent>
      </Card>
    ),

    ConceptNetwork: () => (
      <Card className="gap-2 border-2 border-blue-500/50 bg-linear-to-br from-blue-500/10 via-background to-background hover:shadow-xl transition-all duration-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Network className="size-4 text-blue-500" />
            Concept Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 text-xs font-normal">
            <Badge
              variant="outline"
              className="bg-blue-500/10 border-blue-500/50 text-blue-500"
            >
              AI
            </Badge>
            <Badge
              variant="outline"
              className="bg-green-500/10 border-green-500/50 text-green-500"
            >
              ML
            </Badge>
            <Badge
              variant="outline"
              className="bg-purple-500/10 border-purple-500/50 text-purple-500"
            >
              DL
            </Badge>
            <Badge
              variant="outline"
              className="bg-yellow-400/10 border-yellow-400/50 text-yellow-400"
            >
              NLP
            </Badge>
            <Badge
              variant="outline"
              className="bg-red-500/10 border-red-500/50 text-red-500"
            >
              CV
            </Badge>
            <Badge
              variant="outline"
              className="bg-orange-500/10 border-orange-500/50 text-orange-500"
            >
              Ethics
            </Badge>
            <Badge
              variant="outline"
              className="bg-pink-500/10 border-pink-500/50 text-pink-500"
            >
              Robotics
            </Badge>
          </div>
          <div className="mt-5 text-xs text-center text-muted-foreground">
            6 interconnected domains
          </div>
        </CardContent>
      </Card>
    ),

    ProcessingMetrics: () => (
      <Card className="gap-2 border-2 border-green-500/50 bg-linear-to-br from-green-500/10 via-background to-background hover:shadow-xl transition-all duration-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Cpu className="size-4 text-green-500" />
            Processing Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-xs">Tokens Processed</span>
            <span className="text-sm font-mono">1,847</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs">Processing Time</span>
            <span className="text-sm font-mono">0.32s</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs">Model Confidence</span>
            <span className="text-sm font-mono">94.2%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs">Context Window Used</span>
            <span className="text-sm font-mono">6.4k</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs">Inference Cost</span>
            <span className="text-sm font-mono">$0.002</span>
          </div>
        </CardContent>
      </Card>
    ),

    RelatedTopics: () => (
      <Card className="gap-2 border-2 border-orange-500/50 bg-linear-to-br from-orange-500/10 via-background to-background hover:shadow-xl transition-all duration-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Layers className="size-4 text-orange-500" />
            Related Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-2">
              <span className="size-1.5 bg-orange-500 rounded-full" />
              Reinforcement Learning
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 bg-orange-500 rounded-full" />
              Generative AI
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 bg-orange-500 rounded-full" />
              Edge Computing
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 bg-orange-500 rounded-full" />
              Quantum ML
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 bg-orange-500 rounded-full" />
              Explainable AI
            </li>
          </ul>
        </CardContent>
      </Card>
    ),

    SentimentAnalysis: () => (
      <Card className="gap-2 border-2 border-pink-500/50 bg-linear-to-br from-pink-500/10 via-background to-background hover:shadow-xl transition-all duration-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <LineChart className="size-4 text-pink-500" />
            Content Sentiment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs">Technical</span>
              <span className="text-xs font-bold">85%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">Neutral</span>
              <span className="text-xs font-bold">62%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">Critical</span>
              <span className="text-xs font-bold">23%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">Forward-looking</span>
              <span className="text-xs font-bold">41%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    ),

    AIInsights: () => (
      <Card className="gap-1 border-2 border-indigo-500/50 bg-linear-to-br from-indigo-500/10 via-background to-background hover:shadow-xl transition-all duration-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Lightbulb className="size-4 text-indigo-500" />
            Generated Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-xs text-foreground/70 italic">
            This content shows strong foundational knowledge in AI with emphasis
            on practical applications and ethical considerations.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <Avatar className="size-7 rounded">
              <AvatarFallback className="text-[10px] bg-indigo-500/20 border border-indigo-500/60 text-white rounded">
                AI
              </AvatarFallback>
            </Avatar>
            <span className="text-[10px] text-muted-foreground">
              Suggested for intermediate learners
            </span>
          </div>
        </CardContent>
      </Card>
    ),

    ResearchProgress: () => (
      <Card className="gap-2 border-2 border-teal-500/50 bg-linear-to-br from-teal-500/10 via-background to-background hover:shadow-xl transition-all duration-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <FlaskConical className="size-4 text-teal-500" />
            Research Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs">Literature Review</span>
            <span className="text-xs font-bold">100%</span>
          </div>
          <Progress
            value={100}
            className="h-1 bg-teal-500/20 **:data-[slot=progress-indicator]:bg-teal-500"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs">Implementation</span>
            <span className="text-xs font-bold">45%</span>
          </div>
          <Progress
            value={45}
            className="h-1 bg-teal-500/20 **:data-[slot=progress-indicator]:bg-teal-500"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs">Testing</span>
            <span className="text-xs font-bold">20%</span>
          </div>
          <Progress
            value={20}
            className="h-1 bg-teal-500/20 **:data-[slot=progress-indicator]:bg-teal-500"
          />
        </CardContent>
      </Card>
    ),

    CitationMetrics: () => (
      <Card className="gap-2 border-2 border-cyan-500/50 bg-linear-to-br from-cyan-500/10 via-background to-background hover:shadow-xl transition-all duration-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <FileText className="size-4 text-cyan-500" />
            Citation Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Cited by</span>
            <span className="font-bold">128 papers</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>Altmetric</span>
            <span className="font-bold">High</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>Field Weight</span>
            <span className="font-bold">3.2x</span>
          </div>
        </CardContent>
      </Card>
    ),
  };
}

// Main default export component
export default function AISummaryBlock() {
  const [showSummary, setShowSummary] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const components = SummarySidebarComponents();

  const handleGenerateSummary = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowSummary(true);
    }, 3000);
  };

  return (
    <main className="flex m-auto p-6 md:p-10 overflow-auto w-full max-h-screen h-full">
      <section className="relative flex flex-col xl:flex-row bg-foreground/3 backdrop-blur-md border-7 rounded-3xl overflow-hidden mx-auto max-w-4xl">
        {/* Original Text Section */}
        {!showSummary && (
          <section className="relative flex flex-col overflow-auto w-full">
            <nav className="sticky top-0 z-50 flex items-center justify-between p-6 bg-background/90 border-b h-15">
              <div className="flex items-center gap-1 w-full">
                <div className="size-3 rounded-full bg-red-500" />
                <div className="size-3 rounded-full bg-yellow-400" />
                <div className="size-3 rounded-full bg-green-500" />
                <span className="ml-3 text-sm font-medium">
                  Original Document
                </span>
              </div>
              <Button
                size="lg"
                variant="outline"
                className="cursor-pointer rounded-sm"
                onClick={handleGenerateSummary}
                disabled={isGenerating}
              >
                {showSummary ? (
                  <Check className="text-green-500" />
                ) : (
                  <Sparkles />
                )}

                {!showSummary
                  ? isGenerating
                    ? "Generating..."
                    : "Generate Summary"
                  : "Generated"}
              </Button>
            </nav>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="p-6 prose prose-slate dark:prose-invert max-w-none"
            >
              {originalText.split("\n\n").map((paragraph, idx) => (
                <motion.p
                  key={idx}
                  variants={itemVariants}
                  className="text-foreground/70 leading-relaxed mb-4 text-sm"
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
          </section>
        )}

        {isGenerating && (
          <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-60 flex flex-col items-center justify-center m-auto bg-background overflow-hidden w-full h-full">
            <Loader className="size-15 text-primary animate-spin" />
            <span className="text-xl font-medium mt-2">Generating...</span>
          </div>
        )}

        {/* AI Summary Section - Now 3/5 width */}
        {showSummary && (
          <section className="flex flex-col overflow-hidden w-full h-full">
            <nav className="sticky top-0 z-50 flex items-center justify-between p-6 bg-background/90 border-b h-15">
              <div className="flex items-center gap-2">
                <Bot className="size-6" />
                <span className="text-lg font-medium">
                  AI-Generated Summary
                </span>
              </div>
              <Select defaultValue="gpt-4">
                <SelectTrigger className="h-8 px-3 text-xs rounded-sm cursor-pointer">
                  <SelectValue placeholder="Select AI" />
                </SelectTrigger>
                <SelectContent>
                  {AI_TOOLS.map(({ value, label, icon: Icon }) => (
                    <SelectItem
                      key={value}
                      value={value}
                      className="cursor-pointer"
                    >
                      <span className="flex items-center gap-2 text-xs font-medium">
                        <Icon className="size-3.5" />
                        {label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </nav>

            <motion.section
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 xl:grid-cols-3 overflow-hidden max-h-screen"
            >
              {/* EXISTING SUMMARY CONTENT — UNCHANGED */}
              {/* Main Content Column - Takes 2/3 */}
              <section className="col-span-2 space-y-6 p-6 pr-0! overflow-auto h-full">
                {/* Quick Summary Accordion */}
                <motion.div variants={itemVariants}>
                  <Accordion
                    type="single"
                    defaultValue="summary"
                    collapsible
                    className="w-full"
                  >
                    <AccordionItem
                      value="summary"
                      className="relative group/quick border-2! border-yellow-400/40 hover:border-yellow-400/70 rounded-lg bg-linear-to-tr from-yellow-400/10 via-background to-background overflow-hidden transition-all duration-500"
                    >
                      <AccordionTrigger className="cursor-pointer relative z-10 hover:no-underline px-5 py-3.5 border-b border-transparent data-[state=open]:border-border rounded-none">
                        <span className="flex items-center gap-2  text-sm font-medium">
                          <Sparkles className="size-4 text-yellow-400" />
                          Quick Summary
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-5 py-4 relative z-10">
                        <p className="text-sm leading-relaxed">
                          {shortSummary}
                        </p>
                      </AccordionContent>
                      <motion.span
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute -bottom-15 -left-15 z-0 size-40 text-yellow-400 opacity-10 group-hover/quick:opacity-30 transition-opacity duration-500"
                      >
                        <Sparkle className="fill-yellow-400/60 stroke-yellow-400 stroke-1 w-full h-full" />
                      </motion.span>
                      <motion.span
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute -top-10 -right-10 z-0 size-25 text-yellow-400 opacity-10 group-hover/quick:opacity-30 transition-opacity duration-500"
                      >
                        <Sparkle className="fill-yellow-400/60 stroke-yellow-400 stroke-1 w-full h-full" />
                      </motion.span>
                    </AccordionItem>
                  </Accordion>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-2 gap-5"
                >
                  {summaryStats.map((stat, idx) => (
                    <Card
                      key={idx}
                      className="relative gap-0 p-0 group/stats bg-linear-to-br from-accent/30/30 hover:from-yellow-400/20 backdrop-blur-sm to-background border-2 border-yellow-400/40 hover:border-yellow-400/90 rounded-lg shadow-none hover:shadow-2xl hover:shadow-yellow-400/20 overflow-hidden transition-all duration-500 group"
                    >
                      <CardHeader className="flex flex-row items-start justify-between space-y-0 p-4 pb-0">
                        <CardTitle className="text-xs tracking-normal uppercase z-10 text-muted-foreground group-hover:text-foreground transition-colors">
                          {stat.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 z-10">
                        <div className="text-3xl font-bold">{stat.value}</div>
                        <p className="text-sm font-medium mt-1">{stat.trend}</p>
                      </CardContent>
                      <div className="absolute -bottom-5 -right-2 z-0 group-hover/stats:bottom-3 group-hover/stats:right-4 rotate-12 size-24 opacity-20 group-hover/stats:opacity-60 transition-all duration-500">
                        <Image
                          src={stat.icon}
                          alt="Icons"
                          width={500}
                          height={500}
                          className="w-full h-full"
                        />
                      </div>
                    </Card>
                  ))}
                </motion.div>

                {/* Key Insights */}
                {keyInsights.map((section, idx) => (
                  <motion.div key={idx} variants={itemVariants}>
                    <Card className="p-0 gap-0 border-2 shadow-none hover:shadow-xl bg-linear-to-br from-accent/30/30 to-background transition-all duration-500">
                      <CardHeader className="px-6! py-3! border-b gap-0!">
                        <CardTitle className="flex items-center gap-2 text-base font-medium uppercase">
                          {idx === 0 ? (
                            <Telescope className="size-6 text-blue-500" />
                          ) : (
                            <SearchCheck className="size-6 text-green-500" />
                          )}
                          {section.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <ul className="space-y-2.5 px-6 py-4">
                          {section.points.map((point, pidx) => (
                            <motion.li
                              key={pidx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: pidx * 0.1 }}
                              className="flex items-start gap-2 text-sm"
                            >
                              <CheckCircle2 className="size-4 text-green-500 mt-0.5 shrink-0" />
                              <span className="text-foreground/80">
                                {point}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {/* Important Notes / Remember Section */}
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-2 gap-5"
                >
                  <Card className="p-4 gap-2 shadow-none hover:shadow-xl bg-linear-to-br from-yellow-400/20 via-background to-background border-2 border-yellow-400/60 transition-all duration-500">
                    <CardHeader className="p-0">
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <AlertCircle className="size-4 text-yellow-400" />
                        Important Notes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ul className="flex flex-col items-start justify-start gap-2 h-full">
                        {importantNotes.map((note, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs"
                          >
                            <span className="size-1.5 rounded-full bg-yellow-400 mt-1.5 shrink-0" />
                            <span className="text-foreground/70">{note}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="p-4 gap-2 shadow-none hover:shadow-xl bg-linear-to-tl from-green-500/20 via-background to-background border-2 border-green-500/60 transition-all duration-500">
                    <CardHeader className="p-0">
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <Bookmark className="size-4 text-green-500" />
                        Remember
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ul className="space-y-2">
                        {rememberPoints.map((point, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs"
                          >
                            <span className="size-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                            <span className="text-foreground/70">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Deep Dive Accordion */}
                <motion.div variants={itemVariants}>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem
                      value="item-1"
                      className="border-2! rounded-lg bg-linear-to-br from-accent/30 to-background"
                    >
                      <AccordionTrigger className="cursor-pointer hover:no-underline px-5 py-3.5 border-b border-transparent data-[state=open]:border-border rounded-none">
                        <span className="flex items-center gap-2 text-sm font-medium">
                          <Lightbulb className="size-4 text-blue-500" />
                          Deep Dive - Ethical Considerations
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-5 py-4 space-y-3">
                        <p className="text-xs text-muted-foreground">
                          AI ethics encompasses four primary concerns
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2 text-sm">
                            <span className="size-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                            <span className="text-foreground/70">
                              <strong className="text-foreground">
                                Privacy :
                              </strong>{" "}
                              Data collection and surveillance
                            </span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <span className="size-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                            <span className="text-foreground/70">
                              <strong className="text-foreground">
                                Bias :
                              </strong>{" "}
                              Algorithmic fairness and discrimination
                            </span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <span className="size-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                            <span className="text-foreground/70">
                              <strong className="text-foreground">
                                Displacement :
                              </strong>{" "}
                              Job automation impact
                            </span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <span className="size-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                            <span className="text-foreground/70">
                              <strong className="text-foreground">
                                Safety :
                              </strong>{" "}
                              Autonomous systems control
                            </span>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </motion.div>
              </section>

              {/* Right Sidebar - New Mini Components Column */}
              <section className="sticky top-0 col-span-1 flex flex-col gap-6 p-6 overflow-auto h-full">
                <motion.div variants={itemVariants}>
                  <components.TopicMaturityScore />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <components.ConceptNetwork />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <components.ProcessingMetrics />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <components.RelatedTopics />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <components.SentimentAnalysis />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <components.AIInsights />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <components.ResearchProgress />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <components.CitationMetrics />
                </motion.div>
              </section>
            </motion.section>
          </section>
        )}
      </section>
    </main>
  );
}
