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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface NestedItem {
  title: string;
  content: string;
  features: string[];
}

interface AccordionItemType {
  title: string;
  icon: ReactNode;
  nestedItems: NestedItem[];
}

const categories: AccordionItemType[] = [
  {
    title: "Frontend development",
    icon: <Globe className="size-7" />,
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
    icon: <Settings className="size-7" />,
    nestedItems: [
      {
        title: "Node.js",
        content:
          "Node.js is a server-side JavaScript runtime built on Chrome’s V8 engine. Its event-driven, non-blocking architecture makes it ideal for building high-throughput APIs, real-time services, and microservice-based backends.",
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
    icon: <Database className="size-7" />,
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
    icon: <Rocket className="size-7" />,
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
    icon: <CloudCog className="size-7" />,
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
          "Google Cloud Platform delivers powerful infrastructure alongside industry-leading data analytics and machine learning services, leveraging Google’s internal expertise in distributed systems.",
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

export default function NestedAccordion() {
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [openNestedItems, setOpenNestedItems] = useState<Set<string>>(
    new Set(),
  );

  const toggleNestedItem = (content: string) => {
    const next = new Set(openNestedItems);
    if (next.has(content)) {
      next.delete(content);
    } else {
      next.add(content);
    }
    setOpenNestedItems(next);
  };

  return (
    <main className="mx-auto w-full max-w-3xl p-6 md:p-10">
      <header className="mb-6 flex flex-col gap-2">
        <h2 className="text-xl font-semibold tracking-tight md:text-3xl">
          Technology stack
        </h2>
        <p className="max-w-xl text-sm text-muted-foreground">
          Expand categories to see the tools we recommend for each layer of your
          product.
        </p>
      </header>

      <Accordion
        type="multiple"
        value={openCategories}
        onValueChange={setOpenCategories}
        className="space-y-3"
      >
        {categories.map((category) => (
          <AccordionItem
            key={category.title}
            value={category.title}
            className="overflow-hidden rounded-lg border border-border/70 bg-card/95 transition-all duration-300 hover:shadow-lg/10 data-[state=open]:border-border"
          >
            <AccordionTrigger className="flex w-full cursor-pointer items-center justify-between p-3 text-left transition-colors hover:bg-muted/60 hover:no-underline rounded-none">
              <div className="flex items-center gap-3">
                <div className="mx-1">{category.icon}</div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {category.title}
                    </span>
                    <Badge
                      variant="outline"
                      className="rounded-full px-2 py-0.5 text-[11px]"
                    >
                      {category.nestedItems.length} tools
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {openCategories.includes(category.title)
                      ? "Collapse to focus on another layer"
                      : "Click to see recommended technologies"}
                  </span>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="p-0">
              <div className="divide-y divide-border/70 border-t border-border/70 bg-muted/30">
                {category.nestedItems.map((nested) => {
                  const nestedOpen = openNestedItems.has(nested.content);

                  return (
                    <div key={nested.title} className="relative">
                      <button
                        type="button"
                        onClick={() => toggleNestedItem(nested.content)}
                        className="flex w-full cursor-pointer items-center justify-between px-6 py-3.5 text-left text-sm transition-colors hover:bg-muted/60"
                      >
                        <div className="flex items-center gap-3">
                          <Webhook className="size-4" />
                          <span className="font-medium text-foreground">
                            {nested.title}
                          </span>
                        </div>
                        <span className="flex h-5 w-5 items-center justify-center text-muted-foreground">
                          <ChevronRight
                            className={`h-3.5 w-3.5 transition-transform duration-200 ${
                              nestedOpen ? "rotate-90" : ""
                            }`}
                          />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {nestedOpen && (
                          <motion.div
                            key={nested.title}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.4,
                              ease: "easeInOut",
                            }}
                            className="overflow-hidden"
                          >
                            <div className="px-10 py-4 border-t border-dashed border-foreground/5 text-sm">
                              <p className="text-xs text-muted-foreground">
                                {nested.content}
                              </p>
                              <ul className="mt-3 mb-5 space-y-1 text-xs text-muted-foreground">
                                {nested.features.map((feature) => (
                                  <li
                                    key={feature}
                                    className="flex items-start gap-2"
                                  >
                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                className="inline-flex h-7 cursor-pointer items-center gap-1 rounded-full px-3 text-[11px]"
                              >
                                Learn more about{" "}
                                <span className="font-medium text-primary">
                                  {nested.title}
                                </span>
                                <ArrowUpRight className="size-3 text-primary" />
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
}
