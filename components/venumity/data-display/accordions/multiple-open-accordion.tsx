"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ActionItem {
  primaryText?: string;
  secondaryText?: string;
  description?: string;
}

export interface LearningItem {
  id: string;
  title: string;
  content: string;
  image: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration?: string;
  bg?: string;
  highlights: string[];
  action: ActionItem;
}

const defaultWebDevRoadmap: LearningItem[] = [
  {
    id: "item1",
    title: "HTML5 & Modern CSS Architecture",
    content:
      "Master semantic HTML markup, accessible DOM structures, and modern styling with Flexbox, CSS Grid, and Tailwind CSS.",
    image: "/icons/htmlcss.webp",
    level: "Beginner",
    duration: "30 min",
    bg: "bg-orange-500",
    highlights: [
      "Semantic HTML tags for optimal SEO and web accessibility.",
      "Responsive layout design using CSS Grid and Flexbox.",
      "Utility-first styling workflows with Tailwind CSS.",
    ],
    action: {
      primaryText: "Start HTML/CSS",
      secondaryText: "Save",
      description: "Build 3 responsive landing page layouts to complete.",
    },
  },
  {
    id: "item2",
    title: "JavaScript ES6+ & DOM Core",
    content:
      "Learn modern JavaScript features, asynchronous operations, Event Loops, Fetch API, and dynamic DOM manipulation.",
    image: "/icons/javascript.webp",
    level: "Beginner",
    duration: "45 min",
    bg: "bg-yellow-500",
    highlights: [
      "ES6+ syntax: Destructuring, Arrow Functions, and Modules.",
      "Asynchronous JS with Promises and Async/Await patterns.",
      "Event listeners and interactive DOM manipulation.",
    ],
    action: {
      primaryText: "Practice JS",
      secondaryText: "Save",
      description: "Complete 5 interactive algorithmic and DOM challenges.",
    },
  },
  {
    id: "item3",
    title: "React & Next.js App Router",
    content:
      "Build dynamic user interfaces using React components, custom hooks, Server Components, and Next.js file-based routing.",
    image: "/icons/react.webp",
    level: "Intermediate",
    duration: "60 min",
    bg: "bg-blue-600",
    highlights: [
      "React Hooks (useState, useEffect, useMemo, useCallback).",
      "Next.js App Router, Server Components, and SSR strategies.",
      "Global state management and component lifecycle optimization.",
    ],
    action: {
      primaryText: "Explore Next.js",
      secondaryText: "Save",
      description: "Build a full-stack dashboard using Next.js App Router.",
    },
  },
  {
    id: "item4",
    title: "Backend APIs & Node.js Runtime",
    content:
      "Design scalable RESTful APIs, handle HTTP authentication, write middleware, and connect endpoints to backend services.",
    image: "/icons/nodejs.webp",
    level: "Intermediate",
    duration: "50 min",
    bg: "bg-green-500",
    highlights: [
      "REST API design principles and HTTP protocol methods.",
      "Node.js runtime environment and Express middleware routing.",
      "User authentication using JWTs and OAuth providers.",
    ],
    action: {
      primaryText: "Build APIs",
      secondaryText: "Save",
      description: "Construct a secure authentication REST API with Node.js.",
    },
  },
  {
    id: "item5",
    title: "Databases, ORMs & Vercel Deployment",
    content:
      "Model relational/NoSQL data using Prisma ORM, perform migrations, set up CI/CD pipelines, and deploy live to Vercel.",
    image: "/icons/database.webp",
    level: "Advanced",
    duration: "60 min",
    bg: "bg-pink-500",
    highlights: [
      "Database schema modeling with PostgreSQL and Prisma ORM.",
      "Database migrations, relationships, and index optimizations.",
      "Continuous deployment pipelines on Vercel with environment variables.",
    ],
    action: {
      primaryText: "Deploy App",
      secondaryText: "Save",
      description: "Ship your full-stack web application live to production.",
    },
  },
];

