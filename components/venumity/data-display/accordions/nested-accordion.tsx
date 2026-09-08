"use client";
import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ArrowUpRight,
  Webhook,
  Globe,
  Settings,
  Database,
  Rocket,
  CloudCog,
  ChevronDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NestedFeature {
  title: string;
  content: string;
  features: string[];
}

interface CategoryItem {
  title: string;
  icon: ReactNode;
  nestedItems: NestedFeature[];
}

const DEFAULT_CATEGORY: CategoryItem[] = [
  {
    title: "Frontend development",
    icon: <Globe className="size-8 stroke-[1.5px]" />,
    nestedItems: [
      {
        title: "React",
        content:
          "React is a component-driven JavaScript library focused on building highly interactive user interfaces. It emphasizes unidirectional data flow, reusable UI primitives, and efficient rendering through a virtual DOM, making it a strong choice for scalable frontend applications.",
        features: [
          "Component-based architecture for reusable UI",
          "Strong community and ecosystem support",
          "Ideal for single-page applications and complex UIs",
          "Efficient rendering with virtual DOM",
        ],
      },
      {
        title: "Vue.js",
        content:
          "Vue.js is a progressive frontend framework designed to be incrementally adoptable. It combines an intuitive API with powerful reactivity, allowing teams to build everything from small interactive widgets to full-scale single-page applications.",
        features: [
          "Reactive and declarative rendering",
          "Easy integration with existing projects",
          "Flexible and incrementally adoptable",
          "Great for rapid prototyping and scalable apps",
        ],
      },
      {
        title: "Angular",
        content:
          "Angular is a comprehensive frontend platform maintained by Google. It provides a full suite of tools including dependency injection, routing, forms, and RxJS-based state handling, making it well suited for large, structured enterprise applications.",
        features: [
          "Full-featured framework with built-in tooling",
          "Strong typing with TypeScript support",
          "Ideal for large-scale, maintainable enterprise apps",
          "Robust dependency injection and modularity",
        ],
      },
      {
        title: "Svelte",
        content:
          "Svelte takes a compiler-first approach to frontend development by shifting much of the work to build time. This results in minimal runtime overhead, smaller bundles, and highly performant applications with a simplified developer experience.",
        features: [
          "Compile-time optimization for fast apps",
          "Minimal runtime overhead and smaller bundles",
          "Simple syntax with reactive assignments",
          "Great for high-performance and lightweight apps",
        ],
      },
    ],
  },
  {
    title: "Backend development",
    icon: <Settings className="size-8 stroke-[1.5px]" />,
    nestedItems: [
      {
        title: "Node.js",
        content:
          "Node.js is a server-side JavaScript runtime built on Chrome's V8 engine. Its event-driven, non-blocking architecture makes it ideal for building high-throughput APIs, real-time services, and microservice-based backends.",
        features: [
          "Event-driven, non-blocking I/O model",
          "Perfect for real-time applications and APIs",
          "Large npm ecosystem for rapid development",
          "Widely used for microservices and serverless",
        ],
      },
      {
        title: "Python",
        content:
          "Python is a general-purpose programming language widely used on the backend for its readability and rich ecosystem. Frameworks like Django and FastAPI enable rapid development of secure, maintainable, and high-performance web services.",
        features: [
          "Readable syntax and rapid development",
          "Strong support for web frameworks like Django and FastAPI",
          "Versatile in scripting, automation, and data science",
          "Ideal for scalable APIs and backend services",
        ],
      },
      {
        title: "Go",
        content:
          "Go is a statically typed language created at Google with a strong focus on simplicity and concurrency. It excels at building performant network services, distributed systems, and cloud-native backend infrastructure.",
        features: [
          "Built-in concurrency with goroutines",
          "Compiled language with fast execution",
          "Excellent for microservices and cloud-native apps",
          "Minimalist syntax focused on simplicity",
        ],
      },
      {
        title: "Java",
        content:
          "Java is a mature, platform-independent language that powers many large-scale enterprise systems. Its robust tooling, strong typing, and JVM ecosystem make it a reliable choice for long-lived, mission-critical backend applications.",
        features: [
          "Platform-independent via JVM",
          "Strong typing and mature ecosystem",
          "Ideal for enterprise-grade, scalable applications",
          "Robust tooling and performance optimization",
        ],
      },
      {
        title: "Ruby",
        content:
          "Ruby is a dynamic language best known for the Ruby on Rails framework. It prioritizes developer happiness and convention over configuration, enabling teams to prototype and ship backend features quickly.",
        features: [
          "Convention over configuration philosophy",
          "Rapid development with Rails framework",
          "Great for startups and MVPs",
          "Emphasizes readable and elegant code",
        ],
      },
    ],
  },
  {
    title: "Databases",
    icon: <Database className="size-8 stroke-[1.5px]" />,
    nestedItems: [
      {
        title: "PostgreSQL",
        content:
          "PostgreSQL is an advanced open-source relational database known for its strong standards compliance and extensibility. It supports complex queries, custom data types, and transactional integrity for data-intensive applications.",
        features: [
          "ACID-compliant with strong consistency",
          "Supports advanced data types and indexing",
          "Extensible with custom functions and types",
          "Ideal for complex queries and analytics",
        ],
      },
      {
        title: "MongoDB",
        content:
          "MongoDB is a document-oriented NoSQL database that stores data in flexible JSON-like structures. It is well suited for applications that require rapid iteration, horizontal scaling, and evolving schemas.",
        features: [
          "Schema-less JSON document storage",
          "Horizontal scaling with sharding",
          "Flexible data model for evolving apps",
          "Great for rapid development and prototyping",
        ],
      },
      {
        title: "MySQL",
        content:
          "MySQL is a widely adopted relational database that balances performance and simplicity. It is commonly used in web applications and remains a dependable choice for structured data storage at scale.",
        features: [
          "Reliable and mature relational database",
          "Optimized for read-heavy workloads",
          "Strong community and ecosystem",
          "Ideal for web applications and OLTP systems",
        ],
      },
    ],
  },
  {
    title: "DevOps",
    icon: <Rocket className="size-8 stroke-[1.5px]" />,
    nestedItems: [
      {
        title: "Docker",
        content:
          "Docker is a containerization platform that allows applications to be packaged with their dependencies into isolated, portable containers. This ensures consistent behavior across development, staging, and production environments.",
        features: [
          "Lightweight containerization for apps",
          "Consistent environments across stages",
          "Simplifies deployment and scaling",
          "Supports microservices architecture",
        ],
      },
      {
        title: "Kubernetes",
        content:
          "Kubernetes is a container orchestration system designed to manage containerized workloads at scale. It automates deployment, scaling, self-healing, and service discovery in modern cloud-native architectures.",
        features: [
          "Automated container orchestration",
          "Self-healing and auto-scaling capabilities",
          "Ideal for managing microservices at scale",
          "Supports rolling updates and service discovery",
        ],
      },
    ],
  },
  {
    title: "Cloud services",
    icon: <CloudCog className="size-8 stroke-[1.5px]" />,
    nestedItems: [
      {
        title: "AWS",
        content:
          "Amazon Web Services is a comprehensive cloud platform offering compute, storage, databases, networking, and managed services. It provides global infrastructure and fine-grained control for building scalable systems.",
        features: [
          "Extensive global infrastructure and services",
          "Highly scalable and secure cloud platform",
          "Wide range of managed services and tools",
          "Ideal for enterprise and startup deployments",
        ],
      },
      {
        title: "Azure",
        content:
          "Microsoft Azure is a cloud platform optimized for enterprise and hybrid environments. It integrates deeply with Microsoft tooling while supporting open-source technologies and modern DevOps workflows.",
        features: [
          "Seamless integration with Microsoft products",
          "Strong hybrid cloud capabilities",
          "Supports diverse OS and frameworks",
          "Great for enterprise and DevOps workflows",
        ],
      },
      {
        title: "Google Cloud",
        content:
          "Google Cloud Platform delivers powerful infrastructure alongside industry-leading data analytics and machine learning services, leveraging Google's internal expertise in distributed systems.",
        features: [
          "Advanced data analytics and ML services",
          "High-performance global network",
          "Strong Kubernetes and container support",
          "Ideal for data-intensive and AI workloads",
        ],
      },
      {
        title: "Vercel",
        content:
          "Vercel is a cloud platform focused on frontend deployment and edge delivery. It is optimized for frameworks like Next.js and enables fast, globally distributed applications with minimal configuration.",
        features: [
          "Optimized for frontend and Jamstack apps",
          "Global edge network for fast delivery",
          "Seamless integration with Next.js",
          "Simplifies deployment with zero config",
        ],
      },
      {
        title: "Cloudflare",
        content:
          "Cloudflare provides a global edge network offering content delivery, security, and serverless compute. It helps applications achieve low latency, improved reliability, and protection against attacks.",
        features: [
          "Global CDN and DDoS protection",
          "Serverless computing at the edge",
          "Improves site performance and security",
          "Ideal for latency-sensitive applications",
        ],
      },
      {
        title: "DigitalOcean",
        content:
          "DigitalOcean is a developer-friendly cloud provider that emphasizes simplicity and predictable pricing. It is popular among startups and small teams looking to deploy and scale applications quickly.",
        features: [
          "Simple and transparent pricing",
          "Developer-friendly interface and tools",
          "Great for small to medium projects",
          "Focuses on ease of use and quick setup",
        ],
      },
    ],
  },
];

