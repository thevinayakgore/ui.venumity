"use client";
import * as React from "react";
import { Badge } from "../badge";
import {
  Globe,
  Settings,
  Database,
  Rocket,
  CloudCog,
  CheckCircle2,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./index";

interface Feature {
  title: string;
  description: string;
  bullets: string[];
}

interface Category {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
  tools: Feature[];
}

const CATEGORIES: Category[] = [
  {
    id: "frontend",
    title: "Frontend development",
    description: "Build interactive, component-driven user interfaces.",
    icon: <Globe className="size-5 md:size-10 md:stroke-1" />,
    badge: "4 tools",
    tools: [
      {
        title: "React",
        description:
          "A component-driven JavaScript library focused on building highly interactive user interfaces.",
        bullets: [
          "Component-based architecture for reusable UI",
          "Strong community and ecosystem support",
          "Ideal for single-page applications",
        ],
      },
      {
        title: "Vue.js",
        description:
          "A progressive frontend framework designed to be incrementally adoptable.",
        bullets: [
          "Reactive and declarative rendering",
          "Easy integration with existing projects",
          "Great for rapid prototyping",
        ],
      },
      {
        title: "Svelte",
        description:
          "A compiler-first framework that shifts work to build time for smaller bundles.",
        bullets: [
          "Compile-time optimization for fast apps",
          "Minimal runtime overhead",
          "Simple syntax with reactive assignments",
        ],
      },
      {
        title: "Angular",
        description: "A comprehensive frontend platform maintained by Google.",
        bullets: [
          "Full-featured framework with built-in tooling",
          "Strong typing with TypeScript support",
          "Robust dependency injection and modularity",
        ],
      },
    ],
  },
  {
    id: "backend",
    title: "Backend development",
    description: "Design scalable APIs and server-side services.",
    icon: <Settings className="size-5 md:size-10 md:stroke-1" />,
    badge: "3 tools",
    tools: [
      {
        title: "Node.js",
        description:
          "A server-side JavaScript runtime built on Chrome's V8 engine.",
        bullets: [
          "Event-driven, non-blocking I/O model",
          "Perfect for real-time applications",
          "Large npm ecosystem",
        ],
      },
      {
        title: "Python",
        description:
          "A general-purpose language widely used for its readability and rich ecosystem.",
        bullets: [
          "Readable syntax and rapid development",
          "Strong web framework support",
          "Ideal for scalable APIs",
        ],
      },
      {
        title: "Go",
        description:
          "A statically typed language built for simplicity and concurrency.",
        bullets: [
          "Built-in concurrency with goroutines",
          "Compiled with fast execution",
          "Excellent for microservices",
        ],
      },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    description: "Persist, query, and scale structured data.",
    icon: <Database className="size-5 md:size-10 md:stroke-1" />,
    badge: "2 tools",
    tools: [
      {
        title: "PostgreSQL",
        description:
          "An advanced open-source relational database known for extensibility.",
        bullets: [
          "ACID-compliant with strong consistency",
          "Supports advanced data types",
          "Ideal for complex queries",
        ],
      },
      {
        title: "MongoDB",
        description:
          "A document-oriented database with flexible JSON-like structures.",
        bullets: [
          "Schema-less document storage",
          "Horizontal scaling with sharding",
          "Great for rapid development",
        ],
      },
    ],
  },
  {
    id: "devops",
    title: "DevOps",
    description: "Automate build, deploy, and infrastructure workflows.",
    icon: <Rocket className="size-5 md:size-10 md:stroke-1" />,
    badge: "2 tools",
    tools: [
      {
        title: "Docker",
        description:
          "A containerization platform for packaging apps with their dependencies.",
        bullets: [
          "Lightweight containerization",
          "Consistent environments",
          "Simplifies deployment",
        ],
      },
      {
        title: "Kubernetes",
        description:
          "A container orchestration system for managing workloads at scale.",
        bullets: [
          "Automated container orchestration",
          "Self-healing and auto-scaling",
          "Supports rolling updates",
        ],
      },
    ],
  },
  {
    id: "cloud",
    title: "Cloud services",
    description: "Deploy and scale applications on managed infrastructure.",
    icon: <CloudCog className="size-5 md:size-10 md:stroke-1" />,
    badge: "3 tools",
    tools: [
      {
        title: "AWS",
        description:
          "A comprehensive cloud platform offering compute, storage, and managed services.",
        bullets: [
          "Extensive global infrastructure",
          "Highly scalable and secure",
          "Wide range of managed services",
        ],
      },
      {
        title: "Vercel",
        description:
          "A cloud platform focused on frontend deployment and edge delivery.",
        bullets: [
          "Optimized for frontend apps",
          "Global edge network",
          "Seamless Next.js integration",
        ],
      },
      {
        title: "Cloudflare",
        description:
          "A global edge network offering CDN, security, and serverless compute.",
        bullets: [
          "Global CDN and DDoS protection",
          "Serverless computing at the edge",
          "Ideal for latency-sensitive apps",
        ],
      },
    ],
  },
];

export default function NestedAccordionDemo() {
  return (
    <Accordion
      behavior="multiple"
      variant="separated"
      className="p-5 md:p-10 max-w-2xl"
    >
      {CATEGORIES.map((category, categoryIndex) => (
        <AccordionItem
          key={category.id}
          value={category.id}
          {...(categoryIndex === 0 && { defaultOpen: true })}
        >
          <AccordionTrigger className="items-start! justify-between [&>svg]:hidden! w-full">
            <div className="flex items-center gap-3 w-full">
              {category.icon}
              <span className="flex flex-col">
                <span className="text-sm md:text-base font-semibold">
                  {category.title}
                </span>
                <span className="text-sm text-foreground/50">
                  {category.description}
                </span>
              </span>
            </div>
            <Badge variant="outline">{category.badge}</Badge>
          </AccordionTrigger>

          <AccordionContent className="p-0! bg-card">
            <Accordion variant="minimal" behavior="multiple">
              {category.tools.map((tool, itemIndex) => (
                <AccordionItem
                  key={tool.title}
                  value={`${category.id}-${tool.title}`}
                  {...(categoryIndex === 0 &&
                    itemIndex === 0 && { defaultOpen: true })}
                >
                  <AccordionTrigger className="px-4">
                    <span className="font-medium">{tool.title}</span>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 bg-background">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {tool.description}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {tool.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