interface LearningAccordionProps {
  items?: LearningItem[];
  defaultOpenId?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function LearningAccordion({
  items = defaultWebDevRoadmap,
  defaultOpenId = "item1",
  className,
  title = "Full-Stack Web Development",
  subtitle = "Step-by-step developer path. Expand modules to view detailed topic highlights, time estimates, and actions.",
}: LearningAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set([defaultOpenId]),
  );

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-5 p-5 md:p-10 overflow-auto m-auto max-w-3xl w-full",
        className,
      )}
    >
      {/* Header Section */}
      <header className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          {title}
        </h2>
        <p className="text-sm md:text-base leading-relaxed text-foreground/60">
          {subtitle}
        </p>
      </header>

      {/* Accordion List */}
      <div className="flex flex-col gap-3">
        {items.map((item, index) => {
          const isOpen = openItems.has(item.id);

          return (
            <div
              key={item.id}
              className={cn(
                "group border border-transparent rounded-xl overflow-hidden transition-all duration-300",
                item.bg,
              )}
            >
              {/* Trigger Button */}
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className="flex w-full items-center justify-between gap-4 p-2 text-white text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex size-12 shrink-0 bg-white rounded-md overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={500}
                      height={500}
                      priority
                      unoptimized
                      className="object-cover rounded-sm h-full w-full"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>

                  <div className="flex flex-col">
                    <p className="text-base font-semibold tracking-tight sm:text-lg">
                      0{index + 1}. {item.title}
                    </p>
                    <p className="text-xs opacity-80">
                      {isOpen
                        ? "Click to collapse module details"
                        : "Click to reveal module insights & roadmap"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mr-0.5">
                  <div className="flex flex-col items-end justify-end gap-1.5">
                    <Badge className="bg-white text-black font-semibold px-2 py-0.5 text-[10px] uppercase tracking-wider h-5 rounded-sm">
                      {item.level}
                    </Badge>

                    {item.duration && (
                      <span className="hidden items-center gap-1 font-mono text-xs sm:flex opacity-90">
                        <Clock className="size-3.5" />
                        {item.duration}
                      </span>
                    )}
                  </div>
                </div>
              </button>

              {/* Collapsible Content */}
              {isOpen && (
                <div className="p-4 bg-background/95 backdrop-blur-xl text-foreground rounded-b-xl overflow-hidden">
                  <p className="text-sm leading-relaxed sm:text-base text-foreground/80">
                    {item.content}
                  </p>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-2 text-xs">
                    {/* Module Highlights */}
                    <div className="md:col-span-3 p-3.5 bg-background border border-foreground/15 rounded-lg flex flex-col justify-between">
                      <div>
                        <p className="text-sm mb-2.5 font-semibold tracking-wide text-foreground">
                          # Module Highlights
                        </p>
                        <ul className="space-y-2">
                          {item.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-green-500" />
                              <span className="text-foreground/80 leading-snug">
                                {highlight}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Quick Action Card */}
                    <div className="md:col-span-2 flex flex-col items-start justify-between bg-foreground text-background rounded-lg p-3.5 w-full h-full">
                      <div className="w-full">
                        <p className="text-sm font-semibold tracking-wide">
                          Quick Actions
                        </p>
                        <p className="mt-1 text-xs opacity-75 leading-relaxed">
                          {item.action.description ||
                            "Mark complete once you can comfortably explain the topic."}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 pt-3 border-t border-dashed border-background/30 mt-3 w-full">
                        <Button
                          size="sm"
                          className="text-xs bg-blue-600 text-white hover:bg-blue-700 h-8 font-medium"
                        >
                          {item.action.primaryText || "Start"}
                          <ArrowRight className="size-3.5 ml-1" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs border-background/20 text-background bg-transparent hover:bg-background/10 h-8"
                        >
                          {item.action.secondaryText || "Save"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