interface NestedAccordionProps {
  categories?: CategoryItem[];
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function NestedAccordion({
  categories = DEFAULT_CATEGORY,
  className,
  title = "Technology stack",
  subtitle = "Expand categories to see the tools we recommend for each layer of your product.",
}: NestedAccordionProps) {
  // Store open category titles
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    new Set(["Frontend development"]),
  );

  // Store open nested item titles
  const [openNestedItems, setOpenNestedItems] = useState<Set<string>>(
    new Set(["React"]),
  );

  const toggleCategory = (categoryTitle: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryTitle)) {
        next.delete(categoryTitle);
      } else {
        next.add(categoryTitle);
      }
      return next;
    });
  };

  const toggleNestedItem = (itemTitle: string) => {
    setOpenNestedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemTitle)) {
        next.delete(itemTitle);
      } else {
        next.add(itemTitle);
      }
      return next;
    });
  };

  return (
    <div
      className={cn(
        "flex flex-col items-start justify-start m-auto p-4 sm:p-6 md:p-10 mx-auto overflow-auto max-w-3xl w-full h-full",
        className,
      )}
    >
      {/* Header */}
      <header className="mb-6 flex flex-col gap-1.5 w-full text-left">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        <p className="max-w-xl text-sm text-foreground/50">{subtitle}</p>
      </header>

      {/* Accordion Container */}
      <div className="space-y-3 w-full">
        {categories.map((category) => {
          const isCategoryOpen = openCategories.has(category.title);

          return (
            <div
              key={category.title}
              className="overflow-hidden rounded-xl border bg-card transition-all duration-500"
            >
              {/* Category Header Button */}
              <button
                type="button"
                onClick={() => toggleCategory(category.title)}
                className="flex w-full items-center justify-between p-3 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center shrink-0">
                    {category.icon}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground sm:text-base">
                        {category.title}
                      </span>
                      <Badge
                        variant="secondary"
                        className="rounded-full px-2 py-0.5 text-[11px] font-normal border border-border/50 bg-muted"
                      >
                        {category.nestedItems.length} tools
                      </Badge>
                    </div>
                    <span className="text-xs text-foreground/50">
                      Click to see recommended technologies
                    </span>
                  </div>
                </div>

                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-foreground/50 transition-transform duration-200",
                    isCategoryOpen && "rotate-180",
                  )}
                />
              </button>

              {/* Expandable Category Body - Uses Framer Motion for dynamic height */}
              <AnimatePresence initial={false}>
                {isCategoryOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="divide-y divide-border/60">
                      {category.nestedItems.map((nested) => {
                        const isItemOpen = openNestedItems.has(nested.title);

                        return (
                          <div key={nested.title} className="w-full">
                            {/* Nested Tool Trigger Button */}
                            <button
                              type="button"
                              onClick={() => toggleNestedItem(nested.title)}
                              className="group flex w-full items-center justify-between px-6 py-3.5 bg-foreground/5 border-y border-foreground/15 last:border-b-0 text-left text-sm"
                            >
                              <div className="flex items-center gap-3">
                                <Webhook className="size-4 shrink-0" />
                                <span className="font-medium">
                                  {nested.title}
                                </span>
                              </div>
                              <ChevronRight
                                className={cn(
                                  "size-4 shrink-0 text-foreground/50 group-hover:text-foreground transition-all duration-500",
                                  isItemOpen && "rotate-90",
                                )}
                              />
                            </button>

                            {/* Nested Details Drawer */}
                            <AnimatePresence initial={false}>
                              {isItemOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{
                                    duration: 0.2,
                                    ease: "easeInOut",
                                  }}
                                  className="p-5 overflow-hidden bg-background"
                                >
                                  <div className="text-sm">
                                    <p className="text-xs sm:text-sm text-foreground/50 leading-relaxed">
                                      {nested.content}
                                    </p>

                                    {/* Features Bullet List */}
                                    <ul className="mt-4 mb-5 space-y-2 text-xs sm:text-sm text-foreground/50">
                                      {nested.features.map((feature) => (
                                        <li
                                          key={feature}
                                          className="flex items-start gap-2.5"
                                        >
                                          <span className="mt-1.5 size-1.5 shrink-0 bg-primary rounded-full" />
                                          <span className="leading-snug">
                                            {feature}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>

                                    {/* Learn More Action Button */}
                                    <Button
                                      type="button"
                                      size="sm"
                                      variant="outline"
                                      className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full px-3.5 text-xs font-medium border-border/80 hover:bg-muted"
                                    >
                                      Learn more about{" "}
                                      <span className="font-semibold">
                                        {nested.title}
                                      </span>
                                      <ArrowUpRight className="size-3.5 text-primary" />
                                    </Button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
